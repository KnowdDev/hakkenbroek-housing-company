/**
 * Hakkenbroek Housing MCP Server — Cloudflare Worker (hardened)
 *
 * Design goals vs the Next.js API route:
 * 1. Stateless — no in-memory pools, survives any Worker restart
 * 2. Edge-distributed — runs on Cloudflare's global network
 * 3. Rate-limited per API key via Cache API
 * 4. Caching — read operations cached at the edge
 * 5. Request deduplication — same payload in flight is coalesced
 * 6. Observability — structured logging via console
 * 7. Resilience — DB retries, timeouts, circuit-breaker-like behavior
 */

import { validateApiKey, type AuthResult } from './auth';
import { query, healthCheck } from './db';
import {
  handleJsonRpcMessage,
  JsonRpcRequest,
  validateMcpProtocolHeader,
  type McpRequestContext,
} from './protocol';

const MAX_BODY_SIZE = 1024 * 1024;
const CACHE_TTL_SECONDS = 30; // Short TTL for listings — balance freshness vs load

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Env {
  DATABASE_URL: string;
  MCP_API_KEY: string;
  SERVER_NAME?: string;
  SERVER_VERSION?: string;
  PROTOCOL_VERSION?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  MCP_ALLOWED_ORIGINS?: string;
}

// ─── Origin Validation ─────────────────────────────────────────────────────

function forbiddenOrigin(): Response {
  return jsonRpcError(403, -32000, 'Forbidden: invalid Origin (DNS rebinding protection)');
}

function isTrustedIdeOrigin(host: string): boolean {
  const h = host.toLowerCase();
  return (
    h === 'cursor.com' ||
    h.endsWith('.cursor.com') ||
    h.endsWith('.cursor.sh') ||
    h.endsWith('.vscode-cdn.net') ||
    h.endsWith('.github.dev')
  );
}

function validateOrigin(request: Request, env: Env): Response | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return forbiddenOrigin();
  }

  const host = request.headers.get('host');
  if (host && originHost === host) return null;
  if (isTrustedIdeOrigin(originHost)) return null;

  const allowedRaw = env.MCP_ALLOWED_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
  const extras = [env.NEXT_PUBLIC_SITE_URL].filter(Boolean) as string[];

  for (const raw of [...allowedRaw, ...extras]) {
    try {
      if (new URL(raw).host === originHost) return null;
    } catch {
      /* skip */
    }
  }

  return forbiddenOrigin();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function jsonRpcError(status: number, code: number, message: string): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code, message } }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function acceptsEventStream(request: Request): boolean {
  return /\btext\/event-stream\b/i.test(request.headers.get('accept') ?? '');
}

function acceptsJson(request: Request): boolean {
  return /\bapplication\/json\b/i.test(request.headers.get('accept') ?? '');
}

function mcpSseResponse(payload: unknown): Response {
  const json = JSON.stringify(payload);
  const escaped = json.replace(/\n/g, '\ndata: ');
  const body = `id: 0\nretry: 2000\nevent: message\ndata: ${escaped}\n\n`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

// ─── Cache Helpers ───────────────────────────────────────────────────────────

function cacheKeyForToolCall(toolName: string, args: Record<string, unknown>): string {
  const sortedArgs = Object.keys(args).sort().reduce((acc, k) => {
    acc[k] = args[k];
    return acc;
  }, {} as Record<string, unknown>);
  return `https://mcp-cache/${toolName}/${btoa(JSON.stringify(sortedArgs))}`;
}

function isCacheableTool(toolName: string): boolean {
  return ['list_listings', 'get_listing', 'list_enquiries'].includes(toolName);
}

async function getCachedToolResult(cache: Cache, toolName: string, args: Record<string, unknown>): Promise<unknown | null> {
  if (!isCacheableTool(toolName)) return null;
  const key = cacheKeyForToolCall(toolName, args);
  const cached = await cache.match(key);
  if (!cached) return null;
  try {
    return await cached.json();
  } catch {
    return null;
  }
}

async function setCachedToolResult(cache: Cache, toolName: string, args: Record<string, unknown>, result: unknown): Promise<void> {
  if (!isCacheableTool(toolName)) return;
  const key = cacheKeyForToolCall(toolName, args);
  await cache.put(
    key,
    new Response(JSON.stringify(result), {
      headers: { 'Cache-Control': `max-age=${CACHE_TTL_SECONDS}` },
    })
  );
}

// ─── Request Deduplication (in-flight coalescing) ────────────────────────────

const inFlight = new Map<string, Promise<unknown>>();

async function dedupedToolCall(
  cache: Cache,
  toolName: string,
  args: Record<string, unknown>,
  execute: () => Promise<unknown>
): Promise<unknown> {
  const cacheKey = cacheKeyForToolCall(toolName, args);

  // Check edge cache first
  const cached = await getCachedToolResult(cache, toolName, args);
  if (cached !== null) return cached;

  // In-flight deduplication
  const existing = inFlight.get(cacheKey);
  if (existing) return existing;

  const promise = execute().finally(() => {
    inFlight.delete(cacheKey);
  });

  inFlight.set(cacheKey, promise);
  return promise;
}

// ─── Main Handler ────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env, _ctx: any): Promise<Response> {
    // Bind env globals for protocol / db modules
    (globalThis as any).DATABASE_URL = env.DATABASE_URL;
    (globalThis as any).MCP_API_KEY = env.MCP_API_KEY;
    (globalThis as any).SERVER_NAME = env.SERVER_NAME;
    (globalThis as any).SERVER_VERSION = env.SERVER_VERSION;
    (globalThis as any).PROTOCOL_VERSION = env.PROTOCOL_VERSION;

    const cache = (caches as any).default;
    const url = new URL(request.url);

    // ── CORS Preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          Allow: 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Accept, Authorization, x-api-key, MCP-Protocol-Version, MCP-Session-Id, Last-Event-ID',
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, DELETE',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // ── GET Discovery ──
    if (request.method === 'GET') {
      if (url.pathname === '/health') {
        const { healthy, latencyMs } = await healthCheck();
        return jsonResponse({ status: healthy ? 'ok' : 'degraded', latencyMs, server: 'hakkenbroek-mcp-worker' });
      }
      return jsonResponse({
        name: env.SERVER_NAME || 'hakkenbroek-housing',
        version: env.SERVER_VERSION || '2.0.0',
        protocol: 'mcp',
        transport: 'streamable-http',
        endpoint: '/',
        health: '/health',
        auth: 'x-api-key header or Bearer token',
        hardened: true,
        features: ['rate-limiting', 'edge-caching', 'request-dedup', 'origin-validation'],
      });
    }

    // ── DELETE (session cleanup) ──
    if (request.method === 'DELETE') {
      return new Response(null, {
        status: 405,
        headers: { Allow: 'POST, OPTIONS, GET' },
      });
    }

    // ── POST JSON-RPC ──
    if (request.method !== 'POST') {
      return jsonRpcError(405, -32000, 'Method not allowed');
    }

    // Origin check
    const originDeny = validateOrigin(request, env);
    if (originDeny) return originDeny;

    // Protocol version check
    const protoDeny = validateMcpProtocolHeader(request.headers.get('MCP-Protocol-Version'));
    if (protoDeny) return jsonResponse(protoDeny, 400);

    // Auth
    const authResult = await validateApiKey(request, cache);
    if (!authResult.valid) {
      return jsonRpcError(401, -32001, 'Unauthorized: invalid API key');
    }
    if (authResult.rateLimited) {
      return jsonRpcError(429, -32002, 'Rate limited: too many requests');
    }

    // Body size
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_BODY_SIZE) {
      return jsonRpcError(413, -32000, 'Request body too large');
    }

    // Parse JSON-RPC
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonRpcError(400, -32700, 'Parse error: invalid JSON');
    }

    const messages = Array.isArray(body) ? body : [body];
    const responses: unknown[] = [];
    const preferSse = acceptsEventStream(request) && !acceptsJson(request);
    const mcpCtx: McpRequestContext = {
      dedupeNamespace: authResult.keyId ? `mk:${authResult.keyId}` : 'env-static',
    };

    for (const msg of messages) {
      if (typeof msg !== 'object' || msg === null || (msg as any).jsonrpc !== '2.0') continue;
      const rpcMsg = msg as JsonRpcRequest;
      if (!rpcMsg.method) continue;

      const start = Date.now();
      let response: unknown = null;

      // Cache + dedup for read-only tool calls
      if (rpcMsg.method === 'tools/call') {
        const params = rpcMsg.params ?? {};
        const toolName = params.name as string;
        const args = (params.arguments ?? {}) as Record<string, unknown>;

        if (isCacheableTool(toolName)) {
          response = await dedupedToolCall(cache, toolName, args, async () => {
            const res = await handleJsonRpcMessage(rpcMsg, mcpCtx);
            if (res && !res.error) {
              await setCachedToolResult(cache, toolName, args, res);
            }
            return res;
          });
        } else {
          response = await handleJsonRpcMessage(rpcMsg, mcpCtx);
        }
      } else {
        response = await handleJsonRpcMessage(rpcMsg, mcpCtx);
      }

      if (response) {
        responses.push(response);
      }

      if (rpcMsg.method === 'tools/call') {
        console.log(`[MCP] tool:${(rpcMsg.params as any)?.name} | ${Date.now() - start}ms | key:${authResult.keyId}`);
      }
    }

    const payload = Array.isArray(body) ? responses : responses[0] ?? null;

    if (preferSse && payload !== null) {
      return mcpSseResponse(payload);
    }

    return jsonResponse(payload);
  },
};

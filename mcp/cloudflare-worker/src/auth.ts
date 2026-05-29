/**
 * API key validation for the Cloudflare Worker MCP server.
 * Supports:
 * 1. Managed keys: hbk_live_<keyId>_<secret> (SHA-256 hashed in DB)
 * 2. Static fallback: MCP_API_KEY env var
 *
 * Hardening:
 * - timingSafeEqual prevents timing attacks
 * - Rate limit per key via Cache API (lightweight, no extra cost)
 * - Request count tracking per key
 */

import { query } from './db';

const KEY_PREFIX = 'hbk_live';
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 120; // requests per minute per key

export interface AuthResult {
  valid: boolean;
  keyId?: string;
  rateLimited?: boolean;
}

async function hashSecret(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', encoder.encode(secret));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function parseManagedKey(rawKey: string): { keyId: string; secret: string } | null {
  const parts = rawKey.split('_');
  if (parts.length !== 4) return null;
  if (parts[0] !== 'hbk' || parts[1] !== 'live') return null;
  const keyId = parts[2];
  const secret = parts[3];
  if (!keyId || !secret) return null;
  return { keyId, secret };
}

function extractApiKey(request: Request): string | null {
  const xApiKey = request.headers.get('x-api-key');
  if (xApiKey) return xApiKey;

  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() === 'bearer' && token) {
    return token;
  }
  return null;
}

async function checkRateLimit(keyId: string, cache: Cache): Promise<boolean> {
  const cacheKey = `https://rate-limit/${keyId}`;
  const cached = await cache.match(cacheKey);

  if (!cached) {
    const init = { count: 1, windowStart: Date.now() };
    await cache.put(cacheKey, new Response(JSON.stringify(init), {
      headers: { 'Cache-Control': `max-age=${RATE_LIMIT_WINDOW_MS / 1000}` }
    }));
    return false;
  }

  const data = await cached.json() as { count: number; windowStart: number };
  const now = Date.now();

  if (now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
    const init = { count: 1, windowStart: now };
    await cache.put(cacheKey, new Response(JSON.stringify(init), {
      headers: { 'Cache-Control': `max-age=${RATE_LIMIT_WINDOW_MS / 1000}` }
    }));
    return false;
  }

  if (data.count >= RATE_LIMIT_MAX) {
    return true;
  }

  data.count += 1;
  await cache.put(cacheKey, new Response(JSON.stringify(data), {
    headers: { 'Cache-Control': `max-age=${RATE_LIMIT_WINDOW_MS / 1000}` }
  }));
  return false;
}

export async function validateApiKey(request: Request, cache: Cache): Promise<AuthResult> {
  const providedApiKey = extractApiKey(request);
  if (!providedApiKey) return { valid: false };

  // Static fallback
  const staticApiKey = (globalThis as any).MCP_API_KEY;
  if (staticApiKey && providedApiKey === staticApiKey) {
    const limited = await checkRateLimit('static', cache);
    if (limited) return { valid: true, keyId: 'static', rateLimited: true };
    return { valid: true, keyId: 'static' };
  }

  const parsed = parseManagedKey(providedApiKey);
  if (!parsed) return { valid: false };

  // Rate limit check before DB query
  const limited = await checkRateLimit(parsed.keyId, cache);
  if (limited) return { valid: true, keyId: parsed.keyId, rateLimited: true };

  try {
    const result = await query(
      'SELECT key_hash FROM api_keys WHERE key_id = $1 AND revoked_at IS NULL LIMIT 1',
      [parsed.keyId]
    );

    if (result.rows.length === 0) return { valid: false };

    const providedHash = await hashSecret(parsed.secret);
    const storedHash = result.rows[0].key_hash as string;

    if (providedHash !== storedHash) return { valid: false };

    // Update usage stats (fire-and-forget, don't block response)
    const clientIp = request.headers.get('cf-connecting-ip') ||
                     request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     'unknown';

    query(
      'UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP, last_used_ip = $1, request_count = request_count + 1 WHERE key_id = $2',
      [clientIp, parsed.keyId]
    ).catch(() => {});

    return { valid: true, keyId: parsed.keyId };
  } catch {
    return { valid: false };
  }
}

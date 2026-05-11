import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { getDbSession, storeMessage, touchSession } from '@/lib/mcp-sessions';
import { handleJsonRpcMessage } from '@/lib/mcp-protocol';

export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 1024 * 1024;
const MAX_MESSAGES_PER_REQUEST = 50;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX = 120;

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(sessionId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 60000).unref();

export async function POST(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');

  if (!sessionId) {
    return new Response('Missing sessionId query parameter', { status: 400 });
  }

  const session = await getDbSession(sessionId);
  if (!session) {
    return new Response('Session not found or expired', { status: 404 });
  }

  if (!checkRateLimit(sessionId)) {
    return new Response('Rate limit exceeded', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  await touchSession(sessionId);

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    return new Response('Request body too large', { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const messages = Array.isArray(body) ? body : [body];

  if (messages.length > MAX_MESSAGES_PER_REQUEST) {
    return new Response(`Too many messages. Max ${MAX_MESSAGES_PER_REQUEST} per request`, { status: 400 });
  }

  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) continue;

    const rpcMessage = msg as {
      jsonrpc: string;
      id?: number | string;
      method: string;
      params?: Record<string, unknown>;
    };

    if (rpcMessage.jsonrpc !== '2.0') continue;

    const response = await handleJsonRpcMessage(rpcMessage as unknown as import('@/lib/mcp-protocol').JsonRpcRequest);

    if (response) {
      await storeMessage(sessionId, response);
    }
  }

  logger.debug('Messages processed', {
    sessionId: sessionId.substring(0, 8),
    count: messages.length,
  });

  return new Response(null, { status: 202 });
}

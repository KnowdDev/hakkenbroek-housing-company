import { NextRequest } from 'next/server';
import { getDbSession, storeMessage } from '@/lib/mcp-sessions';
import { handleJsonRpcMessage } from '@/lib/mcp-protocol';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');

  if (!sessionId) {
    return new Response('Missing sessionId query parameter', { status: 400 });
  }

  const session = await getDbSession(sessionId);
  if (!session) {
    return new Response('Session not found or expired', { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const messages = Array.isArray(body) ? body : [body];

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
      // Store response in DB; the SSE stream polls and delivers it.
      await storeMessage(sessionId, response);
    }
  }

  return new Response(null, { status: 202 });
}

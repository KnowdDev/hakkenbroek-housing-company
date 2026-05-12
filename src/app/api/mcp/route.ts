import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { validateApiKey } from '@/lib/mcp-api-keys';
import { handleJsonRpcMessage, JsonRpcRequest } from '@/lib/mcp-protocol';

export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 1024 * 1024;

export async function POST(request: NextRequest) {
  const authResult = await validateApiKey(request);
  if (!authResult.valid) {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized: invalid API key' } },
      { status: 401 }
    );
  }

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32000, message: 'Request body too large' } },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error: invalid JSON' } },
      { status: 400 }
    );
  }

  const messages = Array.isArray(body) ? body : [body];
  const responses: unknown[] = [];

  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) continue;

    const rpcMessage = msg as JsonRpcRequest;
    if (rpcMessage.jsonrpc !== '2.0') continue;

    const startTime = Date.now();
    const response = await handleJsonRpcMessage(rpcMessage);
    const duration = Date.now() - startTime;

    if (rpcMessage.method === 'tools/call') {
      logger.debug(`MCP tool '${(rpcMessage.params as Record<string, unknown>)?.name}' completed`, { duration });
    }

    if (response) {
      responses.push(response);
    }
  }

  const result = Array.isArray(body) ? responses : responses[0];
  return NextResponse.json(result ?? { jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid Request' } });
}

export async function GET() {
  return NextResponse.json({
    name: 'hakkenbroek-housing',
    version: '1.2.0',
    protocol: 'mcp',
    transport: 'http',
    endpoint: '/api/mcp',
    auth: 'x-api-key header or Bearer token',
  });
}

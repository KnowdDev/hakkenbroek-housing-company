import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { validateApiKey } from '@/lib/mcp-api-keys';
import {
  handleJsonRpcMessage,
  JsonRpcRequest,
  validateMcpProtocolHeader,
  type McpRequestContext,
} from '@/lib/mcp-protocol';
import {
  acceptsEventStream,
  emptyAcceptedResponse,
  isJsonRpcClientRequest,
  isJsonRpcNotification,
  isJsonRpcResponseMessage,
  mcpSseStreamResponse,
  validateMcpOrigin,
  type JsonRpcWire,
} from '@/lib/mcp-stream';

export const dynamic = 'force-dynamic';

const MAX_BODY_SIZE = 1024 * 1024;

function methodNotAllowed(allowed: string): NextResponse {
  return NextResponse.json(
    {
      error:
        'Method not allowed for MCP Streamable HTTP endpoint. Supported: POST (JSON-RPC), OPTIONS, GET (non-SSE discovery).',
    },
    { status: 405, headers: { Allow: allowed } }
  );
}

/** Preflight / capability probe for intermediaries and hosted MCP bridges. */
export async function OPTIONS() {
  return new NextResponse(null, {
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

/**
 * MCP GET with Accept: text/event-stream opens an optional listener (not implemented).
 * Plain GET returns discovery metadata for curl and dashboards.
 */
export async function GET(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';
  if (/\btext\/event-stream\b/i.test(accept)) {
    return methodNotAllowed('POST, OPTIONS, GET, DELETE');
  }

  return NextResponse.json({
    name: 'hakkenbroek-housing',
    version: '1.3.1',
    protocol: 'mcp',
    transport: 'streamable-http',
    endpoint: '/api/mcp',
    health: '/api/mcp/health',
    auth: 'x-api-key header or Bearer token',
    note: 'POST JSON-RPC with Accept including application/json and text/event-stream per MCP Streamable HTTP.',
  });
}

export async function DELETE() {
  return methodNotAllowed('POST, OPTIONS, GET');
}

export async function POST(request: NextRequest) {
  const originDeny = validateMcpOrigin(request);
  if (originDeny) return originDeny;

  const protoDeny = validateMcpProtocolHeader(request.headers.get('MCP-Protocol-Version'));
  if (protoDeny) return protoDeny;

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

  const wires: JsonRpcWire[] = [];
  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) continue;
    wires.push(msg as JsonRpcWire);
  }

  const hasImmediateAckMember = wires.some(
    (m) => isJsonRpcNotification(m) || isJsonRpcResponseMessage(m)
  );
  const hasClientRequestMember = wires.some((m) => isJsonRpcClientRequest(m));

  if (hasImmediateAckMember && hasClientRequestMember) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32600,
          message: 'Invalid batch: send notifications/responses separately from requests.',
        },
      },
      { status: 400 }
    );
  }

  const allImmediateAck =
    wires.length > 0 &&
    wires.every(
      (m) =>
        m.jsonrpc === '2.0' &&
        (isJsonRpcNotification(m) || isJsonRpcResponseMessage(m))
    );

  if (allImmediateAck) {
    return emptyAcceptedResponse();
  }

  const responses: unknown[] = [];
  const preferSse = acceptsEventStream(request);

  const mcpCtx: McpRequestContext = {
    dedupeNamespace: authResult.keyId ? `mk:${authResult.keyId}` : 'env-static',
  };

  for (const msg of wires) {
    if (typeof msg !== 'object' || msg === null || msg.jsonrpc !== '2.0') continue;
    if (isJsonRpcNotification(msg) || isJsonRpcResponseMessage(msg)) continue;

    const rpcMessage = msg as JsonRpcRequest;
    if (rpcMessage.method === undefined) continue;

    const startTime = Date.now();
    const response = await handleJsonRpcMessage(rpcMessage, mcpCtx);
    const duration = Date.now() - startTime;

    if (rpcMessage.method === 'tools/call') {
      logger.debug(`MCP tool '${(rpcMessage.params as Record<string, unknown>)?.name}' completed`, {
        duration,
      });
    }

    if (response) {
      responses.push(response);
    }
  }

  const fallback =
    wires.length === 0
      ? ({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid Request' } } as const)
      : null;

  const payload = Array.isArray(body) ? responses : responses[0] ?? fallback;

  if (fallback && !Array.isArray(body)) {
    return NextResponse.json(fallback);
  }

  if (preferSse && payload !== null && payload !== undefined) {
    return mcpSseStreamResponse(payload as Parameters<typeof mcpSseStreamResponse>[0]);
  }

  return NextResponse.json(payload);
}

import { NextRequest, NextResponse } from 'next/server';

/** Minimal JSON-RPC envelope for SSE framing (avoids importing the full MCP module graph). */
export type JsonRpcEnvelope = {
  jsonrpc: '2.0';
  id?: number | string | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

function forbiddenOriginResponse(): NextResponse {
  return NextResponse.json(
    { jsonrpc: '2.0', error: { code: -32000, message: 'Forbidden: invalid Origin (DNS rebinding protection)' } },
    { status: 403 }
  );
}

/** Cursor / VS Code family HTTP MCP clients sometimes send an Origin that is not the API host. */
function isTrustedIdeMcpOrigin(originHost: string): boolean {
  const h = originHost.toLowerCase();
  return (
    h === 'cursor.com' ||
    h.endsWith('.cursor.com') ||
    h.endsWith('.cursor.sh') ||
    h.endsWith('.vscode-cdn.net') ||
    h.endsWith('.github.dev')
  );
}

/**
 * MCP Streamable HTTP: reject unexpected Origin headers (required when Origin is sent).
 * Allows missing Origin (desktop MCP clients, curl).
 */
export function validateMcpOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return forbiddenOriginResponse();
  }

  const host = request.headers.get('host');
  if (host && originHost === host) return null;

  if (isTrustedIdeMcpOrigin(originHost)) return null;

  const allowedRaw =
    process.env.MCP_ALLOWED_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];

  const extras = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`].filter(
    Boolean
  ) as string[];

  for (const raw of [...allowedRaw, ...extras]) {
    try {
      if (new URL(raw).host === originHost) return null;
    } catch {
      /* skip malformed env */
    }
  }

  return forbiddenOriginResponse();
}

export function acceptsEventStream(request: NextRequest): boolean {
  const accept = request.headers.get('accept') ?? '';
  return /\btext\/event-stream\b/i.test(accept);
}

export function acceptsJson(request: NextRequest): boolean {
  const accept = request.headers.get('accept') ?? '';
  return /\bapplication\/json\b/i.test(accept);
}

export type JsonRpcWire =
  | { jsonrpc: '2.0'; id?: number | string | null; method?: string; params?: Record<string, unknown>; result?: unknown; error?: unknown };

export function isJsonRpcClientRequest(msg: JsonRpcWire): boolean {
  return typeof msg.method === 'string' && msg.method !== '' && Object.prototype.hasOwnProperty.call(msg, 'id');
}

export function isJsonRpcNotification(msg: JsonRpcWire): boolean {
  return typeof msg.method === 'string' && msg.method !== '' && !Object.prototype.hasOwnProperty.call(msg, 'id');
}

export function isJsonRpcResponseMessage(msg: JsonRpcWire): boolean {
  return (
    msg.jsonrpc === '2.0' &&
    !msg.method &&
    Object.prototype.hasOwnProperty.call(msg, 'id') &&
    ('result' in msg || 'error' in msg)
  );
}

/** JSON-RPC response or notification from client → HTTP 202, no body. */
export function emptyAcceptedResponse(): NextResponse {
  return new NextResponse(null, { status: 202 });
}

function escapeSseDataLine(json: string): string {
  return json.replace(/\n/g, '\ndata: ');
}

/**
 * Single JSON-RPC payload as one MCP SSE message (event: message).
 * @see https://modelcontextprotocol.io/specification/2025-11-25/basic/transports
 */
export function mcpSseStreamResponse(payload: JsonRpcEnvelope | JsonRpcEnvelope[]): NextResponse {
  const objects = Array.isArray(payload) ? payload : [payload];
  const lines: string[] = ['id: 0', 'retry: 2000', 'event: message', 'data: ', ''];

  for (const obj of objects) {
    const json = JSON.stringify(obj);
    lines.push(`event: message`, `data: ${escapeSseDataLine(json)}`, '');
  }

  const body = lines.join('\n');
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

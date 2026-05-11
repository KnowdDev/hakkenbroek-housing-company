import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { validateApiKey } from '@/lib/mcp-api-keys';
import {
  createDbSession,
  getDbSession,
  touchSession,
  getUndeliveredMessages,
  markMessagesDelivered,
  cleanupExpiredSessions,
} from '@/lib/mcp-sessions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const apiKey = request.nextUrl.searchParams.get('apiKey');

  if (!apiKey) {
    return new Response('Missing apiKey query parameter', { status: 401 });
  }

  const validation = await validateApiKey(
    new Request('http://localhost', { headers: { 'x-api-key': apiKey } }) as unknown as NextRequest
  );

  if (!validation.valid) {
    return new Response('Invalid API key', { status: 401 });
  }

  const sessionId = crypto.randomUUID();
  await createDbSession(sessionId, apiKey);

  logger.info('SSE connection established', { sessionId: sessionId.substring(0, 8) });

  // Periodic cleanup (best-effort, runs in background)
  cleanupExpiredSessions().catch((err) =>
    logger.error('Background cleanup failed', err)
  );

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Send the endpoint event so the client knows where to POST messages
      controller.enqueue(
        encoder.encode(`event: endpoint\ndata: /api/mcp/messages?sessionId=${sessionId}\n\n`)
      );

      // Poll DB for outgoing messages and push them via SSE.
      // This loop keeps the SSE stream alive and works across
      // serverless invocations because state is in PostgreSQL.
      while (true) {
        try {
          const session = await getDbSession(sessionId);
          if (!session) {
            controller.close();
            break;
          }

          await touchSession(sessionId);

          const messages = await getUndeliveredMessages(sessionId);
          if (messages.length > 0) {
            for (const msg of messages) {
              const payload = JSON.stringify(msg.message);
              controller.enqueue(
                encoder.encode(`event: message\ndata: ${payload}\n\n`)
              );
            }
            await markMessagesDelivered(messages.map((m) => m.id));
          }

          // Wait 400ms before next poll
          await new Promise((resolve) => setTimeout(resolve, 400));
        } catch (err) {
          logger.error('SSE polling error', err instanceof Error ? err : undefined, {
            sessionId: sessionId.substring(0, 8),
          });
          controller.close();
          break;
        }
      }
    },
    cancel() {
      // Session remains in DB for 30 minutes so POST /messages can still
      // queue responses even if the SSE stream reconnects from a new instance.
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

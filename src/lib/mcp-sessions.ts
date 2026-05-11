import { query } from './db';
import { logger } from './logger';
import { validateApiKey } from './mcp-api-keys';

const SESSION_TTL_MINUTES = 30;

export async function createDbSession(sessionId: string, apiKey: string): Promise<void> {
  await query(
    `INSERT INTO mcp_sessions (session_id, api_key, expires_at, last_activity_at)
     VALUES ($1, $2, CURRENT_TIMESTAMP + INTERVAL '${SESSION_TTL_MINUTES} minutes', CURRENT_TIMESTAMP)
     ON CONFLICT (session_id) DO UPDATE SET
       api_key = EXCLUDED.api_key,
       expires_at = EXCLUDED.expires_at,
       last_activity_at = CURRENT_TIMESTAMP`,
    [sessionId, apiKey]
  );
  logger.debug('Session created', { sessionId: sessionId.substring(0, 8) });
}

export async function getDbSession(sessionId: string): Promise<{ session_id: string; api_key: string } | null> {
  const result = await query(
    `SELECT session_id, api_key FROM mcp_sessions
     WHERE session_id = $1 AND expires_at > CURRENT_TIMESTAMP
     LIMIT 1`,
    [sessionId]
  );
  return result.rows[0] ?? null;
}

export async function touchSession(sessionId: string): Promise<void> {
  await query(
    `UPDATE mcp_sessions SET last_activity_at = CURRENT_TIMESTAMP WHERE session_id = $1`,
    [sessionId]
  );
}

export async function deleteDbSession(sessionId: string): Promise<void> {
  await query('DELETE FROM mcp_sessions WHERE session_id = $1', [sessionId]);
  await query('DELETE FROM mcp_messages WHERE session_id = $1', [sessionId]);
}

export async function validateSessionAuth(sessionId: string): Promise<boolean> {
  const session = await getDbSession(sessionId);
  if (!session) return false;

  const mockReq = new Request('http://localhost', {
    headers: { 'x-api-key': session.api_key },
  });

  const result = await validateApiKey(mockReq as unknown as import('next/server').NextRequest);
  return result.valid;
}

export async function storeMessage(sessionId: string, data: unknown): Promise<void> {
  await query(
    `INSERT INTO mcp_messages (session_id, message) VALUES ($1, $2)`,
    [sessionId, JSON.stringify(data)]
  );
}

export async function getUndeliveredMessages(sessionId: string): Promise<{ id: number; message: unknown }[]> {
  const result = await query(
    `SELECT id, message FROM mcp_messages
     WHERE session_id = $1 AND delivered = FALSE
     ORDER BY id ASC
     LIMIT 100`,
    [sessionId]
  );
  return result.rows.map((r) => ({ id: r.id as number, message: r.message as unknown }));
}

export async function markMessagesDelivered(ids: number[]): Promise<void> {
  if (ids.length === 0) return;
  await query(
    `UPDATE mcp_messages SET delivered = TRUE WHERE id = ANY($1)`,
    [ids]
  );
}

export async function cleanupExpiredSessions(): Promise<void> {
  const sessionResult = await query(
    `DELETE FROM mcp_sessions WHERE expires_at < CURRENT_TIMESTAMP`
  );
  if (sessionResult.rowCount && sessionResult.rowCount > 0) {
    logger.info('Cleaned up expired sessions', { count: sessionResult.rowCount });
  }

  const msgResult = await query(
    `DELETE FROM mcp_messages WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '30 minutes'`
  );
  if (msgResult.rowCount && msgResult.rowCount > 0) {
    logger.info('Cleaned up stale messages', { count: msgResult.rowCount });
  }
}

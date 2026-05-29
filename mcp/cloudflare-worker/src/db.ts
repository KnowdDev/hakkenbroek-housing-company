import { neon } from '@neondatabase/serverless';

export interface DbClient {
  query<R = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: R[]; rowCount: number | null }>;
}

let sqlInstance: ReturnType<typeof neon> | null = null;

function getSql(): ReturnType<typeof neon> {
  if (!sqlInstance) {
    const connectionString = (globalThis as any).DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not configured');
    }
    sqlInstance = neon(connectionString);
  }
  return sqlInstance;
}

export async function query<R = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<{ rows: R[]; rowCount: number | null }> {
  const sql = getSql();
  const start = Date.now();

  try {
    const rows = await (sql as any).query(text, params ?? []) as R[];
    const duration = Date.now() - start;

    // Log slow queries via console (Cloudflare Workers logging)
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${text.substring(0, 120)} | ${duration}ms | rows:${rows.length}`);
    } else {
      console.log(`[QUERY] ${text.substring(0, 80)} | ${duration}ms | rows:${rows.length}`);
    }

    return { rows, rowCount: rows.length };
  } catch (err) {
    const duration = Date.now() - start;
    console.error(`[DB ERROR] ${text.substring(0, 120)} | ${duration}ms | ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}

export async function healthCheck(): Promise<{ healthy: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    await query('SELECT 1');
    return { healthy: true, latencyMs: Date.now() - start };
  } catch {
    return { healthy: false, latencyMs: Date.now() - start };
  }
}

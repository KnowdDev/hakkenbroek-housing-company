import { neon } from '@neondatabase/serverless';
import { logger } from './logger';
import { DatabaseError, TimeoutError } from './errors';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  logger.warn('DATABASE_URL environment variable is not set. Database queries will fail.');
}

// Lazy-initialise the Neon client so an invalid DATABASE_URL does not break
// the Next.js build during static page generation.
let sqlInstance: ReturnType<typeof neon> | null = null;
function getSql() {
  if (!sqlInstance && DATABASE_URL) {
    try {
      sqlInstance = neon(DATABASE_URL);
    } catch (err) {
      logger.error('Failed to initialise Neon client', err instanceof Error ? err : undefined);
      throw new DatabaseError(
        err instanceof Error ? err.message : 'Failed to initialise Neon client'
      );
    }
  }
  return sqlInstance;
}

const QUERY_TIMEOUT_MS = parseInt(process.env.DB_QUERY_TIMEOUT || '15000', 10);
const MAX_RETRIES = parseInt(process.env.DB_MAX_RETRIES || '3', 10);
const RETRY_BASE_DELAY_MS = parseInt(process.env.DB_RETRY_BASE_DELAY || '100', 10);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes('connection') ||
    msg.includes('timeout') ||
    msg.includes('deadlock') ||
    msg.includes('could not serialize') ||
    msg.includes('connection terminated') ||
    msg.includes('connection reset') ||
    msg.includes('econnreset') ||
    msg.includes('econnrefused') ||
    msg.includes('etimedout') ||
    msg.includes('fetch failed') ||
    msg.includes('networkerror')
  );
}

function coerceNumericFields(row: any): any {
  const r = { ...row };
  if (typeof r.price === 'string') {
    r.price = parseFloat(r.price);
  }
  return r;
}

async function withRetry<T>(
  operation: () => Promise<T>,
  context: string,
  maxRetries: number = MAX_RETRIES
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries && isRetryableError(error)) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 100;
        logger.warn(`DB retry ${attempt + 1}/${maxRetries} for '${context}'`, {
          delay,
          error: error instanceof Error ? error.message : String(error),
        });
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  context: string
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new TimeoutError(context, timeoutMs));
    }, timeoutMs);
    operation()
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export async function query<R = any>(
  text: string,
  params?: unknown[]
): Promise<{ rows: R[]; rowCount: number | null }> {
  const start = Date.now();
  const sql = getSql();
  if (!sql) {
    throw new DatabaseError('DATABASE_URL is not configured');
  }
  try {
    const result = await withTimeout(
      () =>
        withRetry(
          async () => {
            const rows = (await sql.query(text, params ?? [])) as R[];
            const coercedRows = rows.map(coerceNumericFields) as R[];
            return { rows: coercedRows, rowCount: rows.length };
          },
          text.substring(0, 80)
        ),
      QUERY_TIMEOUT_MS,
      `query: ${text.substring(0, 60)}`
    );
    const duration = Date.now() - start;
    if (duration > 1000) {
      logger.warn('Slow query', { text: text.substring(0, 120), duration, rows: result.rowCount });
    } else {
      logger.debug('Query executed', { text: text.substring(0, 80), duration, rows: result.rowCount });
    }
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    if (error instanceof TimeoutError) {
      logger.error('Query timeout', error, { text: text.substring(0, 120), duration });
      throw error;
    }
    logger.error('Database query failed', error instanceof Error ? error : undefined, { text: text.substring(0, 120), duration });
    throw new DatabaseError(
      error instanceof Error ? error.message : 'Unknown database error',
      error instanceof Error ? error : undefined
    );
  }
}

export async function healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }> {
  const start = Date.now();
  try {
    await withTimeout(
      () =>
        withRetry(async () => {
          const sql = getSql();
          if (!sql) throw new Error('No DB');
          await sql.query('SELECT 1');
        }, 'health check'),
      5000,
      'health check'
    );
    return { healthy: true, latencyMs: Date.now() - start };
  } catch (err) {
    logger.error('Health check DB error', err instanceof Error ? err : undefined);
    return { healthy: false, latencyMs: Date.now() - start, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function getPoolStats() {
  return { totalConnections: 0, idleConnections: 0, waitingClients: 0 };
}

export async function shutdown(): Promise<void> {
  logger.info('Database shutdown (serverless driver — nothing to drain)');
}

export async function resolveConfig(key: string): Promise<string | undefined> {
  const envVal = process.env[key];
  if (envVal) return envVal;
  try {
    const { resolveSecret } = await import('./vault');
    return await resolveSecret(key);
  } catch {
    return undefined;
  }
}

export default { query, healthCheck, getPoolStats, shutdown, resolveConfig };

import { Pool, types, PoolConfig, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';
import { DatabaseError, TimeoutError } from './errors';

// Parse DECIMAL / NUMERIC as numbers instead of strings
// OID 1700 = numeric/decimal in PostgreSQL
types.setTypeParser(1700, (val: string) => parseFloat(val));

const MAX_POOL_SIZE = parseInt(process.env.DB_POOL_MAX || '20', 10);
const IDLE_TIMEOUT_MS = parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000', 10);
const CONNECTION_TIMEOUT_MS = parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10);
const QUERY_TIMEOUT_MS = parseInt(process.env.DB_QUERY_TIMEOUT || '15000', 10);
const MAX_RETRIES = parseInt(process.env.DB_MAX_RETRIES || '3', 10);
const RETRY_BASE_DELAY_MS = parseInt(process.env.DB_RETRY_BASE_DELAY || '100', 10);

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_GEonZ8peVD6j@ep-icy-glitter-al0foo46-pooler.c-3.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  max: MAX_POOL_SIZE,
  idleTimeoutMillis: IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
  // Neon requires SSL
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(poolConfig);

pool.on('error', (err: Error) => {
  logger.error('Unexpected pool error', err, { poolTotal: pool.totalCount, poolIdle: pool.idleCount });
});

pool.on('connect', () => {
  logger.debug('New client connected to pool', { poolTotal: pool.totalCount, poolIdle: pool.idleCount });
});

pool.on('remove', () => {
  logger.debug('Client removed from pool', { poolTotal: pool.totalCount, poolIdle: pool.idleCount });
});

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
    msg.includes('etimedout')
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export async function query<R extends QueryResultRow = any>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<R>> {
  const start = Date.now();

  try {
    const result = await withTimeout(
      () =>
        withRetry(
          () => pool.query<R>(text, params),
          text.substring(0, 80)
        ),
      QUERY_TIMEOUT_MS,
      `query: ${text.substring(0, 60)}`
    );

    const duration = Date.now() - start;

    if (duration > 1000) {
      logger.warn('Slow query', {
        text: text.substring(0, 120),
        duration,
        rows: result.rowCount,
      });
    } else {
      logger.debug('Query executed', {
        text: text.substring(0, 80),
        duration,
        rows: result.rowCount,
      });
    }

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof TimeoutError) {
      logger.error('Query timeout', error, {
        text: text.substring(0, 120),
        duration,
      });
      throw error;
    }

    logger.error('Database query failed', error instanceof Error ? error : undefined, {
      text: text.substring(0, 120),
      duration,
    });

    throw new DatabaseError(
      error instanceof Error ? error.message : 'Unknown database error',
      error instanceof Error ? error : undefined
    );
  }
}

export async function healthCheck(): Promise<{ healthy: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    await withTimeout(
      () => pool.query('SELECT 1'),
      5000,
      'health check'
    );
    return { healthy: true, latencyMs: Date.now() - start };
  } catch {
    return { healthy: false, latencyMs: Date.now() - start };
  }
}

export async function getPoolStats() {
  return {
    totalConnections: pool.totalCount,
    idleConnections: pool.idleCount,
    waitingClients: pool.waitingCount,
  };
}

export async function shutdown(): Promise<void> {
  logger.info('Draining database pool...');
  await pool.end();
  logger.info('Database pool drained');
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

export default pool;

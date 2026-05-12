import { healthCheck, getPoolStats } from '@/lib/db';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const start = Date.now();
  const dbHealth = await healthCheck();
  const poolStats = await getPoolStats();

  const overallHealthy = dbHealth.healthy;
  const totalDuration = Date.now() - start;

  logger.info('Health check', {
    healthy: overallHealthy,
    dbHealthy: dbHealth.healthy,
    dbLatencyMs: dbHealth.latencyMs,
    totalDuration,
    ...poolStats,
  });

  return Response.json(
    {
      status: overallHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '1.2.0',
      uptime: process.uptime(),
      checks: {
        database: {
          healthy: dbHealth.healthy,
          latencyMs: dbHealth.latencyMs,
        },
      },
      pool: poolStats,
    },
    {
      status: overallHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
}

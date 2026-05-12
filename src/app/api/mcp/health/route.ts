import { NextResponse } from 'next/server';
import { healthCheck, getPoolStats } from '@/lib/db';
import { MCP_SERVER_PROTOCOL_VERSIONS } from '@/lib/mcp-protocol';

export const dynamic = 'force-dynamic';

const startedAt = Date.now();

export async function GET() {
  const db = await healthCheck();
  const pool = await getPoolStats();

  const status = db.healthy ? 200 : 503;

  return NextResponse.json(
    {
      ok: db.healthy,
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      database: db,
      pool,
      mcpProtocolVersions: [...MCP_SERVER_PROTOCOL_VERSIONS],
    },
    { status }
  );
}

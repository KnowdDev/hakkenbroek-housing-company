import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/mcp-api-keys';
import { hasDashboardAuth } from '@/lib/dashboard-auth';

export async function requireApiKey(request: NextRequest): Promise<NextResponse | null> {
  const result = await validateApiKey(request);
  if (!result.valid) {
    return NextResponse.json({ error: 'Unauthorized: invalid API key' }, { status: 401 });
  }
  return null;
}

export async function requireWriteAccess(request: NextRequest): Promise<NextResponse | null> {
  if (hasDashboardAuth(request)) {
    return null;
  }

  return requireApiKey(request);
}

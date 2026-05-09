import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/mcp-api-keys';

export async function requireApiKey(request: NextRequest): Promise<NextResponse | null> {
  const isValid = await validateApiKey(request);
  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized: invalid API key' }, { status: 401 });
  }
  return null;
}

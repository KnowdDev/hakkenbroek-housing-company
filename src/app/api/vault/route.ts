import { NextRequest, NextResponse } from 'next/server';
import { requireDashboardAuth } from '@/lib/dashboard-auth';
import { setSecret, listSecrets, deleteSecret, getSecret } from '@/lib/vault';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const auth = requireDashboardAuth(request);
  if (auth) return auth;

  try {
    const secrets = await listSecrets();
    return NextResponse.json(secrets);
  } catch (error) {
    logger.error('Failed to list vault secrets', error instanceof Error ? error : undefined);
    return NextResponse.json({ error: 'Failed to list secrets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = requireDashboardAuth(request);
  if (auth) return auth;

  try {
    const body = await request.json().catch(() => ({}));
    const { key, value, description } = body;

    if (!key || typeof key !== 'string' || !key.trim()) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    if (!value || typeof value !== 'string') {
      return NextResponse.json({ error: 'Value is required' }, { status: 400 });
    }

    const entry = await setSecret(key.trim(), value, description?.trim() || undefined);
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    logger.error('Failed to store vault secret', error instanceof Error ? error : undefined);
    return NextResponse.json({ error: 'Failed to store secret' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = requireDashboardAuth(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Key parameter is required' }, { status: 400 });
    }

    const deleted = await deleteSecret(key);
    if (!deleted) {
      return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Secret deleted' });
  } catch (error) {
    logger.error('Failed to delete vault secret', error instanceof Error ? error : undefined);
    return NextResponse.json({ error: 'Failed to delete secret' }, { status: 500 });
  }
}

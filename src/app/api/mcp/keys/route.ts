import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ensureApiKeysTable, generateApiKeyMaterial } from '@/lib/mcp-api-keys';
import { requireDashboardAuth } from '@/lib/dashboard-auth';

export async function GET(request: NextRequest) {
  const unauthorizedResponse = requireDashboardAuth(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    await ensureApiKeysTable();
    const result = await query(
      `SELECT key_id, name, key_preview, created_at, last_used_at, last_used_ip, request_count, revoked_at
       FROM api_keys
       ORDER BY created_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorizedResponse = requireDashboardAuth(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    await ensureApiKeysTable();
    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === 'string' && body.name.trim() ? body.name.trim() : 'Dashboard key';

    const { keyId, plainKey, keyHash, keyPreview } = generateApiKeyMaterial();

    await query(
      `INSERT INTO api_keys (key_id, name, key_hash, key_preview, last_used_ip, request_count)
       VALUES ($1, $2, $3, $4, NULL, 0)`,
      [keyId, name, keyHash, keyPreview]
    );

    return NextResponse.json(
      {
        key_id: keyId,
        name,
        key: plainKey,
        key_preview: keyPreview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}

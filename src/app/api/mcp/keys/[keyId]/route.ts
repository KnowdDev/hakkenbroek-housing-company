import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireDashboardAuth } from '@/lib/dashboard-auth';
import { ensureApiKeysTable } from '@/lib/mcp-api-keys';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ keyId: string }> }
) {
  const unauthorizedResponse = requireDashboardAuth(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    await ensureApiKeysTable();
    const { keyId } = await params;
    const result = await query(
      `UPDATE api_keys
       SET revoked_at = CURRENT_TIMESTAMP
       WHERE key_id = $1 AND revoked_at IS NULL
       RETURNING key_id`,
      [keyId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Key not found or already revoked' }, { status: 404 });
    }

    return NextResponse.json({ message: 'API key revoked' });
  } catch (error) {
    console.error('Error revoking API key:', error);
    return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 });
  }
}

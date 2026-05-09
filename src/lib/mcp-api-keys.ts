import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

const KEY_PREFIX = 'hbk_live';

export async function ensureApiKeysTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id SERIAL PRIMARY KEY,
      key_id VARCHAR(32) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      key_hash VARCHAR(128) NOT NULL,
      key_preview VARCHAR(64) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_used_at TIMESTAMP,
      revoked_at TIMESTAMP
    )
  `);
}

function hashSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

function parseManagedKey(rawKey: string): { keyId: string; secret: string } | null {
  const parts = rawKey.split('_');
  if (parts.length !== 4) return null;
  if (parts[0] !== 'hbk' || parts[1] !== 'live') return null;

  const keyId = parts[2];
  const secret = parts[3];
  if (!keyId || !secret) return null;

  return { keyId, secret };
}

function extractApiKey(request: NextRequest): string | null {
  const xApiKey = request.headers.get('x-api-key');
  if (xApiKey) return xApiKey;

  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() === 'bearer' && token) {
    return token;
  }

  return null;
}

export async function validateApiKey(request: NextRequest): Promise<boolean> {
  const providedApiKey = extractApiKey(request);
  if (!providedApiKey) return false;

  // Backward-compatible single static key support.
  const staticApiKey = process.env.MCP_API_KEY;
  if (staticApiKey && providedApiKey === staticApiKey) {
    return true;
  }

  const parsed = parseManagedKey(providedApiKey);
  if (!parsed) return false;

  await ensureApiKeysTable();

  const result = await query(
    'SELECT key_hash FROM api_keys WHERE key_id = $1 AND revoked_at IS NULL LIMIT 1',
    [parsed.keyId]
  );

  if (result.rows.length === 0) return false;

  const providedHash = hashSecret(parsed.secret);
  const storedHash = result.rows[0].key_hash as string;
  if (providedHash !== storedHash) return false;

  await query('UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP WHERE key_id = $1', [parsed.keyId]);
  return true;
}

export function generateApiKeyMaterial() {
  const keyId = crypto.randomBytes(8).toString('hex');
  const secret = crypto.randomBytes(24).toString('hex');
  const plainKey = `${KEY_PREFIX}_${keyId}_${secret}`;
  const keyHash = hashSecret(secret);
  const keyPreview = `${KEY_PREFIX}_${keyId}_...`;

  return { keyId, plainKey, keyHash, keyPreview };
}

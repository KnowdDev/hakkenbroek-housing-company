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
      last_used_ip VARCHAR(45),
      request_count INTEGER DEFAULT 0,
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

export async function validateApiKey(request: NextRequest): Promise<{ valid: boolean; keyId?: string }> {
  const providedApiKey = extractApiKey(request);
  if (!providedApiKey) return { valid: false };

  // Backward-compatible single static key support.
  const staticApiKey = process.env.MCP_API_KEY;
  if (staticApiKey && providedApiKey === staticApiKey) {
    return { valid: true };
  }

  const parsed = parseManagedKey(providedApiKey);
  if (!parsed) return { valid: false };

  await ensureApiKeysTable();

  const result = await query(
    'SELECT key_hash FROM api_keys WHERE key_id = $1 AND revoked_at IS NULL LIMIT 1',
    [parsed.keyId]
  );

  if (result.rows.length === 0) return { valid: false };

  const providedHash = hashSecret(parsed.secret);
  const storedHash = result.rows[0].key_hash as string;
  if (!crypto.timingSafeEqual(Buffer.from(providedHash, 'hex'), Buffer.from(storedHash, 'hex'))) {
    return { valid: false };
  }

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   'unknown';

  await query(
    'UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP, last_used_ip = $1, request_count = request_count + 1 WHERE key_id = $2',
    [clientIp, parsed.keyId]
  );
  return { valid: true, keyId: parsed.keyId };
}

export function generateApiKeyMaterial() {
  const keyId = crypto.randomBytes(8).toString('hex');
  const secret = crypto.randomBytes(24).toString('hex');
  const plainKey = `${KEY_PREFIX}_${keyId}_${secret}`;
  const keyHash = hashSecret(secret);
  const keyPreview = `${KEY_PREFIX}_${keyId}_...`;

  return { keyId, plainKey, keyHash, keyPreview };
}

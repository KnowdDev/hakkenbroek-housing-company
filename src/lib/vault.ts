import crypto from 'crypto';
import { query } from './db';
import { logger } from './logger';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const KEY_LENGTH = 32;

function getMasterKey(): Buffer {
  const key = process.env.VAULT_MASTER_KEY;
  if (!key) {
    throw new Error('VAULT_MASTER_KEY environment variable is required');
  }
  return crypto.scryptSync(key, 'hakkenbroek-vault-salt', KEY_LENGTH);
}

function encrypt(plaintext: string): string {
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(ciphertext: string): string {
  const key = getMasterKey();
  const [ivHex, authTagHex, encrypted] = ciphertext.split(':');

  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid ciphertext format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function ensureVaultTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS vault (
      id SERIAL PRIMARY KEY,
      key VARCHAR(255) NOT NULL UNIQUE,
      value_encrypted TEXT NOT NULL,
      description VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export interface VaultEntry {
  id: number;
  key: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaultEntryWithValue extends VaultEntry {
  value: string;
}

export async function setSecret(key: string, value: string, description?: string): Promise<VaultEntry> {
  await ensureVaultTable();
  const encrypted = encrypt(value);

  const result = await query(
    `INSERT INTO vault (key, value_encrypted, description, updated_at)
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
     ON CONFLICT (key) DO UPDATE SET
       value_encrypted = EXCLUDED.value_encrypted,
       description = COALESCE(EXCLUDED.description, vault.description),
       updated_at = CURRENT_TIMESTAMP
     RETURNING id, key, description, created_at, updated_at`,
    [key, encrypted, description || null]
  );

  logger.info(`Vault secret '${key}' stored`);
  return result.rows[0] as VaultEntry;
}

export async function getSecret(key: string): Promise<VaultEntryWithValue | null> {
  await ensureVaultTable();

  const result = await query(
    `SELECT id, key, value_encrypted, description, created_at, updated_at
     FROM vault WHERE key = $1 LIMIT 1`,
    [key]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  const decrypted = decrypt(row.value_encrypted as string);

  return {
    id: row.id as number,
    key: row.key as string,
    value: decrypted,
    description: row.description as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function listSecrets(): Promise<VaultEntry[]> {
  await ensureVaultTable();

  const result = await query(
    `SELECT id, key, description, created_at, updated_at
     FROM vault ORDER BY key ASC`
  );

  return result.rows as VaultEntry[];
}

export async function deleteSecret(key: string): Promise<boolean> {
  await ensureVaultTable();

  const result = await query(
    `DELETE FROM vault WHERE key = $1 RETURNING key`,
    [key]
  );

  if (result.rowCount && result.rowCount > 0) {
    logger.info(`Vault secret '${key}' deleted`);
    return true;
  }

  return false;
}

export async function resolveSecret(key: string): Promise<string> {
  const secret = await getSecret(key);
  if (!secret) {
    throw new Error(`Vault secret '${key}' not found`);
  }
  return secret.value;
}

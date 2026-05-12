import { query } from '@/lib/db';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { peekDedupe, rememberDedupe } from '@/lib/mcp-tool-dedupe';
import {
  LISTING_PATCH_COLUMNS,
  listingRequestedPatchKeys,
  normalizeListingRow,
  shallowEqualListingValue,
  fieldDisplayEmpty,
  type ListingPatchColumn,
} from '@/lib/listing-update-patch';
import { updateListingToolSchema, updateListingJsonSchema } from '@/lib/validation';
import { z } from 'zod';

export interface McpRequestContext {
  dedupeNamespace: string;
}

const IMPORTANT_FIELDS = [
  'description',
  'bedrooms',
  'bathrooms',
  'area',
  'price',
  'image_url',
  'images',
] as const;

function validateArgs<T>(schema: z.ZodSchema<T>, args: unknown, toolName: string): T {
  const result = schema.safeParse(args);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || '_root';
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    throw new ValidationError(`Invalid arguments for ${toolName}`, fieldErrors);
  }
  return result.data;
}

const PATCH_KEY_WHITELIST = new Set<string>(LISTING_PATCH_COLUMNS);

/**
 * Expands update_listing_json tool args into the same shape as update_listing.
 * patch_json must be a JSON object; only updatable listing columns are merged (unknown keys ignored).
 */
export function rawArgsFromListingPatchJson(args: Record<string, unknown>): Record<string, unknown> {
  const validated = validateArgs(updateListingJsonSchema, args, 'update_listing_json');

  let parsed: unknown;
  try {
    parsed = JSON.parse(validated.patch_json);
  } catch {
    throw new ValidationError('Invalid arguments for update_listing_json', {
      patch_json: ['patch_json must be valid JSON'],
    });
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new ValidationError('Invalid arguments for update_listing_json', {
      patch_json: ['patch_json must be a JSON object (not an array or primitive)'],
    });
  }

  const inner = parsed as Record<string, unknown>;
  const merged: Record<string, unknown> = { id: validated.id };
  if (validated.dry_run !== undefined) merged.dry_run = validated.dry_run;

  for (const key of Object.keys(inner)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    if (!PATCH_KEY_WHITELIST.has(key)) continue;
    merged[key] = inner[key];
  }

  return merged;
}

function mergePreview(current: Record<string, unknown>, patch: Partial<Record<ListingPatchColumn, unknown>>): Record<string, unknown> {
  return { ...current, ...patch };
}

function computeDiff(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  keys: ListingPatchColumn[]
): Record<string, { before: unknown; after: unknown }> {
  const diff: Record<string, { before: unknown; after: unknown }> = {};
  for (const k of keys) {
    const bv = before[k];
    const av = after[k];
    if (!shallowEqualListingValue(bv, av)) {
      diff[k] = { before: bv, after: av };
    }
  }
  return diff;
}

function importantGaps(row: Record<string, unknown>): string[] {
  return IMPORTANT_FIELDS.filter((f) => fieldDisplayEmpty(row[f]));
}

export async function buildUpdateListingToolPayload(
  rawArgs: Record<string, unknown>,
  ctx?: McpRequestContext
): Promise<string> {
  const validated = validateArgs(updateListingToolSchema, rawArgs, 'update_listing');
  const dryRun = validated.dry_run === true;
  const updateId = validated.id;

  const requestedFields = listingRequestedPatchKeys(rawArgs);
  const warnings: string[] = [];

  const dupNs = ctx?.dedupeNamespace ?? 'anon';

  const duplicatePayload = !dryRun ? peekDedupe(dupNs, 'update_listing', rawArgs) : null;
  if (duplicatePayload) {
    const dup = duplicatePayload;
    try {
      const parsed = JSON.parse(dup) as {
        listing?: unknown;
        meta?: Record<string, unknown>;
      };
      const prevWarn = parsed.meta?.warnings;
      parsed.meta = {
        ...(parsed.meta ?? {}),
        duplicate_identical_call: true,
        warnings: [
          ...(Array.isArray(prevWarn) ? (prevWarn as string[]) : []),
          'Repeated identical update_listing within the dedupe window — stopping a likely agent loop. Change arguments or wait before retrying.',
        ],
      };
      return JSON.stringify(parsed, null, 2);
    } catch {
      return dup;
    }
  }

  const existing = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [updateId]);
  if (existing.rows.length === 0) {
    throw new NotFoundError('Listing', updateId);
  }

  const beforeNorm = normalizeListingRow(existing.rows[0] as Record<string, unknown>);

  if (requestedFields.length === 0) {
    warnings.push(
      'No updatable listing fields were supplied (only id / dry_run?). Send every field you intend to change in a single update_listing call — omitted fields are left unchanged.'
    );
    return JSON.stringify(
      {
        listing: beforeNorm,
        meta: {
          dry_run: dryRun,
          fields_requested: [],
          fields_applied: [],
          diff: {},
          warnings,
        },
      },
      null,
      2
    );
  }

  const patch: Partial<Record<ListingPatchColumn, unknown>> = {};
  for (const field of requestedFields) {
    patch[field] = (validated as Record<string, unknown>)[field];
  }

  const previewRow = normalizeListingRow(mergePreview(beforeNorm, patch));
  const diffPreview = computeDiff(beforeNorm, previewRow, requestedFields);

  if (requestedFields.length <= 2 && importantGaps(previewRow).length >= 4) {
    warnings.push(
      `You only patched ${requestedFields.join(', ')}, but core merchandising fields are still empty or sparse (${importantGaps(previewRow).join(', ')}). Prefer one rich update_listing with description, bedrooms, bathrooms, area, price, and images together.`
    );
  }

  if (Object.keys(diffPreview).length === 0) {
    warnings.push(
      'No effective change: supplied values match what is already stored. Expand your payload or use dry_run:true to preview.'
    );
    const payload = JSON.stringify(
      {
        listing: beforeNorm,
        meta: {
          dry_run: dryRun,
          skipped_no_database_changes: true,
          fields_requested: requestedFields,
          fields_applied: [],
          diff: {},
          warnings,
        },
      },
      null,
      2
    );
    if (!dryRun) {
      rememberDedupe(dupNs, 'update_listing', rawArgs, payload);
    }
    return payload;
  }

  if (dryRun) {
    const gaps = importantGaps(previewRow);
    if (gaps.length > 0) {
      warnings.push(`After this patch the listing would still lack useful content for: ${gaps.join(', ')}.`);
    }
    return JSON.stringify(
      {
        listing: previewRow,
        meta: {
          dry_run: true,
          fields_requested: requestedFields,
          fields_applied: [],
          diff: diffPreview,
          warnings,
        },
      },
      null,
      2
    );
  }

  const setClauses: string[] = [];
  const sqlValues: unknown[] = [];
  let paramIndex = 1;

  for (const field of requestedFields) {
    let v: unknown = (validated as Record<string, unknown>)[field];
    if (field === 'images') {
      v = v == null ? null : JSON.stringify(v);
    }
    setClauses.push(`${field} = $${paramIndex++}`);
    sqlValues.push(v);
  }

  setClauses.push('updated_at = CURRENT_TIMESTAMP');
  sqlValues.push(updateId);

  const sql = `UPDATE listings SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

  const updated = await query(sql, sqlValues);

  const afterNorm = normalizeListingRow(updated.rows[0] as Record<string, unknown>);
  const diffApplied = computeDiff(beforeNorm, afterNorm, requestedFields);

  const gapsAfter = importantGaps(afterNorm);
  if (gapsAfter.length > 0) {
    warnings.push(`Listing remains incomplete or sparse on: ${gapsAfter.join(', ')} (consider patching these next).`);
  }

  const payloadObj = {
    listing: afterNorm,
    meta: {
      dry_run: false,
      fields_requested: requestedFields,
      fields_applied: Object.keys(diffApplied),
      diff: diffApplied,
      warnings,
    },
  };

  const payload = JSON.stringify(payloadObj, null, 2);
  rememberDedupe(dupNs, 'update_listing', rawArgs, payload);
  return payload;
}

/** PATCH semantics + snapshots for MCP update_listing (never wipe unspecified columns). */

export const LISTING_PATCH_COLUMNS = [
  'title',
  'description',
  'price',
  'bedrooms',
  'bathrooms',
  'area',
  'address',
  'city',
  'postal_code',
  'property_type',
  'status',
  'listing_type',
  'image_url',
  'featured',
  'year_built',
  'energy_label',
  'floors',
  'furnished',
  'garden',
  'garden_area',
  'balcony',
  'terrace',
  'parking',
  'parking_spaces',
  'elevator',
  'basement',
  'images',
] as const;

export type ListingPatchColumn = (typeof LISTING_PATCH_COLUMNS)[number];

export type UpdateListingValidated = Record<string, unknown> & { id: number };

export function listingRequestedPatchKeys(rawArgs: Record<string, unknown>): ListingPatchColumn[] {
  const out: ListingPatchColumn[] = [];
  for (const col of LISTING_PATCH_COLUMNS) {
    if (Object.prototype.hasOwnProperty.call(rawArgs, col)) out.push(col);
  }
  return out;
}

export function normalizeListingRow(row: Record<string, unknown>): Record<string, unknown> {
  const out = { ...row };
  const imgs = out.images;
  if (typeof imgs === 'string') {
    try {
      out.images = JSON.parse(imgs) as unknown;
    } catch {
      /* leave string */
    }
  }
  return out;
}

export function shallowEqualListingValue(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function fieldDisplayEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

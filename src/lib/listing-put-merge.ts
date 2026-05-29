/** Columns writable via PUT /api/listings/[id] — body keys present override DB row; omitted keys preserved. */

export const LISTING_PUT_PATCH_KEYS = [
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
  'images',
  'year_built',
  'energy_label',
  'garden',
  'garden_area',
  'parking',
  'parking_spaces',
  'balcony',
  'terrace',
  'furnished',
  'basement',
  'elevator',
  'floors',
  'source_url',
] as const;

export function coerceListingImages(row: Record<string, unknown>): Record<string, unknown> {
  const r = { ...row };
  if (typeof r.images === 'string') {
    try {
      r.images = JSON.parse(r.images) as unknown;
    } catch {
      /* leave string */
    }
  }
  return r;
}

export function mergeListingPutBody(
  existingRow: Record<string, unknown>,
  body: Record<string, unknown>
): Record<string, unknown> {
  const cur = coerceListingImages(existingRow);
  const merged = { ...cur };
  for (const key of LISTING_PUT_PATCH_KEYS) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      merged[key] = body[key];
    }
  }
  return merged;
}

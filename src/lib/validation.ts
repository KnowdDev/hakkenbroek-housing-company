import { z } from 'zod';

export const energyLabelEnum = z.enum([
  'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
]);

export const propertyTypeEnum = z.enum([
  'apartment', 'house', 'villa', 'studio', 'penthouse',
]);

export const listingStatusEnum = z.enum([
  'available', 'sold', 'rented', 'under-consideration',
]);

export const listingTypeEnum = z.enum(['sale', 'rent']);

export const getListingSchema = z.object({
  id: z.number().int().positive('Listing ID must be a positive integer'),
});

export const createListingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  description: z.string().max(10000).optional(),
  price: z.number().positive('Price must be positive').optional(),
  bedrooms: z.number().int().min(0).max(100).optional(),
  bathrooms: z.number().int().min(0).max(100).optional(),
  area: z.number().positive('Area must be positive').optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(200).optional(),
  postal_code: z.string().max(20).optional(),
  property_type: propertyTypeEnum.optional(),
  status: listingStatusEnum.optional(),
  listing_type: listingTypeEnum.optional(),
  image_url: z.string().url('Invalid image URL').max(2000).optional(),
  images: z.array(z.string().url().max(2000)).max(50).optional(),
  featured: z.boolean().optional(),
  year_built: z.number().int().min(1500).max(2100).optional(),
  energy_label: energyLabelEnum.optional(),
  floors: z.number().int().min(0).max(200).optional(),
  furnished: z.boolean().optional(),
  garden: z.boolean().optional(),
  garden_area: z.number().min(0).optional(),
  balcony: z.boolean().optional(),
  terrace: z.boolean().optional(),
  parking: z.boolean().optional(),
  parking_spaces: z.number().int().min(0).max(100).optional(),
  elevator: z.boolean().optional(),
  basement: z.boolean().optional(),
  source_url: z.string().url('Invalid source URL').max(2000).optional(),
});

export const updateListingSchema = z.object({
  id: z.number().int().positive('Listing ID must be a positive integer'),
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(10000).optional(),
  price: z.number().positive('Price must be positive').optional(),
  bedrooms: z.number().int().min(0).max(100).optional(),
  bathrooms: z.number().int().min(0).max(100).optional(),
  area: z.number().positive('Area must be positive').optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(200).optional(),
  postal_code: z.string().max(20).optional(),
  property_type: propertyTypeEnum.optional(),
  status: listingStatusEnum.optional(),
  listing_type: listingTypeEnum.optional(),
  image_url: z.string().url('Invalid image URL').max(2000).optional(),
  images: z.array(z.string().url().max(2000)).max(50).optional(),
  featured: z.boolean().optional(),
  year_built: z.number().int().min(1500).max(2100).optional(),
  energy_label: energyLabelEnum.optional(),
  floors: z.number().int().min(0).max(200).optional(),
  furnished: z.boolean().optional(),
  garden: z.boolean().optional(),
  garden_area: z.number().min(0).optional(),
  balcony: z.boolean().optional(),
  terrace: z.boolean().optional(),
  parking: z.boolean().optional(),
  parking_spaces: z.number().int().min(0).max(100).optional(),
  elevator: z.boolean().optional(),
  basement: z.boolean().optional(),
  source_url: z.string().url('Invalid source URL').max(2000).optional(),
});

/** MCP update_listing only — preview mode without writing to DB */
export const updateListingToolSchema = updateListingSchema.extend({
  dry_run: z.boolean().optional(),
});

/** MCP escape hatch: full listing patch as one JSON string (avoids truncated multi-field arguments). */
export const updateListingJsonSchema = z.object({
  id: z.number().int().positive('Listing ID must be a positive integer'),
  patch_json: z.string().min(2).max(512 * 1024),
  dry_run: z.boolean().optional(),
});

export const deleteListingSchema = z.object({
  id: z.number().int().positive('Listing ID must be a positive integer'),
});

export const createEnquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(300),
  phone: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
  property_id: z.number().int().positive().optional(),
});

export const extractMarkdownSchema = z.object({
  markdown: z.string().min(1, 'Markdown is required').max(512 * 1024),
});

export type GetListingInput = z.infer<typeof getListingSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type UpdateListingToolInput = z.infer<typeof updateListingToolSchema>;
export type UpdateListingJsonInput = z.infer<typeof updateListingJsonSchema>;
export type DeleteListingInput = z.infer<typeof deleteListingSchema>;
export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type ExtractMarkdownInput = z.infer<typeof extractMarkdownSchema>;

import { z } from 'zod';
import { query } from './db';
import { logger } from './logger';
import { ValidationError, NotFoundError } from './errors';
import {
  getListingSchema,
  createListingSchema,
  updateListingSchema,
  deleteListingSchema,
  createEnquirySchema,
} from './validation';

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: number | string;
  method: string;
  params?: Record<string, unknown>;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: number | string;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

type ToolHandler = (args: Record<string, unknown>, id: number | string) => Promise<JsonRpcResponse>;

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: ToolHandler;
}

const SERVER_NAME = 'hakkenbroek-housing';
const SERVER_VERSION = '1.2.0';
const PROTOCOL_VERSION = '2024-11-05';

const tools: ToolDefinition[] = [
  {
    name: 'list_listings',
    description: 'List all property listings. Returns an array of listings with full details including luxury features.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (_args, id) => {
      const data = await query('SELECT * FROM listings ORDER BY created_at DESC');
      return buildToolResult(id, JSON.stringify(data.rows, null, 2));
    },
  },
  {
    name: 'get_listing',
    description: 'Get a single property listing by ID. Returns the full listing details.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: 'The listing ID' } },
      required: ['id'],
    },
    handler: async (args, id) => {
      const { id: listingId } = validateArgs(getListingSchema, args, 'get_listing');
      const data = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
      if (data.rows.length === 0) throw new NotFoundError('Listing', listingId);
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'create_listing',
    description: 'Create a new property listing. Returns the created listing.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Property title' },
        description: { type: 'string', description: 'Property description' },
        price: { type: 'number', description: 'Price in Euros' },
        bedrooms: { type: 'number', description: 'Number of bedrooms' },
        bathrooms: { type: 'number', description: 'Number of bathrooms' },
        area: { type: 'number', description: 'Area in square meters' },
        address: { type: 'string', description: 'Street address' },
        city: { type: 'string', description: 'City name' },
        postal_code: { type: 'string', description: 'Postal code' },
        property_type: { type: 'string', description: 'apartment, house, villa, studio, penthouse' },
        status: { type: 'string', description: 'available, sold, rented, under-consideration' },
        listing_type: { type: 'string', description: 'sale or rent' },
        image_url: { type: 'string', description: 'Primary image URL' },
        images: { type: 'array', description: 'Array of gallery image URLs', items: { type: 'string' } },
        featured: { type: 'boolean', description: 'Highlight on homepage' },
        year_built: { type: 'number', description: 'Year the property was built' },
        energy_label: { type: 'string', description: 'Energy efficiency label (A++, A+, A, B, C, D, E, F, G)' },
        floors: { type: 'number', description: 'Number of floors' },
        furnished: { type: 'boolean', description: 'Whether the property is furnished' },
        garden: { type: 'boolean', description: 'Whether the property has a garden' },
        garden_area: { type: 'number', description: 'Garden area in square meters' },
        balcony: { type: 'boolean', description: 'Whether the property has a balcony' },
        terrace: { type: 'boolean', description: 'Whether the property has a terrace' },
        parking: { type: 'boolean', description: 'Whether parking is available' },
        parking_spaces: { type: 'number', description: 'Number of parking spaces' },
        elevator: { type: 'boolean', description: 'Whether the building has an elevator' },
        basement: { type: 'boolean', description: 'Whether the property has a basement' },
      },
      required: ['title'],
    },
    handler: async (args, id) => {
      const validated = validateArgs(createListingSchema, args, 'create_listing');
      const data = await query(
        `INSERT INTO listings (title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, listing_type, image_url, images, featured, year_built, energy_label, garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, basement, elevator, floors)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *`,
        [
          validated.title,
          validated.description ?? null,
          validated.price ?? null,
          validated.bedrooms ?? null,
          validated.bathrooms ?? null,
          validated.area ?? null,
          validated.address ?? null,
          validated.city ?? null,
          validated.postal_code ?? null,
          validated.property_type ?? 'apartment',
          validated.status ?? 'available',
          validated.listing_type ?? 'sale',
          validated.image_url ?? null,
          validated.images ? JSON.stringify(validated.images) : null,
          validated.featured ?? false,
          validated.year_built ?? null,
          validated.energy_label ?? null,
          validated.garden ?? false,
          validated.garden_area ?? null,
          validated.parking ?? false,
          validated.parking_spaces ?? null,
          validated.balcony ?? false,
          validated.terrace ?? false,
          validated.furnished ?? false,
          validated.basement ?? false,
          validated.elevator ?? false,
          validated.floors ?? null,
        ]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'update_listing',
    description: 'Update an existing property listing by ID. Only provided fields are updated. Returns the updated listing.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The listing ID to update' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        bedrooms: { type: 'number' },
        bathrooms: { type: 'number' },
        area: { type: 'number' },
        address: { type: 'string' },
        city: { type: 'string' },
        postal_code: { type: 'string' },
        property_type: { type: 'string' },
        status: { type: 'string' },
        listing_type: { type: 'string' },
        image_url: { type: 'string' },
        images: { type: 'array', description: 'Array of gallery image URLs', items: { type: 'string' } },
        featured: { type: 'boolean' },
        year_built: { type: 'number' },
        energy_label: { type: 'string' },
        floors: { type: 'number' },
        furnished: { type: 'boolean' },
        garden: { type: 'boolean' },
        garden_area: { type: 'number' },
        balcony: { type: 'boolean' },
        terrace: { type: 'boolean' },
        parking: { type: 'boolean' },
        parking_spaces: { type: 'number' },
        elevator: { type: 'boolean' },
        basement: { type: 'boolean' },
      },
      required: ['id'],
    },
    handler: async (args, id) => {
      const { id: updateId, ...rest } = validateArgs(updateListingSchema, args, 'update_listing');

      const fields = Object.keys(rest);
      if (fields.length === 0) {
        const data = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [updateId]);
        if (data.rows.length === 0) throw new NotFoundError('Listing', updateId);
        return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
      }

      const setClauses: string[] = [];
      const values: unknown[] = [];
      let paramIndex = 1;

      for (const field of fields) {
        const value = rest[field as keyof typeof rest];
        if (field === 'images') {
          setClauses.push(`${field} = $${paramIndex}`);
          values.push(value ? JSON.stringify(value) : null);
        } else {
          setClauses.push(`${field} = $${paramIndex}`);
          values.push(value ?? null);
        }
        paramIndex++;
      }

      setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(updateId);

      const data = await query(
        `UPDATE listings SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        values
      );
      if (data.rows.length === 0) throw new NotFoundError('Listing', updateId);
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'delete_listing',
    description: 'Delete a property listing by ID. Returns confirmation.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: 'The listing ID to delete' } },
      required: ['id'],
    },
    handler: async (args, id) => {
      const { id: deleteId } = validateArgs(deleteListingSchema, args, 'delete_listing');
      const data = await query('DELETE FROM listings WHERE id = $1 RETURNING id', [deleteId]);
      if (data.rows.length === 0) throw new NotFoundError('Listing', deleteId);
      return buildToolResult(id, `Listing ${deleteId} deleted successfully`);
    },
  },
  {
    name: 'list_enquiries',
    description: 'List all contact enquiries submitted by potential buyers or renters.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (_args, id) => {
      const data = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
      return buildToolResult(id, JSON.stringify(data.rows, null, 2));
    },
  },
  {
    name: 'create_enquiry',
    description: 'Submit a new contact enquiry from a potential buyer or renter.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the enquirer' },
        email: { type: 'string', description: 'Email address' },
        phone: { type: 'string', description: 'Phone number' },
        message: { type: 'string', description: 'Message or enquiry details' },
        property_id: { type: 'number', description: 'Optional: ID of the property being enquired about' },
      },
      required: ['name', 'email', 'message'],
    },
    handler: async (args, id) => {
      const validated = validateArgs(createEnquirySchema, args, 'create_enquiry');
      const data = await query(
        'INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [validated.name, validated.email, validated.phone ?? null, validated.message, validated.property_id ?? null]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
];

export function buildInitializeResponse(id?: number | string): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    result: {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
    },
  };
}

export function buildToolsListResponse(id?: number | string): JsonRpcResponse {
  const toolDescriptions = tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
  return { jsonrpc: '2.0', id, result: { tools: toolDescriptions } };
}

function buildToolResult(id: number | string, text: string, isError = false): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text }], isError } };
}

function buildError(id: number | string, code: number, message: string): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

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

export async function handleToolCall(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const { id, params = {} } = request;
  const toolName = params.name as string;
  const args = (params.arguments ?? {}) as Record<string, unknown>;

  if (!id) {
    return buildError(0, -32600, 'Invalid Request: tool call requires an id');
  }

  const startTime = Date.now();
  const tool = tools.find((t) => t.name === toolName);

  if (!tool) {
    return buildError(id, -32601, `Method not found: ${toolName}`);
  }

  try {
    const result = await tool.handler(args, id);
    logger.debug(`Tool '${toolName}' completed`, { duration: Date.now() - startTime });
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof ValidationError) {
      logger.warn(`Validation error in '${toolName}'`, { duration, errors: error.fieldErrors });
      return buildError(id, -32602, error.message);
    }

    if (error instanceof NotFoundError) {
      logger.warn(`Not found in '${toolName}'`, { duration });
      return buildToolResult(id, error.message);
    }

    logger.error(`Tool '${toolName}' failed`, error instanceof Error ? error : undefined, { duration });
    const message = error instanceof Error ? error.message : 'Unknown error';
    return buildError(id, -32603, `Internal error: ${message}`);
  }
}

export async function handleJsonRpcMessage(request: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  const { method, id } = request;

  switch (method) {
    case 'initialize':
      return buildInitializeResponse(id);
    case 'initialized':
      return null;
    case 'tools/list':
      return buildToolsListResponse(id);
    case 'tools/call':
      return handleToolCall(request);
    default:
      return buildError(id ?? 0, -32601, `Method not found: ${method}`);
  }
}

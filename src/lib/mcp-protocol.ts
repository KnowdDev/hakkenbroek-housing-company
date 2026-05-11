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
const SERVER_VERSION = '1.1.0';
const PROTOCOL_VERSION = '2024-11-05';
const TOOL_TIMEOUT_MS = 25000;

const tools = [
  {
    name: 'list_listings',
    description: 'List all property listings. Returns an array of listings with full details including luxury features.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'get_listing',
    description: 'Get a single property listing by ID. Returns the full listing details.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'number', description: 'The listing ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_listing',
    description: 'Create a new property listing. Returns the created listing.',
    inputSchema: {
      type: 'object' as const,
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
  },
  {
    name: 'update_listing',
    description: 'Update an existing property listing by ID. Only provided fields are updated. Returns the updated listing.',
    inputSchema: {
      type: 'object' as const,
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
  },
  {
    name: 'delete_listing',
    description: 'Delete a property listing by ID. Returns confirmation.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'number', description: 'The listing ID to delete' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_enquiries',
    description: 'List all contact enquiries submitted by potential buyers or renters.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'create_enquiry',
    description: 'Submit a new contact enquiry from a potential buyer or renter.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Full name of the enquirer' },
        email: { type: 'string', description: 'Email address' },
        phone: { type: 'string', description: 'Phone number' },
        message: { type: 'string', description: 'Message or enquiry details' },
        property_id: { type: 'number', description: 'Optional: ID of the property being enquired about' },
      },
      required: ['name', 'email', 'message'],
    },
  },
];

export function buildInitializeResponse(id?: number | string): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    result: {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {
        tools: { listChanged: false },
      },
      serverInfo: {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
    },
  };
}

export function buildToolsListResponse(id?: number | string): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    result: { tools },
  };
}

function buildToolResult(id: number | string, text: string, isError = false): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    result: {
      content: [{ type: 'text', text }],
      isError,
    },
  };
}

function buildError(id: number | string, code: number, message: string): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message },
  };
}

function stringifyResult(rows: unknown[]): string {
  return JSON.stringify(rows, null, 2);
}

function listingInsertFields(): string {
  return `title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, listing_type, image_url, featured, year_built, energy_label, garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, basement, elevator, floors`;
}

function listingInsertValues(): string {
  return `$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26`;
}

function listingInsertArgs(body: Record<string, unknown>): unknown[] {
  return [
    body.title,
    body.description ?? null,
    body.price ?? null,
    body.bedrooms ?? null,
    body.bathrooms ?? null,
    body.area ?? null,
    body.address ?? null,
    body.city ?? null,
    body.postal_code ?? null,
    body.property_type ?? 'apartment',
    body.status ?? 'available',
    body.listing_type ?? 'sale',
    body.image_url ?? null,
    body.featured ?? false,
    body.year_built ?? null,
    body.energy_label ?? null,
    body.garden ?? false,
    body.garden_area ?? null,
    body.parking ?? false,
    body.parking_spaces ?? null,
    body.balcony ?? false,
    body.terrace ?? false,
    body.furnished ?? false,
    body.basement ?? false,
    body.elevator ?? false,
    body.floors ?? null,
  ];
}

function listingUpdateSet(): string {
  return `title = $1, description = $2, price = $3, bedrooms = $4, bathrooms = $5, area = $6, address = $7, city = $8, postal_code = $9, property_type = $10, status = $11, listing_type = $12, image_url = $13, featured = $14, year_built = $15, energy_label = $16, garden = $17, garden_area = $18, parking = $19, parking_spaces = $20, balcony = $21, terrace = $22, furnished = $23, basement = $24, elevator = $25, floors = $26`;
}

function listingUpdateArgs(body: Record<string, unknown>): unknown[] {
  return [
    body.title,
    body.description ?? null,
    body.price ?? null,
    body.bedrooms ?? null,
    body.bathrooms ?? null,
    body.area ?? null,
    body.address ?? null,
    body.city ?? null,
    body.postal_code ?? null,
    body.property_type ?? 'apartment',
    body.status ?? 'available',
    body.listing_type ?? 'sale',
    body.image_url ?? null,
    body.featured ?? false,
    body.year_built ?? null,
    body.energy_label ?? null,
    body.garden ?? false,
    body.garden_area ?? null,
    body.parking ?? false,
    body.parking_spaces ?? null,
    body.balcony ?? false,
    body.terrace ?? false,
    body.furnished ?? false,
    body.basement ?? false,
    body.elevator ?? false,
    body.floors ?? null,
  ];
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

  try {
    let result: JsonRpcResponse;

    switch (toolName) {
      case 'list_listings': {
        const data = await query('SELECT * FROM listings ORDER BY created_at DESC');
        result = buildToolResult(id, stringifyResult(data.rows));
        break;
      }

      case 'get_listing': {
        const { id: listingId } = validateArgs(getListingSchema, args, 'get_listing');
        const data = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
        if (data.rows.length === 0) {
          throw new NotFoundError('Listing', listingId);
        }
        result = buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
        break;
      }

      case 'create_listing': {
        const validated = validateArgs(createListingSchema, args, 'create_listing');
        const data = await query(
          `INSERT INTO listings (${listingInsertFields()}) VALUES (${listingInsertValues()}) RETURNING *`,
          listingInsertArgs(validated as unknown as Record<string, unknown>)
        );
        result = buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
        break;
      }

      case 'update_listing': {
        const { id: updateId, ...rest } = validateArgs(updateListingSchema, args, 'update_listing');
        const data = await query(
          `UPDATE listings SET ${listingUpdateSet()}, updated_at = CURRENT_TIMESTAMP WHERE id = $27 RETURNING *`,
          [...listingUpdateArgs(rest as unknown as Record<string, unknown>), updateId]
        );
        if (data.rows.length === 0) {
          throw new NotFoundError('Listing', updateId);
        }
        result = buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
        break;
      }

      case 'delete_listing': {
        const { id: deleteId } = validateArgs(deleteListingSchema, args, 'delete_listing');
        const data = await query('DELETE FROM listings WHERE id = $1 RETURNING id', [deleteId]);
        if (data.rows.length === 0) {
          throw new NotFoundError('Listing', deleteId);
        }
        result = buildToolResult(id, `Listing ${deleteId} deleted successfully`);
        break;
      }

      case 'list_enquiries': {
        const data = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
        result = buildToolResult(id, stringifyResult(data.rows));
        break;
      }

      case 'create_enquiry': {
        const validated = validateArgs(createEnquirySchema, args, 'create_enquiry');
        const data = await query(
          `INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [validated.name, validated.email, validated.phone ?? null, validated.message, validated.property_id ?? null]
        );
        result = buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
        break;
      }

      default:
        return buildError(id, -32601, `Method not found: ${toolName}`);
    }

    const duration = Date.now() - startTime;
    logger.debug(`Tool '${toolName}' completed`, { toolName, duration });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof ValidationError) {
      logger.warn(`Validation error in '${toolName}'`, { toolName, duration, errors: error.fieldErrors });
      return buildError(id, -32602, error.message);
    }

    if (error instanceof NotFoundError) {
      logger.warn(`Not found in '${toolName}'`, { toolName, duration });
      return buildToolResult(id, error.message);
    }

    logger.error(`Tool '${toolName}' failed`, error instanceof Error ? error : undefined, { toolName, duration });
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
      // Notification, no response needed
      return null;

    case 'tools/list':
      return buildToolsListResponse(id);

    case 'tools/call':
      return handleToolCall(request);

    default:
      return buildError(id ?? 0, -32601, `Method not found: ${method}`);
  }
}

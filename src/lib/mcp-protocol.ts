import { query } from './db';

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

const SERVER_NAME = 'hakkenbroek-housing';
const SERVER_VERSION = '1.0.0';
const PROTOCOL_VERSION = '2024-11-05';

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

export async function handleToolCall(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const { id, params = {} } = request;
  const toolName = params.name as string;
  const args = (params.arguments ?? {}) as Record<string, unknown>;

  if (!id) {
    return buildError(0, -32600, 'Invalid Request: tool call requires an id');
  }

  try {
    switch (toolName) {
      case 'list_listings': {
        const result = await query('SELECT * FROM listings ORDER BY created_at DESC');
        return buildToolResult(id, stringifyResult(result.rows));
      }

      case 'get_listing': {
        const listingId = Number(args.id);
        if (!listingId || isNaN(listingId)) {
          return buildError(id, -32602, 'Invalid params: id must be a number');
        }
        const result = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
        if (result.rows.length === 0) {
          return buildToolResult(id, 'Listing not found');
        }
        return buildToolResult(id, JSON.stringify(result.rows[0], null, 2));
      }

      case 'create_listing': {
        const insertResult = await query(
          `INSERT INTO listings (${listingInsertFields()}) VALUES (${listingInsertValues()}) RETURNING *`,
          listingInsertArgs(args)
        );
        return buildToolResult(id, JSON.stringify(insertResult.rows[0], null, 2));
      }

      case 'update_listing': {
        const updateId = Number(args.id);
        if (!updateId || isNaN(updateId)) {
          return buildError(id, -32602, 'Invalid params: id must be a number');
        }
        const updateResult = await query(
          `UPDATE listings SET ${listingUpdateSet()}, updated_at = CURRENT_TIMESTAMP WHERE id = $27 RETURNING *`,
          [...listingUpdateArgs(args), updateId]
        );
        if (updateResult.rows.length === 0) {
          return buildToolResult(id, 'Listing not found');
        }
        return buildToolResult(id, JSON.stringify(updateResult.rows[0], null, 2));
      }

      case 'delete_listing': {
        const deleteId = Number(args.id);
        if (!deleteId || isNaN(deleteId)) {
          return buildError(id, -32602, 'Invalid params: id must be a number');
        }
        const deleteResult = await query('DELETE FROM listings WHERE id = $1 RETURNING id', [deleteId]);
        if (deleteResult.rows.length === 0) {
          return buildToolResult(id, 'Listing not found');
        }
        return buildToolResult(id, `Listing ${deleteId} deleted successfully`);
      }

      case 'list_enquiries': {
        const enquiries = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
        return buildToolResult(id, stringifyResult(enquiries.rows));
      }

      case 'create_enquiry': {
        const { name, email, phone, message, property_id } = args;
        if (!name || !email || !message) {
          return buildError(id, -32602, 'Invalid params: name, email, and message are required');
        }
        const enquiryResult = await query(
          `INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [name, email, phone ?? null, message, property_id ?? null]
        );
        return buildToolResult(id, JSON.stringify(enquiryResult.rows[0], null, 2));
      }

      default:
        return buildError(id, -32601, `Method not found: ${toolName}`);
    }
  } catch (error) {
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

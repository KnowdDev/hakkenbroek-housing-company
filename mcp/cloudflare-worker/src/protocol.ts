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

export interface McpRequestContext {
  dedupeNamespace?: string;
}

type ToolHandler = (
  args: Record<string, unknown>,
  jsonRpcId: number | string,
  ctx?: McpRequestContext
) => Promise<JsonRpcResponse>;

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: ToolHandler;
}

const SERVER_NAME = (globalThis as any).SERVER_NAME || 'hakkenbroek-housing';
const SERVER_VERSION = (globalThis as any).SERVER_VERSION || '2.0.0';
const PROTOCOL_VERSION = (globalThis as any).PROTOCOL_VERSION || '2024-11-05';

export const MCP_SERVER_PROTOCOL_VERSIONS = ['2025-11-25', '2025-03-26', '2024-11-05'] as const;

export function validateMcpProtocolHeader(headerValue: string | null): JsonRpcResponse | null {
  if (!headerValue?.trim()) return null;
  const v = headerValue.trim();
  if ((MCP_SERVER_PROTOCOL_VERSIONS as readonly string[]).includes(v)) return null;
  return {
    jsonrpc: '2.0',
    error: { code: -32600, message: `Unsupported MCP-Protocol-Version: ${v}` }
  };
}

// ─── Tool Definitions ────────────────────────────────────────────────────────

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
    description: 'Get a single property listing by ID.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: 'The listing ID' } },
      required: ['id'],
    },
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id: must be a number');
      const data = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
      if (data.rows.length === 0) return buildToolResult(id, `Listing ${listingId} not found`);
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'create_listing',
    description: 'Create a new property listing.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Property title' },
        description: { type: 'string' },
        price: { type: 'number', description: 'Price in Euros' },
        bedrooms: { type: 'number' },
        bathrooms: { type: 'number' },
        area: { type: 'number', description: 'Area in square meters' },
        address: { type: 'string' },
        city: { type: 'string' },
        postal_code: { type: 'string' },
        property_type: { type: 'string', description: 'apartment, house, villa, studio, penthouse' },
        status: { type: 'string', description: 'available, sold, rented, under-consideration' },
        listing_type: { type: 'string', description: 'sale or rent' },
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
      required: ['title'],
    },
    handler: async (args, id) => {
      const data = await query(
        `INSERT INTO listings (title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, listing_type, image_url, featured, year_built, energy_label, garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, basement, elevator, floors)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING *`,
        [
          String(args.title ?? ''),
          args.description ?? null,
          args.price ?? null,
          args.bedrooms ?? null,
          args.bathrooms ?? null,
          args.area ?? null,
          args.address ?? null,
          args.city ?? null,
          args.postal_code ?? null,
          args.property_type ?? 'apartment',
          args.status ?? 'available',
          args.listing_type ?? 'sale',
          args.image_url ?? null,
          args.featured ?? false,
          args.year_built ?? null,
          args.energy_label ?? null,
          args.garden ?? false,
          args.garden_area ?? null,
          args.parking ?? false,
          args.parking_spaces ?? null,
          args.balcony ?? false,
          args.terrace ?? false,
          args.furnished ?? false,
          args.basement ?? false,
          args.elevator ?? false,
          args.floors ?? null,
        ]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'update_listing',
    description: 'PATCH fields on an existing listing by id. Only provided keys are written.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
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
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id: must be a number');

      const current = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
      if (current.rows.length === 0) return buildToolResult(id, `Listing ${listingId} not found`);

      const allowedFields = [
        'title', 'description', 'price', 'bedrooms', 'bathrooms', 'area', 'address', 'city',
        'postal_code', 'property_type', 'status', 'listing_type', 'image_url', 'featured',
        'year_built', 'energy_label', 'floors', 'furnished', 'garden', 'garden_area',
        'balcony', 'terrace', 'parking', 'parking_spaces', 'elevator', 'basement',
      ];

      const updates: string[] = [];
      const values: unknown[] = [];
      let paramIndex = 1;

      for (const field of allowedFields) {
        if (field in args) {
          updates.push(`${field} = $${paramIndex}`);
          values.push(args[field]);
          paramIndex++;
        }
      }

      if (updates.length === 0) {
        return buildToolResult(id, JSON.stringify({ listing: current.rows[0], meta: { warnings: ['No fields provided to update'] } }, null, 2));
      }

      values.push(listingId);
      const sql = `UPDATE listings SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
      const result = await query(sql, values);
      return buildToolResult(id, JSON.stringify(result.rows[0], null, 2));
    },
  },
  {
    name: 'delete_listing',
    description: 'Delete a property listing by ID.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number' } },
      required: ['id'],
    },
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id: must be a number');
      const data = await query('DELETE FROM listings WHERE id = $1 RETURNING id', [listingId]);
      if (data.rows.length === 0) return buildToolResult(id, `Listing ${listingId} not found`);
      return buildToolResult(id, `Listing ${listingId} deleted successfully`);
    },
  },
  {
    name: 'list_enquiries',
    description: 'List all contact enquiries.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (_args, id) => {
      const data = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
      return buildToolResult(id, JSON.stringify(data.rows, null, 2));
    },
  },
  {
    name: 'create_enquiry',
    description: 'Submit a new contact enquiry.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        message: { type: 'string' },
        property_id: { type: 'number' },
      },
      required: ['name', 'email', 'message'],
    },
    handler: async (args, id) => {
      const data = await query(
        'INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [String(args.name), String(args.email), args.phone ?? null, String(args.message), args.property_id ?? null]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
];

// ─── Response Builders ───────────────────────────────────────────────────────

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

export async function handleToolCall(
  request: JsonRpcRequest,
  ctx?: McpRequestContext
): Promise<JsonRpcResponse> {
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
    const result = await tool.handler(args, id, ctx);
    console.log(`[TOOL] ${toolName} completed in ${Date.now() - startTime}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[TOOL ERROR] ${toolName} failed after ${duration}ms:`, error instanceof Error ? error.message : String(error));
    return buildError(id, -32603, `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function handleJsonRpcMessage(
  request: JsonRpcRequest,
  ctx?: McpRequestContext
): Promise<JsonRpcResponse | null> {
  const { method, id } = request;

  switch (method) {
    case 'initialize':
      return buildInitializeResponse(id);
    case 'notifications/initialized':
    case 'initialized':
      return null;
    case 'ping':
      if (id === undefined || id === null) {
        return buildError(0, -32600, 'Invalid Request: ping requires id');
      }
      return { jsonrpc: '2.0', id, result: {} };
    case 'tools/list':
      return buildToolsListResponse(id);
    case 'tools/call':
      return handleToolCall(request, ctx);
    default:
      return buildError(id ?? 0, -32601, `Method not found: ${method}`);
  }
}

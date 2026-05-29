import { query } from './db.js';

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

type ToolHandler = (args: Record<string, unknown>, jsonRpcId: number | string) => Promise<JsonRpcResponse>;

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: ToolHandler;
}

const SERVER_NAME = process.env.SERVER_NAME || 'hakkenbroek-housing-stdio';
const SERVER_VERSION = process.env.SERVER_VERSION || '2.0.0';
const PROTOCOL_VERSION = process.env.PROTOCOL_VERSION || '2024-11-05';

const tools: ToolDefinition[] = [
  {
    name: 'list_listings',
    description: 'List all property listings.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (_args, id) => {
      const data = await query('SELECT * FROM listings ORDER BY created_at DESC');
      return buildToolResult(id, JSON.stringify(data.rows, null, 2));
    },
  },
  {
    name: 'get_listing',
    description: 'Get a single property listing by ID.',
    inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] },
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id');
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
      required: ['title'],
    },
    handler: async (args, id) => {
      const data = await query(
        `INSERT INTO listings (title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, listing_type, image_url, featured, year_built, energy_label, garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, basement, elevator, floors)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26) RETURNING *`,
        [
          String(args.title ?? ''), args.description ?? null, args.price ?? null,
          args.bedrooms ?? null, args.bathrooms ?? null, args.area ?? null,
          args.address ?? null, args.city ?? null, args.postal_code ?? null,
          args.property_type ?? 'apartment', args.status ?? 'available', args.listing_type ?? 'sale',
          args.image_url ?? null, args.featured ?? false, args.year_built ?? null,
          args.energy_label ?? null, args.garden ?? false, args.garden_area ?? null,
          args.parking ?? false, args.parking_spaces ?? null, args.balcony ?? false,
          args.terrace ?? false, args.furnished ?? false, args.basement ?? false,
          args.elevator ?? false, args.floors ?? null,
        ]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
  {
    name: 'update_listing',
    description: 'PATCH fields on an existing listing by id.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number' }, title: { type: 'string' }, description: { type: 'string' }, price: { type: 'number' }, bedrooms: { type: 'number' }, bathrooms: { type: 'number' }, area: { type: 'number' }, address: { type: 'string' }, city: { type: 'string' }, postal_code: { type: 'string' }, property_type: { type: 'string' }, status: { type: 'string' }, listing_type: { type: 'string' }, image_url: { type: 'string' }, featured: { type: 'boolean' }, year_built: { type: 'number' }, energy_label: { type: 'string' }, floors: { type: 'number' }, furnished: { type: 'boolean' }, garden: { type: 'boolean' }, garden_area: { type: 'number' }, balcony: { type: 'boolean' }, terrace: { type: 'boolean' }, parking: { type: 'boolean' }, parking_spaces: { type: 'number' }, elevator: { type: 'boolean' }, basement: { type: 'boolean' } },
      required: ['id'],
    },
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id');
      const current = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [listingId]);
      if (current.rows.length === 0) return buildToolResult(id, `Listing ${listingId} not found`);
      const allowed = ['title','description','price','bedrooms','bathrooms','area','address','city','postal_code','property_type','status','listing_type','image_url','featured','year_built','energy_label','floors','furnished','garden','garden_area','balcony','terrace','parking','parking_spaces','elevator','basement'];
      const updates: string[] = []; const values: unknown[] = []; let i = 1;
      for (const f of allowed) {
        if (f in args) { updates.push(`${f} = $${i}`); values.push(args[f]); i++; }
      }
      if (updates.length === 0) return buildToolResult(id, JSON.stringify({ listing: current.rows[0], meta: { warnings: ['No fields provided'] } }, null, 2));
      values.push(listingId);
      const result = await query(`UPDATE listings SET ${updates.join(', ')} WHERE id = $${i} RETURNING *`, values);
      return buildToolResult(id, JSON.stringify(result.rows[0], null, 2));
    },
  },
  {
    name: 'delete_listing',
    description: 'Delete a property listing by ID.',
    inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] },
    handler: async (args, id) => {
      const listingId = Number(args.id);
      if (isNaN(listingId)) return buildError(id, -32602, 'Invalid id');
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
    inputSchema: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' }, message: { type: 'string' }, property_id: { type: 'number' } }, required: ['name', 'email', 'message'] },
    handler: async (args, id) => {
      const data = await query(
        'INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [String(args.name), String(args.email), args.phone ?? null, String(args.message), args.property_id ?? null]
      );
      return buildToolResult(id, JSON.stringify(data.rows[0], null, 2));
    },
  },
];

function buildToolResult(id: number | string, text: string, isError = false): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text }], isError } };
}

function buildError(id: number | string, code: number, message: string): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

export function buildInitializeResponse(id?: number | string): JsonRpcResponse {
  return {
    jsonrpc: '2.0', id,
    result: {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
    },
  };
}

export function buildToolsListResponse(id?: number | string): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result: { tools: tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) } };
}

export async function handleToolCall(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const { id, params = {} } = request;
  const toolName = params.name as string;
  const args = (params.arguments ?? {}) as Record<string, unknown>;
  if (!id) return buildError(0, -32600, 'tool call requires an id');

  const start = Date.now();
  const tool = tools.find((t) => t.name === toolName);
  if (!tool) return buildError(id, -32601, `Method not found: ${toolName}`);

  try {
    const result = await tool.handler(args, id);
    console.error(`[TOOL] ${toolName} completed in ${Date.now() - start}ms`);
    return result;
  } catch (err) {
    console.error(`[TOOL ERROR] ${toolName}:`, err instanceof Error ? err.message : String(err));
    return buildError(id, -32603, `Internal error: ${err instanceof Error ? err.message : 'Unknown'}`);
  }
}

export async function handleJsonRpcMessage(request: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  const { method, id } = request;
  switch (method) {
    case 'initialize': return buildInitializeResponse(id);
    case 'notifications/initialized':
    case 'initialized': return null;
    case 'ping': return { jsonrpc: '2.0', id, result: {} };
    case 'tools/list': return buildToolsListResponse(id);
    case 'tools/call': return handleToolCall(request);
    default: return buildError(id ?? 0, -32601, `Method not found: ${method}`);
  }
}

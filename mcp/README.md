# Hakkenbroek Housing MCP Servers

Two hardened MCP server implementations for the Hakkenbroek Housing project.

## 1. Cloudflare Worker (`cloudflare-worker/`)

**Best for:** Production HTTP API, global edge distribution, zero cold starts.

**Hardening features:**
- Stateless — no in-memory connection pools
- Edge caching via Cloudflare Cache API (30s TTL on read ops)
- Per-API-key rate limiting via Cache API (120 req/min)
- In-flight request deduplication
- Origin validation (DNS rebinding protection)
- Structured logging

**Deploy:**
```bash
cd mcp/cloudflare-worker
npx wrangler secret put DATABASE_URL
npx wrangler secret put MCP_API_KEY
npx wrangler deploy
```

## 2. stdio Server (`stdio-server/`)

**Best for:** Local development, zero hosting cost, direct DB access.

**Usage:**
```bash
cd mcp/stdio-server
npm run build
DATABASE_URL=postgresql://... node dist/index.js
```

## Windsurf MCP Config

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "hakkenbroek-stdio": {
      "command": "node",
      "args": ["/absolute/path/to/hakkenbroek-housing/mcp/stdio-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "DB_SSL": "true"
      }
    },
    "hakkenbroek-http": {
      "url": "https://hakkenbroek-mcp.YOUR_SUBDOMAIN.workers.dev",
      "headers": {
        "x-api-key": "${MCP_API_KEY}"
      }
    }
  }
}
```

Use the **stdio** server for daily local work (lower cost, faster).
Use the **HTTP** worker for shared/production access.

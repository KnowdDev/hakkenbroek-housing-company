const { Client } = require('pg');

const client = new Client({
  connectionString: process.argv[2],
  connectionTimeoutMillis: 15000,
  query_timeout: 15000,
});

async function init() {
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS mcp_sessions (
      session_id UUID PRIMARY KEY,
      api_key VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 minutes',
      last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS mcp_messages (
      id SERIAL PRIMARY KEY,
      session_id UUID NOT NULL REFERENCES mcp_sessions(session_id) ON DELETE CASCADE,
      message JSONB NOT NULL,
      delivered BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('MCP tables created successfully');
  await client.end();
}

init().catch(e => {
  console.error('Error:', e.message);
  client.end().catch(() => {});
  process.exit(1);
});

const https = require('https');

const BASE_URL = 'hakkenbroek-housing-2026.netlify.app';
let API_KEY = '';
let SESSION_ID = '';

function request(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: 443,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sseRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: 443,
      path,
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
      },
    };

    const req = https.request(options, (res) => {
      let buffer = '';
      res.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n\n');
        for (let i = 0; i < lines.length - 1; i++) {
          const event = parseSseEvent(lines[i]);
          if (event.event === 'endpoint') {
            const match = event.data.match(/sessionId=([^&\s]+)/);
            if (match) {
              SESSION_ID = match[1];
              console.log('SSE connected, sessionId:', SESSION_ID);
              resolve({ sessionId: SESSION_ID });
              // Keep connection alive for a bit
              setTimeout(() => req.destroy(), 8000);
            }
          } else if (event.event === 'message') {
            console.log('SSE message:', JSON.stringify(event.data, null, 2));
          }
        }
        buffer = lines[lines.length - 1];
      });
      res.on('error', reject);
    });
    req.on('error', reject);
    req.end();
  });
}

function parseSseEvent(raw) {
  const event = { event: '', data: '' };
  for (const line of raw.split('\n')) {
    if (line.startsWith('event: ')) event.event = line.slice(7);
    else if (line.startsWith('data: ')) event.data = line.slice(6);
  }
  try {
    event.data = JSON.parse(event.data);
  } catch {
    // keep as string
  }
  return event;
}

async function main() {
  console.log('=== 1. Creating API key ===');
  const keyRes = await request('/api/mcp/keys', 'POST', { name: 'MCP Test Key' }, {
    'Cookie': 'dashboard_token=hakkenbroek2026',
  });
  console.log('Status:', keyRes.status);
  if (keyRes.status !== 201) {
    console.error('Failed to create key:', keyRes.body);
    return;
  }
  API_KEY = keyRes.body.key;
  console.log('Key created:', keyRes.body.key_preview);

  console.log('\n=== 2. Connecting SSE ===');
  const ssePromise = sseRequest(`/api/mcp/sse?apiKey=${API_KEY}`);

  // Wait for session to be established
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (!SESSION_ID) {
    console.error('Failed to get session ID');
    return;
  }

  console.log('\n=== 3. Sending initialize ===');
  const initRes = await request(
    `/api/mcp/messages?sessionId=${SESSION_ID}`,
    'POST',
    { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'test', version: '1.0.0' } } }
  );
  console.log('Initialize POST status:', initRes.status);

  console.log('\n=== 4. Sending tools/list ===');
  const toolsRes = await request(
    `/api/mcp/messages?sessionId=${SESSION_ID}`,
    'POST',
    { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }
  );
  console.log('tools/list POST status:', toolsRes.status);

  console.log('\n=== 5. Sending tools/call (list_listings) ===');
  const callRes = await request(
    `/api/mcp/messages?sessionId=${SESSION_ID}`,
    'POST',
    { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'list_listings', arguments: {} } }
  );
  console.log('tools/call POST status:', callRes.status);

  // Wait for SSE messages to arrive
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('\n=== 6. Cleaning up ===');
  await request(`/api/mcp/keys/${keyRes.body.key_id}`, 'DELETE', null, {
    'Cookie': 'dashboard_token=hakkenbroek2026',
  });
  console.log('Key revoked');

  console.log('\nDone.');
}

main().catch(console.error);

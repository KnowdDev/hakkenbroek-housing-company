#!/usr/bin/env node
/**
 * Hakkenbroek Housing MCP Server — stdio transport
 *
 * Lower-cost alternative to the Cloudflare Worker.
 * Run locally:  node dist/index.js
 * Or via Windsurf MCP config as a stdio command.
 */

import { handleJsonRpcMessage, JsonRpcRequest } from './protocol.js';
import { shutdown } from './db.js';

let buffer = '';

function send(response: unknown): void {
  const line = JSON.stringify(response);
  process.stdout.write(line + '\n');
}

async function processLine(line: string): Promise<void> {
  let request: JsonRpcRequest;
  try {
    request = JSON.parse(line);
  } catch {
    send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
    return;
  }

  try {
    const response = await handleJsonRpcMessage(request);
    if (response) {
      send(response);
    }
  } catch (err) {
    send({
      jsonrpc: '2.0',
      id: request.id ?? null,
      error: { code: -32603, message: `Internal error: ${err instanceof Error ? err.message : 'Unknown'}` },
    });
  }
}

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk: string) => {
  buffer += chunk;
  let idx: number;
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (line) {
      processLine(line).catch((err) => {
        console.error('[FATAL]', err);
      });
    }
  }
});

process.stdin.on('end', async () => {
  if (buffer.trim()) {
    await processLine(buffer.trim());
  }
  await shutdown();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdown();
  process.exit(0);
});

console.error('[hakkenbroek-mcp-stdio] Ready. Waiting for JSON-RPC messages on stdin...');

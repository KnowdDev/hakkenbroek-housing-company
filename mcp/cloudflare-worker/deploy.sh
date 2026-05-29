#!/bin/bash
set -e

# Hakkenbroek MCP Worker Deploy Script
# Usage: ./deploy.sh

# Required env vars (set before running):
# CLOUDFLARE_API_TOKEN
# DATABASE_URL
# MCP_API_KEY

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Deploying Hakkenbroek MCP Worker ==="

# Verify deps
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Set secrets via wrangler
echo "Setting secrets..."
echo "$DATABASE_URL" | npx wrangler secret put DATABASE_URL
echo "$MCP_API_KEY" | npx wrangler secret put MCP_API_KEY

# Deploy
echo "Deploying..."
npx wrangler deploy

echo "=== Done ==="

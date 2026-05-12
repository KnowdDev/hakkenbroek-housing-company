import { NextRequest } from 'next/server';

function extractApiKey(request: NextRequest): string | null {
  const xApiKey = request.headers.get('x-api-key');
  if (xApiKey) return xApiKey;

  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() === 'bearer' && token) {
    return token;
  }

  return null;
}

export async function validateApiKey(request: NextRequest): Promise<{ valid: boolean }> {
  const providedApiKey = extractApiKey(request);
  if (!providedApiKey) return { valid: false };

  const staticApiKey = process.env.MCP_API_KEY;
  if (staticApiKey && providedApiKey === staticApiKey) {
    return { valid: true };
  }

  return { valid: false };
}

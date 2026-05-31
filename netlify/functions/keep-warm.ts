import type { Config } from '@netlify/functions';

async function pingEndpoint(baseUrl: string, path: string) {
  const target = `${baseUrl}${path}`;
  const start = Date.now();

  try {
    const response = await fetch(target, {
      headers: { 'x-keep-warm': 'true' },
      signal: AbortSignal.timeout(15000),
    });

    const duration = Date.now() - start;
    console.log(`[keep-warm] ${target} — ${response.status} in ${duration}ms`);
    return `${target}: ${response.status} in ${duration}ms`;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(
      `[keep-warm] ${target} failed after ${duration}ms:`,
      error instanceof Error ? error.message : String(error)
    );
    return `${target}: FAILED after ${duration}ms`;
  }
}

export default async function handler() {
  const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!baseUrl) {
    console.warn('[keep-warm] No site URL found in environment, skipping.');
    return new Response('Skipped — no URL configured.', { status: 200 });
  }

  const results = await Promise.all([
    pingEndpoint(baseUrl, '/api/listings'),
    pingEndpoint(baseUrl, '/api/listings/84'),
  ]);

  const body = results.join('\n');
  console.log(`[keep-warm] Completed:\n${body}`);

  return new Response(body, { status: 200 });
}

export const config: Config = {
  schedule: '*/10 * * * *',
};

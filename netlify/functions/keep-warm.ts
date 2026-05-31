import type { Config } from '@netlify/functions';

export default async function handler() {
  const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!baseUrl) {
    console.warn('[keep-warm] No site URL found in environment, skipping.');
    return { statusCode: 200, body: 'Skipped — no URL configured.' };
  }

  const target = `${baseUrl}/api/listings`;
  const start = Date.now();

  try {
    const response = await fetch(target, {
      headers: { 'x-keep-warm': 'true' },
      signal: AbortSignal.timeout(15000),
    });

    const duration = Date.now() - start;
    console.log(
      `[keep-warm] ${target} — ${response.status} in ${duration}ms`
    );

    return {
      statusCode: response.status,
      body: `Pinged ${target} in ${duration}ms`,
    };
  } catch (error) {
    const duration = Date.now() - start;
    console.error(
      `[keep-warm] Failed after ${duration}ms:`,
      error instanceof Error ? error.message : String(error)
    );
    return { statusCode: 502, body: 'Keep-warm ping failed.' };
  }
}

export const config: Config = {
  schedule: '*/10 * * * *',
};

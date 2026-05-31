import type { Config } from '@netlify/functions';

interface PingResult {
  summary: string;
  status: number;
}

async function pingEndpoint(baseUrl: string, path: string): Promise<PingResult> {
  const target = `${baseUrl}${path}`;
  const start = Date.now();

  try {
    const response = await fetch(target, {
      headers: { 'x-keep-warm': 'true' },
      signal: AbortSignal.timeout(15000),
    });

    const duration = Date.now() - start;
    console.log(`[keep-warm] ${target} — ${response.status} in ${duration}ms`);
    return { summary: `${target}: ${response.status} in ${duration}ms`, status: response.status };
  } catch (error) {
    const duration = Date.now() - start;
    console.error(
      `[keep-warm] ${target} failed after ${duration}ms:`,
      error instanceof Error ? error.message : String(error)
    );
    return { summary: `${target}: FAILED after ${duration}ms`, status: 502 };
  }
}

async function pingListings(baseUrl: string): Promise<{ result: PingResult; firstId?: number }> {
  const target = `${baseUrl}/api/listings`;
  const start = Date.now();

  try {
    const response = await fetch(target, {
      headers: { 'x-keep-warm': 'true' },
      signal: AbortSignal.timeout(15000),
    });

    const duration = Date.now() - start;
    const result: PingResult = {
      summary: `${target}: ${response.status} in ${duration}ms`,
      status: response.status,
    };

    if (!response.ok) {
      console.warn(`[keep-warm] ${target} returned ${response.status}, skipping individual listing ping`);
      return { result };
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch (parseError) {
      console.warn(
        `[keep-warm] ${target} response could not be parsed as JSON, skipping individual listing ping:`,
        parseError instanceof Error ? parseError.message : String(parseError)
      );
      return { result };
    }

    if (!Array.isArray(body) || body.length === 0) {
      console.warn('[keep-warm] /api/listings returned empty array, skipping individual listing ping');
      return { result };
    }

    const firstId = (body[0] as { id?: number })?.id;
    if (typeof firstId !== 'number') {
      console.warn('[keep-warm] /api/listings first item has no numeric id, skipping individual listing ping');
      return { result };
    }

    console.log(`[keep-warm] /api/listings returned ${body.length} listings; first ID = ${firstId}`);
    return { result, firstId };
  } catch (error) {
    const duration = Date.now() - start;
    console.error(
      `[keep-warm] ${target} failed after ${duration}ms:`,
      error instanceof Error ? error.message : String(error)
    );
    return {
      result: { summary: `${target}: FAILED after ${duration}ms`, status: 502 },
    };
  }
}

export default async function handler() {
  const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!baseUrl) {
    console.warn('[keep-warm] No site URL found in environment, skipping.');
    return new Response('Skipped — no URL configured.', { status: 200 });
  }

  // Step 1: ping /api/listings and extract the first listing ID
  const listings = await pingListings(baseUrl);

  // Step 2: if we got a valid first ID, ping that individual listing
  const individualPing = listings.firstId
    ? pingEndpoint(baseUrl, `/api/listings/${listings.firstId}`)
    : null;

  const individualResult = individualPing ? await individualPing : null;

  const results = [listings.result.summary];
  if (individualResult) {
    results.push(individualResult.summary);
  }

  const body = results.join('\n');
  console.log(`[keep-warm] Completed:\n${body}`);

  return new Response(body, { status: 200 });
}

export const config: Config = {
  schedule: '*/10 * * * *',
};

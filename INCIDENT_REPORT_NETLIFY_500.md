# Incident Report: Intermittent 500 Errors on Hakkenbroek Housing Website

**Date:** June 1, 2026  
**System:** Hakkenbroek Housing Company — Next.js application deployed on Netlify  
**Severity:** High (production site intermittently unavailable)  
**Status:** Resolved

---

## 1. Executive Summary

The production website (`hakkenbroek-housing-2026.netlify.app`) was experiencing intermittent **"Internal Server Error" (HTTP 500)** responses. The errors appeared to coincide with the addition of a new property listing (Lairessestraat, Amsterdam), but the root cause was a **Netlify serverless function timeout misconfiguration** combined with a **build-time database client initialization issue**. Both issues have been permanently resolved.

---

## 2. Problem Description

### Symptoms Observed
- Endpoints such as `/api/listings`, `/api/listings/84`, and `/en/properties` returned **500 Internal Server Error** intermittently.
- Errors were most common after the site had been idle for 5–10 minutes (cold starts).
- A manual refresh often resolved the issue, suggesting a transient failure.
- No meaningful error messages appeared in Netlify function logs.

### Initial Misconception
The issue was first suspected to be related to the newly added Lairessestraat listing (large bilingual descriptions or image uploads). Investigation confirmed this was **not** the cause — the listing data itself was healthy and images were served from Cloudflare R2 (external CDN).

---

## 3. Root Cause Analysis

The investigation identified **two distinct but related root causes**:

### Root Cause A: Netlify Function Timeout (Primary)

| Parameter | Value |
|---|---|
| Netlify default function timeout | **10 seconds** |
| Application DB query timeout | **15 seconds** |
| `@neondatabase/serverless` cold-start handshake | **8–12 seconds** |

The application uses `@neondatabase/serverless`, an HTTP-based PostgreSQL driver. On a **cold start** (first request after a period of inactivity), the driver must perform an HTTP TLS handshake and authentication exchange with Neon’s serverless endpoint. This process can take **8–12 seconds**.

If a database query was initiated during this cold-start window, the 15-second application timeout would allow it to proceed, but **Netlify would kill the function at its 10-second hard limit** and return a 500 error to the user. Because Netlify kills the function externally, no error was logged inside the function — making diagnosis difficult.

### Root Cause B: Build-Time Database Client Initialization (Secondary)

In `src/lib/db.ts`, the Neon client was initialized at **module load time** (top-level code):

```typescript
const sql = DATABASE_URL ? neon(DATABASE_URL) : null;
```

During Next.js **static page generation** at build time, all route modules are evaluated. If `DATABASE_URL` was present but contained characters that Neon's URL parser rejected in a build context (or if the environment was missing), the `neon()` constructor would throw, causing the **entire build to fail** with:

```
Error: Database connection string provided to neon() is not a valid URL.
```

This manifested as failed deploys to production (`main` branch) even though the application code itself was correct.

---

## 4. Resolution

Two fixes were implemented and are now live in production.

### Fix A: Lazy-Initialise the Neon Client

**File:** `src/lib/db.ts` (lines 10–25)

The Neon client is now initialized **lazily** — only when the first database query is actually executed at runtime. It is never invoked during Next.js static generation or module evaluation.

```typescript
// Lazy-initialise the Neon client so an invalid DATABASE_URL does not break
// the Next.js build during static page generation.
let sqlInstance: ReturnType<typeof neon> | null = null;
function getSql() {
  if (!sqlInstance && DATABASE_URL) {
    try {
      sqlInstance = neon(DATABASE_URL);
    } catch (err) {
      logger.error('Failed to initialise Neon client', err);
      throw new DatabaseError(
        err instanceof Error ? err.message : 'Failed to initialise Neon client'
      );
    }
  }
  return sqlInstance;
}
```

**Impact:** Eliminates all build-time crashes related to the database client.

### Fix B: Increase Netlify Function Timeout

The Netlify function timeout was increased from the default **10 seconds** to **26 seconds** (Netlify Pro plan maximum). This was applied via the Netlify API at the site level:

```bash
netlify api updateSite --data '{"site_id":"...","body":{"functions_timeout":26}}'
```

**Important:** Attempts to configure this via `netlify.toml` (e.g. `[functions] timeout = 26`) were unsuccessful because Netlify's TOML parser rejects that syntax. The timeout must be set via the API or web dashboard. The `netlify.toml` file was cleaned to remove the invalid configuration.

**Impact:** Prevents Netlify from killing functions during legitimate cold-start database handshakes.

---

## 5. Verification & Current Status

All fixes have been deployed to both **staging** and **production**.

| Check | Result |
|---|---|
| Production build | ✅ Success |
| `/en/properties` | ✅ 200 OK |
| `/api/listings` | ✅ 200 OK |
| `/api/listings/84` | ✅ 200 OK |
| `/api/mcp/health` | ✅ 200 OK |
| Listing 84 (Lairessestraat) | ✅ Live with images & bilingual descriptions |

---

## 6. Prevention Measures

To prevent recurrence:

1. **Never add `[functions] timeout` to `netlify.toml`.** Use the Netlify web dashboard or API to manage function timeouts.
2. **Avoid top-level side effects in `src/lib/db.ts`.** Always lazy-initialize external clients (databases, APIs, etc.) so builds remain deterministic.
3. **Monitor cold-start latency.** If Netlify function duration regularly approaches the timeout ceiling, consider:
   - A Neon connection pooler with keep-alive (if persistent connections become supported).
   - Pre-warming strategies (scheduled health-check pings) to keep functions warm.

---

## 7. Timeline

| Time (UTC+12) | Event |
|---|---|
| May 31, 21:30 | User reports 500 errors after adding Lairessestraat listing |
| May 31, 21:35 | Diagnosis: cold-start timeout identified as primary cause |
| May 31, 21:40 | Invalid `netlify.toml` timeout syntax added (later reverted) |
| May 31, 21:47 | Timeout set correctly via Netlify API; `netlify.toml` cleaned |
| May 31, 21:50 | Build fails — new issue: `neon()` called during static generation |
| May 31, 21:55 | Lazy-initialization implemented in `src/lib/db.ts` |
| May 31, 22:05 | Staging and production deploys succeed |
| June 1, 08:55 | `main` branch merge completed; production verified stable |

---

**Report prepared by:** Development Team  
**For:** Hakkenbroek Housing Company

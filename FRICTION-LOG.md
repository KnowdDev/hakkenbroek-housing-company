# Hakkenbroek Housing MCP — Friction Log (Post-Hardening)

**Date:** 2026-05-11 | **Tester:** Cascade

## Before Hardening
All 6 operations timed out after 60s. Server completely unresponsive.

## After Hardening
All operations now return `404: Session not found or expired` — server responds instantly. MCP client needs SSE reconnect.

## What Was Hardened

| Layer | Before | After |
|-------|--------|-------|
| **DB** | Bare `new Pool()`, no retry, `console.log` | Pool config (max/idle/conn timeout), exponential backoff retry, query timeout, structured logging, health check, pool stats, graceful shutdown |
| **Errors** | Generic strings | Typed hierarchy: `AppError`, `ValidationError`, `NotFoundError`, `UnauthorizedError`, `RateLimitError`, `DatabaseError`, `TimeoutError` |
| **Validation** | Manual `Number()` + `isNaN` checks | Full Zod schemas for all 7 tools with enums, ranges, URL validation |
| **Protocol** | Raw switch with manual validation | `validateArgs()` wrapper, typed error handling per error class, duration logging |
| **Sessions** | No `touchSession`, no message cleanup on delete | `touchSession` on every poll/POST, cascading deletes, LIMIT 100 on polls, logged cleanup |
| **SSE Route** | Silent catch, no logging | `logger` on connect/error, `touchSession` in poll loop, error context in logs |
| **Messages Route** | No limits | Rate limiting (120/min), body size cap (1MB), message count cap (50), `touchSession`, logging |
| **Health** | None | `GET /api/mcp/health` — DB health, pool stats, uptime, version |

## Remaining Issue
MCP client session expired during hardening. Needs SSE reconnect to `/api/mcp/sse?apiKey=...` to get a fresh `sessionId`. Server-side code is solid.

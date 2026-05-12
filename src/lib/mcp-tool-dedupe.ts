/** Short-lived dedupe for identical MCP tool arguments (breaks agent retry loops). */

const TTL_MS = parseInt(process.env.MCP_TOOL_DEDUPE_TTL_MS || '15000', 10);
const MAX_ENTRIES = parseInt(process.env.MCP_TOOL_DEDUPE_MAX_ENTRIES || '800', 10);

type Entry = { payload: string; expiresAt: number };
const store = new Map<string, Entry>();

function prune(now: number): void {
  if (store.size <= MAX_ENTRIES) return;
  for (const [k, v] of store) {
    if (v.expiresAt <= now) store.delete(k);
  }
  if (store.size > MAX_ENTRIES) {
    const iter = store.keys();
    while (store.size > MAX_ENTRIES) {
      const k = iter.next().value as string | undefined;
      if (!k) break;
      store.delete(k);
    }
  }
}

export function stableToolArgsKey(toolName: string, args: Record<string, unknown>): string {
  const keys = Object.keys(args).sort();
  const normalized: Record<string, unknown> = {};
  for (const k of keys) normalized[k] = args[k];
  return `${toolName}:${JSON.stringify(normalized)}`;
}

export function peekDedupe(namespace: string, toolName: string, args: Record<string, unknown>): string | null {
  const now = Date.now();
  prune(now);
  const key = `${namespace}:${stableToolArgsKey(toolName, args)}`;
  const e = store.get(key);
  if (!e || e.expiresAt <= now) {
    if (e && e.expiresAt <= now) store.delete(key);
    return null;
  }
  return e.payload;
}

export function rememberDedupe(namespace: string, toolName: string, args: Record<string, unknown>, payload: string): void {
  const now = Date.now();
  prune(now);
  const key = `${namespace}:${stableToolArgsKey(toolName, args)}`;
  store.set(key, { payload, expiresAt: now + TTL_MS });
}

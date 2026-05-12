'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface ApiKeyRecord {
  key_id: string;
  name: string;
  key_preview: string;
  created_at: string;
  last_used_at?: string | null;
  last_used_ip?: string | null;
  request_count?: number;
  revoked_at?: string | null;
}

export default function McpDashboard() {
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [apiKeyName, setApiKeyName] = useState('Hakkenbroek MCP Key');
  const [liveApiKey, setLiveApiKey] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [creatingKey, setCreatingKey] = useState(false);
  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');

  const mcpUrl = useMemo(() => `${baseUrl}/api/mcp`, [baseUrl]);

  useEffect(() => {
    setBaseUrl(window.location.origin);
    fetchKeys();
  }, []);

  const handleCopy = (text: string, key: string = 'default') => {
    navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const fetchKeys = async () => {
    setLoadingKeys(true);
    try {
      const response = await fetch('/api/mcp/keys');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch API keys');
      }
      setKeys(Array.isArray(data) ? data : []);
    } catch (error) {
      setTestResult(`Unable to load API keys: ${(error as Error).message}`);
      setKeys([]);
    } finally {
      setLoadingKeys(false);
    }
  };

  const createKey = async () => {
    setCreatingKey(true);
    setCreatedKey(null);
    try {
      const response = await fetch('/api/mcp/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: apiKeyName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create API key');
      }
      setCreatedKey(data.key);
      setLiveApiKey(data.key);
      await fetchKeys();
    } catch (error) {
      setTestResult(`Failed to create API key: ${(error as Error).message}`);
    } finally {
      setCreatingKey(false);
    }
  };

  const revokeKey = async (keyId: string) => {
    setRevokingKeyId(keyId);
    try {
      const response = await fetch(`/api/mcp/keys/${keyId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to revoke API key');
      }
      await fetchKeys();
    } catch (error) {
      setTestResult(`Failed to revoke API key: ${(error as Error).message}`);
    } finally {
      setRevokingKeyId(null);
    }
  };

  const deleteKey = async (keyId: string) => {
    if (!confirm('Permanently delete this key? This cannot be undone.')) return;
    setDeletingKeyId(keyId);
    try {
      const response = await fetch(`/api/mcp/keys/${keyId}?permanent=true`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to delete API key');
      }
      await fetchKeys();
    } catch (error) {
      setTestResult(`Failed to delete API key: ${(error as Error).message}`);
    } finally {
      setDeletingKeyId(null);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/listings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(liveApiKey ? { 'x-api-key': liveApiKey } : {}),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setTestResult(`Request failed (${response.status}): ${data?.error || 'Unknown error'}`);
        return;
      }
      const listingCount = Array.isArray(data) ? data.length : 0;
      setTestResult(`Success: API reachable. Returned ${listingCount} listing(s).`);
    } catch (error) {
      setTestResult(`Network error: ${(error as Error).message}`);
    } finally {
      setTesting(false);
    }
  };

  const curlExample = useMemo(
    () =>
      `curl -X GET "${baseUrl}/api/listings" \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: ${liveApiKey || '$MCP_API_KEY'}"`,
    [baseUrl, liveApiKey]
  );

  const mcpCurlExample = useMemo(() => {
    const apiKey = liveApiKey || '$MCP_API_KEY';
    return `curl -X POST "${mcpUrl}" \\\n  -H "Content-Type: application/json" \\\n  -H "Accept: application/json, text/event-stream" \\\n  -H "MCP-Protocol-Version: 2025-11-25" \\\n  -H "x-api-key: ${apiKey}" \\\n  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`;
  }, [mcpUrl, liveApiKey]);

  const mcpToolCurl = useMemo(() => {
    const apiKey = liveApiKey || '$MCP_API_KEY';
    return `curl -X POST "${mcpUrl}" \\\n  -H "Content-Type: application/json" \\\n  -H "Accept: application/json, text/event-stream" \\\n  -H "MCP-Protocol-Version: 2025-11-25" \\\n  -H "x-api-key: ${apiKey}" \\\n  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_listings","arguments":{}}}'`;
  }, [mcpUrl, liveApiKey]);

  const [activeEditorTab, setActiveEditorTab] = useState<'claude' | 'cursor' | 'windsurf' | 'vscode' | 'generic'>('windsurf');

  const editorConfigs = useMemo(() => {
    const apiKey = liveApiKey || '$HBK_API_KEY';
    return {
      claude: JSON.stringify(
        {
          mcpServers: {
            'hakkenbroek-housing': {
              url: mcpUrl,
              headers: { 'x-api-key': apiKey },
            },
          },
        },
        null,
        2
      ),
      cursor: JSON.stringify(
        {
          mcpServers: {
            'hakkenbroek-housing': {
              url: mcpUrl,
              headers: { 'x-api-key': apiKey },
            },
          },
        },
        null,
        2
      ),
      windsurf: JSON.stringify(
        {
          mcpServers: {
            'hakkenbroek-housing': {
              url: mcpUrl,
              headers: { 'x-api-key': apiKey },
            },
          },
        },
        null,
        2
      ),
      vscode: JSON.stringify(
        {
          mcp: {
            servers: {
              'hakkenbroek-housing': {
                url: mcpUrl,
                headers: { 'x-api-key': apiKey },
              },
            },
          },
        },
        null,
        2
      ),
      generic: JSON.stringify(
        {
          name: 'hakkenbroek-housing',
          protocol: 'mcp',
          transport: 'http',
          url: mcpUrl,
          headers: { 'x-api-key': apiKey },
        },
        null,
        2
      ),
    };
  }, [mcpUrl, liveApiKey]);

  const editorTabs = [
    { id: 'claude' as const, label: 'Claude Desktop', config: editorConfigs.claude, filePath: '~/Library/Application Support/Claude/claude_desktop_config.json' },
    { id: 'cursor' as const, label: 'Cursor', config: editorConfigs.cursor, filePath: '~/.cursor/mcp.json' },
    { id: 'windsurf' as const, label: 'Windsurf', config: editorConfigs.windsurf, filePath: '~/.windsurf/mcp_config.json' },
    { id: 'vscode' as const, label: 'VS Code / Copilot', config: editorConfigs.vscode, filePath: 'VS Code Settings (JSON)' },
    { id: 'generic' as const, label: 'Generic', config: editorConfigs.generic, filePath: 'Any MCP-compatible client' },
  ];

  const activeTab = editorTabs.find((t) => t.id === activeEditorTab) || editorTabs[0];

  const downloadConfig = (configText: string, filename: string) => {
    const blob = new Blob([configText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">MCP Server</h1>
          <p className="text-stone-600">
            MCP Streamable HTTP — JSON-RPC over POST with Cursor, Claude Code, Windsurf, VS Code, and other MCP-capable clients
          </p>
        </div>

        {/* Connection Info */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">Connection Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">MCP Endpoint</label>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200 break-all">
                  {mcpUrl}
                </code>
                <button
                  onClick={() => handleCopy(mcpUrl, 'mcp')}
                  className="bg-charcoal text-white px-4 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg flex-shrink-0"
                >
                  {copiedMap['mcp'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                POST JSON-RPC per MCP Streamable HTTP (see curl examples). Include{' '}
                <code className="text-stone-600">Accept: application/json, text/event-stream</code> for IDE compatibility.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">REST API Base</label>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200 break-all">
                  {baseUrl}/api
                </code>
                <button
                  onClick={() => handleCopy(`${baseUrl}/api`, 'rest')}
                  className="bg-charcoal text-white px-4 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg flex-shrink-0"
                >
                  {copiedMap['rest'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Direct HTTP endpoints for custom integrations
              </p>
            </div>
          </div>
        </div>

        {/* API Key Management */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">API Keys</h2>

          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
            <input
              type="text"
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              placeholder="Key name (e.g. Cursor Work Laptop)"
              className="w-full md:max-w-sm px-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
            />
            <button
              onClick={createKey}
              disabled={creatingKey}
              className="bg-charcoal text-white px-4 py-3 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg disabled:opacity-50"
            >
              {creatingKey ? 'Creating...' : 'Generate API Key'}
            </button>
          </div>

          {createdKey && (
            <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-charcoal font-medium">
                  Copy this key now. You will not see it again.
                </p>
              </div>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-3 py-2 rounded border border-amber-200 text-xs md:text-sm break-all">
                  {createdKey}
                </code>
                <button
                  onClick={() => handleCopy(createdKey, 'created')}
                  className="bg-charcoal text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg flex-shrink-0"
                >
                  {copiedMap['created'] ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {loadingKeys ? (
            <p className="text-sm text-stone-500">Loading API keys...</p>
          ) : keys.length === 0 ? (
            <p className="text-sm text-stone-500">No API keys yet. Generate one to get started.</p>
          ) : (
            <div className="space-y-3">
              {keys.map((key) => (
                <div key={key.key_id} className="border border-stone-200 bg-white rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-charcoal">{key.name}</p>
                        {key.revoked_at ? (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                            Revoked
                          </span>
                        ) : (
                          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <code className="text-xs text-stone-600 block mt-1">{key.key_preview}</code>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-stone-500">
                        <span>Created: {new Date(key.created_at).toLocaleString()}</span>
                        {key.last_used_at && (
                          <span>Last used: {new Date(key.last_used_at).toLocaleString()}</span>
                        )}
                        {typeof key.request_count === 'number' && (
                          <span>Requests: {key.request_count}</span>
                        )}
                        {key.last_used_ip && key.last_used_ip !== 'unknown' && (
                          <span>IP: {key.last_used_ip}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!key.revoked_at && (
                        <button
                          onClick={() => revokeKey(key.key_id)}
                          disabled={revokingKeyId === key.key_id}
                          className="bg-red-600 text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-red-700 transition-colors rounded-lg disabled:opacity-50"
                        >
                          {revokingKeyId === key.key_id ? 'Revoking...' : 'Revoke'}
                        </button>
                      )}
                      <button
                        onClick={() => deleteKey(key.key_id)}
                        disabled={deletingKeyId === key.key_id}
                        className="bg-stone-600 text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors rounded-lg disabled:opacity-50"
                      >
                        {deletingKeyId === key.key_id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-stone-200">
            <h3 className="text-sm font-medium text-stone-700 mb-3">Quick Test</h3>
            <div className="flex flex-col md:flex-row gap-3 md:items-center mb-3">
              <input
                type="password"
                value={liveApiKey}
                onChange={(e) => setLiveApiKey(e.target.value)}
                placeholder="Paste any API key to test"
                className="w-full md:max-w-md px-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
              />
              <button
                onClick={testConnection}
                disabled={testing}
                className="bg-charcoal text-white px-4 py-3 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg disabled:opacity-50"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            {testResult && (
              <p className={`text-sm leading-relaxed ${testResult.startsWith('Success') ? 'text-emerald-600' : 'text-red-600'}`}>
                {testResult}
              </p>
            )}
          </div>
        </div>

        {/* Connect Your Editor */}
        {createdKey && (
          <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-2xl text-charcoal">Connect Your Editor</h2>
                <p className="text-sm text-stone-500">
                  Copy the config for your AI editor and paste it in the right place
                </p>
              </div>
            </div>

            {/* Editor Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-2">
              {editorTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveEditorTab(tab.id)}
                  className={`px-4 py-2 font-body text-xs uppercase tracking-wider rounded-t-lg transition-colors ${
                    activeEditorTab === tab.id
                      ? 'bg-charcoal text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Config Display */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-stone-700">{activeTab.label} Config</p>
                  <p className="text-xs text-stone-500">Paste this into {activeTab.filePath}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(activeTab.config, activeTab.id)}
                    className="bg-charcoal text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg"
                  >
                    {copiedMap[activeTab.id] ? 'Copied' : 'Copy Config'}
                  </button>
                  <button
                    onClick={() => downloadConfig(activeTab.config, `hakkenbroek-mcp-${activeTab.id}.json`)}
                    className="bg-stone-200 text-charcoal px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-stone-300 transition-colors rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </div>
              <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                {activeTab.config}
              </pre>
            </div>
          </div>
        )}

        {/* cURL Examples */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">cURL Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">List MCP Tools</h3>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {mcpCurlExample}
                </pre>
                <button
                  onClick={() => handleCopy(mcpCurlExample, 'mcptools')}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copiedMap['mcptools'] ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">Call list_listings Tool</h3>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {mcpToolCurl}
                </pre>
                <button
                  onClick={() => handleCopy(mcpToolCurl, 'mcplist')}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copiedMap['mcplist'] ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">Get All Listings (REST)</h3>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {curlExample}
                </pre>
                <button
                  onClick={() => handleCopy(curlExample, 'curl')}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copiedMap['curl'] ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200">
          <h2 className="font-display text-2xl text-charcoal mb-6">How It Works</h2>
          <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Streamable HTTP</strong> — Compatible with MCP 2025-03-26+ clients: POST JSON-RPC with{' '}
                <code className="text-stone-700">Accept: application/json, text/event-stream</code>. Responses return as JSON or as an SSE-framed payload when clients request streaming.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Flexible auth</strong> — Use a static <code>MCP_API_KEY</code> env var, or generate revocable managed keys from this dashboard. Both work with the same endpoint.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Same data layer</strong> — MCP tools and REST API both read from the same PostgreSQL database. No duplicated logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

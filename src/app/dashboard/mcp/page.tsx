'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

type EditorTab = 'claude' | 'cursor' | 'windsurf' | 'vscode' | 'generic';

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
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('claude');
  const [showConnectPanel, setShowConnectPanel] = useState(false);

  const sseUrl = useMemo(() => `${baseUrl}/api/mcp/sse`, [baseUrl]);

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
    setShowConnectPanel(false);
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
      setShowConnectPanel(true);
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

  // --- Config generators ---

  const claudeConfig = useMemo(() => {
    if (!createdKey) return '';
    return JSON.stringify(
      {
        mcpServers: {
          'hakkenbroek-housing': {
            url: `${sseUrl}?apiKey=${createdKey}`,
          },
        },
      },
      null,
      2
    );
  }, [createdKey, sseUrl]);

  const cursorConfig = useMemo(() => {
    if (!createdKey) return '';
    return JSON.stringify(
      {
        mcpServers: {
          'hakkenbroek-housing': {
            url: `${sseUrl}?apiKey=${createdKey}`,
          },
        },
      },
      null,
      2
    );
  }, [createdKey, sseUrl]);

  const windsurfConfig = useMemo(() => {
    if (!createdKey) return '';
    return JSON.stringify(
      {
        mcpServers: {
          'hakkenbroek-housing': {
            url: `${sseUrl}?apiKey=${createdKey}`,
          },
        },
      },
      null,
      2
    );
  }, [createdKey, sseUrl]);

  const vscodeConfig = useMemo(() => {
    if (!createdKey) return '';
    return JSON.stringify(
      {
        mcp: {
          servers: {
            'hakkenbroek-housing': {
              url: `${sseUrl}?apiKey=${createdKey}`,
            },
          },
        },
      },
      null,
      2
    );
  }, [createdKey, sseUrl]);

  const genericConfig = useMemo(() => {
    if (!createdKey) return '';
    return JSON.stringify(
      {
        name: 'hakkenbroek-housing',
        protocol: 'mcp',
        transport: 'sse',
        url: `${sseUrl}?apiKey=${createdKey}`,
      },
      null,
      2
    );
  }, [createdKey, sseUrl]);

  const editorTabs: { id: EditorTab; label: string; config: string; filePath: string }[] = useMemo(
    () => [
      {
        id: 'claude',
        label: 'Claude Desktop',
        config: claudeConfig,
        filePath: '~/Library/Application Support/Claude/claude_desktop_config.json',
      },
      {
        id: 'cursor',
        label: 'Cursor',
        config: cursorConfig,
        filePath: '~/.cursor/mcp.json',
      },
      {
        id: 'windsurf',
        label: 'Windsurf',
        config: windsurfConfig,
        filePath: '~/.windsurf/mcp_config.json',
      },
      {
        id: 'vscode',
        label: 'VS Code / Copilot',
        config: vscodeConfig,
        filePath: 'VS Code Settings (JSON)',
      },
      {
        id: 'generic',
        label: 'Generic SSE',
        config: genericConfig,
        filePath: 'Any MCP-compatible client',
      },
    ],
    [claudeConfig, cursorConfig, windsurfConfig, vscodeConfig, genericConfig]
  );

  const activeTab = editorTabs.find((t) => t.id === activeEditorTab) || editorTabs[0];

  const curlExample = useMemo(
    () =>
      `curl -X GET "${baseUrl}/api/listings" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${liveApiKey || '$HBK_API_KEY'}"`,
    [baseUrl, liveApiKey]
  );

  const mcpCurlTest = useMemo(() => {
    if (!createdKey) return '';
    return `curl -N "${sseUrl}?apiKey=${createdKey}" \\
  -H "Accept: text/event-stream"`;
  }, [createdKey, sseUrl]);

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
            Generate managed API keys and connect your AI editor directly to Hakkenbroek Housing
          </p>
        </div>

        {/* Connection Info */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">Connection Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">SSE Endpoint</label>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200 break-all">
                  {sseUrl}
                </code>
                <button
                  onClick={() => handleCopy(sseUrl, 'sse')}
                  className="bg-charcoal text-white px-4 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg flex-shrink-0"
                >
                  {copiedMap['sse'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                MCP clients connect here via Server-Sent Events
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
                    {!key.revoked_at && (
                      <button
                        onClick={() => revokeKey(key.key_id)}
                        disabled={revokingKeyId === key.key_id}
                        className="bg-red-600 text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-red-700 transition-colors rounded-lg disabled:opacity-50 flex-shrink-0"
                      >
                        {revokingKeyId === key.key_id ? 'Revoking...' : 'Revoke'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connect Your Editor */}
        {showConnectPanel && createdKey && (
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

            {/* Quick Test */}
            <div className="border-t border-stone-200 pt-6">
              <h3 className="text-sm font-medium text-stone-700 mb-3">Quick SSE Test</h3>
              <div className="relative mb-3">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {mcpCurlTest}
                </pre>
                <button
                  onClick={() => handleCopy(mcpCurlTest, 'mcptest')}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copiedMap['mcptest'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Run this in your terminal to verify the MCP SSE endpoint is reachable with your key.
              </p>
            </div>
          </div>
        )}

        {/* Test Connection */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">Test REST API</h2>
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
            <input
              type="password"
              value={liveApiKey}
              onChange={(e) => setLiveApiKey(e.target.value)}
              placeholder="Paste API key for test request"
              className="w-full md:max-w-md px-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
            />
            <button
              onClick={testConnection}
              disabled={testing}
              className="bg-charcoal text-white px-4 py-3 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg disabled:opacity-50"
            >
              {testing ? 'Testing...' : 'Test GET /api/listings'}
            </button>
          </div>
          {testResult && (
            <p className={`text-sm leading-relaxed ${testResult.startsWith('Success') ? 'text-emerald-600' : 'text-red-600'}`}>
              {testResult}
            </p>
          )}
        </div>

        {/* Code Examples */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">cURL Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">Get All Listings</h3>
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

        {/* Security Notes */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200">
          <h2 className="font-display text-2xl text-charcoal mb-6">Security</h2>
          <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">SHA-256 hashing</strong> — Only hashes of API key secrets are stored in the database. The raw secret is shown exactly once at creation and never again.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Constant-time comparison</strong> — Key validation uses timing-safe equality checks to prevent timing side-channel attacks.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Request tracking</strong> — Every key logs its last used timestamp, IP address, and total request count. Revoke any key instantly from this dashboard.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Dashboard fallback</strong> — Write operations accept either a valid MCP API key or an active dashboard session, so you can manage listings directly from the browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

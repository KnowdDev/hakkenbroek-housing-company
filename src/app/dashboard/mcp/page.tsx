'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface ApiKeyRecord {
  key_id: string;
  name: string;
  key_preview: string;
  created_at: string;
  last_used_at?: string | null;
  revoked_at?: string | null;
}

export default function McpDashboard() {
  const [copied, setCopied] = useState(false);
  const [apiKeyName, setApiKeyName] = useState('Cursor MCP Key');
  const [liveApiKey, setLiveApiKey] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [creatingKey, setCreatingKey] = useState(false);
  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');

  const mcpConfig = {
    name: 'hakkenbroek-housing',
    version: '1.0.0',
    description: 'MCP server for managing Hakkenbroek Housing property listings',
    baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:3001/api',
    endpoints: [
      {
        name: 'Listings',
        path: '/listings',
        methods: ['GET', 'POST'],
        description: 'Get all listings or create a new listing',
      },
      {
        name: 'Single Listing',
        path: '/listings/{id}',
        methods: ['GET', 'PUT', 'DELETE'],
        description: 'Get, update, or delete a specific listing',
      },
      {
        name: 'Enquiries',
        path: '/enquiries',
        methods: ['GET', 'POST'],
        description: 'Get all enquiries or submit a new enquiry',
      },
    ],
  };

  useEffect(() => {
    setBaseUrl(window.location.origin);
    fetchKeys();
  }, []);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const cursorConfig = useMemo(
    () =>
      JSON.stringify(
        {
          name: mcpConfig.name,
          baseUrl: `${baseUrl || mcpConfig.baseUrl}/api`,
          headers: {
            'x-api-key': '${HBK_MCP_API_KEY}',
          },
          endpoints: mcpConfig.endpoints.map((endpoint) => endpoint.path),
        },
        null,
        2
      ),
    [baseUrl]
  );

  const downloadConfig = () => {
    const blob = new Blob([cursorConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hakkenbroek-mcp-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const curlExample = `curl -X GET "${baseUrl || mcpConfig.baseUrl}/api/listings" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $HBK_MCP_API_KEY"`;

  const postExample = `curl -X POST "${baseUrl || mcpConfig.baseUrl}/api/listings" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $HBK_MCP_API_KEY" \\
  -d '{
    "title": "New Property",
    "description": "Beautiful home in Amsterdam",
    "price": 1200000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 150,
    "address": "Herengracht 123",
    "city": "Amsterdam",
    "postal_code": "1015 BW",
    "property_type": "apartment",
    "status": "available",
    "image_url": "https://images.unsplash.com/photo-...",
    "featured": false
  }'`;

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

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">MCP Server</h1>
          <p className="text-stone-600">Generate API keys and share config for Cursor using regular HTTP</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Connection Info */}
          <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200">
            <h2 className="font-display text-2xl text-charcoal mb-6">Connection Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Base URL</label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-stone-50 px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200">
                    {`${baseUrl || mcpConfig.baseUrl}/api`}
                  </code>
                  <button
                    onClick={() => handleCopy(`${baseUrl || mcpConfig.baseUrl}/api`)}
                    className="bg-charcoal text-white px-4 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Server Name</label>
                <code className="block bg-stone-50 px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200">
                  {mcpConfig.name}
                </code>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Version</label>
                <code className="block bg-stone-50 px-4 py-3 rounded-lg text-sm text-charcoal font-mono border border-stone-200">
                  {mcpConfig.version}
                </code>
              </div>
            </div>
          </div>

          {/* Available Endpoints */}
          <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200">
            <h2 className="font-display text-2xl text-charcoal mb-6">Available Endpoints</h2>

            <div className="space-y-4">
              {mcpConfig.endpoints.map((endpoint) => (
                <div key={endpoint.path} className="border border-stone-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-charcoal">{endpoint.name}</h3>
                    <div className="flex gap-2">
                      {endpoint.methods.map((method) => (
                        <span
                          key={method}
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            method === 'GET'
                              ? 'bg-emerald-50 text-emerald-700'
                              : method === 'POST'
                              ? 'bg-blue-50 text-blue-700'
                              : method === 'PUT'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                  <code className="text-sm text-warm-gray font-mono">{endpoint.path}</code>
                  <p className="text-sm text-stone-500 mt-2">{endpoint.description}</p>
                </div>
              ))}
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
              placeholder="Key name"
              className="w-full md:max-w-sm px-4 py-3 border border-stone-300 rounded-lg text-sm"
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
              <p className="text-sm text-charcoal mb-2 font-medium">Copy this key now. You will not see it again.</p>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-3 py-2 rounded border border-amber-200 text-xs md:text-sm break-all">
                  {createdKey}
                </code>
                <button
                  onClick={() => handleCopy(createdKey)}
                  className="bg-charcoal text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-brass transition-colors rounded-lg"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {loadingKeys ? (
            <p className="text-sm text-stone-500">Loading API keys...</p>
          ) : keys.length === 0 ? (
            <p className="text-sm text-stone-500">No API keys yet.</p>
          ) : (
            <div className="space-y-3">
              {keys.map((key) => (
                <div key={key.key_id} className="border border-stone-200 bg-white rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-medium text-charcoal">{key.name}</p>
                      <code className="text-xs text-stone-600">{key.key_preview}</code>
                      <p className="text-xs text-stone-500 mt-1">
                        Created: {new Date(key.created_at).toLocaleString()}
                        {key.last_used_at ? ` • Last used: ${new Date(key.last_used_at).toLocaleString()}` : ''}
                      </p>
                      {key.revoked_at && (
                        <p className="text-xs text-red-600 mt-1">Revoked: {new Date(key.revoked_at).toLocaleString()}</p>
                      )}
                    </div>
                    {!key.revoked_at && (
                      <button
                        onClick={() => revokeKey(key.key_id)}
                        disabled={revokingKeyId === key.key_id}
                        className="bg-red-600 text-white px-3 py-2 font-body text-xs uppercase tracking-wider hover:bg-red-700 transition-colors rounded-lg disabled:opacity-50"
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

        {/* Code Examples */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">Code Examples</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">Get All Listings</h3>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {curlExample}
                </pre>
                <button
                  onClick={() => handleCopy(curlExample)}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-2">Create a New Listing</h3>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {postExample}
                </pre>
                <button
                  onClick={() => handleCopy(postExample)}
                  className="absolute top-3 right-3 bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Integration Guide */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200">
          <h2 className="font-display text-2xl text-charcoal mb-6">AI Integration Guide</h2>

          <div className="space-y-6 text-stone-600">
            <div>
              <h3 className="font-medium text-charcoal mb-2">1. Configure Your AI Agent</h3>
              <p className="text-sm leading-relaxed">
                Point your AI agent to the base URL above. The API follows REST conventions with JSON payloads.
                All endpoints support standard HTTP methods and return JSON responses.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">2. Authentication</h3>
              <p className="text-sm leading-relaxed">
                Configure <code className="bg-stone-100 px-1 rounded">MCP_API_KEY</code> on the server to enforce
                API-key authentication for write operations (POST/PUT/DELETE). Use either
                <code className="bg-stone-100 px-1 rounded ml-1">x-api-key</code> or
                <code className="bg-stone-100 px-1 rounded ml-1">Authorization: Bearer &lt;key&gt;</code>.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">3. Listing Schema</h3>
              <p className="text-sm leading-relaxed mb-3">
                When creating or updating listings, use this field schema:
              </p>
              <ul className="text-sm space-y-1 ml-4 list-disc">
                <li><strong>title</strong> (string, required) - Property name</li>
                <li><strong>description</strong> (string) - Full property description</li>
                <li><strong>price</strong> (number) - Price in Euros</li>
                <li><strong>bedrooms</strong> (number) - Number of bedrooms</li>
                <li><strong>bathrooms</strong> (number) - Number of bathrooms</li>
                <li><strong>area</strong> (number) - Square meters</li>
                <li><strong>address</strong> (string) - Street address</li>
                <li><strong>city</strong> (string) - City name</li>
                <li><strong>postal_code</strong> (string) - Postal code</li>
                <li><strong>property_type</strong> (string) - apartment, house, villa, studio, penthouse</li>
                <li><strong>status</strong> (string) - available, sold, rented, under-consideration</li>
                <li><strong>image_url</strong> (string) - Primary image URL</li>
                <li><strong>featured</strong> (boolean) - Highlight on homepage</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">4. Quick Connectivity Test</h3>
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <input
                  type="password"
                  value={liveApiKey}
                  onChange={(e) => setLiveApiKey(e.target.value)}
                  placeholder="Paste API key for test request"
                  className="w-full md:max-w-md px-4 py-3 border border-stone-300 rounded-lg text-sm"
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
                <p className="text-sm leading-relaxed mt-3">{testResult}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">5. Cursor Config File</h3>
              <p className="text-sm leading-relaxed mb-3">
                Share this config with Cursor and set <code className="bg-stone-100 px-1 rounded">HBK_MCP_API_KEY</code>.
              </p>
              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 px-4 py-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {cursorConfig}
                </pre>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleCopy(cursorConfig)}
                    className="bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadConfig}
                    className="bg-stone-50/10 text-white px-3 py-1 font-body text-xs uppercase tracking-wider hover:bg-stone-50/20 transition-colors rounded"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

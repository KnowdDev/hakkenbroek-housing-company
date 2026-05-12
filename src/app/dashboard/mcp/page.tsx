'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function McpDashboard() {
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [liveApiKey, setLiveApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');

  const mcpUrl = useMemo(() => `${baseUrl}/api/mcp`, [baseUrl]);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleCopy = (text: string, key: string = 'default') => {
    navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [key]: false })), 2000);
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
    return `curl -X POST "${mcpUrl}" \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: ${apiKey}" \\\n  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`;
  }, [mcpUrl, liveApiKey]);

  const mcpToolCurl = useMemo(() => {
    const apiKey = liveApiKey || '$MCP_API_KEY';
    return `curl -X POST "${mcpUrl}" \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: ${apiKey}" \\\n  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_listings","arguments":{}}}'`;
  }, [mcpUrl, liveApiKey]);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">MCP Server</h1>
          <p className="text-stone-600">
            Direct HTTP JSON-RPC endpoint for AI editors and integrations
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
                POST JSON-RPC requests here. Responses return immediately.
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

        {/* API Key Setup */}
        <div className="bg-stone-50 rounded-lg shadow-sm p-8 border border-stone-200 mb-8">
          <h2 className="font-display text-2xl text-charcoal mb-6">API Key</h2>
          <p className="text-sm text-stone-600 mb-4">
            Set the <code className="bg-white px-1 py-0.5 rounded border border-stone-200 text-xs">MCP_API_KEY</code> environment variable on your server. All MCP requests must include this key via the <code className="bg-white px-1 py-0.5 rounded border border-stone-200 text-xs">x-api-key</code> header or Bearer token.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
            <input
              type="password"
              value={liveApiKey}
              onChange={(e) => setLiveApiKey(e.target.value)}
              placeholder="Paste MCP_API_KEY to test"
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
                <strong className="text-charcoal">Direct HTTP</strong> — POST a JSON-RPC request, get the response immediately. No SSE streams, no message queues, no polling loops.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong className="text-charcoal">Simple auth</strong> — Single API key via the <code>MCP_API_KEY</code> environment variable. No database tables for key management.
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

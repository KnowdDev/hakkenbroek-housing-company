'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function McpDashboard() {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const curlExample = `curl -X GET "${mcpConfig.baseUrl}/listings" -H "Content-Type: application/json"`;

  const postExample = `curl -X POST "${mcpConfig.baseUrl}/listings" \\
  -H "Content-Type: application/json" \\
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

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">MCP Server</h1>
          <p className="text-stone-600">Connect AI agents to manage listings and enquiries</p>
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
                    {mcpConfig.baseUrl}
                  </code>
                  <button
                    onClick={() => handleCopy(mcpConfig.baseUrl)}
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
                Currently, the API is open for local development. For production use, implement API key authentication
                by adding an Authorization header to all requests.
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
              <h3 className="font-medium text-charcoal mb-2">4. Rate Limits</h3>
              <p className="text-sm leading-relaxed">
                No rate limits are enforced in development. For production deployments,
                consider adding rate limiting to prevent abuse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

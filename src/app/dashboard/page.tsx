'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  property_id?: number;
  property_title?: string;
  created_at: string;
}

interface Listing {
  id: number;
  title: string;
  price?: number;
  status: string;
  property_type?: string;
  featured: boolean;
}

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchEnquiries(), fetchListings()]);
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries');
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data as { error?: string })?.error || 'Failed to fetch enquiries');
      }
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
    }
  };

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data as { error?: string })?.error || 'Failed to fetch listings');
      }
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalListings: listings.length,
    availableListings: listings.filter(l => l.status === 'available').length,
    featuredListings: listings.filter(l => l.featured).length,
    totalEnquiries: enquiries.length,
    recentEnquiries: enquiries.length > 0 ? enquiries[0].created_at : null,
    totalValue: listings.reduce((sum, l) => sum + (l.price || 0), 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">Dashboard</h1>
          <p className="text-stone-600">Welcome back. Here's what's happening.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <p className="text-sm font-body uppercase tracking-wider text-stone-600 mb-2">Total Listings</p>
            <p className="font-display text-3xl text-charcoal">{stats.totalListings}</p>
            <Link href="/dashboard/listings" className="text-sm text-brass hover:underline mt-2 inline-block">
              View all →
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <p className="text-sm font-body uppercase tracking-wider text-stone-600 mb-2">Available</p>
            <p className="font-display text-3xl text-emerald-700">{stats.availableListings}</p>
            <p className="text-sm text-stone-500 mt-2">
              {stats.availableListings > 0 && `${Math.round((stats.availableListings / stats.totalListings) * 100)}% of portfolio`}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <p className="text-sm font-body uppercase tracking-wider text-stone-600 mb-2">Featured</p>
            <p className="font-display text-3xl text-brass">{stats.featuredListings}</p>
            <p className="text-sm text-stone-500 mt-2">Highlighted properties</p>
          </div>

          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <p className="text-sm font-body uppercase tracking-wider text-stone-600 mb-2">Total Enquiries</p>
            <p className="font-display text-3xl text-charcoal">{stats.totalEnquiries}</p>
            {stats.recentEnquiries && (
              <p className="text-sm text-stone-500 mt-2">
                Last: {new Date(stats.recentEnquiries).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Portfolio Value */}
        {stats.totalValue > 0 && (
          <div className="bg-brass text-white rounded-lg p-6 mb-8">
            <p className="text-sm font-body uppercase tracking-wider mb-2">Portfolio Value</p>
            <p className="font-display text-4xl">€{stats.totalValue.toLocaleString()}</p>
            <p className="text-sm opacity-90 mt-1">Combined asking price of all listings</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/listings"
            className="bg-white rounded-lg border border-stone-200 p-6 hover:border-brass transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-brass group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal">Add Listing</p>
                <p className="text-sm text-stone-500">Create new property</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/listings"
            className="bg-white rounded-lg border border-stone-200 p-6 hover:border-brass transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-brass group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal">Manage Listings</p>
                <p className="text-sm text-stone-500">Edit or delete</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="bg-white rounded-lg border border-stone-200 p-6 hover:border-brass transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-brass group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-charcoal">View Enquiries</p>
                <p className="text-sm text-stone-500">Recent messages</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-display text-xl text-charcoal">Recent Enquiries</h2>
            <Link href="/dashboard" className="text-sm text-brass hover:underline">View all</Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No enquiries yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">Date</th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">Name</th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">Email</th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">Property</th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.slice(0, 5).map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">{enquiry.name}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{enquiry.email}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {enquiry.property_title || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 max-w-md truncate">
                      {enquiry.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

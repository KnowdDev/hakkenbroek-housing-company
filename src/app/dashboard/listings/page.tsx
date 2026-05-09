'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Listing {
  id: number;
  title: string;
  description?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  address?: string;
  city?: string;
  postal_code?: string;
  property_type?: string;
  status: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
}

export default function ListingsDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<Partial<Listing>>({
    title: '',
    description: '',
    price: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    area: undefined,
    address: '',
    city: '',
    postal_code: '',
    property_type: 'apartment',
    status: 'available',
    image_url: '',
    featured: false,
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingListing
        ? `/api/listings/${editingListing.id}`
        : '/api/listings';
      const method = editingListing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchListings();
        setShowAddForm(false);
        setEditingListing(null);
        setFormData({
          title: '',
          description: '',
          price: undefined,
          bedrooms: undefined,
          bathrooms: undefined,
          area: undefined,
          address: '',
          city: '',
          postal_code: '',
          property_type: 'apartment',
          status: 'available',
          image_url: '',
          featured: false,
        });
      }
    } catch (error) {
      console.error('Error saving listing:', error);
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setFormData(listing);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchListings();
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl text-charcoal mb-2">Listings</h1>
              <p className="text-stone-600">Manage your property listings</p>
            </div>
            <button
              onClick={() => {
                console.log('Add Listing clicked');
                setShowAddForm(true);
                setEditingListing(null);
                setFormData({
                  title: '',
                  description: '',
                  price: undefined,
                  bedrooms: undefined,
                  bathrooms: undefined,
                  area: undefined,
                  address: '',
                  city: '',
                  postal_code: '',
                  property_type: 'apartment',
                  status: 'available',
                  image_url: '',
                  featured: false,
                });
              }}
              className="bg-charcoal text-white px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
            >
              Add Listing
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-stone-50 rounded-lg shadow-sm p-8 mb-8 border-2 border-brass">
            <h2 className="font-display text-2xl text-charcoal mb-6">
              {editingListing ? 'Edit Listing' : 'Add New Listing'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Price (€)
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms || ''}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms || ''}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Area (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium text-stone-700">
                    Featured
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-charcoal text-white px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
                >
                  {editingListing ? 'Update Listing' : 'Add Listing'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingListing(null);
                  }}
                  className="bg-stone-200 text-charcoal px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-stone-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-stone-50 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading listings...</div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No listings yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Featured
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                      {listing.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {listing.price ? `€${listing.price.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 capitalize">
                      {listing.property_type || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : listing.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {listing.featured ? (
                        <span className="px-2 py-1 bg-brass text-white text-xs font-body uppercase tracking-wider rounded">
                          Featured
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(listing)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
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

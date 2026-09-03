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
  listing_type?: 'sale' | 'rent';
  image_url?: string;
  images?: string[];
  featured: boolean;
  hidden: boolean;
  created_at: string;
  year_built?: number;
  energy_label?: string;
  garden?: boolean;
  garden_area?: number;
  parking?: boolean;
  parking_spaces?: number;
  balcony?: boolean;
  terrace?: boolean;
  furnished?: boolean;
  basement?: boolean;
  elevator?: boolean;
  floors?: number;
  source_url?: string;
}

export default function ListingsDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'visible' | 'hidden'>('all');
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
    listing_type: 'sale',
    image_url: '',
    images: [],
    featured: false,
    hidden: false,
    year_built: undefined,
    energy_label: '',
    garden: false,
    garden_area: undefined,
    parking: false,
    parking_spaces: undefined,
    balcony: false,
    terrace: false,
    furnished: false,
    basement: false,
    elevator: false,
    floors: undefined,
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings?includeHidden=true');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const response = await fetch('/api/listings/upload', {
      method: 'POST',
      body: form,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Upload failed');
    }
    const data = await response.json();
    return data.url;
  };

  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFeatured(true);
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: url }));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Featured image upload failed');
    } finally {
      setUploadingFeatured(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Gallery upload failed');
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const url = editingListing
        ? `/api/listings/${editingListing.id}`
        : '/api/listings';
      const method = editingListing ? 'PUT' : 'POST';

      // Ensure featured image is first in the gallery
      const payload = { ...formData };
      if (payload.image_url) {
        const gallery = payload.images || [];
        // Remove featured image if already in gallery, then prepend it
        const filtered = gallery.filter((url: string) => url !== payload.image_url);
        payload.images = [payload.image_url, ...filtered];
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
          listing_type: 'sale',
          image_url: '',
          images: [],
          featured: false,
          hidden: false,
        });
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data?.error || 'Failed to save listing');
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      setErrorMessage('Network error while saving listing');
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setFormData(listing);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    setErrorMessage('');

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchListings();
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data?.error || 'Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      setErrorMessage('Network error while deleting listing');
    }
  };

  const handleVisibilityToggle = async (listing: Listing) => {
    setErrorMessage('');

    try {
      const response = await fetch(`/api/listings/${listing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden: !listing.hidden }),
      });

      if (response.ok) {
        await fetchListings();
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data?.error || 'Failed to update listing visibility');
      }
    } catch (error) {
      console.error('Error updating listing visibility:', error);
      setErrorMessage('Network error while updating listing visibility');
    }
  };

  const filteredListings = listings.filter((listing) => {
    const matchesType = filterType === 'all' || listing.listing_type === filterType;
    const matchesVisibility =
      filterVisibility === 'all' ||
      (filterVisibility === 'hidden' ? listing.hidden : !listing.hidden);

    return matchesType && matchesVisibility;
  });

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
                  listing_type: 'sale',
                  image_url: '',
                  images: [],
                  featured: false,
                  hidden: false,
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-charcoal text-white px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
            >
              Add Listing
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

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
                    Listing Type
                  </label>
                  <select
                    value={formData.listing_type}
                    onChange={(e) => setFormData({ ...formData, listing_type: e.target.value as 'sale' | 'rent' })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Featured Image <span className="text-stone-400 font-normal">(shown on listing cards & first in gallery)</span>
                  </label>
                  {formData.image_url && (
                    <div className="mb-3 relative inline-block">
                      <img
                        src={formData.image_url}
                        alt="Featured preview"
                        className="w-48 h-32 object-cover rounded-lg border border-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                      >
                        x
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-stone-100 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors">
                      <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-stone-700">{uploadingFeatured ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFeaturedUpload}
                        disabled={uploadingFeatured}
                      />
                    </label>
                    <span className="text-sm text-stone-400">or paste URL:</span>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="flex-1 min-w-0 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Source URL (old website link)
                  </label>
                  <input
                    type="url"
                    value={formData.source_url || ''}
                    onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
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
                <div className="md:col-span-2 rounded-lg border border-stone-200 bg-white px-4 py-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="hidden"
                      checked={Boolean(formData.hidden)}
                      onChange={(e) => setFormData({ ...formData, hidden: e.target.checked })}
                      className="mt-0.5 h-5 w-5 rounded border-stone-300 text-brass focus:ring-brass"
                    />
                    <div>
                      <label htmlFor="hidden" className="text-sm font-medium text-stone-700">
                        Hide from website
                      </label>
                      <p className="mt-1 text-sm text-stone-500">
                        Keep this listing in the dashboard, but remove it from public property pages, featured sections, and direct public detail access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Luxury Property Features */}
              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-4">Luxury Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={formData.year_built || ''}
                      onChange={(e) => setFormData({ ...formData, year_built: parseInt(e.target.value) || undefined })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                      placeholder="e.g. 1890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Energy Label
                    </label>
                    <select
                      value={formData.energy_label || ''}
                      onChange={(e) => setFormData({ ...formData, energy_label: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="A++">A++</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Floors
                    </label>
                    <input
                      type="number"
                      value={formData.floors || ''}
                      onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) || undefined })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>
              </div>

              {/* Outdoor Features */}
              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-4">Outdoor Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="garden"
                      checked={formData.garden}
                      onChange={(e) => setFormData({ ...formData, garden: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="garden" className="ml-2 text-sm font-medium text-stone-700">
                      Garden
                    </label>
                  </div>
                  {formData.garden && (
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Garden Area (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.garden_area || ''}
                        onChange={(e) => setFormData({ ...formData, garden_area: parseInt(e.target.value) || undefined })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="balcony"
                      checked={formData.balcony}
                      onChange={(e) => setFormData({ ...formData, balcony: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="balcony" className="ml-2 text-sm font-medium text-stone-700">
                      Balcony
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terrace"
                      checked={formData.terrace}
                      onChange={(e) => setFormData({ ...formData, terrace: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="terrace" className="ml-2 text-sm font-medium text-stone-700">
                      Terrace
                    </label>
                  </div>
                </div>
              </div>

              {/* Parking & Building Features */}
              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-4">Parking & Building</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parking"
                      checked={formData.parking}
                      onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="parking" className="ml-2 text-sm font-medium text-stone-700">
                      Parking
                    </label>
                  </div>
                  {formData.parking && (
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Parking Spaces
                      </label>
                      <input
                        type="number"
                        value={formData.parking_spaces || ''}
                        onChange={(e) => setFormData({ ...formData, parking_spaces: parseInt(e.target.value) || undefined })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="elevator"
                      checked={formData.elevator}
                      onChange={(e) => setFormData({ ...formData, elevator: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="elevator" className="ml-2 text-sm font-medium text-stone-700">
                      Elevator
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="basement"
                      checked={formData.basement}
                      onChange={(e) => setFormData({ ...formData, basement: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="basement" className="ml-2 text-sm font-medium text-stone-700">
                      Basement
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="furnished"
                      checked={formData.furnished}
                      onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })}
                      className="w-5 h-5 text-brass border-stone-300 rounded focus:ring-brass"
                    />
                    <label htmlFor="furnished" className="ml-2 text-sm font-medium text-stone-700">
                      Furnished
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-4">Image Gallery</h3>
                <p className="text-sm text-stone-500 mb-4">
                  The featured image is automatically included as the first gallery image.
                  Upload additional images here. They will appear after the featured image.
                </p>

                {/* Thumbnail grid */}
                {(formData.images || []).length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
                    {(formData.images || []).map((url, i) => (
                      <div key={i} className="relative aspect-square group">
                        <img
                          src={url}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-stone-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-stone-100 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors shrink-0">
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm font-medium text-stone-700">{uploadingGallery ? 'Uploading...' : 'Add Images'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                    />
                  </label>
                  <span className="text-sm text-stone-400">or paste URLs:</span>
                  <input
                    type="text"
                    value={(formData.images || []).join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      images: e.target.value.split(',').map(url => url.trim()).filter(Boolean),
                    })}
                    className="flex-1 min-w-0 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent text-sm"
                    placeholder="https://..., https://..."
                  />
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
              <div className="flex gap-4 flex-wrap">
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
                {editingListing && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingListing.id)}
                    className="bg-red-50 text-red-600 border border-red-200 px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-red-100 transition-colors ml-auto"
                  >
                    Delete Listing
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-6">
          <div className="flex flex-wrap gap-2">
            {(['all', 'sale', 'rent'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 font-body text-sm uppercase tracking-wider transition-colors ${
                  filterType === type
                    ? 'bg-charcoal text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {type === 'all' ? 'All' : type === 'sale' ? 'For Sale' : 'For Rent'}
                <span className="ml-2 text-xs opacity-70">
                  ({type === 'all' ? listings.length : listings.filter(l => l.listing_type === type).length})
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'visible', 'hidden'] as const).map((visibility) => (
              <button
                key={visibility}
                onClick={() => setFilterVisibility(visibility)}
                className={`px-4 py-2 font-body text-sm uppercase tracking-wider transition-colors ${
                  filterVisibility === visibility
                    ? 'bg-earth text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {visibility === 'all' ? 'All Visibility' : visibility === 'visible' ? 'Visible' : 'Hidden'}
                <span className="ml-2 text-xs opacity-70">
                  ({visibility === 'all'
                    ? listings.length
                    : visibility === 'visible'
                      ? listings.filter((listing) => !listing.hidden).length
                      : listings.filter((listing) => listing.hidden).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-50 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading listings...</div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No listings yet</div>
          ) : filteredListings.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No listings match the current filters</div>
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
                    Property
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Public Visibility
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
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className={listing.hidden ? 'bg-stone-50/80 hover:bg-stone-100/80' : 'hover:bg-stone-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                      {listing.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {listing.price ? `€${listing.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 capitalize">
                      {listing.property_type || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          listing.listing_type === 'rent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {listing.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.hidden
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {listing.hidden ? 'Hidden' : 'Visible'}
                      </span>
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
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(listing)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleVisibilityToggle(listing)}
                          className={listing.hidden ? 'text-emerald-700 hover:text-emerald-900' : 'text-stone-600 hover:text-charcoal'}
                        >
                          {listing.hidden ? 'Show' : 'Hide'}
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

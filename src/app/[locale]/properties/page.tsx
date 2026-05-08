'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { usePathname } from 'next/navigation';

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

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700',
  'under-consideration': 'bg-amber-50 text-amber-700',
  sold: 'bg-stone-100 text-warm-gray',
  rented: 'bg-blue-50 text-blue-700',
};

export default function PropertiesPage() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const statusLabels: Record<string, string> = {
    available: t('properties.status.available'),
    'under-consideration': t('properties.status.underConsideration'),
    sold: t('properties.status.sold'),
    rented: t('properties.status.rented'),
  };

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

  const filteredProperties = listings.filter((property) => {
    const statusMatch = filter === 'all' || property.status === filter;
    let priceMatch = true;

    if (priceRange === 'under-600k') {
      priceMatch = property.price !== undefined && property.price < 600000;
    } else if (priceRange === '600k-700k') {
      priceMatch = property.price !== undefined && property.price >= 600000 && property.price < 700000;
    } else if (priceRange === '700k-plus') {
      priceMatch = property.price !== undefined && property.price >= 700000;
    }

    return statusMatch && priceMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam canals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            {t('properties.heroSubtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t('properties.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                  {t('properties.filters.status')}
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t('properties.filters.all')}</option>
                  <option value="available">{t('properties.filters.available')}</option>
                  <option value="under-consideration">{t('properties.filters.underConsideration')}</option>
                  <option value="sold">{t('properties.filters.sold')}</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                  {t('properties.filters.priceRange')}
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t('properties.filters.allPrices')}</option>
                  <option value="under-600k">{t('properties.filters.under600k')}</option>
                  <option value="600k-700k">{t('properties.filters.between600k700k')}</option>
                  <option value="700k-plus">{t('properties.filters.over700k')}</option>
                </select>
              </div>
            </div>
            <p className="text-warm-gray text-sm">
              {t('properties.filters.showing')}{' '}
              <span className="text-charcoal font-medium">
                {filteredProperties.length}
              </span>{' '}
              {filteredProperties.length === 1 ? t('properties.filters.property') : t('properties.filters.properties')}
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg">{t('properties.loading')}</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                    {property.image_url ? (
                      <img
                        src={property.image_url}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        {t('properties.noImage')}
                      </div>
                    )}
                    <span
                      className={`absolute top-4 left-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[property.status] || statusStyles.available}`}
                    >
                      {statusLabels[property.status] || property.status}
                    </span>
                    {property.featured && (
                      <span className="absolute top-4 right-4 text-2xl">⭐</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-charcoal mb-1">
                      {property.title}
                    </h3>
                    <p className="text-warm-gray text-sm mb-4">
                      {property.city || 'Amsterdam'}
                    </p>
                    <div className="flex justify-between items-end mb-4">
                      <span className="font-display text-2xl text-brass">
                        {property.price ? `€${property.price.toLocaleString()}` : t('properties.priceOnRequest')}
                      </span>
                      <span className="text-warm-gray text-sm">
                        {property.area ? `${property.area} m²` : ''} · {property.bedrooms ? `${property.bedrooms} bed` : ''}
                      </span>
                    </div>
                    {property.property_type && (
                      <div className="flex justify-between items-center text-sm text-warm-gray pt-4 border-t border-stone-100">
                        <span className="capitalize">{property.property_type}</span>
                        {property.bedrooms && property.bathrooms && (
                          <span>{property.bedrooms} bed · {property.bathrooms} bath</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg mb-6">
                {t('properties.noMatch')}
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setPriceRange('all');
                }}
                className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
              >
                {t('properties.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            {t('properties.ctaTitle')}
          </h2>
          <p className="text-stone-300 text-lg mb-10 leading-relaxed">
            {t('properties.ctaText')}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t('properties.ctaButton')}
          </a>
        </div>
      </section>
    </div>
  );
}

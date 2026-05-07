'use client';

import { useState } from 'react';

const properties = [
  {
    id: 1,
    title: 'Jacob Catskade 51 H',
    location: 'Amsterdam',
    price: 600000,
    size: 68,
    bedrooms: 3,
    status: 'available',
    energyLabel: 'A',
    pricePerSqm: 8824,
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Van Woustraat 22 1',
    location: 'Amsterdam',
    price: 745000,
    size: 103,
    bedrooms: 3,
    status: 'under-consideration',
    energyLabel: 'D',
    pricePerSqm: 7233,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Singel 204 C',
    location: 'Amsterdam',
    price: 625000,
    size: 73,
    bedrooms: 1,
    status: 'sold',
    energyLabel: 'A',
    pricePerSqm: 8562,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Prinsengracht 412',
    location: 'Amsterdam',
    price: 895000,
    size: 120,
    bedrooms: 4,
    status: 'available',
    energyLabel: 'B',
    pricePerSqm: 7458,
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Keizersgracht 78 II',
    location: 'Amsterdam',
    price: 550000,
    size: 55,
    bedrooms: 2,
    status: 'available',
    energyLabel: 'C',
    pricePerSqm: 10000,
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Herengracht 156',
    location: 'Amsterdam',
    price: 1200000,
    size: 165,
    bedrooms: 5,
    status: 'under-consideration',
    energyLabel: 'A',
    pricePerSqm: 7273,
    image:
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
  },
];

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700',
  'under-consideration': 'bg-amber-50 text-amber-700',
  sold: 'bg-stone-100 text-warm-gray',
};

const statusLabels: Record<string, string> = {
  available: 'Available',
  'under-consideration': 'Under Consideration',
  sold: 'Sold',
};

export default function PropertiesPage() {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProperties = properties.filter((property) => {
    const statusMatch = filter === 'all' || property.status === filter;
    let priceMatch = true;

    if (priceRange === 'under-600k') {
      priceMatch = property.price < 600000;
    } else if (priceRange === '600k-700k') {
      priceMatch = property.price >= 600000 && property.price < 700000;
    } else if (priceRange === '700k-plus') {
      priceMatch = property.price >= 700000;
    }

    return statusMatch && priceMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585892067320-3a3fbc8e9e9a?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            Our Portfolio
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            Premium properties in Amsterdam
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
                  Status
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">All Properties</option>
                  <option value="available">Available</option>
                  <option value="under-consideration">Under Consideration</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">All Prices</option>
                  <option value="under-600k">Under €600,000</option>
                  <option value="600k-700k">€600,000 – €700,000</option>
                  <option value="700k-plus">€700,000+</option>
                </select>
              </div>
            </div>
            <p className="text-warm-gray text-sm">
              Showing{' '}
              <span className="text-charcoal font-medium">
                {filteredProperties.length}
              </span>{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span
                      className={`absolute top-4 left-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[property.status]}`}
                    >
                      {statusLabels[property.status]}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-charcoal mb-1">
                      {property.title}
                    </h3>
                    <p className="text-warm-gray text-sm mb-4">
                      {property.location}
                    </p>
                    <div className="flex justify-between items-end mb-4">
                      <span className="font-display text-2xl text-brass">
                        €{property.price.toLocaleString()}
                      </span>
                      <span className="text-warm-gray text-sm">
                        {property.size} m² · {property.bedrooms} bed
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-warm-gray pt-4 border-t border-stone-100">
                      <span>€{property.pricePerSqm.toLocaleString()}/m²</span>
                      <span>
                        Label{' '}
                        <span className="font-medium text-charcoal">
                          {property.energyLabel}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg mb-6">
                No properties match your filters.
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setPriceRange('all');
                }}
                className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Interested in a property?
          </h2>
          <p className="text-stone-300 text-lg mb-10 leading-relaxed">
            Contact us to schedule a viewing or get more information about any of our listings.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

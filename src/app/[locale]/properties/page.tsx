'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

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
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const content = {
    en: {
      heroSubtitle: 'Portfolio',
      heroTitle: 'Exceptional Properties',
      heroDescription: 'A curated selection of Amsterdam\'s finest properties. For discreet inquiries about unlisted properties, please contact us directly.',
      filterAll: 'All Properties',
      filterAvailable: 'Available',
      filterUnderConsideration: 'Under Consideration',
      filterSold: 'Sold',
      filterRented: 'Rented',
      priceAll: 'All Prices',
      priceUnder500k: 'Under €500k',
      price500kTo1m: '€500k – €1M',
      price1mTo2m: '€1M – €2M',
      priceOver2m: '€2M+',
      priceOnRequest: 'Price on request',
      loading: 'Loading properties...',
      noImage: 'No image available',
      noMatch: 'No properties match your filters.',
      clearFilters: 'Clear All Filters',
      showing: 'Showing',
      property: 'property',
      properties: 'properties',
      ctaTitle: 'Seeking something unlisted?',
      ctaText: 'Many of our most exceptional properties never appear on public platforms. Contact us for a discreet conversation about off-market opportunities.',
      ctaButton: 'Private Inquiry',
      featured: 'Featured',
      status: {
        available: 'Available',
        underConsideration: 'Under Consideration',
        sold: 'Sold',
        rented: 'Rented'
      }
    },
    nl: {
      heroSubtitle: 'Portfolio',
      heroTitle: 'Uitzonderlijke Woningen',
      heroDescription: 'Een gecureerde selectie van Amsterdams mooiste woningen. Voor discrete vragen over niet-genoteerde woningen, neem direct contact met ons op.',
      filterAll: 'Alle Woningen',
      filterAvailable: 'Beschikbaar',
      filterUnderConsideration: 'In Onderhandeling',
      filterSold: 'Verkocht',
      filterRented: 'Verhuurd',
      priceAll: 'Alle Prijzen',
      priceUnder500k: 'Onder €500k',
      price500kTo1m: '€500k – €1M',
      price1mTo2m: '€1M – €2M',
      priceOver2m: '€2M+',
      priceOnRequest: 'Prijs op aanvraag',
      loading: 'Woningen laden...',
      noImage: 'Geen afbeelding beschikbaar',
      noMatch: 'Geen woningen komen overeen met uw filters.',
      clearFilters: 'Wis Alle Filters',
      showing: 'Toont',
      property: 'woning',
      properties: 'woningen',
      ctaTitle: 'Op zoek naar iets dat niet genoteerd staat?',
      ctaText: 'Veel van onze meest uitzonderlijke woningen verschijnen nooit op publieke platforms. Neem contact op voor een discreet gesprek over off-market mogelijkheden.',
      ctaButton: 'Privé Aanvraag',
      featured: 'Uitgelicht',
      status: {
        available: 'Beschikbaar',
        underConsideration: 'In Onderhandeling',
        sold: 'Verkocht',
        rented: 'Verhuurd'
      }
    },
    es: {
      heroSubtitle: 'Portfolio',
      heroTitle: 'Propiedades Excepcionales',
      heroDescription: 'Una selección curada de las mejores propiedades de Ámsterdam. Para consultas discretas sobre propiedades no listadas, contáctenos directamente.',
      filterAll: 'Todas las Propiedades',
      filterAvailable: 'Disponible',
      filterUnderConsideration: 'En Consideración',
      filterSold: 'Vendido',
      filterRented: 'Alquilado',
      priceAll: 'Todos los Precios',
      priceUnder500k: 'Menos de €500k',
      price500kTo1m: '€500k – €1M',
      price1mTo2m: '€1M – €2M',
      priceOver2m: '€2M+',
      priceOnRequest: 'Precio bajo consulta',
      loading: 'Cargando propiedades...',
      noImage: 'Sin imagen disponible',
      noMatch: 'Ninguna propiedad coincide con sus filtros.',
      clearFilters: 'Limpiar Todos los Filtros',
      showing: 'Mostrando',
      property: 'propiedad',
      properties: 'propiedades',
      ctaTitle: '¿Busca algo no listado?',
      ctaText: 'Muchas de nuestras propiedades más excepcionales nunca aparecen en plataformas públicas. Contáctenos para una conversación discreta sobre oportunidades fuera de mercado.',
      ctaButton: 'Consulta Privada',
      featured: 'Destacado',
      status: {
        available: 'Disponible',
        underConsideration: 'En Consideración',
        sold: 'Vendido',
        rented: 'Alquilado'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const statusLabels: Record<string, string> = {
    available: t.status.available,
    'under-consideration': t.status.underConsideration,
    sold: t.status.sold,
    rented: t.status.rented,
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

    if (priceRange === 'under-500k') {
      priceMatch = property.price !== undefined && property.price < 500000;
    } else if (priceRange === '500k-1m') {
      priceMatch = property.price !== undefined && property.price >= 500000 && property.price < 1000000;
    } else if (priceRange === '1m-2m') {
      priceMatch = property.price !== undefined && property.price >= 1000000 && property.price < 2000000;
    } else if (priceRange === '2m-plus') {
      priceMatch = property.price !== undefined && property.price >= 2000000;
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
            {t.heroSubtitle}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t.heroTitle}
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                  {t.filterAvailable}
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t.filterAll}</option>
                  <option value="available">{t.filterAvailable}</option>
                  <option value="under-consideration">{t.filterUnderConsideration}</option>
                  <option value="sold">{t.filterSold}</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                  {t.priceAll}
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-stone-50 border border-stone-200 text-ink font-body text-sm focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t.priceAll}</option>
                  <option value="under-500k">{t.priceUnder500k}</option>
                  <option value="500k-1m">{t.price500kTo1m}</option>
                  <option value="1m-2m">{t.price1mTo2m}</option>
                  <option value="2m-plus">{t.priceOver2m}</option>
                </select>
              </div>
            </div>
            <p className="text-warm-gray text-sm">
              {t.showing}{' '}
              <span className="text-charcoal font-medium">
                {filteredProperties.length}
              </span>{' '}
              {filteredProperties.length === 1 ? t.property : t.properties}
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/${locale}/properties/${property.id}`}
                  className="group bg-stone-50 border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500 block cursor-pointer"
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
                        {t.noImage}
                      </div>
                    )}
                    <span
                      className={`absolute top-4 left-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[property.status] || statusStyles.available}`}
                    >
                      {statusLabels[property.status] || property.status}
                    </span>
                    {property.featured && (
                      <span className="absolute top-4 right-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 bg-brass text-white">
                        {t.featured || 'Featured'}
                      </span>
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
                        {property.price ? `€${property.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}` : t.priceOnRequest}
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg mb-6">
                {t.noMatch}
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setPriceRange('all');
                }}
                className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-stone-300 text-lg mb-10 leading-relaxed">
            {t.ctaText}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>
    </div>
  );
}

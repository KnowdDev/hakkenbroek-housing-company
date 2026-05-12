'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

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
  created_at: string;
  // Luxury real estate fields
  year_built?: number;
  energy_label?: string;
  floors?: number;
  furnished?: boolean;
  garden?: boolean;
  garden_area?: number;
  balcony?: boolean;
  terrace?: boolean;
  parking?: boolean;
  parking_spaces?: number;
  elevator?: boolean;
  basement?: boolean;
}

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700',
  'under-consideration': 'bg-amber-50 text-amber-700',
  sold: 'bg-stone-100 text-warm-gray',
  rented: 'bg-blue-50 text-blue-700',
};

const listingTypeStyles: Record<string, string> = {
  sale: 'bg-emerald-100 text-emerald-800',
  rent: 'bg-blue-100 text-blue-800',
};

const listingTypeLabels: Record<string, Record<string, string>> = {
  en: { sale: 'For Sale', rent: 'For Rent' },
  nl: { sale: 'Te Koop', rent: 'Te Huur' },
  es: { sale: 'En Venta', rent: 'En Alquiler' },
};

const statusLabels: Record<string, Record<string, string>> = {
  en: {
    available: 'Available',
    'under-consideration': 'Under Consideration',
    sold: 'Sold',
    rented: 'Rented',
  },
  nl: {
    available: 'Beschikbaar',
    'under-consideration': 'In Onderhandeling',
    sold: 'Verkocht',
    rented: 'Verhuurd',
  },
  es: {
    available: 'Disponible',
    'under-consideration': 'En Consideracion',
    sold: 'Vendido',
    rented: 'Alquilado',
  },
};

export default function PropertyDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images = listing?.images && listing.images.length > 0 ? listing.images : [listing?.image_url || ''];

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, images.length]);

  const goNext = () => setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  const goPrev = () => setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  const t = statusLabels[locale as keyof typeof statusLabels] || statusLabels.en;

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${id}`);
      const data = await response.json();
      if (response.ok) {
        setListing(data);
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, property_id: id }),
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const backText = locale === 'nl' ? 'Terug naar woningen' : locale === 'es' ? 'Volver a propiedades' : 'Back to properties';
  const interestedText = locale === 'nl' ? 'Geinteresseerd in deze woning?' : locale === 'es' ? 'Interesado en esta propiedad?' : 'Interested in this property?';
  const contactText = locale === 'nl' ? 'Neem contact op om een bezichtiging te plannen of meer informatie te ontvangen.' : locale === 'es' ? 'Contactenos para programar una visita o obtener mas informacion.' : 'Contact us to schedule a viewing or get more information.';
  const contactBtn = locale === 'nl' ? 'Neem contact op' : locale === 'es' ? 'Contactar' : 'Contact Us';
  const bedsText = locale === 'nl' ? 'slaapkamers' : locale === 'es' ? 'dormitorios' : 'bedrooms';
  const bathsText = locale === 'nl' ? 'badkamers' : locale === 'es' ? 'banos' : 'bathrooms';
  const areaText = locale === 'nl' ? 'm²' : locale === 'es' ? 'm²' : 'm²';
  const priceOnRequest = locale === 'nl' ? 'Prijs op aanvraag' : locale === 'es' ? 'Precio bajo consulta' : 'Price on request';
  const featuredText = locale === 'nl' ? 'Uitgelicht' : locale === 'es' ? 'Destacado' : 'Featured';

  const featureLabels = {
    en: {
      yearBuilt: 'Year Built',
      energyLabel: 'Energy Label',
      floors: 'Floors',
      furnished: 'Furnished',
      garden: 'Garden',
      gardenArea: 'Garden Area',
      balcony: 'Balcony',
      terrace: 'Terrace',
      parking: 'Parking',
      parkingSpaces: 'Parking Spaces',
      elevator: 'Elevator',
      basement: 'Basement',
      yes: 'Yes',
      no: 'No',
      buildingSpecs: 'Building & Specifications',
      outdoorFeatures: 'Outdoor Features',
      parkingAmenities: 'Parking & Amenities',
      sqm: 'm²',
    },
    nl: {
      yearBuilt: 'Bouwjaar',
      energyLabel: 'Energielabel',
      floors: 'Verdiepingen',
      furnished: 'Gemeubileerd',
      garden: 'Tuin',
      gardenArea: 'Tuinoppervlak',
      balcony: 'Balkon',
      terrace: 'Terras',
      parking: 'Parkeerplaats',
      parkingSpaces: 'Parkeerplaatsen',
      elevator: 'Lift',
      basement: 'Kelder',
      yes: 'Ja',
      no: 'Nee',
      buildingSpecs: 'Bouw & Specificaties',
      outdoorFeatures: 'Buitenruimte',
      parkingAmenities: 'Parkeerplaats & Voorzieningen',
      sqm: 'm²',
    },
    es: {
      yearBuilt: 'Año de Construcción',
      energyLabel: 'Etiqueta Energética',
      floors: 'Plantas',
      furnished: 'Amueblado',
      garden: 'Jardín',
      gardenArea: 'Superficie Jardín',
      balcony: 'Balcón',
      terrace: 'Terraza',
      parking: 'Aparcamiento',
      parkingSpaces: 'Plazas Aparcamiento',
      elevator: 'Ascensor',
      basement: 'Sótano',
      yes: 'Sí',
      no: 'No',
      buildingSpecs: 'Construcción y Especificaciones',
      outdoorFeatures: 'Exterior',
      parkingAmenities: 'Aparcamiento y Comodidades',
      sqm: 'm²',
    },
  };
  const f = featureLabels[locale as keyof typeof featureLabels] || featureLabels.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src="/logo.svg"
            alt="Hakkenbroek Housing"
            className="h-16 w-auto opacity-40 animate-pulse"
          />
          <div className="mt-8 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block w-2 h-2 rounded-full bg-brass animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-6 text-warm-gray text-sm font-body uppercase tracking-widest">
          {locale === 'nl' ? 'Woning laden...' : locale === 'es' ? 'Cargando propiedad...' : 'Loading property...'}
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-warm-gray text-lg mb-6">Property not found.</p>
          <Link href={`/${locale}/properties`} className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300">
            {backText}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      {/* Breadcrumb */}
      <div className="bg-stone-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/${locale}/properties`} 
            className='inline-flex items-center gap-3 text-charcoal hover:text-brass transition-colors duration-300 font-body text-sm uppercase tracking-[0.15em] group'
          >
            <span className='transform group-hover:-translate-x-1 transition-transform duration-300'>←</span>
            <span className='border-b border-charcoal/30 group-hover:border-brass transition-colors duration-300 pb-0.5'>{backText}</span>
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main image + preview grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Main image */}
            <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-stone-200 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
              {images && images[activeImage] ? (
                <img
                  src={images[activeImage]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 font-body uppercase tracking-wider text-sm">
                  No image available
                </div>
              )}

              {/* Hover arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm text-charcoal hover:bg-brass hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm text-charcoal hover:bg-brass hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 font-body text-xs uppercase tracking-wider text-charcoal">
                {activeImage + 1} / {images.length}
              </div>

              {/* Expand button */}
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 flex items-center justify-center text-charcoal hover:bg-brass hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="View fullscreen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
              </button>
            </div>

            {/* Desktop preview grid (2x2) */}
            <div className="hidden lg:grid lg:col-span-4 grid-cols-2 grid-rows-2 gap-3">
              {images.slice(1, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i + 1)}
                  className="relative overflow-hidden bg-stone-200 group"
                >
                  <img src={img} alt={`${listing.title} - ${i + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              ))}
              {images.length > 4 && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="relative overflow-hidden bg-stone-200 group"
                >
                  <img src={images[4]} alt={`${listing.title} - 5`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-charcoal/50 flex flex-col items-center justify-center text-white transition-colors duration-300 group-hover:bg-charcoal/60">
                    <span className="font-display text-2xl">+{images.length - 4}</span>
                    <span className="font-body text-xs uppercase tracking-wider mt-1">View all</span>
                  </div>
                </button>
              )}
              {images.length <= 4 && images[3] && (
                <button
                  onClick={() => setActiveImage(3)}
                  className="relative overflow-hidden bg-stone-200 group"
                >
                  <img src={images[3]} alt={`${listing.title} - 4`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i
                      ? 'border-brass opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex flex-col"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-body text-xs uppercase tracking-wider text-stone-300">
              {activeImage + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white hover:text-brass transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-12 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={goPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm text-white hover:bg-brass transition-all duration-300"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <img
              src={images[activeImage]}
              alt={listing.title}
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={goNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm text-white hover:bg-brass transition-all duration-300"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          {/* Bottom thumbnail strip */}
          <div className="px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-11 overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i
                      ? 'border-brass opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[listing.status] || statusStyles.available}`}>
                      {t[listing.status] || listing.status}
                    </span>
                    {listing.listing_type && (
                      <span className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${listingTypeStyles[listing.listing_type] || ''}`}>
                        {(listingTypeLabels[locale] || listingTypeLabels.en)[listing.listing_type]}
                      </span>
                    )}
                    {listing.featured && (
                      <span className="text-xs font-body uppercase tracking-wider px-3 py-1.5 bg-brass text-white">
                        {featuredText}
                      </span>
                    )}
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-2">{listing.title}</h1>
                  <p className="text-warm-gray text-lg">{listing.address}, {listing.city} {listing.postal_code}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-display text-3xl text-brass">
                    {listing.price ? `€${listing.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}` : priceOnRequest}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-stone-200 mb-8">
                <div>
                  <p className="text-2xl font-display text-charcoal">{listing.bedrooms || '-'}</p>
                  <p className="text-sm text-warm-gray font-body uppercase tracking-wider">{bedsText}</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-charcoal">{listing.bathrooms || '-'}</p>
                  <p className="text-sm text-warm-gray font-body uppercase tracking-wider">{bathsText}</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-charcoal">{listing.area || '-'}</p>
                  <p className="text-sm text-warm-gray font-body uppercase tracking-wider">{areaText}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-display text-2xl text-charcoal mb-4">
                  {locale === 'nl' ? 'Beschrijving' : locale === 'es' ? 'Descripcion' : 'Description'}
                </h2>
                <p className="text-stone-600 leading-relaxed text-lg">{listing.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="font-display text-2xl text-charcoal mb-4">
                  {locale === 'nl' ? 'Details' : locale === 'es' ? 'Detalles' : 'Details'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="py-3 border-b border-stone-100 flex justify-between">
                    <span className="text-warm-gray">{locale === 'nl' ? 'Type' : locale === 'es' ? 'Tipo' : 'Type'}</span>
                    <span className="text-charcoal capitalize">{listing.property_type}</span>
                  </div>
                  <div className="py-3 border-b border-stone-100 flex justify-between">
                    <span className="text-warm-gray">{locale === 'nl' ? 'Aanbod' : locale === 'es' ? 'Oferta' : 'Listing'}</span>
                    <span className="text-charcoal">{(listingTypeLabels[locale] || listingTypeLabels.en)[listing.listing_type || 'sale']}</span>
                  </div>
                  <div className="py-3 border-b border-stone-100 flex justify-between">
                    <span className="text-warm-gray">{locale === 'nl' ? 'Stad' : locale === 'es' ? 'Ciudad' : 'City'}</span>
                    <span className="text-charcoal">{listing.city}</span>
                  </div>
                  <div className="py-3 border-b border-stone-100 flex justify-between">
                    <span className="text-warm-gray">{locale === 'nl' ? 'Postcode' : locale === 'es' ? 'Codigo postal' : 'Postal Code'}</span>
                    <span className="text-charcoal">{listing.postal_code}</span>
                  </div>
                  <div className="py-3 border-b border-stone-100 flex justify-between">
                    <span className="text-warm-gray">{locale === 'nl' ? 'Adres' : locale === 'es' ? 'Direccion' : 'Address'}</span>
                    <span className="text-charcoal">{listing.address}</span>
                  </div>
                </div>
              </div>

              {/* Building & Specifications */}
              {(listing.year_built || listing.energy_label || listing.floors || listing.furnished !== undefined) && (
                <div className="mb-8">
                  <h2 className="font-display text-2xl text-charcoal mb-4">{f.buildingSpecs}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {listing.year_built !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.yearBuilt}</span>
                        <span className="text-charcoal">{listing.year_built}</span>
                      </div>
                    )}
                    {listing.energy_label && (
                      <div className="py-3 border-b border-stone-100 flex justify-between items-center">
                        <span className="text-warm-gray">{f.energyLabel}</span>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-brass text-white text-sm font-body font-medium">
                          {listing.energy_label}
                        </span>
                      </div>
                    )}
                    {listing.floors !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.floors}</span>
                        <span className="text-charcoal">{listing.floors}</span>
                      </div>
                    )}
                    {listing.furnished !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.furnished}</span>
                        <span className="text-charcoal">{listing.furnished ? f.yes : f.no}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Outdoor Features */}
              {(listing.garden || listing.balcony || listing.terrace || listing.garden_area !== undefined) && (
                <div className="mb-8">
                  <h2 className="font-display text-2xl text-charcoal mb-4">{f.outdoorFeatures}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {listing.garden !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.garden}</span>
                        <span className="text-charcoal">{listing.garden ? f.yes : f.no}</span>
                      </div>
                    )}
                    {listing.garden && listing.garden_area !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.gardenArea}</span>
                        <span className="text-charcoal">{listing.garden_area} {f.sqm}</span>
                      </div>
                    )}
                    {listing.balcony !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.balcony}</span>
                        <span className="text-charcoal">{listing.balcony ? f.yes : f.no}</span>
                      </div>
                    )}
                    {listing.terrace !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.terrace}</span>
                        <span className="text-charcoal">{listing.terrace ? f.yes : f.no}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Parking & Amenities */}
              {(listing.parking || listing.elevator || listing.basement || listing.parking_spaces !== undefined) && (
                <div className="mb-8">
                  <h2 className="font-display text-2xl text-charcoal mb-4">{f.parkingAmenities}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {listing.parking !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.parking}</span>
                        <span className="text-charcoal">{listing.parking ? f.yes : f.no}</span>
                      </div>
                    )}
                    {listing.parking && listing.parking_spaces !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.parkingSpaces}</span>
                        <span className="text-charcoal">{listing.parking_spaces}</span>
                      </div>
                    )}
                    {listing.elevator !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.elevator}</span>
                        <span className="text-charcoal">{listing.elevator ? f.yes : f.no}</span>
                      </div>
                    )}
                    {listing.basement !== undefined && (
                      <div className="py-3 border-b border-stone-100 flex justify-between">
                        <span className="text-warm-gray">{f.basement}</span>
                        <span className="text-charcoal">{listing.basement ? f.yes : f.no}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 border border-stone-200 p-8 sticky top-24">
                <div className="mb-6">
                  <p className="font-display text-3xl text-brass mb-2">
                    {listing.price ? `€${listing.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}` : priceOnRequest}
                  </p>
                  <p className="text-sm text-warm-gray">
                    {listing.price
                      ? listing.listing_type === 'rent'
                        ? (locale === 'nl' ? 'Huurprijs per maand' : locale === 'es' ? 'Precio de alquiler mensual' : 'Monthly Rent')
                        : (locale === 'nl' ? 'Vraagprijs' : locale === 'es' ? 'Precio de venta' : 'Asking Price')
                      : ''}
                  </p>
                </div>

                {!showContactForm ? (
                  <div>
                    <h3 className="font-display text-xl text-charcoal mb-3">{interestedText}</h3>
                    <p className="text-stone-600 text-sm mb-6 leading-relaxed">{contactText}</p>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-charcoal text-white px-6 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
                    >
                      {contactBtn}
                    </button>
                  </div>
                ) : formSubmitted ? (
                  <div className="text-center py-8">
                    <p className="font-display text-xl text-charcoal mb-2">
                      {locale === 'nl' ? 'Bericht verzonden!' : locale === 'es' ? 'Mensaje enviado!' : 'Message sent!'}
                    </p>
                    <p className="text-stone-600 text-sm">
                      {locale === 'nl' ? 'We nemen zo snel mogelijk contact met u op.' : locale === 'es' ? 'Nos pondremos en contacto con usted pronto.' : 'We will get back to you shortly.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-display text-xl text-charcoal mb-2">{contactBtn}</h3>
                    <input
                      type="text"
                      required
                      placeholder={locale === 'nl' ? 'Naam' : locale === 'es' ? 'Nombre' : 'Name'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-brass transition-colors"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-brass transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder={locale === 'nl' ? 'Telefoon' : locale === 'es' ? 'Telefono' : 'Phone'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-brass transition-colors"
                    />
                    <textarea
                      rows={3}
                      placeholder={locale === 'nl' ? 'Bericht' : locale === 'es' ? 'Mensaje' : 'Message'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-brass transition-colors"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-charcoal text-white px-4 py-3 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
                      >
                        {locale === 'nl' ? 'Versturen' : locale === 'es' ? 'Enviar' : 'Send'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="px-4 py-3 font-body text-sm uppercase tracking-wider text-warm-gray hover:text-charcoal transition-colors"
                      >
                        {locale === 'nl' ? 'Annuleren' : locale === 'es' ? 'Cancelar' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

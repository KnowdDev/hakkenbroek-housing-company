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
  image_url?: string;
  images?: string[];
  featured: boolean;
  created_at: string;
}

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700',
  'under-consideration': 'bg-amber-50 text-amber-700',
  sold: 'bg-stone-100 text-warm-gray',
  rented: 'bg-blue-50 text-blue-700',
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

  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.image_url];

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="aspect-[16/10] overflow-hidden bg-stone-200">
                {images && images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    No image available
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
              {images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-24 h-24 lg:w-full lg:h-auto lg:aspect-[4/3] overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-brass' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${listing.title} - ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                    {listing.price ? `€${listing.price.toLocaleString('en-US', { maximumFractionDigits: 0, useGrouping: true })}` : priceOnRequest}
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
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 border border-stone-200 p-8 sticky top-24">
                <div className="mb-6">
                  <p className="font-display text-3xl text-brass mb-2">
                    {listing.price ? `€${listing.price.toLocaleString('en-US', { maximumFractionDigits: 0, useGrouping: true })}` : priceOnRequest}
                  </p>
                  <p className="text-sm text-warm-gray">
                    {listing.price ? (locale === 'nl' ? 'Vraagprijs' : locale === 'es' ? 'Precio de venta' : 'Asking Price') : ''}
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

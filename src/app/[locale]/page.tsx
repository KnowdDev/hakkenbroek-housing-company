'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { demoListings } from '@/lib/listings-data';

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
};

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [featuredProperties, setFeaturedProperties] = useState(
    demoListings.filter((p) => p.featured).slice(0, 3)
  );

  const content = {
    en: {
      heroSubtitle: 'Amsterdam, Gooi and Vecht · Since 2000',
      heroTitle: 'A home that actually fits',
      heroDescription: 'We\'ve been helping people find great homes in Amsterdam, Gooi and Vecht since 2000. Nice apartments, canal houses, family places — the kind of properties you actually want to live in. We know the city inside out and we\'re honest about what\'s worth your money.',
      viewProperties: 'View Portfolio',
      getInTouch: 'Get in Touch',
      servicesSubtitle: 'Our Expertise',
      servicesTitle: 'Buying and selling done properly',
      services: [
        { title: 'Buying', desc: 'We help buyers find the right place without the stress. From canal houses to family apartments, we show you properties that match your life — not just your budget — and we negotiate fairly.', slug: 'buying' },
        { title: 'Selling', desc: 'We sell your home properly. Good photos, honest pricing, and access to serious buyers who are actually looking. No inflated promises — just solid marketing that works.', slug: 'selling' },
        { title: 'Renting', desc: 'Rental properties that are actually nice to live in. We check every place for location, light, and whether we\'d be happy living there ourselves.', slug: 'renting' },
        { title: 'Leasing', desc: 'We manage your rental property properly. Good tenants, rent collected on time, and all the legal stuff handled — so you don\'t have to worry about it.', slug: 'leasing' },
        { title: 'Property Management', desc: 'Full management for landlords and investors. Maintenance, finances, tenant relations — we treat your property like it\'s our own because we know how much it matters to you.', slug: 'property-management' },
        { title: 'Expat Services', desc: 'Moving to Amsterdam from abroad? We\'ve helped hundreds of people settle in. We know the neighbourhoods, the paperwork, and where to get good coffee — we\'ll make sure you feel at home.', slug: 'expat-services' }
      ],
      heritageSubtitle: 'Over Twenty Years in Amsterdam, Gooi and Vecht',
      heritageTitle: 'We know property in Amsterdam, Gooi and Vecht because we\'ve been doing it for twenty years',
      heritageDescription: 'Since 2000, we\'ve been helping people buy, sell, and rent homes in Amsterdam, Gooi and Vecht. We don\'t chase quick deals — we focus on getting it right. That means honest advice, fair pricing, and actually listening to what you need. Our office on Leliegracht has been the starting point for hundreds of people finding their place in this city.',
      yearsExperience: 'Years of Experience',
      clientRating: 'Client Satisfaction',
      readStory: 'Discover Our Story',
      featuredSubtitle: 'Portfolio',
      featuredTitle: 'Properties We Like',
      viewAllProperties: 'View Full Portfolio',
      whySubtitle: 'The Hakkenbroek Difference',
      whyTitle: 'Why people come back to us',
      whyDescription: 'There are faster ways to sell property and cheaper agents to use. But we think buying or selling a home deserves more than a quick transaction. We take time to understand what you actually need, and we stick with you until it\'s sorted.',
      why: [
        { title: 'Access to More Properties', desc: 'Twenty years in Amsterdam means we know people. Many of the best properties change hands privately before they ever hit the public listings — and we can get you in the door.' },
        { title: 'International Reach', desc: 'We speak English and Dutch, and we\'ve worked with buyers and sellers from all over the world. Amsterdam is an international city — your agent should be too.' },
        { title: 'Historic Property Expertise', desc: 'Amsterdam\'s old buildings are beautiful but complicated. We know the rules around listed properties, canal house maintenance, and what to look out for when buying something with history.' },
      ],
      ctaTitle: 'Let\'s talk about your next move',
      ctaDescription: 'Buying, selling, or just curious about the market? Come by our office on Leliegracht for a coffee and a chat. No pressure, no obligation — just honest advice from people who know Amsterdam property properly.',
      startConversation: 'Come Say Hello'
    },
    nl: {
      heroSubtitle: 'Amsterdam, Gooi en Vecht · Sinds 2000',
      heroTitle: 'Een huis dat echt bij u past',
      heroDescription: 'We helpen mensen sinds 2000 aan een fijn huis in Amsterdam, Gooi en Vecht. Mooie appartementen, grachtenpanden, gezinswoningen — het soort woningen waar u echt wilt wonen. We kennen de stad door en door en zijn eerlijk over wat uw geld waard is.',
      viewProperties: 'Bekijk Portfolio',
      getInTouch: 'Neem Contact Op',
      servicesSubtitle: 'Onze Expertise',
      servicesTitle: 'Kopen en verkopen, maar dan goed',
      services: [
        { title: 'Kopen', desc: 'We helpen kopers de juiste woning te vinden zonder gedoe. Van grachtenpanden tot gezinsappartementen — we laten u woningen zien die bij uw leven passen, niet alleen uw budget, en we onderhandelen eerlijk.', slug: 'buying' },
        { title: 'Verkopen', desc: 'We verkopen uw huis goed. Mooie foto\'s, eerlijke prijzen, en toegang tot serieuze kopers die écht zoeken. Geen loze beloften — gewoon marketing die werkt.', slug: 'selling' },
        { title: 'Huren', desc: 'Huurwoningen waar u echt fijn kunt wonen. We bekijken elke woning op locatie, licht, en of we er zelf zouden willen wonen.', slug: 'renting' },
        { title: 'Verhuur', desc: 'We beheren uw huurwoning goed. Goede huurders, huur op tijd geïnd, en alle juridische zaken geregeld — zodat u zich geen zorgen hoeft te maken.', slug: 'leasing' },
        { title: 'Vastgoedbeheer', desc: 'Volledig beheer voor verhuurders en investeerders. Onderhoud, financiën, contact met huurders — we behandelen uw woning alsof het onze eigen is, omdat we weten hoeveel het u betekent.', slug: 'property-management' },
        { title: 'Expat Diensten', desc: 'Verhuist u vanuit het buitenland naar Amsterdam? We hebben honderden mensen geholpen hier te settelen. We kennen de buurten, de papierwinkel, en waar u goede koffie kunt krijgen — we zorgen dat u zich thuis voelt.', slug: 'expat-services' }
      ],
      heritageSubtitle: 'Meer Dan Twintig Jaar in Amsterdam, Gooi en Vecht',
      heritageTitle: 'We kennen Amsterdam, Gooi en Vecht omdat we het hier al twintig jaar doen',
      heritageDescription: 'Sinds 2000 helpen we mensen met kopen, verkopen en huren in Amsterdam, Gooi en Vecht. We jagen geen snelle deals na — we willen het gewoon goed doen. Dat betekent eerlijk advies, eerlijke prijzen, en echt luisteren naar wat u nodig hebt. Ons kantoor aan de Leliegracht is het startpunt geweest voor honderden mensen die hun plek in deze stad vonden.',
      yearsExperience: 'Jaren Ervaring',
      clientRating: 'Cliënttevredenheid',
      readStory: 'Ontdek Ons Verhaal',
      featuredSubtitle: 'Portfolio',
      featuredTitle: 'Woningen Die We Mooi Vinden',
      viewAllProperties: 'Bekijk Volledig Portfolio',
      whySubtitle: 'Het Hakkenbroek Verschil',
      whyTitle: 'Waarom mensen bij ons terugkomen',
      whyDescription: 'Er zijn snellere manieren om vastgoed te verkopen en goedkopere makelaars te vinden. Maar we denken dat een huis kopen of verkopen meer verdient dan een snelle transactie. We nemen de tijd om te begrijpen wat u écht nodig hebt, en we blijven erbij tot het geregeld is.',
      why: [
        { title: 'Toegang Tot Meer Woningen', desc: 'Twintig jaar in Amsterdam betekent dat we mensen kennen. Veel van de beste woningen wisselen van eigenaar voordat ze ooit op Funda staan — en wij kunnen u daarbinnen krijgen.' },
        { title: 'Internationaal Bereik', desc: 'We spreken Nederlands en Engels, en hebben met kopers en verkopers uit de hele wereld gewerkt. Amsterdam is een internationale stad — uw makelaar zou dat ook moeten zijn.' },
        { title: 'Expertise in Oude Panden', desc: 'De oude gebouwen van Amsterdam zijn prachtig maar ingewikkeld. We kennen de regels rond monumenten, grachtenpandonderhoud, en waar u op moet letten als u iets met historie koopt.' },
      ],
      ctaTitle: 'Laten we praten over uw volgende stap',
      ctaDescription: 'Kopen, verkopen, of gewoon benieuwd naar de markt? Kom langs bij ons kantoor aan de Leliegracht voor een kop koffie en een praatje. Geen druk, geen verplichting — gewoon eerlijk advies van mensen die Amsterdam vastgoed echt kennen.',
      startConversation: 'Kom Eens Langs'
    },
  };

  const t = content[locale as keyof typeof content] || content.en;
  const statusLabelsLocale = statusLabels[locale as keyof typeof statusLabels] || statusLabels.en;

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        if (!response.ok || !Array.isArray(data)) return;

        const featured = data
          .filter((property: typeof demoListings[number]) => property.featured)
          .slice(0, 3);

        if (featured.length > 0) {
          setFeaturedProperties(featured);
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section — Split-layout editorial (Broersma-inspired) */}
      <section className="flex flex-col lg:flex-row pt-24 h-auto lg:h-[calc(100vh-6rem)] lg:min-h-[600px] overflow-hidden">
        {/* Left: Editorial imagery — no text overlay */}
        <div className="relative w-full lg:w-[58%] h-[55vh] lg:h-full">
          <img
            src="/hero.jpg"
            alt="Luxury Amsterdam interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Editorial content on warm stone */}
        <div className="w-full lg:w-[42%] bg-stone-50 flex items-center">
          <div className="px-8 py-16 lg:px-16 lg:py-12 max-w-xl">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-8">
              {t.heroSubtitle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-charcoal mb-8">
              {t.heroTitle}
            </h1>
            <p className="font-body text-base lg:text-lg text-warm-gray leading-relaxed mb-10">
              {t.heroDescription}
            </p>
            <Link
              href={`/${locale}/properties`}
              className="inline-block bg-brass text-white px-10 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
            >
              {t.viewProperties}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview — Editorial grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
              {t.servicesSubtitle}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {t.servicesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.services.map((service) => (
              <Link
                key={service.title}
                href={`/${locale}/services/${service.slug}`}
                className="group border-t border-stone-200 pt-8 hover:border-brass transition-colors duration-500 block"
              >
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-brass transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage / Trust Section — Split layout with image */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Elegant Amsterdam interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                {t.heritageSubtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8 leading-snug">
                {t.heritageTitle}
              </h2>
              <p className="text-warm-gray leading-relaxed mb-8">
                {t.heritageDescription}
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="font-display text-4xl text-brass mb-1">20+</p>
                  <p className="font-body text-sm text-warm-gray uppercase tracking-wide">{t.yearsExperience}</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-brass mb-1">8.0</p>
                  <p className="font-body text-sm text-warm-gray uppercase tracking-wide">{t.clientRating}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/about`}
                className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
              >
                {t.readStory}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                {t.featuredSubtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">
                {t.featuredTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}/properties`}
              className="mt-6 md:mt-0 inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
            >
              {t.viewAllProperties}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/${locale}/properties/${property.id}`}
                className="group bg-stone-50 border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500 block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[property.status] || statusStyles.available}`}
                    >
                      {statusLabelsLocale[property.status] || property.status}
                    </span>
                    {property.listing_type && (
                      <span
                        className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${listingTypeStyles[property.listing_type] || ''}`}
                      >
                        {(listingTypeLabels[locale] || listingTypeLabels.en)[property.listing_type]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-1">
                    {property.title}
                  </h3>
                  <p className="text-warm-gray text-sm mb-4">{property.address}, {property.city}</p>
                  <div className="flex justify-between items-end">
                    <span className="font-display text-2xl text-brass">
                      {property.price ? `€${property.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}` : 'Price on request'}
                    </span>
                    <span className="text-warm-gray text-sm">
                      {property.area} m² · {property.bedrooms} bed
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — Minimal list */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
                {t.whySubtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-8 leading-snug">
                {t.whyTitle}
              </h2>
              <p className="text-stone-300 leading-relaxed">
                {t.whyDescription}
              </p>
            </div>
            <div className="space-y-10">
              {t.why.map((item) => (
                <div key={item.title} className="border-l border-stone-600 pl-6">
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t.ctaDescription}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t.startConversation}
          </Link>
        </div>
      </section>
    </div>
  );
}

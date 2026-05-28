'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';

export default function ServicesPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Our Expertise',
      heroTitle: 'Buying and selling at the highest level',
      intro: 'We offer a complete range of real estate services — with buying and selling at the core of everything we do. Whether you are acquiring a canal house, selling a family estate, or seeking investment property, our team brings 25+ years of Amsterdam market intelligence to your side of the table.',
      buying: {
        title: 'Buying',
        description: 'We represent buyers with discretion, precision, and access that no portal can offer. From initial consultation to key transfer, we source properties — many off-market — and negotiate terms that reflect true market value.',
        features: ['Off-market property sourcing', 'Comprehensive market analysis', 'Strategic negotiation', 'Legal and notarial coordination', 'Post-purchase concierge']
      },
      selling: {
        title: 'Selling',
        description: 'We position your property for the market it deserves. Bespoke marketing strategy, professional staging consultation, private viewings for qualified buyers, and access to our international network of high-net-worth individuals.',
        features: ['Complimentary valuation', 'Bespoke marketing strategy', 'Professional photography and film', 'Private viewings for qualified buyers', 'International buyer network']
      },
      renting: {
        title: 'Renting',
        description: 'Curated rental properties for expats and locals who expect more. Every listing in our portfolio meets our standards for location, light, and character.',
        features: ['Curated rental portfolio', 'Expat rental specialists', 'Lease negotiation', 'Move-in coordination']
      },
      leasing: {
        title: 'Leasing',
        description: 'Long-term lease management for landlords who value peace of mind. We handle tenant selection, rent collection, and full legal compliance.',
        features: ['Tenant selection and screening', 'Rent collection and administration', 'Property maintenance coordination', 'Legal and regulatory compliance']
      },
      management: {
        title: 'Property Management',
        description: 'Comprehensive management for investors and absentee owners. From maintenance to financial reporting, we protect your asset as if it were our own.',
        features: ['Scheduled property inspections', 'Financial reporting and budgeting', 'Emergency response coordination', 'Tax and insurance administration', 'Vendor and contractor management', '24/7 owner support']
      },
      cta: 'Ready to begin?',
      ctaDesc: 'Contact us for a confidential conversation about your property ambitions. We are here to listen, advise, and deliver.',
      contactBtn: 'Arrange a Consultation'
    },
    nl: {
      heroSubtitle: 'Onze Expertise',
      heroTitle: 'Kopen en verkopen op het hoogste niveau',
      intro: 'Wij bieden een compleet scala aan vastgoeddiensten — met kopen en verkopen als kern van alles wat wij doen. Of u nu een grachtenpand verwerft, een familiebezit verkoopt, of op zoek bent naar investeringsvastgoed, ons team brengt 25+ jaar Amsterdamse marktkennis aan uw zijde.',
      buying: {
        title: 'Kopen',
        description: 'Wij vertegenwoordigen kopers met discretie, precisie, en toegang die geen enkel portaal kan bieden. Van eerste consult tot sleuteloverdracht — wij vinden woningen, vaak off-market, en onderhandelen voorwaarden die de werkelijke marktwaarde weerspiegelen.',
        features: ['Off-market woningzoektocht', 'Uitgebreide marktanalyse', 'Strategische onderhandeling', 'Juridische en notariële coördinatie', 'Conciërge na aankoop']
      },
      selling: {
        title: 'Verkopen',
        description: 'Wij positioneren uw woning voor de markt die het verdient. Maatwerk marketingstrategie, professioneel stylingadvies, privébezichtigingen voor gekwalificeerde kopers, en toegang tot ons internationale netwerk.',
        features: ['Vrijblijvende waardering', 'Maatwerk marketingstrategie', 'Professionele fotografie en film', 'Privébezichtigingen voor gekwalificeerde kopers', 'Internationaal kopersnetwerk']
      },
      renting: {
        title: 'Huren',
        description: 'Gecureerde huurwoningen voor expats en locals die meer verwachten. Elke woning in ons portfolio voldoet aan onze normen voor locatie, licht en karakter.',
        features: ['Gecureerd huurportfolio', 'Expat huurspecialisten', 'Huurcontract onderhandeling', 'Verhuiscoördinatie']
      },
      leasing: {
        title: 'Verhuur',
        description: 'Lange-termijn verhuurbeheer voor verhuurders die gemoedsrust waarderen. Wij verzorgen huurdersselectie, incasso, en volledige juridische naleving.',
        features: ['Huurdersselectie en screening', 'Huurincasso en administratie', 'Coördinatie van onderhoud', 'Juridische en regelgevende naleving']
      },
      management: {
        title: 'Vastgoedbeheer',
        description: 'Uitgebreid beheer voor investeerders en eigenaren in het buitenland. Van onderhoud tot financiële rapportage — wij beschermen uw bezit alsof het ons eigen is.',
        features: ['Geplande woninginspecties', 'Financiële rapportage en budgettering', 'Coördinatie van noodsituaties', 'Belasting- en verzekeringsadministratie', 'Leveranciers- en aannemersbeheer', '24/7 eigenaar ondersteuning']
      },
      cta: 'Klaar om te beginnen?',
      ctaDesc: 'Neem contact op voor een vertrouwelijk gesprek over uw vastgoedambities. Wij zijn er om te luisteren, adviseren, en leveren.',
      contactBtn: 'Maak een Afspraak'
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const services = [
    {
      title: t.buying.title,
      description: t.buying.description,
      image: '/services-buying.webp',
      features: t.buying.features,
      slug: 'buying',
    },
    {
      title: t.selling.title,
      description: t.selling.description,
      image: '/selling-hero.webp',
      features: t.selling.features,
      slug: 'selling',
    },
    {
      title: t.renting.title,
      description: t.renting.description,
      image: '/services-renting.webp',
      features: t.renting.features,
      slug: 'renting',
    },
    {
      title: t.leasing.title,
      description: t.leasing.description,
      image: '/services-leasing.webp',
      features: t.leasing.features,
      slug: 'leasing',
    },
  ];

  const managementFeatures = t.management.features;
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/services-hero.webp"
            alt="Amsterdam architecture"
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

      {/* Intro */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
            {t.heroSubtitle}
          </p>
          <p className="text-warm-gray leading-relaxed text-lg">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group cursor-pointer ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:col-start-7' : ''}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
                }`}
              >
                <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-3">
                  0{index + 1}
                </p>
                <h2 className="font-display text-3xl text-charcoal mb-6 group-hover:text-brass transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="text-warm-gray leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-warm-gray"
                    >
                      <span className="text-brass mr-3 mt-1">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-brass font-body text-sm uppercase tracking-wider group-hover:text-brass-light transition-colors">
                  Learn more →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Property Management — Full width */}
      <Link href={`/services/property-management`} className="block">
        <section className="py-24 bg-charcoal text-white group cursor-pointer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
                  05
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-6 group-hover:text-brass-light transition-colors">
                  {t.management.title}
                </h2>
                <p className="text-stone-300 leading-relaxed mb-10">
                  {t.management.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {managementFeatures.map((item) => (
                    <div key={item} className="flex items-start text-stone-300">
                      <span className="text-brass-light mr-3">—</span>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-brass-light font-body text-sm uppercase tracking-wider">
                  Learn more →
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/services-property-management.webp"
                  alt="Property management"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </Link>

      {/* Expat Services — Full width */}
      <Link href={`/services/expat-services`} className="block">
        <section className="py-24 bg-stone-50 group cursor-pointer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] overflow-hidden lg:order-2">
                <img
                  src="/services-expat.webp"
                  alt="International professionals in Amsterdam"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:order-1">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                  06
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6 group-hover:text-brass transition-colors">
                  Expat Services
                </h2>
                <p className="text-warm-gray leading-relaxed mb-10">
                  A complete relocation concierge for international clients. We understand the journey and we make Amsterdam feel like home from day one.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start text-warm-gray">
                    <span className="text-brass mr-3">—</span>
                    Pre-arrival consultation and briefing
                  </div>
                  <div className="flex items-start text-warm-gray">
                    <span className="text-brass mr-3">—</span>
                    Curated property search and viewings
                  </div>
                  <div className="flex items-start text-warm-gray">
                    <span className="text-brass mr-3">—</span>
                    Contract and legal support
                  </div>
                  <div className="flex items-start text-warm-gray">
                    <span className="text-brass mr-3">—</span>
                    Settling-in assistance and ongoing support
                  </div>
                </div>
                <p className="mt-8 text-brass font-body text-sm uppercase tracking-wider group-hover:text-brass-light transition-colors">
                  Learn more →
                </p>
              </div>
            </div>
          </div>
        </section>
      </Link>

      {/* CTA */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            {t.cta}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t.ctaDesc}
          </p>
          <a
            href={`/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t.contactBtn}
          </a>
        </div>
      </section>
    </div>
  );
}

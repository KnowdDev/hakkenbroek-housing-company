'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Amsterdam · Since 2003',
      heroTitle: 'Where rarity finds its home',
      heroDescription: 'A discreet boutique agency with over two decades of Amsterdam market mastery. We connect discerning clients with the city\'s most exceptional properties — often before they reach the open market.',
      viewProperties: 'View Portfolio',
      getInTouch: 'Private Consultation',
      servicesSubtitle: 'Our Expertise',
      servicesTitle: 'Buying and selling at the highest level',
      services: [
        { title: 'Buying', desc: 'We represent buyers with discretion and precision. From canal house to penthouse, we source properties that never appear on public portals — and negotiate terms that reflect their true value.' },
        { title: 'Selling', desc: 'We position your property for the market it deserves. Bespoke marketing, private viewings, and access to qualified international buyers who understand rarity.' },
        { title: 'Renting', desc: 'Curated rental properties for expats and locals who expect more. Every listing in our portfolio meets our standards for location, light, and character.' },
        { title: 'Leasing', desc: 'Long-term lease management for landlords who value peace of mind. Tenant selection, rent collection, and full legal compliance — handled with care.' },
        { title: 'Property Management', desc: 'Comprehensive management for investors and absentee owners. From maintenance to financial reporting, we protect your asset as if it were our own.' },
        { title: 'Expat Services', desc: 'A complete relocation concierge for international clients. We understand the journey — and we make Amsterdam feel like home from day one.' }
      ],
      heritageSubtitle: 'Two Decades of Discretion',
      heritageTitle: 'Amsterdam\'s most trusted name in exceptional properties',
      heritageDescription: 'Since 2003, Hakkenbroek Housing Company has quietly shaped Amsterdam\'s luxury real estate landscape. We do not chase volume. We cultivate relationships — with owners, buyers, and the city itself. Our Leliegracht office has been the starting point for countless remarkable property stories.',
      yearsExperience: 'Years of Market Mastery',
      clientRating: 'Client Satisfaction',
      readStory: 'Discover Our Story',
      featuredSubtitle: 'Portfolio',
      featuredTitle: 'Exceptional Properties',
      viewAllProperties: 'View Full Portfolio',
      whySubtitle: 'The Hakkenbroek Difference',
      whyTitle: 'Why the most discerning clients choose us',
      whyDescription: 'In a market driven by speed and volume, we choose depth. Every client relationship is a partnership. Every property we represent has been selected for its architectural merit, its location, its story.',
      why: [
        { title: 'Off-Market Access', desc: 'Our network spans two decades of Amsterdam\'s most significant property transactions. Many of our finest listings never appear on public platforms.' },
        { title: 'International Reach', desc: 'Multilingual representation in English, Dutch, and Spanish. We connect Amsterdam properties with qualified buyers from London to Singapore.' },
        { title: 'Monument & Heritage Expertise', desc: 'Specialized knowledge of Amsterdam\'s historic properties — from canal house restorations to listed building regulations.' }
      ],
      ctaTitle: 'Begin a confidential conversation',
      ctaDescription: 'Whether you are buying, selling, or simply exploring the market, we invite you to visit our Leliegracht office. No obligation. Complete discretion. Just an honest conversation about what is possible.',
      startConversation: 'Arrange a Meeting'
    },
    nl: {
      heroSubtitle: 'Amsterdam · Sinds 2003',
      heroTitle: 'Waar zeldzaamheid thuis vindt',
      heroDescription: 'Een discreet bureau met meer dan twee decennia Amsterdamse marktkennis. Wij verbinden veeleisende cliënten met de meest uitzonderlijke woningen van de stad — vaak voordat ze op de open markt verschijnen.',
      viewProperties: 'Bekijk Portfolio',
      getInTouch: 'Privé Consult',
      servicesSubtitle: 'Onze Expertise',
      servicesTitle: 'Kopen en verkopen op het hoogste niveau',
      services: [
        { title: 'Kopen', desc: 'Wij vertegenwoordigen kopers met discretie en precisie. Van grachtenpand tot penthouse — wij vinden woningen die nooit op publieke portals verschijnen.' },
        { title: 'Verkopen', desc: 'Wij positioneren uw woning voor de markt die het verdient. Maatwerk marketing, privébezichtigingen, en toegang tot gekwalificeerde internationale kopers.' },
        { title: 'Huren', desc: 'Gecureerde huurwoningen voor expats en locals die meer verwachten. Elke woning in ons portfolio voldoet aan onze normen voor locatie, licht en karakter.' },
        { title: 'Verhuur', desc: 'Lange-termijn verhuurbeheer voor verhuurders die gemoedsrust waarderen. Huurdersselectie, incasso, en volledige juridische naleving.' },
        { title: 'Vastgoedbeheer', desc: 'Uitgebreid beheer voor investeerders en eigenaren in het buitenland. Van onderhoud tot financiële rapportage — wij beschermen uw bezit.' },
        { title: 'Expat Diensten', desc: 'Een complete verhuisservice voor internationale cliënten. Wij begrijpen de reis — en laten Amsterdam vanaf dag één als thuis voelen.' }
      ],
      heritageSubtitle: 'Twee Decennia van Discretie',
      heritageTitle: 'Amsterdams meest vertrouwde naam in uitzonderlijk vastgoed',
      heritageDescription: 'Sinds 2003 geeft Hakkenbroek Housing Company stilletjes vorm aan het luxe vastgoedlandschap van Amsterdam. Wij jagen niet op volume. Wij cultiveren relaties — met eigenaren, kopers, en de stad zelf. Ons kantoor aan de Leliegracht is het startpunt geweest van talloze bijzondere vastgoedverhalen.',
      yearsExperience: 'Jaren Marktkennis',
      clientRating: 'Cliënttevredenheid',
      readStory: 'Ontdek Ons Verhaal',
      featuredSubtitle: 'Portfolio',
      featuredTitle: 'Uitzonderlijke Woningen',
      viewAllProperties: 'Bekijk Volledig Portfolio',
      whySubtitle: 'Het Hakkenbroek Verschil',
      whyTitle: 'Waarom de meest veeleisende cliënten voor ons kiezen',
      whyDescription: 'In een markt gedreven door snelheid en volume, kiezen wij voor diepgang. Elke cliëntrelatie is een partnerschap. Elke woning die wij vertegenwoordigen is geselecteerd op architectonische kwaliteit, locatie, en verhaal.',
      why: [
        { title: 'Off-Market Toegang', desc: 'Ons netwerk omspant twee decennia van Amsterdams meest significante vastgoedtransacties. Veel van onze mooiste aanbiedingen verschijnen nooit op publieke platforms.' },
        { title: 'Internationaal Bereik', desc: 'Meertalige vertegenwoordiging in Nederlands, Engels en Spaans. Wij verbinden Amsterdamse woningen met gekwalificeerde kopers van Londen tot Singapore.' },
        { title: 'Monumenten Expertise', desc: 'Gespecialiseerde kennis van Amsterdams historische panden — van grachtenpandrestauraties tot regelgeving voor beschermde gebouwen.' }
      ],
      ctaTitle: 'Begin een vertrouwelijk gesprek',
      ctaDescription: 'Of u nu koopt, verkoopt, of gewoon de markt verkent — wij nodigen u uit op ons kantoor aan de Leliegracht. Geen verplichting. Volledige discretie. Gewoon een eerlijk gesprek over wat mogelijk is.',
      startConversation: 'Maak een Afspraak'
    },
    es: {
      heroSubtitle: 'Ámsterdam · Desde 2003',
      heroTitle: 'Donde la rareza encuentra su hogar',
      heroDescription: 'Una agencia boutique discreta con más de dos décadas de dominio del mercado de Ámsterdam. Conectamos a clientes exigentes con las propiedades más excepcionales de la ciudad — a menudo antes de que lleguen al mercado abierto.',
      viewProperties: 'Ver Portfolio',
      getInTouch: 'Consulta Privada',
      servicesSubtitle: 'Nuestra Experiencia',
      servicesTitle: 'Comprar y vender al más alto nivel',
      services: [
        { title: 'Comprar', desc: 'Representamos a compradores con discreción y precisión. Desde casas de canal hasta áticos — encontramos propiedades que nunca aparecen en portales públicos.' },
        { title: 'Vender', desc: 'Posicionamos su propiedad para el mercado que merece. Marketing a medida, visitas privadas, y acceso a compradores internacionales cualificados que entienden la rareza.' },
        { title: 'Alquilar', desc: 'Propiedades de alquiler curadas para expatriados y locales que esperan más. Cada listado cumple con nuestros estándares de ubicación, luz y carácter.' },
        { title: 'Arrendamiento', desc: 'Gestión de arrendamiento a largo plazo para propietarios que valoran la tranquilidad. Selección de inquilinos, cobro de rentas, y cumplimiento legal completo.' },
        { title: 'Administración de Propiedades', desc: 'Gestión integral para inversores y propietarios ausentes. Desde mantenimiento hasta informes financieros — protegemos su activo como si fuera nuestro.' },
        { title: 'Servicios para Expatriados', desc: 'Un servicio completo de reubicación para clientes internacionales. Entendemos el viaje — y hacemos que Ámsterdam se sienta como hogar desde el primer día.' }
      ],
      heritageSubtitle: 'Dos Décadas de Discreción',
      heritageTitle: 'El nombre más confiable de Ámsterdam en propiedades excepcionales',
      heritageDescription: 'Desde 2003, Hakkenbroek Housing Company ha moldeado silenciosamente el panorama inmobiliario de lujo de Ámsterdam. No perseguimos volumen. Cultivamos relaciones — con propietarios, compradores, y la ciudad misma. Nuestra oficina en Leliegracht ha sido el punto de partida de innumerables historias inmobiliarias notables.',
      yearsExperience: 'Años de Maestría',
      clientRating: 'Satisfacción del Cliente',
      readStory: 'Descubra Nuestra Historia',
      featuredSubtitle: 'Portfolio',
      featuredTitle: 'Propiedades Excepcionales',
      viewAllProperties: 'Ver Portfolio Completo',
      whySubtitle: 'La Diferencia Hakkenbroek',
      whyTitle: 'Por qué los clientes más exigentes nos eligen',
      whyDescription: 'En un mercado impulsado por la velocidad y el volumen, elegimos la profundidad. Cada relación con el cliente es una asociación. Cada propiedad que representamos ha sido seleccionada por su mérito arquitectónico, su ubicación, su historia.',
      why: [
        { title: 'Acceso Fuera de Mercado', desc: 'Nuestra red abarca dos décadas de las transacciones inmobiliarias más significativas de Ámsterdam. Muchas de nuestras mejores propiedades nunca aparecen en plataformas públicas.' },
        { title: 'Alcance Internacional', desc: 'Representación multilingüe en inglés, neerlandés y español. Conectamos propiedades de Ámsterdam con compradores cualificados de Londres a Singapur.' },
        { title: 'Experiencia en Monumentos', desc: 'Conocimiento especializado de las propiedades históricas de Ámsterdam — desde restauraciones de casas de canal hasta regulaciones de edificios protegidos.' }
      ],
      ctaTitle: 'Comience una conversación confidencial',
      ctaDescription: 'Ya sea que esté comprando, vendiendo, o simplemente explorando el mercado, le invitamos a visitar nuestra oficina en Leliegracht. Sin obligación. Discreción total. Solo una conversación honesta sobre lo que es posible.',
      startConversation: 'Concierte una Cita'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;
  return (
    <div className="min-h-screen">
      {/* Hero Section — Full-bleed imagery */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam canals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="font-body text-sm uppercase tracking-[0.25em] text-stone-200 mb-6">
            {t.heroSubtitle}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 max-w-4xl mx-auto">
            {t.heroTitle}
          </h1>
          <p className="font-body text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/properties`}
              className="bg-brass text-white px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
            >
              {t.viewProperties}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-white/80 text-white px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-white hover:text-charcoal transition-colors duration-300"
            >
              {t.getInTouch}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview — Editorial grid */}
      <section className="py-24 bg-white">
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
              <div
                key={service.title}
                className="group border-t border-stone-200 pt-8 hover:border-brass transition-colors duration-500"
              >
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-brass transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">{service.desc}</p>
              </div>
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
      <section className="py-24 bg-white">
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
            {[
              {
                title: 'Jacob Catskade 51 H',
                location: 'Amsterdam',
                price: '€600,000',
                size: '68 m²',
                beds: '3 bed',
                status: 'Available',
                statusColor: 'bg-emerald-50 text-emerald-700',
                image:
                  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Van Woustraat 22 1',
                location: 'Amsterdam',
                price: '€745,000',
                size: '103 m²',
                beds: '3 bed',
                status: 'Under Consideration',
                statusColor: 'bg-amber-50 text-amber-700',
                image:
                  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Singel 204 C',
                location: 'Amsterdam',
                price: '€625,000',
                size: '73 m²',
                beds: '1 bed',
                status: 'Sold',
                statusColor: 'bg-stone-100 text-warm-gray',
                image:
                  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
              },
            ].map((property) => (
              <div
                key={property.title}
                className="group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 ${property.statusColor}`}
                  >
                    {property.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-1">
                    {property.title}
                  </h3>
                  <p className="text-warm-gray text-sm mb-4">{property.location}</p>
                  <div className="flex justify-between items-end">
                    <span className="font-display text-2xl text-brass">{property.price}</span>
                    <span className="text-warm-gray text-sm">
                      {property.size} · {property.beds}
                    </span>
                  </div>
                </div>
              </div>
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

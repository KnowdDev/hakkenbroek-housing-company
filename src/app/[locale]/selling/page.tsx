'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';

export default function SellingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Seller Representation',
      heroTitle: 'Position your property for the market it deserves',
      heroDescription: 'Bespoke marketing, private viewings, and access to qualified international buyers who understand rarity. We do not list properties. We present them.',
      introTitle: 'The art of selling in Amsterdam',
      introText: 'In 2026, 65–70% of Amsterdam properties sell above asking price — but only those positioned correctly. We position your property for the market it deserves, not the market it happens to find. Bespoke strategy, editorial presentation, and a buyer network that spans four continents.',
      processTitle: 'Our selling process',
      steps: [
        { step: '01', title: 'Valuation & Strategy', desc: 'We begin with a comprehensive valuation rooted in comparable sales, market trends, and the unique qualities of your property. From this foundation, we develop a bespoke marketing strategy tailored to the buyers most likely to appreciate what you offer.' },
        { step: '02', title: 'Editorial Presentation', desc: 'First impressions are everything. We coordinate professional photography, cinematic video tours, and styling consultation to present your property at its absolute best. Every frame tells a story that resonates with discerning buyers.' },
        { step: '03', title: 'Curated Marketing', desc: 'Your property is showcased to qualified buyers through our international network, private client database, and selective digital presence. We do not broadcast. We curate. The right buyers see your property at the right moment.' },
        { step: '04', title: 'Private Viewings', desc: 'We arrange private viewings for pre-qualified buyers. No open houses. No casual browsers. Every viewer has been assessed for genuine interest, financial capability, and alignment with your property profile.' },
        { step: '05', title: 'Negotiation & Closing', desc: 'We handle all negotiations with full transparency and your best interests at heart. From initial offer to notarial transfer, we manage the process to secure optimal terms while protecting your position and privacy.' },
      ],
      casesTitle: 'Recent sales',
      cases: [
        { address: 'Leliegracht 34, Amsterdam', type: 'Canal House', story: 'Achieved 18% above initial valuation through targeted marketing to a London-based buyer. Sold within three weeks of private launch.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
        { address: 'Weteringschans 89, Amsterdam', type: 'Penthouse', story: 'Confidential sale to a Middle Eastern family. Property never listed publicly. Achieved full asking price through direct introduction.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Reguliersgracht 12, Amsterdam', type: 'Monument', story: 'Heritage property requiring complex renovation coordination. Matched with a German investor specialising in historic Amsterdam restorations.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Your seller representatives',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Founder & Lead Seller Agent', bio: '25 years positioning Amsterdam finest properties. Expert in luxury marketing, international buyer cultivation, and discreet off-market sales for high-profile owners.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Senior Seller Advisor', bio: 'Former investment banker with deep valuation expertise. Specialises in pricing strategy, negotiation, and coordinating complex multi-party transactions.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: 'Ready to position your property?',
      ctaText: 'Contact us for a complimentary valuation and confidential discussion about your property and the current market. No obligation. Just expert insight.',
      ctaButton: 'Request a Valuation',
    },
    nl: {
      heroSubtitle: 'Verkopersbegeleiding',
      heroTitle: 'Positioneer uw woning voor de markt die het verdient',
      heroDescription: 'Maatwerk marketing, privébezichtigingen, en toegang tot gekwalificeerde internationale kopers die zeldzaamheid begrijpen. Wij noteren woningen niet. Wij presenteren ze.',
      introTitle: 'De kunst van het verkopen in Amsterdam',
      introText: 'In 2026 wordt 65–70% van de Amsterdamse woningen boven de vraagprijs verkocht — maar alleen diegenen die correct gepositioneerd zijn. Wij positioneren uw woning voor de markt die het verdient, niet de markt die het toevallig vindt. Maatwerk strategie, editoriale presentatie, en een kopersnetwerk dat vier continenten bestrijkt.',
      processTitle: 'Ons verkoopproces',
      steps: [
        { step: '01', title: 'Waardering & Strategie', desc: 'Wij beginnen met een uitgebreide waardering gebaseerd op vergelijkbare verkopen, markttrends, en de unieke kwaliteiten van uw woning. Vanuit dit fundament ontwikkelen wij een maatwerk marketingstrategie afgestemd op de kopers die uw woning het meest zullen waarderen.' },
        { step: '02', title: 'Editoriale Presentatie', desc: 'Eerste indrukken zijn alles. Wij coördineren professionele fotografie, cinematische video rondleidingen, en stylingadvies om uw woning op zijn best te presenteren. Elk beeld vertelt een verhaal dat resoneert met veeleisende kopers.' },
        { step: '03', title: 'Gecureerde Marketing', desc: 'Uw woning wordt gepresenteerd aan gekwalificeerde kopers via ons internationale netwerk, privé cliëntendatabase, en selectieve digitale aanwezigheid. Wij uitzenden niet. Wij cureren. De juiste kopers zien uw woning op het juiste moment.' },
        { step: '04', title: 'Privébezichtigingen', desc: 'Wij regelen privébezichtigingen voor voorgekwalificeerde kopers. Geen open huizen. Geen toevallige browsers. Elke bezoeker is beoordeeld op oprechte interesse, financiële draagkracht, en aansluiting bij het profiel van uw woning.' },
        { step: '05', title: 'Onderhandeling & Afronding', desc: 'Wij behandelen alle onderhandelingen met volledige transparantie en uw belangen voorop. Van eerste bod tot notariële overdracht beheren wij het proces om optimale voorwaarden te waarborgen terwijl wij uw positie en privacy beschermen.' },
      ],
      casesTitle: 'Recente verkopen',
      cases: [
        { address: 'Leliegracht 34, Amsterdam', type: 'Grachtenpand', story: '18% boven initiële waardering behaald door gerichte marketing aan een Londense koper. Verkocht binnen drie weken na privé lancering.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
        { address: 'Weteringschans 89, Amsterdam', type: 'Penthouse', story: 'Vertrouwelijke verkoop aan een Midden-Oosterse familie. Woning nooit publiek vermeld. Vraagprijs behaald door directe introductie.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Reguliersgracht 12, Amsterdam', type: 'Monument', story: 'Erfgoedpand met complexe renovatiecoördinatie. Gekoppeld aan een Duitse investeerder gespecialiseerd in historische Amsterdamse restauraties.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Uw verkoperbegeleiders',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Oprichter & Hoofd Verkoperbegeleider', bio: '25 jaar positionering van Amsterdams mooiste woningen. Expert in luxe marketing, internationale koperontwikkeling, en discrete off-market verkoop voor prominente eigenaren.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Senior Verkoperadviseur', bio: 'Voormalig investment banker met diepgaande waarderings expertise. Gespecialiseerd in prijsstrategie, onderhandeling, en coördinatie van complexe transacties met meerdere partijen.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: 'Klaar om uw woning te positioneren?',
      ctaText: 'Neem contact op voor een vrijblijvende waardering en vertrouwelijk gesprek over uw woning en de huidige markt. Geen verplichting. Gewoon expert inzicht.',
      ctaButton: 'Vraag een Waardering aan',
    },
    es: {
      heroSubtitle: 'Representación de Vendedores',
      heroTitle: 'Posicione su propiedad para el mercado que merece',
      heroDescription: 'Marketing a medida, visitas privadas, y acceso a compradores internacionales cualificados que entienden la rareza. No listamos propiedades. Las presentamos.',
      introTitle: 'El arte de vender en Ámsterdam',
      introText: 'En 2026, el 65–70% de las propiedades de Ámsterdam se venden por encima del precio de venta — pero solo las correctamente posicionadas. Posicionamos su propiedad para el mercado que merece, no el mercado que casualmente encuentre. Estrategia a medida, presentación editorial, y una red de compradores que abarca cuatro continentes.',
      processTitle: 'Nuestro proceso de venta',
      steps: [
        { step: '01', title: 'Valoración y Estrategia', desc: 'Comenzamos con una valoración exhaustiva basada en ventas comparables, tendencias del mercado, y las cualidades únicas de su propiedad. Desde esta base, desarrollamos una estrategia de marketing a medida adaptada a los compradores más propensos a apreciar lo que ofrece.' },
        { step: '02', title: 'Presentación Editorial', desc: 'Las primeras impresiones lo son todo. Coordinamos fotografía profesional, recorridos en video cinematográfico, y consultoría de estilismo para presentar su propiedad en su mejor versión. Cada fotograma cuenta una historia que resuena con compradores exigentes.' },
        { step: '03', title: 'Marketing Curado', desc: 'Su propiedad se presenta a compradores cualificados a través de nuestra red internacional, base de datos de clientes privados, y presencia digital selectiva. No transmitimos. Curamos. Los compradores adecuados ven su propiedad en el momento adecuado.' },
        { step: '04', title: 'Visitas Privadas', desc: 'Organizamos visitas privadas para compradores pre-cualificados. Sin jornadas de puertas abiertas. Sin visitantes casuales. Cada visitante ha sido evaluado por interés genuino, capacidad financiera, y alineación con el perfil de su propiedad.' },
        { step: '05', title: 'Negociación y Cierre', desc: 'Manejamos todas las negociaciones con total transparencia y sus mejores intereses en mente. Desde la oferta inicial hasta la transferencia notarial, gestionamos el proceso para asegurar términos óptimos protegiendo su posición y privacidad.' },
      ],
      casesTitle: 'Ventas recientes',
      cases: [
        { address: 'Leliegracht 34, Ámsterdam', type: 'Casa de Canal', story: 'Alcanzó 18% por encima de la valoración inicial a través de marketing dirigido a un comprador con sede en Londres. Vendida en tres semanas tras lanzamiento privado.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
        { address: 'Weteringschans 89, Ámsterdam', type: 'Ático', story: 'Venta confidencial a una familia de Oriente Medio. Propiedad nunca listada públicamente. Precio completo alcanzado a través de introducción directa.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Reguliersgracht 12, Ámsterdam', type: 'Monumento', story: 'Propiedad de patrimonio que requería coordinación de renovación compleja. Emparejada con un inversor alemán especializado en restauraciones históricas de Ámsterdam.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Sus representantes de venta',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Fundador y Agente Principal de Venta', bio: '25 años posicionando las mejores propiedades de Ámsterdam. Experto en marketing de lujo, cultivo de compradores internacionales, y ventas discretas fuera de mercado para propietarios destacados.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Asesora Senior de Venta', bio: 'Ex banquera de inversión con profunda experiencia en valoración. Especializada en estrategia de precios, negociación, y coordinación de transacciones complejas multiparte.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: '¿Listo para posicionar su propiedad?',
      ctaText: 'Contáctenos para una valoración gratuita y una conversación confidencial sobre su propiedad y el mercado actual. Sin obligación. Solo conocimiento experto.',
      ctaButton: 'Solicite una Valoración',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Luxury Property Selling Service Amsterdam',
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Hakkenbroek Housing Company',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Leliegracht 21',
        postalCode: '1015 DE',
        addressLocality: 'Amsterdam',
        addressCountry: 'NL'
      }
    },
    areaServed: { '@type': 'City', name: 'Amsterdam' },
    description: t.heroDescription
  };

  return (
    <>
      <Script id='selling-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        {/* Hero — Split layout */}
        <section className='flex flex-col lg:flex-row pt-24 h-auto lg:h-[calc(100vh-6rem)] lg:min-h-[600px] overflow-hidden'>
          <div className='relative w-full lg:w-[58%] h-[55vh] lg:h-full'>
            <img
              src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
              alt='Elegant Amsterdam property exterior'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full lg:w-[42%] bg-stone-50 flex items-center'>
            <div className='px-8 py-16 lg:px-16 lg:py-12 max-w-xl'>
              <p className='font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-8'>{t.heroSubtitle}</p>
              <h1 className='font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-charcoal mb-8'>{t.heroTitle}</h1>
              <p className='font-body text-base lg:text-lg text-warm-gray leading-relaxed mb-10'>{t.heroDescription}</p>
              <Link href={`/${locale}/contact`} className='inline-block bg-brass text-white px-10 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
                {t.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className='py-24 bg-stone-50'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-8'>{t.introTitle}</h2>
            <p className='text-warm-gray leading-relaxed text-lg'>{t.introText}</p>
          </div>
        </section>

        {/* Process */}
        <section className='py-24 bg-stone-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-16 text-center'>{t.processTitle}</h2>
            <div className='space-y-16 max-w-4xl mx-auto'>
              {t.steps.map((s, i) => (
                <div key={s.step} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                    <span className='font-display text-5xl text-brass/40'>{s.step}</span>
                    <h3 className='font-display text-2xl text-charcoal mt-4 mb-3'>{s.title}</h3>
                    <p className='text-warm-gray leading-relaxed'>{s.desc}</p>
                  </div>
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}>
                    <div className='aspect-[4/3] bg-stone-200'>
                      <img
                        src={`https://images.unsplash.com/photo-${['1600210492486-724fe5c67fb0', '1600607687939-ce8a6c25118c', '1600566753086-00f18fb6b3ea', '1600585154526-990dced4db0d', '1600596542815-ffad4c1539a9'][i]}?auto=format&fit=crop&w=800&q=80`}
                        alt={s.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className='py-24 bg-stone-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-16 text-center'>{t.casesTitle}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {t.cases.map((c) => (
                <div key={c.address} className='group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500'>
                  <div className='aspect-[4/3] overflow-hidden'>
                    <img src={c.image} alt={c.address} className='w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700' />
                  </div>
                  <div className='p-6'>
                    <p className='font-body text-xs uppercase tracking-wider text-brass mb-2'>{c.type}</p>
                    <h3 className='font-display text-lg text-charcoal mb-3'>{c.address}</h3>
                    <p className='text-warm-gray text-sm leading-relaxed'>{c.story}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agents */}
        <section className='py-24 bg-stone-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-16 text-center'>{t.agentsTitle}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto'>
              {t.agents.map((a) => (
                <div key={a.name} className='flex gap-6 items-start'>
                  <div className='w-24 h-24 flex-shrink-0 overflow-hidden bg-stone-200'>
                    <img src={a.image} alt={a.name} className='w-full h-full object-cover' />
                  </div>
                  <div>
                    <h3 className='font-display text-xl text-charcoal'>{a.name}</h3>
                    <p className='font-body text-xs uppercase tracking-wider text-brass mb-2'>{a.role}</p>
                    <p className='text-warm-gray text-sm leading-relaxed'>{a.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-24 bg-charcoal text-white'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl mb-6'>{t.ctaTitle}</h2>
            <p className='text-stone-300 text-lg mb-10 leading-relaxed'>{t.ctaText}</p>
            <Link href={`/${locale}/contact`} className='inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

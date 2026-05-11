'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';

export default function BuyingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Buyer Representation',
      heroTitle: 'Acquire what others cannot find',
      heroDescription: 'Two decades of Amsterdam market mastery. Off-market access, strategic negotiation, and complete discretion from first consultation to key transfer.',
      introTitle: 'The art of buying in Amsterdam',
      introText: 'In 2026, 65–70% of Amsterdam properties sell above asking price. The finest homes never reach Funda. We give you an unfair advantage — access, intelligence, and negotiation power cultivated over twenty years at the centre of the market.',
      processTitle: 'Our buyer process',
      steps: [
        { step: '01', title: 'Confidential Briefing', desc: 'We meet at our Leliegracht office — or yours. We listen, observe, and define precisely what you seek. Budget, timeline, lifestyle, architecture. Every detail matters.' },
        { step: '02', title: 'Intelligence & Sourcing', desc: 'We activate our network. Many properties we present are not listed anywhere. We reach owners, agents, and advisors across Amsterdam before the market knows they exist.' },
        { step: '03', title: 'Curated Viewings', desc: 'Every viewing is pre-qualified against your brief. No open houses. No wasted afternoons. Each property has been assessed for value, potential, and fit before you step inside.' },
        { step: '04', title: 'Strategic Negotiation', desc: 'We negotiate with full market intelligence — comparable sales, seller position, timing leverage. Our buyers consistently secure properties at or below true market value.' },
        { step: '05', title: 'Closing & Beyond', desc: 'From building inspection to notarial transfer, we coordinate every detail. Mortgage advisors, interior designers, contractors — our network becomes yours.' },
      ],
      casesTitle: 'Recent acquisitions',
      cases: [
        { address: 'Keizersgracht 482, Amsterdam', type: 'Canal House', story: 'Sourced off-market through a private introduction. Negotiated 12% below comparable sales. Restored original ceiling murals during renovation.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Prinsengracht 263, Amsterdam', type: 'Penthouse', story: 'Competitive bidding scenario with three other parties. Secured through strategic timing and pre-established trust with the selling agent.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Herengracht 396, Amsterdam', type: 'Monument', story: 'Listed building with complex renovation requirements. Coordinated heritage approvals, architect selection, and contractor bidding before purchase completed.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Your buyer representatives',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Founder & Lead Buyer Agent', bio: '25 years of Amsterdam market mastery. Specialises in canal houses, monuments, and off-market transactions for high-net-worth clients.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Senior Buyer Advisor', bio: 'Former investment banker turned property specialist. Expert in valuation analysis, negotiation strategy, and international client representation.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: 'Begin a confidential conversation',
      ctaText: 'Visit our Leliegracht office for a private consultation. No obligation. Complete discretion. Just an honest conversation about what is possible.',
      ctaButton: 'Arrange a Meeting',
    },
    nl: {
      heroSubtitle: 'Koperbegeleiding',
      heroTitle: 'Verwerf wat anderen niet kunnen vinden',
      heroDescription: 'Twee decennia Amsterdamse marktkennis. Off-market toegang, strategische onderhandeling, en volledige discretie van eerste consult tot sleuteloverdracht.',
      introTitle: 'De kunst van het kopen in Amsterdam',
      introText: 'In 2026 wordt 65–70% van de Amsterdamse woningen boven de vraagprijs verkocht. De mooiste woningen komen nooit op Funda. Wij geven u een oneerlijk voordeel — toegang, inzicht, en onderhandelingskracht opgebouwd over twintig jaar in het centrum van de markt.',
      processTitle: 'Ons koopproces',
      steps: [
        { step: '01', title: 'Vertrouwelijk Briefing', desc: 'Wij ontmoeten elkaar op ons kantoor aan de Leliegracht — of bij u thuis. Wij luisteren, observeren, en bepalen precies wat u zoekt. Budget, tijdlijn, levensstijl, architectuur. Elk detail telt.' },
        { step: '02', title: 'Intelligentie & Sourcing', desc: 'Wij activeren ons netwerk. Veel woningen die wij presenteren staan nergens vermeld. Wij benaderen eigenaren, makelaars, en adviseurs door heel Amsterdam voordat de markt weet dat ze bestaan.' },
        { step: '03', title: 'Gecureerde Bezichtigingen', desc: 'Elke bezichtiging is voorgekwalificeerd op basis van uw briefing. Geen open huizen. Geen verloren middagen. Elke woning is beoordeeld op waarde, potentieel, en geschiktheid voordat u binnenstapt.' },
        { step: '04', title: 'Strategische Onderhandeling', desc: 'Wij onderhandelen met volledig marktinzicht — vergelijkbare verkopen, positie van de verkoper, timing. Onze kopers verkrijgen woningen consistent op of onder de werkelijke marktwaarde.' },
        { step: '05', title: 'Afronding & Daarna', desc: 'Van bouwkundige keuring tot notariële overdracht, wij coördineren elk detail. Hypotheekadviseurs, interieurontwerpers, aannemers — ons netwerk wordt het uwe.' },
      ],
      casesTitle: 'Recente acquisities',
      cases: [
        { address: 'Keizersgracht 482, Amsterdam', type: 'Grachtenpand', story: 'Gevonden off-market via een privé-introductie. 12% onder vergelijkbare verkopen onderhandeld. Oorspronkelijke plafondschilderingen tijdens renovatie hersteld.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Prinsengracht 263, Amsterdam', type: 'Penthouse', story: 'Concurrentiebieding met drie andere partijen. Verkregen door strategische timing en vooraf opgebouwd vertrouwen met de verkopende makelaar.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Herengracht 396, Amsterdam', type: 'Monument', story: 'Beschermd pand met complexe renovatie-eisen. Erfgoedvergunningen, architectselectie, en aannemersbieding gecoördineerd vóór aankoop voltooid.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Uw koperbegeleiders',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Oprichter & Hoofd Koperbegeleider', bio: '25 jaar Amsterdamse marktkennis. Gespecialiseerd in grachtenpanden, monumenten, en off-market transacties voor vermogende cliënten.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Senior Koperadviseur', bio: 'Voormalig investment banker, nu vastgoedspecialist. Expert in waardeanalyse, onderhandelingsstrategie, en internationale cliëntvertegenwoordiging.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: 'Begin een vertrouwelijk gesprek',
      ctaText: 'Bezoek ons kantoor aan de Leliegracht voor een privé consult. Geen verplichting. Volledige discretie. Gewoon een eerlijk gesprek over wat mogelijk is.',
      ctaButton: 'Maak een Afspraak',
    },
    es: {
      heroSubtitle: 'Representación de Compradores',
      heroTitle: 'Adquiera lo que otros no pueden encontrar',
      heroDescription: 'Dos décadas de dominio del mercado de Ámsterdam. Acceso fuera de mercado, negociación estratégica, y discreción total desde la primera consulta hasta la entrega de llaves.',
      introTitle: 'El arte de comprar en Ámsterdam',
      introText: 'En 2026, el 65–70% de las propiedades de Ámsterdam se venden por encima del precio de venta. Las mejores casas nunca llegan a Funda. Le damos una ventaja injusta — acceso, inteligencia, y poder de negociación cultivado durante veinte años en el centro del mercado.',
      processTitle: 'Nuestro proceso de compra',
      steps: [
        { step: '01', title: 'Briefing Confidencial', desc: 'Nos reunimos en nuestra oficina de Leliegracht — o en la suya. Escuchamos, observamos, y definimos precisamente lo que busca. Presupuesto, cronograma, estilo de vida, arquitectura. Cada detalle importa.' },
        { step: '02', title: 'Inteligencia y Búsqueda', desc: 'Activamos nuestra red. Muchas propiedades que presentamos no están listadas en ningún sitio. Contactamos propietarios, agentes y asesores de Ámsterdam antes de que el mercado sepa que existen.' },
        { step: '03', title: 'Visitas Curadas', desc: 'Cada visita está pre-calificada según su briefing. Sin jornadas de puertas abiertas. Sin tardes perdidas. Cada propiedad ha sido evaluada por valor, potencial y adecuación antes de que entre.' },
        { step: '04', title: 'Negociación Estratégica', desc: 'Negociamos con inteligencia de mercado completa — ventas comparables, posición del vendedor, apalancamiento de tiempo. Nuestros compradores consistentemente aseguran propiedades a o por debajo del valor real de mercado.' },
        { step: '05', title: 'Cierre y Más Allá', desc: 'Desde inspección estructural hasta transferencia notarial, coordinamos cada detalle. Asesores hipotecarios, diseñadores de interiores, contratistas — nuestra red se convierte en la suya.' },
      ],
      casesTitle: 'Adquisiciones recientes',
      cases: [
        { address: 'Keizersgracht 482, Ámsterdam', type: 'Casa de Canal', story: 'Encontrada fuera de mercado a través de una introducción privada. Negociado 12% por debajo de ventas comparables. Murales originales del techo restaurados durante la renovación.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Prinsengracht 263, Ámsterdam', type: 'Ático', story: 'Escenario de ofertas competitivas con tres otras partes. Asegurado a través de estrategia de tiempo y confianza preestablecida con el agente vendedor.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
        { address: 'Herengracht 396, Ámsterdam', type: 'Monumento', story: 'Edificio listado con requisitos de renovación complejos. Coordinadas aprobaciones de patrimonio, selección de arquitecto, y licitación de contratistas antes de que se completara la compra.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80' },
      ],
      agentsTitle: 'Sus representantes de compra',
      agents: [
        { name: 'Dick Hakkenbroek', role: 'Fundador y Agente Principal de Compra', bio: '25 años de dominio del mercado de Ámsterdam. Especializado en casas de canal, monumentos, y transacciones fuera de mercado para clientes de alto patrimonio.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Sophie van Berg', role: 'Asesora Senior de Compra', bio: 'Ex banquera de inversión convertida en especialista inmobiliario. Experta en análisis de valoración, estrategia de negociación, y representación de clientes internacionales.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      ],
      ctaTitle: 'Comience una conversación confidencial',
      ctaText: 'Visite nuestra oficina en Leliegracht para una consulta privada. Sin obligación. Discreción total. Solo una conversación honesta sobre lo que es posible.',
      ctaButton: 'Concierte una Cita',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Luxury Property Buying Service Amsterdam',
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
      <Script id='buying-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        {/* Hero — Split layout */}
        <section className='flex flex-col lg:flex-row pt-24 h-auto lg:h-[calc(100vh-6rem)] lg:min-h-[600px] overflow-hidden'>
          <div className='relative w-full lg:w-[58%] h-[55vh] lg:h-full'>
            <img
              src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
              alt='Luxury Amsterdam canal house interior'
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

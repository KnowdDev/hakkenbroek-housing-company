'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';
import ProcessTimeline from '@/components/ProcessTimeline';

export default function SellingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Seller Representation',
      heroTitle: 'Your home deserves careful positioning',
      heroDescription: 'Every home has its own character and calls for a focused, personal approach. We develop a tailored strategy in which the qualities and distinctive features of your property are presented with care and conviction. We do not simply put your home on the market. We position it for the right buyer, at the right moment, with an eye for the best possible result.',
      introTitle: 'The art of selling',
      introText: 'We guide the sale of distinguished property with care, discretion and a carefully developed strategy. Not a standard approach, but one that begins with the home itself — its character, its context and the right audience. From there we create a presentation and positioning that is right in every detail. With high-quality presentation, discreet private viewings and access to a select network of qualified national and international buyers, we create the conditions for an effective, considered sale.',
      processTitle: 'Our selling process',
      steps: [
        { step: '01', title: 'Valuation & strategy', desc: 'We start with a thorough valuation of your home, based on comparable sales, current market developments and the unique qualities of the property. From this we develop a considered, tailored marketing strategy aimed at the buyers who will appreciate your home most.' },
        { step: '02', title: 'First impressions', desc: 'First impressions make the difference. We arrange professional property photography, cinematic video tours and styling advice to present your home at its best. Every image is carefully created to tell a story that speaks to discerning buyers and captures their imagination.' },
        { step: '03', title: 'Curated marketing', desc: 'Your home is presented to a select network of qualified buyers through our international reach, a carefully built private client database and a selective digital presence. We do not broadcast widely — we curate. That is how your home reaches exactly the right buyers, at the right moment.' },
        { step: '04', title: 'Selective presentation', desc: 'Your home is shared discreetly within a trusted international network of serious buyers and investors. Personally introduced, with attention to intention and match. We choose with care where and how your home becomes visible. Every channel, every image and every message serves one purpose: reaching the right buyer. Quality over quantity.' },
        { step: '05', title: 'Guidance throughout', desc: 'We stand beside you for the entire process. From first strategy to completion we guide every step with attention, transparency and a personal approach — so the process stays clear and you can decide with confidence. You keep the overview; we protect the process.' },
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
      ctaTitle: 'Every process begins with a personal conversation',
      ctaText: 'We take the time to understand your home, your wishes and the possibilities with care. From there we determine the right approach together.',
      ctaButton: 'Request a Valuation',
    },
    nl: {
      heroSubtitle: 'Verkopersbegeleiding',
      heroTitle: 'Uw woning verdient een zorgvuldige positionering',
      heroDescription: 'Elke woning heeft een eigen karakter en vraagt om een gerichte, persoonlijke aanpak. Wij ontwikkelen een strategie op maat, waarin de kwaliteiten en onderscheidende kenmerken van uw woning zorgvuldig en overtuigend worden gepresenteerd. Wij brengen uw woning niet simpelweg op de markt. Wij positioneren haar met aandacht voor de juiste koper, op het juiste moment en met oog voor het best mogelijke resultaat.',
      introTitle: 'De kunst van het verkopen',
      introText: 'Wij begeleiden de verkoop van exclusief vastgoed met aandacht, discretie en een zorgvuldig uitgewerkte strategie. Geen standaard aanpak, maar een benadering die begint bij de woning zelf — het karakter, de context en de juiste doelgroep. Vanuit daar creëren wij een presentatie en positionering die klopt in elk detail. Met een hoogwaardige presentatie, discrete privébezichtigingen en toegang tot een select netwerk van gekwalificeerde (inter)nationale kopers, creëren wij de juiste omstandigheden voor een effectieve en doordachte verkoop.',
      processTitle: 'Ons verkoopproces',
      steps: [
        { step: '01', title: 'Waardering & strategie', desc: 'We starten met een uitgebreide waardebepaling van uw woning, gebaseerd op vergelijkbare verkopen, actuele marktontwikkelingen en de unieke kenmerken van het object. Op basis hiervan ontwikkelen we een doordachte marketingstrategie op maat, gericht op de kopers die uw woning het best zullen waarderen.' },
        { step: '02', title: 'Eerste indrukken', desc: 'Eerste indrukken maken het verschil. Wij verzorgen professionele vastgoedfotografie, cinematische video-rondleidingen en stylingadvies om uw woning optimaal te presenteren. Elk beeld wordt zorgvuldig gecreëerd om een verhaal te vertellen dat aansluit bij veeleisende kopers en hun verbeelding direct aanspreekt.' },
        { step: '03', title: 'Gecureerde marketing', desc: 'Uw woning wordt gepresenteerd aan een select netwerk van gekwalificeerde kopers via ons internationale bereik, een zorgvuldig opgebouwde private cliëntendatabase en een selectieve digitale positionering. Wij zenden niet breed uit — wij cureren. Zo bereikt uw woning precies de juiste kopers, op het juiste moment.' },
        { step: '04', title: 'Selectieve presentatie', desc: 'Uw woning wordt discreet gedeeld binnen een vertrouwd internationaal netwerk van serieuze kopers en investeerders. Persoonlijk geïntroduceerd, met aandacht voor intentie en match. Wij kiezen bewust waar en hoe uw woning zichtbaar wordt. Elk kanaal, elk beeld en elke boodschap dient één doel: de juiste koper bereiken. Kwaliteit boven kwantiteit.' },
        { step: '05', title: 'Begeleiding in het verkoopproces', desc: 'Wij staan naast u gedurende het hele traject. Van eerste strategie tot afronding begeleiden wij elke stap met aandacht, transparantie en een persoonlijke benadering. Zodat het proces overzichtelijk blijft en u met vertrouwen beslissingen kunt nemen. U behoudt overzicht, wij bewaken het proces.' },
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
      ctaTitle: 'Elk traject begint met een persoonlijk gesprek',
      ctaText: 'We nemen de tijd om uw woning, uw wensen en de mogelijkheden zorgvuldig te begrijpen. Van daaruit bepalen we samen de juiste aanpak.',
      ctaButton: 'Vraag een Waardering aan',
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
        postalCode: '1016 GR',
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
        <section className='flex flex-col lg:flex-row h-auto lg:h-[92vh] lg:min-h-[600px] overflow-hidden'>
          <div className='relative w-full lg:w-[58%] h-[55vh] lg:h-full'>
            <img
              src='/services-selling.webp'
              alt='Elegant Amsterdam property exterior'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full lg:w-[42%] bg-stone-50 flex items-center'>
            <div className='px-8 py-16 lg:px-16 lg:py-12 max-w-xl'>
              <p className='font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-8'>{t.heroSubtitle}</p>
              <h1 className='font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-charcoal mb-8'>{t.heroTitle}</h1>
              <p className='font-body text-base lg:text-lg text-warm-gray leading-relaxed mb-10'>{t.heroDescription}</p>
              <Link href={`/contact`} className='inline-block bg-brass text-white px-10 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
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
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-20 text-center'>{t.processTitle}</h2>
            <ProcessTimeline steps={t.steps} />
          </div>
        </section>

        {/* CTA */}
        <section className='py-24 bg-earth text-white'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl mb-6'>{t.ctaTitle}</h2>
            <p className='text-stone-100/85 text-lg mb-10 leading-relaxed'>{t.ctaText}</p>
            <Link href={`/contact`} className='inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

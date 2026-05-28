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
      heroTitle: 'Position your property for the market it deserves',
      heroDescription: 'We position your property for the market it deserves. Bespoke marketing strategy, professional staging consultation, private viewings for qualified buyers, and access to our international network of high-net-worth individuals.',
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
        <section className='py-24 bg-charcoal text-white'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl mb-6'>{t.ctaTitle}</h2>
            <p className='text-stone-300 text-lg mb-10 leading-relaxed'>{t.ctaText}</p>
            <Link href={`/contact`} className='inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

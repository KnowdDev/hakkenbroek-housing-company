'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function ExpatServicesPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Relocation Concierge',
      heroTitle: 'A complete relocation service for international clients',
      heroDescription: 'Moving to a new country is one of lifes most significant transitions. Our expat service goes far beyond property search. We are your guide your advocate and your support system from the moment you consider Amsterdam to long after you have settled in.',
      introTitle: 'The Hakkenbroek approach to relocation',
      introText: 'For more than 25 years, we have helped international clients find their place in Amsterdam. We understand that relocation is not just about finding a property. It is about navigating a new culture, a new language, and a new way of life. Our comprehensive service addresses every aspect of your move so you can focus on what matters most: starting your new chapter with confidence.',
      processTitle: 'Our relocation services',
      steps: [
        { step: '01', title: 'Pre-Arrival Consultation', desc: 'Before you even set foot in Amsterdam we conduct detailed video consultations to understand your needs your timeline and your expectations. We provide honest market insights help you set realistic budgets and begin searching for properties that match your criteria.' },
        { step: '02', title: 'Property Search and Selection', desc: 'We curate a selection of properties for your consideration complete with video tours neighborhood information and honest assessments. When you arrive for viewings we have already done the groundwork so you can focus on making decisions not searching listings.' },
        { step: '03', title: 'Viewing and Decision Support', desc: 'We accompany you on all viewings providing context about each property its neighborhood and its suitability for your specific situation. We help you compare options weigh pros and cons and make informed decisions. No pressure no rush just expert guidance.' },
        { step: '04', title: 'Contract and Legal Support', desc: 'We guide you through the rental or purchase contract explaining all terms in plain language. We ensure your interests are protected and coordinate with notaries lawyers and tax advisors as needed. We handle the paperwork so you do not have to worry about missing critical details.' },
        { step: '05', title: 'Settling In Support', desc: 'Our service continues well beyond move-in day. We help with utility connections internet setup local registrations and introductions to essential services. We provide neighborhood guides recommend restaurants and services and remain available for questions as you settle into Amsterdam life.' }
      ],
      benefitsTitle: 'Why expats choose Hakkenbroek',
      benefits: [
        { title: 'Cultural Bridge', desc: 'We understand the expat experience because we have guided hundreds of international clients through it. We speak your language — literally and figuratively. Our service extends beyond our core regions and, on request, we guide clients throughout the Netherlands.' },
        { title: 'Network Access', desc: 'Over more than 25 years we have built relationships with the best service providers in Amsterdam. From mortgage brokers to interior designers, from schools to sports clubs, we connect you with trusted professionals who understand international clients.' },
        { title: 'Honest Guidance', desc: 'We tell you what you need to hear not just what you want to hear. About budgets about neighborhoods about timelines. Our reputation is built on trust and that means being honest even when the truth is uncomfortable.' },
        { title: 'Long-Term Relationship', desc: 'Many of our expat clients become long-term friends. We celebrate your successes support you through challenges and remain your Amsterdam property resource for years to come. Your success in Amsterdam is our success.' }
      ],
      ctaTitle: 'Planning a move to Amsterdam?',
      ctaText: 'Contact us to discuss your relocation timeline and requirements. We will explain how our service works what to expect and how we can make your transition to Amsterdam as smooth as possible.',
      ctaButton: 'Start Your Journey',
      backToServices: 'Back to Services'
    },
    nl: {
      heroSubtitle: 'Relocatieservice',
      heroTitle: 'Een complete relocatieservice voor internationale klanten',
      heroDescription: 'Verhuizen naar een nieuw land is één van de grootste veranderingen in het leven. Onze expat-service gaat veel verder dan woningzoeken. Wij zijn uw gids, uw woordvoerder en uw steun vanaf het moment dat u Amsterdam overweegt tot lang nadat u bent ingewoond.',
      introTitle: 'De Hakkenbroek aanpak voor verhuizing',
      introText: 'Wij helpen internationale klanten al meer dan 25 jaar om hun plek in Amsterdam te vinden. We begrijpen dat verhuizen niet alleen draait om een woning vinden — het draait om navigeren in een nieuwe cultuur, een nieuwe taal en een nieuwe manier van leven. Onze uitgebreide service richt zich op elk aspect van uw verhuizing, zodat u zich kunt richten op wat het belangrijkst is: uw nieuwe hoofdstuk met vertrouwen beginnen.',
      processTitle: 'Onze relocatieservices',
      steps: [
        { step: '01', title: 'Pre-arrival consult', desc: 'Voordat u ook maar één voet in Amsterdam zet, voeren we uitgebreide videogesprekken om uw wensen, tijdlijn en verwachtingen te bespreken. We geven eerlijke marktinzichten, helpen u realistische budgetten te stellen en beginnen met zoeken naar woningen die bij uw criteria passen.' },
        { step: '02', title: 'Woningzoektocht en selectie', desc: 'We stellen een selectie van woningen samen voor uw overweging, compleet met videorondleidingen, buurtinformatie en eerlijke beoordelingen. Wanneer u aankomt voor bezichtigingen hebben wij het voorwerk al gedaan, zodat u zich kunt richten op keuzes maken in plaats van listings doorzoeken.' },
        { step: '03', title: 'Bezichtiging en beslissingsondersteuning', desc: 'We begeleiden u bij alle bezichtigingen en geven context over elke woning, de buurt en de geschiktheid voor uw specifieke situatie. We helpen u opties vergelijken, voor- en nadelen afwegen en weloverwogen beslissingen nemen. Geen druk, geen haast — alleen deskundige begeleiding.' },
        { step: '04', title: 'Contract en juridische ondersteuning', desc: 'We begeleiden u door het huur- of koopcontract en leggen alle voorwaarden in begrijpelijke taal uit. We zorgen ervoor dat uw belangen beschermd zijn en coördineren met notarissen, advocaten en belastingadviseurs waar nodig. Wij regelen het papierwerk zodat u zich geen zorgen hoeft te maken over cruciale details.' },
        { step: '05', title: 'Inwoonondersteuning', desc: 'Onze service loopt door tot ver na de verhuisdag. We helpen met nutsvoorzieningen, internet, lokale registraties en introducties tot essentiële diensten. We voorzien u van buurtgidsen, adviseren restaurants en diensten en blijven beschikbaar voor vragen terwijl u zich settelt in het Amsterdamse leven.' }
      ],
      benefitsTitle: 'Waarom expats voor Hakkenbroek kiezen',
      benefits: [
        { title: 'Culturele brug', desc: 'We begrijpen de expat-ervaring omdat we honderden internationale klanten hebben begeleid. Wij spreken uw taal — letterlijk en figuurlijk. Onze dienstverlening reikt verder dan onze kernregio — op verzoek begeleiden wij cliënten door heel Nederland.' },
        { title: 'Netwerktoegang', desc: 'In meer dan 25 jaar hebben we relaties opgebouwd met de beste dienstverleners van Amsterdam. Van hypotheekadviseurs tot interieurontwerpers, van scholen tot sportclubs — we koppelen u aan betrouwbare professionals die internationale klanten begrijpen.' },
        { title: 'Eerlijk advies', desc: 'We vertellen u wat u moet horen, niet alleen wat u wilt horen. Over budgetten, buurten en tijdlijnen. Onze reputatie is gebouwd op vertrouwen, en dat betekent eerlijk zijn — zelfs wanneer de waarheid ongemakkelijk is.' },
        { title: 'Langetermijnrelatie', desc: 'Veel van onze expat-klanten worden langetermijnvrienden. We vieren uw successen, ondersteunen u bij uitdagingen en blijven uw vastgoedadviseur in Amsterdam voor jaren. Uw succes in Amsterdam is ons succes.' }
      ],
      ctaTitle: 'Plant u een verhuizing naar Amsterdam?',
      ctaText: 'Neem contact met ons op om uw relocatietijdlijn en wensen te bespreken. We leggen uit hoe onze service werkt, wat u kunt verwachten en hoe wij uw overgang naar Amsterdam zo soepel mogelijk maken.',
      ctaButton: 'Start uw reis',
      backToServices: 'Terug naar Diensten'
    }
  };
  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Expat Relocation Service Amsterdam',
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
      <Script id='expat-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='/services-expat.webp'
              alt='Amsterdam canals with historic houses at sunset'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-earth/45' />
          </div>
          <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-white'>
            <p className='font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4'>{t.heroSubtitle}</p>
            <h1 className='font-display text-4xl md:text-6xl lg:text-7xl leading-tight max-w-4xl'>{t.heroTitle}</h1>
            <p className='font-body text-lg text-stone-200 max-w-2xl mt-6 leading-relaxed'>{t.heroDescription}</p>
          </div>
        </section>

        <section className='py-24 bg-stone-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl'>
              <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-8'>{t.introTitle}</h2>
              <p className='text-warm-gray leading-relaxed text-lg'>{t.introText}</p>
            </div>
          </div>
        </section>

        <section className='py-24 bg-stone-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-16 text-center'>{t.processTitle}</h2>
            <div className='space-y-12 max-w-4xl mx-auto'>
              {t.steps.map((s) => (
                <div key={s.step} className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start'>
                  <div className='md:col-span-2'>
                    <span className='font-display text-4xl text-brass'>{s.step}</span>
                  </div>
                  <div className='md:col-span-10'>
                    <h3 className='font-display text-2xl text-charcoal mb-3'>{s.title}</h3>
                    <p className='text-warm-gray leading-relaxed'>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-24 bg-stone-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='font-display text-3xl md:text-4xl text-charcoal mb-16 text-center'>{t.benefitsTitle}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
              {t.benefits.map((b) => (
                <div key={b.title} className='border-t border-stone-200 pt-8'>
                  <h3 className='font-display text-xl text-charcoal mb-3'>{b.title}</h3>
                  <p className='text-warm-gray leading-relaxed'>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-24 bg-earth text-white'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl mb-6'>{t.ctaTitle}</h2>
            <p className='text-stone-100/85 text-lg mb-10 leading-relaxed'>{t.ctaText}</p>
            <Link href={`/contact`} className='inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
              {t.ctaButton}
            </Link>
          </div>
        </section>

        <section className='py-16 bg-stone-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Link 
              href={`/services`} 
              className='inline-flex items-center gap-3 text-charcoal hover:text-brass transition-colors duration-300 font-body text-sm uppercase tracking-[0.15em] group'
            >
              <span className='transform group-hover:-translate-x-1 transition-transform duration-300'>←</span>
              <span className='border-b border-charcoal/30 group-hover:border-brass transition-colors duration-300 pb-0.5'>{t.backToServices}</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

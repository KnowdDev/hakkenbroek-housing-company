'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function LeasingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Lease Management',
      heroTitle: 'Long-term lease management for discerning landlords',
      heroDescription: 'We manage your property as if it were our own. From tenant selection to rent collection legal compliance to maintenance coordination we handle every aspect of long-term leasing with precision and care.',
      introTitle: 'Position your property for the right market',
      introText: 'With a tailored marketing approach, exclusive private viewings, and access to an international network of qualified tenants, we present your property to the right audience. We do not stop at offering properties — we present them in a way that does justice to their unique character and value.',
      processTitle: 'Our lease management process',
      steps: [
        { step: '01', title: 'Property Assessment', desc: 'We begin with a thorough assessment of your property. We evaluate its rental potential identify any maintenance or improvement needs and recommend positioning strategies to attract quality tenants and achieve optimal rent.' },
        { step: '02', title: 'Tenant Selection', desc: 'We conduct rigorous tenant screening including credit checks employment verification reference checks and personal interviews. We do not just find tenants. We find the right tenants tenants who will respect your property and fulfill their obligations.' },
        { step: '03', title: 'Lease Administration', desc: 'We handle all lease documentation ensuring compliance with Dutch rental law and protecting your interests. We manage rent collection conduct regular inspections and maintain detailed financial records so you always know exactly how your investment is performing.' },
        { step: '04', title: 'Maintenance Coordination', desc: 'When maintenance is needed we coordinate the response. We have established relationships with trusted contractors and tradespeople ensuring quality work at fair prices. For emergencies we provide 24/7 response so your tenants and your property are always protected.' },
        { step: '05', title: 'Ongoing Management', desc: 'Our service continues throughout the tenancy. We conduct regular inspections manage renewals and terminations and provide you with detailed financial reporting. When the time comes to sell or re-let we advise on optimal timing and strategy.' }
      ],
      benefitsTitle: 'Why landlords choose Hakkenbroek',
      benefits: [
        { title: 'Peace of Mind', desc: 'We handle every aspect of tenancy management so you do not have to. From late-night emergencies to lease renewals we are your single point of contact for everything related to your property.' },
        { title: 'Quality Tenants', desc: 'Our rigorous screening process ensures that only reliable respectful tenants occupy your property. This reduces wear and tear minimizes arrears and creates a stable long-term income stream.' },
        { title: 'Legal Protection', desc: 'Dutch rental law is complex and constantly evolving. We ensure your leases comply with all current regulations protecting you from costly disputes and legal challenges.' },
        { title: 'Financial Transparency', desc: 'You receive regular detailed financial reports showing income expenses and net yield. No hidden fees no surprises. Just clear transparent management of your investment.' }
      ],
      ctaTitle: 'Ready to lease your property?',
      ctaText: 'Contact us for a confidential discussion about your property and our lease management services. We will explain our process our fees and how we can help you achieve the best returns from your investment.',
      ctaButton: 'Discuss Management',
      backToServices: 'Back to Services'
    },
    nl: {
      heroSubtitle: 'Verhuurbeheer',
      heroTitle: 'Langdurig verhuurbeheer voor kritische verhuurders',
      heroDescription: 'Wij beheren uw woning alsof het onze eigen is. Van huurdersselectie tot incasso, juridische naleving tot onderhoudscoördinatie — wij behartigen elk aspect van langdurige verhuur met precisie en zorg.',
      introTitle: 'Positioneer uw woning voor de juiste markt',
      introText: 'Met een op maat gemaakte marketingaanpak, exclusieve privébezichtigingen en toegang tot een internationaal netwerk van gekwalificeerde huurders brengen wij uw woning onder de aandacht bij de juiste doelgroep. Wij beperken ons niet tot het aanbieden van woningen — wij presenteren ze op een manier die recht doet aan hun unieke karakter en waarde.',
      processTitle: 'Ons verhuurbeheerproces',
      steps: [
        { step: '01', title: 'Woningassessment', desc: 'We beginnen met een grondige beoordeling van uw woning. We bepalen de huurpotentie, identificeren onderhouds- of verbeterbehoeften en adviseren over positionering om kwalitatieve huurders te trekken en de optimale huur te realiseren.' },
        { step: '02', title: 'Huurdersselectie', desc: 'We voeren een zorgvuldige screening uit inclusief kredietchecks, werkgeversverificatie, referentiechecks en persoonlijke gesprekken. We vinden niet zomaar huurders — we vinden dé juiste huurders die uw woning respecteren en hun verplichtingen nakomen.' },
        { step: '03', title: 'Contractadministratie', desc: 'We verzorgen alle huurdocumentatie, zorgen voor naleving van de Nederlandse huurwetgeving en beschermen uw belangen. We beheren incasso, voeren reguliere inspecties uit en houden gedetailleerde financiële administratie bij zodat u altijd precies weet hoe uw investering presteert.' },
        { step: '04', title: 'Onderhoudscoördinatie', desc: 'Bij onderhoud coördineren wij het gehele proces. We hebben jarenlange relaties met betrouwbare aannemers en vakmensen die kwalitatief werk leveren tegen eerlijke prijzen. Bij noodgevallen bieden we 24/7 ondersteuning zodat uw huurders en uw woning altijd beschermd zijn.' },
        { step: '05', title: 'Doorlopend beheer', desc: 'Onze service loopt door gedurende de gehele huurperiode. We voeren reguliere inspecties uit, beheren verlengingen en opzeggingen en voorzien u van gedetailleerde financiële rapportages. Wanneer de tijd rijp is om te verkopen of opnieuw te verhuren, adviseren wij over optimaal timing en strategie.' }
      ],
      benefitsTitle: 'Waarom verhuurders voor Hakkenbroek kiezen',
      benefits: [
        { title: 'Gemoedsrust', desc: 'Wij regelen elk aspect van het huurdersbeheer zodat u zich daar geen zorgen over hoeft te maken. Van noodgevallen in de nacht tot contractverlengingen — wij zijn uw enige aanspreekpunt voor alles wat met uw woning te maken heeft.' },
        { title: 'Kwalitatieve huurders', desc: 'Onze strenge screening zorgt ervoor dat alleen betrouwbare, respectvolle huurders uw woning bewonen. Dit vermindert slijtage, minimaliseert achterstanden en creëert een stabiele, langdurige inkomstenbron.' },
        { title: 'Juridische bescherming', desc: 'De Nederlandse huurwetgeving is complex en voortdurend in ontwikkeling. Wij zorgen ervoor dat uw huurcontracten voldoen aan alle actuele regelgeving, zodat u beschermd bent tegen kostbare geschillen en juridische uitdagingen.' },
        { title: 'Financiële transparantie', desc: 'U ontvangt regelmatig gedetailleerde financiële rapportages met inkomsten, uitgaven en netto rendement. Geen verborgen kosten, geen verrassingen. Alleen helder, transparant beheer van uw investering.' }
      ],
      ctaTitle: 'Klaar om uw woning te verhuren?',
      ctaText: 'Neem contact met ons op voor een vertrouwelijk gesprek over uw woning en onze verhuurservices. We leggen ons proces, ons tarief en hoe wij u helpen het beste rendement uit uw investering te halen uit.',
      ctaButton: 'Bespreek verhuur',
      backToServices: 'Terug naar Diensten'
    }
  };
  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Property Lease Management Amsterdam',
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
      <Script id='leasing-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='/services-leasing.webp'
              alt='Well-maintained historic property exterior'
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

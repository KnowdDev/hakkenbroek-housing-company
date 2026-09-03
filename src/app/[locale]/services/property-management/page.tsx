'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function PropertyManagementPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Property Management',
      heroTitle: 'Comprehensive management for investors and absentee owners',
      heroDescription: 'From maintenance to financial reporting we protect your asset as if it were our own. Whether you own a single investment property or a portfolio across Amsterdam our management service ensures peace of mind and optimal returns.',
      introTitle: 'The Hakkenbroek approach to property management',
      introText: 'Property ownership should be a source of wealth and security not a source of stress. Yet many investors and absentee owners find themselves overwhelmed by the day-to-day demands of property management. Our comprehensive service handles every aspect of property oversight from routine maintenance to emergency repairs financial reporting to regulatory compliance.',
      processTitle: 'Our management services',
      steps: [
        { step: '01', title: 'Property Inspection and Onboarding', desc: 'We begin with a thorough inspection of your property documenting its condition creating a maintenance schedule and identifying any immediate needs. We establish clear reporting lines and communication protocols so you are always informed.' },
        { step: '02', title: 'Maintenance Management', desc: 'We coordinate all routine and emergency maintenance through our network of trusted contractors. From plumbing and electrical to landscaping and cleaning we ensure your property is maintained to the highest standards protecting its value and appeal.' },
        { step: '03', title: 'Financial Administration', desc: 'We manage all property-related finances including rent collection expense tracking and vendor payments. You receive regular detailed financial reports showing income expenses and net performance. We also handle tax documentation and insurance administration.' },
        { step: '04', title: 'Tenant Relations', desc: 'We serve as the primary point of contact for tenants handling inquiries requests and issues promptly and professionally. Our responsive approach maintains positive tenant relationships reduces turnover and protects your rental income.' },
        { step: '05', title: 'Strategic Advisory', desc: 'Beyond day-to-day management we provide strategic advice on property improvements market positioning and optimal timing for sale or re-letting. We help you maximize the long-term value of your investment.' }
      ],
      benefitsTitle: 'Why owners choose Hakkenbroek management',
      benefits: [
        { title: 'Complete Oversight', desc: 'We handle every aspect of property management so you do not have to coordinate multiple vendors or respond to tenant requests. One point of contact. Complete accountability.' },
        { title: 'Trusted Contractors', desc: 'We have established relationships with Amsterdam finest tradespeople and contractors. Quality work fair pricing and reliable service are guaranteed.' },
        { title: 'Financial Clarity', desc: 'Our detailed financial reporting gives you complete visibility into your property performance. Income expenses net yield and capital appreciation all tracked and reported clearly.' },
        { title: 'Legal Compliance', desc: 'We ensure your property complies with all Dutch regulations from safety standards to tenancy laws. We stay current on regulatory changes so you do not have to.' }
      ],
      ctaTitle: 'Ready for hassle-free property management?',
      ctaText: 'Contact us to discuss your property and our management services. We will explain our process our fee structure and how we can help you achieve the best returns with the least stress.',
      ctaButton: 'Discuss Management',
      backToServices: 'Back to Services'
    },
    nl: {
      heroSubtitle: 'Vastgoedbeheer',
      heroTitle: 'Uitgebreid beheer voor investeerders en eigenaren in het buitenland',
      heroDescription: 'Van onderhoud tot financiële rapportage: wij beschermen uw bezit alsof het ons eigen is. Of u nu één investeringswoning bezit of een portfolio door heel Amsterdam, ons beheer garandeert gemoedsrust en optimaal rendement.',
      introTitle: 'De Hakkenbroek aanpak voor vastgoedbeheer',
      introText: 'Eigendom zou een bron van welvaart en zekerheid moeten zijn, geen bron van stress. Toch raken veel investeerders en eigenaren in het buitenland overweldigd door de dagelijkse eisen van vastgoedbeheer. Onze uitgebreide service behartigt elk aspect van woningtoezicht, van routinematig onderhoud tot noodgevallen, financiële rapportage tot regelgevende naleving.',
      processTitle: 'Onze beheerservices',
      steps: [
        { step: '01', title: 'Woninginspectie en onboarding', desc: 'We beginnen met een grondige inspectie van uw woning, documenteren de staat, stellen een onderhoudsplan op en identificeren directe behoeften. We leggen duidelijke communicatielijnen en rapportageafspraken vast zodat u altijd op de hoogte bent.' },
        { step: '02', title: 'Onderhoudsmanagement', desc: 'We coördineren alle reguliere en calamiteitonderhoud via ons netwerk van betrouwbare aannemers. Van loodgieters en elektriciens tot hoveniers en schoonmaak: we zorgen ervoor dat uw woning naar de hoogste standaard wordt onderhouden, zodat de waarde en aantrekkingskracht behouden blijven.' },
        { step: '03', title: 'Financiële administratie', desc: 'We beheren alle vastgoedgerelateerde financiën inclusief incasso, kostenregistratie en leveranciersbetalingen. U ontvangt regelmatig gedetailleerde financiële rapportages met inkomsten, uitgaven en netto prestaties. We verzorgen ook fiscale documentatie en verzekeringsadministratie.' },
        { step: '04', title: 'Huurdersrelaties', desc: 'Wij fungeren als primair aanspreekpunt voor huurders en behandelen vragen, verzoeken en kwesties snel en professioneel. Onze proactieve aanpak onderhoudt positieve huurdersrelaties, vermindert leegstand en beschermt uw huurinkomsten.' },
        { step: '05', title: 'Strategisch advies', desc: 'Naast dagelijks beheer bieden wij strategisch advies over woningverbeteringen, marktpositionering en optimaal timing voor verkoop of herverhuur. We helpen u de langetermijnwaarde van uw investering te maximaliseren.' }
      ],
      benefitsTitle: 'Waarom eigenaren voor Hakkenbroek beheer kiezen',
      benefits: [
        { title: 'Volledig toezicht', desc: 'Wij behartigen elk aspect van vastgoedbeheer zodat u niet zelf meerdere leveranciers hoeft te coördineren of op huurdersverzoeken hoeft te reageren. Één aanspreekpunt. Volledige verantwoordelijkheid.' },
        { title: 'Betrouwbare aannemers', desc: 'We hebben jarenlange relaties met de beste vakmensen en aannemers van Amsterdam. Kwalitatief werk, eerlijke prijzen en betrouwbare service zijn gegarandeerd.' },
        { title: 'Financiële helderheid', desc: 'Onze gedetailleerde financiële rapportages geven u volledig inzicht in de prestaties van uw woning. Inkomsten, uitgaven, netto rendement en waardestijging: alles duidelijk bijgehouden en gerapporteerd.' },
        { title: 'Juridische naleving', desc: 'We zorgen ervoor dat uw woning voldoet aan alle Nederlandse regelgeving, van veiligheidsnormen tot huurwetgeving. We volgen wijzigingen in de regelgeving zodat u dat niet hoeft te doen.' }
      ],
      ctaTitle: 'Klaar voor zorgeloos vastgoedbeheer?',
      ctaText: 'Neem contact met ons op om uw woning en onze beheerservices te bespreken. We leggen ons proces, ons tarief en hoe wij u helpen het beste rendement te behalen met de minste stress uit.',
      ctaButton: 'Bespreek beheer',
      backToServices: 'Terug naar Diensten'
    }
  };
  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Property Management Service Amsterdam',
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
      <Script id='management-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='/services-property-management.webp'
              alt='Well-maintained luxury property with garden'
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

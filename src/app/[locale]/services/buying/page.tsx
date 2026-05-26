'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function BuyingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Buyer Representation',
      heroTitle: 'Acquire Amsterdam finest properties with discretion',
      heroDescription: 'We represent buyers with precision access and confidentiality that no public portal can offer. From canal house to penthouse we find what others cannot.',
      introTitle: 'The Hakkenbroek approach to buying',
      introText: 'Buying property in Amsterdam is competitive. In 2026 65-70% of homes sell above asking price. The most exceptional properties often change hands without ever appearing on Funda. Our role is to give you an unfair advantage access intelligence and negotiation power that comes from 25+ years of Amsterdam market mastery.',
      processTitle: 'How we work for buyers',
      steps: [
        { step: '01', title: 'Consultation and Briefing', desc: 'We begin with a confidential conversation at our Leliegracht office. We listen to your ambitions understand your budget and timeline and define exactly what you are looking for.' },
        { step: '02', title: 'Market Intelligence', desc: 'We activate our network. Many properties we source are not listed anywhere. We reach out to owners other agents and our contacts across Amsterdams property ecosystem to find matches before they reach the market.' },
        { step: '03', title: 'Curated Viewings', desc: 'We arrange private viewings of only the properties that genuinely meet your criteria. No endless open-house days. No wasted time. Every viewing is pre-qualified against your brief.' },
        { step: '04', title: 'Strategic Negotiation', desc: 'When you find the right property we negotiate on your behalf with full market intelligence. We know what comparable properties have sold for what the sellers position is and where the real negotiating room lies.' },
        { step: '05', title: 'Due Diligence and Closing', desc: 'We coordinate the full legal financial and notarial process. Building inspection valuation mortgage coordination and transfer at the notary we manage every detail until the keys are in your hand.' }
      ],
      benefitsTitle: 'Why buyers choose Hakkenbroek',
      benefits: [
        { title: 'Off-Market Access', desc: 'Our network gives you access to properties that never appear on Funda or Pararius. In Amsterdams competitive market this is the difference between finding your dream home and missing it entirely.' },
        { title: 'Market Intelligence', desc: '25+ years of transaction data informs every recommendation. We know what a property is truly worth not just what the asking price suggests.' },
        { title: 'Negotiation Power', desc: 'We negotiate from a position of strength. Sellers and their agents know that a Hakkenbroek buyer is serious qualified and represented by professionals who understand the game.' },
        { title: 'Full-Service Coordination', desc: 'From mortgage advisors to notaries from building inspectors to interior designers we coordinate the entire ecosystem so you can focus on the excitement of your new home.' }
      ],
      ctaTitle: 'Begin your property search',
      ctaText: 'Visit us at Leliegracht 21 for a confidential consultation. No obligation. Just an honest conversation about what is possible in todays Amsterdam market.',
      ctaButton: 'Arrange a Consultation',
      backToServices: 'Back to Services'
    }
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
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
              alt='Luxury Amsterdam canal house interior'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-charcoal/45' />
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
        <section className='py-24 bg-charcoal text-white'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='font-display text-3xl md:text-4xl mb-6'>{t.ctaTitle}</h2>
            <p className='text-stone-300 text-lg mb-10 leading-relaxed'>{t.ctaText}</p>
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

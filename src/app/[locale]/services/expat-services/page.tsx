'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
      introText: 'We have spent two decades helping international clients find their place in Amsterdam. We understand that relocation is not just about finding a property. It is about navigating a new culture a new language a new way of life. Our comprehensive service addresses every aspect of your move so you can focus on what matters most starting your new chapter with confidence.',
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
        { title: 'Cultural Bridge', desc: 'We understand the expat experience because we have guided hundreds of international clients through it. We speak your language literally and culturally and we bridge the gap between your expectations and Dutch realities.' },
        { title: 'Network Access', desc: 'Over two decades we have built relationships with the best service providers in Amsterdam. From mortgage brokers to interior designers from schools to sports clubs we connect you with trusted professionals who understand international clients.' },
        { title: 'Honest Guidance', desc: 'We tell you what you need to hear not just what you want to hear. About budgets about neighborhoods about timelines. Our reputation is built on trust and that means being honest even when the truth is uncomfortable.' },
        { title: 'Long-Term Relationship', desc: 'Many of our expat clients become long-term friends. We celebrate your successes support you through challenges and remain your Amsterdam property resource for years to come. Your success in Amsterdam is our success.' }
      ],
      ctaTitle: 'Planning a move to Amsterdam?',
      ctaText: 'Contact us to discuss your relocation timeline and requirements. We will explain how our service works what to expect and how we can make your transition to Amsterdam as smooth as possible.',
      ctaButton: 'Start Your Journey',
      backToServices: 'Back to Services'
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
      <Script id='expat-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1517732306149-e8f829eb588a?auto=format&fit=crop&w=1920&q=80'
              alt='Amsterdam canals with historic houses at sunset'
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
            <Link href={`/${locale}/contact`} className='inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300'>
              {t.ctaButton}
            </Link>
          </div>
        </section>

        <section className='py-16 bg-stone-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Link 
              href={`/${locale}/services`} 
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

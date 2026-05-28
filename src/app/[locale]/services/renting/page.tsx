'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function RentingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Rental Service',
      heroTitle: 'Curated rental properties for discerning tenants',
      heroDescription: 'We represent tenants with the same discretion and precision we apply to buyers. Whether you are relocating for work or seeking a temporary Amsterdam home we find properties that meet your standards not just your budget.',
      introTitle: 'The Hakkenbroek approach to renting',
      introText: 'Finding quality rental property in Amsterdam is increasingly competitive. The best listings are often leased within days sometimes hours of appearing online. Our rental service gives you early access to carefully selected properties and handles every detail from viewing to contract signing so you can focus on your move.',
      processTitle: 'How we work for tenants',
      steps: [
        { step: '01', title: 'Needs Assessment', desc: 'We begin with a detailed conversation about your requirements. Location preferences lease duration budget and must-have features. We also discuss your timeline so we can prioritize properties that align with your move dates.' },
        { step: '02', title: 'Curated Search', desc: 'We search our portfolio and network for properties that match your criteria. Unlike public portals where you sift through hundreds of listings we present only properties that genuinely fit your needs typically 3-5 carefully selected options.' },
        { step: '03', title: 'Private Viewings', desc: 'We arrange private viewings at times that work for your schedule. We accompany you to each viewing providing context about the property the neighborhood and the landlord. No rushed open houses no competing with dozens of other applicants.' },
        { step: '04', title: 'Application Support', desc: 'We guide you through the application process ensuring your documentation is complete and presented in the most favorable light. We know what landlords look for and we help you present yourself as the ideal tenant.' },
        { step: '05', title: 'Contract and Move-In', desc: 'We review the lease agreement with you explaining all terms in plain language. We coordinate the key handover inventory check and any necessary setup. Our support continues through your first month to ensure a smooth transition.' }
      ],
      benefitsTitle: 'Why tenants choose Hakkenbroek',
      benefits: [
        { title: 'Early Access', desc: 'Our network gives you access to rental properties before they appear on public portals. In a market where the best properties lease within days this head start is invaluable.' },
        { title: 'Quality Assurance', desc: 'Every property in our rental portfolio has been personally inspected by our team. We verify the condition the landlord and the legal standing so you do not encounter surprises after signing.' },
        { title: 'Application Strength', desc: 'A Hakkenbroek application carries weight. Landlords know we represent serious reliable tenants. We present your application professionally and follow up personally giving you the best chance of securing your preferred property.' },
        { title: 'Ongoing Support', desc: 'Our relationship does not end at key handover. We remain available throughout your tenancy for questions concerns or assistance with maintenance issues. Think of us as your property concierge.' }
      ],
      ctaTitle: 'Start your rental search',
      ctaText: 'Contact us to discuss your rental requirements. We will listen to your needs and begin searching for properties that genuinely match your criteria.',
      ctaButton: 'Discuss Your Needs',
      backToServices: 'Back to Services'
    }
  };
  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rental Property Service Amsterdam',
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
      <Script id='renting-jsonld' type='application/ld+json' strategy='afterInteractive'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='min-h-screen'>
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='/services-renting.webp'
              alt='Modern apartment interior with city views'
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

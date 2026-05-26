'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Script from 'next/script';

export default function SellingPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const content = {
    en: {
      heroSubtitle: 'Seller Representation',
      heroTitle: 'Position your property for the market it deserves',
      heroDescription: 'We position your property for the market it deserves. Bespoke marketing private viewings and access to qualified international buyers who understand rarity.',
      introTitle: 'The Hakkenbroek approach to selling',
      introText: 'Selling a property in Amsterdam requires more than a listing on Funda. In 2026 the market is fiercely competitive with 65-70% of properties selling above asking price. To achieve the best outcome your property needs positioning marketing and access to buyers who are not just browsing but are genuinely ready to invest in Amsterdam finest.',
      processTitle: 'How we market your property',
      steps: [
        { step: '01', title: 'Valuation and Strategy', desc: 'We begin with a comprehensive valuation based on comparable sales market trends and the unique qualities of your property. We then develop a bespoke marketing strategy tailored to the buyers most likely to appreciate what your property offers.' },
        { step: '02', title: 'Professional Presentation', desc: 'First impressions are everything. We coordinate professional photography cinematic video tours and home styling consultation to present your property at its absolute best. Every image every frame tells a story.' },
        { step: '03', title: 'Targeted Marketing', desc: 'Your property is showcased to qualified buyers through our international network private client database and selective digital presence. We do not broadcast. We curate. The right buyers see your property at the right time.' },
        { step: '04', title: 'Private Viewings', desc: 'We arrange private viewings for pre-qualified buyers. No open houses. No casual browsers. Every viewer has been assessed for genuine interest financial capability and fit with your property profile.' },
        { step: '05', title: 'Negotiation and Closing', desc: 'We handle all negotiations with full transparency and your best interests at heart. From initial offer to notarial transfer we manage the process to secure optimal terms while protecting your position.' }
      ],
      benefitsTitle: 'Why sellers choose Hakkenbroek',
      benefits: [
        { title: 'International Buyer Network', desc: 'Our network extends across Europe the Americas Asia and the Middle East. Your property reaches qualified high-net-worth individuals who are actively seeking Amsterdam real estate.' },
        { title: 'Bespoke Marketing', desc: 'Every property receives a tailored marketing strategy. From editorial-style photography to targeted digital campaigns we ensure your property stands apart in a crowded market.' },
        { title: 'Discreet Representation', desc: 'For sensitive sales or high-profile owners we offer confidential marketing. Your property can be presented to select buyers without public exposure protecting your privacy while achieving the best price.' },
        { title: 'Market Intelligence', desc: 'We know what comparable properties have achieved and what current buyers are seeking. Our pricing and positioning strategy is informed by real data not guesswork.' }
      ],
      ctaTitle: 'Ready to sell your property?',
      ctaText: 'Contact us for a complimentary valuation and confidential discussion about your property and the current market. No obligation. Just expert insight.',
      ctaButton: 'Request a Valuation',
      backToServices: 'Back to Services'
    }
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
        <section className='relative h-[60vh] min-h-[450px] flex items-end overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80'
              alt='Elegant Amsterdam property exterior at golden hour'
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
'use client';

import { Metadata } from 'next';
import { useTranslations } from '@/hooks/useTranslations';
import { usePathname } from 'next/navigation';

export default function ServicesPage() {
  const { t, tArray } = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const services = [
    {
      title: t('services.buying.title'),
      description: t('services.buying.description'),
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      features: tArray('services.buying.features'),
    },
    {
      title: t('services.selling.title'),
      description: t('services.selling.description'),
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      features: tArray('services.selling.features'),
    },
    {
      title: t('services.renting.title'),
      description: t('services.renting.description'),
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      features: tArray('services.renting.features'),
    },
    {
      title: t('services.leasing.title'),
      description: t('services.leasing.description'),
      image:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      features: tArray('services.leasing.features'),
    },
  ];

  const managementFeatures = tArray('services.management.features');
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            {t('services.heroSubtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t('services.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
            {t('services.introLabel')}
          </p>
          <p className="text-warm-gray leading-relaxed text-lg">
            {t('services.introText')}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:col-start-7' : ''}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
                }`}
              >
                <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-3">
                  0{index + 1}
                </p>
                <h2 className="font-display text-3xl text-charcoal mb-6">
                  {service.title}
                </h2>
                <p className="text-warm-gray leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-warm-gray"
                    >
                      <span className="text-brass mr-3 mt-1">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Management — Full width */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
                05
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                {t('services.management.title')}
              </h2>
              <p className="text-stone-300 leading-relaxed mb-10">
                {t('services.management.description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {managementFeatures.map((item) => (
                  <div key={item} className="flex items-start text-stone-300">
                    <span className="text-brass-light mr-3">—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                alt="Property management"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t('services.ctaText')}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t('services.ctaButton')}
          </a>
        </div>
      </section>
    </div>
  );
}

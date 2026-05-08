'use client';

import { Metadata } from 'next';
import { useTranslations } from '@/hooks/useTranslations';

export default function AboutPage() {
  const { t } = useTranslations();

  const values = [
    {
      num: '01',
      title: t('about.trust'),
      desc: t('about.trustDesc'),
    },
    {
      num: '02',
      title: t('about.personal'),
      desc: t('about.personalDesc'),
    },
    {
      num: '03',
      title: t('about.expertise'),
      desc: t('about.expertiseDesc'),
    },
    {
      num: '04',
      title: t('about.global'),
      desc: t('about.globalDesc'),
    },
    {
      num: '05',
      title: t('about.quality'),
      desc: t('about.qualityDesc'),
    },
    {
      num: '06',
      title: t('about.relationships'),
      desc: t('about.relationshipsDesc'),
    },
  ];

  const stats = [
    { value: '20+', label: t('about.stats.years') },
    { value: '8.0', label: t('about.stats.rating') },
    { value: '19+', label: t('about.stats.clients') },
    { value: '15+', label: t('about.stats.areas') },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam canals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            {t('about.story')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t('about.headline')}
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Elegant interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                {t('about.who')}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8 leading-snug">
                {t('about.headline')}
              </h2>
              <div className="space-y-6 text-warm-gray leading-relaxed">
                <p>{t('about.description1')}</p>
                <p>{t('about.description2')}</p>
                <p>{t('about.description3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Editorial list */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
              {t('about.valuesTitle')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {t('about.values')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {values.map((value) => (
              <div key={value.num} className="group">
                <span className="font-body text-xs text-stone-400 tracking-wider mb-3 block">
                  {value.num}
                </span>
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-brass transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-brass mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-stone-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            {t('about.cta')}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t('about.ctaDesc')}
          </p>
          <a
            href="mailto:info@hakkenbroek.com"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t('about.contactBtn')}
          </a>
        </div>
      </section>
    </div>
  );
}

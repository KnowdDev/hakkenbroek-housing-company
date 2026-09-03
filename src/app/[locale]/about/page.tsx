'use client';

import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      story: 'Our Heritage',
      headline: 'More than 25 years of discretion in the finest homes',
      who: 'Who We Are',
      description1: 'Since 2000, Hakkenbroek Housing Company has thoughtfully shaped the landscape of luxury and contemporary property. From our office on Leliegracht we have, for decades, guided discerning clients through the city’s most meaningful property transactions, always with discretion, always with care.',
      description2: 'We are not a volume agency. We are a trusted advisor. Our team combines deep-rooted knowledge of the property market with an international perspective, serving buyers and sellers from the Netherlands, across Europe, and beyond. We speak your language, in every sense of the word.',
      description3: 'Our expertise extends beyond ordinary brokerage. We specialise in monuments, higher-segment new build, villas, and the restoration of canal houses, as well as the complex regulations around protected cityscapes and country estates. We also advise on home styling that respects architectural heritage while creating space for contemporary comfort and living.',
      valuesTitle: 'What Guides Us',
      values: 'Our Principles',
      trust: 'Discretion & Trust',
      trustDesc: 'Confidentiality is the foundation of every relationship. Everything discussed in our office stays in our office.',
      personal: 'Personal Dedication',
      personalDesc: 'We work with a limited number of clients at a time. That is how we guarantee full attention and access to our best network.',
      expertise: 'Market Insight',
      expertiseDesc: 'More than 25 years of transactions give us insight that goes beyond data alone. We understand what a home is worth, and what it can become.',
      global: 'International Reach',
      globalDesc: 'We represent homes to an international audience of qualified buyers from Amsterdam, London, Paris, Milan, New York, Singapore and beyond.',
      quality: 'Curated Portfolio',
      qualityDesc: 'We are selective about the homes we take on. If we would not recommend a property to distinguished clients, we will not take it into our portfolio.',
      relationships: 'Lifetime Relationships',
      relationshipsDesc: 'Most clients return. For us a transaction is never merely a transaction, but the beginning of a lasting relationship.',
      stats: { years: 'Years on the Market', transactions: 'Properties Sold & Let', languages: 'Languages Spoken', office: 'Office in Amsterdam' },
      cta: 'Begin a conversation',
      ctaDesc: 'Visit us at Leliegracht 21. No obligation. Complete discretion. Just an honest conversation about your property ambitions.',
      contactBtn: 'Arrange a Meeting'
    },
    nl: {
      story: 'Ons Erfgoed',
      headline: 'Al meer dan 25 jaar discretie in de mooiste woningen',
      who: 'Wie Wij Zijn',
      description1: 'Sinds 2000 geeft Hakkenbroek Housing Company op doordachte wijze vorm aan het luxe en hedendaagse vastgoedlandschap. Vanuit ons kantoor aan de Leliegracht begeleiden wij al decennialang veeleisende cliënten bij de meest betekenisvolle vastgoedtransacties van de stad, altijd met discretie, altijd met zorg.',
      description2: 'Wij zijn geen volume-kantoor. Wij zijn een vertrouwde adviseur. Ons team combineert diepgewortelde kennis van de vastgoedmarkt met een internationaal perspectief en bedient kopers en verkopers uit Nederland, Europa en daarbuiten. Wij spreken uw taal, in elke betekenis van het woord.',
      description3: 'Onze expertise reikt verder dan reguliere makelaardij. Wij zijn gespecialiseerd in monumenten, hogere segment nieuwbouw, villa’s en de restauratie van grachtenpanden en de complexe regelgeving rondom beschermde stadsgezichten en landgoederen. Daarnaast adviseren wij over woningstyling die architectonisch erfgoed respecteert, terwijl zij tegelijkertijd ruimte creëert voor hedendaags comfort en wonen.',
      valuesTitle: 'Wat Ons Leidt',
      values: 'Onze Principes',
      trust: 'Discretie & Vertrouwen',
      trustDesc: 'Vertrouwelijkheid vormt de basis van elke relatie. Alles wat binnen ons kantoor wordt besproken, blijft binnen ons kantoor.',
      personal: 'Persoonlijke Toewijding',
      personalDesc: 'Wij werken met een beperkt aantal cliënten tegelijk. Zo garanderen wij volledige aandacht en toegang tot ons beste netwerk.',
      expertise: 'Marktinzicht',
      expertiseDesc: 'Meer dan 25 jaar ervaring in transacties geeft ons een inzicht dat verder gaat dan data alleen. Wij begrijpen wat een woning waard is, en wat deze kan worden.',
      global: 'Internationaal Bereik',
      globalDesc: 'Wij vertegenwoordigen woningen voor een internationaal publiek van gekwalificeerde kopers uit onder andere Amsterdam, Londen, Parijs, Milaan, New York en Singapore.',
      quality: 'Gecureerd Portfolio',
      qualityDesc: 'Wij zijn selectief in de woningen die wij opnemen. Als wij een woning niet zouden aanbevelen aan gerenommeerde klanten, nemen wij deze niet in portefeuille.',
      relationships: 'Levenslange Relaties',
      relationshipsDesc: 'De meeste cliënten keren terug. Voor ons is een transactie nooit slechts een transactie, maar het begin van een langdurige relatie.',
      stats: { years: 'Jaar op de Markt', transactions: 'Woningen Verkocht & Verhuurd', languages: 'Taalvaardigheid', office: 'Kantoor in Amsterdam' },
      cta: 'Begin een gesprek',
      ctaDesc: 'Bezoek ons aan de Leliegracht 21. Geen verplichting. Volledige discretie. Gewoon een eerlijk gesprek over uw vastgoedambities.',
      contactBtn: 'Maak een Afspraak'
    },
  };

  const t = content[locale as keyof typeof content] || content.en;
  const values = [
    { num: '01', title: t.trust, desc: t.trustDesc },
    { num: '02', title: t.personal, desc: t.personalDesc },
    { num: '03', title: t.expertise, desc: t.expertiseDesc },
    { num: '04', title: t.global, desc: t.globalDesc },
    { num: '05', title: t.quality, desc: t.qualityDesc },
    { num: '06', title: t.relationships, desc: t.relationshipsDesc },
  ];
  const stats = [
    { value: '25+', label: t.stats.years },
    { value: '2800+', label: t.stats.transactions },
    { value: '1', label: t.stats.office },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/about-hero.webp"
            alt="Amsterdam canals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-earth/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            {t.story}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t.headline}
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/about-home-2.webp"
                  alt="Elegant Amsterdam interior with natural light"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                {t.who}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8 leading-snug">
                {t.headline}
              </h2>
              <div className="space-y-6 text-warm-gray leading-relaxed">
                <p>{t.description1}</p>
                <p>{t.description2}</p>
                <p>{t.description3}</p>
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
              {t.valuesTitle}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              {t.values}
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
      <section className="py-24 bg-earth text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center place-items-center max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-stone-100 mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-stone-100/70">
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
            {t.cta}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t.ctaDesc}
          </p>
          <a
            href="mailto:info@hakkenbroek.com"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t.contactBtn}
          </a>
        </div>
      </section>
    </div>
  );
}

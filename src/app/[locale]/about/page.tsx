'use client';

import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      story: 'Our Heritage',
      headline: '25+ years of discretion in Amsterdam\'s finest properties',
      who: 'Who We Are',
      description1: 'Since 2000, Hakkenbroek Housing Company has quietly shaped Amsterdam\'s luxury real estate landscape. From our office on the Leliegracht, we have guided hundreds of discerning clients through the city\'s most significant property transactions — always with discretion, always with care.',
      description2: 'We are not a volume agency. We are a trusted advisor. Our team combines deep Amsterdam market knowledge with an international perspective, serving buyers and sellers from the Netherlands, across Europe, and beyond. We speak your language — literally and culturally.',
      description3: 'Our expertise extends beyond standard brokerage. We are specialists in Amsterdam\'s historic monuments, canal house restorations, and the unique regulations that govern listed buildings. We advise on home styling that honors architectural heritage while creating spaces for modern living.',
      valuesTitle: 'What Guides Us',
      values: 'Our Principles',
      trust: 'Discretion & Trust',
      trustDesc: 'Confidentiality is the foundation of every relationship. What is discussed in our office stays in our office.',
      personal: 'Personal Dedication',
      personalDesc: 'We take on a limited number of clients at any time. This ensures every client receives our full attention and the best of our network.',
      expertise: 'Market Intelligence',
      expertiseDesc: 'Over 25 years of Amsterdam transactions give us insight no algorithm can replicate. We know what a property is worth — and what it could be worth.',
      global: 'International Reach',
      globalDesc: 'Multilingual representation connecting Amsterdam properties with qualified buyers from London, New York, Singapore, and beyond.',
      quality: 'Curated Portfolio',
      qualityDesc: 'We are selective about the properties we represent. If we would not recommend it to a friend, we will not list it.',
      relationships: 'Lifetime Relationships',
      relationshipsDesc: 'Most of our clients return. Many become friends. A property transaction is never just a transaction — it is the beginning of a relationship.',
      stats: { years: 'Years on the Market', transactions: 'Properties Sold & Let', languages: 'Languages Spoken', office: 'Office in Amsterdam' },
      cta: 'Begin a conversation',
      ctaDesc: 'Visit us at Leliegracht 21. No obligation. Complete discretion. Just an honest conversation about your property ambitions.',
      contactBtn: 'Arrange a Meeting'
    },
    nl: {
      story: 'Ons Erfgoed',
      headline: 'Al 25+ jaar discretie in de mooiste woningen van Amsterdam',
      who: 'Wie Wij Zijn',
      description1: 'Sinds 2000 geeft Hakkenbroek Housing Company stilletjes vorm aan het luxe vastgoedlandschap van Amsterdam. Vanuit ons kantoor aan de Leliegracht hebben wij honderden veeleisende cliënten begeleid bij de meest significante vastgoedtransacties van de stad — altijd met discretie, altijd met zorg.',
      description2: 'Wij zijn geen volume-kantoor. Wij zijn een vertrouwde adviseur. Ons team combineert diepe Amsterdamse marktkennis met een internationaal perspectief, en bedient kopers en verkopers uit Nederland, Europa, en daarbuiten. Wij spreken uw taal — letterlijk en cultureel.',
      description3: 'Onze expertise reikt verder dan standaard makelaardij. Wij zijn specialisten in Amsterdamse monumenten, grachtenpandrestauraties, en de unieke regelgeving voor beschermde gebouwen. Wij adviseren over woningstyling die architectonisch erfgoed eert en tegelijk ruimtes creëert voor modern leven.',
      valuesTitle: 'Wat Ons Leidt',
      values: 'Onze Principes',
      trust: 'Discretie & Vertrouwen',
      trustDesc: 'Vertrouwelijkheid is de basis van elke relatie. Wat in ons kantoor wordt besproken, blijft in ons kantoor.',
      personal: 'Persoonlijke Toewijding',
      personalDesc: 'Wij nemen tegelijkertijd een beperkt aantal cliënten aan. Zo krijgt elke cliënt onze volledige aandacht en het beste van ons netwerk.',
      expertise: 'Marktintelligentie',
      expertiseDesc: 'Meer dan 25 jaar aan Amsterdamse transacties geven ons inzicht dat geen enkel algoritme kan evenaren. Wij weten wat een woning waard is — en wat het waard zou kunnen worden.',
      global: 'Internationaal Bereik',
      globalDesc: 'Meertalige vertegenwoordiging die Amsterdamse woningen verbindt met gekwalificeerde kopers uit Londen, New York, Singapore, en verder.',
      quality: 'Gecureerd Portfolio',
      qualityDesc: 'Wij zijn selectief in de woningen die wij vertegenwoordigen. Als wij het niet aan een vriend zouden aanbevelen, noteren wij het niet.',
      relationships: 'Levenslange Relaties',
      relationshipsDesc: 'De meeste van onze cliënten keren terug. Velen worden vrienden. Een vastgoedtransactie is nooit alleen een transactie — het is het begin van een relatie.',
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
    { value: '5000+', label: t.stats.transactions },
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
          <div className="absolute inset-0 bg-charcoal/40" />
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
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-stone-300 mb-2">
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

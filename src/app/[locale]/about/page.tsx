'use client';

import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      story: 'Our Heritage',
      headline: 'Two decades of discretion in Amsterdam\'s finest properties',
      who: 'Who We Are',
      description1: 'Since 2003, Hakkenbroek Housing Company has quietly shaped Amsterdam\'s luxury real estate landscape. From our office on the Leliegracht, we have guided hundreds of discerning clients through the city\'s most significant property transactions — always with discretion, always with care.',
      description2: 'We are not a volume agency. We are a trusted advisor. Our team combines deep Amsterdam market knowledge with an international perspective, serving buyers and sellers from the Netherlands, across Europe, and beyond. We speak your language — literally and culturally.',
      description3: 'Our expertise extends beyond standard brokerage. We are specialists in Amsterdam\'s historic monuments, canal house restorations, and the unique regulations that govern listed buildings. We advise on home styling that honors architectural heritage while creating spaces for modern living.',
      valuesTitle: 'What Guides Us',
      values: 'Our Principles',
      trust: 'Discretion & Trust',
      trustDesc: 'Confidentiality is the foundation of every relationship. What is discussed in our office stays in our office.',
      personal: 'Personal Dedication',
      personalDesc: 'We take on a limited number of clients at any time. This ensures every client receives our full attention and the best of our network.',
      expertise: 'Market Intelligence',
      expertiseDesc: 'Two decades of Amsterdam transactions give us insight no algorithm can replicate. We know what a property is worth — and what it could be worth.',
      global: 'International Reach',
      globalDesc: 'Multilingual representation connecting Amsterdam properties with qualified buyers from London, New York, Singapore, and beyond.',
      quality: 'Curated Portfolio',
      qualityDesc: 'We are selective about the properties we represent. If we would not recommend it to a friend, we will not list it.',
      relationships: 'Lifetime Relationships',
      relationshipsDesc: 'Most of our clients return. Many become friends. A property transaction is never just a transaction — it is the beginning of a relationship.',
      stats: { years: 'Years Experience', rating: 'Client Rating', clients: 'Happy Clients', areas: 'Areas Served' },
      cta: 'Begin a conversation',
      ctaDesc: 'Visit us at Leliegracht 21. No obligation. Complete discretion. Just an honest conversation about your property ambitions.',
      contactBtn: 'Arrange a Meeting'
    },
    nl: {
      story: 'Ons Erfgoed',
      headline: 'Twee decennia van discretie in Amsterdams mooiste woningen',
      who: 'Wie Wij Zijn',
      description1: 'Sinds 2003 geeft Hakkenbroek Housing Company stilletjes vorm aan het luxe vastgoedlandschap van Amsterdam. Vanuit ons kantoor aan de Leliegracht hebben wij honderden veeleisende cliënten begeleid bij de meest significante vastgoedtransacties van de stad — altijd met discretie, altijd met zorg.',
      description2: 'Wij zijn geen volume-kantoor. Wij zijn een vertrouwde adviseur. Ons team combineert diepe Amsterdamse marktkennis met een internationaal perspectief, en bedient kopers en verkopers uit Nederland, Europa, en daarbuiten. Wij spreken uw taal — letterlijk en cultureel.',
      description3: 'Onze expertise reikt verder dan standaard makelaardij. Wij zijn specialisten in Amsterdamse monumenten, grachtenpandrestauraties, en de unieke regelgeving voor beschermde gebouwen. Wij adviseren over woningstyling die architectonisch erfgoed eert en tegelijk ruimtes creëert voor modern leven.',
      valuesTitle: 'Wat Ons Leidt',
      values: 'Onze Principes',
      trust: 'Discretie & Vertrouwen',
      trustDesc: 'Vertrouwelijkheid is de basis van elke relatie. Wat in ons kantoor wordt besproken, blijft in ons kantoor.',
      personal: 'Persoonlijke Toewijding',
      personalDesc: 'Wij nemen tegelijkertijd een beperkt aantal cliënten aan. Zo krijgt elke cliënt onze volledige aandacht en het beste van ons netwerk.',
      expertise: 'Marktintelligentie',
      expertiseDesc: 'Twee decennia aan Amsterdamse transacties geven ons inzicht dat geen enkel algoritme kan evenaren. Wij weten wat een woning waard is — en wat het waard zou kunnen worden.',
      global: 'Internationaal Bereik',
      globalDesc: 'Meertalige vertegenwoordiging die Amsterdamse woningen verbindt met gekwalificeerde kopers uit Londen, New York, Singapore, en verder.',
      quality: 'Gecureerd Portfolio',
      qualityDesc: 'Wij zijn selectief in de woningen die wij vertegenwoordigen. Als wij het niet aan een vriend zouden aanbevelen, noteren wij het niet.',
      relationships: 'Levenslange Relaties',
      relationshipsDesc: 'De meeste van onze cliënten keren terug. Velen worden vrienden. Een vastgoedtransactie is nooit alleen een transactie — het is het begin van een relatie.',
      stats: { years: 'Jaren Ervaring', rating: 'Cliëntbeoordeling', clients: 'Tevreden Cliënten', areas: 'Gebieden' },
      cta: 'Begin een gesprek',
      ctaDesc: 'Bezoek ons aan de Leliegracht 21. Geen verplichting. Volledige discretie. Gewoon een eerlijk gesprek over uw vastgoedambities.',
      contactBtn: 'Maak een Afspraak'
    },
    es: {
      story: 'Nuestra Herencia',
      headline: 'Dos décadas de discreción en las mejores propiedades de Ámsterdam',
      who: 'Quiénes Somos',
      description1: 'Desde 2003, Hakkenbroek Housing Company ha moldeado silenciosamente el panorama inmobiliario de lujo de Ámsterdam. Desde nuestra oficina en Leliegracht, hemos guiado a cientos de clientes exigentes a través de las transacciones inmobiliarias más significativas de la ciudad — siempre con discreción, siempre con cuidado.',
      description2: 'No somos una agencia de volumen. Somos un asesor de confianza. Nuestro equipo combina un profundo conocimiento del mercado de Ámsterdam con una perspectiva internacional, sirviendo a compradores y vendedores de los Países Bajos, Europa y más allá. Hablamos su idioma — literal y culturalmente.',
      description3: 'Nuestra experiencia va más allá de la correduría estándar. Somos especialistas en monumentos históricos de Ámsterdam, restauraciones de casas de canal, y las regulaciones únicas que rigen los edificios protegidos. Asesoramos sobre estilismo del hogar que honra el patrimonio arquitectónico mientras crea espacios para la vida moderna.',
      valuesTitle: 'Lo Que Nos Guía',
      values: 'Nuestros Principios',
      trust: 'Discreción y Confianza',
      trustDesc: 'La confidencialidad es la base de cada relación. Lo que se discute en nuestra oficina permanece en nuestra oficina.',
      personal: 'Dedicación Personal',
      personalDesc: 'Aceptamos un número limitado de clientes a la vez. Esto garantiza que cada cliente reciba toda nuestra atención y lo mejor de nuestra red.',
      expertise: 'Inteligencia de Mercado',
      expertiseDesc: 'Dos décadas de transacciones en Ámsterdam nos dan una visión que ningún algoritmo puede replicar. Sabemos lo que vale una propiedad — y lo que podría valer.',
      global: 'Alcance Internacional',
      globalDesc: 'Representación multilingüe que conecta propiedades de Ámsterdam con compradores cualificados de Londres, Nueva York, Singapur y más allá.',
      quality: 'Portfolio Curado',
      qualityDesc: 'Somos selectivos con las propiedades que representamos. Si no se lo recomendaríamos a un amigo, no lo listamos.',
      relationships: 'Relaciones de por Vida',
      relationshipsDesc: 'La mayoría de nuestros clientes regresan. Muchos se convierten en amigos. Una transacción inmobiliaria nunca es solo una transacción — es el comienzo de una relación.',
      stats: { years: 'Años de Experiencia', rating: 'Calificación del Cliente', clients: 'Clientes Satisfechos', areas: 'Áreas Atendidas' },
      cta: 'Comience una conversación',
      ctaDesc: 'Visítenos en Leliegracht 21. Sin obligación. Discreción total. Solo una conversación honesta sobre sus ambiciones inmobiliarias.',
      contactBtn: 'Concierte una Cita'
    }
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
    { value: '20+', label: t.stats.years },
    { value: '8.0', label: t.stats.rating },
    { value: '19+', label: t.stats.clients },
    { value: '15+', label: t.stats.areas },
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
            {t.story}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t.headline}
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

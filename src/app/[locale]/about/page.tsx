'use client';

import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      story: 'Our Story',
      headline: 'Two decades of Amsterdam real estate expertise',
      who: 'Who We Are',
      description1: 'Hakkenbroek Housing Company has been serving the Amsterdam real estate market for over 20 years. As a boutique agency, we pride ourselves on providing personalized service and access to the best properties in the region.',
      description2: 'Our team of experienced professionals specializes in serving both domestic and international clients, with a particular focus on the expat housing market. We understand the unique challenges of relocating to a new country and are dedicated to making your transition as smooth as possible.',
      description3: "Whether you're buying, selling, renting, or looking for property management services, our expertise in monuments, foreign real estate, and home styling sets us apart from other agencies.",
      valuesTitle: 'What Drives Us',
      values: 'Our Values',
      trust: 'Trust & Integrity',
      trustDesc: 'We believe in transparent, honest dealings with all our clients. Your trust is our most valuable asset.',
      personal: 'Personal Service',
      personalDesc: 'Every client receives dedicated, personalized attention. We take the time to understand your unique needs.',
      expertise: 'Expertise',
      expertiseDesc: 'Deep knowledge of the Amsterdam market, from historic monuments to modern developments.',
      global: 'Global Perspective',
      globalDesc: 'Specialized in serving expats and international clients with multilingual support (Dutch & English).',
      quality: 'Quality Focus',
      qualityDesc: 'We only work with the best properties in the region, ensuring our clients have access to premium listings.',
      relationships: 'Long-term Relationships',
      relationshipsDesc: "We're not just about transactions — we build lasting relationships with our clients for all their real estate needs.",
      stats: { years: 'Years Experience', rating: 'Client Rating', clients: 'Happy Clients', areas: 'Areas Served' },
      cta: 'Ready to Work With Us?',
      ctaDesc: 'Get in touch to discuss your real estate needs. We\'re here to listen, advise, and guide.',
      contactBtn: 'Contact Us Today'
    },
    nl: {
      story: 'Ons Verhaal',
      headline: 'Twee decennia expertise in Amsterdamse vastgoed',
      who: 'Wie Wij Zijn',
      description1: 'Hakkenbroek Housing Company al meer dan 20 jaar actief op de Amsterdamse vastgoedmarkt. Als boutique makelaar zijn wij trots op onze persoonlijke service en toegang tot de beste woningen in de regio.',
      description2: 'Ons team van ervaren professionals is gespecialiseerd in zowel nationale als internationale cliënten, met een focus op de expat-huisvestingsmarkt. Wij begrijpen de unieke uitdagingen van verhuizing naar een nieuw land en zijn toegewijd om uw overgang zo soepel mogelijk te maken.',
      description3: 'Of u nu koopt, verkoopt, huurt of op zoek bent naar vastgoedbeheer, onze expertise in monumenten, buitenlands vastgoed en home styling onderscheidt ons van andere makelaars.',
      valuesTitle: 'Wat ons Drijft',
      values: 'Onze Waarden',
      trust: 'Vertrouwen & Integriteit',
      trustDesc: 'Wij geloven in transparante, eerlijke relaties met al onze cliënten. Uw vertrouwen is ons meest waardevolle bezit.',
      personal: 'Persoonlijke Service',
      personalDesc: 'Elke cliënt krijgt toegewijde, persoonlijke aandacht. Wij nemen de tijd om uw unieke behoeften te begrijpen.',
      expertise: 'Expertise',
      expertiseDesc: 'Diepe kennis van de Amsterdamse markt, van historische monumenten tot moderne ontwikkelingen.',
      global: 'Globaal Perspectief',
      globalDesc: 'Gespecialiseerd in het bedienen van expats en internationale cliënten met meertalige ondersteuning (Nederlands & Engels).',
      quality: 'Kwaliteitsfocus',
      qualityDesc: 'Wij werken alleen met de beste woningen in de regio, zodat onze cliënten toegang hebben tot premium aanbiedingen.',
      relationships: 'Lange-termijn Relaties',
      relationshipsDesc: 'Wij zijn niet alleen gericht op transacties — wij bouwen langdurige relaties met onze cliënten voor al hun vastgoedbehoeften.',
      stats: { years: 'Jaren Ervaring', rating: 'Cliëntbeoordeling', clients: 'Tevreden Cliënten', areas: 'Gebieden' },
      cta: 'Klaar om Samen te Werken?',
      ctaDesc: 'Neem contact op om uw vastgoedbehoeften te bespreken. Wij zijn er om te luisteren, adviseren en begeleiden.',
      contactBtn: 'Neem Vandaag Nog Contact Op'
    },
    es: {
      story: 'Nuestra Historia',
      headline: 'Dos décadas de experiencia en bienes raíces en Ámsterdam',
      who: 'Quiénes Somos',
      description1: 'Hakkenbroek Housing Company ha servido al mercado inmobiliario de Ámsterdam durante más de 20 años. Como agencia boutique, nos enorgullece brindar servicio personalizado y acceso a las mejores propiedades de la región.',
      description2: 'Nuestro equipo de profesionales experimentados se especializa en servir tanto a clientes nacionales como internacionales, con un enfoque particular en el mercado de vivienda para expatriados. Entendemos los desafíos únicos de mudarse a un nuevo país y estamos dedicados a hacer su transición lo más suave posible.',
      description3: 'Ya sea que esté comprando, vendiendo, alquilando o buscando servicios de administración de propiedades, nuestra experiencia en monumentos, bienes raíces extranjeros y home styling nos distingue de otras agencias.',
      valuesTitle: 'Lo Que Nos Impulsa',
      values: 'Nuestros Valores',
      trust: 'Confianza e Integridad',
      trustDesc: 'Creemos en tratos transparentes y honestos con todos nuestros clientes. Su confianza es nuestro activo más valioso.',
      personal: 'Servicio Personal',
      personalDesc: 'Cada cliente recibe atención dedicada y personalizada. Nos tomamos el tiempo para entender sus necesidades únicas.',
      expertise: 'Experiencia',
      expertiseDesc: 'Conocimiento profundo del mercado de Ámsterdam, desde monumentos históricos hasta desarrollos modernos.',
      global: 'Perspectiva Global',
      globalDesc: 'Especializados en servir a expatriados y clientes internacionales con soporte multilingüe (holandés e inglés).',
      quality: 'Enfoque en Calidad',
      qualityDesc: 'Solo trabajamos con las mejores propiedades de la región, asegurando que nuestros clientes tengan acceso a listados premium.',
      relationships: 'Relaciones a Largo Plazo',
      relationshipsDesc: 'No solo nos trata de transacciones — construimos relaciones duraderas con nuestros clientes para todas sus necesidades inmobiliarias.',
      stats: { years: 'Años de Experiencia', rating: 'Calificación del Cliente', clients: 'Clientes Satisfechos', areas: 'Áreas Atendidas' },
      cta: '¿Listo para Trabajar con Nosotros?',
      ctaDesc: 'Póngase en contacto para discutir sus necesidades inmobiliarias. Estamos aquí para escuchar, asesorar y guiar.',
      contactBtn: 'Contáctenos Hoy'
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

'use client';

import { usePathname } from 'next/navigation';

export default function ServicesPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const content = {
    en: {
      heroSubtitle: 'Our Services',
      heroTitle: 'Comprehensive real estate solutions',
      intro: 'We offer a full range of real estate services tailored to your needs. Whether you are buying, selling, renting, or looking for property management, our experienced team is here to guide you every step of the way.',
      buying: {
        title: 'Buying',
        description: 'Expert guidance through the entire buying process, from property search to transfer. We help you find the perfect home that matches your needs and budget.',
        features: ['Personal property search', 'Market analysis and valuation', 'Negotiation support', 'Legal and financial guidance']
      },
      selling: {
        title: 'Selling',
        description: 'Professional valuation and marketing to get the best price for your property. We handle everything from listing to closing.',
        features: ['Free property valuation', 'Professional photography', 'Multi-platform marketing', 'Home styling advice']
      },
      renting: {
        title: 'Renting',
        description: 'Find quality rental properties, perfect for expats and locals alike. We have access to the best rental listings in Amsterdam.',
        features: ['Extensive rental database', 'Expat rental specialists', 'Lease agreement assistance', 'Move-in support']
      },
      leasing: {
        title: 'Leasing',
        description: 'Long-term lease options with comprehensive management services. Ideal for investors and landlords seeking hassle-free property management.',
        features: ['Tenant screening', 'Rent collection', 'Property maintenance', 'Legal compliance']
      },
      management: {
        title: 'Property Management',
        description: 'Complete property management services for landlords and investors. We handle all aspects of property ownership so you can enjoy passive income.',
        features: ['Regular inspections', 'Financial reporting', 'Emergency repairs', 'Tax documentation', 'Insurance coordination', '24/7 support']
      },
      cta: 'Ready to get started?',
      ctaDesc: 'Contact us to discuss your real estate needs. We are here to help you achieve your goals.',
      contactBtn: 'Get in Touch'
    },
    nl: {
      heroSubtitle: 'Onze Diensten',
      heroTitle: 'Uitgebreide vastgoedoplossingen',
      intro: 'Wij bieden een volledig scala aan vastgoeddiensten afgestemd op uw behoeften. Of u nu koopt, verkoopt, huurt of op zoek bent naar vastgoedbeheer, ons ervaren team staat klaar om u elke stap te begeleiden.',
      buying: {
        title: 'Kopen',
        description: 'Deskundige begeleiding door het hele aankoopproces, van woningzoektocht tot overdracht. Wij helpen u de perfecte woning te vinden die past bij uw behoeften en budget.',
        features: ['Persoonlijke woningzoektocht', 'Marktanalyse en waardering', 'Onderhandelingsondersteuning', 'Juridisch en financieel advies']
      },
      selling: {
        title: 'Verkopen',
        description: 'Professionele waardering en marketing om de beste prijs voor uw woning te krijgen. Wij verzorgen alles van listing tot sluiting.',
        features: ['Gratis woningwaardering', 'Professionele fotografie', 'Multi-platform marketing', 'Home styling advies']
      },
      renting: {
        title: 'Huren',
        description: 'Vind kwaliteits huurwoningen, perfect voor expats en lokale bewoners. Wij hebben toegang tot de beste huurlijsten in Amsterdam.',
        features: ['Uitgebreide huurdatabase', 'Expat huurspecialisten', 'Huurcontract assistentie', 'Verhuisondersteuning']
      },
      leasing: {
        title: 'Verhuur',
        description: 'Lange-termijn verhuuropties met uitgebreide beheerdiensten. Ideaal voor investeerders en verhuurders die zorgeloos vastgoedbeheer zoeken.',
        features: ['Huurdersscreening', 'Huurincasso', 'Vastgoedonderhoud', 'Juridische naleving']
      },
      management: {
        title: 'Vastgoedbeheer',
        description: 'Volledig vastgoedbeheer voor verhuurders en investeerders. Wij verzorgen alle aspecten van eigendom zodat u kunt genieten van passief inkomen.',
        features: ['Reguliere inspecties', 'Financiële rapportage', 'Noodreparaties', 'Belastingdocumentatie', 'Verzekeringscoördinatie', '24/7 ondersteuning']
      },
      cta: 'Klaar om te beginnen?',
      ctaDesc: 'Neem contact op om uw vastgoedbehoeften te bespreken. Wij zijn er om u te helpen uw doelen te bereiken.',
      contactBtn: 'Neem Contact Op'
    },
    es: {
      heroSubtitle: 'Nuestros Servicios',
      heroTitle: 'Soluciones inmobiliarias integrales',
      intro: 'Ofrecemos una gama completa de servicios inmobiliarios adaptados a sus necesidades. Ya sea que esté comprando, vendiendo, alquilando o buscando administración de propiedades, nuestro equipo experimentado está aquí para guiarlo en cada paso.',
      buying: {
        title: 'Comprar',
        description: 'Orientación experta a través de todo el proceso de compra, desde la búsqueda de propiedades hasta la transferencia. Le ayudamos a encontrar la casa perfecta que se adapte a sus necesidades y presupuesto.',
        features: ['Búsqueda de propiedades personalizada', 'Análisis y valoración de mercado', 'Apoyo en negociaciones', 'Asesoramiento legal y financiero']
      },
      selling: {
        title: 'Vender',
        description: 'Valoración y marketing profesional para obtener el mejor precio para su propiedad. Manejamos todo desde el listado hasta el cierre.',
        features: ['Valoración gratuita de propiedades', 'Fotografía profesional', 'Marketing en múltiples plataformas', 'Consejos de home styling']
      },
      renting: {
        title: 'Alquilar',
        description: 'Encuentre propiedades de alquiler de calidad, perfectas para expatriados y locales por igual. Tenemos acceso a los mejores listados de alquiler en Ámsterdam.',
        features: ['Base de datos de alquiler extensa', 'Especialistas en alquiler para expatriados', 'Asistencia con contratos de arrendamiento', 'Apoyo para la mudanza']
      },
      leasing: {
        title: 'Arrendamiento',
        description: 'Opciones de arrendamiento a largo plazo con servicios de gestión integrales. Ideal para inversores y propietarios que buscan gestión de propiedades sin complicaciones.',
        features: ['Selección de inquilinos', 'Cobro de alquiler', 'Mantenimiento de propiedades', 'Cumplimiento legal']
      },
      management: {
        title: 'Administración de Propiedades',
        description: 'Servicios completos de administración de propiedades para propietarios e inversores. Manejamos todos los aspectos de la propiedad para que pueda disfrutar de ingresos pasivos.',
        features: ['Inspecciones regulares', 'Informes financieros', 'Reparaciones de emergencia', 'Documentación fiscal', 'Coordinación de seguros', 'Soporte 24/7']
      },
      cta: '¿Listo para comenzar?',
      ctaDesc: 'Contáctenos para discutir sus necesidades inmobiliarias. Estamos aquí para ayudarle a lograr sus objetivos.',
      contactBtn: 'Póngase en Contacto'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const services = [
    {
      title: t.buying.title,
      description: t.buying.description,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      features: t.buying.features,
    },
    {
      title: t.selling.title,
      description: t.selling.description,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      features: t.selling.features,
    },
    {
      title: t.renting.title,
      description: t.renting.description,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      features: t.renting.features,
    },
    {
      title: t.leasing.title,
      description: t.leasing.description,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      features: t.leasing.features,
    },
  ];

  const managementFeatures = t.management.features;
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
            {t.heroSubtitle}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t.heroTitle}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
            {t.heroSubtitle}
          </p>
          <p className="text-warm-gray leading-relaxed text-lg">
            {t.intro}
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
                {t.management.title}
              </h2>
              <p className="text-stone-300 leading-relaxed mb-10">
                {t.management.description}
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
            {t.cta}
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            {t.ctaDesc}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            {t.contactBtn}
          </a>
        </div>
      </section>
    </div>
  );
}

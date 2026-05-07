import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section — Full-bleed imagery */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam canals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="font-body text-sm uppercase tracking-[0.25em] text-stone-200 mb-6">
            Amsterdam Real Estate Since 2003
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 max-w-4xl mx-auto">
            Where living becomes an experience
          </h1>
          <p className="font-body text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Boutique agency with 20+ years of expertise. We connect discerning clients
            with the most elegant properties Amsterdam has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-brass text-white px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
            >
              View Properties
            </Link>
            <Link
              href="/contact"
              className="border border-white/80 text-white px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-white hover:text-charcoal transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview — Editorial grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
              What We Do
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              Comprehensive real estate solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Buying',
                desc: 'Expert guidance through the entire buying process, from search to transfer. We listen, we observe, we advise.',
              },
              {
                title: 'Selling',
                desc: 'Professional valuation and marketing to get the best price for your property. Presentation is everything.',
              },
              {
                title: 'Renting',
                desc: 'Find quality rental properties, perfect for expats and locals alike. Access to the best listings in Amsterdam.',
              },
              {
                title: 'Leasing',
                desc: 'Long-term lease options with comprehensive management services for landlords and tenants.',
              },
              {
                title: 'Property Management',
                desc: 'Complete property management services for landlords and investors. Hassle-free ownership.',
              },
              {
                title: 'Expat Services',
                desc: 'Specialized support for international clients relocating to the Netherlands. We understand the journey.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group border-t border-stone-200 pt-8 hover:border-brass transition-colors duration-500"
              >
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-brass transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage / Trust Section — Split layout with image */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Elegant Amsterdam interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                Our Heritage
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8 leading-snug">
                Over two decades of excellence in Amsterdam real estate
              </h2>
              <p className="text-warm-gray leading-relaxed mb-8">
                Hakkenbroek Housing Company has been serving the Amsterdam real estate market
                for over 20 years. As a boutique agency, we pride ourselves on providing
                personalized service and access to the best properties in the region.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="font-display text-4xl text-brass mb-1">20+</p>
                  <p className="font-body text-sm text-warm-gray uppercase tracking-wide">Years Experience</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-brass mb-1">8.0</p>
                  <p className="font-body text-sm text-warm-gray uppercase tracking-wide">Client Rating</p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                Current Listings
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">
                Featured Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="mt-6 md:mt-0 inline-block border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300"
            >
              View All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Jacob Catskade 51 H',
                location: 'Amsterdam',
                price: '€600,000',
                size: '68 m²',
                beds: '3 bed',
                status: 'Available',
                statusColor: 'bg-emerald-50 text-emerald-700',
                image:
                  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Van Woustraat 22 1',
                location: 'Amsterdam',
                price: '€745,000',
                size: '103 m²',
                beds: '3 bed',
                status: 'Under Consideration',
                statusColor: 'bg-amber-50 text-amber-700',
                image:
                  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Singel 204 C',
                location: 'Amsterdam',
                price: '€625,000',
                size: '73 m²',
                beds: '1 bed',
                status: 'Sold',
                statusColor: 'bg-stone-100 text-warm-gray',
                image:
                  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
              },
            ].map((property) => (
              <div
                key={property.title}
                className="group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-body uppercase tracking-wider px-3 py-1.5 ${property.statusColor}`}
                  >
                    {property.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-1">
                    {property.title}
                  </h3>
                  <p className="text-warm-gray text-sm mb-4">{property.location}</p>
                  <div className="flex justify-between items-end">
                    <span className="font-display text-2xl text-brass">{property.price}</span>
                    <span className="text-warm-gray text-sm">
                      {property.size} · {property.beds}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — Minimal list */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
                Why Hakkenbroek
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-8 leading-snug">
                A boutique approach to real estate
              </h2>
              <p className="text-stone-300 leading-relaxed">
                We believe in quality over quantity. Every client receives our full attention,
                and every property in our portfolio has been carefully selected for its unique character.
              </p>
            </div>
            <div className="space-y-10">
              {[
                {
                  title: '20+ Years Experience',
                  desc: 'Deep-rooted expertise in the Amsterdam real estate market, from historic monuments to modern developments.',
                },
                {
                  title: 'Expat Specialists',
                  desc: 'Dedicated multilingual support for international clients navigating the Dutch property landscape.',
                },
                {
                  title: 'Personal Service',
                  desc: 'Boutique agency approach with dedicated attention to each client. Your goals become our mission.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l border-stone-600 pl-6">
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            Ready to find your Amsterdam home?
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            Contact us for a personalized consultation. We listen, we observe, we advise —
            all with one goal in mind: to find the perfect connection between you and your new space.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

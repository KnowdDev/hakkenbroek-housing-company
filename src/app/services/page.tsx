import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Hakkenbroek Housing Company',
  description:
    'Comprehensive real estate services including buying, selling, renting, leasing, and property management in Amsterdam.',
};

const services = [
  {
    title: 'Buying',
    description:
      'Expert guidance through the entire buying process, from property search to transfer. We help you find the perfect home that matches your needs and budget.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: [
      'Personal property search',
      'Market analysis and valuation',
      'Negotiation support',
      'Legal and financial guidance',
    ],
  },
  {
    title: 'Selling',
    description:
      'Professional valuation and marketing to get the best price for your property. We handle everything from listing to closing.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    features: [
      'Free property valuation',
      'Professional photography',
      'Multi-platform marketing',
      'Home styling advice',
    ],
  },
  {
    title: 'Renting',
    description:
      'Find quality rental properties, perfect for expats and locals alike. We have access to the best rental listings in Amsterdam.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    features: [
      'Extensive rental database',
      'Expat rental specialists',
      'Lease agreement assistance',
      'Move-in support',
    ],
  },
  {
    title: 'Leasing',
    description:
      'Long-term lease options with comprehensive management services. Ideal for investors and landlords seeking hassle-free property management.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    features: [
      'Tenant screening',
      'Rent collection',
      'Property maintenance',
      'Legal compliance',
    ],
  },
];

export default function ServicesPage() {
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
            What We Offer
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            Services tailored to your journey
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
            Comprehensive Solutions
          </p>
          <p className="text-warm-gray leading-relaxed text-lg">
            Whether you are looking for a residence that gives roots to your identity or want to
            make an investment that will pay off in the future, we listen, advise, and anticipate —
            finding the right properties, often before they even come onto the market.
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
                Property Management
              </h2>
              <p className="text-stone-300 leading-relaxed mb-10">
                Complete property management services for landlords and investors.
                We handle all aspects of property ownership so you can enjoy passive income.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Regular inspections',
                  'Financial reporting',
                  'Emergency repairs',
                  'Tax documentation',
                  'Insurance coordination',
                  '24/7 support',
                ].map((item) => (
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
            Need help with your real estate needs?
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            Contact us today for a free, no-obligation consultation.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

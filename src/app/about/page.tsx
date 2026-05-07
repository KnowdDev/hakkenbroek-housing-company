import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Hakkenbroek Housing Company',
  description:
    'Learn about Hakkenbroek Housing Company, your trusted real estate partner in Amsterdam with over 20 years of experience.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585892067320-3a3fbc8e9e9a?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            Two decades of Amsterdam real estate expertise
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
                Who We Are
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8 leading-snug">
                A boutique agency with a personal touch
              </h2>
              <div className="space-y-6 text-warm-gray leading-relaxed">
                <p>
                  Hakkenbroek Housing Company has been serving the Amsterdam real estate market
                  for over 20 years. As a boutique agency, we pride ourselves on providing
                  personalized service and access to the best properties in the region.
                </p>
                <p>
                  Our team of experienced professionals specializes in serving both domestic
                  and international clients, with a particular focus on the expat housing market.
                  We understand the unique challenges of relocating to a new country and are
                  dedicated to making your transition as smooth as possible.
                </p>
                <p>
                  Whether you&apos;re buying, selling, renting, or looking for property management
                  services, our expertise in monuments, foreign real estate, and home styling
                  sets us apart from other agencies.
                </p>
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
              What Drives Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              {
                num: '01',
                title: 'Trust & Integrity',
                desc: 'We believe in transparent, honest dealings with all our clients. Your trust is our most valuable asset.',
              },
              {
                num: '02',
                title: 'Personal Service',
                desc: 'Every client receives dedicated, personalized attention. We take the time to understand your unique needs.',
              },
              {
                num: '03',
                title: 'Expertise',
                desc: 'Deep knowledge of the Amsterdam market, from historic monuments to modern developments.',
              },
              {
                num: '04',
                title: 'Global Perspective',
                desc: 'Specialized in serving expats and international clients with multilingual support (Dutch & English).',
              },
              {
                num: '05',
                title: 'Quality Focus',
                desc: 'We only work with the best properties in the region, ensuring our clients have access to premium listings.',
              },
              {
                num: '06',
                title: 'Long-term Relationships',
                desc: "We're not just about transactions — we build lasting relationships with our clients for all their real estate needs.",
              },
            ].map((value) => (
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
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '8.0', label: 'Client Rating' },
              { value: '19+', label: 'Happy Clients' },
              { value: '15+', label: 'Areas Served' },
            ].map((stat) => (
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
            Ready to Work With Us?
          </h2>
          <p className="text-warm-gray text-lg mb-10 leading-relaxed">
            Get in touch to discuss your real estate needs. We&apos;re here to listen, advise, and guide.
          </p>
          <a
            href="mailto:info@hakkenbroek.com"
            className="inline-block bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
}

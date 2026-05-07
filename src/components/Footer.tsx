import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <h3 className="font-display text-2xl mb-4">Hakkenbroek</h3>
            <p className="text-stone-300 leading-relaxed mb-6 max-w-sm">
              Boutique real estate agency in Amsterdam. Over 20 years of experience
              serving expats and locals with a personal, dedicated approach.
            </p>
            <p className="text-stone-300">
              <span className="text-stone-200">Leliegracht 21</span>
              <br />
              Amsterdam, Netherlands
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-body text-xs uppercase tracking-widest text-stone-400 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/properties', label: 'Properties' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-300 hover:text-brass-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-xs uppercase tracking-widest text-stone-400 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {['Buying', 'Selling', 'Renting', 'Leasing', 'Property Management'].map(
                (service) => (
                  <li key={service} className="text-stone-300">
                    {service}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-sm">
            &copy; {new Date().getFullYear()} Hakkenbroek Housing Company
          </p>
          <div className="flex gap-6 text-sm text-stone-400">
            <a href="mailto:info@hakkenbroek.com" className="hover:text-brass-light transition-colors">
              info@hakkenbroek.com
            </a>
            <a href="tel:+31201234567" className="hover:text-brass-light transition-colors">
              +31 20 123 4567
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

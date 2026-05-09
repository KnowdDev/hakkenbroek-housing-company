'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { href: '/', label: { en: 'Home', nl: 'Home', es: 'Inicio' } },
  { href: '/about', label: { en: 'About', nl: 'Over ons', es: 'Nosotros' } },
  { href: '/services', label: { en: 'Services', nl: 'Diensten', es: 'Servicios' } },
  { href: '/properties', label: { en: 'Properties', nl: 'Woningen', es: 'Propiedades' } },
  { href: '/contact', label: { en: 'Contact', nl: 'Contact', es: 'Contacto' } },
];

type Language = 'en' | 'nl' | 'es';

export default function Footer() {
  const [locale, setLocale] = useState<Language>('en');
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl' || segments[0] === 'es')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-block">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                className="h-16 w-auto mb-6 brightness-0 invert"
              />
            </Link>
            <p className="text-stone-300 leading-relaxed mb-6 max-w-sm">
              Boutique real estate agency in Amsterdam. Over 20 years of discretion
              and excellence — connecting discerning clients with the city's most
              exceptional properties.
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-stone-300 hover:text-brass-light transition-colors duration-300"
                  >
                    {link.label[locale]}
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
          <div className="flex gap-6 text-sm text-stone-400 items-center">
            <a href="mailto:info@hakkenbroek.com" className="hover:text-brass-light transition-colors">
              info@hakkenbroek.com
            </a>
            <a href="tel:+31201234567" className="hover:text-brass-light transition-colors">
              +31 20 123 4567
            </a>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

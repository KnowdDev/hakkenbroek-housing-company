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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Language>('en');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl' || segments[0] === 'es')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href={`/${locale}`} className="flex items-center py-4">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                className={`h-16 md:h-20 w-auto transition-all duration-500 ${
                  scrolled ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            <div className="hidden md:flex items-center space-x-14">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={`font-body text-xs tracking-wide uppercase transition-colors duration-300 relative group ${
                    scrolled ? 'text-ink hover:text-brass' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label[locale]}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                      scrolled ? 'bg-brass' : 'bg-white'
                    }`}
                  />
                </Link>
              ))}
              <LanguageToggle scrolled={scrolled} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`focus:outline-none transition-colors duration-500 ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              onClick={() => setIsOpen(false)}
              className="font-display text-3xl text-white hover:text-brass-light transition-colors duration-300"
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label[locale]}
            </Link>
          ))}
          <div className="pt-4">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}

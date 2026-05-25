'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { href: '/buying', label: { en: 'Buy', nl: 'Kopen' } },
  { href: '/selling', label: { en: 'Sell', nl: 'Verkopen' } },
  { href: '/about', label: { en: 'About', nl: 'Over ons' } },
  { href: '/services', label: { en: 'Services', nl: 'Diensten' } },
  { href: '/contact', label: { en: 'Contact', nl: 'Contact' } },
];

const propertiesDropdown = {
  label: { en: 'Properties', nl: 'Woningen' },
  items: [
    {
      href: '/properties?type=sale',
      label: { en: 'For Sale', nl: 'Te Koop' },
    },
    {
      href: '/properties?type=rent',
      label: { en: 'For Rent', nl: 'Te Huur' },
    },
  ],
};

type Language = 'en' | 'nl';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<Language>('en');
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  return (
    <>
      <nav className="relative z-50 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href={`/${locale}`} className="flex items-center py-4">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                className="h-16 md:h-20 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-14">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="font-body text-xs tracking-wide uppercase text-ink hover:text-brass transition-colors duration-300 relative group"
                >
                  {link.label[locale]}
                  <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-brass" />
                </Link>
              ))}

              {/* Properties dropdown */}
              <div className="relative group">
                <Link
                  href={`/${locale}/properties`}
                  className="font-body text-xs tracking-wide uppercase text-ink hover:text-brass transition-colors duration-300 relative group inline-flex items-center gap-1"
                >
                  {propertiesDropdown.label[locale]}
                  <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-brass" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white border border-stone-200 shadow-lg py-2 min-w-[180px]">
                    {propertiesDropdown.items.map((item) => (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="block px-5 py-2.5 font-body text-sm text-ink hover:text-brass hover:bg-stone-50 transition-colors duration-200"
                      >
                        {item.label[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <LanguageToggle scrolled={true} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none transition-colors duration-500 font-body text-xs uppercase tracking-wider text-charcoal"
                aria-label="Toggle menu"
              >
                {isOpen ? 'Close' : 'Menu'}
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

          {/* Properties in mobile menu */}
          <div className="flex flex-col items-center space-y-3">
            <span className="font-display text-3xl text-white">
              {propertiesDropdown.label[locale]}
            </span>
            {propertiesDropdown.items.map((item, i) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsOpen(false)}
                className="font-body text-lg text-stone-300 hover:text-brass-light transition-colors duration-300"
                style={{ transitionDelay: isOpen ? `${(navLinks.length + i) * 50}ms` : '0ms' }}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>

          <div className="pt-4">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}

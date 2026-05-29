'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/navigation';
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
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  const isPropertyDetail = pathname.split('/').filter(Boolean).length === 3 && pathname.includes('/properties/');

  // Scroll-based header state — triggers at 1px for instant feedback
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0 || isPropertyDetail);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isPropertyDetail]);


  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  const navBg = isOpen
    ? 'bg-transparent border-b border-white/10'
    : scrolled
      ? 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200'
      : 'bg-charcoal/50 backdrop-blur-sm border-b border-white/10';

  const navText = isOpen
    ? 'text-white hover:text-white'
    : scrolled
      ? 'text-ink hover:text-brass'
      : 'text-white/90 hover:text-white';

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/" className="flex items-center py-4">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                className={`h-16 md:h-20 w-auto transition-all duration-500 ${
                  isOpen ? 'brightness-0 invert' : scrolled ? 'brightness-100' : 'brightness-0 invert'
                }`}
              />
            </Link>

            <div className="hidden md:flex items-center space-x-14">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-xs tracking-wide uppercase transition-colors duration-300 relative group ${navText}`}
                >
                  {link.label[locale]}
                  <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-brass" />
                </Link>
              ))}

              {/* Properties dropdown */}
              <div className="relative group">
                <Link
                  href="/properties"
                  className={`font-body text-xs tracking-wide uppercase transition-colors duration-300 relative group inline-flex items-center gap-1 ${navText}`}
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
                        href={item.href}
                        className="block px-5 py-2.5 font-body text-sm text-ink hover:text-brass hover:bg-stone-50 transition-colors duration-200"
                      >
                        {item.label[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <LanguageToggle scrolled={scrolled} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-8 h-8 focus:outline-none ${isOpen ? 'text-white' : 'text-brass'}`}
                aria-label="Toggle menu"
              >
                <span className={`absolute left-0 block w-8 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-3.5 rotate-45' : 'top-1'}`} />
                <span className={`absolute left-0 block w-8 h-0.5 bg-current transition-all duration-300 top-3.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block w-8 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-3.5 -rotate-45' : 'top-6'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brass transition-transform duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-10 px-6 overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center gap-7">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-display text-4xl leading-none text-white hover:opacity-80 transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label[locale]}
              </Link>
            ))}

            {/* Properties in mobile menu */}
            <div
              className={`flex flex-col items-center gap-3 pt-2 transition-all duration-500 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            >
              <Link
                href="/properties"
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl leading-none text-white hover:opacity-80 transition-opacity"
              >
                {propertiesDropdown.label[locale]}
              </Link>
              <div className="flex items-center gap-5">
                {propertiesDropdown.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-body text-sm tracking-wide text-white/75 hover:text-white transition-colors"
                  >
                    {item.label[locale]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`flex justify-center pt-8 transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: isOpen ? `${(navLinks.length + 1) * 50}ms` : '0ms' }}
          >
            <LanguageToggle dropUp />
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
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
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const pathSegments = pathname.split('/').filter(Boolean);
  const normalizedSegments =
    pathSegments[0] === 'en' || pathSegments[0] === 'nl' ? pathSegments.slice(1) : pathSegments;

  const isPropertyDetail =
    normalizedSegments.length === 2 &&
    (normalizedSegments[0] === 'properties' || normalizedSegments[0] === 'vastgoed');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24 || isPropertyDetail);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPropertyDetail]);

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

  const navSurface = scrolled || isPropertyDetail
    ? 'bg-stone-50 border-stone-200 shadow-[0_16px_40px_rgba(15,15,15,0.08)]'
    : 'bg-stone-50 border-stone-200 shadow-[0_8px_28px_rgba(15,15,15,0.05)]';
  const navText = 'text-ink hover:text-charcoal';
  const navAccent = 'bg-brass';
  const logoTone = 'brightness-100';
  const menuButtonTone = 'text-charcoal hover:text-ink border-stone-300 bg-stone-50';
  const drawerMeta = locale === 'nl'
    ? { explore: 'Lees meer', portfolio: 'Portfolio', viewAll: 'Bekijk alles', language: 'Taal' }
    : { explore: 'Read more', portfolio: 'Portfolio', viewAll: 'View all', language: 'Language' };

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${navSurface}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 sm:h-24 items-center justify-between gap-6">
            <Link href="/" className="flex shrink-0 items-center py-4">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                width="168"
                height="92"
                className={`h-14 sm:h-16 w-auto transition-all duration-300 ${logoTone}`}
              />
            </Link>

            <div className="hidden xl:flex items-center gap-8 2xl:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 relative group ${navText}`}
                >
                  {link.label[locale]}
                  <span className={`absolute -bottom-2 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${navAccent}`} />
                </Link>
              ))}

              <div className="relative group">
                <Link
                  href="/properties"
                  className={`font-body text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 relative inline-flex items-center gap-2 ${navText}`}
                >
                  {propertiesDropdown.label[locale]}
                  <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute -bottom-2 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${navAccent}`} />
                </Link>
                <div className="absolute left-1/2 top-full pt-6 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="min-w-[220px] border border-stone-200 bg-white shadow-[0_24px_60px_rgba(15,15,15,0.12)] px-3 py-3">
                    {propertiesDropdown.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 font-body text-sm text-ink hover:text-brass hover:bg-stone-50 transition-colors duration-200"
                      >
                        {item.label[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <LanguageToggle scrolled />
            </div>

            <div className="xl:hidden flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`group flex h-11 w-11 items-center justify-center border transition-all duration-300 ${menuButtonTone}`}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                <span className="relative block h-4 w-5">
                  <span className="absolute left-0 top-0 block h-px w-4 bg-current transition-all duration-300 group-hover:w-5" />
                  <span className="absolute right-0 top-[7px] block h-px w-5 bg-current transition-all duration-300" />
                  <span className="absolute right-0 top-[14px] block h-px w-3 bg-current transition-all duration-300 group-hover:w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] xl:hidden transition-[opacity,visibility] duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-stone-50" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-stone-200 px-4 sm:h-24 sm:px-6">
            <Link href="/" className="flex items-center py-4" onClick={() => setIsOpen(false)}>
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                width="168"
                height="92"
                className="h-14 sm:h-16 w-auto"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-stone-300 text-charcoal transition-colors duration-300 hover:bg-stone-100"
              aria-label="Close menu"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-2 block h-px w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-2 block h-px w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="md:hidden">
              <div className="divide-y divide-stone-200">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-5 text-charcoal transition-all duration-500 hover:bg-stone-100 sm:px-8 sm:py-6 ${
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                  >
                    <span className="block font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70 mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-end justify-between gap-6">
                      <span className="block font-display text-[2rem] sm:text-[2.4rem] leading-none">
                        {link.label[locale]}
                      </span>
                      <span className="hidden items-center gap-2 font-body text-[11px] uppercase tracking-[0.26em] text-warm-gray/80 sm:inline-flex">
                        {drawerMeta.explore}
                        <span>→</span>
                      </span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.26em] text-warm-gray/80 sm:hidden">
                      {drawerMeta.explore}
                      <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-stone-200 bg-stone-100/90 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
                <p className="font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70">
                  {drawerMeta.portfolio}
                </p>
                <Link
                  href="/properties"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex items-end justify-between gap-4 border-b border-stone-300/80 pb-5 text-charcoal transition-opacity duration-300 hover:opacity-80"
                >
                  <span className="font-display text-3xl leading-none">
                    {propertiesDropdown.label[locale]}
                  </span>
                  <span className="font-body text-[11px] uppercase tracking-[0.28em] text-warm-gray/80">
                    {drawerMeta.viewAll}
                  </span>
                </Link>

                <div className="mt-5 grid gap-2">
                  {propertiesDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="border border-stone-300 bg-stone-50 px-4 py-3 font-body text-xs uppercase tracking-[0.22em] text-charcoal transition-colors duration-300 hover:bg-white"
                    >
                      {item.label[locale]}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 border-t border-stone-300/80 pt-6">
                  <p className="font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70">
                    {drawerMeta.language}
                  </p>
                  <div className="mt-3">
                    <LanguageToggle scrolled />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`border border-stone-300 bg-stone-50/90 px-6 py-6 text-charcoal transition-all duration-500 hover:bg-white ${
                          index === navLinks.length - 1 ? 'sm:col-span-2' : ''
                        } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                        style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                      >
                        <span className="block font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70 mb-4">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="block font-display text-[2.2rem] lg:text-[2.6rem] leading-none">
                          {link.label[locale]}
                        </span>
                        <span className="mt-6 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.26em] text-warm-gray/80">
                          {drawerMeta.explore}
                          <span>→</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="grid content-start gap-4">
                    <div
                      className={`border border-stone-300 bg-stone-100/90 px-6 py-6 transition-all duration-500 ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                      }`}
                      style={{ transitionDelay: isOpen ? `${navLinks.length * 40}ms` : '0ms' }}
                    >
                      <p className="font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70">
                        {drawerMeta.portfolio}
                      </p>
                      <Link
                        href="/properties"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 flex items-end justify-between gap-4 border-b border-stone-300/80 pb-5 text-charcoal transition-opacity duration-300 hover:opacity-80"
                      >
                        <span className="font-display text-3xl leading-none">
                          {propertiesDropdown.label[locale]}
                        </span>
                        <span className="font-body text-[11px] uppercase tracking-[0.28em] text-warm-gray/80">
                          {drawerMeta.viewAll}
                        </span>
                      </Link>

                      <div className="mt-5 grid gap-2">
                        {propertiesDropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="border border-stone-300 bg-stone-50 px-4 py-3 font-body text-xs uppercase tracking-[0.22em] text-charcoal transition-colors duration-300 hover:bg-white"
                          >
                            {item.label[locale]}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`border border-stone-300 bg-stone-50/90 px-6 py-6 transition-all duration-500 ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                      }`}
                      style={{ transitionDelay: isOpen ? `${(navLinks.length + 1) * 40}ms` : '0ms' }}
                    >
                      <p className="font-body text-[11px] uppercase tracking-[0.32em] text-warm-gray/70">
                        {drawerMeta.language}
                      </p>
                      <div className="mt-3">
                        <LanguageToggle scrolled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

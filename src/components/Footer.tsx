'use client';

import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';

type Language = 'en' | 'nl';

type FooterLink = {
  href: string;
  label: Record<Language, string>;
};

type FooterCopy = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  navTitle: string;
  servicesTitle: string;
  officeTitle: string;
  officeLine: string;
  officeCity: string;
  officeHours: string;
  directions: string;
  emailLabel: string;
  phoneLabel: string;
  copyrightNote: string;
};

const navLinks: FooterLink[] = [
  { href: '/', label: { en: 'Home', nl: 'Home' } },
  { href: '/about', label: { en: 'About', nl: 'Over ons' } },
  { href: '/services', label: { en: 'Services', nl: 'Diensten' } },
  { href: '/properties', label: { en: 'Properties', nl: 'Woningen' } },
  { href: '/contact', label: { en: 'Contact', nl: 'Contact' } },
];

const serviceLinks: FooterLink[] = [
  { href: '/buying', label: { en: 'Buying', nl: 'Kopen' } },
  { href: '/selling', label: { en: 'Selling', nl: 'Verkopen' } },
  { href: '/services/renting', label: { en: 'Renting', nl: 'Huren' } },
  { href: '/services/leasing', label: { en: 'Leasing', nl: 'Verhuren' } },
  {
    href: '/services/property-management',
    label: { en: 'Management', nl: 'Beheer' },
  },
];

const footerCopy: Record<Language, FooterCopy> = {
  en: {
    eyebrow: 'Since 2000',
    title: 'Quiet guidance across Amsterdam, Het Gooi and the Vechtstreek.',
    description:
      'Hakkenbroek advises buyers, sellers and landlords with a discreet, personal approach and deep knowledge of the markets we serve.',
    cta: 'Arrange a conversation',
    navTitle: 'Menu',
    servicesTitle: 'Services',
    officeTitle: 'Visit',
    officeLine: 'By appointment at Leliegracht 21',
    officeCity: 'Amsterdam, Netherlands',
    officeHours: 'By appointment, including weekends',
    directions: 'Map and directions',
    emailLabel: 'info@hakkenbroek.com',
    phoneLabel: '+31 20 123 4567',
    copyrightNote: 'Local guidance for Amsterdam, Het Gooi and the Vechtstreek.',
  },
  nl: {
    eyebrow: 'Sinds 2000',
    title: 'Discreet advies in Amsterdam, Het Gooi en de Vechtstreek.',
    description:
      'Hakkenbroek begeleidt kopers, verkopers en verhuurders met lokale kennis, rust en een persoonlijke aanpak.',
    cta: 'Plan een gesprek',
    navTitle: 'Menu',
    servicesTitle: 'Diensten',
    officeTitle: 'Bezoek',
    officeLine: 'Op afspraak aan de Leliegracht 21',
    officeCity: 'Amsterdam, Nederland',
    officeHours: 'Op afspraak, ook in het weekend',
    directions: 'Route en kaart',
    emailLabel: 'info@hakkenbroek.com',
    phoneLabel: '+31 20 123 4567',
    copyrightNote: 'Lokale begeleiding in Amsterdam, Het Gooi en de Vechtstreek.',
  },
};

function getLocale(pathname: string): Language {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment === 'nl' ? 'nl' : 'en';
}

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const copy = footerCopy[locale];

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-earth text-white">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="max-w-xl">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-100">
              {copy.eyebrow}
            </p>

            <Link href="/" className="mt-4 inline-flex">
              <img
                src="/logo.svg"
                alt="Hakkenbroek Housing Company"
                width="168"
                height="92"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-6 max-w-[20ch] font-display text-[2rem] leading-[1.15] text-white sm:text-[2.35rem]">
              {copy.title}
            </p>

            <p className="mt-4 max-w-md text-[15px] leading-7 text-stone-100 sm:text-base">
              {copy.description}
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center border-b border-brass-light pb-1 text-sm text-white transition-colors duration-300 hover:text-brass-light"
            >
              {copy.cta}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-10">
            <div>
              <h3 className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-100">
                {copy.navTitle}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-100">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-300 hover:text-brass-light"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-100">
                {copy.servicesTitle}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-100">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-300 hover:text-brass-light"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 border-t border-white/15 pt-6 sm:pt-7">
              <h3 className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-100">
                {copy.officeTitle}
              </h3>

              <div className="mt-4 grid gap-3 text-sm text-stone-100 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <p className="text-white">{copy.officeLine}</p>
                  <p className="mt-1">{copy.officeCity}</p>
                  <a
                    href="https://maps.google.com/?q=Leliegracht+21+Amsterdam"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex border-b border-white/30 pb-1 text-white transition-colors duration-300 hover:text-brass-light"
                  >
                    {copy.directions}
                  </a>
                </div>

                <div>
                  <p>{copy.officeHours}</p>
                  <div className="mt-3 space-y-2">
                    <a
                      href="mailto:info@hakkenbroek.com"
                      className="block transition-colors duration-300 hover:text-brass-light"
                    >
                      {copy.emailLabel}
                    </a>
                    <a
                      href="tel:+31201234567"
                      className="block transition-colors duration-300 hover:text-brass-light"
                    >
                      {copy.phoneLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-stone-100">
              &copy; {new Date().getFullYear()} Hakkenbroek Housing Company. {copy.copyrightNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-100">
            <span>{copy.officeLine}</span>
            <div className="rounded-full border border-white/20">
              <LanguageToggle dropUp />
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center border-t border-white/10 py-3">
        <a
          href="https://knowd.nz"
          target="_blank"
          rel="nofollow noreferrer"
          className="text-xs text-stone-200 underline decoration-white/30 hover:text-white transition-colors"
        >
          Website: Knowd Digital
        </a>
      </div>
    </footer>
  );
}

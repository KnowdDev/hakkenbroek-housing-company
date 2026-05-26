'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Compass,
  Key,
  Mail,
  MapPin,
  PhoneCall,
} from 'lucide-react';
import LanguageToggle from './LanguageToggle';

type Language = 'en' | 'nl';

type FooterLink = {
  href: string;
  label: Record<Language, string>;
};

const navLinks: FooterLink[] = [
  { href: '/', label: { en: 'Home', nl: 'Home' } },
  { href: '/about', label: { en: 'About', nl: 'Over ons' } },
  { href: '/services', label: { en: 'Services', nl: 'Diensten' } },
  { href: '/properties', label: { en: 'Properties', nl: 'Woningen' } },
  { href: '/contact', label: { en: 'Contact', nl: 'Contact' } },
];

const serviceLinks: FooterLink[] = [
  { href: '/services/buying', label: { en: 'Buying', nl: 'Aankopen' } },
  { href: '/services/selling', label: { en: 'Selling', nl: 'Verkopen' } },
  { href: '/services/renting', label: { en: 'Renting', nl: 'Huren' } },
  { href: '/services/leasing', label: { en: 'Leasing', nl: 'Verhuren' } },
  {
    href: '/services/property-management',
    label: { en: 'Management', nl: 'Beheer' },
  },
];

const footerCopy = {
  en: {
    eyebrow: 'Since 2000 · Amsterdam, Het Gooi & De Vechtstreek',
    title: 'Your next move,',
    accent: 'properly',
    titleEnd: 'handled.',
    description:
      'From canal houses in Amsterdam to family homes in Het Gooi and the Vechtstreek, we guide buyers, sellers and landlords with honest advice, local knowledge and a calm personal process.',
    primaryCta: 'Get in touch',
    highlights: [
      { value: 'Since 2000', label: 'local market insight' },
      { value: 'English + Dutch', label: 'bilingual guidance' },
      { value: 'Private viewings', label: 'for discreet searches' },
    ],
    navEyebrow: 'Where clients usually start',
    navTitle: 'Browse the essentials',
    servicesEyebrow: 'Advice across the whole move',
    servicesTitle: 'Buying, selling and letting',
    officeEyebrow: 'A quiet office on the Leliegracht',
    officeTitle: 'Come by for a proper conversation',
    officeCity: 'Amsterdam, Netherlands',
    officeHours: 'Monday to Friday · 09:00–18:00',
    directions: 'Map and directions',
    copyrightNote: 'Local guidance for Amsterdam, Het Gooi and the Vechtstreek.',
  },
  nl: {
    eyebrow: 'Sinds 2000 · Amsterdam, Het Gooi & De Vechtstreek',
    title: 'Uw volgende stap,',
    accent: 'discreet',
    titleEnd: 'begeleid.',
    description:
      'Van grachtenpanden in Amsterdam tot gezinswoningen in Het Gooi en de Vechtstreek: wij begeleiden kopers, verkopers en verhuurders met eerlijk advies, lokale kennis en een rustig persoonlijk traject.',
    primaryCta: 'Neem contact op',
    highlights: [
      { value: 'Sinds 2000', label: 'lokale marktkennis' },
      { value: 'Nederlands + Engels', label: 'tweetalige begeleiding' },
      { value: 'Privébezichtigingen', label: 'voor discrete zoektochten' },
    ],
    navEyebrow: 'Waar cliënten meestal beginnen',
    navTitle: 'Bekijk de hoofdroutes',
    servicesEyebrow: 'Advies voor elke volgende stap',
    servicesTitle: 'Kopen, verkopen en verhuren',
    officeEyebrow: 'Een rustig kantoor aan de Leliegracht',
    officeTitle: 'Kom langs voor een goed gesprek',
    officeCity: 'Amsterdam, Nederland',
    officeHours: 'Maandag t/m vrijdag · 09:00–18:00',
    directions: 'Route en kaart',
    copyrightNote: 'Lokale begeleiding in Amsterdam, Het Gooi en de Vechtstreek.',
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    accent: string;
    titleEnd: string;
    description: string;
    primaryCta: string;
    highlights: Array<{ value: string; label: string }>;
    navEyebrow: string;
    navTitle: string;
    servicesEyebrow: string;
    servicesTitle: string;
    officeEyebrow: string;
    officeTitle: string;
    officeCity: string;
    officeHours: string;
    directions: string;
    copyrightNote: string;
  }
>;

function getLocale(pathname: string): Language {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment === 'nl' ? 'nl' : 'en';
}

function getLocalizedHref(locale: Language, href: string) {
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-3 py-2 text-sm text-warm-gray transition duration-300 hover:-translate-y-px hover:border-brass/30 hover:bg-white hover:text-brass';

const cardClass =
  'group relative overflow-hidden rounded-[24px] border border-stone-200 bg-white/80 p-5 shadow-[0_12px_35px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(26,26,26,0.08)]';

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const copy = footerCopy[locale];

  return (
    <footer className="relative overflow-hidden border-t border-stone-200 bg-stone-100 text-ink">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,125,74,0.14),transparent_38%),radial-gradient(circle_at_top_right,rgba(188,179,167,0.3),transparent_34%),linear-gradient(180deg,#f8f6f3_0%,#efeae3_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(130,122,112,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(130,122,112,0.08) 1px, transparent 1px)',
            backgroundSize: '112px 112px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        />
        <div className="absolute -left-16 top-14 h-56 w-56 rounded-full bg-brass-light/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-stone-200/55 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white/55 shadow-[0_22px_70px_rgba(26,26,26,0.06)] backdrop-blur-xl">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6 lg:p-8">
            <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(248,246,243,0.88))] p-6 sm:p-7">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/55 to-transparent" />
              <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
                {copy.eyebrow}
              </p>

              <Link href={getLocalizedHref(locale, '/')} className="mt-4 inline-flex">
                <Image
                  src="/logo.svg"
                  alt="Hakkenbroek Housing Company"
                  width={220}
                  height={64}
                  className="h-14 w-auto"
                />
              </Link>

              <h2 className="mt-6 max-w-[13ch] font-display text-[2rem] leading-[1.12] text-ink sm:text-[2.35rem]">
                {copy.title}{' '}
                <span className="font-normal italic text-brass">{copy.accent}</span>{' '}
                {copy.titleEnd}
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-warm-gray sm:text-base">
                {copy.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {copy.highlights.map((highlight) => (
                  <div
                    key={highlight.value}
                    className="rounded-full border border-stone-200 bg-white/90 px-4 py-2.5 text-sm text-warm-gray"
                  >
                    <span className="font-medium text-ink">{highlight.value}</span>
                    <span className="ml-2 text-stone-500">{highlight.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  href={getLocalizedHref(locale, '/contact')}
                  className="group inline-flex items-center gap-2 rounded-full border border-brass/15 bg-charcoal px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(15,15,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-brass"
                >
                  <span className="whitespace-nowrap">{copy.primaryCta}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <section className={`${cardClass} sm:col-span-2`} aria-labelledby="footer-navigation-title">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-brass transition duration-300 group-hover:border-brass/20 group-hover:bg-white">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
                      {copy.navEyebrow}
                    </p>
                    <h3 id="footer-navigation-title" className="mt-2 font-body text-lg font-medium text-ink">
                      {copy.navTitle}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={getLocalizedHref(locale, link.href)} className={chipClass}>
                      <span className="whitespace-nowrap">{link.label[locale]}</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className={cardClass} aria-labelledby="footer-services-title">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-brass transition duration-300 group-hover:border-brass/20 group-hover:bg-white">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
                      {copy.servicesEyebrow}
                    </p>
                    <h3 id="footer-services-title" className="mt-2 font-body text-lg font-medium text-ink">
                      {copy.servicesTitle}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {serviceLinks.map((link) => (
                    <Link key={link.href} href={getLocalizedHref(locale, link.href)} className={chipClass}>
                      <span className="whitespace-nowrap">{link.label[locale]}</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className={cardClass} aria-labelledby="footer-office-title">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-brass transition duration-300 group-hover:border-brass/20 group-hover:bg-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
                      {copy.officeEyebrow}
                    </p>
                    <h3 id="footer-office-title" className="mt-2 font-body text-lg font-medium text-ink">
                      {copy.officeTitle}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-warm-gray">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                    <span>
                      Leliegracht 21
                      <br />
                      {copy.officeCity}
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 shrink-0 text-stone-400" />
                    <span>{copy.officeHours}</span>
                  </p>
                  <a
                    href="https://maps.google.com/?q=Leliegracht+21+Amsterdam"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink transition duration-300 hover:text-brass"
                  >
                    <span>{copy.directions}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </section>
            </div>
          </div>

          <div className="border-t border-stone-200 px-5 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm text-warm-gray">
                &copy; {new Date().getFullYear()} Hakkenbroek Housing Company. {copy.copyrightNote}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a href="mailto:info@hakkenbroek.com" className={chipClass}>
                  <Mail className="h-4 w-4 text-stone-400" />
                  <span className="whitespace-nowrap">info@hakkenbroek.com</span>
                </a>
                <a href="tel:+31201234567" className={chipClass}>
                  <PhoneCall className="h-4 w-4 text-stone-400" />
                  <span className="whitespace-nowrap">+31 20 123 4567</span>
                </a>
                <div className="rounded-full border border-stone-200 bg-white/80 text-ink">
                  <LanguageToggle scrolled dropUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

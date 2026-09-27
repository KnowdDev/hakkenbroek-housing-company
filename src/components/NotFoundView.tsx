'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { ArrowRight, Home, MapPin } from 'lucide-react';

const copy = {
  en: {
    eyebrow: 'Page not found',
    title: 'We could not find that page',
    lead:
      'The link may be outdated, or the page may have moved. Let us help you back to familiar ground.',
    home: 'Back to home',
    properties: 'View properties',
    contact: 'Contact us',
  },
  nl: {
    eyebrow: 'Pagina niet gevonden',
    title: 'Deze pagina konden we niet vinden',
    lead:
      'De link is mogelijk verouderd, of de pagina is verplaatst. We helpen u graag terug naar bekend terrein.',
    home: 'Terug naar huis',
    properties: 'Bekijk woningen',
    contact: 'Neem contact op',
  },
};

function getLocale(pathname: string): 'en' | 'nl' {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment === 'nl' ? 'nl' : 'en';
}

export default function NotFoundView() {
  const pathname = usePathname() ?? '';
  const locale = getLocale(pathname);
  const t = copy[locale];

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-stone-50">
      <div className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-2">
        <div className="relative order-2 lg:order-1 min-h-[40vh] lg:min-h-full">
          <img
            src="/about-home-2.webp"
            alt=""
            width={1444}
            height={1696}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/15 to-transparent lg:bg-gradient-to-r lg:from-charcoal/35 lg:via-transparent lg:to-transparent" />
          <p
            className="absolute bottom-8 left-8 font-display text-[7rem] leading-none text-white/25 sm:text-[9rem] lg:text-[11rem]"
            aria-hidden
          >
            404
          </p>
        </div>

        <div className="relative order-1 lg:order-2 flex items-center px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative max-w-md">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brass mb-5">{t.eyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl text-charcoal leading-[1.1] mb-5">{t.title}</h1>
            <p className="font-body text-base text-warm-gray leading-relaxed mb-10">{t.lead}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-charcoal text-white px-8 py-4 font-body text-sm uppercase tracking-wider hover:bg-ink transition-colors duration-300"
              >
                <Home className="h-4 w-4" />
                {t.home}
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 border border-charcoal text-charcoal px-8 py-4 font-body text-sm uppercase tracking-wider hover:border-brass hover:text-brass transition-colors duration-300"
              >
                {t.properties}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border-b border-charcoal pb-1 font-body text-sm uppercase tracking-wider text-charcoal hover:text-brass hover:border-brass transition-colors duration-300"
            >
              <MapPin className="h-3.5 w-3.5" />
              {t.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

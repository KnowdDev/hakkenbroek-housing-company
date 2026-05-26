'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from '@/navigation';

const languageNames: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands'
};

type Language = 'en' | 'nl';

interface LanguageToggleProps {
  scrolled?: boolean;
  dropUp?: boolean;
}

export default function LanguageToggle({ scrolled = false, dropUp = false }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<Language>('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const segments = window.location.pathname.split('/').filter(Boolean);
      if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl')) {
        setLocale(segments[0] as Language);
      }
    }
  }, [pathname]);

  const handleLocaleChange = (newLocale: Language) => {
    setLocale(newLocale);
    setIsOpen(false);
    // next-intl router handles translated pathname swap automatically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (router.replace as any)(pathname, { locale: newLocale });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 text-xs font-body uppercase tracking-wider transition-colors duration-300 ${
          scrolled ? 'text-stone-600 hover:text-brass' : 'text-white/90 hover:text-white'
        }`}
        aria-label="Select language"
      >
        <span>{languageNames[locale]}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 w-40 bg-stone-50 rounded-lg shadow-lg border border-stone-200 z-50 overflow-hidden ${dropUp ? 'bottom-full mb-2' : 'mt-2'}`}>
            {(Object.keys(languageNames) as Language[]).map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left px-4 py-3 text-sm font-body transition-colors duration-200 ${
                  locale === loc
                    ? 'bg-brass text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {languageNames[loc]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

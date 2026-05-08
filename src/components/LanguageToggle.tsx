'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const languageNames: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  es: 'Español'
};

type Language = 'en' | 'nl' | 'es';

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<Language>('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl' || segments[0] === 'es')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  const handleLocaleChange = (newLocale: Language) => {
    setLocale(newLocale);
    setIsOpen(false);
    
    // Replace locale in pathname
    const segments = pathname.split('/').filter(Boolean);
    const currentLocaleIndex = segments.findIndex(seg => seg === 'en' || seg === 'nl' || seg === 'es');
    
    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-xs font-body uppercase tracking-wider text-stone-600 hover:text-brass transition-colors duration-300"
        aria-label="Select language"
      >
        <span>{languageNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-stone-200 z-50 overflow-hidden">
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

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { translations, Language } from '@/lib/translations';

export function useTranslations() {
  const [locale, setLocale] = useState<Language>('en');
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'nl')) {
      setLocale(segments[0] as Language);
    }
  }, [pathname]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const tArray = (key: string): string[] => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return []; // Return empty array if translation not found
      }
    }
    
    return Array.isArray(value) ? value : [];
  };

  return { t, tArray, locale };
}

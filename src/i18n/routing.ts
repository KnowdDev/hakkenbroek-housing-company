import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      nl: '/over-ons'
    },
    '/buying': {
      en: '/buying',
      nl: '/kopen'
    },
    '/selling': {
      en: '/selling',
      nl: '/verkopen'
    },
    '/contact': {
      en: '/contact',
      nl: '/contact'
    },
    '/properties': {
      en: '/properties',
      nl: '/vastgoed'
    },
    '/services': {
      en: '/services',
      nl: '/diensten'
    },
    '/services/buying': {
      en: '/services/buying',
      nl: '/diensten/kopen'
    },
    '/services/selling': {
      en: '/services/selling',
      nl: '/diensten/verkopen'
    },
    '/services/renting': {
      en: '/services/renting',
      nl: '/diensten/huren'
    },
    '/services/leasing': {
      en: '/services/leasing',
      nl: '/diensten/verhuur'
    },
    '/services/expat-services': {
      en: '/services/expat-services',
      nl: '/diensten/expat-diensten'
    },
    '/services/property-management': {
      en: '/services/property-management',
      nl: '/diensten/vastgoedbeheer'
    },
    '/properties/[id]': {
      en: '/properties/[id]',
      nl: '/vastgoed/[id]'
    }
  }
});

export type Locale = (typeof routing.locales)[number];

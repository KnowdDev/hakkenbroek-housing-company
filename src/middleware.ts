import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'nl', 'es'] as const;
const defaultLocale = 'en' as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for login, dashboard, and static assets
  if (pathname.startsWith('/login') || pathname.startsWith('/dashboard') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Only redirect if there is no locale in the pathname
  if (!pathnameHasLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'nl', 'es'] as const;
const defaultLocale = 'en' as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for login and static assets
  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Check authentication for dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('dashboard_token')?.value;
    const correctToken = 'hakkenbroek-admin-2024';
    
    if (!token || token !== correctToken) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Only redirect if there is no locale in the pathname (and not dashboard)
  if (!pathnameHasLocale && !pathname.startsWith('/dashboard')) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

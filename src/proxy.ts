import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const { pathname } = request.nextUrl;

  // Skip API routes, internal Next paths, login & dashboard, static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/dashboard') ||
    pathname.includes('.')
  ) {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|login|dashboard|.*\\..*).*)']
};

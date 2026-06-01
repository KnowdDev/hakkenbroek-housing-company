const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trim runtime headers and enable React strict checks.
  poweredByHeader: false,
  reactStrictMode: true,
  // Strip console.* from production bundles (keep errors/warnings).
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  // Tree-shake large icon/util packages so only used exports are bundled.
  experimental: {
    optimizePackageImports: ['lucide-react'],
    instrumentationHook: true,
  },
  images: {
    // Raw <img> tags are used throughout, so keep optimization off to avoid
    // behavioural changes, but allow modern formats + long CDN cache for any
    // future next/image usage.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-91c40fba6497449ab096d3657b550a87.r2.dev' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

module.exports = withNextIntl(nextConfig)

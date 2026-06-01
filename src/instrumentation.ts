export async function register() {
  console.log('[instrumentation] Next.js server starting, NODE_ENV:', process.env.NODE_ENV);
  console.log('[instrumentation] Has DATABASE_URL:', !!process.env.DATABASE_URL);
  console.log('[instrumentation] Has URL:', !!process.env.URL);
}

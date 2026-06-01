'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('[global-error] Unhandled error at root layout:', {
    message: error.message,
    digest: error.digest,
    stack: error.stack,
  });

  return (
    <html>
      <body>
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          <h2>Something went wrong</h2>
          <p>Reference: {error.digest}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}

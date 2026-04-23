'use client'

/**
 * Catches errors in the root layout. Must define its own html/body.
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#171717', color: '#f2f2f2', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: 24, maxWidth: 560 }}>
          <h1 style={{ color: '#CCBB98', fontSize: '1.5rem' }}>Application error</h1>
          <p style={{ color: '#fecaca', fontSize: 14 }}>{error.message}</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 16,
              padding: '10px 18px',
              backgroundColor: '#C89212',
              color: '#000',
              border: 'none',
              borderRadius: 4,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

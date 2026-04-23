'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        minHeight: '40vh',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#171717',
        color: '#f2f2f2',
      }}
    >
      <h2 style={{ color: '#CCBB98', marginTop: 0 }}>Something went wrong</h2>
      <pre
        style={{
          color: '#fecaca',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 14,
        }}
      >
        {error.message}
      </pre>
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
  )
}

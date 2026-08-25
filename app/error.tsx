'use client'

// Displays a recoverable inline error for public route data failures.

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="app"><div className="form-page"><p className="error">Something went wrong while loading this journey.</p><button className="primary full" onClick={() => reset()}>Try again</button></div></main>
}

'use client'

// Displays a recoverable inline error for tour collection failures.

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="app"><div className="form-page"><p className="error">Something went wrong while loading the tours.</p><button className="primary full" onClick={() => reset()}>Try again</button></div></main>
}

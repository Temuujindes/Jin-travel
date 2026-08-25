'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return <html lang="en"><body><main className="app"><div className="form-page"><h1 className="serif">Something went wrong</h1><p className="muted">Sorry, something went wrong. Please try again.</p>{error.digest && <p className="muted">Reference: {error.digest}</p>}<button className="primary full" onClick={reset}>Try again</button></div></main></body></html>
}

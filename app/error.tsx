'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return <main className="app"><div className="form-page"><h1 className="serif">Something went wrong</h1><p className="muted">Sorry, we couldn't load this page. Please try again.</p>{error.digest && <p className="muted">Reference: {error.digest}</p>}<button className="primary full" onClick={reset}>Try again</button><Link href="/">Back home</Link></div></main>
}

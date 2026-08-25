'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return <div className="admin-app"><section className="admin-content"><div className="admin-panel"><h1>Something went wrong</h1><p className="muted">Sorry, we couldn't load this dashboard page. Please try again.</p>{error.digest && <p className="muted">Reference: {error.digest}</p>}<button className="admin-button" onClick={reset}>Try again</button><Link href="/">Back home</Link></div></section></div>
}

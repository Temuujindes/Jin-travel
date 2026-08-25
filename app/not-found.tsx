import Link from 'next/link'

export default function NotFound() {
  return <main className="app"><div className="form-page"><h1 className="serif">Page not found</h1><p className="muted">We couldn't find the page you're looking for.</p><Link href="/" className="primary full">Back home</Link></div></main>
}

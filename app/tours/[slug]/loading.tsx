// Shows the existing card and typography language while a tour detail loads.

export default function Loading() {
  return <main className="app" aria-busy="true"><div className="detail-hero" /><div className="detail-copy"><span className="badge">Loading</span><h1 className="serif">Loading journey...</h1></div></main>
}

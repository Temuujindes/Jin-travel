'use client'

import type { ReactNode } from 'react'

export function PageTop({ eyebrow, title, children }: { eyebrow: ReactNode; title: ReactNode; children?: ReactNode }) {
  return <div className="page-top"><div className="eyebrow">{eyebrow}</div><h1 className="serif">{title}</h1>{children}</div>
}

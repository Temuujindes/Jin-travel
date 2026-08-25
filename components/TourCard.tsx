'use client'

import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { localizedTitle } from '../lib/tour-utils'
import { Language, Tour } from '../lib/types'

export function TourCard({ tour, language, caption, priceNote, action, style }: { tour: Tour; language: Language; caption: ReactNode; priceNote: ReactNode; action: ReactNode; style?: CSSProperties }) {
  return <article className="tour-card" style={style}><Image src={tour.image} alt={tour.title} width={560} height={360} /><div className="tour-info"><span className="badge">{tour.badge}</span><h3>{localizedTitle(tour, language)}</h3><p className="muted">{caption}</p><div className="tour-bottom"><div className="price">${tour.priceUsd}<small>{priceNote}</small></div>{action}</div></div></article>
}

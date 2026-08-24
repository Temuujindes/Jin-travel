'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { tours } from '../lib/mock-data/tours'
import { BottomNav, Header, useLanguage } from './AppShell'

export default function ToursScreen() { const { language, setLanguage, t } = useLanguage(); return <main className="app"><Header /><div className="page-top"><div className="eyebrow">{t('collection')}</div><h1 className="serif">{t('roomToBreathe')}</h1></div><section className="section" style={{ paddingTop: 0 }}>{tours.map((tour) => <article className="tour-card" style={{ marginBottom: 18 }} key={tour.slug}><Image src={tour.image} alt={tour.title} width={560} height={360} /><div className="tour-info"><span className="badge">{tour.badge}</span><h3>{tour.localizedTitle?.[language] || tour.title}</h3><p className="muted">{tour.localizedSubtitle?.[language] || tour.subtitle}</p><div className="tour-bottom"><div className="price">${tour.priceUsd}<small>{tour.duration} · {tour.priceMnt}</small></div><Link className="primary" href={`/tours/${tour.slug}`}>{t('detail')}<ArrowUpRight size={15} /></Link></div></div></article>)}</section><BottomNav /></main> }
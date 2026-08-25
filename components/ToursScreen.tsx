'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { localizedSubtitle } from '../lib/tour-utils'
import { tours } from '../lib/mock-data/tours'
import { Shell } from './AppShell'
import { useTranslation } from './LanguageContext'
import { PageTop } from './PageTop'
import { TourCard } from './TourCard'

export default function ToursScreen() { const { language, t } = useTranslation(); return <Shell><PageTop eyebrow={t('collection')} title={t('roomToBreathe')} /><section className="section" style={{ paddingTop: 0 }}>{tours.map((tour) => <TourCard key={tour.slug} tour={tour} language={language} style={{ marginBottom: 18 }} caption={localizedSubtitle(tour, language)} priceNote={`${tour.duration} · ${tour.priceMnt}`} action={<Link className="primary" href={`/tours/${tour.slug}`}>{t('detail')}<ArrowUpRight size={15} /></Link>} />)}</section></Shell> }
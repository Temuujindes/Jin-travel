'use client'

import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Compass, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { localizedSubtitle } from '../lib/tour-utils'
import { featuredTour, tours } from '../lib/mock-data/tours'
import { Shell } from './AppShell'
import { TourCard } from './TourCard'
import { useTranslation } from './LanguageContext'

export default function HomeScreen() {
  const { language, t } = useTranslation(); const [slide, setSlide] = useState(0)
  const slides = [featuredTour.image, featuredTour.gallery[1], featuredTour.gallery[2]]
  return <Shell><section className="hero"><div className="hero-slide active" style={{ backgroundImage: `url(${slides[slide]})` }} /><div className="hero-copy"><div className="eyebrow">JIN Travel · Mongolia</div><h1 className="serif">{t('featured')}</h1><p>{localizedSubtitle(featuredTour, language)}</p><Link href="/tours/gobi-4d" className="primary">{t('detail')}<ArrowUpRight size={15} /></Link><div className="dots" aria-label="Hero slides">{slides.map((_, index) => <button aria-label={`Show slide ${index + 1}`} key={index} className={`dot ${slide === index ? 'active' : ''}`} onClick={() => setSlide(index)} />)}</div></div></section><section className="section"><div className="section-head"><div><div className="eyebrow">{t('curated')}</div><h2 className="serif">{t('featured')}</h2></div><Link className="text-link" href="/tours">{t('viewAll')}</Link></div><div className="tour-scroller">{tours.map((tour) => <TourCard key={tour.slug} tour={tour} language={language} caption={tour.duration} priceNote={tour.priceMnt} action={<Link className="mini-link" href={`/tours/${tour.slug}`}>{t('exploreTour')} ↗</Link>} />)}</div></section><section className="section"><div className="eyebrow">{t('makeYours')}</div><h2 className="serif">{t('slower')}</h2><div className="actions"><Link href="/tours" className="action"><CompassIcon /><span>{t('gobiTours')}</span></Link><Link href="/contact" className="action"><MessageCircle size={19} /><span>{t('kakaoChat')}</span></Link><Link href="/tours/gobi-4d/book" className="action"><CalendarDays size={19} /><span>{t('bookingRequest')}</span></Link></div></section><section className="trust"><div><strong>4.9/5</strong><span>{t('customerRating')}</span></div><div><strong>500+</strong><span>{t('travelers')}</span></div><div><strong>Local</strong><span>{t('localGuides')}</span></div><div><strong>Private</strong><span>{t('privateJourneys')}</span></div></section></Shell>
}

function CompassIcon() { return <Compass size={19} /> }
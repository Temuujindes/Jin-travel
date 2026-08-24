'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Heart, MapPin, Share2, Star, Tent, UsersRound, CarFront } from 'lucide-react'
import { useState } from 'react'
import { tours } from '../lib/mock-data/tours'
import { Tour } from '../lib/types'
import { BottomNav, Header } from './AppShell'
import { useTranslation } from './LanguageContext'

export default function TourDetailScreen({ slug = 'gobi-4d', tourOverride }: { slug?: string; tourOverride?: Tour }) {
  const { language, t } = useTranslation()
  const [photo, setPhoto] = useState(0)
  const [openDay, setOpenDay] = useState(0)
  const [liked, setLiked] = useState(false)
  const tour = tourOverride || tours.find((item) => item.slug === slug) || tours[0]
  const localizedTitles: Record<string, Partial<Record<typeof language, string>>> = { 'gobi-4d': { mn: 'Говийн 4 өдрийн аялал', kr: '고비 익스프레스 & 낙타 트레킹', en: '4-Day Gobi Express & Camel Trekking' }, 'central-6d': { mn: 'Говь ба Төв Монголын аялал', kr: '고비 & 중앙 몽골 6일', en: '6-Day Ultimate Gobi & Central Mongolia' }, 'khuvsgul-3d': { mn: 'Хөвсгөл нуурын аялал', kr: '홉스골 호수 3일', en: '3-Day Khuvsgul Lake Express' } }
  const title = tour.localizedTitle?.[language] || localizedTitles[tour.slug]?.[language] || tour.title
  const subtitle = tour.localizedSubtitle?.[language] || tour.subtitle
  return <main className="app"><Header /><section className="detail-hero"><Image src={tour.gallery[photo] || tour.image} alt={title} fill sizes="430px" priority /><div className="detail-tools"><Link href="/" className="icon-btn" aria-label={t('back')}><ArrowLeft size={17} /></Link><div className="tool-row"><button className="icon-btn" aria-label={t('saveTour')} onClick={() => setLiked(!liked)}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button><button className="icon-btn" aria-label={t('shareTour')}><Share2 size={17} /></button></div></div><div className="counter">{photo + 1} / {tour.gallery.length}</div></section><div className="detail-copy"><span className="badge">{tour.badge}</span><h1 className="serif">{title}</h1><p className="muted">{subtitle}</p><div className="rating"><Star size={14} fill="currentColor" className="star" /><strong>{tour.rating}</strong><span className="muted">{tour.reviews} reviews</span></div><div className="facts"><span className="fact"><MapPin size={15} /> {tour.duration}</span><span className="fact"><CarFront size={15} /> 4x4 SUV</span><span className="fact"><Tent size={15} /> Ger Camp</span><span className="fact"><UsersRound size={15} /> {t('localGuides')}</span></div></div><div className="section" style={{ paddingTop: 26 }}><div className="tour-scroller">{tour.gallery.map((src, index) => <button key={src} aria-label={`${t('gallery')} ${index + 1}`} onClick={() => setPhoto(index)} style={{ border: index === photo ? '2px solid #d97706' : '0', padding: 0, borderRadius: 10, overflow: 'hidden', minWidth: 78, height: 56, background: 'none' }}><Image src={src} alt={`${title} ${index + 1}`} width={120} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></button>)}</div></div><section className="itinerary"><h2 className="serif">{t('route')}</h2>{tour.itinerary.map((day, index) => <div className="day" key={day.day}><button className="day-button" onClick={() => setOpenDay(openDay === index ? -1 : index)} aria-expanded={openDay === index}><span className="day-number">0{day.day}</span><span className="day-title">{day.title}</span><ChevronDown size={17} style={{ transform: openDay === index ? 'rotate(180deg)' : 'none', transition: '.2s' }} /></button><AnimatePresence>{openDay === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="day-content"><Image src={day.image} alt={day.title} width={80} height={80} /><div><p>{day.distance || t('route')}</p><p>{t('meals')}: {day.meals.join(', ')}<br />{t('stay')}: {day.accommodation}</p><p>{day.descriptions?.[language]}</p><div className="tags">{day.activities.map((activity) => <span className="tag" key={activity}>{activity}</span>)}</div></div></motion.div>}</AnimatePresence></div>)}</section><BottomNav /><div className="booking-bar"><div className="price">${tour.priceUsd} <small>{t('perPerson')}</small></div><Link href={`/tours/${tour.slug}/book`} className="primary">{t('book')}</Link></div></main>
}

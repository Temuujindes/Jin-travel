'use client'

import Link from 'next/link'
import { ArrowUpRight, CalendarDays, MessageCircle, Users } from 'lucide-react'
import { booking } from '../lib/mock-data/bookings'
import { localizedTitle } from '../lib/tour-utils'
import { tours } from '../lib/mock-data/tours'
import { Shell } from './AppShell'
import { useTranslation } from './LanguageContext'
import { PageTop } from './PageTop'

export default function MyBookingScreen() { const { t, language } = useTranslation(); const tour = tours[0]; return <Shell><PageTop eyebrow={t('myJourney')} title={t('booking')}><article className="booking-card"><span className="status">{t('requestSubmitted')}</span><h2>{localizedTitle(tour, language)}</h2><p className="muted" style={{ fontSize: 12, margin: 0 }}>{booking.reference}</p><div className="booking-meta"><div><span><CalendarDays size={12} /> {t('date')}</span><strong>{booking.date}</strong></div><div><span><Users size={12} /> {t('travelers')}</span><strong>{booking.travelers}</strong></div><div><span>{t('priceUsd')}</span><strong>${booking.total}</strong></div></div></article><div className="timeline"><div className="timeline-item"><strong>{t('requestSubmitted')}</strong><span>{t('date')} · {t('requestSubmitted')}</span></div><div className="timeline-item"><strong>{t('managerContact')}</strong><span>{t('within15')}</span></div><div className="timeline-item"><strong>{t('bookingConfirmation')}</strong><span>{t('status')}: {t('requestSubmitted')}</span></div><div className="timeline-item"><strong>{t('trip')}</strong><span>September 14, 2026</span></div></div><Link href="/contact" className="primary" style={{ width: '100%' }}><MessageCircle size={16} />{t('chat')}<ArrowUpRight size={15} /></Link></PageTop></Shell> }

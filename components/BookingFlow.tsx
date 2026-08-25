'use client'

import Link from 'next/link'
import { Check, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { createBooking } from '../app/actions/bookings'
import type { Tour } from '../lib/types'
import { BottomNav, Header } from './AppShell'
import { useTranslation } from './LanguageContext'

export default function BookingFlow({ tour, tourId }: { tour: Tour; tourId: string }) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [travelers, setTravelers] = useState(2)
  const [startDate, setStartDate] = useState('2026-09-14')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [specialRequest, setSpecialRequest] = useState('')
  const [referenceCode, setReferenceCode] = useState('')
  const [error, setError] = useState('')
  const submit = async () => {
    if (!name.trim() || !contact.trim()) { setError(t('customerName')); return }
    const result = await createBooking({ tourId, customerName: name, contact, startDate, travelers, specialRequest })
    if (!result.success) { setError(t(result.code)); return }
    setError(''); setReferenceCode(result.referenceCode); setStep(3)
  }
  return <main className="app"><Header />{step === 3 ? <div className="form-page success"><div className="check"><Check size={38} strokeWidth={1.5} /></div><div className="eyebrow">JIN Travel</div><h1 className="serif">{t('bookingComplete')}</h1><p>{t('managerMessage')}</p><div className="reference">{t('reference')}<strong>{referenceCode}</strong></div><Link href="/" className="primary full">{t('home')}</Link></div> : <div className="form-page"><div className="eyebrow">{t('bookingRequest')}</div><div className="steps"><span className="step current" /><span className={`step ${step >= 2 ? 'current' : ''}`} /><span className="step" /></div>{step === 1 ? <><h1 className="serif">{t('tripDetails')}</h1><p>{t('slower')}</p><div className="field"><label htmlFor="date">{t('startDate')}</label><input id="date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></div><div className="field"><label>{t('travelers')}</label><div className="counter-control"><button aria-label="Remove traveler" onClick={() => setTravelers(Math.max(1, travelers - 1))}><Minus size={15} /></button><strong>{travelers}</strong><button aria-label="Add traveler" onClick={() => setTravelers(travelers + 1)}><Plus size={15} /></button></div></div><div className="total-line"><span>{t('bookingRequest')}</span><strong>${tour.priceUsd * travelers}</strong></div><button className="primary full" onClick={() => setStep(2)}>{t('continue')}</button></> : <><h1 className="serif">{t('yourDetails')}</h1><p>{t('managerMessage')}</p><div className="field"><label htmlFor="name">{t('customerName')}</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder={t('customerName')} /></div><div className="field"><label htmlFor="contact">{t('kakaoId')}</label><input id="contact" value={contact} onChange={(event) => setContact(event.target.value)} placeholder={t('kakaoId')} /></div><div className="field"><label htmlFor="request">{t('specialRequest')} <span className="muted">{t('optional')}</span></label><textarea id="request" value={specialRequest} onChange={(event) => setSpecialRequest(event.target.value)} placeholder={t('specialRequest')} /></div>{error && <p className="error">{error}</p>}<button className="primary full" onClick={submit}>{t('sendRequest')}</button></>}</div>}<BottomNav /></main>
}

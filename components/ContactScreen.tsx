'use client'

import Link from 'next/link'
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Shell } from './AppShell'
import { useTranslation } from './LanguageContext'
import { PageTop } from './PageTop'

export default function ContactScreen() { const { t } = useTranslation(); const rows = [{ icon: MessageCircle, label: 'KakaoTalk', value: '@jintravel' }, { icon: Phone, label: 'Phone', value: '+976 9911 2040' }, { icon: Mail, label: 'Email', value: 'hello@jintravel.mn' }, { icon: MapPin, label: t('office'), value: 'Ulaanbaatar, Mongolia' }]; return <Shell><PageTop eyebrow={t('contact')} title={t('planVast')}><p className="muted" style={{ marginTop: 18, fontSize: 14, lineHeight: 1.6 }}>{t('editAll')}</p><div className="contact-list">{rows.map(({ icon: Icon, label, value }) => <div className="contact-row" key={label}><div className="contact-icon"><Icon size={18} /></div><div><span>{label}</span><strong>{value}</strong></div></div>)}<div className="contact-row"><div className="contact-icon"><Clock3 size={18} /></div><div><span>{t('responseTime')}</span><strong>{t('within15Full')}</strong></div></div></div><a href="https://open.kakao.com" className="primary" style={{ width: '100%' }}>{t('chat')}<ArrowUpRight size={15} /></a><Link href="/tours/gobi-4d/book" className="secondary" style={{ width: '100%', marginTop: 10 }}>{t('bookingRequest')}</Link></PageTop></Shell> }

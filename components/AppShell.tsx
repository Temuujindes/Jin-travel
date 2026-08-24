'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Home, MessageCircle, Ticket, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Language } from '../lib/types'
import { Translate, useTranslation } from './LanguageContext'

export function useLanguage() { return useTranslation() }

export function Header(_props?: { language?: Language; setLanguage?: (language: Language) => void }) {
  const { language, setLanguage, t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 22); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <header className={`topbar ${scrolled ? 'scrolled' : ''}`}><Link href="/" className="wordmark">JIN / TRAVEL</Link><div className="top-actions"><div className="lang" aria-label={t('languageSelector')}>{(['mn', 'kr', 'en'] as Language[]).map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div><a href="https://open.kakao.com" className="icon-btn" aria-label={t('chat')}><MessageCircle size={17} /></a></div></header>
}

export function BottomNav({ t: providedT }: { t?: Translate }) {
  const { t: contextT } = useTranslation(); const t = providedT || contextT
  const pathname = usePathname()
  const items = [{ href: '/', label: t('home'), icon: Home }, { href: '/tours', label: t('tours'), icon: Compass }, { href: '/my-booking', label: t('booking'), icon: Ticket }, { href: '/contact', label: t('contact'), icon: MessageCircle }]
  return <nav className="bottom-nav" aria-label="Main navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${pathname === href ? 'active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></Link>)}</nav>
}

export function Shell({ children, bookingBar = false }: { children: React.ReactNode; bookingBar?: boolean }) { const { t } = useTranslation(); return <main className="app"><Header />{children}{bookingBar && <div className="booking-bar"><div><div className="price">$580 <small>{t('perPerson')}</small></div></div><Link href="/tours/gobi-4d/book" className="primary">{t('book')}<ArrowUpRight size={15} /></Link></div>}<BottomNav /></main> }
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Home, MessageCircle, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Translate, useTranslation } from './LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { language, setLanguage, t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 22); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <header className={`topbar ${scrolled ? 'scrolled' : ''}`}><Link href="/" className="wordmark">JIN / TRAVEL</Link><div className="top-actions"><LanguageSwitcher className="lang" label={t('languageSelector')} value={language} onChange={setLanguage} /><a href="https://open.kakao.com" className="icon-btn" aria-label={t('chat')}><MessageCircle size={17} /></a></div></header>
}

export function BottomNav({ t: providedT }: { t?: Translate }) {
  const { t: contextT } = useTranslation(); const t = providedT || contextT
  const pathname = usePathname()
  const items = [{ href: '/', label: t('home'), icon: Home }, { href: '/tours', label: t('tours'), icon: Compass }, { href: '/my-booking', label: t('booking'), icon: Ticket }, { href: '/contact', label: t('contact'), icon: MessageCircle }]
  return <nav className="bottom-nav" aria-label="Main navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${pathname === href ? 'active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></Link>)}</nav>
}

export function Shell({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) { return <main className="app"><Header />{children}<BottomNav />{footer}</main> }
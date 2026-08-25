'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Compass, Home, Menu, MessageCircle, Ticket, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Language } from '../lib/types'
import { Translate, useTranslation } from './LanguageContext'

export function useLanguage() { return useTranslation() }

export function Header(_props?: { language?: Language; setLanguage?: (language: Language) => void }) {
  const { language, setLanguage, t } = useTranslation()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 22); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  const links = [{ href: '/tours', label: t('tourPackages') }, { href: '/my-booking', label: t('myBooking') }, { href: '/contact', label: t('contact') }, { href: '/dashboard', label: t('dashboard') }]
  return <header className={`topbar ${pathname === '/' || pathname === '/tours/gobi-4d' ? 'hero-topbar' : ''} ${scrolled ? 'scrolled' : ''}`}><div className="container topbar-inner"><Link href="/" className="wordmark" onClick={() => setMenuOpen(false)}><Image src="/logo-mark.jpg" alt="JIN Travel Mongolia" width={38} height={38} priority /><span>JIN / TRAVEL</span></Link><nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">{links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href || (href !== '/dashboard' && pathname.startsWith(href)) ? 'page' : undefined} className={pathname === href || (href !== '/dashboard' && pathname.startsWith(href)) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav><div className="top-actions"><div className="lang" aria-label={t('languageSelector')}>{(['mn', 'kr', 'en'] as Language[]).map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div><a href="https://open.kakao.com" aria-label={t('chat')} className="primary header-cta">{t('chat')}<ArrowUpRight size={14} /></a><button className="menu-toggle" aria-label={t('menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></div></header>
}

export function Footer() {
  const { language, setLanguage, t } = useTranslation()
  const languages: Language[] = ['mn', 'kr', 'en']
  return <footer className="footer"><div className="container footer-grid"><div><Link href="/" className="wordmark"><Image src="/logo-mark.jpg" alt="JIN Travel Mongolia" width={34} height={34} /><span>JIN / TRAVEL</span></Link><p>{t('footerTagline')}</p></div><div><strong>{t('tourPackages')}</strong><Link href="/tours">{t('tours')}</Link><Link href="/tours/gobi-4d">{t('gobiTours')}</Link></div><div><strong>{t('contact')}</strong><span>KakaoTalk · @jintravel</span><span>+976 9911 2040</span><span>hello@jintravel.mn</span></div><div><strong>{t('languageSelector')}</strong><div className="footer-languages">{languages.map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div></div></div><div className="container footer-bottom"><span>© 2026 JIN Travel</span><span>{t('allRightsReserved')}</span></div></footer>
}

export function BottomNav({ t: providedT }: { t?: Translate }) {
  const { t: contextT } = useTranslation(); const t = providedT || contextT
  const pathname = usePathname()
  const items = [{ href: '/', label: t('home'), icon: Home }, { href: '/tours', label: t('tours'), icon: Compass }, { href: '/my-booking', label: t('booking'), icon: Ticket }, { href: '/contact', label: t('contact'), icon: MessageCircle }]
  return <><Footer /><nav className="bottom-nav" aria-label="Main navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${pathname === href ? 'active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></Link>)}</nav></>
}

export function Shell({ children, bookingBar = false }: { children: React.ReactNode; bookingBar?: boolean }) { const { t } = useTranslation(); return <main className="app"><Header />{children}{bookingBar && <div className="booking-bar"><div><div className="price">$580 <small>{t('perPerson')}</small></div></div><Link href="/tours/gobi-4d/book" className="primary">{t('book')}<ArrowUpRight size={15} /></Link></div>}<BottomNav /></main> }
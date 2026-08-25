'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, BookOpen, ChevronRight, LayoutDashboard, LogOut, Menu, MessageSquare, PanelLeftClose, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Language } from '../../lib/types'
import { useTranslation } from '../LanguageContext'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const [drawerOpen, setDrawerOpen] = useState(false); const { language, setLanguage, t } = useTranslation()
  const navigation = [{ href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard }, { href: '/dashboard/tours', label: t('tourPackages'), icon: BookOpen }, { href: '/dashboard/tours/builder', label: t('itineraryBuilder'), icon: PanelLeftClose }, { href: '/dashboard/inquiries', label: t('inquiries'), icon: MessageSquare }, { href: '/dashboard/analytics', label: t('analytics'), icon: BarChart3 }]
  return <div className="admin-app"><button className="admin-mobile-menu" onClick={() => setDrawerOpen(true)} aria-label={t('dashboard')}><Menu size={20} /></button><aside className={`admin-sidebar ${drawerOpen ? 'is-open' : ''}`}><div className="admin-brand"><Image className="admin-brand-mark" src="/logo-mark.jpg" alt="JIN Travel Mongolia" width={30} height={30} /><div><strong>JIN Travel</strong><small>{t('workspaceOwner')}</small></div><button className="admin-close" onClick={() => setDrawerOpen(false)} aria-label={t('back')}><X size={18} /></button></div><div className="admin-nav-label">{t('workspace')}</div><nav>{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setDrawerOpen(false)} className={pathname === href || (href !== '/dashboard' && pathname.startsWith(href)) ? 'admin-nav-link active' : 'admin-nav-link'}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{pathname === href && <ChevronRight size={14} className="admin-nav-arrow" />}</Link>)}</nav><div className="admin-sidebar-footer"><div className="admin-avatar">JT</div><div><strong>JIN team</strong><small>{t('workspaceOwner')}</small></div></div></aside>{drawerOpen && <button className="admin-overlay" onClick={() => setDrawerOpen(false)} aria-label={t('back')} /> }<section className="admin-content"><div className="admin-language-switcher" aria-label={t('languageSelector')}><div>{(['mn', 'kr', 'en'] as Language[]).map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div><button className="admin-header-action" onClick={() => signOut({ callbackUrl: '/dashboard/login' })}><LogOut size={14} />{t('logout')}</button></div>{children}</section></div>
}

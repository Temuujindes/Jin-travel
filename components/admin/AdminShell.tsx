'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, BookOpen, ChevronRight, LayoutDashboard, Menu, MessageSquare, PanelLeftClose, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from '../LanguageContext'
import { LanguageSwitcher } from '../LanguageSwitcher'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const [drawerOpen, setDrawerOpen] = useState(false); const { language, setLanguage, t } = useTranslation()
  const navigation = [{ href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard }, { href: '/dashboard/tours', label: t('tourPackages'), icon: BookOpen }, { href: '/dashboard/tours/builder', label: t('itineraryBuilder'), icon: PanelLeftClose }, { href: '/dashboard/inquiries', label: t('inquiries'), icon: MessageSquare }, { href: '/dashboard/analytics', label: t('analytics'), icon: BarChart3 }]
  return <div className="admin-app"><button className="admin-mobile-menu" onClick={() => setDrawerOpen(true)} aria-label={t('dashboard')}><Menu size={20} /></button><aside className={`admin-sidebar ${drawerOpen ? 'is-open' : ''}`}><div className="admin-brand"><span className="admin-brand-mark">J</span><div><strong>JIN Travel</strong><small>{t('workspaceOwner')}</small></div><button className="admin-close" onClick={() => setDrawerOpen(false)} aria-label={t('back')}><X size={18} /></button></div><div className="admin-nav-label">{t('workspace')}</div><nav>{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setDrawerOpen(false)} className={pathname === href || (href !== '/dashboard' && pathname.startsWith(href)) ? 'admin-nav-link active' : 'admin-nav-link'}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{pathname === href && <ChevronRight size={14} className="admin-nav-arrow" />}</Link>)}</nav><div className="admin-sidebar-footer"><div className="admin-avatar">JT</div><div><strong>JIN team</strong><small>{t('workspaceOwner')}</small></div></div></aside>{drawerOpen && <button className="admin-overlay" onClick={() => setDrawerOpen(false)} aria-label={t('back')} /> }<section className="admin-content"><LanguageSwitcher className="admin-language-switcher" label={t('languageSelector')} value={language} onChange={setLanguage} />{children}</section></div>
}

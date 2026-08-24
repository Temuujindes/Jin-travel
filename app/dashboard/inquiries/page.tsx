'use client'

import { InquiryTable } from '../../../components/admin/AdminDashboard'
import { AdminShell } from '../../../components/admin/AdminShell'
import { useTranslation } from '../../../components/LanguageContext'

export default function InquiriesPage() { const { t } = useTranslation(); return <AdminShell><header className="admin-header"><div><div className="admin-overline">{t('inquiries')}</div><h1>{t('inquiries')}</h1><p>{t('manageTours')}</p></div></header><section className="admin-panel inquiries-panel"><div className="panel-heading"><div><div className="admin-overline">{t('allInquiries')}</div><h2>{t('recentInquiries')}</h2></div></div><InquiryTable /></section></AdminShell> }

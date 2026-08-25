'use client'

import { InquiryTable } from '../../../components/admin/AdminDashboard'
import { AdminShell } from '../../../components/admin/AdminShell'
import { AdminPageHeader, PanelHeading } from '../../../components/admin/AdminPanel'
import { useTranslation } from '../../../components/LanguageContext'

export default function InquiriesPage() { const { t } = useTranslation(); return <AdminShell><AdminPageHeader overline={t('inquiries')} title={t('inquiries')} description={t('manageTours')} /><section className="admin-panel inquiries-panel"><PanelHeading overline={t('allInquiries')} title={t('recentInquiries')} /><InquiryTable /></section></AdminShell> }

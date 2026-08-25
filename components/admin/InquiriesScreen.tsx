'use client'

// Renders Prisma-backed inquiries inside the existing admin presentation.

import type { Inquiry } from '../../lib/types'
import { useTranslation } from '../LanguageContext'
import { AdminShell } from './AdminShell'
import { InquiryTable } from './AdminDashboard'

export default function InquiriesScreen({ inquiries }: { inquiries: Inquiry[] }) {
  const { t } = useTranslation()
  return <AdminShell><header className="admin-header"><div><div className="admin-overline">{t('inquiries')}</div><h1>{t('inquiries')}</h1><p>{t('manageTours')}</p></div></header><section className="admin-panel inquiries-panel"><div className="panel-heading"><div><div className="admin-overline">{t('allInquiries')}</div><h2>{t('recentInquiries')}</h2></div></div><InquiryTable inquiries={inquiries} /></section></AdminShell>
}

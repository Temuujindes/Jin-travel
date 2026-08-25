'use client'

// Renders the localized application-wide not-found state.

import Link from 'next/link'
import { useTranslation } from '../components/LanguageContext'

export default function NotFound() {
  const { t } = useTranslation()
  return <main className="app"><div className="form-page"><p className="error">{t('notFoundTitle')}</p><p>{t('notFoundMessage')}</p><Link className="primary full" href="/">{t('home')}</Link></div></main>
}

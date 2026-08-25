'use client'

// Displays a recoverable inline error for tour collection failures.

import { useTranslation } from '../../components/LanguageContext'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useTranslation()
  return <main className="app"><div className="form-page"><p className="error">{t('loadError')}</p><button className="primary full" onClick={() => reset()}>{t('tryAgain')}</button></div></main>
}

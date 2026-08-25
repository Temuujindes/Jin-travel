'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslation } from '../../../components/LanguageContext'

export default function DashboardLoginPage() {
  const { t } = useTranslation()
  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)
    setPending(true)
    const form = new FormData(event.currentTarget)
    const result = await signIn('credentials', {
      email: String(form.get('email') || ''),
      password: String(form.get('password') || ''),
      redirect: false,
      callbackUrl: '/dashboard',
    })
    setPending(false)
    if (result?.error) {
      setError(true)
      return
    }
    window.location.assign(result?.url || '/dashboard')
  }

  return <main className="admin-login admin-app"><section className="admin-panel admin-login-panel"><div className="admin-brand"><span className="admin-brand-mark">J</span><div><strong>JIN Travel</strong><small>{t('workspaceOwner')}</small></div></div><div className="admin-overline">{t('dashboard')}</div><h1>{t('adminLoginTitle')}</h1><p>{t('adminLoginDescription')}</p><form onSubmit={submit}><label className="admin-label">{t('email')}<input name="email" type="email" autoComplete="email" required /></label><label className="admin-label">{t('password')}<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="error">{t('invalidCredentials')}</p>}<button className="admin-button full" type="submit" disabled={pending}>{pending ? t('signingIn') : t('signIn')}</button></form></section></main>
}

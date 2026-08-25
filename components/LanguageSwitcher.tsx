'use client'

import { LANGUAGES } from '../lib/constants'
import { Language } from '../lib/types'

export function LanguageSwitcher({ className, value, onChange, label }: { className: string; value: Language; onChange: (language: Language) => void; label?: string }) {
  return <div className={className} aria-label={label}>{LANGUAGES.map((item) => <button key={item} className={value === item ? 'active' : ''} onClick={() => onChange(item)}>{item.toUpperCase()}</button>)}</div>
}

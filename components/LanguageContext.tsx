'use client'

import { createContext, useContext, useState } from 'react'
import { translations } from '../lib/mock-data/translations'
import { Language } from '../lib/types'

export type TranslationKey = keyof typeof translations.en
export type Translate = (key: TranslationKey, fallback?: string) => string

interface LanguageContextValue { language: Language; setLanguage: (language: Language) => void; t: Translate }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('kr')
  const t: Translate = (key, fallback) => translations[language][key] || fallback || translations.en[key as keyof typeof translations.en] || key
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() { const context = useContext(LanguageContext); if (!context) throw new Error('useTranslation must be used within LanguageProvider'); return context }
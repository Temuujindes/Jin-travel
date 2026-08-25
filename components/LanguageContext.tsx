'use client'

import { createContext, useContext, useState } from 'react'
import { translations } from '../lib/mock-data/translations'
import { Language } from '../lib/types'

const warned = new Set<string>()

export type TranslationKey = keyof typeof translations.en | 'gallery'
export type Translate = (key: TranslationKey, fallback?: string) => string

interface LanguageContextValue { language: Language; setLanguage: (language: Language) => void; t: Translate }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('kr')
  const extra: Record<Language, Record<string, string>> = { mn: { gallery: 'Зургийн цомог', performance: 'Гүйцэтгэл', saved: 'Хадгалагдлаа', deleteDay: 'Өдрийг устгах', listView: 'Жагсаалт', gridView: 'Сүлжээ', menu: 'Цэс' }, kr: { gallery: '갤러리', performance: '성과', saved: '저장됨', deleteDay: '일정 삭제', listView: '목록', gridView: '그리드', menu: '메뉴' }, en: { gallery: 'Gallery', performance: 'Performance', saved: 'Saved', deleteDay: 'Delete day', listView: 'List view', gridView: 'Grid view', menu: 'Menu' } }
  const t: Translate = (key, fallback) => { const translated = extra[language][key] || translations[language][key] || translations.en[key as keyof typeof translations.en]; if (!translated && !fallback && process.env.NODE_ENV !== 'production') { const warningKey = `${language}:${key}`; if (!warned.has(warningKey)) { warned.add(warningKey); console.warn(`Missing translation: ${warningKey}`) } } return extra[language][key] || translations[language][key] || fallback || translations.en[key as keyof typeof translations.en] || key }
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() { const context = useContext(LanguageContext); if (!context) throw new Error('useTranslation must be used within LanguageProvider'); return context }
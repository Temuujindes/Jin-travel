import { act, renderHook } from '@testing-library/react'
import { LanguageProvider, useTranslation } from '../components/LanguageContext'
import { translations } from '../lib/mock-data/translations'

describe('LanguageContext', () => {
  it('resolves translation keys through the documented fallback chain', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t('gallery')).toBe('갤러리')
    expect(result.current.t('home')).toBe('홈')
    expect(result.current.t('missing' as never, 'Provided')).toBe('Provided')
    const original = translations.kr.response
    delete translations.kr.response
    expect(result.current.t('response')).toBe(translations.en.response)
    translations.kr.response = original
    expect(result.current.t('missing' as never)).toBe('missing')
  })

  it('switches the language used for resolved strings', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    act(() => result.current.setLanguage('en'))
    expect(result.current.language).toBe('en')
    expect(result.current.t('home')).toBe('Home')
  })

  it('requires a provider', () => {
    expect(() => renderHook(() => useTranslation())).toThrow('useTranslation must be used within LanguageProvider')
  })
})

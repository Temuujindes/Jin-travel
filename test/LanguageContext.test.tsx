import { act, renderHook } from '@testing-library/react'
import { afterEach } from 'vitest'
import { LanguageProvider, useTranslation } from '../components/LanguageContext'
import { translations } from '../lib/i18n/translations'

const responseDescriptor = Object.getOwnPropertyDescriptor(translations.kr, 'response')

afterEach(() => {
  if (responseDescriptor) Object.defineProperty(translations.kr, 'response', responseDescriptor)
})

describe('LanguageContext', () => {
  it('uses the extra-table translation first', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t('gallery')).toBe('갤러리')
  })

  it('uses the current-language translation after the extra table', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t('home')).toBe('홈')
  })

  it('uses the explicit fallback argument before English', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t('missing' as never, 'Provided')).toBe('Provided')
  })

  it('uses English when the current-language entry is missing', () => {
    Object.defineProperty(translations.kr, 'response', {
      ...responseDescriptor,
      value: undefined,
    })
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t('response')).toBe(translations.en.response)
  })

  it('uses the raw key when all translation rungs are missing', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
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

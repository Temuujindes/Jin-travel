import { Tour, Language } from './types'

export function localizedTitle(tour: Tour, language: Language, fallback?: string): string {
  return tour.localizedTitle?.[language] || fallback || tour.title
}

export function localizedSubtitle(tour: Tour, language: Language): string {
  return tour.localizedSubtitle?.[language] || tour.subtitle
}

export const titleFallbacks: Record<string, Partial<Record<Language, string>>> = { 'gobi-4d': { mn: 'Говийн 4 өдрийн аялал', kr: '고비 익스프레스 & 낙타 트레킹', en: '4-Day Gobi Express & Camel Trekking' }, 'central-6d': { mn: 'Говь ба Төв Монголын аялал', kr: '고비 & 중앙 몽골 6일', en: '6-Day Ultimate Gobi & Central Mongolia' }, 'khuvsgul-3d': { mn: 'Хөвсгөл нуурын аялал', kr: '홉스골 호수 3일', en: '3-Day Khuvsgul Lake Express' } }

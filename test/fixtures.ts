// Provides stable display-type fixtures for client screen tests.

import type { Booking, Tour } from '../lib/types'

export const fixtureTour: Tour = {
  id: 'tour-fixture',
  slug: 'gobi-4d',
  badge: 'Hot Deal',
  title: '4-Day Gobi Express & Camel Trekking',
  subtitle: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에',
  duration: '4 Days / 3 Nights',
  priceUsd: 580,
  priceMnt: '₮1,980,000',
  rating: 4.9,
  reviews: 128,
  tags: ['Ger Stay', 'Star-Gazing', '4x4 SUV'],
  image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85',
  ],
  itinerary: [
    {
      day: 1,
      title: 'UB → Dalanzadgad → Yolyn Am',
      localizedTitle: { mn: 'ӨБ → Даланзадгад → Ёлын ам', kr: '울란바토르 → 달란자드가드 → 욜린 암', en: 'UB → Dalanzadgad → Yolyn Am' },
      distance: '~45 km, ~1 hr',
      meals: ['Lunch', 'Dinner'],
      accommodation: 'Ger camp',
      activities: ['Yolyn Am'],
      image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1000&q=85',
      descriptions: { mn: 'Day one', kr: 'Day one', en: 'Day one' },
    },
  ],
  localizedTitle: {
    mn: 'Говь-4: Хонгорын элс тэвш аялал',
    kr: '고비 4일 익스프레스 & 낙타 트레킹',
    en: '4-Day Gobi Express & Camel Trekking',
  },
  localizedSubtitle: {
    kr: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에',
  },
  status: 'active',
  featured: true,
}

export const fixtureBooking: Booking = {
  reference: 'JIN-2026-08421',
  tourSlug: fixtureTour.slug,
  status: 'Шинэ',
  date: '2026.09.14',
  travelers: 2,
  total: 1160,
}

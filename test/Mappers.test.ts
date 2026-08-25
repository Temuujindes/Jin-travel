import { toDisplayBooking, toDisplayDay, toDisplayTour } from '../lib/mappers'

describe('display mappers', () => {
  it('maps itinerary meals in the builder-compatible order', () => {
    const day = toDisplayDay({
      id: 'day-1',
      tourId: 'tour-1',
      dayNumber: 2,
      titleMn: 'Өдөр 2',
      titleKr: '2일',
      titleEn: 'Day 2',
      route: '~180–200 km, ~4–5 hrs',
      breakfast: true,
      lunch: false,
      dinner: true,
      accommodation: 'Ger camp',
      activities: ['Dune walk'],
      descriptionMn: 'MN',
      descriptionKr: 'KR',
      descriptionEn: 'EN',
      image: 'day-image',
    })
    expect(day).toMatchObject({
      day: 2,
      distance: '~180–200 km, ~4–5 hrs',
      meals: ['Breakfast', 'Dinner'],
      descriptions: { mn: 'MN', kr: 'KR', en: 'EN' },
    })
  })

  it('maps tours with and without included itinerary days', () => {
    const row = {
      id: 'tour-1',
      slug: 'tour-1',
      titleMn: 'Монгол',
      titleKr: '몽골',
      titleEn: 'Mongolia',
      subtitleMn: 'MN subtitle',
      subtitleKr: 'KR subtitle',
      subtitleEn: 'EN subtitle',
      badge: 'Featured',
      duration: '4 days',
      priceUsd: 580,
      priceMnt: '₮1',
      rating: 4.9,
      reviews: 10,
      tags: ['Ger'],
      mainImage: 'main',
      gallery: ['main', 'second'],
      status: 'active' as const,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    expect(toDisplayTour(row).itinerary).toEqual([])
    expect(toDisplayTour({ ...row, itineraryDays: [] }).localizedTitle).toEqual({ mn: 'Монгол', kr: '몽골', en: 'Mongolia' })
  })

  it('formats a booking start date for the existing booking display', () => {
    const tour = {
      id: 'tour-1',
      slug: 'tour-1',
      titleMn: 'Монгол',
      titleKr: '몽골',
      titleEn: 'Mongolia',
      subtitleMn: '',
      subtitleKr: '',
      subtitleEn: '',
      badge: '',
      duration: '4 days',
      priceUsd: 580,
      priceMnt: '₮1',
      rating: 4.9,
      reviews: 10,
      tags: [],
      mainImage: 'main',
      gallery: ['main'],
      status: 'active' as const,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const booking = toDisplayBooking({
      id: 'booking-1',
      tourId: tour.id,
      customerName: 'Ada',
      contact: '@ada',
      startDate: new Date('2026-09-14T00:00:00.000Z'),
      travelers: 2,
      specialRequest: null,
      status: 'Шинэ',
      totalPrice: 1160,
      referenceCode: 'JIN-2026-08421',
      createdAt: new Date(),
      tour,
    })
    expect(booking.date).toBe('2026.09.14')
  })
})

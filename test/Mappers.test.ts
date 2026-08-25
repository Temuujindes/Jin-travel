import { toDisplayBooking, toDisplayDay, toDisplayTour, toPrismaDayInput } from '../lib/mappers'

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
      localizedTitle: { mn: 'Өдөр 2', kr: '2일', en: 'Day 2' },
      distance: '~180–200 km, ~4–5 hrs',
      meals: ['Breakfast', 'Dinner'],
      descriptions: { mn: 'MN', kr: 'KR', en: 'EN' },
    })

    const alternateDay = toDisplayDay({
      id: 'day-2',
      tourId: 'tour-1',
      dayNumber: 3,
      titleMn: 'Өдөр 3',
      titleKr: '3일',
      titleEn: 'Day 3',
      route: null,
      breakfast: false,
      lunch: true,
      dinner: false,
      accommodation: 'Ger camp',
      activities: [],
      descriptionMn: 'MN',
      descriptionKr: 'KR',
      descriptionEn: 'EN',
      image: 'day-image',
    })
    expect(alternateDay.meals).toEqual(['Lunch'])
    expect(alternateDay.distance).toBeUndefined()
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
    expect(toDisplayTour({
      ...row,
      itineraryDays: [{
        id: 'day-1',
        tourId: row.id,
        dayNumber: 1,
        titleMn: 'Өдөр 1',
        titleKr: '1일',
        titleEn: 'Day 1',
        route: null,
        breakfast: true,
        lunch: true,
        dinner: true,
        accommodation: 'Ger camp',
        activities: ['Walk'],
        descriptionMn: 'MN',
        descriptionKr: 'KR',
        descriptionEn: 'EN',
        image: 'day',
      }],
    }).itinerary).toHaveLength(1)
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

  it('maps display day fields back to Prisma columns', () => {
    const result = toPrismaDayInput({
      day: 4,
      title: 'Desert sunset',
      distance: undefined,
      meals: ['Breakfast', 'Dinner'],
      accommodation: 'Ger camp',
      activities: ['Walk'],
      image: 'day',
      descriptions: { mn: 'MN', kr: 'KR', en: 'EN' },
    })
    expect(result).toEqual({
      dayNumber: 4,
      titleMn: 'Desert sunset',
      titleKr: 'Desert sunset',
      titleEn: 'Desert sunset',
      route: null,
      breakfast: true,
      lunch: false,
      dinner: true,
      accommodation: 'Ger camp',
      activities: ['Walk'],
      descriptionMn: 'MN',
      descriptionKr: 'KR',
      descriptionEn: 'EN',
      image: 'day',
    })
    expect(toPrismaDayInput({
      day: 1,
      title: 'Day',
      meals: [],
      accommodation: '',
      activities: [],
      image: '',
    })).toMatchObject({ descriptionMn: '', descriptionKr: '', descriptionEn: '' })
  })

  it('preserves localized tour and itinerary titles through the display round trip', () => {
    const row = {
      id: 'tour-2',
      slug: 'tour-2',
      titleMn: 'Монгол аялал',
      titleKr: '몽골 여행',
      titleEn: 'Mongolia tour',
      subtitleMn: 'Монгол тайлбар',
      subtitleKr: '몽골 설명',
      subtitleEn: 'Mongolia description',
      badge: '',
      duration: '2 days',
      priceUsd: 100,
      priceMnt: '',
      rating: 0,
      reviews: 0,
      tags: [],
      mainImage: 'main',
      gallery: ['main'],
      status: 'draft' as const,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      itineraryDays: [{
        id: 'day-2',
        tourId: 'tour-2',
        dayNumber: 1,
        titleMn: 'Өдөр нэг',
        titleKr: '첫째 날',
        titleEn: 'Day one',
        route: null,
        breakfast: false,
        lunch: false,
        dinner: false,
        accommodation: 'Ger',
        activities: [],
        descriptionMn: '',
        descriptionKr: '',
        descriptionEn: '',
        image: 'day',
      }],
    }
    const tour = toDisplayTour(row)
    expect(tour.localizedTitle).toEqual({ mn: 'Монгол аялал', kr: '몽골 여행', en: 'Mongolia tour' })
    expect(toPrismaDayInput(tour.itinerary[0])).toMatchObject({
      titleMn: 'Өдөр нэг',
      titleKr: '첫째 날',
      titleEn: 'Day one',
    })
  })
})

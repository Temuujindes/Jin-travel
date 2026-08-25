import { booking } from '../lib/mock-data/bookings'
import { inquiries } from '../lib/mock-data/inquiries'
import { tours } from '../lib/mock-data/tours'
import { translations } from '../lib/mock-data/translations'

describe('mock data invariants', () => {
  it('contains unique slugs, gallery images, and non-empty tags', () => {
    expect(new Set(tours.map((tour) => tour.slug)).size).toBe(tours.length)
    tours.forEach((tour) => {
      expect(tour.gallery.length).toBeGreaterThan(0)
      expect(tour.tags.length).toBeGreaterThan(0)
    })
  })

  it('numbers itinerary days sequentially from one', () => {
    tours.forEach((tour) => expect(tour.itinerary.map((day) => day.day)).toEqual(tour.itinerary.map((_, index) => index + 1)))
  })

  it('documents the translation key-set gap across languages', () => {
    const keys = Object.keys(translations.en).sort()
    const mnKeys = Object.keys(translations.mn).sort()
    expect(mnKeys).toContain('planVast')
    expect(mnKeys.filter((key) => !keys.includes(key))).toEqual(['planVast'])
    expect(Object.keys(translations.kr).sort().filter((key) => !keys.includes(key))).toEqual(['planVast'])
  })

  it('matches the documented booking and inquiry shapes', () => {
    expect(booking).toMatchObject({ reference: expect.any(String), tourSlug: expect.any(String), travelers: expect.any(Number), total: expect.any(Number) })
    inquiries.forEach((inquiry) => expect(inquiry).toMatchObject({ id: expect.any(String), customer: expect.any(String), tour: expect.any(String), status: expect.any(String) }))
  })
})

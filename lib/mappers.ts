// Maps Prisma records into the display types consumed by client screens.

import type { Prisma } from '@prisma/client'
import type { Booking, ItineraryDay, Tour } from './types'

type TourWithItinerary = Prisma.TourGetPayload<{
  include: { itineraryDays: true }
}>

type TourRow = Prisma.TourGetPayload<object> | TourWithItinerary
type BookingWithTour = Prisma.BookingGetPayload<{ include: { tour: true } }>
type ItineraryDayRow = Prisma.ItineraryDayGetPayload<object>

export function toDisplayDay(row: ItineraryDayRow): ItineraryDay {
  const meals = [
    row.breakfast ? 'Breakfast' : null,
    row.lunch ? 'Lunch' : null,
    row.dinner ? 'Dinner' : null,
  ].filter((meal): meal is string => meal !== null)

  return {
    day: row.dayNumber,
    title: row.titleEn,
    distance: row.route ?? undefined,
    meals,
    accommodation: row.accommodation,
    activities: row.activities,
    image: row.image,
    descriptions: {
      mn: row.descriptionMn,
      kr: row.descriptionKr,
      en: row.descriptionEn,
    },
  }
}

export function toDisplayTour(row: TourRow): Tour {
  const itineraryDays = 'itineraryDays' in row ? row.itineraryDays : []

  return {
    id: row.id,
    slug: row.slug,
    badge: row.badge,
    title: row.titleEn,
    subtitle: row.subtitleEn,
    duration: row.duration,
    priceUsd: row.priceUsd,
    priceMnt: row.priceMnt,
    rating: row.rating,
    reviews: row.reviews,
    tags: row.tags,
    image: row.mainImage,
    gallery: row.gallery,
    localizedTitle: {
      mn: row.titleMn,
      kr: row.titleKr,
      en: row.titleEn,
    },
    localizedSubtitle: {
      mn: row.subtitleMn,
      kr: row.subtitleKr,
      en: row.subtitleEn,
    },
    status: row.status,
    featured: row.featured,
    itinerary: itineraryDays.map(toDisplayDay),
  }
}

export function toDisplayBooking(row: BookingWithTour): Booking {
  const date = row.startDate
  const formattedDate = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('.')

  return {
    reference: row.referenceCode,
    tourSlug: row.tour.slug,
    status: row.status,
    date: formattedDate,
    travelers: row.travelers,
    total: row.totalPrice,
  }
}

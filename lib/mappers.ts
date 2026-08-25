// Maps Prisma records into the display types consumed by client screens.

import type { Prisma } from '@prisma/client'
import type { Booking, Inquiry, ItineraryDay, Tour } from './types'

type TourWithItinerary = Prisma.TourGetPayload<{
  include: { itineraryDays: true }
}>

type TourRow = Prisma.TourGetPayload<object> | TourWithItinerary
type BookingWithTour = Prisma.BookingGetPayload<{ include: { tour: true } }>
type BookingWithTourTitle = Prisma.BookingGetPayload<{ include: { tour: { select: { titleEn: true } } } }>
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

export function toDisplayInquiry(row: BookingWithTourTitle): Inquiry {
  const date = row.createdAt
  const formattedDate = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('.')

  return {
    id: row.id,
    customer: row.customerName,
    tour: row.tour.titleEn,
    kakao: row.contact,
    date: formattedDate,
    status: row.status,
  }
}

export function toPrismaDayInput(day: ItineraryDay): Prisma.ItineraryDayCreateWithoutTourInput {
  return {
    dayNumber: day.day,
    titleMn: day.title,
    titleKr: day.title,
    titleEn: day.title,
    route: day.distance ?? null,
    breakfast: day.meals.includes('Breakfast'),
    lunch: day.meals.includes('Lunch'),
    dinner: day.meals.includes('Dinner'),
    accommodation: day.accommodation,
    activities: day.activities,
    descriptionMn: day.descriptions?.mn ?? '',
    descriptionKr: day.descriptions?.kr ?? '',
    descriptionEn: day.descriptions?.en ?? '',
    image: day.image,
  }
}

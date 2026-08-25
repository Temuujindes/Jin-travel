'use server'

// Persists a tour's general fields and complete itinerary atomically.

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { prisma } from '../../lib/db'
import { toPrismaDayInput } from '../../lib/mappers'
import type { Tour } from '../../lib/types'

export type SaveItineraryResult =
  | { success: true }
  | { success: false; code: 'tourNotFound' | 'saveFailed' }

export async function saveItinerary(tour: Tour): Promise<SaveItineraryResult> {
  if (!tour.id || !tour.title.trim()) return { success: false, code: 'tourNotFound' }
  try {
    await prisma.$transaction(async (transaction) => {
      await transaction.tour.update({
        where: { id: tour.id },
        data: {
          titleMn: tour.title.trim(),
          titleKr: tour.title.trim(),
          titleEn: tour.title.trim(),
          subtitleMn: tour.subtitle.trim(),
          subtitleKr: tour.subtitle.trim(),
          subtitleEn: tour.subtitle.trim(),
          duration: tour.duration.trim(),
          priceUsd: tour.priceUsd,
        },
      })
      await transaction.itineraryDay.deleteMany({ where: { tourId: tour.id } })
      await transaction.itineraryDay.createMany({
        data: tour.itinerary.map((day) => ({ ...toPrismaDayInput(day), tourId: tour.id! })),
      })
    })
    revalidatePath(`/dashboard/tours/builder?tour=${tour.slug}`)
    revalidatePath(`/dashboard/tours/builder`)
    revalidatePath(`/tours/${tour.slug}`)
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return { success: false, code: 'tourNotFound' }
    }
    return { success: false, code: 'saveFailed' }
  }
}

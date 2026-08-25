// Creates guest booking requests and returns a reference code or typed failure.

'use server'

import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/db'

export type CreateBookingInput = {
  tourId: string
  customerName: string
  contact: string
  startDate: string
  travelers: number
  specialRequest?: string
}

export type CreateBookingResult =
  | { success: true; referenceCode: string }
  | { success: false; code: 'invalidName' | 'invalidTravelers' | 'invalidDate' | 'tourNotFound' | 'bookingFailed' }

function isReferenceCollision(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  if (!input.customerName.trim() || !input.contact.trim()) {
    return { success: false, code: 'invalidName' }
  }

  if (!Number.isInteger(input.travelers) || input.travelers < 1) {
    return { success: false, code: 'invalidTravelers' }
  }

  const startDate = new Date(`${input.startDate}T00:00:00.000Z`)
  if (!input.startDate || Number.isNaN(startDate.getTime())) {
    return { success: false, code: 'invalidDate' }
  }

  const tour = await prisma.tour.findUnique({ where: { id: input.tourId } })
  if (!tour) return { success: false, code: 'tourNotFound' }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const referenceCode = `JIN-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`

    try {
      await prisma.booking.create({
        data: {
          tourId: tour.id,
          customerName: input.customerName.trim(),
          contact: input.contact.trim(),
          startDate,
          travelers: input.travelers,
          specialRequest: input.specialRequest?.trim() || null,
          status: 'Шинэ',
          totalPrice: tour.priceUsd * input.travelers,
          referenceCode,
        },
      })
      return { success: true, referenceCode }
    } catch (error: unknown) {
      if (!isReferenceCollision(error)) return { success: false, code: 'bookingFailed' }
    }
  }

  return { success: false, code: 'bookingFailed' }
}

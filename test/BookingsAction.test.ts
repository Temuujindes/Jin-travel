import { Prisma } from '@prisma/client'
import { beforeEach, vi } from 'vitest'
import { createBooking } from '../app/actions/bookings'

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(),
  create: vi.fn(),
}))

vi.mock('../lib/db', () => ({
  prisma: {
    tour: { findUnique: mocks.findUnique },
    booking: { create: mocks.create },
  },
}))

const tour = { id: 'tour-1', priceUsd: 580 }

describe('createBooking', () => {
  beforeEach(() => {
    mocks.findUnique.mockReset()
    mocks.create.mockReset()
    mocks.findUnique.mockResolvedValue(tour)
    mocks.create.mockResolvedValue({ referenceCode: 'JIN-2026-12345' })
  })

  it('rejects missing customer details and invalid traveler counts', async () => {
    await expect(createBooking({ tourId: 'tour-1', customerName: '', contact: '', startDate: '2026-09-14', travelers: 1 })).resolves.toEqual({ success: false, code: 'invalidName' })
    await expect(createBooking({ tourId: 'tour-1', customerName: 'Ada', contact: '@ada', startDate: '2026-09-14', travelers: 0 })).resolves.toEqual({ success: false, code: 'invalidTravelers' })
    await expect(createBooking({ tourId: 'tour-1', customerName: 'Ada', contact: '@ada', startDate: 'not-a-date', travelers: 1 })).resolves.toEqual({ success: false, code: 'invalidDate' })
  })

  it('rejects unknown tours', async () => {
    mocks.findUnique.mockResolvedValueOnce(null)
    await expect(createBooking({ tourId: 'missing', customerName: 'Ada', contact: '@ada', startDate: '2026-09-14', travelers: 1 })).resolves.toEqual({ success: false, code: 'tourNotFound' })
  })

  it('computes the total from the database tour price', async () => {
    await expect(createBooking({ tourId: 'tour-1', customerName: ' Ada ', contact: ' @ada ', startDate: '2026-09-14', travelers: 2, specialRequest: 'Window seat' })).resolves.toMatchObject({ success: true, referenceCode: expect.stringMatching(/^JIN-\d{4}-\d{5}$/) })
    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        tourId: 'tour-1',
        customerName: 'Ada',
        contact: '@ada',
        travelers: 2,
        totalPrice: 1160,
        specialRequest: 'Window seat',
      }),
    }))
  })

  it('retries when a generated reference collides', async () => {
    mocks.create.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('collision', { code: 'P2002', clientVersion: '6.7.0' }))
    await expect(createBooking({ tourId: 'tour-1', customerName: 'Ada', contact: '@ada', startDate: '2026-09-14', travelers: 1 })).resolves.toMatchObject({ success: true })
    expect(mocks.create).toHaveBeenCalledTimes(2)
  })

  it('returns a booking failure for non-collision database errors', async () => {
    mocks.create.mockRejectedValueOnce(new Error('database unavailable'))
    await expect(createBooking({ tourId: 'tour-1', customerName: 'Ada', contact: '@ada', startDate: '2026-09-14', travelers: 1 })).resolves.toEqual({ success: false, code: 'bookingFailed' })
  })

  it('returns a booking failure after exhausting collision retries', async () => {
    mocks.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('collision', { code: 'P2002', clientVersion: '6.7.0' }))
    await expect(createBooking({ tourId: 'tour-1', customerName: 'Ada', contact: '@ada', startDate: '2026-09-14', travelers: 1 })).resolves.toEqual({ success: false, code: 'bookingFailed' })
    expect(mocks.create).toHaveBeenCalledTimes(5)
  })
})

import { Prisma } from '@prisma/client'
import { beforeEach, vi } from 'vitest'
import { createTour, setTourStatus } from '../app/actions/tours'
import { saveItinerary } from '../app/actions/itinerary'
import { fixtureTour } from './fixtures'

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  transaction: vi.fn(),
  deleteMany: vi.fn(),
  createMany: vi.fn(),
}))

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('../lib/db', () => ({
  prisma: {
    tour: { create: mocks.create, update: mocks.update },
    $transaction: mocks.transaction,
  },
}))

describe('admin server actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.create.mockResolvedValue({ id: 'new-tour' })
    mocks.update.mockResolvedValue({ id: 'tour-1' })
    mocks.transaction.mockImplementation(async (callback: (transaction: unknown) => Promise<void>) => callback({ tour: { update: mocks.update }, itineraryDay: { deleteMany: mocks.deleteMany, createMany: mocks.createMany } }))
  })

  it('validates and creates tours with mirrored MN fields', async () => {
    await expect(createTour({ title: ' ', description: '', duration: '', price: 10, image: '' })).resolves.toEqual({ success: false, code: 'invalidTitle' })
    await expect(createTour({ title: 'Tour', description: '', duration: '', price: -1, image: '' })).resolves.toEqual({ success: false, code: 'invalidPrice' })
    await expect(createTour({ title: 'Монгол аялал', description: '', duration: '', price: 10, image: '' })).resolves.toEqual({ success: false, code: 'invalidTitle' })
    await expect(createTour({ title: 'New Desert Tour', description: 'Details', duration: '2 Days', price: 333, image: ' image ' })).resolves.toEqual({ success: true, tourId: 'new-tour' })
    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ slug: 'new-desert-tour', titleMn: 'New Desert Tour', titleKr: 'New Desert Tour', titleEn: 'New Desert Tour', subtitleMn: 'Details', subtitleKr: 'Details', subtitleEn: 'Details', gallery: ['image'] }) }))
  })

  it('returns typed create failures for duplicate and unexpected errors', async () => {
    mocks.create.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '6.7.0' }))
    await expect(createTour({ title: 'Duplicate', description: '', duration: '', price: 1, image: '' })).resolves.toEqual({ success: false, code: 'duplicateSlug' })
    mocks.create.mockRejectedValueOnce(new Error('offline'))
    await expect(createTour({ title: 'Broken', description: '', duration: '', price: 1, image: '' })).resolves.toEqual({ success: false, code: 'createFailed' })
  })

  it('updates status and returns typed status failures', async () => {
    await expect(setTourStatus('tour-1', 'draft')).resolves.toEqual({ success: true })
    mocks.update.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('missing', { code: 'P2025', clientVersion: '6.7.0' }))
    await expect(setTourStatus('missing', 'active')).resolves.toEqual({ success: false, code: 'tourNotFound' })
    mocks.update.mockRejectedValueOnce(new Error('offline'))
    await expect(setTourStatus('tour-1', 'active')).resolves.toEqual({ success: false, code: 'statusUpdateFailed' })
  })

  it('saves general fields and replaces itinerary in one transaction', async () => {
    await expect(saveItinerary(fixtureTour)).resolves.toEqual({ success: true })
    expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: fixtureTour.id }, data: expect.objectContaining({ titleMn: fixtureTour.localizedTitle?.mn, titleKr: fixtureTour.localizedTitle?.kr, titleEn: fixtureTour.localizedTitle?.en, subtitleMn: fixtureTour.localizedSubtitle?.mn ?? fixtureTour.subtitle, subtitleKr: fixtureTour.localizedSubtitle?.kr ?? fixtureTour.subtitle, subtitleEn: fixtureTour.localizedSubtitle?.en ?? fixtureTour.subtitle, priceUsd: fixtureTour.priceUsd }) }))
    expect(mocks.deleteMany).toHaveBeenCalledWith({ where: { tourId: fixtureTour.id } })
    expect(mocks.createMany).toHaveBeenCalledWith(expect.objectContaining({ data: expect.arrayContaining([expect.objectContaining({ tourId: fixtureTour.id, titleMn: fixtureTour.itinerary[0].localizedTitle?.mn, titleKr: fixtureTour.itinerary[0].localizedTitle?.kr, titleEn: fixtureTour.itinerary[0].title, breakfast: false, lunch: true, dinner: true })]) }))
  })

  it('falls back to edited general fields when localized values are absent', async () => {
    const tour = { ...fixtureTour, localizedTitle: undefined, localizedSubtitle: undefined }
    await expect(saveItinerary(tour)).resolves.toEqual({ success: true })
    expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        titleMn: tour.title,
        titleKr: tour.title,
        titleEn: tour.title,
        subtitleMn: tour.subtitle,
        subtitleKr: tour.subtitle,
        subtitleEn: tour.subtitle,
      }),
    }))
  })

  it('returns typed save failures', async () => {
    await expect(saveItinerary({ ...fixtureTour, id: undefined })).resolves.toEqual({ success: false, code: 'tourNotFound' })
    mocks.transaction.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('missing', { code: 'P2025', clientVersion: '6.7.0' }))
    await expect(saveItinerary(fixtureTour)).resolves.toEqual({ success: false, code: 'tourNotFound' })
    mocks.transaction.mockRejectedValueOnce(new Error('offline'))
    await expect(saveItinerary(fixtureTour)).resolves.toEqual({ success: false, code: 'saveFailed' })
  })
})

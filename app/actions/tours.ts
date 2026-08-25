'use server'

// Creates and publishes tours from the admin catalog.

import { Prisma, TourStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getAdminSession } from '../../lib/auth'
import { prisma } from '../../lib/db'

export type CreateTourInput = {
  title: string
  description: string
  duration: string
  price: number
  image: string
}

export type CreateTourResult =
  | { success: true; tourId: string }
  | { success: false; code: 'unauthorized' | 'duplicateSlug' | 'invalidTitle' | 'invalidPrice' | 'createFailed' }

export type SetTourStatusResult =
  | { success: true }
  | { success: false; code: 'unauthorized' | 'tourNotFound' | 'statusUpdateFailed' }

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function createTour(input: CreateTourInput): Promise<CreateTourResult> {
  if (!(await getAdminSession())?.user?.email) return { success: false, code: 'unauthorized' }
  const title = input.title.trim()
  if (!title) return { success: false, code: 'invalidTitle' }
  if (!Number.isFinite(input.price) || input.price < 0) return { success: false, code: 'invalidPrice' }
  const slug = slugify(title)
  if (!slug) return { success: false, code: 'invalidTitle' }

  try {
    const tour = await prisma.tour.create({
      data: {
        slug,
        badge: '',
        titleMn: title,
        titleKr: title,
        titleEn: title,
        subtitleMn: input.description.trim(),
        subtitleKr: input.description.trim(),
        subtitleEn: input.description.trim(),
        duration: input.duration.trim() || '4 Days 3 Nights',
        priceUsd: input.price,
        priceMnt: '',
        tags: [],
        mainImage: input.image.trim(),
        gallery: input.image.trim() ? [input.image.trim()] : [],
        status: TourStatus.draft,
        featured: false,
      },
    })
    revalidatePath('/dashboard/tours')
    revalidatePath('/tours')
    return { success: true, tourId: tour.id }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { success: false, code: 'duplicateSlug' }
    }
    return { success: false, code: 'createFailed' }
  }
}

export async function setTourStatus(id: string, status: 'active' | 'draft'): Promise<SetTourStatusResult> {
  if (!(await getAdminSession())?.user?.email) return { success: false, code: 'unauthorized' }
  try {
    await prisma.tour.update({ where: { id }, data: { status } })
    revalidatePath('/dashboard/tours')
    revalidatePath('/tours')
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return { success: false, code: 'tourNotFound' }
    }
    return { success: false, code: 'statusUpdateFailed' }
  }
}

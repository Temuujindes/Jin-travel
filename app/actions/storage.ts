'use server'

import { getSupabaseAdmin } from '../../lib/supabase-admin'
import { getAdminSession } from '../../lib/auth'
import { randomUUID } from 'node:crypto'

const TOUR_IMAGES_BUCKET = 'tour-images'
const MAX_IMAGE_SIZE = 10 * 1024 * 1024

export type UploadTourImageResult =
  | { success: true; url: string }
  | { success: false; code: 'unauthorized' | 'invalidImage' | 'imageTooLarge' | 'uploadFailed' }

async function ensureTourImagesBucket() {
  const storage = getSupabaseAdmin().storage
  const { data, error } = await storage.getBucket(TOUR_IMAGES_BUCKET)
  if (data) return storage

  const notFound = error?.status === 404 || error?.message.toLowerCase().includes('not found')
  if (!notFound) throw error ?? new Error('The tour image bucket could not be checked.')

  const { error: createError } = await storage.createBucket(TOUR_IMAGES_BUCKET, { public: true })
  if (createError && !createError.message.toLowerCase().includes('already exists')) throw createError
  return storage
}

export async function uploadTourImage(file: File): Promise<UploadTourImageResult> {
  if (!(await getAdminSession())?.user?.email) return { success: false, code: 'unauthorized' }
  if (!file || !file.type.startsWith('image/') || file.size === 0) {
    return { success: false, code: 'invalidImage' }
  }
  if (file.size > MAX_IMAGE_SIZE) return { success: false, code: 'imageTooLarge' }

  try {
    const storage = await ensureTourImagesBucket()
    const extension = file.type.split('/')[1]?.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'image'
    const path = `itinerary/${randomUUID()}.${extension}`
    const { error } = await storage.from(TOUR_IMAGES_BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    })
    if (error) return { success: false, code: 'uploadFailed' }

    const { data } = storage.from(TOUR_IMAGES_BUCKET).getPublicUrl(path)
    return { success: true, url: data.publicUrl }
  } catch {
    return { success: false, code: 'uploadFailed' }
  }
}

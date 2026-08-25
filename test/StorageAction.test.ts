import { beforeEach, vi } from 'vitest'
import { uploadTourImage } from '../app/actions/storage'

const mocks = vi.hoisted(() => ({
  session: vi.fn(),
  getBucket: vi.fn(),
  createBucket: vi.fn(),
  from: vi.fn(),
  upload: vi.fn(),
  getPublicUrl: vi.fn(),
  getSupabaseAdmin: vi.fn(),
}))

vi.mock('../lib/auth', () => ({ getAdminSession: mocks.session }))
vi.mock('../lib/supabase-admin', () => ({ getSupabaseAdmin: mocks.getSupabaseAdmin }))

describe('uploadTourImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.session.mockResolvedValue({ user: { email: 'admin@jintravel.local' } })
    mocks.getBucket.mockResolvedValue({ data: { id: 'tour-images' }, error: null })
    mocks.createBucket.mockResolvedValue({ data: { name: 'tour-images' }, error: null })
    mocks.upload.mockResolvedValue({ data: { path: 'itinerary/image.jpg' }, error: null })
    mocks.getPublicUrl.mockReturnValue({ data: { publicUrl: 'https://example.com/image.jpg' } })
    mocks.from.mockReturnValue({ upload: mocks.upload, getPublicUrl: mocks.getPublicUrl })
    mocks.getSupabaseAdmin.mockReturnValue({ storage: { getBucket: mocks.getBucket, createBucket: mocks.createBucket, from: mocks.from } })
  })

  it('rejects unauthenticated uploads before touching storage', async () => {
    mocks.session.mockResolvedValue(null)
    await expect(uploadTourImage(new File(['image'], 'day.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'unauthorized' })
    expect(mocks.getSupabaseAdmin).not.toHaveBeenCalled()
  })

  it('validates image type and size on the server', async () => {
    await expect(uploadTourImage(undefined as unknown as File)).resolves.toEqual({ success: false, code: 'invalidImage' })
    await expect(uploadTourImage(new File(['text'], 'day.txt', { type: 'text/plain' }))).resolves.toEqual({ success: false, code: 'invalidImage' })
    await expect(uploadTourImage(new File([], 'empty.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'invalidImage' })
    const largeFile = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' })
    await expect(uploadTourImage(largeFile)).resolves.toEqual({ success: false, code: 'imageTooLarge' })
    expect(mocks.getSupabaseAdmin).not.toHaveBeenCalled()
  })

  it('uploads an image to the existing public bucket and returns its URL', async () => {
    const file = new File(['image'], 'day.jpg', { type: 'image/jpeg' })
    await expect(uploadTourImage(file)).resolves.toEqual({ success: true, url: 'https://example.com/image.jpg' })
    expect(mocks.createBucket).not.toHaveBeenCalled()
    expect(mocks.upload).toHaveBeenCalledWith(expect.stringMatching(/^itinerary\/.+\.jpeg$/), file, { contentType: 'image/jpeg', upsert: false })
  })

  it('creates the public bucket when it is missing', async () => {
    mocks.getBucket.mockResolvedValue({ data: null, error: { status: 404, message: 'Bucket not found' } })
    const file = new File(['image'], 'day.png', { type: 'image/png' })
    await expect(uploadTourImage(file)).resolves.toEqual({ success: true, url: 'https://example.com/image.jpg' })
    expect(mocks.createBucket).toHaveBeenCalledWith('tour-images', { public: true })
  })

  it('continues when another upload wins bucket creation and reports storage failures', async () => {
    mocks.getBucket.mockResolvedValue({ data: null, error: { status: 404, message: 'Bucket not found' } })
    mocks.createBucket.mockResolvedValue({ data: null, error: { status: 409, message: 'The bucket already exists' } })
    await expect(uploadTourImage(new File(['image'], 'day.webp', { type: 'image/webp' }))).resolves.toEqual({ success: true, url: 'https://example.com/image.jpg' })

    mocks.upload.mockResolvedValue({ data: null, error: new Error('upload failed') })
    await expect(uploadTourImage(new File(['image'], 'day.webp', { type: 'image/webp' }))).resolves.toEqual({ success: false, code: 'uploadFailed' })
  })

  it('returns a typed failure for bucket and configuration errors', async () => {
    mocks.getBucket.mockResolvedValue({ data: null, error: { status: 500, message: 'Storage unavailable' } })
    await expect(uploadTourImage(new File(['image'], 'day.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'uploadFailed' })

    mocks.getBucket.mockResolvedValue({ data: null, error: null })
    await expect(uploadTourImage(new File(['image'], 'day.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'uploadFailed' })

    mocks.getBucket.mockResolvedValue({ data: null, error: { status: 400, message: 'bucket not found' } })
    mocks.createBucket.mockResolvedValue({ data: null, error: new Error('create failed') })
    await expect(uploadTourImage(new File(['image'], 'day.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'uploadFailed' })

    mocks.getSupabaseAdmin.mockImplementation(() => {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing')
    })
    await expect(uploadTourImage(new File(['image'], 'day.jpg', { type: 'image/jpeg' }))).resolves.toEqual({ success: false, code: 'uploadFailed' })
  })

  it('uses a safe fallback extension when the image MIME type has no subtype', async () => {
    const file = new File(['image'], 'day', { type: 'image/' })
    await expect(uploadTourImage(file)).resolves.toEqual({ success: true, url: 'https://example.com/image.jpg' })
    expect(mocks.upload).toHaveBeenCalledWith(expect.stringMatching(/^itinerary\/.+\.image$/), file, expect.any(Object))
  })
})

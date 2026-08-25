import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getSupabaseAdmin } from '../lib/supabase-admin'

const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY

describe('Supabase admin client', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-secret-key'
  })

  afterEach(() => {
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL
    else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey
  })

  it('throws a clear error when storage credentials are missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    await import('../lib/supabase-admin').then(({ getSupabaseAdmin: freshClient }) => {
      expect(() => freshClient()).toThrow('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured')
    })
  })

  it('creates and reuses a service-role client', () => {
    const first = getSupabaseAdmin()
    expect(first).toBe(getSupabaseAdmin())
  })
})

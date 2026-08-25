import type { CredentialsConfig } from 'next-auth/providers/credentials'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(),
  compare: vi.fn(),
  serverSession: vi.fn(),
}))

vi.mock('../lib/db', () => ({
  prisma: { adminUser: { findUnique: mocks.findUnique } },
}))
vi.mock('bcryptjs', () => ({ default: { compare: mocks.compare } }))
vi.mock('next-auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-auth')>()
  return { ...actual, getServerSession: mocks.serverSession }
})

import { getAdminSession, getAuthOptions } from '../lib/auth'
import { GET, POST } from '../app/api/auth/[...nextauth]/route'
import middleware, { config } from '../middleware'

describe('admin authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXTAUTH_SECRET = 'test-secret'
  })

  it('requires an explicit secret', () => {
    const secret = process.env.NEXTAUTH_SECRET
    delete process.env.NEXTAUTH_SECRET
    expect(() => getAuthOptions()).toThrow('NEXTAUTH_SECRET must be configured')
    process.env.NEXTAUTH_SECRET = secret
  })

  it('exposes the App Router auth handlers and dashboard matcher', () => {
    expect(GET).toBeDefined()
    expect(POST).toBeDefined()
    expect(middleware).toBeTypeOf('function')
    expect(config.matcher).toEqual(['/dashboard/:path*'])
  })

  it('reads the current server session through the configured options', async () => {
    mocks.serverSession.mockResolvedValue({ user: { email: 'admin@example.com' } })
    await expect(getAdminSession()).resolves.toEqual({ user: { email: 'admin@example.com' } })
    expect(mocks.serverSession).toHaveBeenCalledWith(expect.objectContaining({ session: { strategy: 'jwt' } }))
  })

  it('authorizes only matching admin credentials', async () => {
    const provider = getAuthOptions().providers[0] as CredentialsConfig
    const authorize = (credentials: Record<'email' | 'password', string> | undefined) => provider.options.authorize(credentials, {} as never)
    expect(await authorize(undefined)).toBeNull()
    expect(await authorize({ email: '', password: '' })).toBeNull()

    mocks.findUnique.mockResolvedValueOnce(null)
    expect(await authorize({ email: 'missing@example.com', password: 'secret' })).toBeNull()

    mocks.findUnique.mockResolvedValueOnce({ id: 'admin-1', email: 'ADMIN@example.com', name: 'Admin', hashedPassword: 'hash' })
    mocks.compare.mockResolvedValueOnce(false)
    expect(await authorize({ email: 'ADMIN@example.com', password: 'wrong' })).toBeNull()

    mocks.findUnique.mockResolvedValue({ id: 'admin-1', email: 'admin@example.com', name: 'Admin', hashedPassword: 'hash' })
    mocks.compare.mockResolvedValue(true)
    expect(await authorize({ email: ' ADMIN@example.com ', password: 'secret' })).toEqual({ id: 'admin-1', email: 'admin@example.com', name: 'Admin' })
    expect(mocks.findUnique).toHaveBeenLastCalledWith({ where: { email: 'admin@example.com' } })
    expect(mocks.compare).toHaveBeenLastCalledWith('secret', 'hash')
  })
})

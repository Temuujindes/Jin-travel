import { prisma } from '../lib/db'

describe('database client', () => {
  it('exports a Prisma client singleton', () => {
    expect(prisma).toBeDefined()
    expect(typeof prisma.$disconnect).toBe('function')
  })
})

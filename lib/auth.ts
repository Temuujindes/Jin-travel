// Configures the admin credentials provider and JWT session strategy.

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { prisma } from './db'

export function getAuthOptions(): NextAuthOptions {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET must be configured for admin authentication.')

  return {
    secret,
    session: { strategy: 'jwt' },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const email = credentials?.email?.trim().toLowerCase()
          const password = credentials?.password
          if (!email || !password) return null

          const user = await prisma.adminUser.findUnique({ where: { email } })
          if (!user || !(await bcrypt.compare(password, user.hashedPassword))) return null
          return { id: user.id, email: user.email, name: user.name }
        },
      }),
    ],
  }
}

export function getAdminSession() {
  return getServerSession(getAuthOptions())
}

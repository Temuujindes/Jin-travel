import { withAuth } from 'next-auth/middleware'

const secret = process.env.NEXTAUTH_SECRET
if (!secret) throw new Error('NEXTAUTH_SECRET must be configured for admin authentication.')

export default withAuth({
  secret,
  pages: { signIn: '/dashboard/login' },
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
})

export const config = {
  matcher: ['/dashboard/:path*'],
}

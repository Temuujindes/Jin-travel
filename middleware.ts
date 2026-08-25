import { NextRequest, NextResponse } from 'next/server'

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder()
  const aBytes = encoder.encode(a)
  const bBytes = encoder.encode(b)
  if (aBytes.length !== bBytes.length) return false
  let diff = 0
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i]
  return diff === 0
}

const unauthorized = () =>
  new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="JIN Travel Admin"' },
  })

export function middleware(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD

  if (!username || !password) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next()
    return new NextResponse('Admin dashboard is not configured', { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) return unauthorized()

  let user = ''
  let pass = ''
  try {
    const decoded = atob(authHeader.slice(6))
    const separator = decoded.indexOf(':')
    if (separator === -1) return unauthorized()
    user = decoded.slice(0, separator)
    pass = decoded.slice(separator + 1)
  } catch {
    return unauthorized()
  }

  const userOk = timingSafeEqual(user, username)
  const passOk = timingSafeEqual(pass, password)
  if (!userOk || !passOk) return unauthorized()

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}

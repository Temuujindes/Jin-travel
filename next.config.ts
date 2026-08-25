import type { NextConfig } from 'next'

const supabaseStoragePattern = (() => {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!value) return undefined

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return undefined
    return {
      protocol: 'https' as const,
      hostname: url.hostname,
      pathname: '/storage/v1/object/public/**',
    }
  } catch {
    return undefined
  }
})()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...(supabaseStoragePattern ? [supabaseStoragePattern] : []),
    ],
  },
}

export default nextConfig
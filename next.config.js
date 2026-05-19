/** @type {import('next').NextConfig} */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
let supabaseHostname = null
if (supabaseUrl) {
  try {
    supabaseHostname = new URL(supabaseUrl).hostname
  } catch {
    // ignore invalid URL at build time
  }
}

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '',
    pathname: '/**',
  },
]

if (supabaseHostname) {
  remotePatterns.push({
    protocol: 'https',
    hostname: supabaseHostname,
    port: '',
    pathname: '/storage/v1/object/public/**',
  })
}

const nextConfig = {
  devIndicators: {
    buildActivity: true,
  },
  images: {
    remotePatterns,
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

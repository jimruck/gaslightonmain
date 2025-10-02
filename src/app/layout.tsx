import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from '@/components/seo/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'The Gaslight on Main | New American Restaurant in Kernersville, NC',
  description: 'Experience elegant New American cuisine at The Gaslight on Main in Kernersville, NC. Featuring fresh, seasonal ingredients and sophisticated flavors in a warm, welcoming atmosphere.',
  keywords: 'restaurant, New American cuisine, Kernersville NC, fine dining, fresh ingredients, seasonal menu',
  icons: {
    icon: '/brand/logos/favicon.jpg',
    shortcut: '/brand/logos/favicon.jpg',
    apple: '/brand/logos/favicon.jpg',
  },
  openGraph: {
    title: 'The Gaslight on Main | New American Restaurant in Kernersville, NC',
    description: 'Experience elegant New American cuisine at The Gaslight on Main in Kernersville, NC. Featuring fresh, seasonal ingredients and sophisticated flavors in a warm, welcoming atmosphere.',
    url: 'https://gaslightonmain.com',
    siteName: 'The Gaslight on Main',
    images: [
      {
        url: '/brand/images/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Gaslight on Main Restaurant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Gaslight on Main | New American Restaurant in Kernersville, NC',
    description: 'Experience elegant New American cuisine at The Gaslight on Main in Kernersville, NC.',
    images: ['/brand/images/hero-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <StructuredData type="restaurant" />
      </head>
      <body className="min-h-screen bg-gray-dark">
        <Navigation />
        <main className="pb-20 md:pb-0">
          {children}
        </main>
        <MobileBottomBar />
        <Footer />
      </body>
    </html>
  )
}

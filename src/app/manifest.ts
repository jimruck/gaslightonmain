import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Gaslight on Main',
    short_name: 'Gaslight',
    description: 'New American Restaurant in Kernersville, NC',
    start_url: '/',
    display: 'standalone',
    background_color: '#fefdfb',
    theme_color: '#f36c09',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

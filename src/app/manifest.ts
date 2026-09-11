import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learning App',
    short_name: 'Learn App',
    description: 'A focused learning dashboard for Lucas - Primary 2.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f1',
    theme_color: '#f8f6f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' as any,
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable' as any,
      },
    ],
  }
}
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learning Dashboard',
    short_name: 'Learning App',
    description: 'A focused learning dashboard for Primary Chinese Handwriting & Syllabus.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f1',
    theme_color: '#f8f6f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],

    screenshots: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Learning Dashboard Mobile View',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Learning Dashboard Desktop View',
      },
    ],
  }
}
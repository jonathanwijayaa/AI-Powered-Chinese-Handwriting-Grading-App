import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lexend, Poppins } from 'next/font/google'
import './globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})
export const metadata: Metadata = {
  title: 'Lucas Learning Dashboard',
  description: 'A focused learning dashboard for Lucas — Primary 2.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}


export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f6f1',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${poppins.variable}`}>
      <body className="font-poppins antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
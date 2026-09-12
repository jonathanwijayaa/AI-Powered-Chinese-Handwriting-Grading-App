import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lexend, Poppins } from 'next/font/google'
import { RegisterSW } from '@/components/pwa/RegisterSW'

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
  title: 'Learning Dashboard',
  description: 'A focused learning dashboard for Primary Chinese Handwriting & Syllabus.',
  generator: 'v0.app',
  icons: {},
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f6f1',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover', // Syarat PWA agar background warna menyatu mulus ke status bar HP
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lexend.variable} ${poppins.variable}`}>
      <body className="font-poppins antialiased min-h-screen bg-[#f8f6f1]">
        {children}
        <RegisterSW />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
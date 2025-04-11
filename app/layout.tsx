import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/ui/footer'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Branford CrossFit',
  description: 'Join Branford CrossFit and become part of a community dedicated to helping you achieve your fitness goals.',
  keywords: ['CrossFit', 'Branford', 'Fitness', 'Gym', 'Training', 'Workout', 'Community'],
  authors: [{ name: 'Branford CrossFit' }],
  creator: 'Branford CrossFit',
  publisher: 'Branford CrossFit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

// Add viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
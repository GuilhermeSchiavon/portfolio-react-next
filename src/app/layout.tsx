import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AlertSystem } from '@/components/ui/AlertSystem'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Guilherme Schiavon - Full Stack Developer',
    template: '%s | Guilherme Schiavon'
  },
  description: 'Computer Scientist and Full Stack Developer specializing in modern web solutions with React, Next.js, Node.js, and cutting-edge technologies.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Web Development', 'Computer Science'],
  authors: [{ name: 'Guilherme Schiavon' }],
  creator: 'Guilherme Schiavon',
  publisher: 'Guilherme Schiavon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'pt-BR': '/pt',
      'es-ES': '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Guilherme Schiavon - Full Stack Developer',
    description: 'Computer Scientist and Full Stack Developer specializing in modern web solutions.',
    siteName: 'Guilherme Schiavon Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guilherme Schiavon - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guilherme Schiavon - Full Stack Developer',
    description: 'Computer Scientist and Full Stack Developer specializing in modern web solutions.',
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Providers>
          <div id="app" className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            <AlertSystem />
            <main className="w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
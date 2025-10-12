import { Metadata } from 'next'
import { HomeView } from '@/components/views/HomeView'
import { profileData } from '@/data/profile'

export const metadata: Metadata = {
  title: profileData.seo.metaTitle,
  description: profileData.seo.metaDescription,
  keywords: profileData.seo.keywords,
  authors: [{ name: profileData.personal.name }],
  creator: profileData.personal.name,
  openGraph: {
    title: profileData.seo.metaTitle,
    description: profileData.seo.metaDescription,
    url: '/',
    siteName: 'Guilherme Schiavon Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guilherme Schiavon Portfolio',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: profileData.seo.metaTitle,
    description: profileData.seo.metaDescription,
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
}

export default function HomePage() {
  return <HomeView />
}
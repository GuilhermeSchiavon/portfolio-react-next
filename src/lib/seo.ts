import { Metadata } from 'next'

interface SEOData {
  title: string
  description: string
  keywords?: string[]
  images?: string[]
  url?: string
}

export function generateSEO(data: SEOData): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    authors: [{ name: 'Guilherme Schiavon' }],
    creator: 'Guilherme Schiavon',
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url || baseUrl,
      siteName: 'Guilherme Schiavon Portfolio',
      images: data.images?.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: data.title,
      })) || ['/og-image.jpg'],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.images || ['/og-image.jpg'],
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
}

export function generateProjectSEO(project: any, language: string = 'pt'): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return generateSEO({
    title: `${project.title} - Guilherme Schiavon Portfolio`,
    description: project.description,
    keywords: [
      project.title.toLowerCase(),
      'guilherme schiavon',
      'portfolio',
      'projeto',
      ...(project.Technologies?.map((tech: any) => tech.name.toLowerCase()) || [])
    ],
    images: project.Images?.map((img: any) => img.url) || ['/og-image.jpg'],
    url: `${baseUrl}/projects/${project.slug}`
  })
}
import { Metadata } from 'next'
import { HomeView } from '@/components/views/HomeView'

export const metadata: Metadata = {
  title: 'Guilherme Schiavon - Full Stack Developer | Portfolio',
  description: 'Desenvolvedor Full Stack especializado em Vue.js, React e Node.js. Criando soluções web modernas e escaláveis.',
  keywords: ['guilherme schiavon', 'full stack developer', 'vue.js', 'react', 'node.js', 'portfolio'],
  authors: [{ name: 'Guilherme Schiavon' }],
  creator: 'Guilherme Schiavon',
  openGraph: {
    title: 'Guilherme Schiavon - Full Stack Developer',
    description: 'Desenvolvedor Full Stack especializado em Vue.js, React e Node.js. Criando soluções web modernas e escaláveis.',
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
    title: 'Guilherme Schiavon - Full Stack Developer',
    description: 'Desenvolvedor Full Stack especializado em Vue.js, React e Node.js',
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
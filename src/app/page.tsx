import { Metadata } from 'next'
import { HomeView } from '@/components/views/HomeView'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Guilherme Schiavon\'s portfolio. Computer Scientist and Full Stack Developer creating modern web solutions.',
  openGraph: {
    title: 'Guilherme Schiavon - Full Stack Developer',
    description: 'Welcome to my portfolio. Computer Scientist and Full Stack Developer creating modern web solutions.',
    url: '/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guilherme Schiavon Portfolio',
      },
    ],
  },
}

export default function HomePage() {
  return <HomeView />
}
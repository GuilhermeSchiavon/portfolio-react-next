import { Metadata } from 'next'
import { ProjectsListView } from '@/components/views/ProjectsListView'

export const metadata: Metadata = {
  title: 'Projetos - Guilherme Schiavon Portfolio',
  description: 'Explore todos os projetos desenvolvidos por Guilherme Schiavon. Aplicações web modernas usando Vue.js, React, Node.js e tecnologias de ponta.',
  keywords: ['projetos', 'portfolio', 'vue.js', 'react', 'node.js', 'full stack', 'guilherme schiavon'],
  openGraph: {
    title: 'Projetos - Guilherme Schiavon Portfolio',
    description: 'Explore todos os projetos desenvolvidos por Guilherme Schiavon',
    url: '/projects',
    images: ['/og-image.jpg'],
  },
}

export default function ProjectsPage() {
  return <ProjectsListView />
}
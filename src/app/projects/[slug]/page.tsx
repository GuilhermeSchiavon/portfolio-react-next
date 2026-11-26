import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailView } from '@/components/views/ProjectDetailView'
import { ProjectStructuredData } from '@/components/seo/StructuredData'
import { getProject, getProjectRecommendations, getProjectUpdates } from '@/lib/api'
import { getRequestLocale } from '@/lib/request'
import { projectMetadata } from '@/lib/seo'

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const locale = getRequestLocale()
  const project = await getProject(params.slug, locale)
  // Sem projeto, o not-found.tsx cuida do título.
  return project ? projectMetadata(locale, project) : {}
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const locale = getRequestLocale()

  // As três leituras saem em paralelo e já no idioma do visitante. Antes o
  // servidor buscava sempre em português e o navegador repetia tudo depois.
  const [project, updates, recommendations] = await Promise.all([
    getProject(params.slug, locale),
    getProjectUpdates(params.slug, locale),
    getProjectRecommendations(params.slug, locale),
  ])

  if (!project) notFound()

  return (
    <>
      <ProjectStructuredData project={project} locale={locale} />
      <ProjectDetailView project={project} updates={updates} recommendations={recommendations} />
    </>
  )
}

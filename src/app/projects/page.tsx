import type { Metadata } from 'next'
import { ProjectsListView } from '@/components/views/ProjectsListView'
import { getProjects } from '@/lib/api'
import { getRequestLocale } from '@/lib/request'
import { getMeta, pageMetadata } from '@/lib/seo'

interface ProjectsPageProps {
  searchParams: { q?: string | string[]; pages?: string | string[] }
}

const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) ?? ''

export function generateMetadata(): Metadata {
  const locale = getRequestLocale()
  const meta = getMeta(locale)
  return pageMetadata(locale, { title: meta.projects.title, description: meta.projects.description, path: '/projects' })
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const locale = getRequestLocale()
  const keyword = first(searchParams.q).slice(0, 80)
  const pages = Number.parseInt(first(searchParams.pages), 10) || 1

  const { items, hasMore } = await getProjects(locale, { keyword, pages })

  return <ProjectsListView projects={items} hasMore={hasMore} keyword={keyword} pages={pages} />
}

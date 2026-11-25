'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Close, Search } from '@/components/ui/Icons'
import type { Project } from '@/types/project'

interface ProjectsListViewProps {
  projects: Project[]
  hasMore: boolean
  keyword: string
  pages: number
}

// A busca e o "carregar mais" viram parâmetros da URL (?q= e ?pages=) e o
// servidor devolve a lista pronta. O link de uma busca pode ser compartilhado.
export function ProjectsListView({ projects, hasMore, keyword, pages }: ProjectsListViewProps) {
  const { t } = useTranslation('home')
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(keyword)
  const [isPending, startTransition] = useTransition()
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(timer.current), [])

  const hrefFor = (query: string, pageCount = 1) => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (pageCount > 1) params.set('pages', String(pageCount))
    const search = params.toString()
    return search ? `${pathname}?${search}` : pathname
  }

  const search = (query: string, immediate = false) => {
    setValue(query)
    clearTimeout(timer.current)
    const navigate = () => startTransition(() => router.replace(hrefFor(query), { scroll: false }))
    if (immediate) navigate()
    else timer.current = setTimeout(navigate, 350)
  }

  return (
    <PageShell>
      <section className="border-b border-neutral-200 bg-neutral-50 py-14 dark:border-neutral-800 dark:bg-neutral-900/40 lg:py-20">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow={t('projectsSection.eyebrow')}
            title={t('projectsList.title')}
            description={t('projectsList.subtitle')}
          />

          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              search(value, true)
            }}
            className="relative mt-8 max-w-md"
          >
            <label htmlFor="project-search" className="sr-only">
              {t('projectsList.searchLabel')}
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              id="project-search"
              type="search"
              value={value}
              onChange={(event) => search(event.target.value)}
              placeholder={t('projectsList.searchPlaceholder')}
              autoComplete="off"
              maxLength={80}
              className="w-full rounded-full border border-neutral-300 bg-white py-3 pl-12 pr-12 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white [&::-webkit-search-cancel-button]:hidden"
            />
            {value && (
              <button
                type="button"
                onClick={() => search('', true)}
                aria-label={t('projectsList.clearSearch')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Close className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      </section>

      <section className="py-14 lg:py-20" aria-busy={isPending}>
        <div className={`container transition-opacity duration-200 ${isPending ? 'opacity-50' : ''}`}>
          {projects.length === 0 ? (
            <p className="py-12 text-center text-neutral-600 dark:text-neutral-400">{t('projectsList.noProjectsFound')}</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <li key={project.id}>
                  <ProjectCard project={project} priority={index < 3} />
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <Link href={hrefFor(keyword, pages + 1)} scroll={false} className="btn-ghost">
                {t('projectsList.loadMore')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}

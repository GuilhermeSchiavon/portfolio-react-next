'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PageShell } from '@/components/layout/PageShell'
import { MediaFullscreen, type MediaItem } from '@/components/ui/MediaFullscreen'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Play } from '@/components/ui/Icons'
import { projectMediaUrl, techName, youTubeId, youTubeThumbnail } from '@/lib/media'
import type { Project, ProjectUpdate, Technology } from '@/types/project'

interface ProjectDetailViewProps {
  project: Project
  updates: ProjectUpdate[]
  recommendations: Project[]
}

const TECH_TYPE_ORDER = ['backend', 'frontend', 'architecture', 'devops']

function groupByType(technologies: Technology[]) {
  const groups = new Map<string, Technology[]>()
  for (const tech of technologies) {
    const type = (tech.type || 'other').toLowerCase().trim()
    groups.set(type, [...(groups.get(type) || []), tech])
  }
  return Array.from(groups.entries()).sort(([a], [b]) => {
    const indexOf = (type: string) => (TECH_TYPE_ORDER.includes(type) ? TECH_TYPE_ORDER.indexOf(type) : TECH_TYPE_ORDER.length)
    return indexOf(a) - indexOf(b)
  })
}

// A descrição vem do painel com seu próprio <h1>. A página já tem um <h1>
// (o título do projeto), então os títulos internos descem um nível.
function demoteHeadings(html: string) {
  return html.replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2')
}

export function ProjectDetailView({ project, updates, recommendations }: ProjectDetailViewProps) {
  const { t, i18n } = useTranslation('home')
  const [selected, setSelected] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const media = useMemo<MediaItem[]>(
    () => [
      ...(project.youtubeUrl ? [{ id: 'youtube', type: 'youtube' as const, url: project.youtubeUrl }] : []),
      ...(project.Images || []).map((image) => ({ ...image, type: 'image' as const })),
    ],
    [project.youtubeUrl, project.Images]
  )

  useEffect(() => {
    setSelected(0)
    setIsFullscreen(false)
    setIsVideoPlaying(false)
  }, [project.slug])

  const current = media[selected]
  const videoId = current?.type === 'youtube' ? youTubeId(current.url) : null
  const technologies = project.Technologies || []
  const features = project.Features || []
  const implementations = project.implementations || 0

  const select = (index: number) => {
    setSelected((index + media.length) % media.length)
    setIsVideoPlaying(false)
  }

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // Fuso fixo: servidor e navegador formatam a mesma data.
      timeZone: 'UTC',
    })

  return (
    <PageShell>
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 dark:border-neutral-800 dark:bg-neutral-900/40 lg:py-14">
        <div className="container">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('projectDetail.back')}
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {project.subtitle && <p className="eyebrow">{project.subtitle}</p>}
              <h1 className="section-title mt-3">{project.title}</h1>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                {implementations > 0 && (
                  <li className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                    {t('projectDetail.implementations', { count: implementations })}
                  </li>
                )}
                {technologies.length > 0 && (
                  <li>
                    <a
                      href="#technologies"
                      className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 hover:border-primary-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                    >
                      {t('projectDetail.technologiesCount', { count: technologies.length })}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 self-start lg:self-auto">
                {t('projectDetail.viewExample')}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 space-y-14 lg:col-span-8">
            {current && (
              <div>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  {videoId ? (
                    isVideoPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${project.title} - ${t('projectDetail.videoPresentation')}`}
                      />
                    ) : (
                      // O player do YouTube só carrega quando a pessoa clica.
                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label={`${t('projectDetail.videoPresentation')}: ${project.title}`}
                        className="group absolute inset-0"
                      >
                        <Image
                          src={youTubeThumbnail(videoId)}
                          alt=""
                          fill
                          priority
                          sizes="(min-width: 1024px) 760px, 100vw"
                          className="object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xl">
                            <Play className="ml-1 h-7 w-7" />
                          </span>
                        </span>
                      </button>
                    )
                  ) : current.mediaType === 'video' && current.filename ? (
                    <video src={projectMediaUrl(current.filename)} controls className="h-full w-full object-contain" />
                  ) : current.filename ? (
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      aria-label={t('projectDetail.openFullscreen')}
                      className="absolute inset-0 cursor-zoom-in"
                    >
                      <Image
                        key={current.id}
                        src={projectMediaUrl(current.filename)}
                        alt={current.alt || project.title}
                        fill
                        priority={selected === 0}
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="object-contain"
                      />
                    </button>
                  ) : null}

                  {media.length > 1 && !isVideoPlaying && (
                    <>
                      <button
                        type="button"
                        onClick={() => select(selected - 1)}
                        aria-label={t('projectDetail.previousMedia')}
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => select(selected + 1)}
                        aria-label={t('projectDetail.nextMedia')}
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                        {selected + 1} / {media.length}
                      </span>
                    </>
                  )}
                </div>

                {media.length > 1 && (
                  <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto p-1">
                    {media.map((item, index) => {
                      const thumbVideoId = item.type === 'youtube' ? youTubeId(item.url) : null
                      const isImage = item.type === 'image' && item.mediaType !== 'video' && item.filename
                      return (
                        <li key={item.id} className="shrink-0">
                          <button
                            type="button"
                            onClick={() => select(index)}
                            aria-label={`${index + 1} / ${media.length}`}
                            aria-current={index === selected}
                            className={`relative block h-16 w-24 overflow-hidden rounded-lg bg-neutral-200 transition-opacity dark:bg-neutral-800 ${
                              index === selected ? 'ring-2 ring-primary-500' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            {thumbVideoId ? (
                              <Image src={youTubeThumbnail(thumbVideoId)} alt="" fill sizes="96px" className="object-cover" />
                            ) : isImage ? (
                              <Image src={projectMediaUrl(item.filename!)} alt="" fill sizes="96px" className="object-cover object-top" />
                            ) : null}
                            {(thumbVideoId || item.mediaType === 'video') && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                                <Play className="h-5 w-5" />
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}

            <div id="about-project">
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl">
                {t('projectDetail.aboutProject')}
              </h2>
              {/* HTML cadastrado no painel administrativo do portfólio. */}
              <div className="rich-text mt-6" dangerouslySetInnerHTML={{ __html: demoteHeadings(project.description || '') }} />
            </div>

            {features.length > 0 && (
              <div id="features">
                <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">{t('projectDetail.features')}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature.id} className="card px-5 py-4 font-medium text-neutral-800 dark:text-neutral-200">
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {updates.length > 0 && (
              <div id="updates">
                <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">{t('projectDetail.projectUpdates')}</h2>
                <ol className="mt-6 space-y-4">
                  {updates.map((update) => (
                    <li key={update.id} className="card p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-white">{update.title}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {update.version && <span className="mr-2">{t('projectDetail.version', { version: update.version })}</span>}
                          <time dateTime={update.createdAt}>{formatDate(update.createdAt)}</time>
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{update.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            {technologies.length > 0 && (
              <div id="technologies" className="card p-6 lg:sticky lg:top-28">
                <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">{t('projectDetail.technologies')}</h2>
                <dl className="mt-5 space-y-5">
                  {groupByType(technologies).map(([type, techs]) => (
                    <div key={type}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                        {t(`techTypes.${type}`, { defaultValue: type })}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <span
                            key={tech.id}
                            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {techName(tech.name)}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>

        {recommendations.length > 0 && (
          <div className="container mt-16 border-t border-neutral-200 pt-12 dark:border-neutral-800 lg:mt-20">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
              {t('projectDetail.recommendedProjects')}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((recommended) => (
                <li key={recommended.id}>
                  <ProjectCard project={recommended} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <MediaFullscreen
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        media={media}
        currentIndex={selected}
        onIndexChange={select}
        projectTitle={project.title}
        labels={{
          close: t('projectDetail.close'),
          previous: t('projectDetail.previousMedia'),
          next: t('projectDetail.nextMedia'),
        }}
      />
    </PageShell>
  )
}

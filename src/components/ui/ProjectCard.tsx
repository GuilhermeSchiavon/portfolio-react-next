'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LocaleLink as Link } from '@/components/ui/LocaleLink'
import { useTranslation } from 'react-i18next'
import { plainText, projectMediaUrl, techName, youTubeId, youTubeThumbnail } from '@/lib/media'
import { ChevronLeft, ChevronRight, Play } from '@/components/ui/Icons'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  // true nos primeiros cards da página, para a imagem não esperar o lazy-load.
  priority?: boolean
}

const MAX_TECHS = 4

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { t } = useTranslation('home')
  const [imageIndex, setImageIndex] = useState(0)

  const images = (project.Images || []).filter((image) => image.mediaType !== 'video')
  const videoId = youTubeId(project.youtubeUrl)
  const technologies = project.Technologies || []
  const image = images[imageIndex]

  const step = (delta: number) => setImageIndex((index) => (index + delta + images.length) % images.length)

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-500/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {image ? (
          // Só a imagem atual é carregada. Antes o card baixava todas de uma vez
          // (até 20 PNGs por projeto, em tamanho original).
          <Image
            key={image.id}
            src={projectMediaUrl(image.filename)}
            alt={image.alt || project.title}
            fill
            priority={priority && imageIndex === 0}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : videoId ? (
          <Image
            src={youTubeThumbnail(videoId)}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-600 to-accent-500 px-6 text-center">
            <span className="font-display text-2xl font-semibold text-white/95">{project.title}</span>
          </div>
        )}

        {videoId && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Play className="h-3 w-3" />
            {t('card.video')}
          </span>
        )}

        {images.length > 1 && (
          <>
            <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {imageIndex + 1}/{images.length}
            </span>
            {/* z-10: ficam acima do link que cobre o card inteiro. */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t('card.previousImage')}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t('card.nextImage')}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-400">
            {project.subtitle}
          </p>
        )}
        <h3 className="mt-2 font-display text-xl font-semibold text-neutral-900 dark:text-white">
          {/* O ::after estica o link pelo card inteiro. */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {plainText(project.description, 190)}
        </p>

        {technologies.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-5">
            {technologies.slice(0, MAX_TECHS).map((tech) => (
              <li
                key={tech.id}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {techName(tech.name)}
              </li>
            ))}
            {technologies.length > MAX_TECHS && (
              <li className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                +{technologies.length - MAX_TECHS}
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}

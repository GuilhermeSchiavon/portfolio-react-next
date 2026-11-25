import type { Metadata } from 'next'
import { site } from './site'
import { ogLocale, type Locale } from './locale'
import { plainText, projectMediaUrl } from './media'
import type { Project } from '@/types/project'

import enGlobal from '../locales/en/global.json'
import ptGlobal from '../locales/pt/global.json'

const dictionaries = { en: enGlobal, pt: ptGlobal }

export function getMeta(locale: Locale) {
  return dictionaries[locale].meta
}

interface PageSeo {
  title: string
  description: string
  path?: string
  image?: string
  // true quando o título já é completo e não deve receber o sufixo do layout.
  absoluteTitle?: boolean
}

export function pageMetadata(locale: Locale, page: PageSeo): Metadata {
  const image = page.image || '/og-image.jpg'
  const path = page.path || '/'

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url: path,
      siteName: site.name,
      locale: ogLocale[locale],
      images: [{ url: image, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image],
    },
  }
}

export function projectMetadata(locale: Locale, project: Project): Metadata {
  const cover = project.Images?.find((image) => image.mediaType !== 'video')
  const subtitle = project.subtitle ? `: ${project.subtitle}` : ''

  return pageMetadata(locale, {
    title: `${project.title}${subtitle}`,
    description: plainText(project.description, 160),
    path: `/projects/${project.slug}`,
    image: cover ? projectMediaUrl(cover.filename) : undefined,
  })
}

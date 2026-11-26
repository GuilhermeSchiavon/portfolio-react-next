import type { Metadata } from 'next'
import { site } from './site'
import { defaultLocale, htmlLang, localePath, locales, ogLocale, type Locale } from './locale'
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

// Endereço da mesma página em cada idioma (hreflang). É o que diz aos
// buscadores que "/projects/x" e "/pt/projects/x" são versões uma da outra.
export function languageAlternates(path: string, base = ''): Record<string, string> {
  // Com base (sitemap), o endereço sai completo e sem barra no fim.
  const address = (locale: Locale) => (base ? `${base}${localePath(locale, path)}`.replace(/\/$/, '') : localePath(locale, path))

  return {
    ...Object.fromEntries(locales.map((locale) => [htmlLang[locale], address(locale)])),
    'x-default': address(defaultLocale),
  }
}

export function pageMetadata(locale: Locale, page: PageSeo): Metadata {
  const image = page.image || '/og-image.jpg'
  const path = page.path || '/'
  const url = localePath(locale, path)

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => ogLocale[other]),
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

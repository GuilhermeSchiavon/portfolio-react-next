import type { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/api'
import { localePath, locales } from '@/lib/locale'
import { languageAlternates } from '@/lib/seo'
import { site } from '@/lib/site'

// Cada página aparece uma vez por idioma (inglês na raiz, português em /pt),
// com a indicação de qual é a versão equivalente no outro idioma.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs()
  const now = new Date()

  const pages = [
    { path: '/', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    ...slugs.map((slug) => ({ path: `/projects/${slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]

  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`.replace(/\/$/, ''),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path, site.url) },
    }))
  )
}

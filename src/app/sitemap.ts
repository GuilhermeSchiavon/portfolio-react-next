import type { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/api'
import { site } from '@/lib/site'

// Inclui cada página de projeto, não só a home e a listagem.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs()
  const now = new Date()

  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...slugs.map((slug) => ({
      url: `${site.url}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

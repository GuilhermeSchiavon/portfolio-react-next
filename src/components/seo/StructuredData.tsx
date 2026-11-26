import { site } from '@/lib/site'
import { htmlLang, localePath, type Locale } from '@/lib/locale'
import { plainText, projectMediaUrl } from '@/lib/media'
import type { Project } from '@/types/project'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado para o JSON nunca fechar a tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function PersonStructuredData({ jobTitle, description }: { jobTitle: string; description: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        jobTitle,
        description,
        url: site.url,
        image: `${site.url}/img/guilherme-schiavon.jpg`,
        email: `mailto:${site.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
        sameAs: [site.social.github, site.social.linkedin, site.social.instagram],
        knowsLanguage: ['pt-BR', 'en'],
        knowsAbout: [
          'Node.js',
          'NestJS',
          'TypeScript',
          'Vue.js',
          'React',
          'Next.js',
          'PostgreSQL',
          'RabbitMQ',
          'Redis',
          'System integrations',
          'AI-assisted software engineering',
        ],
      }}
    />
  )
}

export function ProjectStructuredData({ project, locale }: { project: Project; locale: Locale }) {
  const cover = project.Images?.find((image) => image.mediaType !== 'video')

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.subtitle || undefined,
        description: plainText(project.description, 300),
        url: `${site.url}${localePath(locale, `/projects/${project.slug}`)}`,
        inLanguage: htmlLang[locale],
        image: cover ? projectMediaUrl(cover.filename) : undefined,
        creator: { '@type': 'Person', name: site.name, url: site.url },
        keywords: project.Technologies?.map((tech) => tech.name).join(', ') || undefined,
      }}
    />
  )
}

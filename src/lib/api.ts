import 'server-only'
import type { Locale } from './locale'
import type { Project, ProjectList, ProjectUpdate, Technology } from '@/types/project'

// Todas as leituras da API acontecem no servidor do Next: a página já chega
// com os projetos no HTML (melhor para SEO e para quem abre o link), o
// navegador não depende de CORS e a resposta fica em cache por alguns minutos.
const API_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
const REVALIDATE_SECONDS = 300
const TIMEOUT_MS = 8000
const PAGE_SIZE = 12

type Params = Record<string, string | number | undefined>

async function get<T>(path: string, params: Params = {}): Promise<T | null> {
  if (!API_URL) return null

  const url = new URL(`${API_URL}/api/v2${path}`)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    // API fora do ar ou lenta: a página renderiza sem essa parte em vez de quebrar.
    return null
  }
}

interface ProjectPage {
  items: Project[]
  pageNumber: number
  pages: number
  total: number
}

async function getProjectPage(locale: Locale, pageNumber: number, keyword = ''): Promise<Project[]> {
  const data = await get<ProjectPage>('/project', { language: locale, pageNumber, keyword })
  return data?.items ?? []
}

// Busca as `pages` primeiras páginas. Não confia em `total`/`pages` da API
// (a contagem considerava os JOINs); decide se há mais olhando a página seguinte.
export async function getProjects(locale: Locale, options: { keyword?: string; pages?: number } = {}): Promise<ProjectList> {
  const pages = Math.min(Math.max(options.pages ?? 1, 1), 10)
  const keyword = options.keyword?.trim() ?? ''

  const loaded = await Promise.all(
    Array.from({ length: pages }, (_, index) => getProjectPage(locale, index + 1, keyword))
  )
  const items = loaded.flat()

  const lastPageIsFull = (loaded[loaded.length - 1]?.length ?? 0) === PAGE_SIZE
  const hasMore = lastPageIsFull ? (await getProjectPage(locale, pages + 1, keyword)).length > 0 : false

  return { items, hasMore }
}

// Todos os slugs, para o sitemap. Percorre as páginas em sequência e para na
// primeira que vier incompleta.
export async function getAllProjectSlugs(): Promise<string[]> {
  const slugs: string[] = []
  for (let page = 1; page <= 20; page += 1) {
    const items = await getProjectPage('pt', page)
    slugs.push(...items.map((project) => project.slug))
    if (items.length < PAGE_SIZE) break
  }
  return slugs
}

export async function getProject(slug: string, locale: Locale): Promise<Project | null> {
  const data = await get<{ item: Project }>(`/project/slug/${encodeURIComponent(slug)}`, { language: locale })
  return data?.item ?? null
}

export async function getProjectUpdates(slug: string, locale: Locale): Promise<ProjectUpdate[]> {
  const data = await get<{ items: ProjectUpdate[] }>(`/project/slug/${encodeURIComponent(slug)}/updates`, { language: locale })
  return data?.items ?? []
}

export async function getProjectRecommendations(slug: string, locale: Locale, limit = 3): Promise<Project[]> {
  const data = await get<{ items: Project[] }>(`/project/slug/${encodeURIComponent(slug)}/recommendations`, { language: locale, limit })
  return data?.items ?? []
}

export async function getTechnologies(): Promise<Technology[]> {
  const data = await get<Technology[]>('/technologies')
  return (data ?? []).filter((tech) => tech.status !== 'inativo')
}

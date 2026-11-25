import { HomeView } from '@/components/views/HomeView'
import { getAllProjectSlugs, getProjects } from '@/lib/api'
import { getRequestLocale } from '@/lib/request'

const FEATURED_COUNT = 3

export default async function HomePage() {
  const locale = getRequestLocale()
  // O total vem da contagem de slugs, que percorre todas as páginas da API.
  const [{ items }, slugs] = await Promise.all([getProjects(locale), getAllProjectSlugs()])

  return <HomeView featuredProjects={items.slice(0, FEATURED_COUNT)} projectCount={slugs.length} />
}

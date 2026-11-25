const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

// Os arquivos enviados pelo painel têm espaços e acentos no nome
// (ex.: "1/E-commerce_Página_01.png"), então cada segmento é codificado.
export function projectMediaUrl(filename: string): string {
  const path = filename.split('/').map(encodeURIComponent).join('/')
  return `${API_URL}/uploads/projects/${path}`
}

export function youTubeId(url?: string | null): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  )
  return match ? match[1] : null
}

export function youTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

// Texto puro a partir da descrição em HTML que vem do painel. Usado em cards
// e meta description: jogar o HTML inteiro num <p> gerava <h1> dentro de <p>.
export function plainText(html: string | null | undefined, maxLength = 180): string {
  if (!html) return ''
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    // O primeiro título costuma repetir o nome do projeto.
    .replace(/<h1[\s\S]*?<\/h1>/i, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), maxLength - 30)).trimEnd()}…`
}

// Nomes de tecnologia como estão cadastrados hoje no banco -> grafia correta.
// O ideal é corrigir no cadastro; isto só evita mostrar o erro enquanto isso.
const TECH_NAME_FIXES: Record<string, string> = {
  'Type Script': 'TypeScript',
  'Java Script': 'JavaScript',
  'Word Press': 'WordPress',
  'HTML 5': 'HTML5',
  Malter: 'Multer',
  'Digital Ocean': 'DigitalOcean',
}

export function techName(name: string): string {
  return TECH_NAME_FIXES[name] ?? name
}

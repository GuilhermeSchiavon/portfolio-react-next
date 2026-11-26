export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const LOCALE_COOKIE = 'lang'
export const THEME_COOKIE = 'theme'
// Cabeçalho interno: o middleware avisa as páginas qual idioma o endereço pede.
export const LOCALE_HEADER = 'x-site-locale'

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

// Escolhe o idioma do visitante: preferência salva, depois o navegador
// (Accept-Language), depois o padrão. Assim quem chega do Brasil vê o site em
// português sem precisar clicar em nada.
export function pickLocale(cookieValue?: string | null, acceptLanguage?: string | null): Locale {
  if (isLocale(cookieValue)) return cookieValue

  const preferred = (acceptLanguage || '')
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q)

  for (const { lang } of preferred) {
    if (isLocale(lang)) return lang
  }
  return defaultLocale
}

// Cada idioma tem o seu endereço, para os buscadores indexarem os dois:
// o padrão fica na raiz ("/projects") e os outros ganham prefixo ("/pt/projects").

// "/pt/projects/x" -> { locale: 'pt', path: '/projects/x' }
export function splitLocalePath(pathname: string): { locale: Locale | null; path: string } {
  const [, first, ...rest] = pathname.split('/')
  if (isLocale(first)) return { locale: first, path: `/${rest.join('/')}` }
  return { locale: null, path: pathname }
}

// localePath('pt', '/#about') -> '/pt#about'. Links externos e âncoras da
// própria página ("#contact") passam direto.
export function localePath(locale: Locale, href: string): string {
  if (locale === defaultLocale || !href.startsWith('/')) return href
  const cut = href.search(/[?#]/)
  const pathname = cut === -1 ? href : href.slice(0, cut)
  const rest = cut === -1 ? '' : href.slice(cut)
  return `/${locale}${pathname === '/' ? '' : pathname}${rest}`
}

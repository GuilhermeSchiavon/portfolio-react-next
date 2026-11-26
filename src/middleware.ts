import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, LOCALE_HEADER, defaultLocale, localePath, pickLocale, splitLocalePath } from '@/lib/locale'

// Idioma pelo endereço: "/" e "/projects/..." em inglês, "/pt/..." em português.
// Antes os dois idiomas dividiam o mesmo endereço (escolha por cookie ou pelo
// navegador) e os buscadores, que não mandam nenhum dos dois, só enxergavam o
// inglês. As páginas continuam em src/app sem pasta de idioma: o "/pt" é
// retirado aqui e o idioma segue num cabeçalho (lib/request.ts).
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const { locale: urlLocale, path } = splitLocalePath(pathname)

  // "/en/..." é o mesmo conteúdo da raiz: um endereço só por idioma.
  if (urlLocale === defaultLocale) {
    return NextResponse.redirect(new URL(`${path}${search}`, request.url), 308)
  }

  if (!urlLocale) {
    // Endereço sem prefixo: quem prefere outro idioma (escolha salva ou idioma
    // do navegador) é levado para a versão dele. Robôs ficam aqui e chegam ao
    // "/pt" pelos links alternate e pelo sitemap.
    const preferred = pickLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get('accept-language'))
    if (preferred !== defaultLocale) {
      const response = NextResponse.redirect(new URL(`${localePath(preferred, pathname)}${search}`, request.url), 307)
      response.headers.set('Vary', 'Accept-Language, Cookie')
      return response
    }
  }

  const headers = new Headers(request.headers)
  headers.set(LOCALE_HEADER, urlLocale ?? defaultLocale)

  if (!urlLocale) return NextResponse.next({ request: { headers } })

  const url = request.nextUrl.clone()
  url.pathname = path
  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  // Tudo menos os arquivos do Next e o que tem extensão (imagens, favicon,
  // sitemap.xml, robots.txt).
  matcher: ['/((?!_next/|.*\\.[\\w]+$).*)'],
}

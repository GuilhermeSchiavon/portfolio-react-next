import 'server-only'
import { cookies, headers } from 'next/headers'
import { LOCALE_COOKIE, LOCALE_HEADER, THEME_COOKIE, isLocale, pickLocale, type Locale } from './locale'

export type Theme = 'light' | 'dark'

// O idioma vem do endereço ("/pt/..."), que o middleware traduz neste
// cabeçalho. O cookie e o Accept-Language só valem onde o middleware não passa.
export function getRequestLocale(): Locale {
  const fromUrl = headers().get(LOCALE_HEADER)
  if (isLocale(fromUrl)) return fromUrl
  return pickLocale(cookies().get(LOCALE_COOKIE)?.value, headers().get('accept-language'))
}

// Sem cookie, o tema fica indefinido e um script no <head> decide pelo
// prefers-color-scheme antes da primeira pintura.
export function getRequestTheme(): Theme | undefined {
  const value = cookies().get(THEME_COOKIE)?.value
  return value === 'dark' || value === 'light' ? value : undefined
}

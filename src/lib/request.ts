import 'server-only'
import { cookies, headers } from 'next/headers'
import { LOCALE_COOKIE, THEME_COOKIE, pickLocale, type Locale } from './locale'

export type Theme = 'light' | 'dark'

export function getRequestLocale(): Locale {
  return pickLocale(cookies().get(LOCALE_COOKIE)?.value, headers().get('accept-language'))
}

// Sem cookie, o tema fica indefinido e um script no <head> decide pelo
// prefers-color-scheme antes da primeira pintura.
export function getRequestTheme(): Theme | undefined {
  const value = cookies().get(THEME_COOKIE)?.value
  return value === 'dark' || value === 'light' ? value : undefined
}

'use client'

import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { LOCALE_COOKIE, htmlLang, localePath, locales, splitLocalePath, type Locale } from '@/lib/locale'

// Cada idioma tem o seu endereço ("/" e "/pt"), então trocar de idioma é um
// link de verdade: o visitante pode copiar e os buscadores conseguem seguir.
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation('global')
  const pathname = usePathname()
  const current = i18n.language as Locale
  const { path } = splitLocalePath(pathname)

  const go = (event: React.MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    event.preventDefault()
    if (locale === current) return
    // Lembra a escolha: sem isso, quem tem o navegador em português e pediu
    // inglês seria levado de volta ao "/pt" na próxima visita.
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
    // Navegação completa: o layout inteiro (textos fixos e <html lang>) muda.
    window.location.assign(`${localePath(locale, path)}${window.location.search}${window.location.hash}`)
  }

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="flex items-center rounded-full border border-neutral-400/40 p-0.5 text-xs font-semibold"
    >
      {locales.map((locale) => (
        <a
          key={locale}
          href={localePath(locale, path)}
          hrefLang={htmlLang[locale]}
          lang={htmlLang[locale]}
          onClick={(event) => go(event, locale)}
          aria-current={locale === current ? 'true' : undefined}
          title={t(`language.${locale}`)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === current ? 'bg-primary-600 text-white' : 'opacity-70 hover:opacity-100'
          }`}
        >
          {locale}
        </a>
      ))}
    </div>
  )
}

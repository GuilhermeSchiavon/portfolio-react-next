'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { LOCALE_COOKIE, locales, type Locale } from '@/lib/locale'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation('global')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const current = i18n.language as Locale

  const change = (locale: Locale) => {
    if (locale === current) return
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
    // O servidor renderiza de novo já no idioma escolhido (textos e projetos).
    startTransition(() => router.refresh())
  }

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={`flex items-center rounded-full border border-neutral-400/40 p-0.5 text-xs font-semibold ${
        isPending ? 'opacity-60' : ''
      }`}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => change(locale)}
          aria-pressed={locale === current}
          title={t(`language.${locale}`)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === current ? 'bg-primary-600 text-white' : 'opacity-70 hover:opacity-100'
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}

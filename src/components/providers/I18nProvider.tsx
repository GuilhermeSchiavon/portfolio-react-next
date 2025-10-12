'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'
import { useAppSelector } from '@/store'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useAppSelector((state) => state.language.language)

  useEffect(() => {
    if (language?.sigla && i18n.language !== language.sigla) {
      i18n.changeLanguage(language.sigla)
    }
  }, [language])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
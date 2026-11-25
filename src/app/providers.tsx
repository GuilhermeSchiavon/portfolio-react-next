'use client'

import { useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MotionConfig } from 'framer-motion'
import { createI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/locale'

export function Providers({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const i18n = useMemo(() => createI18n(locale), [locale])

  return (
    <I18nextProvider i18n={i18n}>
      {/* Respeita "reduzir movimento" do sistema em todas as animações. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nextProvider>
  )
}

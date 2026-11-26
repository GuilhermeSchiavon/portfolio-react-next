'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { localePath, type Locale } from '@/lib/locale'

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

// Link interno que mantém o visitante no idioma em que ele está:
// "/projects" vira "/pt/projects" na versão em português.
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { i18n } = useTranslation()
  return <Link href={localePath(i18n.language as Locale, href)} {...props} />
}

'use client'

import { LocaleLink as Link } from '@/components/ui/LocaleLink'
import { useTranslation } from 'react-i18next'
import { PageShell } from '@/components/layout/PageShell'

export function NotFoundView({ kind = 'page' }: { kind?: 'page' | 'project' }) {
  const { t } = useTranslation('global')

  return (
    <PageShell>
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-semibold text-primary-600 dark:text-primary-400">404</p>
        <h1 className="section-title mt-4">{t(kind === 'project' ? 'notFound.projectTitle' : 'notFound.title')}</h1>
        <p className="mt-4 max-w-md text-lg text-neutral-600 dark:text-neutral-400">{t('notFound.text')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            {t('notFound.home')}
          </Link>
          <Link href="/projects" className="btn-ghost">
            {t('notFound.projects')}
          </Link>
        </div>
      </section>
    </PageShell>
  )
}

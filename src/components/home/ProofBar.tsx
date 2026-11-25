'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { site, yearsOfExperience } from '@/lib/site'
import { ArrowRight } from '@/components/ui/Icons'

// Números que dão a dimensão do trabalho. Vêm de lib/site.ts (com a fonte de
// cada um) e do total real de projetos da API; nada de "50+" digitado à mão.
export function ProofBar({ projectCount }: { projectCount: number }) {
  const { t } = useTranslation('home')

  const stats = [
    { value: `${yearsOfExperience()}+`, label: t('proof.years') },
    { value: `${site.proof.servicesInProduction}+`, label: t('proof.services') },
    { value: String(site.proof.servers), label: t('proof.servers') },
  ]

  return (
    <section aria-label={t('about.eyebrow')} className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <dl className="container grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-4xl font-semibold text-neutral-900 dark:text-white lg:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 block max-w-[16rem] text-sm leading-snug text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}

        {projectCount > 0 && (
          <div>
            <dt className="sr-only">{t('proof.projects')}</dt>
            <dd>
              <span className="block font-display text-4xl font-semibold text-neutral-900 dark:text-white lg:text-5xl">
                {projectCount}
              </span>
              <span className="mt-2 block max-w-[16rem] text-sm leading-snug text-neutral-600 dark:text-neutral-400">
                {t('proof.projects')}
              </span>
              <Link
                href="/projects"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                {t('proof.seeProjects')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}

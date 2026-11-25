'use client'

import { useTranslation } from 'react-i18next'
import { stack } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function StackSection() {
  const { t } = useTranslation('home')
  const extra = t('stack.extra', { returnObjects: true }) as Record<string, string[]>

  return (
    <section id="stack" className="bg-white py-20 dark:bg-neutral-950 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow={t('stack.eyebrow')} title={t('stack.title')} />
        </Reveal>

        <dl className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {stack.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.04} className="grid gap-3 py-5 sm:grid-cols-4 sm:gap-6">
              <dt className="font-display text-base font-semibold text-neutral-900 dark:text-white">
                {t(`stack.groups.${group.group}`)}
              </dt>
              <dd className="sm:col-span-3">
                <ul className="flex flex-wrap gap-2">
                  {[...group.items, ...(extra[group.group] || [])].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

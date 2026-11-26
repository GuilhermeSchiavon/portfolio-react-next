'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Collapse } from '@/components/ui/Collapse'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ChevronDown, ExternalLink } from '@/components/ui/Icons'

interface Experience {
  period: string
  title: string
  organization: string
  url?: string
  summary: string
  highlights: string[]
  stack: string[]
}

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const { t } = useTranslation('home')
  // Só no celular: os destaques ficam recolhidos e abrem pelo botão. No
  // desktop o cartão aparece inteiro e o botão nem existe na tela.
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `experience-highlights-${index}`
  const hasHighlights = experience.highlights.length > 0

  return (
    <article className="card p-5 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-8">
      <header className="lg:col-span-4">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{experience.period}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-neutral-900 dark:text-white sm:text-xl">
          {experience.title}
        </h3>
        {experience.url ? (
          <a
            href={experience.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
          >
            {experience.organization}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <p className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">{experience.organization}</p>
        )}
      </header>

      <div className="mt-4 lg:col-span-8 lg:mt-0">
        <p className="text-[0.9375rem] leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base sm:leading-relaxed">
          {experience.summary}
        </p>

        {hasHighlights && (
          <Collapse id={panelId} open={isOpen} openFrom="lg">
            <ul className="space-y-2.5 pt-4">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </Collapse>
        )}

        {experience.stack.length > 0 && (
          <ul aria-label={t('experience.stackLabel')} className="mt-4 flex flex-wrap gap-2 lg:mt-5">
            {experience.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {hasHighlights && (
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="-mb-1 -ml-1 mt-3 inline-flex items-center gap-1.5 rounded-full px-1 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 lg:hidden"
          >
            {isOpen ? t('experience.hideHighlights') : t('experience.showHighlights', { count: experience.highlights.length })}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </article>
  )
}

export function ExperienceSection() {
  const { t } = useTranslation('home')
  const experiences = t('experience.items', { returnObjects: true }) as Experience[]

  return (
    <section id="experience" className="bg-neutral-50 py-16 dark:bg-neutral-900/40 sm:py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />
        </Reveal>

        <ol className="mt-10 space-y-4 border-l border-neutral-200 dark:border-neutral-800 sm:mt-12 sm:space-y-6 lg:mt-16">
          {experiences.map((experience, index) => (
            <Reveal as="li" key={`${experience.organization}-${experience.period}`} delay={index * 0.05} className="relative pl-5 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-primary-500 ring-4 ring-neutral-50 dark:ring-neutral-950 sm:top-8"
              />
              <ExperienceCard experience={experience} index={index} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

'use client'

import { useTranslation } from 'react-i18next'
import { site, yearsOfExperience } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Layers, Plug, Server, Sparkles } from '@/components/ui/Icons'

interface Pillar {
  title: string
  text: string
}

const pillarIcons = [Layers, Plug, Sparkles, Server]

export function AboutSection() {
  const { t } = useTranslation('home')

  const paragraphs = t('about.paragraphs', {
    returnObjects: true,
    years: yearsOfExperience(),
    services: site.proof.servicesInProduction,
  }) as string[]
  const pillars = t('about.pillars', { returnObjects: true }) as Pillar[]

  return (
    <section id="about" className="bg-white py-20 dark:bg-neutral-950 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />
          <div className="prose-links mt-8 space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {paragraphs.map((paragraph, index) => (
              // Texto fixo dos arquivos de tradução (contém links).
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <h3 className="eyebrow !text-neutral-500 dark:!text-neutral-400">{t('about.pillarsTitle')}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index % pillarIcons.length]
              return (
                <Reveal as="li" key={pillar.title} delay={index * 0.06} className="card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{pillar.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

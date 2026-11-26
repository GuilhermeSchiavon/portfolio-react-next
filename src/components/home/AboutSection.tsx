'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { site, yearsOfExperience } from '@/lib/site'
import { Collapse } from '@/components/ui/Collapse'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SwipeRow } from '@/components/ui/SwipeRow'
import { ChevronDown, Layers, Plug, Server, Sparkles } from '@/components/ui/Icons'

interface Pillar {
  title: string
  text: string
}

const pillarIcons = [Layers, Plug, Sparkles, Server]

export function AboutSection() {
  const { t } = useTranslation('home')
  const [isStoryOpen, setIsStoryOpen] = useState(false)

  const story = t('about.story', {
    returnObjects: true,
    years: yearsOfExperience(),
    services: site.proof.servicesInProduction,
  }) as string[]
  const pillars = t('about.pillars', { returnObjects: true }) as Pillar[]

  return (
    <section id="about" className="bg-white py-16 dark:bg-neutral-950 sm:py-20 lg:py-28">
      <div className="container grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

          {/* No celular vem primeiro a frase que resume, e a trajetória abre
              sob demanda. No desktop é o texto corrido, na ordem natural. */}
          <div className="prose-links mt-6 flex flex-col leading-relaxed text-neutral-600 dark:text-neutral-400 lg:mt-8 lg:text-lg lg:leading-relaxed">
            <Collapse id="about-story" open={isStoryOpen} openFrom="lg" className="order-2 lg:order-1">
              <div className="space-y-4 pt-4 lg:space-y-5 lg:pt-0">
                {story.map((paragraph, index) => (
                  // Texto fixo dos arquivos de tradução (contém links).
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </Collapse>

            <p className="order-1 text-lg leading-relaxed text-neutral-800 dark:text-neutral-200 lg:order-2 lg:mt-5 lg:text-neutral-600 dark:lg:text-neutral-400">
              {t('about.closing')}
            </p>

            <button
              type="button"
              onClick={() => setIsStoryOpen((open) => !open)}
              aria-expanded={isStoryOpen}
              aria-controls="about-story"
              className="order-3 -ml-1 mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-1 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 lg:hidden"
            >
              {t(isStoryOpen ? 'about.less' : 'about.more')}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isStoryOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <h3 className="eyebrow !text-neutral-500 dark:!text-neutral-400">{t('about.pillarsTitle')}</h3>
          <Reveal className="mt-5 sm:mt-6">
            <SwipeRow className="sm:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length]
                return (
                  <li key={pillar.title} className="card w-[80%] shrink-0 snap-start p-5 sm:w-auto sm:p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{pillar.text}</p>
                  </li>
                )
              })}
            </SwipeRow>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

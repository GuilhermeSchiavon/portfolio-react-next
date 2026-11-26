'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Collapse } from '@/components/ui/Collapse'
import { Reveal } from '@/components/ui/Reveal'
import { Check, ChevronDown } from '@/components/ui/Icons'
import { useMediaQuery } from '@/lib/useMediaQuery'

interface Item {
  title: string
  text: string
}

// Seção nova: como o Guilherme trabalha com IA e como se comporta em um time.
// É o que mais mudou desde a primeira versão do portfólio.
export function HowIWorkSection() {
  const { t } = useTranslation('home')
  // No celular os quatro princípios viram uma lista que abre um por vez; a
  // partir de 640 px ficam todos abertos e o título deixa de ser botão.
  const isWide = useMediaQuery('(min-width: 640px)')
  const [openItem, setOpenItem] = useState<number | null>(0)

  const aiItems = t('work.ai.items', { returnObjects: true }) as Item[]
  const teamSteps = t('work.team.steps', { returnObjects: true }) as Item[]

  return (
    <section id="work" className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-28">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-primary-400">{t('work.eyebrow')}</p>
          <h2 className="mt-3 font-display text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {t('work.title')}
          </h2>
          <p className="mt-5 leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg sm:leading-relaxed">{t('work.intro')}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-12">
          {/* Com IA */}
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 pb-2 pt-5 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{t('work.ai.title')}</h3>
            <ul className="mt-2 divide-y divide-white/10 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 sm:divide-y-0">
              {aiItems.map((item, index) => {
                const isOpen = openItem === index
                const panelId = `work-ai-${index}`

                return (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-3.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-300 sm:mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1 pb-3.5 sm:pb-0">
                      <h4 className="font-semibold text-white">
                        {isWide ? (
                          item.title
                        ) : (
                          <button
                            type="button"
                            onClick={() => setOpenItem(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="-mb-3.5 flex w-full items-center justify-between gap-3 py-3.5 text-left sm:mb-0 sm:py-0"
                          >
                            {item.title}
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 sm:hidden ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </h4>
                      <Collapse id={panelId} open={isOpen} openFrom="sm">
                        <p className="pt-3.5 text-sm leading-relaxed text-neutral-400 sm:pt-1.5">{item.text}</p>
                      </Collapse>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Em time */}
          <Reveal delay={0.08} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:col-span-5">
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{t('work.team.title')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:mt-3">{t('work.team.intro')}</p>
            <ol className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
              {teamSteps.map((step, index) => (
                <li key={step.title} className="relative flex gap-4">
                  {/* Linha que liga um passo ao seguinte. */}
                  {index < teamSteps.length - 1 && (
                    <span aria-hidden="true" className="absolute bottom-[-1.25rem] left-4 top-8 w-px bg-white/10 sm:bottom-[-1.5rem]" />
                  )}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-400/40 font-display text-sm font-semibold text-primary-300">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400 sm:mt-1.5">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

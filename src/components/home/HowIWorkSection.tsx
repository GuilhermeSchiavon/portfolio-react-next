'use client'

import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { Check } from '@/components/ui/Icons'

interface Item {
  title: string
  text: string
}

// Seção nova: como o Guilherme trabalha com IA e como se comporta em um time.
// É o que mais mudou desde a primeira versão do portfólio.
export function HowIWorkSection() {
  const { t } = useTranslation('home')

  const aiItems = t('work.ai.items', { returnObjects: true }) as Item[]
  const teamSteps = t('work.team.steps', { returnObjects: true }) as Item[]

  return (
    <section id="work" className="bg-neutral-950 py-20 text-white lg:py-28">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-primary-400">{t('work.eyebrow')}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t('work.title')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">{t('work.intro')}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Com IA */}
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-2xl font-semibold">{t('work.ai.title')}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {aiItems.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Em time */}
          <Reveal delay={0.08} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold">{t('work.team.title')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">{t('work.team.intro')}</p>
            <ol className="mt-6 space-y-6">
              {teamSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-400/40 font-display text-sm font-semibold text-primary-300">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{step.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{step.text}</p>
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

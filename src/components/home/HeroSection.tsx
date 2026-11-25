'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { integrations, whatsappLink } from '@/lib/site'
import { ArrowRight, WhatsApp } from '@/components/ui/Icons'

// As duas fotos têm o mesmo enquadramento: o fundo (Fontana di Trevi) e o
// recorte do Guilherme por cima. O nome fica entre as duas camadas, o que dá a
// profundidade. Ambas precisam do mesmo object-position para alinhar.
// No desktop a foto sobe um pouco (60%) para o rosto ficar acima do texto.
const photoClass = 'absolute inset-0 h-full w-full object-cover object-center lg:object-[center_60%]'

// Arquivos estáticos gerados por scripts/optimize-images.mjs (7,4 MB -> ~250 KB
// no celular e ~620 KB em telas grandes), sem processamento no servidor.
const srcSet = (name: string) => `/img/${name}-1280.webp 1280w, /img/${name}-2400.webp 2400w`

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

export function HeroSection() {
  const { t } = useTranslation('home')
  const { t: tGlobal } = useTranslation('global')

  return (
    <section id="home" className="relative isolate flex flex-col overflow-hidden bg-neutral-950 text-white lg:min-h-[100svh]">
      {/* Palco da foto. No celular ocupa a parte de cima e o texto vem embaixo;
          no desktop cobre a seção inteira e o texto fica sobreposto. */}
      <div className="relative h-[62svh] min-h-[22rem] lg:absolute lg:inset-0 lg:h-auto">
        {/* Camada 1: fundo. É o LCP da página: priority e nada de esperar JS. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-bg-2400.webp"
          srcSet={srcSet('hero-bg')}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className={photoClass}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/20" />

        {/* Camada 2: nome, atrás do recorte. */}
        <h1 className="pointer-events-none absolute inset-x-0 top-20 px-5 font-raleway uppercase leading-[0.85] sm:px-8 lg:top-28 lg:px-16">
          <span className="rise block text-[13vw] font-thin lg:text-[6.2vw]" style={delay(80)}>
            Guilherme
          </span>
          <span className="rise mt-[2.5vw] block text-right text-[13vw] font-semibold lg:mt-0 lg:text-[6.2vw]" style={delay(200)}>
            Schiavon
          </span>
        </h1>

        {/* Camada 3: recorte da foto, na frente do nome. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-me-2400.webp"
          srcSet={srcSet('hero-me')}
          sizes="100vw"
          alt={t('hero.photoAlt')}
          fetchPriority="high"
          decoding="async"
          className={photoClass}
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent lg:h-[62%] lg:from-neutral-950 lg:via-neutral-950/80" />
      </div>

      {/* Camada 4: proposta de valor e ações. */}
      <div className="relative -mt-16 lg:mt-auto">
        <div className="container pb-10 short:pb-6">
          <p className="rise eyebrow !text-primary-300" style={delay(320)}>
            {t('hero.role')}
          </p>
          <p
            className="rise mt-3 max-w-4xl font-display text-[1.6rem] font-medium leading-tight [text-wrap:balance] sm:text-4xl lg:text-[2.1rem] short:mt-2 short:text-[2rem]"
            style={delay(420)}
          >
            {t('hero.tagline')}
          </p>

          <div className="rise mt-7 flex flex-wrap gap-3 short:mt-5" style={delay(520)}>
            <Link href="/#projects" className="btn-primary">
              {t('hero.ctaProjects')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(tGlobal('contact.whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/30 text-white hover:bg-white/10"
            >
              <WhatsApp className="h-4 w-4" />
              {t('hero.ctaContact')}
            </a>
          </div>

          <div
            className="rise mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:gap-6 short:mt-6 short:pt-4"
            style={delay(620)}
          >
            <p className="shrink-0 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">{t('hero.integrations')}</p>
            <ul className="flex flex-wrap items-center gap-2.5">
              {integrations.map((integration) => (
                <li
                  key={integration.name}
                  title={integration.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 p-1.5"
                >
                  {/* SVGs pequenos e estáticos: <img> simples basta. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={integration.icon} alt={integration.name} width={24} height={24} className="h-full w-full object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

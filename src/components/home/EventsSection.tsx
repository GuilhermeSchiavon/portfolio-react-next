'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons'

interface EventItem {
  icon: string
  title: string
  text: string
}

const videos = ['/mov/hacktown-1.mp4', '/mov/hacktown-2.mp4', '/mov/hacktown-3.mp4']

export function EventsSection() {
  const { t } = useTranslation('home')
  const items = t('events.items', { returnObjects: true }) as EventItem[]

  const [current, setCurrent] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  // Os vídeos só carregam e tocam quando o bloco está visível.
  const isVisible = useInView(frameRef, { amount: 0.5 })

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === current && isVisible) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [current, isVisible])

  const go = (step: number) => setCurrent((index) => (index + step + videos.length) % videos.length)

  return (
    <section id="events" className="bg-neutral-50 py-20 dark:bg-neutral-900/40 lg:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SectionHeading eyebrow={t('events.eyebrow')} title={t('events.title')} />
          <ul className="mt-10 space-y-4">
            {items.map((item) => (
              <li key={item.title} className="card flex items-start gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 p-2.5 dark:bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon} alt="" width={28} height={28} loading="lazy" className="h-full w-full object-contain" />
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <div
            ref={frameRef}
            role="group"
            aria-label={t('events.videoLabel', { current: current + 1, total: videos.length })}
            className="relative mx-auto aspect-[9/16] w-full max-w-[17rem] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-2xl shadow-black/20 ring-1 ring-black/10"
          >
            {videos.map((src, index) => (
              <video
                key={src}
                ref={(element) => {
                  videoRefs.current[index] = element
                }}
                src={isVisible || index === current ? src : undefined}
                muted
                playsInline
                preload="none"
                onEnded={() => go(1)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
              {videos.map((src, index) => (
                <span
                  key={src}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === current ? 'w-8 bg-white' : 'w-5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div className="absolute inset-x-3 bottom-3 flex justify-between">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('events.previous')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('events.next')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

export function HeroSection() {
  const { t } = useTranslation('home')
  const heroImageRef = useRef<HTMLImageElement>(null)
  const firstNameRef = useRef<HTMLDivElement>(null)
  const lastNameRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animação para a imagem de fundo
    tl.fromTo(heroImageRef.current, {
      opacity: 0,
      scale: 1.0
    }, {
      opacity: 0.8,
      scale: 1.0,
      duration: 3.33,
      ease: 'power2.out'
    })

    // Animação para "Guilherme"
    tl.fromTo(firstNameRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=1.2')

    // Animação para "Schiavon"
    tl.fromTo(lastNameRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.8')

    // Animação para o ícone
    tl.fromTo(iconRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.5')

    // Animação para o subtítulo
    tl.fromTo(subtitleRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.2')

    // Animação do scroll indicator
    tl.fromTo(scrollRef.current, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.5')

    // Animação de movimento contínuo do scroll
    gsap.to('.scroll-arrow', {
      y: 10,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <header className="relative h-screen overflow-hidden bg-[#3d3d3d] text-white">
      <img 
        ref={heroImageRef}
        alt="Guilherme Schiavon Picture" 
        loading="lazy" 
        decoding="async" 
        className="absolute inset-0 w-full h-full object-cover lg:object-contain opacity-0 mt-24"
        src="/img/myPicture.png" 
      />
      <div className="relative bottom-10 p-4 flex h-full flex-col justify-end gap-2 lg:flex-col-reverse lg:justify-normal">
        <div className="flex w-full flex-nowrap overflow-hidden whitespace-nowrap select-none">
          <div className="relative w-full mx-4 text-[#d2d2d2] opacity-90">
            <div 
              ref={firstNameRef}
              className="md:font-thin lg:text-[6vw] text-[max(4vh,12vw)] font-[Raleway] leading-[0.82] opacity-0"
            >
              GUILHERME
            </div>
            <div 
              ref={lastNameRef}
              className="lg:text-right lg:text-[7vw] text-[max(4vh,12vw)] font-[Raleway] leading-[0.82] font-semibold opacity-0"
            >
              SCHIAVON
            </div>
          </div>
        </div>
        <div className="lg:ml-auto">
          <div className="flex mx-2 mt-2 lg:mb-12 lg:mx-36 text-gray-300 items-center">
            <div ref={iconRef} className="mb-2 lg:mb-4 mr-2 opacity-0">
              <svg className="size-12 lg:size-7 max-lg:-rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 13V19H13"></path>
                <path d="M5 5L19 19"></path>
              </svg>
            </div>
            <div ref={subtitleRef} className="font-[Raleway] opacity-0">
              <span className="block">
                {t('heroComponent.scientist')}
              </span>
              <span className="block">
                {t('heroComponent.full')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6 scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </header>
  )
}
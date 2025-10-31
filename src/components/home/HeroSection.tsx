'use client'

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

export function HeroSection() {
  const { t } = useTranslation('home')
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroImageBgRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLDivElement>(null)
  const lastNameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const taglineMobileRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const integrations = [
    { name: 'Google', icon: '/icons/google.svg' },
    { name: 'Meta', icon: '/icons/meta.svg' },
    { name: 'Whats App', icon: '/icons/whatsapp.svg' },
    { name: 'OpenAI', icon: '/icons/openai.svg' },
    { name: 'Zoom', icon: '/icons/zoom.svg' },
    { name: 'Mercado Pago', icon: '/icons/mercadopago.svg' },
    { name: 'Amazon', icon: '/icons/aws.svg' }
  ]

  useEffect(() => {
    const tl = gsap.timeline()

    // Animação para a imagem de fundo
    tl.fromTo(heroImageBgRef.current, {
      opacity: 0,
      scale: 1.1
    }, {
      opacity: 1,
      scale: 1.0,
      duration: 2,
      ease: 'power2.out'
    })
    tl.fromTo(heroImageRef.current, {
      opacity: 0,
      scale: 1.1
    }, {
      opacity: 1,
      scale: 1.0,
      duration: 2,
      ease: 'power2.out'
    })

    // Animação para "Guilherme"
    tl.fromTo(firstNameRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=1')

    // Animação para "Schiavon"
    tl.fromTo(lastNameRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')

    // Animação para a tagline
    tl.fromTo(taglineRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4')
    tl.fromTo(taglineMobileRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4')

    // Animação para o carrossel
    tl.fromTo(carouselRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
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

    // Animação infinita do carrossel
    gsap.to('.carousel-track', {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1
    })

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
    <header className="relative h-screen overflow-hidden text-white">
      {/* Background Image */}
      <div ref={heroImageBgRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-1" style={{ backgroundImage: 'url(/img/myPicture.jpg)', backgroundPosition: 'center 50%' }} />
    
      {/* Radial Gradient Overlay - darker at corners */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full px-4 md:px-8 lg:px-16">
       
        {/* Name - Top Left */}
        <div className="absolute top-28 left-4 md:left-8 lg:left-16">
          <div ref={firstNameRef}className="text-[max(12vw)] md:text-[max(6vw)] font-[Raleway] font-thin leading-[0.85] opacity-0 text-white mb-2">
            GUILHERME
          </div>
        </div>

        {/* Surname - Top Right, slightly below name */}
        <div className="absolute top-44 right-4 md:right-8 lg:right-16">
          <div ref={lastNameRef} className="lg:text-right text-[max(12vw)] md:text-[max(6vw)] font-[Raleway] font-semibold leading-[0.85] opacity-0 text-white text-right">
            SCHIAVON

            <div ref={taglineMobileRef} className="md:hidden backdrop-blur-md bg-black/20 p-2 mt-2 rounded border border-white/10 w-1/2 ml-auto">
              <p className="text-[12px] leading-4 md:text-base font-[Raleway] text-center text-gray-100">
                {t('heroComponent.tagline')}
              </p>
            </div>
          </div>
        </div>


        {/* Tagline - Right side with blur background */}
        <div className="absolute max-md:hidden top-1/2 right-4 md:right-8 lg:right-16 w-1/2">
          <div ref={taglineRef} className="backdrop-blur-md bg-black/20 px-2 md:px-5 py-2 rounded border border-white/10 opacity-0">
          {/* <div className="backdrop-blur-md bg-black/20 px-2 md:px-5 py-2 rounded border border-white/10 opacity-0"> */}
            <p className="text-xs md:text-base font-[Raleway] pl-24 lg:pl-44 text-right text-gray-100 leading-relaxed">
              {t('heroComponent.tagline')}
            </p>
          </div>
        </div>

        {/* Integrations Carousel - Bottom Left, half screen width */}
        <div className="absolute bottom-[37%] md:bottom-20 left-0 w-1/2 overflow-hidden max-sm">
          <div ref={carouselRef}className="relative opacity-0">
            <div className="carousel-track flex items-center gap-8 w-max pl-4 md:pl-8 lg:pl-16">
              {[...integrations, ...integrations].map((integration, index) => (
                <div key={`${integration.name}-${index}`} className="flex flex-col items-center gap-2 min-w-[60px]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <img src={integration.icon} alt={integration.name} className="w-10 h-10 md:h-14 md:w-14 object-contain" />
                  </div>
                  {/* <span className="text-xs text-gray-300 font-medium">
                    {integration.name}
                  </span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={heroImageRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 z-20" style={{ backgroundImage: 'url(/img/My.png)', backgroundPosition: 'center 50%' }} />

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center text-gray-300">
          <span className="text-sm mb-2 font-light">Scroll</span>
          <svg className="w-6 h-6 scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </header>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useTechnologies } from '@/hooks/useTechnologies'
import { groupTechnologiesByType, getTechTypeColor, getTechTypeLabel } from '@/utils/technologyUtils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const { t } = useTranslation('home')
  const [activeTab, setActiveTab] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { technologies } = useTechnologies()

  // Cálculo automático dos anos de experiência desde outubro 2021
  const getYearsExperience = () => {
    const startDate = new Date(2021, 9, 1) // Outubro = mês 9 (0-indexed)
    const currentDate = new Date()
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
    return diffYears
  }
  
  const yearsExperience = getYearsExperience()

  // Vídeos do HackTown gravados na horizontal
  const hackTownVideos = [
    '/mov/hacktown-1.mp4',
    '/mov/hacktown-2.mp4',
    '/mov/hacktown-3.mp4'
  ]

  const getTechCount = () => {
    return technologies.length
  }

  const stats = [
    { value: '50+', label: t('otherProjects.title'), link: '/projects', action: 'link' },
    { value: `${yearsExperience}+`, label: t('descriptionComponent.years'), action: 'scroll' },
    { value: `${getTechCount()}+`, label: t('techStack.title') || 'Tecnologias', action: 'tab', tabIndex: 1 }
  ]

  // Função para ir para o próximo vídeo
  const goToNextVideo = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hackTownVideos.length)
  }

  // Limpar timeout de autoplay
  const clearAutoplayTimeout = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current)
      autoplayTimeoutRef.current = null
    }
  }

  // Configurar próximo autoplay
  const setAutoplayTimeout = () => {
    clearAutoplayTimeout()
    autoplayTimeoutRef.current = setTimeout(goToNextVideo, 8000)
  }

  // Funções para navegação manual dos vídeos
  const nextVideo = () => {
    clearAutoplayTimeout()
    setCurrentImageIndex((prev) => (prev + 1) % hackTownVideos.length)
  }

  const prevVideo = () => {
    clearAutoplayTimeout()
    setCurrentImageIndex((prev) => (prev - 1 + hackTownVideos.length) % hackTownVideos.length)
  }

  const goToVideo = (index: number) => {
    clearAutoplayTimeout()
    setCurrentImageIndex(index)
  }

  // Handlers para touch/mouse
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
    clearAutoplayTimeout()
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragOffset(clientX - dragStart)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prevVideo()
      } else {
        nextVideo()
      }
    }
    
    setDragOffset(0)
  }

  // Controle de reprodução dos vídeos
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentImageIndex) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [currentImageIndex])

  // Efeito de scroll para mudança de cor do background
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const experiences = t('experiences.itens', { returnObjects: true }) as Array<{
    period: string
    title: string
    organization: string
    url: string
    description: string
  }>

  const tabs = [
    { key: 'about', label: t('descriptionComponent.itens.0') },
    { key: 'techstack', label: t('descriptionComponent.itens.1') }
  ]

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Iniciar autoplay
  useEffect(() => {
    setAutoplayTimeout()
    return () => clearAutoplayTimeout()
  }, [])

  // Cleanup effect
  useEffect(() => {
    return () => {
      clearAutoplayTimeout()
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause()
        }
      })
    }
  }, [])

  const getTabContent = (tabKey: string) => {
    switch (tabKey) {
      case 'about':
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Conteúdo de Texto */}
              <div className="space-y-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div 
                    className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: t('descriptionComponent.about') }}
                  />
                  <div 
                    className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t('descriptionComponent.technical') }}
                  />
                </div>
                
                {/* Animação Multi-tenant vs Single-tenant */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('descriptionComponent.solutions.title') || 'Soluções Flexíveis'}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg cursor-help" title={t('descriptionComponent.solutions.single.help')}>
                      <svg className="absolute size-4 top-1 right-1 text-[#5a9567]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                      <div className="w-20 h-20 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <div className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg"
                          style={{ 
                            backgroundImage: 'url(/icons/single-tenant.png)', backgroundPosition: 'center 50%'
                          }}
                        />
                      </div>
                      <h5 className="font-semibold text-neutral-900 dark:text-white mb-1">{t('descriptionComponent.solutions.single.name')}</h5>
                      <div className="flex justify-center items-center">
                        <p className="px-3 py-1 text-xs bg-[#5a9567] dark:bg-neutral-900/50 text-white mb-1 rounded-full">{t('descriptionComponent.solutions.single.slug')}</p>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.solutions.single.description')}</p>
                    </div>

                    <div className="relative text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg cursor-help" title={t('descriptionComponent.solutions.multi.help')}>
                      <svg className="absolute size-5 top-1 right-1 text-[#378ac5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                      <div className="w-20 h-20 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <div className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg"
                          style={{ 
                            backgroundImage: 'url(/icons/multi-tenant.png)', backgroundPosition: 'center 50%'
                          }}
                        />
                      </div>
                      <h5 className="font-semibold text-neutral-900 dark:text-white mb-1">{t('descriptionComponent.solutions.multi.name')}</h5>
                      <div className="flex justify-center items-center">
                        <p className="px-3 py-1 text-xs bg-[#378ac5] dark:bg-neutral-900/50 text-white mb-1 rounded-full">{t('descriptionComponent.solutions.multi.slug')}</p>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.solutions.multi.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Certificados */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('descriptionComponent.certificatesTitle') || 'Certificados & Eventos'}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="min-w-10 h-10 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        <img alt="Google" src="/icons/google.svg" className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 dark:text-white">{t('descriptionComponent.certificates.google') || 'Certificado Google'}</h5>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.certificates.googleDesc') || 'Introdução à IA e Machine Learning'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="min-w-10 h-10 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        <img alt="Google" src="/icons/hacktown.png" className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 dark:text-white">{t('descriptionComponent.certificates.hacktown') || 'HackTown 2025'}</h5>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.certificates.hacktownDesc') || 'Participação no maior evento de tecnologia'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vídeos do HackTown - Carrossel estilo Instagram */}
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group">
                    {/* Container dos vídeos */}
                    <div 
                      className="flex h-full transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                      onMouseDown={handleDragStart}
                      onMouseMove={handleDragMove}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                      onTouchStart={handleDragStart}
                      onTouchMove={handleDragMove}
                      onTouchEnd={handleDragEnd}
                    >
                      {hackTownVideos.map((video, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0 relative bg-gray-800">
                          {/* Fallback visual */}
                          <div className="fallback absolute inset-0 flex items-center justify-center text-white z-10">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🎥</div>
                              <div className="text-sm">HackTown {index + 1}</div>
                              <div className="text-xs mt-1 opacity-70">Carregando...</div>
                            </div>
                          </div>
                          <video 
                            ref={(el) => { videoRefs.current[index] = el }}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            onEnded={goToNextVideo}
                            onError={() => console.log(`Erro ao carregar: ${video}`)}
                            onLoadedData={(e) => {
                              console.log(`Carregado: ${video}`)
                              const target = e.target as HTMLVideoElement
                              const fallback = target.parentElement?.querySelector('.fallback') as HTMLElement
                              if (fallback) fallback.style.display = 'none'
                            }}
                          >
                            <source src={video} type="video/mp4" />
                            <div className="flex items-center justify-center h-full text-white">
                              Vídeo não disponível
                            </div>
                          </video>
                        </div>
                      ))}

                    
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                      {hackTownVideos.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 w-6'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Contador */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs z-20">
                      {currentImageIndex + 1}/{hackTownVideos.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'techstack':
        const groupedTechs = groupTechnologiesByType(technologies)
        return (
          <div className="space-y-8">
            {Object.entries(groupedTechs).map(([type, techs]) => (
              <div key={type}>
                <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  {getTechTypeLabel(type)}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {techs.map((tech) => (
                    <div key={tech.id} className="flex items-center space-x-2 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <div className={`w-8 h-8 bg-gradient-to-br ${getTechTypeColor(tech.type)} rounded-lg flex items-center justify-center text-white font-semibold text-xs`}>
                        {tech.svg ? (
                          <div dangerouslySetInnerHTML={{ __html: tech.svg }} className="w-4 h-4" />
                        ) : (
                          tech.name.charAt(0)
                        )}
                      </div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 lg:py-32 relative overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-40"
          style={{
            background: `rgb(${59 + scrollY * 0.3}, ${130 + scrollY * 0.2}, ${246 - scrollY * 0.3})`,
            animation: 'float1 9s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            background: `rgb(${16 + scrollY * 0.15}, ${185 + scrollY * 0.2}, ${129 - scrollY * 0.25})`,
            animation: 'float2 7s ease-in-out infinite'
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(15px) translateX(-20px); }
          66% { transform: translateY(-15px) translateX(10px); }
        }
      `}</style>

      <div className="container mx-auto px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-px bg-primary-500"></div>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">{t('descriptionComponent.title')}</span>
              <div className="w-8 h-px bg-primary-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              {t('descriptionComponent.subtitle')}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> {yearsExperience}+ {t('descriptionComponent.years')}</span>
            </h2>
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div ref={tabsRef} className="tab-container flex bg-white dark:bg-neutral-800 rounded-xl p-1 border border-neutral-200 dark:border-neutral-700 shadow-lg">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(index)}
                  className={`tab-button relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-102'
                  }`}
                >
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div ref={contentRef} className="w-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getTabContent(tabs[activeTab].key)}
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full mx-auto">
            {stats.map((stat) => {
              const statContent = (
                <div className={`text-center h-full p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 ${
                  stat.action !== 'none' ? 'hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer transform' : ''
                }`}>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium capitalize">{stat.label}</div>
                  {stat.action !== 'none' && (
                    <div className="mt-2 text-xs text-primary-500 dark:text-primary-400">
                      {stat.action === 'link' ? t('stats.viewProjects') || 'Ver projetos' : stat.action === 'scroll' ? t('stats.viewExperience') || 'Ver experiência' : t('stats.viewTechnologies') || 'Ver tecnologias'}
                    </div>
                  )}
                </div>
              )
              
              if (stat.action === 'link') {
                return (
                  <Link key={stat.label} href={stat.link || '#'} className="block">
                    {statContent}
                  </Link>
                )
              }
              
              if (stat.action === 'tab') {
                return (
                  <button
                    key={stat.label}
                    onClick={() => setActiveTab(stat.tabIndex || 0)}
                    className="w-full"
                  >
                    {statContent}
                  </button>
                )
              }
              
              if (stat.action === 'scroll') {
                return (
                  <button
                    key={stat.label}
                    onClick={() => document.getElementById('experience-timeline')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full"
                  >
                    {statContent}
                  </button>
                )
              }
              
              return (
                <div key={stat.label}>
                  {statContent}
                </div>
              )
            })}
          </div>

          {/* Experience Timeline */}
          <div id="experience-timeline" className="mt-20">
            <h3 className="text-3xl font-display font-semibold text-neutral-900 dark:text-white text-center mb-12">
              {t('experiences.title')}
            </h3>
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line - Responsive */}
              <div className="timeline-line absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-px h-full bg-gradient-to-b from-primary-500 to-accent-500"></div>
              
              <div className="space-y-8 md:space-y-12">
                {experiences.map((experience, index) => (
                  <div 
                    key={index}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Timeline Dot - Responsive positioning */}
                    <div className="timeline-dot absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-neutral-900 z-10 transform -translate-x-1/2"></div>
                    
                    {/* Content Card - Responsive width and positioning */}
                    <div
                      className={`timeline-card w-full md:w-5/12 ml-12 md:ml-0 p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 shadow-lg ${
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                      }`}
                    >
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-1">{experience.period}</div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">{experience.title}</div>
                      <a 
                        href={experience.url || '#'} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-600 dark:text-neutral-300 hover:underline hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                      >
                        {experience.organization}
                      </a>
                      <p 
                        className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: experience.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
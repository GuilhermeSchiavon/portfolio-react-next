'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const { t } = useTranslation('home')
  const [activeTab, setActiveTab] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
    '/mov/hacktown-1.MOV',
    '/mov/hacktown-2.MOV',
    '/mov/hacktown-3.MOV'
  ]

  const techStack = {
    frontend: [
      { name: 'Vue.js', icon: 'V' },
      { name: 'Vuex', icon: 'Vx' },
      { name: 'React', icon: 'R' },
      { name: 'Next.js', icon: 'N' },
      { name: 'Tailwind CSS', icon: 'T' },
      { name: 'GSAP', icon: 'G' }
    ],
    backend: [
      { name: 'Node.js', icon: 'N' },
      { name: 'Express', icon: 'E' },
      { name: 'Sequelize', icon: 'S' }
    ],
    architecture: [
      { name: 'Multi-tenant', icon: 'M' },
      { name: 'Multi-vendor (SaaS)', icon: 'S' },
      { name: 'Webhooks', icon: 'W' },
      { name: 'Fila Redis', icon: 'R' },
      { name: 'Testes unitários', icon: 'T' }
    ],
    integrations: [
      { name: 'Google', icon: 'G' },
      { name: 'Meta', icon: 'M' },
      { name: 'Mercado Pago', icon: 'MP' },
      { name: 'ChatGPT', icon: 'C' },
      { name: 'Zoom', icon: 'Z' },
      { name: 'SBU-SP', icon: 'S' },
      { name: 'SBN', icon: 'SB' },
      { name: 'UNIFESP', icon: 'U' }
    ],
    devops: [
      { name: 'Docker', icon: 'D' },
      { name: 'GitHub Actions', icon: 'GA' }
    ]
  }

  const getTechCount = () => {
    return Object.values(techStack).reduce((total, category) => total + category.length, 0)
  }

  const stats = [
    { value: '50+', label: t('otherProjects.title'), link: '/projects', action: 'link' },
    { value: `${yearsExperience}+`, label: t('descriptionComponent.years'), action: 'scroll' },
    { value: `${getTechCount()}+`, label: t('techStack.title') || 'Tecnologias', action: 'tab', tabIndex: 1 }
  ]

  // Rotação automática dos vídeos do HackTown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hackTownVideos.length)
    }, 14000) // Troca a cada 14 segundos

    return () => clearInterval(interval)
  }, [])

  // Efeito de scroll para mudança de cor do background
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const experiences = t('experiences.itens', { returnObjects: true }) as Array<{
    period: string
    title: string
    description: string
  }>

  const tabs = [
    { key: 'about', label: t('descriptionComponent.itens.0') },
    { key: 'techstack', label: t('descriptionComponent.itens.1') }
  ]

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
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('descriptionComponent.solutions') || 'Soluções Flexíveis'}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MT</span>
                      </div>
                      <h5 className="font-semibold text-neutral-900 dark:text-white mb-2">Multi-tenant</h5>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Vários clientes, uma instância</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                      <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">ST</span>
                      </div>
                      <h5 className="font-semibold text-neutral-900 dark:text-white mb-2">Single-tenant</h5>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Um cliente, uma instância</p>
                    </div>
                  </div>
                </div>
                
                {/* Certificados */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('descriptionComponent.certificatesTitle') || 'Certificados & Eventos'}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        G
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 dark:text-white">{t('descriptionComponent.certificates.google') || 'Certificado Google'}</h5>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.certificates.googleDesc') || 'Introdução à IA e Machine Learning'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        HT
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 dark:text-white">{t('descriptionComponent.certificates.hacktown') || 'HackTown 2025'}</h5>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('descriptionComponent.certificates.hacktownDesc') || 'Participação no maior evento de tecnologia'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vídeos do HackTown */}
              <div className="relative h-full max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-xl h-full min-h-[500px] max-h-[77vh]">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {hackTownVideos.map((video, index) => (
                      <div key={index} className="w-full h-full max-h-screen flex-shrink-0">
                        <video 
                          className="w-full h-full object-cover rounded-xl"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          loading="lazy"
                          autoPlay
                          // {...(index === currentImageIndex ? { autoPlay: true } : {})}
                        >
                          <source src={video} type="video/quicktime" />
                          <source src={video} type="video/mp4" />
                          Seu navegador não suporta vídeos.
                        </video>
                      </div>
                    ))}
                  </div>
                  
                  {/* Indicadores */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {hackTownVideos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'techstack':
        return (
          <div className="space-y-8">
            {/* Frontend */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('techStack.frontend') || 'Frontend'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techStack.frontend.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-2 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                      {tech.icon}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Backend */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('techStack.backend') || 'Backend'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techStack.backend.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-2 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                      {tech.icon}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arquitetura */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('techStack.architecture') || 'Arquitetura'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {techStack.architecture.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-2 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                      {tech.icon}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* DevOps */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t('techStack.devops') || 'Infra / DevOps'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techStack.devops.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-2 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                      {tech.icon}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
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
              {t('descriptionComponent.title')}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> {yearsExperience}+ {t('descriptionComponent.years')}</span>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: t('descriptionComponent.about') }} className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"/>
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div ref={tabsRef} className="flex bg-white dark:bg-neutral-800 rounded-xl p-2 border border-neutral-200 dark:border-neutral-700">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
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
            <div className="relative mx-auto">
              {/* Timeline Line - Hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary-500 to-accent-500"></div>
              
              <div className="space-y-8 md:space-y-12">
                {experiences.map((experience, index) => (
                  <div 
                    key={index}
                    className={`relative flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Timeline Dot - Adjusted for mobile */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-neutral-900 z-10"></div>
                    
                    {/* Content Card - Full width on mobile */}
                    <a href={experience.url} target="_blank"
                      className={`w-full md:w-5/12 p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer transform shadow-lg ${
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                      }`}
                    >
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-1">{experience.period}</div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{experience.title}</div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">{experience.description}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
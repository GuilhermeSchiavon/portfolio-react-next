'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const { t } = useTranslation('home')
  const [activeTab, setActiveTab] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Imagens do HackTown que serão trocadas automaticamente
  const hackTownImages = [
    '/img/hacktown-1.jpg', // Você adicionará essas imagens depois
    '/img/hacktown-2.jpg',
    '/img/hacktown-3.jpg'
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

  const stats = [
    { value: '50+', label: t('otherProjects.title') },
    { value: '3+', label: t('descriptionComponent.years') },
    { value: '15+', label: 'Tecnologias' }
  ]

  // Rotação automática das imagens do HackTown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hackTownImages.length)
    }, 3000) // Troca a cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  const experiences = t('experiences', { returnObjects: true }) as Array<{
    period: string
    title: string
    description: string
  }>

  const tabs = [
    { key: 'about', label: 'Sobre Mim' },
    { key: 'technical', label: 'Visão Técnica' },
    { key: 'techstack', label: 'Tech Stack' }
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
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Como <strong>cientista na área de TI</strong>, levo o desenvolvimento de projetos web a um novo patamar, 
                utilizando meu conhecimento para <strong>criar sistemas que não apenas atendem, mas superam as expectativas</strong> 
                em termos de escalabilidade, robustez, modularidade e responsividade.
              </p>
            </div>
            
            {/* Certificados e Eventos */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Certificados & Eventos</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    G
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900 dark:text-white">Certificado Google</h5>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Introdução à IA e Machine Learning</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    HT
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900 dark:text-white">HackTown 2025</h5>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Participação no maior evento de tecnologia</p>
                  </div>
                </div>
              </div>
              
              {/* Carrossel de imagens do HackTown */}
              <div className="mt-6 relative overflow-hidden rounded-lg h-48">
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {hackTownImages.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg font-semibold">
                        HackTown 2025 - Imagem {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {hackTownImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'technical':
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Nos últimos anos, venho desenvolvendo soluções integradas com APIs de grandes plataformas 
              (Google, Meta, Mercado Pago, ChatGPT, Zoom), além de sistemas para instituições médicas 
              como <strong>SBU-SP, SBN e UNIFESP</strong>.
            </p>
            
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Principais Integrações</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {techStack.integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center space-x-2 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                      {integration.icon}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'techstack':
        return (
          <div className="space-y-8">
            {/* Frontend */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Frontend</h4>
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
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Backend</h4>
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
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Arquitetura</h4>
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
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Infra / DevOps</h4>
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
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-px bg-primary-500"></div>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">About Me</span>
              <div className="w-8 h-px bg-primary-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Passionate About
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Innovation</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              I'm a full-stack developer with a passion for creating exceptional digital experiences. 
              With expertise in modern technologies and a focus on user-centric design.
            </p>
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
          <div ref={contentRef} className="max-w-4xl mx-auto">
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
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="mt-20">
            <h3 className="text-3xl font-display font-semibold text-neutral-900 dark:text-white text-center mb-12">
              Professional Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary-500 to-accent-500"></div>
              
              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-neutral-900 z-10"></div>
                    
                    {/* Content Card */}
                    <div 
                      className={`w-5/12 p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-1">{experience.period}</div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{experience.title}</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">{experience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
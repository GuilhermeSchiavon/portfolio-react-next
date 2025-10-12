'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profileData } from '@/data/profile'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const { t } = useTranslation('home')
  const [activeTab, setActiveTab] = useState(0)
  const [yearsExperience] = useState(3)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { skills, stats, experience: experiences } = profileData

  const tabs = [
    { key: 'about', label: t('descriptionComponent.itens.0') },
    { key: 'services', label: t('descriptionComponent.itens.1') },
    { key: 'experience', label: t('descriptionComponent.itens.2') }
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
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: t('descriptionComponent.about') }}
          />
        )
      case 'services':
        return (
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: t('descriptionComponent.services') }}
          />
        )
      case 'experience':
        return (
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: t('descriptionComponent.experience') }}
          />
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

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              {/* Skills Grid */}
              <div>
                <h3 className="text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {skill.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">{skill.name}</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{skill.level}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
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
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="w-full h-96 bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">GS</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent"></div>
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 max-w-xs">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">Available for Projects</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Currently accepting new opportunities and collaborations.
                  </p>
                </div>
              </div>
            </div>
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
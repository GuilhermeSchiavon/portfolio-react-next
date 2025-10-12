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
  const [yearsExperience] = useState(5)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { key: 'about', label: t('descriptionComponent.itens.0') },
    { key: 'services', label: t('descriptionComponent.itens.1') },
    { key: 'experience', label: t('descriptionComponent.itens.2') }
  ]

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Animate section on scroll
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 50
        },
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

      // Animate tabs
      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children,
          {
            opacity: 0,
            x: -30
          },
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
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white dark:bg-neutral-900"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              {t('descriptionComponent.title')}
              <span className="text-primary-600 dark:text-primary-400">
                {yearsExperience} {t('descriptionComponent.years')}
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Tabs Navigation */}
            <div className="lg:col-span-4">
              <div 
                ref={tabsRef}
                className="space-y-2 sticky top-24"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-8">
              <motion.div
                key={activeTab}
                ref={contentRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8 shadow-lg"
              >
                {getTabContent(tabs[activeTab].key)}
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '30+', label: 'Happy Clients' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
  const { t } = useTranslation('home')
  const { projects, loading } = useAppSelector((state) => state.project)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(sectionRef.current?.querySelector('.section-header'),
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
            start: "top 80%"
          }
        }
      )

      // Animate project cards
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          {
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [projects])

  const featuredProjects = projects.slice(0, 6)

  return (
    <section 
      id="project"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-950"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="section-header text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore some of my recent work, showcasing modern web solutions built with cutting-edge technologies.
            </motion.p>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div 
              ref={gridRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Other Projects Section */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              {t('otherProjects.title')}
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              {t('otherProjects.subtitle')}
            </p>
            
            <motion.button
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('otherProjects.seeMore')}
            </motion.button>
          </motion.div>

          {/* Technologies Section */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Technologies I Use
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'React', icon: '⚛️' },
                { name: 'Next.js', icon: '▲' },
                { name: 'TypeScript', icon: '📘' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'Tailwind', icon: '🎨' },
                { name: 'GSAP', icon: '🎭' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
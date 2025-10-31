'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProjects } from '@/store/slices/projectSlice'
import { ProjectCard } from '@/components/ui/ProjectCard'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  liveUrl: string
  githubUrl: string
  technologies: string[]
}

export function ProjectsSection() {
  const { t, i18n } = useTranslation('home')
  const dispatch = useAppDispatch()
  const { projects, loading, error } = useAppSelector((state) => state.project)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set())
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = parseInt(entry.target.getAttribute('data-project-id') || '0')
          if (entry.isIntersecting) {
            setVisibleVideos(prev => new Set([...prev, projectId]))
          } else {
            setVisibleVideos(prev => {
              const newSet = new Set(prev)
              newSet.delete(projectId)
              return newSet
            })
          }
        })
      },
      { threshold: 0.5 }
    )
    
    const projectCards = document.querySelectorAll('[data-project-id]')
    projectCards.forEach(card => observer.observe(card))
    
    return () => observer.disconnect()
  }, [projects])
  
  useEffect(() => {
    dispatch(fetchProjects({ 
      keyword: '', 
      pageNumber: 1, 
      language: i18n.language 
    }))
  }, [dispatch, i18n.language])



  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelector('.section-header'),
        { opacity: 0, y: 50 },
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

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 60, scale: 0.9 },
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

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white dark:bg-neutral-950 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-px bg-primary-500"></div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Portfolio</span>
            <div className="w-8 h-px bg-primary-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Featured
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Projects</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-neutral-600 dark:text-neutral-400">Carregando projetos...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div 
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.slice(0, 3).map((project, index) => {
              const isVideoVisible = activeVideo === project.id
              const isFirstCard = index === 0
              
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isVideoVisible={isVideoVisible}
                  isFirstCard={isFirstCard && !activeVideo}
                  onMouseEnter={() => project.youtubeUrl && setActiveVideo(project.id)}
                  onMouseLeave={() => setActiveVideo(null)}
                />
              )
            })}
          </div>
        )}

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Link 
            href="/projects"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
          >
            <span>View All Projects ({ projects.length })</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
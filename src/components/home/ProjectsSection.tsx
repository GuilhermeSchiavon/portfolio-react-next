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
  const { t } = useTranslation('home')
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  
  const categories = ['All', 'Web Apps', 'Mobile', 'E-commerce', 'APIs']
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with real-time inventory management and payment processing.',
      category: 'E-commerce',
      image: '/img/projects/ecommerce.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features.',
      category: 'Web Apps',
      image: '/img/projects/taskapp.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io']
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
      category: 'Web Apps',
      image: '/img/projects/weather.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'OpenWeather API']
    },
    {
      id: 4,
      title: 'Restaurant API',
      description: 'RESTful API for restaurant management with order processing and inventory tracking.',
      category: 'APIs',
      image: '/img/projects/api.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT']
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      description: 'Mobile-first fitness tracking application with workout plans and progress monitoring.',
      category: 'Mobile',
      image: '/img/projects/fitness.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js']
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with dynamic content management and contact forms.',
      category: 'Web Apps',
      image: '/img/projects/portfolio.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      technologies: ['Vue.js', 'Nuxt.js', 'TailwindCSS', 'Netlify']
    }
  ]

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      'Vue.js': 'bg-green-500',
      'React': 'bg-blue-500',
      'Node.js': 'bg-green-600',
      'TypeScript': 'bg-blue-600',
      'MongoDB': 'bg-green-700',
      'PostgreSQL': 'bg-blue-700',
      'Express': 'bg-neutral-600',
      'Firebase': 'bg-yellow-500',
      'TailwindCSS': 'bg-cyan-500'
    }
    return colors[tech] || 'bg-neutral-400'
  }

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
  }, [filteredProjects])

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

        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Project Links Overlay */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/90 dark:bg-neutral-900/90 rounded-full text-neutral-900 dark:text-white hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/90 dark:bg-neutral-900/90 rounded-full text-neutral-900 dark:text-white hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex space-x-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <div
                        key={tech}
                        className={`w-2 h-2 rounded-full ${getTechColor(tech)}`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Link 
            href="/projects"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
          >
            <span>View All Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
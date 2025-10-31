'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    subtitle?: string
    slug: string
    youtubeUrl?: string
    Images?: Array<{
      id: number
      filename: string
      mediaType?: string
      alt?: string
    }>
    Technologies?: Array<{
      id: number
      name: string
    }>
    ProjectUpdates?: Array<{ id: number }>
    Implementations?: Array<{ id: number }>
  }
  isVideoVisible?: boolean
  showAnimation?: boolean
  animationDelay?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  isFirstCard?: boolean
}

export function ProjectCard({ 
  project, 
  isVideoVisible = false, 
  showAnimation = false,
  animationDelay = 0,
  onMouseEnter,
  onMouseLeave,
  isFirstCard = false
}: ProjectCardProps) {
  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }, [])

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

  const videoId = project.youtubeUrl ? getYouTubeVideoId(project.youtubeUrl) : null
  const updatesCount = project.ProjectUpdates?.length || 0
  const implementationsCount = project.Implementations?.length || 0

  const shouldAutoplay = isFirstCard || isVideoVisible

  const CardContent = () => (
    <div 
      data-project-id={project.id}
      className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        {/* Project Media */}
        <div className="relative overflow-hidden">
          {project.youtubeUrl && videoId ? (
            <div className="relative w-full h-48">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${shouldAutoplay ? 1 : 0}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${videoId}`}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title={project.title}
              />
            </div>
          ) : project.Images && project.Images.length > 0 ? (
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${project.Images[0].filename}`}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
              <div className="text-white text-4xl font-bold">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          
          {/* Video Indicator */}
          {project.Images?.some((img: any) => img.mediaType === 'video') && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              {project.subtitle || 'Project'}
            </span>
            <div className="flex space-x-1">
              {project.Technologies?.slice(0, 3).map((tech) => (
                <div
                  key={tech.id}
                  className={`w-2 h-2 rounded-full ${getTechColor(tech.name)}`}
                ></div>
              ))}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.Technologies?.slice(0, 4).map((tech) => (
              <span
                key={tech.id}
                className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
              >
                {tech.name}
              </span>
            ))}
            {project.Technologies && project.Technologies.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                +{project.Technologies.length - 4}
              </span>
            )}
          </div>

          {/* Project Stats */}
          {(updatesCount > 0 || implementationsCount > 0) && (
            <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400">
              {updatesCount > 0 && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{updatesCount} atualizações</span>
                </div>
              )}
              {implementationsCount > 0 && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{implementationsCount} implementações</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )

  if (showAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: animationDelay }}
      >
        <CardContent />
      </motion.div>
    )
  }

  return <CardContent />
}
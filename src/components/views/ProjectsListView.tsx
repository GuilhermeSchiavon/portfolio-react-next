'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProjects } from '@/store/slices/projectSlice'

export function ProjectsListView() {
  const { t, i18n } = useTranslation('home')
  const dispatch = useAppDispatch()
  const { projects, loading, error, pageNumber, pages } = useAppSelector((state) => state.project)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set())
  
  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }, [])

  useEffect(() => {
    dispatch(fetchProjects({ 
      keyword: searchKeyword, 
      pageNumber: currentPage, 
      language: i18n.language 
    }))
  }, [dispatch, searchKeyword, currentPage, i18n.language])
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(fetchProjects({ 
      keyword: searchKeyword, 
      pageNumber: 1, 
      language: i18n.language 
    }))
  }

  const loadMore = () => {
    if (currentPage < pages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                  Todos os
                  <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Projetos</span>
                </h1>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
                  Explore minha coleção completa de projetos, desde aplicações web modernas até APIs robustas.
                </p>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="Buscar projetos..."
                      className="w-full px-4 py-3 pl-12 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            {loading && currentPage === 1 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-neutral-600 dark:text-neutral-400">Carregando projetos...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Nenhum projeto encontrado.
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {projects.map((project, index) => {
                    const videoId = project.youtubeUrl ? getYouTubeVideoId(project.youtubeUrl) : null
                    const isVideoVisible = visibleVideos.has(project.id)
                    
                    return (
                      <motion.div
                        key={project.id}
                        data-project-id={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
                      >
                        <Link href={`/projects/${project.slug}`} className="block">
                          {/* Project Media */}
                          <div className="relative overflow-hidden">
                            {project.youtubeUrl && videoId ? (
                              <div className="relative w-full h-48">
                                <iframe
                                  src={`https://www.youtube.com/embed/${videoId}?autoplay=${isVideoVisible ? 1 : 0}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${videoId}`}
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
                                  className="w-2 h-2 rounded-full bg-primary-500"
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
                          <div className="flex flex-wrap gap-2">
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
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Load More Button */}
                {currentPage < pages && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Carregando...</span>
                        </>
                      ) : (
                        <>
                          <span>Carregar Mais</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
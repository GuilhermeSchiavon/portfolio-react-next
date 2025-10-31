'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProjects } from '@/store/slices/projectSlice'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function ProjectsListView() {
  const { t, i18n } = useTranslation('home')
  const dispatch = useAppDispatch()
  const { projects, loading, error, pageNumber, pages } = useAppSelector((state) => state.project)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set())
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  


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
                    const isVideoVisible = activeVideo === project.id
                    const isFirstCard = index === 0
                    
                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        isVideoVisible={isVideoVisible}
                        isFirstCard={isFirstCard && !activeVideo}
                        showAnimation={true}
                        animationDelay={index * 0.1}
                        onMouseEnter={() => project.youtubeUrl && setActiveVideo(project.id)}
                        onMouseLeave={() => setActiveVideo(null)}
                      />
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
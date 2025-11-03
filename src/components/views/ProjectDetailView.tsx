'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MediaFullscreen } from '@/components/ui/MediaFullscreen'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProjectUpdates } from '@/store/slices/projectSlice'
import { groupTechnologiesByType, getTechTypeColor, getTechTypeLabel } from '@/utils/technologyUtils'

interface ProjectDetailViewProps {
  project: any
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { t, i18n } = useTranslation('home')
  const dispatch = useAppDispatch()
  const { projectUpdates, loading } = useAppSelector((state) => state.project)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Combinar YouTube e imagens em um array único
  const allMedia = [
    ...(project.youtubeUrl ? [{ type: 'youtube', url: project.youtubeUrl, id: 'youtube' }] : []),
    ...(project.Images || []).map((img: any) => ({ ...img, type: 'image' }))
  ]

  useEffect(() => {
    if (project?.slug) {
      dispatch(fetchProjectUpdates({ 
        slug: project.slug, 
        language: i18n.language 
      }))
    }
  }, [dispatch, project?.slug, i18n.language])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allMedia.length > 1) {
        if (e.key === 'ArrowLeft') {
          setSelectedImageIndex(prev => prev === 0 ? allMedia.length - 1 : prev - 1)
        } else if (e.key === 'ArrowRight') {
          setSelectedImageIndex(prev => prev === allMedia.length - 1 ? 0 : prev + 1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [allMedia])

  const nextImage = () => {
    if (allMedia.length > 1) {
      setSelectedImageIndex(prev => prev === allMedia.length - 1 ? 0 : prev + 1)
    }
  }

  const prevImage = () => {
    if (allMedia.length > 1) {
      setSelectedImageIndex(prev => prev === 0 ? allMedia.length - 1 : prev - 1)
    }
  }

  const checkScrollButtons = () => {
    const container = document.getElementById('thumbnail-container')
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  useEffect(() => {
    const container = document.getElementById('thumbnail-container')
    if (container) {
      checkScrollButtons()
      container.addEventListener('scroll', checkScrollButtons)
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [allMedia])



  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section - Compacto */}
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 relative py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Raleway] font-bold text-neutral-900 dark:text-white">
                  {project.title}
                </h1>
                {/* Project Stats */}
                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                  {project.implementations && (
                    <div className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-white/80 dark:bg-neutral-800/80 rounded-full">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{project.implementations} {t('projectDetail.implementations')}</span>
                    </div>
                  )}
                  {project.Technologies && project.Technologies.length > 0 && (
                    <a href="#tecnologias" className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-white/80 dark:bg-neutral-800/80 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span className="text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{project.Technologies.length} {t('projectDetail.technologies')}</span>
                    </a>
                  )}
                </div>
              </div>
              
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                {project.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg text-primary-600 font-[Raleway] dark:text-primary-400 font-semibold">
                    {project.subtitle}
                  </p>
                )}
                {project.link && (
                  <div className="flex-shrink-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm"
                    >
                      <span>{t('projectDetail.viewExample')}</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              
            </motion.div>
          </div>
        </section>
        {/* Project Details with Sidebar */}
        <section className="py-8 sm:py-12 lg:py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">

              {/* Sidebar - Sumário à esquerda - Apenas desktop */}
              <div className="hidden xl:block xl:w-80 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-24"
                >
                  <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">{t('projectDetail.summary')}</h3>
                    <nav className="space-y-3">
                      <a href="#sobre" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">{t('projectDetail.aboutProject')}</a>
                      {project.Features && project.Features.length > 0 && (
                        <a href="#funcionalidades" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">{t('projectDetail.features')}</a>
                      )}
                      {project.Technologies && project.Technologies.length > 0 && (
                        <a href="#tecnologias" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">{t('projectDetail.technologies')}</a>
                      )}
                      <a href="#atualizacoes" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">{t('projectDetail.updates')}</a>
                    </nav>
                    
                    {projectUpdates && projectUpdates.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">{t('projectDetail.latestUpdates')}</h4>
                        <div className="space-y-3">
                          {projectUpdates.slice(0, 3).map((update: any) => (
                            <div key={update.id} className="text-sm">
                              <p className="text-neutral-900 dark:text-white font-medium truncate">{update.title}</p>
                              <p className="text-neutral-500 dark:text-neutral-400 text-xs">{new Date(update.createdAt).toLocaleDateString('pt-BR')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="p-4 sm:p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-12 sm:space-y-16">
                {/* Project Media Gallery */}
                {(project.youtubeUrl || (project.Images && project.Images.length > 0)) && (
                  <section className="mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {/* Main Media */}
                      <div className="pb-4 sm:pb-6 lg:pb-8">
                        {allMedia.length > 0 && (
                          <div className="relative">
                            {allMedia[selectedImageIndex].type === 'youtube' ? (
                              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-xl">
                                <iframe
                                  src={`https://www.youtube.com/embed/${allMedia[selectedImageIndex].url.includes('watch?v=') ? allMedia[selectedImageIndex].url.split('watch?v=')[1].split('&')[0] : allMedia[selectedImageIndex].url.split('/').pop()}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                                  className="w-full h-full"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={`${project.title} - ${t('projectDetail.videoPresentation')}`}
                                />
                              </div>
                            ) : allMedia[selectedImageIndex].mediaType === 'video' ? (
                              <video
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${allMedia[selectedImageIndex].filename}`}
                                controls
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-[450px] object-cover rounded-lg shadow-xl"
                              />
                            ) : (
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${allMedia[selectedImageIndex].filename}`}
                                alt={allMedia[selectedImageIndex].alt || project.title}
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-[450px] object-cover rounded-lg shadow-xl cursor-pointer"
                                onClick={() => setIsFullscreenOpen(true)}
                              />
                            )}
                            
                            {/* Navigation Buttons */}
                            {allMedia.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 items-center justify-center"
                                >
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 items-center justify-center"
                                >
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                
                                {/* Media Counter */}
                                <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 px-2 lg:px-3 py-1 bg-black/60 text-white text-xs lg:text-sm rounded-full backdrop-blur-sm">
                                  {selectedImageIndex + 1} / {allMedia.length}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Media Thumbnails - Carrossel Horizontal */}
                      {allMedia.length > 1 && (
                        <div className="relative group">
                          {/* Botões de navegação do carrossel */}
                          {canScrollLeft && (
                            <button
                              onClick={() => {
                                const container = document.getElementById('thumbnail-container')
                                if (container) {
                                  container.scrollBy({ left: -200, behavior: 'smooth' })
                                  setTimeout(checkScrollButtons, 300)
                                }
                              }}
                              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full shadow-lg transition-all duration-200 items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                          )}
                          
                          {canScrollRight && (
                            <button
                              onClick={() => {
                                const container = document.getElementById('thumbnail-container')
                                if (container) {
                                  container.scrollBy({ left: 200, behavior: 'smooth' })
                                  setTimeout(checkScrollButtons, 300)
                                }
                              }}
                              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full shadow-lg transition-all duration-200 items-center justify-center opacity-0 group-hover:opacity-100"
            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}

                          <div 
                            id="thumbnail-container"
                            className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 p-1" 
                            style={{ 
                              scrollbarWidth: 'none', 
                              msOverflowStyle: 'none',
                              WebkitOverflowScrolling: 'touch'
                            }}
                          >
                            {allMedia.map((media: any, index: number) => (
                              <button
                                key={media.id || index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-100 ${
                                  selectedImageIndex === index 
                                    ? 'ring-2 ring-primary-500' 
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                              >
                                {media.type === 'youtube' ? (
                                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 bg-red-600 flex items-center justify-center">
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                  </div>
                                ) : media.mediaType === 'video' ? (
                                  <div className="relative">
                                    <video
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                                      className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 object-cover"
                                      muted
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                                    alt={media.alt || project.title}
                                    className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 object-cover"
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                          
                          {/* CSS para esconder scrollbar */}
                          <style jsx>{`
                            #thumbnail-container::-webkit-scrollbar {
                              display: none;
                            }
                          `}</style>
                        </div>
                      )}
                    </motion.div>
                  </section>
                )}

                {/* About Section */}
                <div id="sobre">
                  <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-8">
                    {t('projectDetail.aboutProject')}
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>{project.description}</p>
                  </div>
                </div>

                {/* Features Section */}
                {project.Features && project.Features.length > 0 && (
                  <div id="funcionalidades">
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-6">
                      {t('projectDetail.features')}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {project.Features.map((feature: any) => (
                        <div 
                          key={feature.id}
                          className="px-4 py-2 sm:p-6 bg-neutral-50 dark:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-600"
                        >
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {feature.name}
                          </h4>
                          {/* <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {feature.description}
                          </p> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Updates Section */}
                {projectUpdates && projectUpdates.length > 0 && (
                  <div id="atualizacoes">
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                      {t('projectDetail.projectUpdates')}
                    </h3>
                      <div className="space-y-6">
                        {projectUpdates.map((update: any) => (
                          <div 
                            key={update.id}
                            className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                {update.title}
                              </h4>
                              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {new Date(update.createdAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              {update.description}
                            </p>
                          </div>
                        ))}
                      </div>
                  </div>
                )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="lg:w-80 flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="space-y-6 lg:space-y-8"
                    >
                      {/* Technologies */}
                      {project.Technologies && project.Technologies.length > 0 && (
                        <div id="tecnologias" className="p-4 sm:p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-6 capitalize">
                            {t('projectDetail.technologies')}
                          </h3>
                          {(() => {
                            const groupedTechs = groupTechnologiesByType(project.Technologies)
                            return (
                              <div className="space-y-4">
                                {Object.entries(groupedTechs).map(([type, techs]) => (
                                  <div key={type}>
                                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                      {getTechTypeLabel(type)}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {techs.map((tech: any) => (
                                        <span
                                          key={tech.id}
                                          className={`px-2 sm:px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${getTechTypeColor(tech.type)}`}
                                        >
                                          {tech.name}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          })()}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <MediaFullscreen
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        media={allMedia}
        currentIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
        projectTitle={project.title}
      />
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProjectUpdates } from '@/store/slices/projectSlice'

interface ProjectDetailViewProps {
  project: any
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { t, i18n } = useTranslation('home')
  const dispatch = useAppDispatch()
  const { projectUpdates, loading } = useAppSelector((state) => state.project)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section - 80% da tela */}
        <section className="flex items-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 relative">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Raleway] font-bold text-neutral-900 dark:text-white mb-6">
                  {project.title}
                </h1>
                
                {project.subtitle && (
                  <p className="text-xl text-primary-600 font-[Raleway] dark:text-primary-400 font-semibold">
                    {project.subtitle}
                  </p>
                )}
                
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-4 mt-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span>Ver Exemplo</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Media Gallery */}
        {(project.youtubeUrl || (project.Images && project.Images.length > 0)) && (
          <section className="py-6 lg:py-10">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Main Media */}
                  <div className="mb-6 lg:mb-8">
                    {allMedia.length > 0 && (
                      <div className="relative">
                        {allMedia[selectedImageIndex].type === 'youtube' ? (
                          <div className="relative w-full h-64 md:h-80 lg:h-[450px] rounded overflow-hidden shadow-xl">
                            <iframe
                              src={`https://www.youtube.com/embed/${allMedia[selectedImageIndex].url.includes('watch?v=') ? allMedia[selectedImageIndex].url.split('watch?v=')[1].split('&')[0] : allMedia[selectedImageIndex].url.split('/').pop()}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={`${project.title} - Vídeo de Apresentação`}
                            />
                          </div>
                        ) : allMedia[selectedImageIndex].mediaType === 'video' ? (
                          <video
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${allMedia[selectedImageIndex].filename}`}
                            controls
                            className="w-full h-64 md:h-80 lg:h-[450px] object-cover rounded shadow-xl"
                          />
                        ) : (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${allMedia[selectedImageIndex].filename}`}
                            alt={allMedia[selectedImageIndex].alt || project.title}
                            className="w-full h-64 md:h-80 lg:h-[450px] object-cover rounded shadow-xl"
                          />
                        )}
                        
                        {/* Navigation Buttons */}
                        {allMedia.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 items-center justify-center"
                            >
                              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={nextImage}
                              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 items-center justify-center"
                            >
                              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                            
                            {/* Media Counter */}
                            <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 px-2 lg:px-3 py-1 bg-black/60 text-white text-xs lg:text-sm rounded-full backdrop-blur-sm">
                              {selectedImageIndex + 1} / {allMedia.length}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Media Thumbnails */}
                  {allMedia.length > 1 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4">
                      {allMedia.map((media: any, index: number) => (
                        <button
                          key={media.id || index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative overflow-hidden rounded transition-all duration-300 ${
                            selectedImageIndex === index 
                              ? 'ring-2 lg:ring-4 ring-primary-500 scale-105' 
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                        >
                          {media.type === 'youtube' ? (
                            <div className="relative w-full h-12 md:h-16 lg:h-20 bg-red-600 flex items-center justify-center">
                              <svg className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                            </div>
                          ) : media.mediaType === 'video' ? (
                            <div className="relative">
                              <video
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                                className="w-full h-12 md:h-16 lg:h-20 object-cover"
                                muted
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                              alt={media.alt || project.title}
                              className="w-full h-12 md:h-16 lg:h-20 object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Project Details with Sidebar */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid xl:grid-cols-5 gap-12">
                {/* Sidebar - Sumário à esquerda - Apenas desktop */}
                <div className="hidden xl:block xl:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="sticky top-24"
                  >
                    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">Sumário</h3>
                      <nav className="space-y-3">
                        <a href="#sobre" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">Sobre o Projeto</a>
                        {project.Features && project.Features.length > 0 && (
                          <a href="#funcionalidades" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">Funcionalidades</a>
                        )}
                        {project.Technologies && project.Technologies.length > 0 && (
                          <a href="#tecnologias" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">Tecnologias</a>
                        )}
                        <a href="#atualizacoes" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">Atualizações</a>
                      </nav>
                      
                      {projectUpdates && projectUpdates.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Últimas Atualizações</h4>
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
                <div className="xl:col-span-4">
                  <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-2 xl:col-span-2">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-16"
                      >
                        {/* About Section */}
                        <div id="sobre">
                          <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-8">
                            Sobre o Projeto
                          </h2>
                          <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p>{project.description}</p>
                          </div>
                        </div>

                        {/* Features Section */}
                        {project.Features && project.Features.length > 0 && (
                          <div id="funcionalidades">
                            <h3 className="text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                              Funcionalidades
                            </h3>
                            <div className="grid xl:grid-cols-2 gap-6">
                              {project.Features.map((feature: any) => (
                                <div 
                                  key={feature.id}
                                  className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700"
                                >
                                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                                    {feature.name}
                                  </h4>
                                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {feature.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Updates Section */}
                        {projectUpdates && projectUpdates.length > 0 && (
                          <div id="atualizacoes">
                            <h3 className="text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                              Atualizações do Projeto
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

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                      >
                        {/* Technologies */}
                        {project.Technologies && project.Technologies.length > 0 && (
                          <div id="tecnologias" className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                              Tecnologias
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {project.Technologies.map((tech: any) => (
                                <span
                                  key={tech.id}
                                  className={`px-3 py-2 text-sm font-medium text-white rounded-full ${getTechColor(tech.name)}`}
                                >
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Project Stats */}
                        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Estatísticas
                          </h3>
                          <div className="space-y-4">
                            {project.implementations && (
                              <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Implementações</span>
                                <span className="font-semibold text-neutral-900 dark:text-white">
                                  {project.implementations}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-neutral-600 dark:text-neutral-400">Tecnologias</span>
                              <span className="font-semibold text-neutral-900 dark:text-white">
                                {project.Technologies?.length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600 dark:text-neutral-400">Imagens</span>
                              <span className="font-semibold text-neutral-900 dark:text-white">
                                {project.Images?.length || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
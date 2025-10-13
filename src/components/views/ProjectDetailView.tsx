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

  useEffect(() => {
    if (project?.slug) {
      dispatch(fetchProjectUpdates({ 
        slug: project.slug, 
        language: i18n.language 
      }))
    }
  }, [dispatch, project?.slug, i18n.language])

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
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  href="/"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar ao Portfolio
                </Link>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                  {project.title}
                </h1>
                
                {project.subtitle && (
                  <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
                    {project.subtitle}
                  </p>
                )}
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  {project.description}
                </p>
                
                {project.link && (
                  <div className="mt-8">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Ver Projeto</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Media Gallery */}
        {project.Images && project.Images.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Main Media */}
                  <div className="mb-8">
                    {project.Images[selectedImageIndex].mediaType === 'video' ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${project.Images[selectedImageIndex].filename}`}
                        controls
                        className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                        poster={project.Images.find((img: any) => img.mediaType === 'image')?.filename ? 
                          `${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${project.Images.find((img: any) => img.mediaType === 'image')?.filename}` : 
                          undefined
                        }
                      />
                    ) : (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${project.Images[selectedImageIndex].filename}`}
                        alt={project.Images[selectedImageIndex].alt || project.title}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                      />
                    )}
                  </div>
                  
                  {/* Media Thumbnails */}
                  {project.Images.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {project.Images.map((media: any, index: number) => (
                        <button
                          key={media.id}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                            selectedImageIndex === index 
                              ? 'ring-4 ring-primary-500 scale-105' 
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                        >
                          {media.mediaType === 'video' ? (
                            <div className="relative">
                              <video
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                                className="w-full h-20 object-cover"
                                muted
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${media.filename}`}
                              alt={media.alt || project.title}
                              className="w-full h-20 object-cover"
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

        {/* Project Details */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-8">
                      Sobre o Projeto
                    </h2>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p>{project.description}</p>
                    </div>

                    {/* Features */}
                    {project.Features && project.Features.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-2xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
                          Funcionalidades
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
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
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Technologies */}
                    {project.Technologies && project.Technologies.length > 0 && (
                      <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
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
        </section>

        {/* Project Updates */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white text-center mb-12">
                  Atualizações do Projeto
                </h2>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
                      <span className="text-neutral-600 dark:text-neutral-400">Carregando atualizações...</span>
                    </div>
                  </div>
                ) : projectUpdates && projectUpdates.length > 0 ? (
                  <div className="space-y-8">
                    {projectUpdates.map((update: any, index: number) => (
                      <div 
                        key={update.id}
                        className="relative pl-8 pb-8 border-l-2 border-primary-200 dark:border-primary-800 last:border-l-0 last:pb-0"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {update.title}
                            </h3>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                              {new Date(update.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {update.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Nenhuma atualização disponível para este projeto.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
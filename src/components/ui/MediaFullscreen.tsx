'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MediaFullscreenProps {
  isOpen: boolean
  onClose: () => void
  media: any[]
  currentIndex: number
  onIndexChange: (index: number) => void
  projectTitle: string
}

export function MediaFullscreen({ 
  isOpen, 
  onClose, 
  media, 
  currentIndex, 
  onIndexChange, 
  projectTitle 
}: MediaFullscreenProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onIndexChange(currentIndex - 1)
      } else if (e.key === 'ArrowRight' && currentIndex < media.length - 1) {
        onIndexChange(currentIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, media.length, onClose, onIndexChange])

  if (!isOpen) return null

  const currentMedia = media[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {media.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={() => onIndexChange(currentIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {currentIndex < media.length - 1 && (
                <button
                  onClick={() => onIndexChange(currentIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </>
          )}

          {/* Media Content */}
          <div className="w-full h-full flex items-center justify-center">
            {currentMedia.type === 'youtube' ? (
              <div className="relative w-full max-w-6xl aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${currentMedia.url.includes('watch?v=') ? currentMedia.url.split('watch?v=')[1].split('&')[0] : currentMedia.url.split('/').pop()}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${projectTitle} - Vídeo de Apresentação`}
                />
              </div>
            ) : currentMedia.mediaType === 'video' ? (
              <video
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${currentMedia.filename}`}
                controls
                className="max-w-full max-h-full object-contain rounded-lg"
                autoPlay
              />
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${currentMedia.filename}`}
                alt={currentMedia.alt || projectTitle}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>

          {/* Counter */}
          {media.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {media.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
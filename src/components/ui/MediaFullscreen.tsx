'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectMediaUrl, youTubeId } from '@/lib/media'
import { ChevronLeft, ChevronRight, Close } from '@/components/ui/Icons'

export interface MediaItem {
  id: number | string
  type: 'youtube' | 'image'
  url?: string
  filename?: string
  alt?: string | null
  mediaType?: 'image' | 'video'
}

interface MediaFullscreenProps {
  isOpen: boolean
  onClose: () => void
  media: MediaItem[]
  currentIndex: number
  onIndexChange: (index: number) => void
  projectTitle: string
  labels: { close: string; previous: string; next: string }
}

export function MediaFullscreen({ isOpen, onClose, media, currentIndex, onIndexChange, projectTitle, labels }: MediaFullscreenProps) {
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft' && currentIndex > 0) onIndexChange(currentIndex - 1)
      else if (event.key === 'ArrowRight' && currentIndex < media.length - 1) onIndexChange(currentIndex + 1)
    }

    // Trava a rolagem da página enquanto o visualizador está aberto.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, currentIndex, media.length, onClose, onIndexChange])

  const current = media[currentIndex]
  const videoId = current?.type === 'youtube' ? youTubeId(current.url) : null

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={projectTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <div className="relative flex h-full w-full max-w-7xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <Close className="h-6 w-6" />
            </button>

            {currentIndex > 0 && (
              <button
                type="button"
                onClick={() => onIndexChange(currentIndex - 1)}
                aria-label={labels.previous}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {currentIndex < media.length - 1 && (
              <button
                type="button"
                onClick={() => onIndexChange(currentIndex + 1)}
                aria-label={labels.next}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {videoId ? (
              <div className="aspect-video w-full max-w-6xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  className="h-full w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={projectTitle}
                />
              </div>
            ) : current.mediaType === 'video' && current.filename ? (
              <video src={projectMediaUrl(current.filename)} controls autoPlay className="max-h-full max-w-full rounded-lg object-contain" />
            ) : current.filename ? (
              // Tela cheia mostra o arquivo original, sem recompressão.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={projectMediaUrl(current.filename)}
                alt={current.alt || projectTitle}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            ) : null}

            {media.length > 1 && (
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm text-white">
                {currentIndex + 1} / {media.length}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

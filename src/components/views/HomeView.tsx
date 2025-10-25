'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { Footer } from '@/components/layout/Footer'

export function HomeView() {
  const [loading, setLoading] = useState(false)
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0)
  
  const welcomeTexts = [
    "Welcome",
    "Bem-vindo",
    "Bienvenue", 
    "Willkommen",
    "Bienvenido",
    "欢迎",
    "ようこそ"
  ]

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    
    if (!hasSeenWelcome) {
      setLoading(true)
      
      const initializeApp = async () => {
        // Start welcome text animation
        const welcomeInterval = setInterval(() => {
          setCurrentWelcomeIndex((prev) => (prev + 1) % welcomeTexts.length)
        }, 200)

        try {
          // Minimum loading time for better UX
          await new Promise(resolve => setTimeout(resolve, 2500))
          
        } catch (error) {
          console.error('Error initializing app:', error)
        } finally {
          clearInterval(welcomeInterval)
          sessionStorage.setItem('hasSeenWelcome', 'true')
          setTimeout(() => {
            setLoading(false)
          }, 300)
        }
      }

      initializeApp()
    }
  }, [welcomeTexts.length])

  return (
    <div className="relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
          >
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <motion.h2 
                  key={currentWelcomeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-display font-semibold text-white"
                >
                  {welcomeTexts[currentWelcomeIndex]}
                </motion.h2>
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    scaleX: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative">
        <Header />
        
        <main>
          <HeroSection />
          
          <AboutSection />
          <ProjectsSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}
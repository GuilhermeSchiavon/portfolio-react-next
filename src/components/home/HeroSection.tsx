'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

export function HeroSection() {
  const { t } = useTranslation('home')
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current) return

    const tl = gsap.timeline({ delay: 0.5 })

    // Animate title
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    )

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    )

    // Floating animation for the hero section
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-200 via-white dark:bg-neutral-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={heroRef}
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight"
          >
            <span className="block">Guilherme</span>
            <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Schiavon
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 mb-8 font-medium"
          >
            <span className="block md:inline">{t('heroComponent.scientist')}</span>
            <span className="mx-2 hidden md:inline">•</span>
            <span className="block md:inline text-primary-600 dark:text-primary-400 font-semibold">
              {t('heroComponent.full')}
            </span>
          </p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="#about"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('heroComponent.btn_about')}
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('heroComponent.btn_contact')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
       {/* Scroll Indicator */}
       <motion.div 
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-neutral-400 dark:text-neutral-500"
            >
              <span className="text-sm mb-2">Scroll</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
    </section>
  )
}
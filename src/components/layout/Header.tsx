'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store'
import { toggleDarkMode } from '@/store/slices/helpersSlice'
import { setLanguage } from '@/store/slices/languageSlice'
import { LanguageSelector } from '@/components/ui/LanguageSelector'

export function Header() {
  const { t } = useTranslation('global')
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.helpers.darkMode)
  const language = useAppSelector((state) => state.language.language)
  const languages = useAppSelector((state) => state.language.languages)
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: t('navItens.0.name'), url: t('navItens.0.url') },
    { name: t('navItens.1.name'), url: t('navItens.1.url') },
    { name: t('navItens.2.name'), url: t('navItens.2.url') },
    { name: t('navItens.3.name'), url: t('navItens.3.url') }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode())
  }

  const handleLanguageChange = (newLanguage: any) => {
    dispatch(setLanguage(newLanguage))
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              GS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="nav-link relative px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={handleThemeToggle}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <LanguageSelector 
              selectedLanguage={language}
              languages={languages}
              onLanguageChange={handleLanguageChange}
            />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {!isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #0ea5e9);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { LocaleLink as Link } from '@/components/ui/LocaleLink'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Close, Menu } from '@/components/ui/Icons'
import { splitLocalePath } from '@/lib/locale'

const links = [
  { key: 'about', href: '/#about' },
  { key: 'work', href: '/#work' },
  { key: 'experience', href: '/#experience' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '#contact' },
] as const

export function Header() {
  const { t } = useTranslation('global')
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    const onResize = () => window.innerWidth >= 1024 && setIsMenuOpen(false)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Sobre o hero (topo da home) o cabeçalho fica transparente com texto branco.
  const overHero = splitLocalePath(pathname).path === '/' && !isScrolled && !isMenuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero
          ? 'bg-transparent text-white'
          : 'border-b border-neutral-200/70 bg-white/85 text-neutral-900 backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/85 dark:text-neutral-100'
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t('nav.skipToContent')}
      </a>

      <nav className="container flex h-16 items-center justify-between lg:h-20">
        <Link href="/" aria-label={`Guilherme Schiavon, ${t('nav.home')}`} className="font-raleway text-2xl font-bold tracking-wide">
          GS
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
              >
                {t(`nav.${link.key}`)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-neutral-200 dark:border-neutral-800 lg:hidden"
          >
            <ul className="container space-y-1 py-4">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

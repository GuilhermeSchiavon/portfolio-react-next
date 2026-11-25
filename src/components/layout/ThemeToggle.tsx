'use client'

import { useTranslation } from 'react-i18next'
import { THEME_COOKIE } from '@/lib/locale'
import { Moon, Sun } from '@/components/ui/Icons'

// O tema vive na classe "dark" do <html> e num cookie (lido pelo servidor no
// próximo acesso). O ícone troca por CSS, sem estado: nada para hidratar errado.
export function ThemeToggle() {
  const { t } = useTranslation('global')

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    document.cookie = `${THEME_COOKIE}=${isDark ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
      className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      <Moon className="h-5 w-5 dark:hidden" />
      <Sun className="hidden h-5 w-5 dark:block" />
    </button>
  )
}

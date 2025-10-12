'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector((state) => state.helpers.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return <>{children}</>
}
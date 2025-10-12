'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { I18nProvider } from '@/components/providers/I18nProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </I18nProvider>
    </Provider>
  )
}
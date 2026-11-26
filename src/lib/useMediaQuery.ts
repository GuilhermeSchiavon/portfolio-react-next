'use client'

import { useCallback, useSyncExternalStore } from 'react'

// No servidor (e durante a hidratação) responde "false": o HTML sai na versão
// de celular e o CSS cuida do resto, sem diferença entre servidor e navegador.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

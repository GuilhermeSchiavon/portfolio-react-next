'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

// Entrada suave quando o bloco aparece na tela (uma vez só).
// O bloco sai VISÍVEL no HTML: buscadores, leitores sem JavaScript e uma
// eventual falha de carregamento veem o conteúdo inteiro. Só depois que o
// JavaScript roda é que os blocos ainda abaixo da tela são escondidos, para
// entrarem quando o visitante chegar neles. (Antes o HTML já saía com
// opacity: 0 em tudo e dependia do JavaScript para aparecer.)
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = as as 'div'
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle')

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Já está na tela (ou acima dela): fica como está, sem piscar.
    if (element.getBoundingClientRect().top < window.innerHeight) return

    setState('out')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setState('in')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={state === 'idle' ? undefined : state}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

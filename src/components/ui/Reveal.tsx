'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

// Entrada suave quando o bloco aparece na tela (uma vez só).
// Substitui as timelines de GSAP + ScrollTrigger que cada seção tinha.
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

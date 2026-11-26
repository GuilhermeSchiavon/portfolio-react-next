'use client'

import { Children, useEffect, useRef, useState } from 'react'

interface SwipeRowProps {
  children: React.ReactNode
  // Colunas da grade a partir de 640 px, ex.: "sm:grid-cols-2".
  className?: string
}

// No celular os cartões ficam lado a lado e o visitante passa com o dedo; o
// próximo aparece cortado na borda, como convite. A partir de 640 px vira a
// grade normal. Cada filho é um <li> com "w-[80%] shrink-0 snap-start sm:w-auto".
export function SwipeRow({ children, className = '' }: SwipeRowProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const count = Children.count(children)

  useEffect(() => {
    const list = ref.current
    if (!list) return
    let frame = 0

    const update = () => {
      frame = 0
      const items = Array.from(list.children) as HTMLElement[]
      // No fim da rolagem o último cartão não chega a encostar na esquerda.
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 4) {
        setActive(items.length - 1)
        return
      }
      const start = list.getBoundingClientRect().left + parseFloat(getComputedStyle(list).paddingLeft)
      let nearest = 0
      let smallest = Infinity
      items.forEach((item, index) => {
        const distance = Math.abs(item.getBoundingClientRect().left - start)
        if (distance < smallest) {
          smallest = distance
          nearest = index
        }
      })
      setActive(nearest)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    list.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      list.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div>
      <ul
        ref={ref}
        className={`no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:gap-4 sm:overflow-visible sm:px-0 ${className}`}
      >
        {children}
      </ul>

      {count > 1 && (
        <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5 sm:hidden">
          {Array.from({ length: count }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? 'w-5 bg-primary-500' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

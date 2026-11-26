interface CollapseProps {
  id?: string
  open: boolean
  children: React.ReactNode
  className?: string
  // A partir deste tamanho de tela o conteúdo fica sempre aberto.
  openFrom?: 'sm' | 'lg'
}

// Classes escritas por extenso: o Tailwind só gera o que encontra no código.
const pinned = {
  sm: { outer: 'sm:grid-rows-[1fr]', inner: 'sm:visible sm:overflow-visible' },
  lg: { outer: 'lg:grid-rows-[1fr]', inner: 'lg:visible lg:overflow-visible' },
}

// Abre e fecha com animação de altura, só com CSS. Fechado, o conteúdo
// continua no HTML (os buscadores leem tudo); só não aparece nem recebe foco.
export function Collapse({ id, open, children, className = '', openFrom }: CollapseProps) {
  const pin = openFrom ? pinned[openFrom] : { outer: '', inner: '' }

  return (
    <div
      id={id}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${pin.outer} ${className}`}
    >
      <div className={`min-h-0 overflow-hidden transition-[visibility] duration-300 ${open ? 'visible' : 'invisible'} ${pin.inner}`}>
        {children}
      </div>
    </div>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, description, align = 'left', as: Tag = 'h2' }: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="section-title mt-3">{title}</Tag>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
      )}
    </div>
  )
}

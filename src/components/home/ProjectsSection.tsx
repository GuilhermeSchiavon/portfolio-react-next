'use client'

import { LocaleLink as Link } from '@/components/ui/LocaleLink'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ArrowRight } from '@/components/ui/Icons'
import type { Project } from '@/types/project'

// Os projetos chegam prontos do servidor (app/page.tsx). Antes eram buscados
// no navegador e a seção ficava em "Carregando projetos..." no HTML inicial.
export function ProjectsSection({ projects }: { projects: Project[] }) {
  const { t } = useTranslation('home')

  return (
    <section id="projects" className="bg-white py-20 dark:bg-neutral-950 lg:py-28">
      <div className="container">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('projectsSection.eyebrow')}
            title={t('projectsSection.title')}
            description={t('projectsSection.subtitle')}
          />
          <Link href="/projects" className="btn-ghost shrink-0 self-start sm:self-auto">
            {t('projectsSection.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {projects.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal as="li" key={project.id} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-neutral-600 dark:text-neutral-400">{t('projectsSection.unavailable')}</p>
        )}
      </div>
    </section>
  )
}

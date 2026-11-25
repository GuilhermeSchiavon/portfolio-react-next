import { PageShell } from '@/components/layout/PageShell'
import { HeroSection } from '@/components/home/HeroSection'
import { ProofBar } from '@/components/home/ProofBar'
import { AboutSection } from '@/components/home/AboutSection'
import { HowIWorkSection } from '@/components/home/HowIWorkSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { StackSection } from '@/components/home/StackSection'
import { EventsSection } from '@/components/home/EventsSection'
import type { Project } from '@/types/project'

interface HomeViewProps {
  featuredProjects: Project[]
  projectCount: number
}

export function HomeView({ featuredProjects, projectCount }: HomeViewProps) {
  return (
    <PageShell padded={false}>
      <HeroSection />
      <ProofBar projectCount={projectCount} />
      <AboutSection />
      <HowIWorkSection />
      <ExperienceSection />
      <ProjectsSection projects={featuredProjects} />
      <StackSection />
      <EventsSection />
    </PageShell>
  )
}

'use client'

import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { Footer } from '@/components/layout/Footer'

export function HomeView() {
  return (
    <div className="relative">
      <Header />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  )
}
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailView } from '@/components/views/ProjectDetailView'
import { generateProjectSEO } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'

async function getProject(slug: string, language: string = 'pt') {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/project/slug/${slug}?language=${language}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.item
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Projeto não encontrado',
      description: 'O projeto solicitado não foi encontrado.'
    }
  }
  
  return generateProjectSEO(project)
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }
  
  return (
    <>
      <StructuredData type="project" data={project} />
      <ProjectDetailView project={project} />
    </>
  )
}
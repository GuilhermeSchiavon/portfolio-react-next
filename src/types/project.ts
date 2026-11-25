export type TechnologyType = 'frontend' | 'backend' | 'architecture' | 'devops'

export interface Technology {
  id: number
  name: string
  svg?: string | null
  description?: string | null
  type?: TechnologyType | string
  status?: 'ativo' | 'inativo'
}

export interface ProjectImage {
  id: number
  filename: string
  alt?: string | null
  mediaType?: 'image' | 'video'
  order?: number | null
}

export interface Feature {
  id: number
  name: string
  description?: string | null
}

export interface Project {
  id: number
  title: string
  subtitle?: string | null
  description: string
  slug: string
  link?: string | null
  youtubeUrl?: string | null
  implementations?: number | null
  status?: string
  Features: Feature[]
  Technologies: Technology[]
  Images: ProjectImage[]
}

export interface ProjectUpdate {
  id: number
  title: string
  description: string
  version?: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectList {
  items: Project[]
  hasMore: boolean
}

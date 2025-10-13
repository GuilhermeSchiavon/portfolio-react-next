import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Technology {
  id: number
  name: string
  icon?: string
}

interface Image {
  id: number
  filename: string
  alt?: string
  mediaType: 'image' | 'video'
  order?: number
}

interface Feature {
  id: number
  name: string
  description: string
}

interface Project {
  id: number
  title: string
  subtitle?: string
  description: string
  slug: string
  link?: string
  youtubeUrl?: string
  implementations?: number
  backgroundImage?: string
  colorPrimary?: string
  colorSecondary?: string
  colorTertiary?: string
  status: string
  Features: Feature[]
  Technologies: Technology[]
  Images: Image[]
}

interface ProjectUpdate {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  projectUpdates: ProjectUpdate[]
  loading: boolean
  error: string | null
  pageNumber: number
  pages: number
  total: number
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  projectUpdates: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pages: 1,
  total: 0
}

// Async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async ({ keyword = '', pageNumber = 1, language = 'pt' }: { keyword?: string; pageNumber?: number; language?: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/project`, {
      params: { keyword, pageNumber, language }
    })
    return response.data
  }
)

export const fetchProjectBySlug = createAsyncThunk(
  'project/fetchProjectBySlug',
  async ({ slug, language = 'pt' }: { slug: string; language?: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/project/slug/${slug}`, {
      params: { language }
    })
    return response.data
  }
)

export const fetchProjectUpdates = createAsyncThunk(
  'project/fetchProjectUpdates',
  async ({ slug, language = 'pt' }: { slug: string; language?: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/project/slug/${slug}/updates`, {
      params: { language }
    })
    return response.data
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        if (action.meta.arg.pageNumber === 1) {
          state.projects = action.payload.items
        } else {
          state.projects = [...state.projects, ...action.payload.items]
        }
        state.pageNumber = action.payload.pageNumber
        state.pages = action.payload.pages
        state.total = action.payload.total
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch projects'
      })
      // Fetch project by slug
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentProject = action.payload.item
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch project'
      })
      // Fetch project updates
      .addCase(fetchProjectUpdates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectUpdates.fulfilled, (state, action) => {
        state.loading = false
        state.projectUpdates = action.payload.items || []
      })
      .addCase(fetchProjectUpdates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch project updates'
      })
  }
})

export const { clearCurrentProject, clearError } = projectSlice.actions
export default projectSlice.reducer
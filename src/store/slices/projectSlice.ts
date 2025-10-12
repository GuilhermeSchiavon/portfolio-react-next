import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Project {
  id: number
  title: string
  description: string
  slug: string
  images: string[]
  technologies: string[]
  category: string
  url?: string
  github?: string
}

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
  error: string | null
  page: number
  pages: number
  total: number
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  total: 0
}

// Async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async ({ keyword = '', page = 1 }: { keyword?: string; page?: number }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/projects`, {
      params: { keyword, page }
    })
    return response.data
  }
)

export const fetchProjectBySlug = createAsyncThunk(
  'project/fetchProjectBySlug',
  async (slug: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/projects/${slug}`)
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
        if (action.meta.arg.page === 1) {
          state.projects = action.payload.projects
        } else {
          state.projects = [...state.projects, ...action.payload.projects]
        }
        state.page = action.payload.page
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
        state.currentProject = action.payload
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch project'
      })
  }
})

export const { clearCurrentProject, clearError } = projectSlice.actions
export default projectSlice.reducer
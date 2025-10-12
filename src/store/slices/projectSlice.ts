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
  link?: string
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

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
  error: string | null
  pageNumber: number
  pages: number
  total: number
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
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

export const fetchProjectById = createAsyncThunk(
  'project/fetchProjectById',
  async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/project/${id}`)
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
      // Fetch project by id
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProject = action.payload.item
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch project'
      })
  }
})

export const { clearCurrentProject, clearError } = projectSlice.actions
export default projectSlice.reducer
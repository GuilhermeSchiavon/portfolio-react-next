import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

// Async thunks
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/auth/login`, credentials)
    return response.data
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/auth/logout`)
    return null
  }
)

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/user/profile`)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch profile'
      })
  }
})

export const { clearError, setUser, clearUser } = userSlice.actions
export default userSlice.reducer
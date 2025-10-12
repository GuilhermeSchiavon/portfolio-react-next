import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Message {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

interface ChatState {
  messages: Message[]
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null
}

// Async thunks
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData: { name: string; email: string; message: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/chat`, messageData)
    return response.data
  }
)

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/chat`)
    return response.data
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false
        state.messages.unshift(action.payload)
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to send message'
      })
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch messages'
      })
  }
})

export const { clearError } = chatSlice.actions
export default chatSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import helpersSlice from './slices/helpersSlice'
import languageSlice from './slices/languageSlice'
import projectSlice from './slices/projectSlice'
import chatSlice from './slices/chatSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    helpers: helpersSlice,
    language: languageSlice,
    project: projectSlice,
    chat: chatSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
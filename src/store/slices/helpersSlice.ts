import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Alert {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface NavItem {
  name: string
  url: string
  svg: string
  sublinks: any[]
}

interface HelpersState {
  isMenuOpen: boolean
  hideScrollBar: boolean
  alerts: Alert[]
  darkMode: boolean
  showModalSearch: boolean
  showModalTerms: boolean
  showModalPrivacy: boolean
  showModalCookies: boolean
  itensNavbar: NavItem[]
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    return saved ? JSON.parse(saved) : false
  }
  return false
}

const initialState: HelpersState = {
  isMenuOpen: false,
  hideScrollBar: false,
  alerts: [],
  darkMode: getInitialDarkMode(),
  showModalSearch: false,
  showModalTerms: false,
  showModalPrivacy: false,
  showModalCookies: false,
  itensNavbar: [
    {
      name: "Home",
      url: "/#home",
      svg: '<svg class="h-5 w-5 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      sublinks: []
    },
    {
      name: "Sobre",
      url: "/#about",
      svg: '<svg class="h-5 w-5 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>',
      sublinks: []
    },
    {
      name: "Projetos",
      url: "/#project",
      svg: '<svg class="h-5 w-5 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>',
      sublinks: []
    },
    {
      name: "Contact",
      url: "#contact",
      svg: '<svg class="h-5 w-5 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>',
      sublinks: []
    }
  ]
}

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.hideScrollBar = action.payload
      state.isMenuOpen = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', JSON.stringify(state.darkMode))
      }
    },
    setAlert: (state, action: PayloadAction<Alert>) => {
      if (action.payload.message !== "Sessão expirada") {
        state.alerts.unshift(action.payload)
        setTimeout(() => {
          state.alerts.pop()
        }, 5000)
      }
    },
    setShowModalSearch: (state, action: PayloadAction<boolean>) => {
      state.showModalSearch = action.payload
    },
    setShowModalTerms: (state, action: PayloadAction<boolean>) => {
      state.showModalTerms = action.payload
    },
    setShowModalPrivacy: (state, action: PayloadAction<boolean>) => {
      state.showModalPrivacy = action.payload
    },
    setShowModalCookies: (state, action: PayloadAction<boolean>) => {
      state.showModalCookies = action.payload
    }
  }
})

export const {
  toggleMenu,
  toggleDarkMode,
  setAlert,
  setShowModalSearch,
  setShowModalTerms,
  setShowModalPrivacy,
  setShowModalCookies
} = helpersSlice.actions

export default helpersSlice.reducer
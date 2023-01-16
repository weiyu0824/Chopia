import create from 'zustand'

export type AuthState = {
  isLoggedIn: boolean
}

export type AuthAction = {
  setLogin: () => void
  setLogout: () => void
}

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  isLoggedIn: false,

  setLogin: () => {
    set(() => ({ 
      isLoggedIn: true 
    }))
  },
  setLogout: () => {
    set(() => ({
      isLoggedIn: false
    }))
  },
}))

import create from 'zustand'

export type AuthState = {
  isLoggedIn: boolean
  loading: boolean
}

export type AuthAction = {
  startAuth: () => void
  endAuth: () => void
  successAuth: () => void
  leaveAuth: () => void
}

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  isLoggedIn: false,
  loading: false,

  startAuth: () => {
    set(() => ({ 
      loading: true 
    }))
  },
  endAuth: () => {
    set(() => ({
      loading: false
    }))
  },
  successAuth: (
  ) => {
    set(() => ({ 
        isLoggedIn: true, 
        loading: false
    }))
  },
  leaveAuth: () => {
    set(() => ({ 
      isLoggedIn: false, 
      loading: false
    }))
  },
}))

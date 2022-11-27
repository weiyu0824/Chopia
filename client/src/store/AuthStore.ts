import create from 'zustand'

export type AuthState = {
  isLoggedIn: boolean
  loading: boolean
  username: string
}

export type AuthAction = {
  startAuth: () => void
  endAuth: () => void
  successAuth: (username: string) => void
  leaveAuth: () => void
}

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  isLoggedIn: false,
  loading: false,
  username: '',
  startAuth: () => {
    set(
      () => (
        { loading: true }
      )
    )
  },
  endAuth: () => {
    set(
      () => (
        {loading: false}
      )
    )
  },
  successAuth: (username: string) => {
    set(
      () => (
        { isLoggedIn: true, loading: false, username: username }
      )
    )
  },
  leaveAuth: () => {
    set(
      () => (
        { isLoggedIn: false, loading: false, username: '' }
      )
    )
  }
}))

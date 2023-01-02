import create from 'zustand'

interface friendInfo {
  userId: string,
  name: string,
  username: string,
  avatar: string,
}

export type AuthState = {
  isLoggedIn: boolean
  loading: boolean
  userId: string
  email: string
  name: string
  username: string
  avatar: string
  friendInfos: friendInfo[]
}

export type AuthAction = {
  startAuth: () => void
  endAuth: () => void
  successAuth: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfos: friendInfo[]
  ) => void
  leaveAuth: () => void
}

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  isLoggedIn: false,
  loading: false,
  userId: '',
  email: '',
  name: '',
  username: '',
  avatar: '',
  friendInfos: [],

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
  successAuth: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfos: friendInfo[]
  ) => {
    set(
      () => ({ 
        isLoggedIn: true, 
        loading: false,
        userId: userId,
        email: email,
        name: name,
        username: username,
        avatar: avatar,
        friendInfos: friendInfos
      })
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

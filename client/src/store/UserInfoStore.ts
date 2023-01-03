import create from 'zustand'

interface friendInfo {
  userId: string,
  name: string,
  username: string,
  avatar: string,
}

export type UserInfoState = {
  userId: string
  email: string
  name: string
  username: string
  avatar: string
  friendInfos: friendInfo[]
}

export type UserInfoAction = {
  initUserInfo: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfos: friendInfo[]
  ) => void
  updateName: (
    name: string
  ) => void
  updateAvatar: (
    avatar: string
  ) => void
  updateFriendInfos: (
    friendInfos: friendInfo[]
  ) => void
  removeInfo: () => void // when logout
}

export const useUserInfoStore = create<UserInfoState & UserInfoAction>()((set) => ({
  userId: '',
  email: '',
  name: '',
  username: '',
  avatar: '',
  friendInfos: [],

  initUserInfo: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfos: friendInfo[]
  ) => {
    set(() => ({
      userId: userId,
      email: email,
      name: name,
      username: username,
      avatar: avatar,
      friendInfos: friendInfos
    }))
  }, 
  updateName: (
    name: string
  ) => {
    set(() => ({
      name: name
    }))
  },
  updateAvatar: (
    avatar: string
  ) => {
    set(() => ({
      avatar: avatar,
    }))
  },
  updateFriendInfos: (
    friendInfos: friendInfo[]
  ) => {
    set(() => ({
      friendInfos: friendInfos
    }))
  }, 
  removeInfo: () => {
    set(()=> ({
      userId: '',
      email: '',
      name: '',
      username: '',
      avatar: '',
      friendInfos: [],
    }))
  }
}))

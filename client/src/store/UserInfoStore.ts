import create from 'zustand'
import FriendInfo from '../pages/Friend/FriendInfo'

export interface FriendInfo {
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
  friendInfos: {[userId: string]: FriendInfo}
}

export type UserInfoAction = {
  initUserInfo: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfos: FriendInfo[]
  ) => void
  updateName: (
    name: string
  ) => void
  updateAvatar: (
    avatar: string
  ) => void
  updateFriendInfos: (
    friendInfo: FriendInfo
  ) => void
  removeInfo: () => void // when logout
}

export const useUserInfoStore = create<UserInfoState & UserInfoAction>()((set) => ({
  userId: '',
  email: '',
  name: '',
  username: '',
  avatar: '',
  friendInfos: {}, //new Map<String, FriendInfo>(),

  initUserInfo: (
    userId: string,
    email: string,
    name: string,
    username: string,
    avatar: string,
    friendInfoList: FriendInfo[]
  ) => {
    const friendInfos: {[userId: string]: FriendInfo} = {}//new Map<string, FriendInfo>()
    for (const info of friendInfoList) {
      const userId: string = info.userId
      friendInfos[userId] = info
    }
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
    friendInfo: FriendInfo
  ) => {
    const newInfo: {[userId: string]: FriendInfo} = {}
    newInfo[friendInfo.userId] = friendInfo
    set((state) => ({
      friendInfos: {...state.friendInfos, ...newInfo}
    }))
  }, 
  removeInfo: () => {
    set(()=> ({
      userId: '',
      email: '',
      name: '',
      username: '',
      avatar: '',
      friendInfos: {}
    }))
  }
}))

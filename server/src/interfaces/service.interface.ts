import { HttpException } from "../utils/HttpException"

export interface ServiceError {
  error: HttpException
}

// This is a main interface for all data layer service
export interface ServiceResult {
  success: boolean
  message: string
  // error: HttpException | undefined
}
const serviceDefaults = {
  success: true,
  message: 'Api default message',
  // error: undefined
}
export const initServiceResult = (options?: Partial<ServiceResult>) => {
  return {
    ...serviceDefaults,
    ...options
  }
}
// Auth Service 
// There are 4 auth api routes
export interface FriendInfo {
  userId: string
  name: string
  username: string
  avatar: string
}
export interface LoginResult extends ServiceResult {
  accessToken: string
  refreshToken: string
  userId: string
  email: string
  name: string
  username: string
  avatar: string
  friendInfos: FriendInfo[]
  verify: boolean
}

export interface RegisterResult extends ServiceResult {
  userId: string
}

export interface LogoutResult extends ServiceResult { 
}

export interface RefreshResult extends ServiceResult { 
}

export interface LoginWithTokenResult extends ServiceResult {
  userId: string
  email: string
  name: string
  username: string
  avatar: string
  friendInfos: FriendInfo[]
}

export function initLoginResult(options?: Partial<LoginResult>): LoginResult {
  const defaults = {
    accessToken: '',
    refreshToken: '',
    userId: '',
    email: '',
    name: '',
    username: '',
    avatar: '',
    friendInfos: [],
    verify: true
  }

  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
}

export function initRegisterResult(options?: Partial<RegisterResult>): RegisterResult {
  const defaults = {
    userId: ''
  }

  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
}

export function initLogoutResult(options?: Partial<LogoutResult>): LogoutResult {
  return {
    ...serviceDefaults,
    ...options,
  }
}

export function initRefreshResult(options?: Partial<RefreshResult>): RefreshResult {
  return {
    ...serviceDefaults,
    ...options,
  }
}

export function initLoginWithTokenResult (options?: Partial<LoginWithTokenResult>): LoginWithTokenResult {
  const defaults = {
    userId: '',
    email: '',
    name: '',
    username: '',
    avatar: '',
    friendInfos: [],
  }
  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
}

// User Service
export interface SearchResult extends ServiceResult {
  userId: string
  name: string
  username: string
  avatar: string
}

export interface AddFriendResult extends ServiceResult {
}

export interface EditProfileResult extends ServiceResult {
  userId: string
  password: string
  name: string
  avatar: string
}

export interface ChangePasswordResult extends ServiceResult {
}

export function initAddFriendresult(options?: Partial<AddFriendResult>): AddFriendResult {
  return {
    ...serviceDefaults,
    ...options
  }
} 

export function initSearchResult(options?: Partial<SearchResult>): SearchResult {
  const defaults = {
    userId: '',
    name: '',
    username: '',
    avatar: ''
  }

  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
}

export function initEditProfileResult(options?: Partial<EditProfileResult>): EditProfileResult {
  const defaults = {
    userId: '',
    password: '',
    name: '',
    avatar: ''
  }

  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
} 

export function initChangePasswordResult(options?: Partial<ChangePasswordResult>): ChangePasswordResult{
  return {
    ...serviceDefaults,
    ...options
  }
}

// Chat Service
interface ChatMessage {
  messageText: string,
  senderId: string,
  timestamp: string
}

export interface GetMessageResult extends ServiceResult{
  chatMessages: ChatMessage[]
}

export interface SendMessageResult extends ServiceResult{
}

export function initGetMessageResult(options?: Partial<GetMessageResult>): GetMessageResult {
  const defaults = {
    chatMessages: []
  }

  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
} 

export function initSendMessageResult(options?: Partial<SendMessageResult>): SendMessageResult {
  const defaults = {
  }
  
  return {
    ...serviceDefaults,
    ...defaults,
    ...options,
  }
} 

// ML Service

// Notif Service
export interface NotifInfo {
  notifId: string
  initiatorId: string
  receiverId: string
  type: string
  timestamp: string
}
export interface GetNotifsResult extends ServiceResult{
  notifs: NotifInfo[]
}
export function initGetNotifsResult (options?: Partial<GetNotifsResult>): GetNotifsResult{
  const defaults = {
    notifs: []
  }
  return {
    ...serviceDefaults,
    ...defaults,
    ...options
  }
}
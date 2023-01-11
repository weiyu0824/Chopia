// This file contains all schema of DB collection

export interface IUser {
  email: string
  name: string
  username: string
  password: string
  groupIds: string[]
  friendIds: string[]
  avatar: string
  verify: boolean
}

export interface IPrivateMessage {
  chatRoomId: string
  messageText: string,
  senderId: string,
  timestamp: string
}

export interface IGroupMessage {
  groupId: string,
  messageText: string,
  senderId: string,
  timestamp: string,
}

export interface IGroup {
  groupName: string
  adminId: string
  memberIds: string[]
  avatar: string
}

export interface INotification {
  initiatorId: string
  receiverId: string
  type: string // Currently 2 type: new-friend, friend-request
  timestamp: string
}

export interface IUserVerification {
  userId: string,
  verificationToken: string,
  expireDate: Number
}
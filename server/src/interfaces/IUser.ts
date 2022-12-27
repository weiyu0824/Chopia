export interface IUser {
  email: string
  name: string
  username: string
  password: string
  groupIds: string[]
  friendIds: string[]
  avatar?: string
}

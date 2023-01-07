import create from 'zustand'
import { ChatMessage } from '../interfaces/ChatMessage'

export type ChatState = {
  chatRoomId: string // use friendId in p2p scenerio
  chatHistory: ChatMessage[]
}

export type ChatAction = {
  addHistory: (history: ChatMessage[]) => void
  addNewMessage: (chatRoomId: string, cmessage : ChatMessage) => void
  initChatroom: (chatroomId: string, history: ChatMessage[]) => void
}

export const useChatStore = create<ChatState & ChatAction>()((set) => ({
  chatRoomId: '',
  chatHistory: [],
  addHistory: (history: ChatMessage[]) => {
    set((state) => ({
      chatHistory: [...history, ...state.chatHistory, ]
    }))
  },
  addNewMessage: (chatRoomId: string, cmessage: ChatMessage) => {
    
    set((state) => ({
      chatHistory: (chatRoomId === state.chatRoomId) ? [...state.chatHistory, cmessage]: state.chatHistory 
    }))
  },
  initChatroom: (chatroomId: string, history: ChatMessage[]) => {
    console.log('init', chatroomId)
    set(() => ({
      chatRoomId: chatroomId,
      chatHistory: history // make history empty when changing the chatroom
    }))
  }
  
}))

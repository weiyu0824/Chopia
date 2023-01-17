import create from 'zustand'

export type ErrorState = {
  errorCode: Number
  errorMessage: String
}

export type ErrorAction = {
  setError: (
    errorCode: Number,
    errorMessage: String
  ) => void
  clearError: () => void
}

export const useErrorStore = create<ErrorState & ErrorAction>()((set) => ({
  errorCode: 0,
  errorMessage: '',
  setError: (errorCode, errorMessage) => {
    set(() => ({
      errorCode: errorCode,
      errorMessage: errorMessage
    }))
  },
  clearError: () => {
    set(() => ({
      errorCode: 0,
      errorMessage: ''
    }))
  }

  
}))
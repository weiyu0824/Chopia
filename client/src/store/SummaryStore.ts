import create from 'zustand'

export type SummaryState = {
  clickedSum: boolean
  topicID: string
  topicTitle: string
  topicContext: string
}

export type SummaryAction = {
  startSum: () => void
  endSum: () => void
  enterSum: (topicID: string, topicTitle: string, topicContext: string) => void
  leaveSum: () => void
}

export const useSummaryStore = create<SummaryState & SummaryAction>()((set) => ({
  clickedSum: false,
  topicID: '',
  topicTitle: '',
  topicContext: '',
  startSum: () => {
    set(
      () => (
        { clickedSum: true }
      )
    )
  },
  endSum: () => {
    set(
      () => (
        {clickedSum: false }
      )
    )
  },
  enterSum: (topicID: string, topicTitle: string, topicContext: string) => {
    set(
        () => (
          { clickedSum: true, topicID: topicID, topicTitle: topicTitle, topicContext: topicContext}
        )
      )
  },
  leaveSum: () => {
    set(
      () => (
        { clickedSum: false, topicID: '', topicTitle: '', topicContext:''}
      )
    )
  }
}))

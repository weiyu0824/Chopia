import create from 'zustand'

export type HighlightState = {
  highlightsIds: string[]
  focusIds: string
}

export type HighlightAction = {
  pushHighlightIds: (highlightsIds: string[]) => void
  changeFocusId: (focusIds: string) => void
}

export const useSummaryStore = create<HighlightState & HighlightAction>()((set) => ({
  highlightsIds: [],
  focusIds: '',
  pushHighlightIds: (highlightsIds: string[]) => {
    set(
      () => (
        {highlightsIds: highlightsIds}
      )
    )
  },
  changeFocusId: (focusIds: string) => {
    set(
      () => (
        {focusIds: focusIds}
      )
    )
  }
}))
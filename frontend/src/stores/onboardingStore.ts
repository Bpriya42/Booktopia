import { create } from 'zustand'

export interface OnboardingData {
  likes: {
    genres: string[]
    tones: string[]
    styles: string[]
    custom: string | null
  }
  dislikes: {
    genres: string[]
    themes: string[]
    pacing: string[]
    lengths: string[]
    styles: string[]
    custom: string | null
  }
  books_loved: Array<{
    title: string
    author: string
    rating: number | null
  }>
  books_disliked: Array<{
    title: string
    author: string
    reasons: string[]
  }>
  intent: string[]
  reading_level: number
}

interface OnboardingStore {
  data: OnboardingData
  currentStep: number
  updateLikes: (likes: Partial<OnboardingData['likes']>) => void
  updateDislikes: (dislikes: Partial<OnboardingData['dislikes']>) => void
  addBookLoved: (book: OnboardingData['books_loved'][0]) => void
  removeBookLoved: (title: string) => void
  addBookDisliked: (book: OnboardingData['books_disliked'][0]) => void
  removeBookDisliked: (title: string) => void
  updateIntent: (intent: string[]) => void
  updateReadingLevel: (level: number) => void
  setCurrentStep: (step: number) => void
  resetOnboarding: () => void
}

const initialData: OnboardingData = {
  likes: {
    genres: [],
    tones: [],
    styles: [],
    custom: null,
  },
  dislikes: {
    genres: [],
    themes: [],
    pacing: [],
    lengths: [],
    styles: [],
    custom: null,
  },
  books_loved: [],
  books_disliked: [],
  intent: [],
  reading_level: 5,
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: initialData,
  currentStep: 0,

  updateLikes: (likes) =>
    set((state) => ({
      data: {
        ...state.data,
        likes: { ...state.data.likes, ...likes },
      },
    })),

  updateDislikes: (dislikes) =>
    set((state) => ({
      data: {
        ...state.data,
        dislikes: { ...state.data.dislikes, ...dislikes },
      },
    })),

  addBookLoved: (book) =>
    set((state) => ({
      data: {
        ...state.data,
        books_loved: [...state.data.books_loved, book],
      },
    })),

  removeBookLoved: (title) =>
    set((state) => ({
      data: {
        ...state.data,
        books_loved: state.data.books_loved.filter((b) => b.title !== title),
      },
    })),

  addBookDisliked: (book) =>
    set((state) => ({
      data: {
        ...state.data,
        books_disliked: [...state.data.books_disliked, book],
      },
    })),

  removeBookDisliked: (title) =>
    set((state) => ({
      data: {
        ...state.data,
        books_disliked: state.data.books_disliked.filter((b) => b.title !== title),
      },
    })),

  updateIntent: (intent) =>
    set((state) => ({
      data: { ...state.data, intent },
    })),

  updateReadingLevel: (level) =>
    set((state) => ({
      data: { ...state.data, reading_level: level },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  resetOnboarding: () => set({ data: initialData, currentStep: 0 }),
}))


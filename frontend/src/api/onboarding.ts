import { api } from '../lib/api'
import type { OnboardingData } from '../stores/onboardingStore'

export interface BookSearchResult {
  title: string
  author: string
  cover_url?: string
}

export const onboardingApi = {
  // Complete onboarding and submit preferences
  completeOnboarding: (data: OnboardingData) =>
    api.post<{ success: boolean; message: string }>('/api/onboarding/complete', data),

  // Search for books during onboarding
  searchBooks: (query: string) =>
    api.get<BookSearchResult[]>(`/api/books/search?q=${encodeURIComponent(query)}`, {
      requiresAuth: false,
    }),
}


import { api } from '../lib/api'
import { ReadingSession } from '../types'

export interface CreateSessionInput {
  book_id: string
  duration_minutes: number
}

export const sessionsApi = {
  // Get all reading sessions
  getSessions: () => api.get<ReadingSession[]>('/api/sessions'),

  // Create a new reading session
  createSession: (data: CreateSessionInput) =>
    api.post<ReadingSession>('/api/sessions', data),

  // Get user statistics
  getStats: () =>
    api.get<{
      total_sessions: number
      total_minutes: number
      total_points: number
      current_streak: number
    }>('/api/sessions/stats'),
}


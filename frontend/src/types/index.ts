// User types
export interface User {
  id: string
  email: string
  username?: string
  avatar_url?: string
  reading_level: number
  total_points: number
  created_at: string
  updated_at: string
}

// Book types
export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  cover_url?: string
  description?: string
  genres?: string[]
  created_at: string
}

// Reading session types
export interface ReadingSession {
  id: string
  user_id: string
  book_id: string
  duration_minutes: number
  points_earned: number
  created_at: string
}

// Note types
export interface Note {
  id: string
  user_id: string
  book_id: string
  content: string
  ai_summary?: string
  created_at: string
  updated_at: string
}

// Recommendation types
export interface BookRecommendation {
  book: Book
  score: number
  reasoning: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  detail: string
  code?: string
}


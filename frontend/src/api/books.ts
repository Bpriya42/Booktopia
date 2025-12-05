import { api } from '../lib/api'
import { Book, BookRecommendation } from '../types'

export const booksApi = {
  // Get all books
  getBooks: () => api.get<Book[]>('/api/books'),

  // Get a single book by ID
  getBook: (id: string) => api.get<Book>(`/api/books/${id}`),

  // Search books
  searchBooks: (query: string) => 
    api.get<Book[]>(`/api/books/search?q=${encodeURIComponent(query)}`),

  // Get personalized recommendations
  getRecommendations: () => 
    api.get<BookRecommendation[]>('/api/recommendations'),
}


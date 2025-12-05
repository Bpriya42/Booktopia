import { api } from '../lib/api'
import { Note } from '../types'

export interface CreateNoteInput {
  book_id: string
  content: string
}

export interface UpdateNoteInput {
  content?: string
}

export const notesApi = {
  // Get all notes for current user
  getNotes: () => api.get<Note[]>('/api/notes'),

  // Get notes for a specific book
  getBookNotes: (bookId: string) => 
    api.get<Note[]>(`/api/notes?book_id=${bookId}`),

  // Get a single note
  getNote: (id: string) => api.get<Note>(`/api/notes/${id}`),

  // Create a new note
  createNote: (data: CreateNoteInput) => 
    api.post<Note>('/api/notes', data),

  // Update a note
  updateNote: (id: string, data: UpdateNoteInput) =>
    api.patch<Note>(`/api/notes/${id}`, data),

  // Delete a note
  deleteNote: (id: string) => api.delete(`/api/notes/${id}`),

  // Generate AI summary for a note
  generateSummary: (id: string) =>
    api.post<{ summary: string }>(`/api/notes/${id}/summary`),
}


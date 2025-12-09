import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

const DISLIKE_REASONS = [
  'Too slow',
  'Too confusing',
  'Not my genre',
  'Writing style didn\'t fit',
  'Characters felt flat',
  'Too long',
]

export default function BooksDisliked() {
  const navigate = useNavigate()
  const { data, addBookDisliked, removeBookDisliked, setCurrentStep } = useOnboardingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedBook, setExpandedBook] = useState<string | null>(null)
  const [selectedReasons, setSelectedReasons] = useState<Record<string, string[]>>({})

  useEffect(() => {
    setCurrentStep(4)
  }, [setCurrentStep])

  // Mock book search
  const mockBooks = [
    { title: 'Moby Dick', author: 'Herman Melville' },
    { title: 'Ulysses', author: 'James Joyce' },
    { title: 'War and Peace', author: 'Leo Tolstoy' },
    { title: 'Finnegans Wake', author: 'James Joyce' },
    { title: 'Atlas Shrugged', author: 'Ayn Rand' },
  ]

  const filteredBooks = searchQuery
    ? mockBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleAddBook = (book: { title: string; author: string }) => {
    const exists = data.books_disliked.find((b) => b.title === book.title)
    if (!exists) {
      setExpandedBook(book.title)
      setSearchQuery('')
    }
  }

  const toggleReason = (bookTitle: string, reason: string) => {
    const current = selectedReasons[bookTitle] || []
    const updated = current.includes(reason)
      ? current.filter((r) => r !== reason)
      : [...current, reason]
    setSelectedReasons({ ...selectedReasons, [bookTitle]: updated })
  }

  const confirmAddBook = (book: { title: string; author: string }) => {
    const reasons = selectedReasons[book.title] || []
    addBookDisliked({ ...book, reasons })
    setExpandedBook(null)
    setSelectedReasons({ ...selectedReasons, [book.title]: [] })
  }

  const handleNext = () => {
    setCurrentStep(5)
    navigate('/onboarding/intent')
  }

  const handleSkip = () => {
    setCurrentStep(5)
    navigate('/onboarding/intent')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            Which books didn't resonate with you?
          </h1>
          <p className="text-lg text-[#8A6B45]">Select one or two if you'd like.</p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a book..."
              className="w-full px-5 py-4 pl-12 rounded-xl border-2 border-[#F8F3E6] focus:border-[#90A7C4] focus:outline-none transition-colors text-base"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          {/* Search results dropdown */}
          {searchQuery && filteredBooks.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-[#F8F3E6] max-h-80 overflow-y-auto">
              {filteredBooks.map((book) => (
                <button
                  key={`${book.title}-${book.author}`}
                  onClick={() => handleAddBook(book)}
                  className="w-full px-5 py-4 text-left hover:bg-[#F8F3E6] transition-colors flex items-start gap-3 border-b border-[#F8F3E6] last:border-0"
                >
                  <div className="w-12 h-16 bg-gradient-to-br from-[#90A7C4] to-[#E7C0C8] rounded flex-shrink-0 flex items-center justify-center text-white text-xs">
                    📖
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#2D2D2D] truncate">{book.title}</div>
                    <div className="text-sm text-[#8A6B45]">{book.author}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reason selector modal */}
        {expandedBook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-xl font-semibold text-[#3B593B]">
                Why didn't {expandedBook} work for you?
              </h3>
              <div className="space-y-2">
                {DISLIKE_REASONS.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => toggleReason(expandedBook, reason)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                      (selectedReasons[expandedBook] || []).includes(reason)
                        ? 'bg-[#90A7C4] text-white'
                        : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setExpandedBook(null)}
                  className="flex-1 px-4 py-3 border-2 border-[#F8F3E6] rounded-xl font-medium hover:bg-[#F8F3E6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    confirmAddBook(
                      filteredBooks.find((b) => b.title === expandedBook) || {
                        title: expandedBook,
                        author: '',
                      }
                    )
                  }
                  className="flex-1 px-4 py-3 bg-[#3B593B] text-white rounded-xl font-medium hover:bg-[#2a4029] transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected books */}
        {data.books_disliked.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#3B593B]">Books You Didn't Enjoy</h2>
            <div className="space-y-3">
              {data.books_disliked.map((book) => (
                <div
                  key={book.title}
                  className="bg-white rounded-xl p-4 shadow-md border-2 border-[#E7C0C8]/30 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="font-semibold text-[#2D2D2D]">{book.title}</div>
                    <div className="text-sm text-[#8A6B45]">{book.author}</div>
                    {book.reasons.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {book.reasons.map((reason) => (
                          <span
                            key={reason}
                            className="text-xs px-3 py-1 bg-[#E7C0C8]/30 text-[#2D2D2D] rounded-full"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeBookDisliked(book.title)}
                    className="w-8 h-8 bg-[#E7C0C8] text-white rounded-full flex items-center justify-center hover:bg-[#d5a8b3] transition-colors text-lg font-bold flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {data.books_disliked.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <div className="text-6xl">☁️</div>
            <p className="text-[#8A6B45]">No books added yet</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-[#6FA96F] hover:text-[#3B593B] font-medium transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#3B593B] text-white rounded-xl font-medium hover:bg-[#2a4029] transition-all duration-200 active:scale-95 shadow-md"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}


import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

export default function BooksLoved() {
  const navigate = useNavigate()
  const { data, addBookLoved, removeBookLoved, setCurrentStep } = useOnboardingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setCurrentStep(3)
  }, [setCurrentStep])

  // Mock book search - in real app, this would call the API
  const mockBooks = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { title: 'Dune', author: 'Frank Herbert' },
  ]

  const filteredBooks = searchQuery
    ? mockBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleAddBook = (book: { title: string; author: string }) => {
    const exists = data.books_loved.find((b) => b.title === book.title)
    if (!exists) {
      addBookLoved({ ...book, rating: null })
      setSearchQuery('')
    }
  }

  const handleNext = () => {
    setCurrentStep(4)
    navigate('/onboarding/books-disliked')
  }

  const handleSkip = () => {
    setCurrentStep(4)
    navigate('/onboarding/books-disliked')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            Which books have stayed with you?
          </h1>
          <p className="text-lg text-[#8A6B45]">
            Add a few favorites – this helps us understand your taste deeply.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a book or author..."
              className="w-full px-5 py-4 pl-12 rounded-xl border-2 border-[#F8F3E6] focus:border-[#6FA96F] focus:outline-none transition-colors text-base"
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
                  <div className="w-12 h-16 bg-gradient-to-br from-[#6FA96F] to-[#3B593B] rounded flex-shrink-0 flex items-center justify-center text-white text-xs">
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

        {/* Selected books shelf */}
        {data.books_loved.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#3B593B]">Your Favorite Shelf</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.books_loved.map((book) => (
                <div
                  key={book.title}
                  className="relative group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-[#E1A85A]/30"
                >
                  <button
                    onClick={() => removeBookLoved(book.title)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#E7C0C8] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                  >
                    ×
                  </button>
                  <div className="w-full h-24 bg-gradient-to-br from-[#6FA96F] to-[#3B593B] rounded-lg mb-3 flex items-center justify-center text-3xl">
                    📚
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-[#2D2D2D] line-clamp-2">
                      {book.title}
                    </div>
                    <div className="text-xs text-[#8A6B45] line-clamp-1">{book.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {data.books_loved.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <div className="text-6xl">📚</div>
            <p className="text-[#8A6B45]">Search for books to add them to your shelf</p>
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
            disabled={data.books_loved.length === 0}
            className="px-8 py-3 bg-[#3B593B] text-white rounded-xl font-medium hover:bg-[#2a4029] transition-all duration-200 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}


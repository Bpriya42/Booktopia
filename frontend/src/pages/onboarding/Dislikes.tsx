import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

const GENRES = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Literary Fiction',
  'Young Adult',
  'Non-Fiction',
]

const THEMES = [
  'Violence',
  'Explicit Content',
  'Slow Burn',
  'Love Triangles',
  'Cliffhangers',
  'Sad Endings',
  'War',
  'Political Drama',
]

const PACING = ['Too Slow', 'Too Fast', 'Meandering']

const LENGTHS = ['Too Short', 'Too Long', 'Series (Multi-Book)']

const STYLES = [
  'Too Dense',
  'Too Simple',
  'Overly Descriptive',
  'Confusing Structure',
  'Weak Characters',
]

export default function Dislikes() {
  const navigate = useNavigate()
  const { data, updateDislikes, setCurrentStep } = useOnboardingStore()
  const [selectedGenres, setSelectedGenres] = useState<string[]>(data.dislikes.genres)
  const [selectedThemes, setSelectedThemes] = useState<string[]>(data.dislikes.themes)
  const [selectedPacing, setSelectedPacing] = useState<string[]>(data.dislikes.pacing)
  const [selectedLengths, setSelectedLengths] = useState<string[]>(data.dislikes.lengths)
  const [selectedStyles, setSelectedStyles] = useState<string[]>(data.dislikes.styles)
  const [customInput, setCustomInput] = useState(data.dislikes.custom || '')
  const [showCustomInput, setShowCustomInput] = useState(false)

  useEffect(() => {
    setCurrentStep(2)
  }, [setCurrentStep])

  const toggleItem = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleNext = () => {
    updateDislikes({
      genres: selectedGenres,
      themes: selectedThemes,
      pacing: selectedPacing,
      lengths: selectedLengths,
      styles: selectedStyles,
      custom: customInput || null,
    })
    setCurrentStep(3)
    navigate('/onboarding/books-loved')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            And what dims your spark?
          </h1>
          <p className="text-lg text-[#8A6B45]">
            Select anything you usually avoid — genres, themes, pacing, length, or tone.
          </p>
        </div>

        {/* Genres to Avoid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Genres to Avoid</h2>
          <div className="flex flex-wrap gap-3">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleItem(genre, selectedGenres, setSelectedGenres)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedGenres.includes(genre)
                    ? 'bg-[#90A7C4] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Themes to Avoid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Themes to Avoid</h2>
          <div className="flex flex-wrap gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => toggleItem(theme, selectedThemes, setSelectedThemes)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedThemes.includes(theme)
                    ? 'bg-[#90A7C4] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Pacing Issues */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Pacing Issues</h2>
          <div className="flex flex-wrap gap-3">
            {PACING.map((pace) => (
              <button
                key={pace}
                onClick={() => toggleItem(pace, selectedPacing, setSelectedPacing)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPacing.includes(pace)
                    ? 'bg-[#90A7C4] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                }`}
              >
                {pace}
              </button>
            ))}
          </div>
        </div>

        {/* Book Length */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Book Length</h2>
          <div className="flex flex-wrap gap-3">
            {LENGTHS.map((length) => (
              <button
                key={length}
                onClick={() => toggleItem(length, selectedLengths, setSelectedLengths)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedLengths.includes(length)
                    ? 'bg-[#90A7C4] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </div>

        {/* Writing Styles */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Writing Styles</h2>
          <div className="flex flex-wrap gap-3">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleItem(style, selectedStyles, setSelectedStyles)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedStyles.includes(style)
                    ? 'bg-[#90A7C4] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E7C0C8]/30'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Custom input */}
        <div className="space-y-3">
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="text-[#6FA96F] hover:text-[#3B593B] font-medium transition-colors"
            >
              + Something else...
            </button>
          ) : (
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Tell us what else you'd like to avoid..."
              className="w-full px-4 py-3 rounded-xl border-2 border-[#F8F3E6] focus:border-[#90A7C4] focus:outline-none transition-colors"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6">
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


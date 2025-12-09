import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

const GENRES = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Thriller',
  'Historical Fiction',
  'Literary Fiction',
  'Contemporary',
  'Adventure',
  'Horror',
  'Young Adult',
  'Non-Fiction',
  'Biography',
  'Self-Help',
  'Poetry',
]

const TONES = [
  'Cozy & Comforting',
  'Dark & Atmospheric',
  'Light & Humorous',
  'Emotional & Moving',
  'Uplifting & Hopeful',
  'Suspenseful',
  'Thought-Provoking',
  'Whimsical',
]

const STYLES = [
  'Rich Descriptions',
  'Fast-Paced Action',
  'Character-Driven',
  'Plot-Driven',
  'Lyrical Writing',
  'Dialogue-Heavy',
  'Multiple POVs',
  'Stream of Consciousness',
]

export default function Likes() {
  const navigate = useNavigate()
  const { data, updateLikes, setCurrentStep } = useOnboardingStore()
  const [selectedGenres, setSelectedGenres] = useState<string[]>(data.likes.genres)
  const [selectedTones, setSelectedTones] = useState<string[]>(data.likes.tones)
  const [selectedStyles, setSelectedStyles] = useState<string[]>(data.likes.styles)
  const [customInput, setCustomInput] = useState(data.likes.custom || '')
  const [showCustomInput, setShowCustomInput] = useState(false)

  useEffect(() => {
    setCurrentStep(1)
  }, [setCurrentStep])

  const toggleItem = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleNext = () => {
    updateLikes({
      genres: selectedGenres,
      tones: selectedTones,
      styles: selectedStyles,
      custom: customInput || null,
    })
    setCurrentStep(2)
    navigate('/onboarding/dislikes')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            What do you love in the stories you read?
          </h1>
          <p className="text-lg text-[#8A6B45]">
            Select everything that brings your imagination to life.
          </p>
        </div>

        {/* Genres */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Genres</h2>
          <div className="flex flex-wrap gap-3">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleItem(genre, selectedGenres, setSelectedGenres)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedGenres.includes(genre)
                    ? 'bg-[#6FA96F] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E1A85A]/30'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Tone & Mood */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Tone & Mood</h2>
          <div className="flex flex-wrap gap-3">
            {TONES.map((tone) => (
              <button
                key={tone}
                onClick={() => toggleItem(tone, selectedTones, setSelectedTones)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTones.includes(tone)
                    ? 'bg-[#6FA96F] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E1A85A]/30'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Style Preferences */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#3B593B]">Style Preferences</h2>
          <div className="flex flex-wrap gap-3">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleItem(style, selectedStyles, setSelectedStyles)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedStyles.includes(style)
                    ? 'bg-[#6FA96F] text-white scale-105 shadow-md'
                    : 'bg-[#F8F3E6] text-[#2D2D2D] hover:bg-[#E1A85A]/30'
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
              placeholder="Tell us what else you love..."
              className="w-full px-4 py-3 rounded-xl border-2 border-[#F8F3E6] focus:border-[#6FA96F] focus:outline-none transition-colors"
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


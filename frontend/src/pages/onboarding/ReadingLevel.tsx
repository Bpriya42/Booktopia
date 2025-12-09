import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

const LEVEL_DESCRIPTIONS: Record<number, string> = {
  1: 'Very light & simple',
  2: 'Easy, comforting reads',
  3: 'Casual, quick stories',
  4: 'Standard fiction difficulty',
  5: 'Engaging but accessible',
  6: 'Richer worlds & ideas',
  7: 'Complex plots & themes',
  8: 'Dense or literary',
  9: 'Advanced, challenging reads',
  10: 'Very dense or scholarly',
}

export default function ReadingLevel() {
  const navigate = useNavigate()
  const { data, updateReadingLevel, setCurrentStep } = useOnboardingStore()
  const [level, setLevel] = useState(data.reading_level)

  useEffect(() => {
    setCurrentStep(6)
  }, [setCurrentStep])

  const handleNext = () => {
    updateReadingLevel(level)
    setCurrentStep(7)
    navigate('/onboarding/loading')
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(parseInt(e.target.value))
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            How challenging do you like your books?
          </h1>
          <p className="text-lg text-[#8A6B45]">
            Choose the level that feels most comfortable. Every journey is unique.
          </p>
        </div>

        {/* Book stack visual */}
        <div className="flex items-end justify-center h-48 gap-1">
          {Array.from({ length: level }).map((_, i) => (
            <div
              key={i}
              className="w-8 bg-gradient-to-br from-[#6FA96F] to-[#3B593B] rounded-t-sm transition-all duration-300"
              style={{
                height: `${(i + 1) * (160 / level)}px`,
                opacity: 0.7 + (i / level) * 0.3,
              }}
            />
          ))}
        </div>

        {/* Slider */}
        <div className="space-y-6">
          <div className="relative px-4">
            <input
              type="range"
              min="1"
              max="10"
              value={level}
              onChange={handleSliderChange}
              className="w-full h-3 bg-[#F8F3E6] rounded-full appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #6FA96F 0%, #6FA96F ${
                  ((level - 1) / 9) * 100
                }%, #F8F3E6 ${((level - 1) / 9) * 100}%, #F8F3E6 100%)`,
              }}
            />
            {/* Tick marks */}
            <div className="flex justify-between px-1 mt-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-xs ${
                    level === i + 1 ? 'text-[#3B593B] font-bold' : 'text-[#8A6B45]'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Level description */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border-2 border-[#6FA96F]/30">
            <div className="text-5xl mb-3">
              {level <= 3 ? '🦊' : level <= 6 ? '📚' : level <= 8 ? '📖' : '🏔️'}
            </div>
            <div className="text-2xl font-semibold text-[#3B593B] mb-2">Level {level}</div>
            <div className="text-lg text-[#8A6B45]">{LEVEL_DESCRIPTIONS[level]}</div>
          </div>
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

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3B593B;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3B593B;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}


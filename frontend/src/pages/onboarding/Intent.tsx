import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'

const INTENT_OPTIONS = [
  { value: 'habit', label: 'Build a steady reading habit', icon: '📅' },
  { value: 'explore', label: 'Explore new genres', icon: '🗺️' },
  { value: 'level', label: 'Increase reading level', icon: '📈' },
  { value: 'consistency', label: 'Read more consistently', icon: '⏰' },
  { value: 'relax', label: 'Relax & escape', icon: '🌙' },
  { value: 'learn', label: 'Learn deeply', icon: '🧠' },
  { value: 'focus', label: 'Strengthen focus', icon: '🎯' },
  { value: 'comprehension', label: 'Improve comprehension', icon: '💡' },
  { value: 'all', label: 'All of the above', icon: '✨' },
]

export default function Intent() {
  const navigate = useNavigate()
  const { data, updateIntent, setCurrentStep } = useOnboardingStore()
  const [selectedIntents, setSelectedIntents] = useState<string[]>(data.intent)

  useEffect(() => {
    setCurrentStep(5)
  }, [setCurrentStep])

  const toggleIntent = (value: string) => {
    if (value === 'all') {
      if (selectedIntents.includes('all')) {
        setSelectedIntents([])
      } else {
        setSelectedIntents(['all'])
      }
    } else {
      const filtered = selectedIntents.filter((i) => i !== 'all')
      if (filtered.includes(value)) {
        setSelectedIntents(filtered.filter((i) => i !== value))
      } else {
        setSelectedIntents([...filtered, value])
      }
    }
  }

  const handleNext = () => {
    updateIntent(selectedIntents)
    setCurrentStep(6)
    navigate('/onboarding/reading-level')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif text-[#3B593B] font-bold">
            What brings you on this reading journey?
          </h1>
          <p className="text-lg text-[#8A6B45]">
            Tell us what you hope to grow, discover, or enjoy.
          </p>
        </div>

        {/* Intent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleIntent(option.value)}
              className={`p-6 rounded-2xl text-left transition-all duration-200 border-2 ${
                selectedIntents.includes(option.value)
                  ? 'bg-[#6FA96F] border-[#6FA96F] text-white shadow-lg scale-105'
                  : 'bg-white border-[#F8F3E6] text-[#2D2D2D] hover:border-[#6FA96F]/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{option.icon}</div>
                <div className="flex-1 pt-1">
                  <div className={`font-semibold text-lg ${
                    selectedIntents.includes(option.value) ? 'text-white' : 'text-[#3B593B]'
                  }`}>
                    {option.label}
                  </div>
                </div>
                {selectedIntents.includes(option.value) && (
                  <div className="w-6 h-6 bg-white text-[#6FA96F] rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6">
          <button
            onClick={handleNext}
            disabled={selectedIntents.length === 0}
            className="px-8 py-3 bg-[#3B593B] text-white rounded-xl font-medium hover:bg-[#2a4029] transition-all duration-200 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}


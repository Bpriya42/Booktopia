import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect } from 'react'

export default function Complete() {
  const navigate = useNavigate()
  const { setCurrentStep, resetOnboarding } = useOnboardingStore()

  useEffect(() => {
    setCurrentStep(8)
  }, [setCurrentStep])

  const handleEnter = () => {
    resetOnboarding()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Success illustration */}
        <div className="w-full h-64 bg-gradient-to-b from-[#6FA96F]/20 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-[#6FA96F]/10 rounded-full animate-ping" />
          </div>
          <div className="relative flex items-center gap-4">
            <div className="text-7xl">🦊</div>
            <div className="text-6xl">📚</div>
            <div className="text-5xl">✨</div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3B593B] font-bold">
            Your personal library awaits.
          </h1>
          <p className="text-xl text-[#8A6B45]">Stories chosen for you, traveler.</p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-white rounded-xl border-2 border-[#6FA96F]/30">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm font-semibold text-[#3B593B]">Personalized Picks</div>
          </div>
          <div className="p-4 bg-white rounded-xl border-2 border-[#E1A85A]/30">
            <div className="text-3xl mb-2">✍️</div>
            <div className="text-sm font-semibold text-[#3B593B]">Smart Notes</div>
          </div>
          <div className="p-4 bg-white rounded-xl border-2 border-[#90A7C4]/30">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-sm font-semibold text-[#3B593B]">Track Progress</div>
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="px-12 py-4 bg-[#3B593B] text-white rounded-2xl text-lg font-medium hover:bg-[#2a4029] transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Enter Library
        </button>
      </div>
    </div>
  )
}


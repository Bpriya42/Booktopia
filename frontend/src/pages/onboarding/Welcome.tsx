import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect } from 'react'

export default function Welcome() {
  const navigate = useNavigate()
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep)

  useEffect(() => {
    setCurrentStep(0)
  }, [setCurrentStep])

  const handleBegin = () => {
    setCurrentStep(1)
    navigate('/onboarding/likes')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Illustration placeholder */}
        <div className="w-full h-64 bg-gradient-to-b from-[#6FA96F]/20 to-transparent rounded-3xl flex items-center justify-center">
          <div className="text-6xl">🦊🌲</div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3B593B] font-bold">
            Welcome, traveler.
          </h1>
          <p className="text-xl text-[#8A6B45]">
            The Library of Endless Tales awaits you.
          </p>
        </div>

        {/* Begin button */}
        <button
          onClick={handleBegin}
          className="px-12 py-4 bg-[#3B593B] text-white rounded-2xl text-lg font-medium hover:bg-[#2a4029] transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Begin
        </button>
      </div>
    </div>
  )
}


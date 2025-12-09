import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useEffect, useState } from 'react'
import { onboardingApi } from '../../api/onboarding'

const LOADING_MESSAGES = [
  'Gathering your tales…',
  'Consulting the wise owl…',
  'Dusting off ancient tomes…',
  'Collecting stories from the forest…',
]

export default function Loading() {
  const navigate = useNavigate()
  const { data, setCurrentStep } = useOnboardingStore()
  const [messageIndex, setMessageIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setCurrentStep(7)
  }, [setCurrentStep])

  useEffect(() => {
    // Cycle through loading messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)

    // Submit onboarding data
    const submitOnboarding = async () => {
      if (isSubmitting) return

      setIsSubmitting(true)
      try {
        await onboardingApi.completeOnboarding(data)
        // Wait a bit before transitioning for better UX
        setTimeout(() => {
          setCurrentStep(8)
          navigate('/onboarding/complete')
        }, 2000)
      } catch (err) {
        console.error('Onboarding submission error:', err)
        setError('Failed to complete onboarding. Please try again.')
        setIsSubmitting(false)
      }
    }

    submitOnboarding()

    return () => clearInterval(interval)
  }, [data, navigate, setCurrentStep, isSubmitting])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl">⚠️</div>
          <div className="space-y-3">
            <h2 className="text-2xl font-serif text-[#3B593B] font-bold">Oops!</h2>
            <p className="text-[#8A6B45]">{error}</p>
          </div>
          <button
            onClick={() => navigate('/onboarding/reading-level')}
            className="px-8 py-3 bg-[#3B593B] text-white rounded-xl font-medium hover:bg-[#2a4029] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Illustration */}
        <div className="relative w-full h-64 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-[#6FA96F] to-[#3B593B] rounded-full animate-pulse" />
          </div>
          <div className="relative text-7xl animate-bounce">
            🦊
          </div>
          <div className="absolute top-20 left-1/4 text-4xl animate-float-slow">📚</div>
          <div className="absolute top-16 right-1/4 text-3xl animate-float-fast">✨</div>
          <div className="absolute bottom-20 left-1/3 text-3xl animate-float-medium">📖</div>
        </div>

        {/* Loading message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-[#3B593B] font-bold transition-all duration-500">
            {LOADING_MESSAGES[messageIndex]}
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#6FA96F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-[#6FA96F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-[#6FA96F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 2.5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}


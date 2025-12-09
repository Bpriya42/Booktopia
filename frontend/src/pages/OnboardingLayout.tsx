import { Outlet, useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../stores/onboardingStore'

export default function OnboardingLayout() {
  const navigate = useNavigate()
  const currentStep = useOnboardingStore((state) => state.currentStep)

  const steps = [
    'Welcome',
    'Likes',
    'Dislikes',
    'Books Loved',
    'Books Disliked',
    'Intent',
    'Reading Level',
    'Loading',
    'Complete',
  ]

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      {/* Progress indicator - hide on welcome and complete screens */}
      {currentStep > 0 && currentStep < 8 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#F8F3E6]">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8A6B45]">
                Step {currentStep} of {steps.length - 2}
              </span>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-[#6FA96F] hover:text-[#3B593B] transition-colors"
              >
                ← Back
              </button>
            </div>
            <div className="w-full bg-[#F8F3E6] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#6FA96F] h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 2)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={currentStep > 0 && currentStep < 8 ? 'pt-20' : ''}>
        <Outlet />
      </div>
    </div>
  )
}


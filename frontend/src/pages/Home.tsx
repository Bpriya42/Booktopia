import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      <header className="border-b border-[#F8F3E6] bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-[#3B593B]">📚 Booktopia</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#8A6B45]">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm bg-[#F8F3E6] hover:bg-[#E1A85A]/30 rounded-lg transition-colors text-[#2D2D2D]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user ? (
          <div className="space-y-8">
            {/* Greeting */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-serif font-bold text-[#3B593B]">
                Welcome to Your Library
              </h2>
              <p className="text-lg text-[#8A6B45]">
                Your personalized reading journey begins here.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-8 border-2 border-[#6FA96F]/30 rounded-2xl bg-white hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-[#3B593B]">
                  Discover Books
                </h3>
                <p className="text-[#8A6B45]">
                  Get personalized AI-powered book recommendations based on your unique tastes.
                </p>
              </div>

              <div className="p-8 border-2 border-[#E1A85A]/30 rounded-2xl bg-white hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">✍️</div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-[#3B593B]">
                  Take Notes
                </h3>
                <p className="text-[#8A6B45]">
                  Capture insights while reading with AI assistance to summarize and connect ideas.
                </p>
              </div>

              <div className="p-8 border-2 border-[#90A7C4]/30 rounded-2xl bg-white hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-[#3B593B]">
                  Track Progress
                </h3>
                <p className="text-[#8A6B45]">
                  Watch your magical garden grow as you build consistent reading habits.
                </p>
              </div>
            </div>

            {/* Coming soon note */}
            <div className="text-center mt-12 p-6 bg-white rounded-2xl border-2 border-[#E7C0C8]/30">
              <p className="text-[#8A6B45]">
                🚧 More features coming soon! Stay tuned for your personalized book recommendations.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="text-7xl mb-4">🦊</div>
            <h2 className="text-3xl font-serif font-bold text-[#3B593B]">
              Welcome to Booktopia
            </h2>
            <p className="text-lg text-[#8A6B45]">
              Please sign in to start your reading journey.
            </p>
            <div className="p-6 bg-white rounded-xl border-2 border-[#F8F3E6]">
              <p className="text-sm text-[#8A6B45]">
                Authentication will be implemented using Supabase Auth.
                <br />
                Configure your Supabase credentials in{' '}
                <code className="bg-[#F8F3E6] px-2 py-1 rounded text-[#2D2D2D]">
                  .env.local
                </code>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">📚 Booktopia</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                Sign Out
        </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Welcome to Booktopia!</h2>
              <p className="text-muted-foreground">
                Your AI-powered reading companion is ready to help you build better reading habits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">📖 Discover Books</h3>
                <p className="text-muted-foreground">
                  Get personalized AI-powered book recommendations based on your interests.
                </p>
              </div>

              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">✍️ Take Notes</h3>
                <p className="text-muted-foreground">
                  Capture insights while reading and let AI help you summarize and connect ideas.
                </p>
              </div>

              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">⏱️ Track Progress</h3>
                <p className="text-muted-foreground">
                  Use focus mode to track reading time and watch your fantasy avatar grow!
        </p>
      </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Welcome to Booktopia</h2>
            <p className="text-muted-foreground">
              Please sign in to start your reading journey.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Authentication will be implemented using Supabase Auth.
                <br />
                Configure your Supabase credentials in <code className="bg-muted px-2 py-1 rounded">.env.local</code>
      </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

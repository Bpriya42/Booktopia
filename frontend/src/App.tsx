import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Home from './pages/Home'
import OnboardingLayout from './pages/OnboardingLayout'
import {
  Welcome,
  Likes,
  Dislikes,
  BooksLoved,
  BooksDisliked,
  Intent,
  ReadingLevel,
  Loading,
  Complete,
} from './pages/onboarding'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FCFAF4]">
        <div className="text-xl text-[#8A6B45]">Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Main app route */}
        <Route path="/" element={<Home />} />

        {/* Onboarding routes */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="/onboarding/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="likes" element={<Likes />} />
          <Route path="dislikes" element={<Dislikes />} />
          <Route path="books-loved" element={<BooksLoved />} />
          <Route path="books-disliked" element={<BooksDisliked />} />
          <Route path="intent" element={<Intent />} />
          <Route path="reading-level" element={<ReadingLevel />} />
          <Route path="loading" element={<Loading />} />
          <Route path="complete" element={<Complete />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

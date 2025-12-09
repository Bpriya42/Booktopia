# 📘 Booktopia Onboarding Implementation Guide

## Overview

The onboarding flow has been fully implemented according to the UX specifications. Users are guided through 9 screens to personalize their reading experience.

## Getting Started

To access the onboarding flow:

```
http://localhost:5173/onboarding
```

## Architecture

### State Management
- **Zustand Store** (`src/stores/onboardingStore.ts`): Manages all onboarding data
- Persists user selections across screens
- Final data is submitted to the backend on the loading screen

### Routing Structure

```
/onboarding
  ├── /welcome          - Welcome screen (Screen 1)
  ├── /likes            - Preferences: what user loves (Screen 2)
  ├── /dislikes         - Preferences: what user avoids (Screen 3)
  ├── /books-loved      - Favorite books selection (Screen 4)
  ├── /books-disliked   - Books that didn't resonate (Screen 5)
  ├── /intent           - Reading journey goals (Screen 6)
  ├── /reading-level    - Difficulty preference slider (Screen 7)
  ├── /loading          - Processing & API submission (Screen 8)
  └── /complete         - Success & redirect to app (Screen 9)
```

## Screen Details

### 1. Welcome (`/onboarding/welcome`)
- Warm introduction with forest illustration
- Single "Begin" button to start journey
- **Animations skipped**: Fox mascot shown as emoji

### 2. Likes (`/onboarding/likes`)
- Multi-select chip interface
- Categories: Genres, Tones & Moods, Style Preferences
- Optional custom text input
- Selections stored in: `onboardingStore.data.likes`

### 3. Dislikes (`/onboarding/dislikes`)
- Similar to Likes but for things to avoid
- Categories: Genres, Themes, Pacing, Lengths, Styles
- Selections stored in: `onboardingStore.data.dislikes`

### 4. Books Loved (`/onboarding/books-loved`)
- Search interface for finding books
- Selected books appear in a visual "shelf"
- Users can remove books by clicking the X button
- **Note**: Currently using mock data; will integrate with real book API
- Selections stored in: `onboardingStore.data.books_loved`

### 5. Books Disliked (`/onboarding/books-disliked`)
- Similar search interface
- Additional "reasons" modal appears after selection
- Users can specify why they didn't enjoy the book
- Selections stored in: `onboardingStore.data.books_disliked`

### 6. Intent (`/onboarding/intent`)
- Large tappable cards showing different reading goals
- Multi-select with visual feedback
- "All of the above" option deselects others when chosen
- Selections stored in: `onboardingStore.data.intent`

### 7. Reading Level (`/onboarding/reading-level`)
- Interactive slider (1-10)
- Visual book stack grows with level
- Live description updates
- **Animations skipped**: Fox climbing animation replaced with emoji
- Selection stored in: `onboardingStore.data.reading_level`

### 8. Loading (`/onboarding/loading`)
- Rotating loading messages
- **Backend Integration**: Submits complete onboarding data to `POST /api/onboarding/complete`
- Handles errors with retry option
- Auto-advances to complete screen on success
- **Animations skipped**: Simple bounce animations instead of elaborate particles

### 9. Complete (`/onboarding/complete`)
- Success confirmation
- Preview of features
- "Enter Library" button redirects to home
- Resets onboarding state for future use

## Data Model

The complete onboarding data submitted to the backend:

```typescript
{
  likes: {
    genres: string[],
    tones: string[],
    styles: string[],
    custom: string | null
  },
  dislikes: {
    genres: string[],
    themes: string[],
    pacing: string[],
    lengths: string[],
    styles: string[],
    custom: string | null
  },
  books_loved: Array<{
    title: string,
    author: string,
    rating: number | null
  }>,
  books_disliked: Array<{
    title: string,
    author: string,
    reasons: string[]
  }>,
  intent: string[],
  reading_level: number
}
```

## API Integration

### Endpoint
`POST /api/onboarding/complete`

### Request Body
Complete onboarding data object (see Data Model above)

### Response
```typescript
{
  success: boolean,
  message: string
}
```

## Design System

### Colors Used
- Primary Green: `#3B593B` (Forest Moss Green)
- Secondary Green: `#6FA96F` (Tea Green)
- Accent Amber: `#E1A85A` (Cozy Amber)
- Accent Blue: `#90A7C4` (Dusty Blue)
- Accent Pink: `#E7C0C8` (Petal Pink)
- Background: `#FCFAF4` (Soft Paper)
- Neutral: `#F8F3E6` (Mushroom Cream)
- Text: `#2D2D2D` (Ink Black)
- Brown: `#8A6B45` (Woodland Brown)

### Component Patterns
- **Buttons**: Rounded (12-20px), 48px height, with hover/active states
- **Chips**: Pill-shaped selectors with scale animation on select
- **Cards**: White background, subtle borders, rounded corners
- **Progress Bar**: Top of screen (except welcome/complete)

## Features Implemented

✅ All 9 screens with proper navigation
✅ State management with Zustand
✅ Progress indicator with step counter
✅ Back button functionality
✅ Form validation (disabled Continue buttons when needed)
✅ Skip options where appropriate
✅ Mock book search (ready for API integration)
✅ Backend API integration on loading screen
✅ Error handling with retry
✅ Responsive design (mobile-first)
✅ Whimsical color palette from design specs
✅ Clean, minimal UI

## Animations Skipped (as requested)

❌ Fox climbing book stack (replaced with emoji)
❌ Magical particles and sparkles (simplified)
❌ Bee animations
❌ Complex parallax effects
✅ Simple CSS transitions and scale effects retained for polish

## Testing the Flow

1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/onboarding`

3. Click through all screens to test the flow

4. Check browser console for the API call on the loading screen

5. Verify you're redirected to home after completion

## Backend Requirements

The backend needs to implement:

```python
@router.post("/api/onboarding/complete")
async def complete_onboarding(data: OnboardingData, current_user: User):
    # Store user preferences
    # Generate initial book recommendations
    # Create user embedding
    # Setup account defaults
    return {"success": True, "message": "Onboarding complete"}
```

## Next Steps

1. **Book Search API**: Replace mock data in BooksLoved and BooksDisliked with real API calls
2. **Authentication Integration**: Ensure onboarding only accessible to new users
3. **Backend Implementation**: Complete the `/api/onboarding/complete` endpoint
4. **Recommendation Engine**: Use onboarding data to generate first recommendations
5. **Illustrations**: Replace emoji placeholders with watercolor illustrations (optional)
6. **State Persistence**: Save partial progress if user exits mid-onboarding

## File Structure

```
frontend/src/
├── stores/
│   └── onboardingStore.ts          # Zustand state management
├── api/
│   └── onboarding.ts                # API client functions
├── pages/
│   ├── Home.tsx                     # Main app home
│   ├── OnboardingLayout.tsx         # Shared layout with progress bar
│   └── onboarding/
│       ├── index.ts                 # Barrel export
│       ├── Welcome.tsx
│       ├── Likes.tsx
│       ├── Dislikes.tsx
│       ├── BooksLoved.tsx
│       ├── BooksDisliked.tsx
│       ├── Intent.tsx
│       ├── ReadingLevel.tsx
│       ├── Loading.tsx
│       └── Complete.tsx
└── App.tsx                          # Router configuration
```

## Success! 🎉

The onboarding flow is complete and ready for testing. The implementation follows the UX specifications with whimsical minimalism, proper state management, and clean architecture.


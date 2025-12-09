# 📘 **BOOKTOPIA — ONBOARDING UX/UI SPECIFICATION DOCUMENT (FINAL)**

---

# 1. **Product Context**

Booktopia is a whimsical, storybook-inspired reading app designed to help users:

* build a reading habit
* discover books they genuinely enjoy
* explore genres and reading levels
* track progress through delightful, fantasy-themed UI elements

Onboarding serves as the user’s first journey into Booktopia and must feel:
**cozy, magical, modern, minimal, and deeply personalized.**

---

# 2. **UX Goals**

1. **Collect preference data** with minimal cognitive load.
2. Establish a **storybook atmosphere** without overwhelming visuals.
3. Support rapid user classification for the recommendation engine.
4. Provide clear, friendly copywriting that sets emotional tone.
5. Use animations sparingly to add delight, not distraction.
6. Ensure all interactions are efficient (few taps/clicks).

---

# 3. **Design Principles**

### **Whimsical Minimalism**

* Use storybook elements as accents (not full-screen artworks).
* Prioritize clarity, white space, and clean layout.
* Soft, friendly interactions.

### **Friendly Guidance**

* Copywriting uses a warm, conversational tone.
* Avoid jargon or pressure.

### **Accessibility**

* Minimum font 14–16px body text.
* Color contrast ratio WCAG AA.
* All interactive elements ≥ 44px height.

### **Delightful Microinteractions**

* Soft pops on selection.
* Gentle animated fox mascot on reading-level slider.
* Light sparkles during loading screen.

---

# 4. **CORE COMPONENTS (USED THROUGHOUT)**

### 4.1 Buttons

**Primary Button**

* Height: 48px
* Border radius: 14–20px
* Fill: Forest Moss Green (#3B593B)
* Text: White
* Hover: Slight lighten
* Pressed: 95% scale

**Secondary Button**

* Outline: 1.5px Tea Green
* Transparent background
* Hover: Shade fill < 10%

---

### 4.2 Chips (Selectable Tags)

* Rounded pill shape
* Height: 32–40px
* States:

  * Default: soft neutral background
  * Selected: Tea Green fill, white text
  * Disabled: 40% opacity
* Animation: scale from 1 → 1.05 on selection

---

### 4.3 Search Field

* Height: 48px
* Rounded corners (12–16px)
* Left icon: search
* Placeholder text: “Search for a book”
* Debounce: 200ms

---

### 4.4 Card Component (Books)

* Vertical layout
* Thumbnail: 56–72px height
* Title and author below
* Selected state:

  * 6px glow (Cozy Amber ~20% opacity)
  * Checkmark overlay
  * Added to “Bookshelf Row” component

---

### 4.5 Slider Component (Reading Level)

* Track: Soft Woodland Brown (#8A6B45)
* Thumb: Circular, slightly glossy
* Trail fill: Tea Green
* Tick marks for levels 1–10
* Live description text updates below

**Fox Animation Asset:**

* Fox sprite sheet or Lottie animation moving from left → right
* States:

  * Level 1: lounging fox holding tiny book
  * Middle levels: fox climbing book stack
  * Level 10: dizzy fox animation

---

---

# 5. **ONBOARDING FLOW (SCREEN-BY-SCREEN SPECS)**

This is the core engineering & design implementation section.

---

# **SCREEN 1 — Welcome**

### Purpose

Establish warm tone; no user input.

### Layout

* Top: Illustration (forest clearing + fox)
* Center:

  * **Title:** “Welcome, traveler.”
  * **Subtitle:** “The Library of Endless Tales awaits you.”
* Bottom: Primary Button: **Begin**

### Animation

* Fade-in of illustration (300ms).
* Slight parallax on scroll-enabled devices.

### Backend data:

None required.

---

# **SCREEN 2 — Likes**

### Purpose

Collect positive preferences: genre, tone, style.

### Layout

**Title:** “What do you love in the stories you read?”
**Subtitle:** “Select everything that brings your imagination to life.”

**Component:** Tag chips (multi-select).

**Sections:**

* Genres
* Tone & Mood
* Style Preferences
* Free Input ("Something else…")

### Behavior

* Users may select zero or many chips.
* Free input expands into a text field.

### Animations

* Chips pop on selection (scale 1 → 1.05).
* Tiny sparkles appear above newly selected chips (optional).

### Backend Output

```
likes: {
  genres: [],
  tones: [],
  styles: [],
  custom: string | null
}
```

---

# **SCREEN 3 — Dislikes**

### Purpose

Collect negative preference data.

### Layout

**Title:** “And what dims your spark?”
**Subtitle:** “Select anything you usually avoid — genres, themes, pacing, length, or tone.”

Content sections identical to Likes, but with more clarity.

### Backend Output

```
dislikes: {
  genres: [],
  themes: [],
  pacing: [],
  lengths: [],
  styles: [],
  custom: string | null
}
```

---

# **SCREEN 4 — Books You Loved**

### Purpose

Gather strong positive signals.

### Layout

**Title:** “Which books have stayed with you?”
**Subtitle:** “Add a few favorites – this helps us understand your taste deeply.”

**Elements:**

* Search bar
* Search results list (book cards)
* “Favorite Shelf” (horizontal scroll)

### Interaction

* Tap book to select → card animates into shelf.
* Optional star rating appears after selection.

### Backend Output

```
books_loved: [
  {
    title: string,
    author: string,
    rating: number | null
  }
]
```

---

# **SCREEN 5 — Books You Didn’t Enjoy**

### Purpose

Negative reinforcement signal for recsys.

### Layout

**Title:** “Which books didn’t resonate with you?”
**Subtitle:** “Select one or two if you'd like.”

**Components:**

* Search + card selection
* Card expansion → Tag list:

  * “Too slow”
  * “Too confusing”
  * “Not my genre”
  * “Writing style didn’t fit”
  * “Characters felt flat”
  * “Too long”

  - Free input

### Backend Output

```
books_disliked: [
  {
    title: string,
    author: string,
    reasons: []
  }
]
```

---

# **SCREEN 6 — Intent**

### Purpose

Determines personalization strategy and tone.

### Layout

**Title:** “What brings you on this reading journey?”
**Subtitle:** “Tell us what you hope to grow, discover, or enjoy.”

**Components:**
Large tappable cards with icons.

**Options:**

* Build a steady reading habit
* Explore new genres
* Increase reading level
* Read more consistently
* Relax & escape
* Learn deeply
* Strengthen focus
* Improve comprehension
* All of the above

### Backend Output

```
intent: []
```

---

# **SCREEN 7 — Reading Level Slider**

### Purpose

Capture user’s comfort + aspiration for book difficulty.

### Layout

**Title:** “How challenging do you like your books?”
**Subtitle:** “Choose the level that feels most comfortable. Every journey is unique.”

**Components:**

* Horizontal slider (1–10)
* Live descriptive text
* Book stack illustration
* Fox animation synced to slider tick

### Behavior

* When slider moves, book stack height adjusts.
* Fox climbs accordingly.
* At Level 1: lounging fox
* At Level 10: dizzy fox

### Reading Level Descriptions

(Displayed dynamically)

1 — Very light & simple
2 — Easy, comforting reads
3 — Casual, quick stories
4 — Standard fiction difficulty
5 — Engaging but accessible
6 — Richer worlds & ideas
7 — Complex plots & themes
8 — Dense or literary
9 — Advanced, challenging reads
10 — Very dense or scholarly

### Backend Output

```
reading_level: number
```

---

# **SCREEN 8 — Loading Screen**

### Layout

* Illustration: fox librarian, floating books, fireflies
* Text cycling:

1. “Gathering your tales…”
2. “Consulting the wise owl…”
3. “Dusting off ancient tomes…”
4. “Collecting stories from the forest…”

### Animation

* Particle sparkle
* Ladder movement loop (optional)

### Backend

* Generate personalized book recs
* Create initial user embedding
* Setup account defaults

---

# **SCREEN 9 — Home Introduction**

### Layout

**Title:** “Your personal library awaits.”
**Subtitle:** “Stories chosen for you, traveler.”

**Button:** Enter Library

**No major animations**, keep this clean.

---

# 6. **DATA MODEL OUTPUT (FOR ENGINEERS)**

Final aggregated onboarding payload:

```
{
  likes: { ... },
  dislikes: { ... },
  books_loved: [],
  books_disliked: [],
  intent: [],
  reading_level: number
}
```

Send to:
`POST /api/onboarding/complete`

---

# 7. **ILLUSTRATION SPEC (FOR DESIGNERS / ARTISTS)**

### Style

* Watercolor
* Soft edges
* Warm lighting
* Very light textures
* Avoid full-bleed illustrations

### Required Assets (Minimal Set)

1. Forest clearing + fox (Welcome)
2. Hanging lantern (Likes/Dislikes icon header)
3. Book shelf glow (Loved books)
4. Cloudy book (Disliked books)
5. Fox climbing book stack (Reading Level — 10 poses or Lottie)
6. Fox librarian + ladder (Loading screen)

---

# 8. **ACCESSIBILITY**

* All text ≥ 14px body, 24–32px headings
* Buttons ≥ 44px height
* High contrast text-on-background
* Motion reduction mode:

  * Disable parallax
  * Replace fox animations with static images

---

# 9. **DEVELOPMENT NOTES**

### Performance

* Preload small illustration assets
* Lazy-load large images after user passes screen 2
* Use Lottie for fox animations (lightweight)

### State Persistence

If user exits onboarding, always return them to last completed screen.

### Offline Handling

Search requires network — show fallback:
“This search requires an internet connection.”


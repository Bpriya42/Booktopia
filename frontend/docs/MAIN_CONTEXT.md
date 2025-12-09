# 📘 **BOOKTOPIA — MASTER UX/UI SPECIFICATION DOCUMENT (v2 FINAL)**

# 1. **PRODUCT SUMMARY**

Booktopia is a whimsical, storybook-inspired reading companion app built to help users:

- Build consistent reading habits
- Receive deeply personalized recommendations
- Track progress through magical visual metaphors
- Take smart notes, highlight quotes, reflect, and gain insights
- Compare books and extract cross-book learnings
- Experience a cozy, fantastical journey filled with growth and rewards

The UI is defined by **Whimsical Minimalism**:

soft art, warm tones, magical accents — layered over a clean, modern interface.

---

# 2. **DESIGN PHILOSOPHY**

## **2.1 Whimsical Minimalism**

Booktopia blends:

- Minimal, breathable layouts
- Warm neutrals
- Soft watercolor illustrations
- Magical details (glows, sparkles, creatures, growth)
- Modern usability

Whimsy enhances function, never competes with it.

---

## **2.2 Emotional Principles**

Every screen should feel:

- Cozy
- Encouraging
- Calming
- Magical in small ways

Never stressful, overwhelming, or judgmental.

---

## **2.3 UX Principles**

- Clarity first
- Low friction
- Friendly guidance
- Micro-delight
- Accessible for all
- All features must feel like part of a fantasy journey

---

# 3. **GLOBAL DESIGN SYSTEM**

## **3.1 Color Palette**

**Primary**

- Forest Moss Green (#3B593B)
- Tea Green (#6FA96F)
- Woodland Brown (#8A6B45)

**Accents**

- Cozy Amber (#E1A85A)
- Dusty Blue (#90A7C4)
- Petal Pink (#E7C0C8)

**Neutrals**

- Mushroom Cream (#F8F3E6)
- Soft Paper (#FCFAF4)
- Ink Black (#2D2D2D)

Rules: backgrounds neutral; accents for whimsy; greens for primary.

---

## **3.2 Typography**

**Headings**: Literata / Cormorant Garamond

**Body**: Inter or Nunito

Sizes:

- H1: 28–32px
- H2: 22–26px
- Body: 16–18px
- Caption: 14px

---

## **3.3 Components**

- Rounded cards (12–20px radius)
- Minimal line icons w/ slight wobble
- Chip selectors w/ pop animation
- Large tappable cards for key actions
- Slider for reading level (fox animation)

---

## **3.4 Illustration Guidelines**

- Watercolor
- Soft lighting
- Organic shapes
- Fox mascot + whimsical creatures
- No full-bleed backgrounds except onboarding

Areas illustrations appear:

- Onboarding
- Empty states
- Journey / achievements
- Notes intro
- Minor accents in home header

---

## **3.5 Motion**

- Soft ease-in-out
- Subtle sparkles
- Fox climbing animation
- Plants growing animation (Journey)
- Parallax < 6px

---

# 4. **FEATURE-BY-FEATURE UX SPECIFICATION (UPDATED)**

---

# 🌳 **4.1 HOME SCREEN**

### Purpose

Central hub showing recommendations, progress, and access to the library.

### Layout

```
Header:
  - Greeting (“Good evening, traveler.”)
  - Small whimsical illustration (fox under lantern)

Section 1: Continue Reading Card
  - Cover
  - Session stats
  - Resume button

Section 2: Recommendations
  Carousels:
    - Because you liked…
    - Based on your reading level…
    - Cozy picks for tonight…
    - New & trending…
    - Highly recommended for YOU (AI ranking included)

Section 3: Daily Goal Progress
  - Plant growth or lantern glow metaphor

Section 4: NEW — “Story Seeker”
  - Search by: Book name, author, OR upload a book cover image
  - Returns full **Book Detail Page (4.6)** + recommendation score
  - Purpose: For bookstore browsing or exploring random finds

```

### NEW Behavior: Book Recommendation Score

Every book detail includes:

- Match % to user profile
- Reasons why it fits (based on likes, level, themes)
- Who it’s ideal for

---

# 📚 **4.2 LIBRARY SCREEN (UPDATED)**

Sections:

- **Want to Read**
- **Currently Reading**
- **Finished**

### NEW RULES BASED ON YOUR NOTES:

### **Want to Read**

Every book displays what is shown in **4.6 Book Details**:

- Cover
- Title, author
- Genre
- Recommended level vs. user level
- AI match score

### **Currently Reading**

Each book card now includes:

- User’s notes
- Highlights
- Favourite quotes
- Reflections written so far
- % progress

Visual: indicator for number of notes (“3 notes”, “1 reflection”).

### **Finished**

Each book card displays:

- All notes
- All reflections
- Highlighted quotes
- Favourite passages
- Optional rating
- Completion date
- Summary card (“What you learned”, “Your themes”)

---

# 📖 **4.3 READING MODE (UPDATED)**

### Layout

- Full-screen reading
- Neutral paper texture
- Minimal UI
- Toolbar appears on tap

### Tools:

- Notes
- Highlights
- Favourite Quote toggle ("★")
- Bookmark
- Font options
- Timer start

### When Timer Ends → Reflection Prompt

After each session the user sees:

**Modal Title:**

“How did today’s reading feel?”

**Reflection Questions (rotating):**

- What stood out to you today?
- Did anything surprise you?
- What emotion did the reading evoke?
- Did you learn something new?
- Which quote resonated most?
- What do you predict will happen next?

User can type OR tap “Skip”.

### Reflections Storage

Reflections automatically attach to:

- the specific book
- the session date
- the user’s notes archive

You specified:

> When the user goes into their library and revisit their books, these reflections must be provided under it.
> 

**This is implemented in Library > Currently Reading / Finished.**

### Highlights Workflow

User selects text → options appear:

- “Add Note”
- “Favourite Quote”
- “Highlight Only”
    
    Each highlight stores:
    
- text
- book
- page (optional)
- date

---

# 📝 **4.4 NOTES & REFLECTIONS (UPDATED)**

This is a major part of Booktopia and has been expanded per your notes.

### Notes Home Layout

Two tabs:

### **1. Notes & Highlights**

List of:

- Highlighted quotes
- Notes
- Reflection responses
- Tags (auto or manual)
- Book attribution
- Page number
- Favorite star

### **2. Insights Hub (Future Phase)**

A dedicated area for:

- Drawing insights
- Comparing books
- Discovering themes that connect books
- AI-assisted cross-book analysis (“Insight Summaries”)

### Notes Features

- Markdown-lite editor
- AI-enhanced “Summarize my notes for this book”
- AI-assisted “Compare these two books”
- Smart grouping by:
    - Book
    - Theme
    - Emotion
    - Tag

---

# ✨ **4.5 JOURNEY / ACHIEVEMENTS (UPDATED FINAL)**

The metaphor is now officially:

## **A Magical Garden with Whimsical Creatures**

### Purpose

Visualize user’s reading growth in a magical, narrative way.

### Elements

- Plants grow as reading hours accumulate
- Sparkling animations when milestones unlock
- Magical creatures appear at key achievements
- Badges represented as garden icons
- Soft glows + ambient magical particles

### UI

- Horizontal scrollable path through a **storybook forest garden**
- Achievements appear as:
    - glowing seeds
    - blooming plants
    - returning creatures
- Tap achievement → modal with:
    - What it means
    - What user did
    - Visual reward
    - Message from fox mascot

### Examples:

- 7 days reading streak → “Hatchling Owl returns to your garden”
- 5 hours reading done → “First sprout blooms!”
- 100 highlights added → “Firefly swarm joins your journey”

---

# 📖 **4.6 BOOK DETAILS (UPDATED)**

### Layout

- Cover
- Title + author
- Genre + themes
- Difficulty level (vs. user’s level)
- Reading length
- Summary

### NEW: Personalized Recommendation Block

**Section Title:**

“Is this book a good match for you?”

**Content:**

- Match Score: **0–100%**
- Reasoning tags:
    - “Matches your love of cozy writing”
    - “Aligned with your reading level”
    - “Similar to books you enjoyed”
- Reasons it may NOT match (if < 50% match)

### Actions

- Add to Library
- Start Reading
- Save for Later
- Mark as Favorite
- See Similar Books

---

# 🔍 **4.7 THE “STORY SEEKER” TOOL (NEW FEATURE)**

This is Booktopia’s **smart search + recommendation engine in one tool**.

Accessible from Home.

### User Inputs:

- Book name
- Author
- OR upload / take a picture of a book cover

### Output:

Directly returns **the full Book Details Screen (4.6)**

PLUS:

- Match Score
- Why it fits the user
- Reading level comparison
- Similar alternatives

Use case:

User is in a bookstore → uploads a book cover → Booktopia tells them if the book fits their tastes.

---

# 🔍 **4.8 GLOBAL SEARCH (General Catalog Search)**

Separate from Story Seeker.

- General search through database
- No personalized match score unless book is opened ( Phase 1 )
- Include personalized match in (Phase 2)

---

# 🌿 **4.9 SETTINGS & PROFILE**

Includes:

- Reading preferences
- Genre preferences
- Theme preferences
- Animation intensity (“Reduce Motion”)
- Account info
- Privacy & data

---

# 5. **INFORMATION ARCHITECTURE (UPDATED)**

```
Home
 ├── Continue Reading
 ├── Recommendations
 ├── Daily Goal
 ├── Story Seeker (image/text search)
Library
 ├── Want to Read (detailed book cards)
 ├── Reading (notes, highlights, reflections)
 ├── Finished (full insights)
Journey
 ├── Magical Garden
 ├── Achievements
Notes
 ├── Notes & Highlights
 ├── Reflections
 └── Insights Hub (Phase 2)
Story Seeker (Standalone tool)
Profile / Settings
 ├── Preferences
 ├── Reading Level
 ├── Account
 └── Accessibility

```

---

# 6. **ENGINEERING REQUIREMENTS (UPDATES)**

### Frontend React + Vite

- Components from ShadCN
- Illustrations via Lottie or webp
- State storage of:
    - highlights
    - reflections
    - notes
    - match scores
- Optical character recognition if user uploads book image (via Tesseract or cloud API)

### Backend FastAPI

- Personalized recommendation endpoint must accept:
    - user embedding
    - book embedding
    - previously loved/disliked books
    - reading level
- Reflection saving
- Highlight saving (text + page)
- Book comparison (later phase)

---

# 7. **AI AGENT CONTEXT RULES (FINAL)**

AI agents generating UI or backend must:

1. Follow Whimsical Minimalism design philosophy.
2. Use the metaphors and structures in this document.
3. Maintain the fox mascot behavior & magical garden visuals.
4. Ensure all UX flows match what’s defined here.
5. Ensure every book detail includes a personalized recommendation block.
6. Respect the structure of Notes, Highlights, Reflections, and Insights.
7. Implement Story Seeker as described.
8. Keep copywriting warm, calm, and whimsical.
9. Do not invent new creatures or metaphors outside the garden theme.
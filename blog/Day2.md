Day 2 – Shipping Onboarding (and treating Cursor like a real teammate)

---

What did I work on today?

- Today was all about **turning the giant UX spec into a real onboarding flow** for Booktopia.
- I created UX docs with the help of Open AI GPT 5.1 model. I provided my specifications, exact requirements and was as detailed as possible. This allowed me to create a UX document that provided instructions to designers, engineers, UI developers etc. 
- I read through the onboarding and main UX docs carefully and treated them like a product requirements doc, not just inspiration.
- I wired up a proper **routing structure** with React Router so onboarding lives under `/onboarding/*` instead of being bolted onto the home page.
- I designed and implemented all **nine onboarding screens**:
  - Welcome  
  - Likes  
  - Dislikes  
  - Books you loved  
  - Books you didn’t enjoy  
  - Intent / goals  
  - Reading level slider  
  - Loading (where the backend runs personalization)  
  - Home intro / completion
- I added a **Zustand store** to hold the whole onboarding payload in one place so each screen is just responsible for its own slice of state.
- I implemented the `/api/onboarding/complete` client call and wired the Loading screen to POST the full payload, then send the user into the main app.
- I also ended up doing a small detour: **fixing Tailwind + PostCSS for v4**, cleaning up `index.css`, and smoothing over some Supabase + TypeScript issues so the app would actually boot reliably.

How I approached the problem

- I started by treating the UX docs as the “source of truth” and extracted the **data model** from the spec first:
  - `likes`, `dislikes`, `books_loved`, `books_disliked`, `intent`, `reading_level`.
  - I made a single `OnboardingData` type and built everything around that instead of letting each screen invent its own shape.
- From there I sketched the **information architecture in code**:
  - `OnboardingLayout` with a top progress bar + Back button.
  - Nested routes under `/onboarding` for each screen.
  - A dedicated `Home` page instead of trying to cram onboarding logic into `App.tsx`.
- I was pretty strict about **separation of concerns**:
  - The Zustand store only manages data + current step.
  - Screens focus on UI + calling store methods.
  - `onboardingApi` handles just the HTTP calls.
- For the UI, I tried to balance **faithfulness to the spec** with **actually shippable**:
  - I kept the “Whimsical Minimalism” vibe: warm background, cozy greens, rounded cards, gentle shadows.
  - Where the spec called for animations (fox, bees, particles, etc.), I replaced them with simple emoji + subtle CSS motion, since I deliberately skipped the heavy animation work for now.
- I kept reminding myself: this is an MVP of the flow. The point is that **the journey works end‑to‑end**, not that every pixel and animation is perfect on Day 2.

How I designed the onboarding UX in code

- I mirrored the spec almost 1:1 in the UI:
  - **Welcome**: simple hero, fox + forest emoji, single “Begin” CTA.
  - **Likes / Dislikes**: pill chips for genres, tones, styles, etc. with soft highlight states and a “Something else…” text input for custom answers.
  - **Books Loved / Disliked**: search field + mock results for now, with a visual “shelf” for favorites and a reasons modal for disliked books.
  - **Intent**: big tappable cards with icons (📅, 🗺️, 📈, etc.), including the “All of the above” option that behaves specially.
  - **Reading Level**: slider from 1–10 with a vertical book‑stack visualization and friendly copy (“Engaging but accessible”, etc.).
  - **Loading**: rotating whimsical status messages (“Gathering your tales…”) while the app POSTs onboarding data.
  - **Complete**: “Your personal library awaits.” + a preview of what the user can do next.
- I integrated a **step counter + progress bar** at the top, which really helps the flow feel structured:
  - It hides on the Welcome + Complete screens so those moments feel distinct.
  - Everything else shows “Step X of 7” with a growing green bar.
- I was careful with **button states**:
  - Disable Continue when intent is empty, for example.
  - Provide “Skip for now” on the book selection screens, which matches the spirit of “low friction” in the spec.

How I handled the engineering details

- **State management**:
  - I used Zustand instead of Redux or prop drilling because it keeps things simple and ergonomic for this kind of wizard.
  - Each screen uses selectors so it only re‑renders on its own slice of state.
  - The store exposes a `resetOnboarding` method so finishing the flow cleans things up.
- **API integration**:
  - I added `onboardingApi.completeOnboarding(data)` that POSTs to `/api/onboarding/complete` using the existing `api` client.
  - The Loading screen owns the responsibility of calling that, handling loading/error states, and eventually routing to `/onboarding/complete`.
- **Tooling / infra fixes**:
  - Tailwind 4 broke the old PostCSS config, so I:
    - Installed `@tailwindcss/postcss`.
    - Updated `postcss.config.js` to use the new plugin.
    - Simplified `index.css` to match the new Tailwind import style instead of the older `@tailwind base; @tailwind components; @tailwind utilities;` with `@apply` overrides.
  - Supabase types changed slightly, so I fixed the `useAuth` hook to import types as `import type { User, Session }` and made the Supabase client more forgiving when `.env` isn’t set (log a warning instead of crashing the whole app).

How I wrote the documentation

- After wiring everything up, I forced myself to step back and **document the flow as if I were onboarding a new engineer**.
- I created:
  - `ONBOARDING_IMPLEMENTATION.md` – a technical overview:
    - Architecture (routes, Zustand store, API layer).
    - Data model.
    - Screen‑by‑screen behavior.
    - How to run and test the flow.
  - `frontend/docs/ONBOARDING_FLOW.md` – more of a UX/IA document:
    - An ASCII‑style flow diagram showing each screen and what happens.
    - Which data gets collected where.
    - Navigation rules (when Back/Skip are allowed, etc.).
  - `ONBOARDING_COMPLETE.md` – a kind of “release note” for myself:
    - What’s implemented.
    - What’s still mocked or left for later (e.g., real book search API, illustrations).
- Writing these forced me to check that the implementation actually matched the original spec:
  - Every screen in the doc has a corresponding route.
  - The final payload shape matches the spec’s “Data Model Output”.
  - The copywriting is warm, non‑judgmental, and consistent with the “traveler / library” framing.

What I learned today

- Having a detailed UX spec is amazing, but it only pays off if I **translate it into a clean mental model and data model first**. Once I had `OnboardingData`, every screen felt obvious instead of chaotic.
- **Zustand and why state management matters**: Zustand is a small state management library for React—a lightweight alternative to Redux or Context API for sharing state across components. But this got me thinking: why do we need state management libraries like Redux or Zustand in the first place?
  
  The problem they solve is **sharing data between components that aren't directly connected**. In my onboarding flow, I have 9 different screens that all need to read and write the same data (likes, dislikes, books, intent, reading level). Without state management, I'd have to either:
  - **Prop drill** everything down through every component (messy and error-prone)
  - **Use React Context** (works but can cause unnecessary re-renders)
  - **Keep everything in local state** (data gets lost when navigating between screens)
  
  Zustand gives me a **single source of truth** that any component can access. Each screen just calls `useOnboardingStore()` to read/write data, and the store handles all the complexity. When the user clicks "Continue" on the Likes screen, that data persists even when they navigate to Dislikes, Books Loved, etc. By the time they hit the Loading screen, all 9 screens have contributed their piece, and I can submit the complete payload to the backend.
  
  The key insight: state management isn't about complexity—it's about **making data flow predictable and maintainable**. Zustand's tiny footprint (1KB vs Redux's 10KB+) makes it perfect for flows like this where I need shared state but don't need the full Redux ecosystem.
- Tooling will absolutely get in the way (Tailwind 4, PostCSS, Supabase envs), but fixing it properly once is better than fighting random dev‑server errors all week.
- Treating the docs as part of the feature—not an afterthought—actually made the implementation better. Writing `ONBOARDING_IMPLEMENTATION.md` surfaced a few missing details I went back and cleaned up.
- Most importantly: this was the first day Booktopia started to **feel like a real product**, not just a nice idea in `CONTEXT.md`. Walking through the onboarding in the browser, even with placeholder emojis, was a big morale boost.



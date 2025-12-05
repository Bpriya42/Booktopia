1. Came up with project idea 

Why - I was tired of feeling like I was only leetcoding. I lost the fun of building and wanted to get back to it. So I combined the things I love and took on the challenge to build something I will use every day and love and be proud of.

What do I hope to gain?

Lets start with the technical ways I will gain:

- I am already a Cursor user but I want to seriously optimize my SDE process and treat AI like a real pair programmer, not a crutch.
- I want to learn how to design and build AI systems that I can improve and fine tune over time, not just call an API.
- I want to build something scalable and actually use my theoretical knowledge (distributed systems, DB design, embeddings, RAG, etc.) instead of just keeping it in my head.

Personally - I want to be a better developer. I want to build something that combines my creativity, love for reading, and tech skills. I also want a project that feels like *me* — not just another tutorial app or yet another LeetCode grind.

What's the plan 

Provide a summary of my idea and what I want to build, and what the end product should look like.  
The app is **Booktopia** — an AI-powered reading companion that helps me (and other readers) rebuild a consistent reading habit with:
- AI-powered book recommendations
- A fantasy-themed “reading journey” with an avatar that levels up as I read
- Notes + AI summaries and insight generation
- A focus mode timer to track real reading time
- A light social layer (friends, groups, gentle accountability)

Architecturally, I’m building this as:
- **frontend**: Vite + React + TypeScript + Tailwind + shadcn/ui  
- **backend**: FastAPI + Postgres (Supabase) + pgvector  
- **ai**: a clean LLM abstraction that hides Hugging Face / future providers behind one interface.  

I also want to update my journey in these blog posts so I can look back and see how my thinking and skills evolved, not just the final product.

Whats the plan for the next week?

Rough 1‑week plan (this will probably change, but that’s fine):

- **Day 1–2**:  
  - Lock in the idea and constraints (done).  
  - Set up repo, project structure (`/frontend`, `/backend`, `/ai`).  
  - Get the base React + FastAPI projects running end‑to‑end locally.  
- **Day 3–4**:  
  - Set up Supabase (auth + Postgres + pgvector).  
  - Define initial DB schema for users, books, notes, reading sessions.  
  - Wire the backend to Supabase and expose a few basic health/test endpoints.  
- **Day 5–6**:  
  - Build a simple UI: auth flow placeholder, a basic “home” dashboard, and a minimal reading journey screen.  
  - Add the first AI integration (probably note summarization or a very basic recommendation prototype).  
- **Day 7**:  
  - Clean up rough edges, write docs, and reflect on what worked / what didn’t.  
  - Plan the next iteration based on what actually feels fun and useful in the MVP.

What did I do today?

- Finalised the core idea for Booktopia and why I care about it.  
- Set up git and the basic project structure with separate `frontend`, `backend`, and `ai` folders.  
- Added a `CONTEXT.md` to “teach” Cursor how I want the architecture and tech stack to look so future code generation stays consistent.  
- Bootstrapped the frontend with Vite + React + TypeScript and started wiring in Tailwind + shadcn/ui.  
- Set up the backend skeleton with FastAPI, config, DB layer, and an AI abstraction that can talk to Hugging Face later.  
- Wrote this Day 1 blog so I don’t lose the emotional context of *why* I’m doing this.

What did I learn today?

- Having a clear **architecture upfront** (frontend/backend/ai + Supabase + pgvector) makes every decision easier; I’m not randomly installing libraries anymore.  
- Cursor is way more powerful when I give it a good `CONTEXT.md` and treat it like a collaborator instead of just asking for snippets.  
- Even simple setup work (project structure, env files, docs) feels a lot more meaningful when it’s tied to something I actually want to use every day.  
- Tailwind / tooling can be annoying at first (hello `npx` issues), but once it’s set up, it unlocks a lot of speed for UI work.  
- Most importantly: I miss building things for fun, and this project already feels like a step back towards that. 

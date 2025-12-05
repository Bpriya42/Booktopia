📚 Booktopia — Master Project Context

You are an AI coding assistant helping build Booktopia, an AI-powered reading companion app designed to help users rebuild their reading habit through personalized book recommendations, an immersive fantasy-themed reading journey, and social motivation features.

You must always operate within the project architecture, tech stack, and coding principles defined below unless explicitly instructed otherwise.

🧠 Project Overview
Purpose

Booktopia helps users:

Improve reading consistency

Explore new genres and ideas

Receive personalized book recommendations

Take notes, extract insights, and connect concepts across books

Visualize their reading journey through a fantasy avatar that grows with them

Connect with friends and join groups

Track reading time via a focus mode timer

Core Features

AI-Powered Book Recommendations

Reading Notes + AI Insight Generation

Fantasy-Themed Avatar Progression

Social Layer (Friends, Groups, Shareables)

Focus Mode / Reading Timer

Your job is to help implement the frontend, backend, database models, APIs, and AI pipeline that support these features.

🧱 Tech Stack
Frontend

Vite + React + TypeScript

React Router

Tailwind CSS

shadcn/ui

TanStack Query (React Query)

Optional: Zustand for lightweight global state

The frontend communicates exclusively with the FastAPI backend via HTTP/JSON.

Backend
Core

Python + FastAPI (async)

Pydantic v2 for request and response models

uvicorn for development server

Database

Supabase Postgres (free tier)

pgvector extension for embeddings

SQLAlchemy (async) or SQLModel (recommended)

Migrations via Alembic (if needed)

Storage

Supabase Storage buckets for user avatars, images, assets

Authentication
Primary Method — Supabase Auth (GoTrue)

Frontend:

Uses Supabase JS client for sign-up, login, session management.

Backend:

Validates Supabase JWTs via Authorization: Bearer <token>

Extracts user ID from JWT for protected routes

Uses PyJWT or python-jose for verification

No paid/Auth SaaS (Clerk/Auth0/etc.) unless explicitly requested.

AI / LLM Layer

Booktopia uses open-source AI first, with the option to upgrade later.

Model Providers

Initial provider: Hugging Face open-source models

Future provider: OpenAI or others

Provider must be swappable via an abstraction.

LLM Abstraction

All AI interactions run through a backend class:

class LLMClient(Protocol):
    async def generate_text(self, prompt: str, **kwargs) -> str:
        ...

    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        ...

Uses

Book recommendations

Note summarization

Insight generation

Cross-book idea linking

Embedding text for pgvector search

Frontend must never call LLM APIs directly.

⚙️ Architecture & Design Principles
Frontend Guidelines

Use React Query for server caching and API state.

Organize API wrappers into an /api client layer.

Keep business logic in custom hooks.

Prefer functional components.

Keep global state minimal.

Use TypeScript strict mode.

Backend Guidelines

Use layered architecture under /app:

app/
  routers/      # FastAPI route definitions
  schemas/      # Pydantic models
  models/       # SQLAlchemy/SQLModel database models
  services/     # Business logic
  llm/          # LLMClient + HF/OpenAI implementations
  db/           # DB session, migrations, init logic


Endpoints should be thin; move logic to services.

Use FastAPI dependencies for:

Database sessions

Auth/JWT user extraction

Keep routes async.

Validate all data using Pydantic.

Do not mix business logic into route files.

Database Guidelines

Keep schema simple and extensible.

Index foreign keys (e.g., user_id).

Use pgvector for embeddings.

Optimize search through embeddings for RAG pipelines.

AI / LLM Guidelines

All prompts should be modular and reusable.

Keep LLM provider swappable.

Maintain deterministic structures when possible in responses.

Store embeddings consistently across model versions.

Support mock LLM providers for local fast testing.

🧪 Code Generation Guidelines

When generating any code, you must:

1. Follow the tech stack exactly

Do not introduce alternatives unless asked.

2. Use idiomatic patterns

React + TypeScript conventions

FastAPI async patterns

SQLAlchemy/SQLModel patterns

Pydantic v2

3. Provide file paths

Whenever generating code, specify where files should live.

Example:

frontend/src/api/user.ts
backend/app/routers/auth.py

4. Keep code modular

Avoid placing API logic inside React components or route handlers.

5. Add types/validation everywhere

TypeScript strict mode

Pydantic models

Typed return values

6. Parameterize configuration

Do not hardcode secrets, model names, or URLs.

7. Ask for clarification

If parts of the system are underspecified, ask before assuming.

8. Use open-source friendly defaults

Avoid proprietary libraries unless explicitly approved.

🎯 MVP Requirements

Booktopia’s MVP must include:

* Supabase Auth onboarding

* User preferences (likes/dislikes/goals)

* Basic book recommendation endpoint using HF models

* Notes with AI summarization

* Reading session tracking (focus timer)

* Minimal journey progression (levels, badges, points)

Clean, responsive UI* 

The AI assistant must guide code generation accordingly.
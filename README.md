# 📚 Booktopia — Read Better. Grow Faster. Enjoy the Journey.

Booktopia is a personal reading-companion app designed to help readers rebuild (or elevate) their reading habit through **AI-powered personalization**, a **visual fantasy-themed journey**, and **social motivation**.  
It combines recommendations, progress tracking, insight-taking, and a playful RPG-style progression system to make reading meaningful and fun again.

## 🚀 Quick Start

```bash
# 1. Set up and start the backend
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
# Configure .env file (see SETUP_GUIDE.md)
python run.py

# 2. Set up and start the frontend (new terminal)
cd frontend
npm install
# Configure .env.local file (see SETUP_GUIDE.md)
npm run dev
```

**📖 For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

**🗄️ For Supabase configuration, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

---

## 🎯 Vision & Goals

Booktopia aims to:
- Help people **return to reading** and build consistent habits.  
- Make it easy to **explore new genres, ideas, cultures**, or specific reading goals.  
- Provide **AI-powered insights**, notes, and connections across books.  
- Visualize the user’s reading journey as a **fantasy adventure** with character progression.  
- Enable social motivation through **friends, groups, and shared journeys**.

---

## ✨ Core Features

### **1. AI-Powered Book Recommendations**
Booktopia helps readers find the *right* books—not just popular ones.

Inputs:
- User likes/dislikes  
- Books already read  
- Reading goals (explore new genres, read more romance, dive into tech, etc.)
- Optional Goodreads import

How recommendations work:
- Uses **RAG (Retrieval-Augmented Generation)** to gather context from:
  - Reddit threads  
  - Goodreads reviews  
  - Book summaries  
  - User notes  
- Analyzes the user’s **reading level**, preferences, and goals.  
- Produces **Top 3 tailored book recommendations** for the user’s home screen.  
- Also shows a list of **similar alternative books**.

The system ensures recommendations:
- Align with goals  
- Fit reading level  
- Avoid previously read content  
- Avoid dislikes  
- Are exciting but *not intimidating* or boring  

---

### **2. Reading Journey (Fantasy-Themed Visualization)**
The heart of Booktopia.

Users will:
- Track current reading progress  
- Take notes and highlight insights  
- Connect ideas across different books  
- Let AI help summarize insights or draw conceptual links

Fantasy RPG layer:
- Each user creates a **custom fantasy avatar**
- As they read:
  - They gain attributes, abilities, costumes, visual upgrades
  - Their “world map” expands  
  - Their reading journey becomes a literal visual adventure  

This feature blends productivity with **playful visual motivation**.

---

### **3. Social Layer**
Reading is better together.

Users can:
- Add friends  
- Join reading groups  
- Share insights and progress  
- Compare character growth  
- Show off their avatar upgrades  
- Share achievements on social media (optional)

The goal is **gentle accountability + inspiration**, not competition.

---

### **4. Focus Mode**
A minimalist reading timer to:
- Track reading sessions  
- Accumulate XP or avatar progress based on time  
- Encourage consistent daily practice  

---

## 🧱 Tech Stack

### Frontend
- **Vite + React + TypeScript**
- **Tailwind CSS** + shadcn/ui for styling
- **React Router** for navigation
- **TanStack Query** (React Query) for data fetching
- **Supabase JS** for authentication
- **Zustand** for state management (optional)

### Backend
- **FastAPI** (Python async web framework)
- **Pydantic v2** for data validation
- **SQLAlchemy** (async) for database ORM
- **Supabase** for authentication & database
- **pgvector** for AI embeddings

### Database
- **Supabase Postgres** with pgvector extension
- Row Level Security (RLS) enabled
- Vector similarity search for AI features

### AI/LLM
- **Hugging Face** open-source models (initial)
  - Text: Mistral-7B-Instruct
  - Embeddings: all-MiniLM-L6-v2
- Swappable provider architecture (OpenAI support ready)
- Custom RAG pipeline for recommendations

---

## 📂 Project Structure

```
Booktopia/
├── frontend/          # React + TypeScript app
│   ├── src/
│   │   ├── api/      # API client functions
│   │   ├── components/ # React components
│   │   ├── hooks/    # Custom hooks
│   │   ├── lib/      # Utilities (Supabase, API)
│   │   ├── pages/    # Page components
│   │   └── types/    # TypeScript definitions
│   └── package.json
│
├── backend/           # FastAPI Python app
│   ├── app/
│   │   ├── core/     # Config & auth
│   │   ├── db/       # Database setup
│   │   ├── llm/      # AI/LLM clients
│   │   ├── models/   # Database models
│   │   ├── routers/  # API endpoints
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic
│   ├── run.py
│   └── requirements.txt
│
├── ai/                # AI layer documentation
│   ├── llm_client.py  # Protocol definition
│   └── README.md      # AI architecture docs
│
├── supabase_setup.sql # Database schema
├── SETUP_GUIDE.md     # Complete setup instructions
├── SUPABASE_SETUP.md  # Supabase configuration
├── CONTEXT.md         # Project architecture & guidelines
└── README.md          # This file
```

---

## 🧪 Current MVP Status

✅ **Completed:**
- Project structure and architecture
- Frontend with React + TypeScript + Tailwind
- Backend with FastAPI + async SQLAlchemy
- Supabase authentication setup
- AI/LLM abstraction layer
- Database schema with pgvector
- Row Level Security policies
- API client and auth hooks

🚧 **In Progress:**
- Book recommendation endpoint
- Reading session tracking
- Notes with AI summarization
- User profile management
- Fantasy avatar progression system

---

## 🧩 Future Ideas
- AI-generated avatar art or upgrades  
- World map visualization  
- Streak mechanics  
- Audiobook tracking  
- Integration with Kindle, Apple Books, etc.  

---

## 🤝 Contributing
PRs and feature suggestions are welcome!

---

## 📄 License
MIT License (subject to change)

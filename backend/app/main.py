from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.db.database import init_db, close_db
from app.schemas.common import HealthResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting Booktopia API...")
    await init_db()
    print("✅ Database initialized")
    yield
    # Shutdown
    print("👋 Shutting down Booktopia API...")
    await close_db()

app = FastAPI(
    title="Booktopia API",
    description="AI-powered reading companion backend",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=dict)
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Booktopia API 📚",
        "version": "0.1.0",
        "docs": "/docs",
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(status="healthy")

# Import and include routers here as they're created
# from app.routers import auth, books, notes, recommendations, sessions
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(books.router, prefix="/api/books", tags=["books"])
# app.include_router(notes.router, prefix="/api/notes", tags=["notes"])
# app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])
# app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])


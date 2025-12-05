"""
Development server runner for Booktopia API

Usage:
    python run.py
"""

import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    print(f"🚀 Starting Booktopia API on {settings.API_HOST}:{settings.API_PORT}")
    print(f"📚 Debug mode: {settings.DEBUG}")
    print(f"📖 API docs available at: http://localhost:{settings.API_PORT}/docs")
    
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
        log_level="info" if settings.DEBUG else "warning",
    )


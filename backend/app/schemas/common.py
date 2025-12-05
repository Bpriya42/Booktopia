from pydantic import BaseModel
from datetime import datetime

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: datetime = datetime.now()

class ErrorResponse(BaseModel):
    """Standard error response"""
    detail: str
    code: str | None = None

class MessageResponse(BaseModel):
    """Generic message response"""
    message: str


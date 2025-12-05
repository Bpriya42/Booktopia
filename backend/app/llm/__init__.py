"""LLM abstraction layer for Booktopia"""

from app.llm.base import LLMClient
from app.llm.huggingface_client import HuggingFaceClient
from app.core.config import settings

def get_llm_client() -> LLMClient:
    """
    Factory function to get the appropriate LLM client based on configuration.
    
    Returns:
        LLMClient implementation
        
    Raises:
        ValueError: If unknown provider specified
    """
    if settings.LLM_PROVIDER == "huggingface":
        return HuggingFaceClient()
    # Add other providers here
    # elif settings.LLM_PROVIDER == "openai":
    #     return OpenAIClient()
    
    raise ValueError(f"Unknown LLM provider: {settings.LLM_PROVIDER}")

# Global instance
llm_client = get_llm_client()


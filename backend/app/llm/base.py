"""Base protocol for LLM clients"""

from typing import Protocol

class LLMClient(Protocol):
    """
    Protocol defining the interface for LLM providers.
    All LLM implementations must follow this interface.
    """
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """
        Generate text from a prompt.
        
        Args:
            prompt: Input text prompt
            **kwargs: Provider-specific parameters (max_length, temperature, etc.)
            
        Returns:
            Generated text string
        """
        ...
    
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings for a list of texts.
        
        Args:
            texts: List of text strings to embed
            
        Returns:
            List of embedding vectors (list of floats)
        """
        ...


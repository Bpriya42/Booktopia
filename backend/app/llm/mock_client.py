"""Mock LLM client for testing without API calls"""

import random

class MockLLMClient:
    """Mock implementation for testing and development"""
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """Return mock generated text"""
        return "This is a mock response for testing purposes."
    
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        """Return mock embeddings"""
        embeddings = []
        for _ in texts:
            # Generate random 384-dimensional embedding (matching MiniLM)
            embedding = [random.random() for _ in range(384)]
            embeddings.append(embedding)
        return embeddings
    
    async def summarize_text(self, text: str, max_length: int = 150) -> str:
        """Return mock summary"""
        words = text.split()[:30]
        return " ".join(words) + "... [mock summary]"


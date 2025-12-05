"""
LLM Client Protocol for Booktopia

This file defines the protocol/interface that all LLM providers must implement.
It serves as documentation for the AI layer architecture.
"""

from typing import Protocol

class LLMClient(Protocol):
    """
    Protocol for LLM provider abstraction.
    
    This protocol ensures that different LLM providers (Hugging Face, OpenAI, etc.)
    can be swapped without changing the application code.
    """
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """
        Generate text from a prompt.
        
        Args:
            prompt: Input text prompt
            **kwargs: Provider-specific parameters
                - max_new_tokens: Maximum tokens to generate
                - temperature: Sampling temperature (0.0 to 1.0)
                - top_p: Nucleus sampling parameter
                
        Returns:
            Generated text string
            
        Example:
            text = await client.generate_text(
                "Recommend a book for someone who likes sci-fi",
                max_new_tokens=200,
                temperature=0.7
            )
        """
        ...
    
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings for a list of texts.
        
        Args:
            texts: List of text strings to embed
            
        Returns:
            List of embedding vectors (each vector is a list of floats)
            
        Example:
            embeddings = await client.embed_texts([
                "The Great Gatsby is a classic novel",
                "1984 is a dystopian masterpiece"
            ])
        """
        ...

# Usage Examples:
# 
# 1. Generate book recommendation:
#    prompt = f"Based on user preferences: {preferences}, recommend 3 books"
#    recommendations = await llm_client.generate_text(prompt)
#
# 2. Generate note summary:
#    summary = await llm_client.generate_text(
#        f"Summarize this note: {note_content}",
#        max_new_tokens=100
#    )
#
# 3. Create embeddings for similarity search:
#    embeddings = await llm_client.embed_texts([book.description for book in books])


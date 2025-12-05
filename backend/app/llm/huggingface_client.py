"""Hugging Face implementation of LLM client"""

import httpx
from typing import Any
from app.core.config import settings

class HuggingFaceClient:
    """Hugging Face Inference API client"""
    
    def __init__(self):
        self.api_token = settings.HF_API_TOKEN
        self.base_url = "https://api-inference.huggingface.co/models"
        
        # Model configurations
        self.text_model = "mistralai/Mistral-7B-Instruct-v0.1"
        self.embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
        
        # Default parameters
        self.default_text_params = {
            "max_new_tokens": 256,
            "temperature": 0.7,
            "top_p": 0.95,
        }
    
    def _get_headers(self) -> dict[str, str]:
        """Get API headers with authorization"""
        if not self.api_token:
            raise ValueError("HF_API_TOKEN not set in environment")
        return {"Authorization": f"Bearer {self.api_token}"}
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """
        Generate text using Hugging Face Inference API.
        
        Args:
            prompt: Input text prompt
            **kwargs: Additional parameters (max_new_tokens, temperature, etc.)
            
        Returns:
            Generated text
        """
        headers = self._get_headers()
        
        # Merge default params with provided kwargs
        parameters = {**self.default_text_params, **kwargs}
        
        payload = {
            "inputs": prompt,
            "parameters": parameters,
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/{self.text_model}",
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            result = response.json()
            
            # Handle different response formats
            if isinstance(result, list) and len(result) > 0:
                generated_text = result[0].get("generated_text", "")
                # Remove the prompt from the response if present
                if generated_text.startswith(prompt):
                    generated_text = generated_text[len(prompt):].strip()
                return generated_text
            
            return ""
    
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings using Hugging Face Inference API.
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
        """
        headers = self._get_headers()
        embeddings = []
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            for text in texts:
                response = await client.post(
                    f"{self.base_url}/{self.embedding_model}",
                    headers=headers,
                    json={"inputs": text},
                )
                response.raise_for_status()
                embedding = response.json()
                
                # Handle different response formats
                if isinstance(embedding, list):
                    embeddings.append(embedding)
                else:
                    # Some models return dict with 'embeddings' key
                    embeddings.append(embedding.get("embeddings", []))
        
        return embeddings
    
    async def summarize_text(self, text: str, max_length: int = 150) -> str:
        """
        Summarize text using instruction-based generation.
        
        Args:
            text: Text to summarize
            max_length: Maximum length of summary
            
        Returns:
            Summary text
        """
        prompt = f"""Summarize the following text concisely in 2-3 sentences:

{text}

Summary:"""
        
        return await self.generate_text(
            prompt,
            max_new_tokens=max_length,
            temperature=0.5,
        )


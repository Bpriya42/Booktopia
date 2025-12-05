# Booktopia AI Layer

This directory contains the AI/LLM abstraction layer documentation and shared protocols for the Booktopia project.

## Architecture

The AI layer follows a **provider-agnostic** design:

```
┌─────────────────────────────────────┐
│   Application Layer (FastAPI)       │
│   - Recommendations                  │
│   - Note Summarization              │
│   - Insight Generation              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   LLMClient Protocol (Interface)     │
│   - generate_text()                  │
│   - embed_texts()                    │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌─────────────┐ ┌─────────────┐
│ Hugging Face│ │   OpenAI    │
│   Client    │ │   Client    │
└─────────────┘ └─────────────┘
```

## Implementations

### Current Provider: Hugging Face

- **Text Generation**: `mistralai/Mistral-7B-Instruct-v0.1`
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **Free tier**: Uses Inference API
- **Setup**: Requires `HF_API_TOKEN` environment variable

### Future Providers

- OpenAI (GPT-4, text-embedding-3-small)
- Anthropic (Claude)
- Local models (via Ollama)

## Usage

All LLM interactions happen through the backend. The implementation is in:

```
backend/app/llm/
├── base.py              # Protocol definition
├── huggingface_client.py # HF implementation
├── mock_client.py       # Testing mock
└── __init__.py          # Factory function
```

## Use Cases

### 1. Book Recommendations
```python
prompt = f"User likes: {genres}. Recommend 5 books with reasoning."
recommendations = await llm_client.generate_text(prompt)
```

### 2. Note Summarization
```python
summary = await llm_client.generate_text(
    f"Summarize: {note_content}",
    max_new_tokens=150
)
```

### 3. Semantic Search
```python
embeddings = await llm_client.embed_texts(book_descriptions)
# Store in pgvector for similarity search
```

## Configuration

Set in `backend/.env`:

```env
LLM_PROVIDER=huggingface
HF_API_TOKEN=your_token_here
```

## Testing

Use `MockLLMClient` for testing without API calls:

```python
from app.llm.mock_client import MockLLMClient

llm_client = MockLLMClient()
```

## Adding New Providers

1. Create new client file: `backend/app/llm/provider_client.py`
2. Implement `LLMClient` protocol
3. Add to factory in `backend/app/llm/__init__.py`
4. Update config to support new provider

## Best Practices

- ✅ Always use the protocol, never import providers directly
- ✅ Keep prompts modular and reusable
- ✅ Store embeddings in pgvector for efficient search
- ✅ Handle provider errors gracefully
- ✅ Use mock client for local development
- ❌ Never call LLM APIs from frontend


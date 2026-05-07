## Docker Setup

### Build the Docker Image

```bash
docker build -t ai-doc-analyzer .
```

### Run the Container

```bash
docker run -p 8000:8000 ai-doc-analyzer
```

### Access the Application

Open your browser and navigate to:

```text
http://localhost:8000
```

---

## Architecture Overview

```text
┌──────────────────────┐
│      PDF Upload      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Text Extraction     │
│      (pypdf)         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   LLM Processing     │
│ (Ollama + Llama 3)   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Structured Analysis  │
│       Response       │
└──────────────────────┘
```
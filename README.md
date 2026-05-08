## Docker Setup

### Build the Docker Image

```bash
docker compose build
```

### Run the Container

```bash
docker compose up -d
```

### Access the Application

Open your browser and navigate to:

```text
http://<IP>:8000
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
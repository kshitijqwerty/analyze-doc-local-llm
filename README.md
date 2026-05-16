# NeuralDocs AI

A simple, self-hostable tool to analyze PDF documents and extract insights using locally hosted LLMs — no cloud APIs, no data leaving your network.

---

## How It Works

```
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

Upload a PDF → text is extracted and sent to your local Ollama instance → the LLM returns structured insights directly in the browser.

---

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | Next.js, React, JavaScript, CSS   |
| Backend  | Python, FastAPI                   |
| LLM      | Ollama (Llama 3.2 3B by default)  |
| PDF      | pypdf                             |
| Deploy   | Docker, Docker Compose            |

---

## Prerequisites

- **Docker** and **Docker Compose** installed
- **[Ollama](https://ollama.com)** running and accessible on your network with a model pulled, e.g.:
  ```bash
  ollama pull llama3.2:3b
  ```

---

## Configuration

Copy `example_env` to `.env` and update the values for your setup:

```bash
cp example_env .env
```

```env
# URL of your Ollama server
OLLAMA_SERVER_URL=http://192.168.1.21:11434

# Ollama model to use for analysis
OLLAMA_MODEL=llama3.2:3b

# Max characters extracted from PDF (keep lower for smaller models)
PDF_CHAR_EXTRACTION_LIMIT=4000

# URL of the frontend (used for CORS)
FRONTEND_URL=http://192.168.1.20:3000

# Backend API URL exposed to the frontend
NEXT_PUBLIC_API_URL=http://192.168.1.20:8000
```

> **Note:** Replace the IP addresses with your actual server IPs. If running everything on one machine, use `localhost` or `127.0.0.1`.

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/kshitijqwerty/analyze-doc-local-llm.git
cd analyze-doc-local-llm
```

### 2. Configure environment

```bash
cp example_env .env
# Edit .env with your Ollama server URL and IPs
```

### 3. Build and run

```bash
docker compose build
docker compose up -d
```

### 4. Open the app

```
http://<YOUR_SERVER_IP>:8000
```

---

## Project Structure

```
analyze-doc-local-llm/
├── backend/        # Python/FastAPI server — PDF extraction + Ollama integration
├── frontend/       # Next.js app — upload UI and results display
├── compose.yaml    # Docker Compose config
├── example_env     # Environment variable template
└── .gitignore
```

---

## Tips

- **PDF size:** Large PDFs may be truncated based on `PDF_CHAR_EXTRACTION_LIMIT`. Increase this value if your model can handle larger context windows.
- **Model choice:** `llama3.2:3b` is a good default for low-resource machines. For better quality, try `llama3:8b` or `mistral` if your hardware supports it.
- **Performance:** Running Ollama on a machine with a GPU will significantly improve inference speed.

---

## License

MIT
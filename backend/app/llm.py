import requests
import os


def get_analysis_from_llm(
    text: str,
    text_truncate_size: int = 3000
):

    # Limit text size
    text = text[:text_truncate_size]

    # Prompt
    prompt = f"""
Analyse the following document and return:

1. A clear summary (3-5 sentences)
2. Key bullet points
3. Important insights

Document:
{text}
"""

    # Ollama Config
    OLLAMA_URL = os.getenv(
        "OLLAMA_SERVER_URL",
        "http://localhost:11434"
    )

    OLLAMA_MODEL = os.getenv(
        "OLLAMA_MODEL",
        "llama3"
    )

    # Request to Ollama
    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    # Raw response from LLM
    raw_text = response.json()["response"]

    # -----------------------------
    # Extract Summary
    # -----------------------------

    summary = ""

    if "**Summary" in raw_text:

        summary_part = raw_text.split(
            "**Summary"
        )[1]

        if "**Key Bullet Points**" in summary_part:

            summary = summary_part.split(
                "**Key Bullet Points**"
            )[0]

        summary = (
            summary
            .replace("(3-5 sentences)**", "")
            .replace(":", "")
            .strip()
        )

    # -----------------------------
    # Extract Insights
    # -----------------------------

    insights = []

    if "**Important Insights**" in raw_text:

        insights_part = raw_text.split(
            "**Important Insights**"
        )[1]

        lines = insights_part.split("\n")

        for line in lines:

            line = line.strip()

            if line.startswith("*"):

                clean_line = (
                    line
                    .replace("*", "")
                    .strip()
                )

                if clean_line:
                    insights.append(clean_line)

    # -----------------------------
    # Create Final JSON
    # -----------------------------

    result = {
        "summary": summary,
        "insights": insights,
        "analysis": raw_text
    }

    return result
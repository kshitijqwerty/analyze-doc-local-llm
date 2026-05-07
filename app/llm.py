import requests
import os

def get_analysis_from_llm(text : str, text_truncate_size : int = 3000 ):
    text = text[:text_truncate_size]
    prompt = f"""Analyse the following document and return:

        1. A clear summary(3-5 sentences)
        2. Key bullet points
        3. Important insights

        Document:
        {text}
        """
    url = f"http://{os.getenv('OLLAMA_SERVER_URL')}:11434/api/generate"
    response = requests.post(
        url,
        json = {
            "model" : "llama3",
            "prompt": prompt,
            "stream": False
        }
    )
    print(url)
    print(response)
    return response.json()["response"]
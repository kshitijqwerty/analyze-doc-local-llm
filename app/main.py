from fastapi import FastAPI, UploadFile, File
import os
from app.llm import get_analysis_from_llm
from app.utils import extract_text_from_pdf


app = FastAPI()

@app.get("/")
def home():
    return {"message" : "AI Document Analyser running."}

@app.post('/upload')
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    text = ""
    
    if file.filename.endswith('.pdf'):
        text = extract_text_from_pdf(content)
        
    
    analysis = "No Analysis Found"
    if text.strip():
        analysis = get_analysis_from_llm(text, text_truncate_size=3000)
    else:
        return {"error" : "No readable Text found"}

    return {
        'filename' : file.filename,
        'analysis' : analysis
        
    }
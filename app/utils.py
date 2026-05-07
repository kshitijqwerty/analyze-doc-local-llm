from pypdf import PdfReader
import io

def extract_text_from_pdf(content):
    text = ""
    pdf = PdfReader(io.BytesIO(content))

    for page in pdf.pages:
        text += page.extract_text() or ""
    
    return text
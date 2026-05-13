from fastapi import FastAPI, UploadFile, File, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.llm import get_analysis_from_llm
from app.utils import extract_text_from_pdf

import os

app = FastAPI()
v1 = APIRouter(prefix="/ai/v1")


# Frontend URLs
origins = [
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", "http://192.168.1.20:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@v1.get("/")
async def home():

    return {
        "success": True,
        "message": "AI Document Analyser running."
    }


@v1.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    try:

        # Validate file
        if not file.filename.endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Read uploaded file
        content = await file.read()

        # Extract PDF text
        text = extract_text_from_pdf(content)

        # Empty PDF check
        if not text.strip():

            raise HTTPException(
                status_code=400,
                detail="No readable text found in PDF"
            )

        # AI Analysis
        analysis_data = get_analysis_from_llm(
            text=text,
            text_truncate_size=int(os.getenv("PDF_CHAR_EXTRACTION_LIMIT", 3000))
        )

        # Final Response
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "filename": file.filename,
                "summary": analysis_data.get(
                    "summary",
                    ""
                ),
                "insights": analysis_data.get(
                    "insights",
                    []
                ),
                "analysis": analysis_data.get(
                    "analysis",
                    ""
                )
            }
        )

    except HTTPException as e:

        raise e

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

app.include_router(v1)
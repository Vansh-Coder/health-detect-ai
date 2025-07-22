import os
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse, JSONResponse

import firebase_admin
from firebase_admin import auth, credentials

from io import BytesIO
from PIL import Image
from reportlab.pdfgen import canvas

from .models import get_image_classifier
from .schemas import ClassificationResult, ImageDiagnosisResult

# initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
    firebase_admin.initialize_app(cred)

# for parsing the Authorization: Bearer <token> header
bearer_scheme = HTTPBearer()

async def verify_firebase_token(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    """
    FastAPI dependency which:
      1) extracts the Bearer token
      2) calls Firebase Admin to verify it
      3) returns the decoded token
    """
    id_token = creds.credentials
    try:
        decoded = auth.verify_id_token(id_token)
        return decoded
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase ID token"
        )

app = FastAPI(title="HealthDetect AI")

BACKEND_URL = os.getenv("BACKEND_URL")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[BACKEND_URL],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Authorization", "Content-Type"]
)

# Candidate labels for Zero-Shot Image Classification
CANDIDATE_LABELS = [
    "eczema", "psoriasis", "acne", "rash", "infection", "allergic reaction",
    "bruise", "cut", "laceration", "swelling", "abrasion", "hematoma", "burn"
]

@app.post("/api/diagnosis/image", response_model=ImageDiagnosisResult)
async def diagnose_image(
    file: UploadFile = File(...),
    user=Depends(verify_firebase_token)
):
    """
    1. Read image from upload.
    2. Run zero-shot image classification.
    """
    image = Image.open(BytesIO(await file.read())).convert("RGB")
    # Zero-Shot Image Classification
    img_cls = get_image_classifier()(image, candidate_labels=CANDIDATE_LABELS, multi_label=False)
    # Ensure top-3
    top_labels = [entry["label"] for entry in img_cls[:3]]
    top_scores = [entry["score"] for entry in img_cls[:3]]
    classification = ClassificationResult(labels=top_labels, scores=top_scores)

    return ImageDiagnosisResult(
        classification=classification,
    )

@app.post("/api/convert/image-to-pdf")
async def convert_image_to_pdf(
    file: UploadFile = File(...),
    user=Depends(verify_firebase_token)
):
    """
    Convert an uploaded image to a one-page PDF entirely in-process.
    """
    try:
        # Read the uploaded bytes
        contents = await file.read()

        # Try opening as an image - if this fails, it’s a bad upload
        try:
            img = Image.open(BytesIO(contents))
        except Exception:
            return JSONResponse(
                status_code=400,
                content={"error": "Uploaded file is not a valid image"}
            )

        # Render the PDF in memory
        pdf_buffer = BytesIO()
        width_pt, height_pt = img.size
        c = canvas.Canvas(pdf_buffer, pagesize=(width_pt, height_pt))
        c.drawInlineImage(img, 0, 0, width_pt, height_pt)
        c.showPage()
        c.save()
        pdf_buffer.seek(0)

        # Stream the result back
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=Analysis_Results.pdf"},
        )

    except Exception as e:
        # Anything unexpected becomes a 500 with a generic message
        return JSONResponse(
            status_code=500,
            content={"error": "Failed to convert image to PDF"}
        )

    finally:
        # Close & clean up FastAPI’s temp file
        await file.close()
import os
import shutil
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import Response, StreamingResponse

import firebase_admin
from firebase_admin import auth, credentials

import cloudmersive_convert_api_client
from cloudmersive_convert_api_client.rest import ApiException

from io import BytesIO
from PIL import Image
import tempfile

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

# Cloudmersive API Key
CLOUDMERSIVE_API_KEY = os.getenv("CLOUDMERSIVE_API_KEY")

# Cloudmersive API configuration
configuration = cloudmersive_convert_api_client.Configuration()
configuration.api_key['Apikey'] = CLOUDMERSIVE_API_KEY
api_client = cloudmersive_convert_api_client.ApiClient(configuration)

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
    # 2. Zero-Shot Image Classification
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
    Convert an uploaded image to a PDF using Cloudmersive API.
    """
    # Save uploaded image to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_image:
        shutil.copyfileobj(file.file, temp_image)
        temp_image_path = temp_image.name

    try:
        api_instance = cloudmersive_convert_api_client.ConvertImageApi(api_client)

        # Pass a file-like, get back bytes
        with open(temp_image_path, "rb") as img_fp:
            pdf_bytes = api_instance.convert_image_image_format_convert(
                "JPG", "PDF", img_fp
            )
        
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=Diagnosis_Results.pdf"},
        )

        # # Convert to PDF
        # result = api_instance.convert_image_image_format_convert("JPG", "PDF", temp_image_path)

        # # Return the PDF as a stream
        # return StreamingResponse(
        #     result,
        #     media_type="application/pdf",
        #     headers={"Content-Disposition": "attachment; filename=Diagnosis_Results.pdf"}
        # )

    except ApiException as e:
        return {"error": f"PDF conversion failed: {e}"}
    finally:
        os.remove(temp_image_path)
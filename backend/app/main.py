import os
import shutil
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cloudmersive_convert_api_client
from cloudmersive_convert_api_client.rest import ApiException
from typing import Optional
import requests
from io import BytesIO
from PIL import Image
import tempfile

from .models import image_classifier, vqa
from .schemas import ClassificationResult, VQAResult, ImageDiagnosisResult

# Cloudmersive API Key
CLOUDMERSIVE_API_KEY = os.getenv("CLOUDMERSIVE_API_KEY")

# Cloudmersive API configuration
configuration = cloudmersive_convert_api_client.Configuration()
configuration.api_key['Apikey'] = CLOUDMERSIVE_API_KEY
api_client = cloudmersive_convert_api_client.ApiClient(configuration)

app = FastAPI(title="HealthDetect AI")

# Allow CORS from any origin for convenience (adjust before production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Candidate labels for Zero-Shot Image Classification
CANDIDATE_LABELS = [
    "eczema", "psoriasis", "acne", "rash", "infection", "allergic reaction",
    "bruise", "cut", "laceration", "swelling", "abrasion", "hematoma", "burn"
]

@app.post("/api/diagnosis/image", response_model=ImageDiagnosisResult)
async def diagnose_image(
    file: UploadFile = File(...),
    question: Optional[str] = Form(None)
):
    """
    1. Read image from upload.
    2. Run zero-shot image classification.
    3. If question provided → run VQA on the image.
    """
    image = Image.open(BytesIO(await file.read())).convert("RGB")
    # 2. Zero-Shot Image Classification
    img_cls = image_classifier(
        image,
        candidate_labels=CANDIDATE_LABELS,
        multi_label=False
    )
    # Ensure top-3
    top_labels = [entry["label"] for entry in img_cls[:3]]
    top_scores = [entry["score"] for entry in img_cls[:3]]
    classification = ClassificationResult(labels=top_labels, scores=top_scores)

    # 3. VQA (if a question was provided)
    vqa_answer = None
    if question:
        vqa_out = vqa(image=image, question=question)
        if isinstance(vqa_out, list) and len(vqa_out) > 0:
            vqa_answer = VQAResult(answer=vqa_out[0].get("answer", ""))
        else:
            vqa_answer = VQAResult(answer="No answer returned.")

    return ImageDiagnosisResult(
        classification=classification,
        vqa_answer=vqa_answer
    )

@app.post("/api/convert/image-to-pdf")
async def convert_image_to_pdf(file: UploadFile = File(...)):
    """
    Convert an uploaded image to a PDF using Cloudmersive API.
    """
    # Save uploaded image to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_image:
        shutil.copyfileobj(file.file, temp_image)
        temp_image_path = temp_image.name

    try:
        api_instance = cloudmersive_convert_api_client.ConvertImageApi(api_client)

        # Convert to PDF
        result = api_instance.convert_image_image_format_convert("JPG", "PDF", temp_image_path)

        # Return the PDF as a stream
        return StreamingResponse(
            result,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=converted.pdf"}
        )

    except ApiException as e:
        return {"error": f"PDF conversion failed: {e}"}
    finally:
        os.remove(temp_image_path)
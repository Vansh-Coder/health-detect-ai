from pydantic import BaseModel
from typing import List, Optional

class ClassificationResult(BaseModel):
    labels: List[str]
    scores: List[float]

class VQAResult(BaseModel):
    answer: str

class ImageDiagnosisResult(BaseModel):
    classification: ClassificationResult
    vqa_answer: Optional[VQAResult] = None
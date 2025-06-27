from pydantic import BaseModel
from typing import List

class ClassificationResult(BaseModel):
    labels: List[str]
    scores: List[float]

class ImageDiagnosisResult(BaseModel):
    classification: ClassificationResult
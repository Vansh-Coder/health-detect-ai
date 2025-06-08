import torch
from transformers import pipeline

# Detect whether GPU is available
DEVICE = 0 if torch.cuda.is_available() else -1

# 1. Zero-Shot Image Classifier (CLIP)
image_classifier = pipeline(
    "zero-shot-image-classification",
    model="openai/clip-vit-base-patch32",
    device=DEVICE
)

# 2. Visual Question Answering (ViLT)
vqa = pipeline(
    "visual-question-answering",
    model="dandelin/vilt-b32-finetuned-vqa",
    device=DEVICE
)
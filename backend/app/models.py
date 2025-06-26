import torch
from transformers import pipeline

# Detect whether GPU is available
DEVICE = 0 if torch.cuda.is_available() else -1

_image_classifier = None
_vqa = None

# Zero-Shot Image Classifier (CLIP)
def get_image_classifier():
    global _image_classifier
    if _image_classifier is None:
        _image_classifier = pipeline(
            "zero-shot-image-classification",
            model="openai/clip-vit-base-patch32",
            device=DEVICE
        )
    return _image_classifier

# Visual Question Answering (ViLT)
def get_vqa():
    global _vqa
    if _vqa is None:
        _vqa = pipeline(
            "visual-question-answering",
            model="dandelin/vilt-b32-finetuned-vqa",
            device=DEVICE
        )
    return _vqa
# backend/Dockerfile
FROM python:3.11-slim

# avoid Python buffering
ENV PYTHONUNBUFFERED=1

# where code lives in container
WORKDIR /app

# install system deps for Pillow and Cloudmersive
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
       build-essential \
       libjpeg-dev \
       libpng-dev \
       wget \
 && rm -rf /var/lib/apt/lists/*

# copy & install Python deps (including transformers, torch, etc.)
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt \
 # ensure we have the HF download helper
 && pip install --no-cache-dir huggingface_hub

# ──────────── PRE-DOWNLOAD CLIP MODEL ────────────
# pull the full "openai/clip-vit-base-patch32" into
# the default HF cache directory (/root/.cache/huggingface)
RUN python3 - <<'EOF'
from huggingface_hub import snapshot_download
snapshot_download("openai/clip-vit-base-patch32")
EOF
# ───────────────────────────────────────────────────

# copy your FastAPI app
COPY app ./app

# expose the port Fly expects
EXPOSE 8000

# when the container boots, spin up Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
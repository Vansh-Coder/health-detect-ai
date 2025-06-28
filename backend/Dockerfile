# Dockerfile (multi-stage build)

# Builder stage: install deps, download CLIP into /app/model_cache
FROM python:3.11-slim AS builder
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Install system deps for model build
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential wget \
 && rm -rf /var/lib/apt/lists/*

# Copy and install Python deps (including huggingface_hub)
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt huggingface_hub

# Pre-download the CLIP model into local cache
RUN python3 - <<'EOF'
from huggingface_hub import snapshot_download
snapshot_download(
    repo_id="openai/clip-vit-base-patch32",
    cache_dir="/app/model_cache"
)
EOF

# Final stage: slim runtime image with pre-cached model
FROM python:3.11-slim AS runtime
ENV PYTHONUNBUFFERED=1
# Point transformers to use cached model
ENV HF_HOME=/app/model_cache
WORKDIR /app

# Install only runtime system libraries
RUN apt-get update \
 && apt-get install -y --no-install-recommends libjpeg-dev libpng-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy pre-cached model
COPY --from=builder /app/model_cache /app/model_cache

# Copy Python deps and install (without huggingface_hub)
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app

# Expose port and start server
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
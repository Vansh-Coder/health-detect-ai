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

# copy and install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# copy FastAPI app
COPY app ./app

# expose port expected by fly
EXPOSE 8000

# default command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
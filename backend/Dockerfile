# Use official Python slim image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file first (for better caching)
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy all backend code into the container
COPY . .

# Expose port 8080 (expected by Cloud Run)
EXPOSE 8080

# Run FastAPI app with Uvicorn on port 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
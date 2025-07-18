# 🎯 HealthDetect AI

Cross-platform mobile app (Expo-managed React Native 📱) that empowers users with AI-powered skin and injury diagnosis. Launched on the App Store, Android version ready for release.

---

## ✨ Highlights

- **Zero-shot image diagnosis using CLIP** — 85% accuracy on 200-image test set across **6 skin** and **7 injury** categories (e.g. eczema, acne, bruises, burns).
- **Lightning-fast inference:** top-3 predictions in under **2 seconds**.
- **Secure user auth & media uploads** via Firebase Auth and Storage—handles 500+ image uploads with atomic safety.
- **Image-to-PDF conversion** using Cloudmersive API for easy sharing.
- **Production-ready backend**: Dockerized FastAPI hosted on Hetzner CX11, behind Nginx + Let’s Encrypt TLS, always-warm with zero cold-start.
- **CI/CD with GitHub Actions** — automatic SSH-based deploys on git push.
- **App Store launch** completed using Expo EAS build, fully managed—no eject required.

---

## 🔍 Table of Contents

1. [App Overview](#app-overview)  
2. [Screens & User Flow](#screens-user-flow)  
3. [Architecture & Tech Stack](#architecture-tech-stack)  
4. [Setup & Development](#setup-development)  
5. [Building & Publishing](#building-publishing)  
6. [Future Roadmap](#future-roadmap)  
7. [About & License](#about-license)

---

## 📷 App Overview

HealthDetect AI simplifies medical triage—with just a photo. Upload or capture an image, receive top‑3 likely skin conditions or injuries, download results as PDF, and manage your session securely.

---

## 🛠️ Screens & User Flow

- **🎬 Splash & Auth** – User sign‑in / sign‑up via Firebase.  
- **📸 Capture/Upload** – Native camera and gallery integration.  
- **⏳ Loading & Result** – AI-powered classification with confidence scores.  
- **📄 Save as PDF** – Download or share full diagnostic as editable PDF.  
- **⚙️ Settings & Info** – App details, versioning, terms, privacy.

---

## 🏗️ Architecture & Tech Stack

```
[Expo React Native App] → HTTPS → [Nginx + TLS Proxy on Hetzner]
                                               ↓
                                      [Docker FastAPI Container]
                                          • CLIP via transformers
                                          • Firebase Auth & Storage
                                          • Cloudmersive "image-to-pdf"
```

- **Frontend:**  
  - Expo-managed React Native  
  - Firebase Auth & Storage SDKs  
  - Configurable base URLs for development vs production  

- **Backend:**  
  - FastAPI (Python) with `/diagnosis` and `/convert` endpoints  
  - `transformers` CLIP implementation for zero-shot inference  
  - Firebase integration (Admin SDK)  
  - Cloudmersive Convert API  
  - Docker container, exposed on `127.0.0.1:8000`

- **Infrastructure:**  
  - Hetzner CX11 VM + Docker  
  - Nginx reverse proxy + Let’s Encrypt TLS certs  
  - Perimeter and host-based firewalls  
  - Always-on CLIP model with zero cold start

- **CI/CD:**  
  - GitHub Actions workflow  
  - SSH into Hetzner, pull code, build, and replace running container

---

## ⚙️ Setup & Development

#### Frontend
```bash
git clone https://github.com/Vansh-Coder/health-detect-ai.git
cd health-detect-ai/frontend
npm install
```
- Create `src/config.js` with `API_BASE_URL` and Firebase config  
- Run locally:
  ```bash
  expo start
  ```

#### Backend
```bash
cd ../backend
docker build -t healthdetect-backend:latest .
```

- Prepare environment variables:  
  - `CLOUDMERSIVE_API_KEY`  
  - `GOOGLE_APPLICATION_CREDENTIALS_JSON` (Firebase key)

- Run locally:
  ```bash
  docker run -p 8000:8000 \
    -e CLOUDMERSIVE_API_KEY=... \
    -e GOOGLE_APPLICATION_CREDENTIALS='{"...":...}' \
    healthdetect-backend:latest
  ```

---

## 🧩 Building & Publishing

#### Deploy Backend
- On git push to `main`, apply GitHub Actions workflow:
  - SSH into Hetzner
  - Pull latest code
  - Rebuild Docker container
  - Restart container — always-warm, 0-sec cold start

#### iOS App (App Store)
```bash
npm install -g eas-cli
cd frontend
eas build:configure
eas credentials
eas build -p ios --profile production
eas submit -p ios
```
Managed via Expo EAS—no native code required.

#### Android (Upcoming)
```bash
eas build -p android --profile production
eas submit -p android
```

---

## 🚀 Future Roadmap

- 🧪 Android App release  
- 🔄 Enhanced ML accuracy via fine-tuning  
- 🌐 Custom domain + branding for frontend  
- 📈 Analytics & remote config  
- 🧵 Health record storage & retrieval

---

## 👤 About & Contact

**Vansh Gupta** — Full-stack ML engineer & mobile dev.  
GitHub: [@Vansh-Coder](https://github.com/Vansh-Coder)  
Email: vgupta95@asu.edu

---

## 📝 License

MIT License — see [LICENSE](LICENSE) file.

---

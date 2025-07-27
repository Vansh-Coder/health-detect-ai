<table width="100%">
  <tr>
    <td valign="middle" width="25%">
      <a href="https://rag-project-blond.vercel.app">
        <img
          src="frontend/assets/AppIcon.png"
          width="200"
          height="200"
          alt="Health Detect AI app icon"
        />
      </a>
    </td>
    <td valign="middle" width="75%">
      <h1 style="margin: 0;">
        <a href="https://rag-project-blond.vercel.app">Health Detect AI</a>
      </h1>
      <p style="margin: 0; font-style: italic;">
        <strong>React Native mobile app (🍏 & 🤖) that empowers users with AI-powered skin and injury diagnosis.</strong>
      </p>
      <p style="margin-top: 8px;">
        <img
          src="https://img.shields.io/github/license/Vansh-Coder/health-detect-ai?style=flat-square&logo=opensourceinitiative&logoColor=white&color=E92063"
          alt="License"
        />
        <img
          src="https://img.shields.io/github/languages/top/Vansh-Coder/health-detect-ai?style=flat-square&color=E92063"
          alt="Top Language"
        />
        <img
          src="https://img.shields.io/badge/python-5.1%25-3776AB?style=flat-square&color=E92063"
          alt="Second Language"
        />
        <img
          src="https://img.shields.io/github/languages/count/Vansh-Coder/health-detect-ai?style=flat-square&color=E92063"
          alt="Language Count"
        />
      </p>
      <p style="margin-top: 16px; font-style: italic;">
        <strong>Built with the tools and technologies:</strong>
      </p>
      <p style="margin: 4px 0;">
        <img
          src="https://img.shields.io/badge/npm-CB3837.svg?style=flat-square&logo=npm&logoColor=white"
          alt="npm"
        />
        <img
          src="https://img.shields.io/badge/Node.js-339933.svg?style=flat-square&logo=node.js&logoColor=white"
          alt="Node.js"
        />
        <img
          src="https://img.shields.io/badge/Expo-000020.svg?style=flat-square&logo=expo&logoColor=white"
          alt="Expo"
        />
        <img
          src="https://img.shields.io/badge/React_Native-61DAFB.svg?style=flat-square&logo=react&logoColor=black"
          alt="React Native"
        />
        <img
          src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black"
          alt="JavaScript"
        />
        <img
          src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=flat-square&logo=firebase&logoColor=black"
          alt="Firebase"
        />
        <img
          src="https://img.shields.io/badge/FastAPI-009688.svg?style=flat-square&logo=fastapi&logoColor=white"
          alt="FastAPI"
        />
        <img
          src="https://img.shields.io/badge/Python-3776AB.svg?style=flat-square&logo=python&logoColor=white"
          alt="Python"
        />
        <img
          src="https://img.shields.io/badge/PyTorch-EE4C2C.svg?style=flat-square&logo=pytorch&logoColor=white"
          alt="PyTorch"
        />
      </p>
      <p style="margin: 4px 0;">
        <img
          src="https://img.shields.io/badge/HuggingFace-FE7901.svg?style=flat-square&logo=huggingface&logoColor=white"
          alt="Hugging Face"
        />
        <img
          src="https://img.shields.io/badge/Pillow-4C6DEF.svg?style=flat-square"
          alt="Pillow"
        />
        <img
          src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat-square&logo=docker&logoColor=white"
          alt="Docker"
        />
        <img
          src="https://img.shields.io/badge/Nginx-009639.svg?style=flat-square&logo=nginx&logoColor=white"
          alt="Nginx"
        />
        <img
          src="https://img.shields.io/badge/Let's_Encrypt-000000.svg?style=flat-square&logo=letsencrypt&logoColor=white"
          alt="Let's Encrypt"
        />
        <img
          src="https://img.shields.io/badge/GitHub_Actions-2088FF.svg?style=flat-square&logo=github-actions&logoColor=white"
          alt="GitHub Actions"
        />
        <img
          src="https://img.shields.io/badge/Git-F05032.svg?style=flat-square&logo=git&logoColor=white"
          alt="Git"
        />
        <img
          src="https://img.shields.io/badge/Hetzner_Cloud-009EE3.svg?style=flat-square"
          alt="Hetzner Cloud"
        />
      </p>
    </td>
  </tr>
</table>

---

# 🎯 HealthDetect AI

Cross-platform mobile app (React Native 📱) that empowers users with AI-powered skin and injury diagnosis. Launched on the App Store, Android version ready for release.

---

## ✨ Highlights

- **Zero-shot image diagnosis using CLIP** - 85% accuracy on 200-image test set across **6 skin** and **7 injury** categories (e.g. eczema, acne, bruises, burns).
- **Lightning-fast inference:** top-3 predictions in under **5 seconds**.
- **Secure user auth & media uploads** via Firebase Auth and Storage - handles 500+ image uploads with atomic safety.
- **Image-to-PDF conversion** using Python ReportLab for easy sharing.
- **Production-ready backend**: Dockerized FastAPI hosted on Hetzner CX11, behind Nginx + Let’s Encrypt TLS, always-warm with zero cold-start.
- **CI/CD with GitHub Actions** - automatic SSH-based deploys on git push.
- **App Store launch** completed using Expo EAS build, fully managed - no eject required.

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

HealthDetect AI simplifies medical triage - with just a photo. Upload or capture an image, receive top‑3 likely skin conditions or injuries, download results as PDF, and manage your session securely.

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
[React Native App (iOS/Android)]
         └──HTTPS──> [Nginx + TLS] ──> [FastAPI Container on Hetzner]
                                          ├─ /diagnosis → CLIP → ai response
                                          └─ /convert → Python ReportLab → returns PDF

Auth & Storage → Firebase
CI/CD → GitHub Actions → SSH deploy → Hetzner VM
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
  - Docker container, exposed on `localhost` within VPS (Hetzner)

- **Infrastructure:**  
  - Hetzner CX22 VM + Docker  
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
- Create `.env` with `EXPO_PUBLIC_BACKEND_URL` (localhost if running locally) and `firebaseConfig.js` with Firebase configuration  
- Run locally:
  ```bash
  npx expo start
  ```

#### Backend
```bash
cd ../backend
docker build -t healthdetect-backend:latest .
```
(or git push something for automatic deployment when not running locally)

- Prepare environment variables:  
  - `GOOGLE_APPLICATION_CREDENTIALS_JSON` (Firebase key)

- Run locally:
  ```bash
  docker run -p 8000:8000 \
    -e GOOGLE_APPLICATION_CREDENTIALS='...' \
    healthdetect-backend:latest
  ```
---

## 🧩 Building & Publishing

#### Deploy Backend
- On git push to `main`, apply GitHub Actions workflow:
  - SSH into Hetzner
  - Pull latest code
  - Rebuild Docker container
  - Restart container - always-warm, 0-sec cold start

#### iOS App (App Store)
```bash
npm install -g eas-cli
cd frontend
eas build:configure
eas credentials
eas build -p ios --profile production
eas submit -p ios
```
Managed via Expo EAS-no native code required.

#### Android (Play Store)
```bash
eas build -p android --profile production
eas submit -p android
```

---

## 🚀 Future Roadmap

- 📈 Analytics & remote config  
- 🌐 Custom domain + branding for frontend  
- 🧵 Health record storage & retrieval

---

## 👤 Developer & Contact

**Vansh Gupta** - Full-stack AI/ML engineer & software developer.  
GitHub: [@Vansh-Coder](https://github.com/Vansh-Coder)  
Email: vgupta95@asu.edu

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file.

---

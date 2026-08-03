# 🌾 CropShield AI

**CropShield AI** is an intelligent agricultural management platform that helps farmers protect their crops using AI-powered disease detection, real-time weather monitoring, field mapping, and smart advisory tools.

## 🚀 Features

- 🔐 **Google OAuth Authentication** — Secure sign-in with Google
- 📊 **Dashboard** — Crop health overview with AI insights
- 🌤 **Weather Page** — Real-time location-based weather with spray index & 7-day forecasts
- 🗺 **Field Map** — Interactive crop zone mapping
- 🤖 **AI Advisory** — Smart crop advisor chatbot
- 📜 **Activity History** — Firebase-backed history tracking
- 👤 **Farmer Profile** — User profile management
- 🌿 **Unique Organic UI** — Beautiful crop-themed green agriculture design

## 🛠 Tech Stack

### Frontend
- **React** + **Vite**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Firebase** (auth & history)

### Backend
- **FastAPI** (Python)
- **Uvicorn**
- **Open-Meteo API** (free weather data)
- **OpenAI / AI advisory**

## 📦 Setup & Run

### Prerequisites
- Node.js 18+
- Python 3.10+

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```

### Environment Variables
Create a `.env` file in the `frontend/` directory:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🌐 Live URLs (Development)
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## 📄 License
MIT

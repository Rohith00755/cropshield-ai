from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predict, auth, weather, sensors, history, chat

app = FastAPI(
    title="CropShield AI - Precision AgriTech Backend",
    description="FastAPI REST Backend for XGBoost Crop Disease Prediction, ChatGPT AI Agent & IoT Telemetry",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(predict.router)
app.include_router(auth.router)
app.include_router(weather.router)
app.include_router(sensors.router)
app.include_router(history.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "CropShield AI Engine",
        "version": "1.0.0",
        "mlModel": "XGBoost Classifier v2.4",
        "aiAgent": "ChatGPT Agronomist Model (gpt-4o-mini)"
    }

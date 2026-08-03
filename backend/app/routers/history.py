from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["History & Feedback"])

class FeedbackRequest(BaseModel):
    predictionId: str
    farmerConfirmed: bool
    actualObservedDisease: str
    notes: str = ""

@router.get("/history")
async def get_history():
    return [
        {
            "id": "PRED-9401",
            "timestamp": "2026-08-03 14:30",
            "crop": "Rice (Calrose)",
            "stage": "Heading / Flowering",
            "disease": "Rice Blast (Pyricularia oryzae)",
            "probability": 87,
            "riskLevel": "High Risk",
            "confidence": 93,
            "status": "Active Alert",
            "recommendation": "Apply Tricyclazole 75% WP within 36 hours. Pause overhead irrigation.",
            "eta": "36 - 48 Hours"
        },
        {
            "id": "PRED-9398",
            "timestamp": "2026-08-02 09:15",
            "crop": "Roma Tomato",
            "stage": "Fruiting",
            "disease": "Late Blight",
            "probability": 64,
            "riskLevel": "Moderate Risk",
            "confidence": 89,
            "status": "Monitoring",
            "recommendation": "Spray Copper Hydroxide fungicide. Improve canopy ventilation.",
            "eta": "3 - 4 Days"
        }
    ]

@router.post("/feedback")
async def submit_feedback(payload: FeedbackRequest):
    return {
        "success": True,
        "message": "Feedback received. Submitted to XGBoost retraining queue.",
        "data": payload
    }

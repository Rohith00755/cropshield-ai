from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Any
from app.services.ml_model import xgboost_predictor

router = APIRouter(prefix="/api", tags=["Prediction"])

class DiseasePredictionRequest(BaseModel):
    crop: Optional[str] = "Rice"
    cropType: Optional[str] = None
    growthStage: Optional[str] = "Tillering"
    temperature: Optional[float] = 29.0
    humidity: Optional[float] = 86.0
    rainfall: Optional[float] = 120.0
    windSpeed: Optional[float] = 6.0
    soilMoisture: Optional[float] = 74.0
    fieldLocation: Optional[str] = "Sacramento Valley Sector 4"
    latitude: Optional[float] = 38.5816
    longitude: Optional[float] = -121.4944

@router.post("/predict")
async def predict_disease(payload: DiseasePredictionRequest):
    try:
        input_dict = payload.model_dump()
        result = xgboost_predictor.predict(input_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

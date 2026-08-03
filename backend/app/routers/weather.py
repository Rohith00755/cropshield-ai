from fastapi import APIRouter
from typing import Optional

router = APIRouter(prefix="/api", tags=["Weather"])

@router.get("/weather")
async def get_weather(lat: Optional[float] = 38.5816, lng: Optional[float] = -121.4944):
    return [
        {"day": "Today", "date": "Aug 3", "tempMax": 31, "tempMin": 20, "humidity": 78, "condition": "Humid & Cloudy", "rainProb": 65, "wind": 11.2, "icon": "CloudRain", "sprayingIndex": "Caution (High Dew)"},
        {"day": "Tue", "date": "Aug 4", "tempMax": 33, "tempMin": 21, "humidity": 82, "condition": "Thunderstorms", "rainProb": 85, "wind": 16.4, "icon": "CloudLightning", "sprayingIndex": "Avoid Spraying"},
        {"day": "Wed", "date": "Aug 5", "tempMax": 29, "tempMin": 18, "humidity": 62, "condition": "Partial Sun", "rainProb": 15, "wind": 9.8, "icon": "CloudSun", "sprayingIndex": "Optimal (08:00 - 11:00)"},
        {"day": "Thu", "date": "Aug 6", "tempMax": 30, "tempMin": 19, "humidity": 55, "condition": "Clear Sunny", "rainProb": 5, "wind": 8.1, "icon": "Sun", "sprayingIndex": "Excellent"},
        {"day": "Fri", "date": "Aug 7", "tempMax": 32, "tempMin": 21, "humidity": 58, "condition": "Sunny", "rainProb": 10, "wind": 10.5, "icon": "Sun", "sprayingIndex": "Optimal"},
        {"day": "Sat", "date": "Aug 8", "tempMax": 34, "tempMin": 22, "humidity": 68, "condition": "Humid Heat", "rainProb": 30, "wind": 12.0, "icon": "CloudSun", "sprayingIndex": "Early Morning Only"},
        {"day": "Sun", "date": "Aug 9", "tempMax": 31, "tempMin": 19, "humidity": 74, "condition": "Light Showers", "rainProb": 50, "wind": 14.1, "icon": "CloudRain", "sprayingIndex": "Caution"}
    ]

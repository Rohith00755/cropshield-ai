from fastapi import APIRouter
import random

router = APIRouter(prefix="/api", tags=["IoT Sensors"])

@router.get("/sensor-data")
async def get_sensor_data():
    temp_val = round(28.4 + random.uniform(-0.3, 0.3), 1)
    humidity_val = random.randint(76, 80)
    soil_val = random.randint(40, 44)

    return {
        "esp32Status": "Online",
        "batteryPercentage": 92,
        "signalStrengthDbm": -64,
        "lastPing": "Just now",
        "sensors": [
            { "id": "S1", "name": "Ambient Temperature", "value": str(temp_val), "unit": "°C", "status": "Optimal", "min": 18, "max": 35, "icon": "Thermometer" },
            { "id": "S2", "name": "Relative Humidity", "value": str(humidity_val), "unit": "%", "status": "High Risk", "min": 40, "max": 85, "icon": "Droplets" },
            { "id": "S3", "name": "Soil Moisture (Zone A)", "value": str(soil_val), "unit": "%", "status": "Optimal", "min": 30, "max": 60, "icon": "Waves" },
            { "id": "S4", "name": "Soil Moisture (Zone B)", "value": "31", "unit": "%", "status": "Warning Low", "min": 30, "max": 60, "icon": "Waves" },
            { "id": "S5", "name": "Solar Irradiance", "value": "840", "unit": "W/m²", "status": "High Sunlight", "min": 200, "max": 1000, "icon": "Sun" },
            { "id": "S6", "name": "Wind Velocity", "value": "11.2", "unit": "km/h", "status": "Moderate Breeze", "min": 0, "max": 30, "icon": "Wind" }
        ]
    }

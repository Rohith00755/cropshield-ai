from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
import datetime

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

SECRET_KEY = "cropshield_secret_key_agritech_2026"

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    farmName: str

@router.post("/login")
async def login(payload: LoginRequest):
    token_data = {
        "sub": payload.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    return {
        "success": True,
        "token": token,
        "user": {
            "name": payload.email.split('@')[0].capitalize(),
            "email": payload.email,
            "role": "Lead AgriTech Specialist",
            "farmName": "GreenAcres Precision Farms"
        }
    }

@router.post("/register")
async def register(payload: RegisterRequest):
    token_data = {
        "sub": payload.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    return {
        "success": True,
        "token": token,
        "user": {
            "name": payload.name,
            "email": payload.email,
            "farmName": payload.farmName,
            "role": "Farmer & Precision Specialist"
        }
    }

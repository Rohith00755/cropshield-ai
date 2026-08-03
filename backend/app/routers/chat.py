from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.chatgpt_service import chatgpt_agent

router = APIRouter(prefix="/api", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    model: Optional[str] = "gpt-4o-mini"
    cropContext: Optional[Dict[str, Any]] = None

@router.post("/chat")
async def chat_with_agent(payload: ChatRequest):
    try:
        response = chatgpt_agent.generate_response(
            user_query=payload.message,
            crop_context=payload.cropContext,
            model=payload.model
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

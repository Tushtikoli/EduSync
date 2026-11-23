import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/ai", tags=["AI Tutor"])

SYSTEM_PROMPT = """You are Sync, an AI study buddy for EduSync platform for BSc IT students at SNDT Women's University Mumbai.
Help students understand syllabus topics in simple friendly language.
Give examples relevant to Indian college students.
Answer questions about Data Structures, Web Technology, Database Management, Software Engineering, Python, Java.
Be encouraging and supportive. Keep responses concise but complete."""

class TutorRequest(BaseModel):
    message: str
    subject: str = "General"
    conversation_history: list = []

class TutorResponse(BaseModel):
    response: str

@router.post("/tutor", response_model=TutorResponse)
async def ai_tutor(request: TutorRequest):
    try:
        from groq import Groq
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="GROQ_API_KEY not found")

        client = Groq(api_key=api_key)
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        for msg in request.conversation_history[-10:]:
            messages.append({"role": msg["role"], "content": msg["content"]})

        messages.append({
            "role": "user",
            "content": f"Subject: {request.subject}\n\nQuestion: {request.message}"
        })

        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=messages,
            max_tokens=1024,
            temperature=1,
        )

        return TutorResponse(response=completion.choices[0].message.content)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")

@router.get("/health")
def ai_health():
    api_key = os.getenv("GROQ_API_KEY")
    return {
        "status": "AI Tutor is ready",
        "model": "openai/gpt-oss-120b",
        "key_loaded": bool(api_key)
    }
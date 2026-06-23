import os
from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize model
model = genai.GenerativeModel("gemini-2.5-flash")

# Initialize chat session (memory)
chat = model.start_chat(history=[])

# Create router
router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)

# Request schema
class ChatRequest(BaseModel):
    message: str

# Chat endpoint
@router.post("/")
def chat_api(request: ChatRequest):
    user_input = request.message
    response = chat.send_message(user_input)
    return {"reply": response.text}
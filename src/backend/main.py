import logging
import os
import tempfile

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile

from backend.agents.phone_scam_agent import PhoneScamAgent, PhoneScamAgentMessage
from backend.agents.text_fraud_agent import TextFraudDetector, TextFraudDetectorMessage
from backend.llm.exalome import ExalomeLLM
from backend.llm.openai_llm import OpenAILLM
from backend.logging_config import setup_logging
from backend.models import ContentScamRequest, EmailRequest, PhoneReputationRequest
from backend.stt.openai_stt import OpenAISTT
from backend.stt.whisper_stt import WhisperSTT

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

COSTLESS = os.getenv("COSTLESS", "false").lower() == "true"
GPU = os.getenv("GPU", "false").lower() == "true"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if COSTLESS and not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY must be set when COSTLESS is true.")

# Initialize LLM
device = "cuda" if GPU else "cpu"
llm = ExalomeLLM(device=device) if COSTLESS else OpenAILLM(api_key=OPENAI_API_KEY)
stt = WhisperSTT(device=device) if COSTLESS else OpenAISTT(api_key=OPENAI_API_KEY)

# Create agents
fraud_detector = TextFraudDetector(llm=llm)
phone_scam_agent = PhoneScamAgent(llm=llm, stt=stt)

app = FastAPI()


@app.post("/phone-reputation-check")
async def phone_reputation_check(
    phone_number: str = Form(...),
    call_type: str = Form(...),
    caller_id: str = Form(...),
    audio: UploadFile = File(...),
):
    """Simulated phone reputation check with audio input."""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        temp_file.write(await audio.read())
        temp_path = temp_file.name

    response = phone_scam_agent.run(PhoneScamAgentMessage(temp_path))
    logger.info("Agent decision: %s", response.decision)

    response = {
        "is_scam": True if response.decision == "Fraudulent" else False,
        "reputation_score": 2,
        "reported_count": 54,
        "scam_types": ["scam"],
        "last_reported": "2025-01-08T15:20:00Z",
    }

    os.remove(temp_path)

    return response


@app.post("/content-scam-detection")
def content_scam_detection(request: ContentScamRequest):
    """Mocked content scam detection."""
    message = TextFraudDetectorMessage(request.content)
    response = fraud_detector.run(message)
    logger.info("Agent decision: %s", response.decision)
    response = {
        "is_scam": True if response == "Fraudulent" else False,
        "scam_probability": 0,
        "detected_patterns": ["scam"],
        "suggested_action": "Block sender and report",
    }
    return response


@app.post("/email-header-check")
def email_header_check(request: EmailRequest):
    """Mocked email header check."""
    message = TextFraudDetectorMessage(request.content)
    response = fraud_detector.run(message)
    logger.info("Agent decision: %s", response.decision)
    response = {
        "is_scam": True if response == "Fraudulent" else False,
        "detected_issues": [
            "spoofed_sender_domain",
            "mismatched_ip_address",
            "urgent_language",
        ],
        "suggested_action": "Mark as phishing",
        "additional_info": "Sender domain 'suspiciousdomain.com' is flagged in DNSBL",
    }
    return response

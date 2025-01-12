import logging
import os
from typing import Optional

from colorlog import ColoredFormatter
from dotenv import load_dotenv
from fastapi import FastAPI

from backend.agents.fraud_detector import (
    TextFraudDetector,
    TextFraudDetectorMessage,
    TextFraudDetectorResponse,
)
from backend.llm.exalome import ExalomeLLM
from backend.llm.openai_llm import OpenAILLM
from backend.logging_config import setup_logging
from backend.models import ContentScamRequest, EmailRequest, PhoneReputationRequest

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

COSTLESS = os.getenv("COSTLESS", "false").lower() == "true"
GPU = os.getenv("GPU", "false").lower() == "true"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
print("Apikey", OPENAI_API_KEY)
if COSTLESS and not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY must be set when COSTLESS is true.")

# Initialize LLM
device = "cuda" if GPU else "cpu"
llm = ExalomeLLM(device=device) if COSTLESS else OpenAILLM(api_key=OPENAI_API_KEY)

# Create TextFraudDetector agent
fraud_detector = TextFraudDetector(llm=llm)

app = FastAPI()


@app.post("/phone-reputation-check")
def phone_reputation_check(request: PhoneReputationRequest):
    """Mocked phone reputation check."""
    response = {
        "is_scam": True,
        "reputation_score": 2,
        "reported_count": 54,
        "scam_types": ["robocall", "phishing"],
        "last_reported": "2025-01-08T15:20:00Z",
    }
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

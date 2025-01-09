from fastapi import FastAPI
from models import ContentScamRequest, EmailHeaderRequest, PhoneReputationRequest

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
    response = {
        "is_scam": True,
        "scam_probability": 0.97,
        "detected_patterns": ["phishing_link", "too_good_to_be_true_offer"],
        "suggested_action": "Block sender and report",
    }
    return response


@app.post("/email-header-check")
def email_header_check(request: EmailHeaderRequest):
    """Mocked email header check."""
    response = {
        "is_scam": True,
        "detected_issues": [
            "spoofed_sender_domain",
            "mismatched_ip_address",
            "urgent_language",
        ],
        "suggested_action": "Mark as phishing",
        "additional_info": "Sender domain 'suspiciousdomain.com' is flagged in DNSBL",
    }
    return response

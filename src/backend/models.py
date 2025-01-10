from typing import Dict

from pydantic import BaseModel


class PhoneReputationRequest(BaseModel):
    phone_number: str
    call_type: str
    caller_id: str


class ContentScamRequest(BaseModel):
    content: str
    message_type: str
    sender_email: str = None


class EmailRequest(BaseModel):
    content: str
    email_headers: Dict[str, str]
    message_id: str
    attachments: bool

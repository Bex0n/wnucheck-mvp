import sys
from typing import Optional

print("PYTHONPATH:", sys.path)


import pytest

from backend.agents.abstract_agent import AbstractAgent, AgentMessage, AgentResponse
from backend.agents.fraud_detector import (
    TextFraudDetector,
    TextFraudDetectorMessage,
    TextFraudDetectorResponse,
)
from backend.llm.abstract_llm import AbstractLLM


class MockLLM(AbstractLLM):
    def generate_response(self, prompt: str) -> str:
        if "compromised" in prompt or "http://fraudulent.link" in prompt:
            return "Fraudulent\nThis conversation contains a suspicious link and urgent language."
        return "Legitimate\nThis conversation appears to be safe."


@pytest.fixture
def mock_llm():
    return MockLLM()


@pytest.fixture
def fraud_detector(mock_llm):
    return TextFraudDetector(llm=mock_llm)


def test_fraudulent_message(fraud_detector):
    message = TextFraudDetectorMessage(
        "Your account has been compromised. "
        "Click this link to secure it: http://fraudulent.link"
    )
    response = fraud_detector.run(message)
    assert response.decision == "Fraudulent"


def test_legitimate_message(fraud_detector):
    message = TextFraudDetectorMessage(
        "Hello, we have updated our terms of service."
        "Please review them at your earliest convenience."
    )
    response = fraud_detector.run(message)
    assert response.decision == "Legitimate"

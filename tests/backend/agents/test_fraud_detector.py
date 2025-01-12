import os

import pytest
from dotenv import load_dotenv

from backend.agents.abstract_agent import AbstractAgent, AgentMessage, AgentResponse
from backend.agents.text_fraud_agent import (
    TextFraudDetector,
    TextFraudDetectorMessage,
    TextFraudDetectorResponse,
)
from backend.llm.abstract_llm import AbstractLLM
from backend.llm.openai_llm import OpenAILLM

# Load environment variables
load_dotenv(dotenv_path=".env")


class MockLLM(AbstractLLM):
    def generate_response(self, prompt: str) -> str:
        if "compromised" in prompt or "http://fraudulent.link" in prompt:
            return "Fraudulent\nThis conversation contains a suspicious link and urgent language."
        return "Legitimate\nThis conversation appears to be safe."

    def parse_response(self, response: str) -> str:
        return response


@pytest.fixture
def mock_llm():
    return MockLLM()


@pytest.fixture
def mocked_fraud_detector(mock_llm):
    return TextFraudDetector(llm=mock_llm)


@pytest.fixture
def fraud_detector():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        pytest.skip("OPENAI_API_KEY is not defined in the environment.")
    llm = OpenAILLM(api_key=api_key)
    return TextFraudDetector(llm)


def test_fraudulent_message(mocked_fraud_detector):
    message = TextFraudDetectorMessage(
        "Your account has been compromised. "
        "Click this link to secure it: http://fraudulent.link"
    )
    response = mocked_fraud_detector.run(message)
    assert response.decision == "Fraudulent"


def test_legitimate_message(mocked_fraud_detector):
    message = TextFraudDetectorMessage(
        "Hello, we have updated our terms of service."
        "Please review them at your earliest convenience."
    )
    response = mocked_fraud_detector.run(message)
    assert response.decision == "Legitimate"


@pytest.mark.skipif(
    "OPENAI_API_KEY" not in os.environ,
    reason="OPENAI_API_KEY is not defined in the environment.",
)
def test_fraud_detector_with_examples(fraud_detector):
    examples = [
        (
            "Your account has been compromised. Click this link: http://fraudulent.link",
            "Fraudulent",
        ),
        (
            "Hello, we have updated our terms of service. Please review them.",
            "Legitimate",
        ),
        ("Show our discounts at www.nike.com", "Spam"),
        ("This is a friendly reminder about your upcoming appointment.", "Legitimate"),
    ]

    for text, expected_outcome in examples:
        message = TextFraudDetectorMessage(text)
        response = fraud_detector.run(message)
        assert response.decision == expected_outcome, f"Failed for text: {text}"

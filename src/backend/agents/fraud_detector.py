from __future__ import annotations

import logging
from typing import Optional

from langchain_core.prompts import PromptTemplate

from backend.agents.abstract_agent import AbstractAgent, AgentMessage, AgentResponse

PROMPT_ = """
You are a fraud detector. Analyze the following message and answer in one word if it's fraudulent, legitimate or spam.
{message}
"""

logger = logging.getLogger(__name__)


class TextFraudDetectorMessage(AgentMessage):
    def __init__(self, text: str):
        self.text = text

    def to_prompt(self) -> str:
        prompt_template = PromptTemplate.from_template(PROMPT_)
        return prompt_template.invoke({"message": self.text}).to_string()


class TextFraudDetectorResponse(AgentResponse):
    def __init__(self, decision: str, explanation: Optional[str] = None):
        self.decision = (
            decision  # Decision is either "Fraudulent", "Legitimate" or "Spam"
        )
        self.explanation = explanation

    @classmethod
    def from_llm_output(cls, llm_output: str) -> TextFraudDetectorResponse:
        try:
            decision = llm_output.split("\n")[0]  # TODO: Smarter parsing
        except IndexError:
            decision = "Unknown"
        explanation = llm_output  # TODO: Smarter parsing
        return cls(decision=decision, explanation=explanation)


class TextFraudDetector(AbstractAgent):
    def run(self, message: TextFraudDetectorMessage) -> TextFraudDetectorResponse:
        prompt = message.to_prompt()
        llm_output = self.llm.generate_response(prompt)
        return TextFraudDetectorResponse.from_llm_output(llm_output)

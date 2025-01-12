from __future__ import annotations

import logging
from typing import Optional

from langchain_core.prompts import PromptTemplate

from backend.agents.abstract_agent import AbstractAgent, AgentMessage, AgentResponse
from backend.llm.abstract_llm import AbstractLLM
from backend.stt.openai_stt import OpenAISTT

PROMPT_ = """
You are a phone scam detector. Analyze the following phone call transcription and answer in one word if it's fraudulent or legitimate.
{transcription}
"""

logger = logging.getLogger(__name__)


class PhoneScamAgentMessage(AgentMessage):
    def __init__(self, file_path: str):
        self.file_path = file_path  # Path to the audio file to be analyzed
        self.transcription = None

    def to_prompt(self) -> str:
        if self.transcription:
            prompt_template = PromptTemplate.from_template(PROMPT_)
            return prompt_template.invoke(
                {"transcription": self.transcription}
            ).to_string()


class PhoneScamAgentResponse(AgentResponse):
    def __init__(self, decision: str, explanation: Optional[str] = None):
        self.decision = decision  # Decision is either "Fraudulent" or "Legitimate"
        self.explanation = explanation

    @classmethod
    def from_llm_output(cls, llm_output: str) -> PhoneScamAgentResponse:
        try:
            decision = llm_output.split("\n")[0]  # TODO: Smarter parsing
        except IndexError:
            decision = "Unknown"
        explanation = llm_output  # TODO: Smarter parsing
        return cls(decision=decision, explanation=explanation)


class PhoneScamAgent(AbstractAgent):
    def __init__(self, llm: AbstractLLM, stt: OpenAISTT):
        super().__init__(llm)
        self.stt = stt

    def run(self, message: PhoneScamAgentMessage) -> PhoneScamAgentResponse:
        transcription = self.stt.run(message.file_path)
        message.transcription = transcription
        logger.info("Transcription: %s", transcription)

        prompt = message.to_prompt()
        llm_output = self.llm.generate_response(prompt)
        return PhoneScamAgentResponse.from_llm_output(llm_output)

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

from backend.llm.abstract_llm import AbstractLLM


class AgentMessage(ABC):
    @abstractmethod
    def to_prompt(self) -> str:
        """Convert the message to a prompt for the LLM."""
        pass


# Define abstract AgentResponse
class AgentResponse(ABC):
    @abstractmethod
    def from_llm_output(cls, llm_output: str) -> AgentResponse:
        """Parse the LLM output into an AgentResponse."""
        pass


# Abstract Agent class
class AbstractAgent(ABC):
    def __init__(self, llm: AbstractLLM):
        self.llm = llm

    @abstractmethod
    def run(self, message: AgentMessage) -> AgentResponse:
        """Process an AgentMessage and return an AgentResponse."""
        pass

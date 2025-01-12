from abc import ABC, abstractmethod


class AbstractLLM(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def generate_response(self, prompt: str) -> str:
        """Generate a response to a prompt."""
        pass

    @abstractmethod
    def parse_response(self, response: str) -> str:
        """Parse a response to extract relevant information."""
        pass

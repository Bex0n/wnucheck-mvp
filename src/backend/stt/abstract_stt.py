from abc import ABC, abstractmethod


class AbstractSTT(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def run(self, file_path: str) -> str:
        """Generate a response to a prompt."""
        pass

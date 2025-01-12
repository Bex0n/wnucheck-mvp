import openai

from backend.stt.abstract_stt import AbstractSTT


class OpenAISTT(AbstractSTT):
    def __init__(self, api_key: str):
        self.model = "whisper-1"
        self.client = openai.OpenAI()

    def run(self, file_path: str) -> str:
        with open(file_path, "rb") as audio_file:
            transcription = self.client.audio.transcriptions.create(
                model=self.model,
                file=audio_file,
            )
        return transcription.text

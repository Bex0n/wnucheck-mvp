import librosa
import torch
from transformers import WhisperForConditionalGeneration, WhisperProcessor

from backend.stt.abstract_stt import AbstractSTT


class WhisperSTT(AbstractSTT):
    def __init__(self, device: str = "cpu"):
        self.device = device
        self.processor = WhisperProcessor.from_pretrained("openai/whisper-large")
        self.model = WhisperForConditionalGeneration.from_pretrained(
            "openai/whisper-large"
        ).to(device)
        self.model.config.forced_decoder_ids = None

    def run(self, file_path: str) -> str:
        audio, sr = librosa.load(file_path, sr=16000)
        input_features = self.processor(
            audio, sampling_rate=16000, return_tensors="pt"
        ).input_features
        input_features = input_features.to(self.device)
        predicted_ids = self.model.generate(input_features)

        transcription = self.processor.batch_decode(
            predicted_ids, skip_special_tokens=True
        )[0]

        return transcription

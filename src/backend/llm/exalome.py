import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

from backend.llm.abstract_llm import AbstractLLM


class ExalomeLLM(AbstractLLM):
    def __init__(self, device: str):
        model_name = "LGAI-EXAONE/EXAONE-3.5-2.4B-Instruct"

        if device == "cuda" and torch.cuda.is_available():
            self.model = AutoModelForCausalLM.from_pretrained(
                model_name,
                trust_remote_code=True,
                torch_dtype=torch.bfloat16,
                device_map="auto",
            )
            self.device = "cuda"
        else:
            self.model = AutoModelForCausalLM.from_pretrained(
                model_name,
                trust_remote_code=True,
                torch_dtype=torch.float32,
            )
            self.device = "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

    def generate_response(self, prompt: str) -> str:
        messages = [
            {
                "role": "user",
                "content": prompt,
            },
        ]
        input_ids = self.tokenizer.apply_chat_template(
            messages, tokenize=True, add_generation_prompt=True, return_tensors="pt"
        )
        input_ids = input_ids.to(self.device)

        output = self.model.generate(
            input_ids,
            eos_token_id=self.tokenizer.eos_token_id,
            max_new_tokens=256,
            do_sample=False,
        )
        decoded_output = self.tokenizer.decode(output[0])

        return self.parse_response(decoded_output)

    def parse_response(self, response: str) -> str:
        try:
            assistant_start = response.rfind("[|assistant|]") + len("[|assistant|]")
            end_of_turn = response.rfind("[|endofturn|]")
            return response[assistant_start:end_of_turn].strip()
        except ValueError:
            return "Response could not be parsed."

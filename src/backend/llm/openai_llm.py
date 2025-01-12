import openai

from backend.llm.abstract_llm import AbstractLLM


class OpenAILLM(AbstractLLM):
    def __init__(self, api_key: str):
        self.model = "gpt-4o-mini"
        self.client = openai.OpenAI()

    def generate_response(self, prompt: str) -> str:
        messages = [
            {
                "role": "user",
                "content": prompt,
            },
        ]
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
        )

        return response.choices[0].message.content

    def parse_response(self, response: str) -> str:
        return response

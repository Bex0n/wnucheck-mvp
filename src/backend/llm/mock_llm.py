class MockLLM:
    def generate_response(self, prompt: str) -> str:
        return "Fraudulent\nThis conversation contains a suspicious link and urgent language."

    def parse_response(self, response: str) -> str:
        return response

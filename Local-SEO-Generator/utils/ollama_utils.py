# Local-SEO-Generator/generete-blogs/version-2/utils/ollama_utils.py
import subprocess
import logging
import time

def retry_with_backoff(max_retries: int = 3):
    """Simple retry decorator"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise e
                    time.sleep(1 * (attempt + 1))  # Simple backoff
            return None
        return wrapper
    return decorator

class OllamaManager:
    """Simple Ollama manager"""

    def __init__(self, model_name: str = "llama3.2", timeout: int = 300):
        self.model_name = model_name
        self.timeout = timeout
        self.logger = logging.getLogger(__name__)

    @retry_with_backoff(max_retries=3)
    def verify_installation(self) -> bool:
        """Verify Ollama is working"""
        try:
            result = subprocess.run(
                ['ollama', 'run', self.model_name, 'Say "VERIFIED"'],
                capture_output=True,
                text=True,
                timeout=30
            )
            if result.returncode != 0:
                raise Exception(f"Ollama test failed: {result.stderr}")
            if "VERIFIED" not in result.stdout:
                raise Exception("Ollama verification failed")
            self.logger.info("✓ Ollama verification successful")
            return True
        except subprocess.TimeoutExpired:
            raise Exception("Ollama verification timed out")

    @retry_with_backoff(max_retries=2)
    def run_prompt(self, prompt: str) -> str:
        """Run prompt through Ollama"""
        try:
            result = subprocess.run(
                ['ollama', 'run', self.model_name, prompt],
                capture_output=True,
                text=True,
                timeout=self.timeout
            )
            if result.returncode != 0:
                raise Exception(f"Ollama error: {result.stderr}")
            content = result.stdout.strip()
            if not content or len(content) < 20:
                raise Exception("Generated content too short")
            if "I cannot" in content or "I'm sorry" in content:
                raise Exception("Model refusal detected")
            return content
        except subprocess.TimeoutExpired:
            raise Exception("Ollama request timed out")
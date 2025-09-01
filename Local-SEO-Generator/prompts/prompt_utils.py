# Local-SEO-Generator/generete-blogs/version-2/prompts/prompt_utils.py
import random
import logging
from typing import Set

def ensure_unique_prompt(prompt: str, used_prompts: Set[str]) -> str:
    """Ensure the prompt is unique, fallback with a random suffix if needed."""
    if prompt not in used_prompts:
        return prompt
    suffix = random.randint(1000, 9999)
    return f"{prompt} #{suffix}"

def fallback_prompt_variation(base_prompt: str, variations: list, used_prompts: Set[str]) -> str:
    """Return the first unused prompt variation, or fallback with a random suffix."""
    for variation in variations:
        if variation not in used_prompts:
            return variation
    suffix = random.randint(1000, 9999)
    return f"{base_prompt} #{suffix}"

def log_prompt_generation(prompt_type: str, prompt: str):
    """Log prompt generation for debugging/audit."""
    logger = logging.getLogger(__name__)
    logger.debug(f"Generated {prompt_type} prompt: {prompt[:80]}...")
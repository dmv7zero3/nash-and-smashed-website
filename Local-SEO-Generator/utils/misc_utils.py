# Local-SEO-Generator/generete-blogs/version-2/utils/misc_utils.py
import random
import uuid

def random_id(prefix: str = "id") -> str:
    """Generate a random unique ID with a prefix."""
    return f"{prefix}_{uuid.uuid4().hex[:8]}"

def random_choice_weighted(choices: list, weights: list) -> any:
    """Select a random item from choices with given weights."""
    if not choices or not weights or len(choices) != len(weights):
        raise ValueError("Choices and weights must be non-empty and of equal length.")
    return random.choices(choices, weights=weights, k=1)[0]

def chunk_list(items: list, chunk_size: int) -> list:
    """Split a list into chunks of given size."""
    return [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]
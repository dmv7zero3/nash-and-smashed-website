# Local-SEO-Generator/generete-blogs/version-2/prompts/init.py
from .prompt_templates import (
    INTRO_OPERATIONAL_TEMPLATE,
    INTRO_UPCOMING_TEMPLATE,
    MIDDLE_OPERATIONAL_TEMPLATE,
    MIDDLE_UPCOMING_TEMPLATE,
    CONCLUSION_OPERATIONAL_TEMPLATE,
    CONCLUSION_UPCOMING_TEMPLATE,
    META_DESCRIPTION_OPERATIONAL,
    META_DESCRIPTION_UPCOMING
)
from .prompt_logic import EnhancedContentPrompts
from .prompt_utils import ensure_unique_prompt, fallback_prompt_variation, log_prompt_generation
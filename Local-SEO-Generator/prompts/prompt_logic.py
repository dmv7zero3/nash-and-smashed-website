# Local-SEO-Generator/generete-blogs/version-2/prompts/prompt_logic.py
import logging
import time
from typing import Dict, Any, Set
from .prompt_templates import (
    INTRO_OPERATIONAL_TEMPLATE, INTRO_UPCOMING_TEMPLATE,
    MIDDLE_OPERATIONAL_TEMPLATE, MIDDLE_UPCOMING_TEMPLATE,
    CONCLUSION_OPERATIONAL_TEMPLATE, CONCLUSION_UPCOMING_TEMPLATE,
    META_DESCRIPTION_OPERATIONAL, META_DESCRIPTION_UPCOMING
)

logger = logging.getLogger(__name__)

class EnhancedContentPrompts:
    """Status-aware prompt generation and validation"""

    @staticmethod
    def generate_unique_title(keyword: str, city: str, state: str, existing_titles: Set[str], title_preposition: str = "in") -> str:
        """Generate unique, SEO-optimized titles based on location status"""
        if title_preposition == "in":
            title_variations = [
                f"Best {keyword} in {city}, {state} | Nash & Smashed",
                f"{keyword} Near Me in {city}, {state} - Nash & Smashed",
                f"Authentic {keyword} | {city}, {state} Restaurant",
                f"Top-Rated {keyword} in {city}, {state} | Nash & Smashed",
                f"{keyword} Delivery & Takeout | {city}, {state}",
                f"Fresh {keyword} in {city}, {state} - Order Now",
                f"{keyword} Restaurant | {city}, {state} | Nash & Smashed"
            ]
        else:
            title_variations = [
                f"{keyword} Coming to {city}, {state} | Nash & Smashed",
                f"Nash & Smashed Opening Soon in {city}, {state} | {keyword}",
                f"Get Ready for {keyword} in {city}, {state}",
                f"{keyword} Restaurant Coming Soon | {city}, {state}",
                f"Nash & Smashed Brings {keyword} to {city}, {state}",
                f"Exciting News: {keyword} Coming to {city}, {state}",
                f"Coming Soon: Authentic {keyword} | {city}, {state}"
            ]
        for title in title_variations:
            if title not in existing_titles:
                return title
        timestamp = int(time.time()) % 10000
        return f"{keyword} {title_preposition} {city}, {state} | Nash & Smashed #{timestamp}"

    @staticmethod
    def generate_unique_meta_description(keyword: str, city: str, state: str, existing_descriptions: Set[str], status: str = "operational") -> str:
        """Generate unique meta descriptions based on location status"""
        if status == "operational":
            description_variations = [desc.format(keyword=keyword, city=city, state=state) for desc in META_DESCRIPTION_OPERATIONAL]
        else:
            description_variations = [desc.format(keyword=keyword, city=city, state=state) for desc in META_DESCRIPTION_UPCOMING]
        for desc in description_variations:
            if desc not in existing_descriptions:
                return desc
        if status == "operational":
            return f"Enjoy delicious {keyword} at Nash & Smashed in {city}, {state}. Fresh, flavorful, and made to order. Visit us today!"
        else:
            return f"Nash & Smashed coming soon to {city}, {state}! Get ready for amazing {keyword} and more. Stay tuned for updates!"

    @staticmethod
    def intro_prompt(keyword: str, title_preposition: str, location_part: str, business_name: str, business_description: str, location_info: Dict[str, Any], city: str, content_tone: str) -> str:
        """Generate introduction paragraph prompt based on location status"""
        if content_tone == "operational":
            return INTRO_OPERATIONAL_TEMPLATE.format(
                keyword=keyword,
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                address=location_info.get('address', ''),
                business_description=business_description
            )
        else:
            return INTRO_UPCOMING_TEMPLATE.format(
                keyword=keyword,
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                business_description=business_description
            )

    @staticmethod
    def middle_prompt(keyword: str, business_name: str, location_info: Dict[str, Any], city: str, intro_content: str, content_tone: str) -> str:
        """Generate middle content prompt based on location status"""
        if content_tone == "operational":
            return MIDDLE_OPERATIONAL_TEMPLATE.format(
                keyword=keyword,
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                intro_content=intro_content
            )
        else:
            return MIDDLE_UPCOMING_TEMPLATE.format(
                keyword=keyword,
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                intro_content=intro_content
            )

    @staticmethod
    def conclusion_prompt(business_name: str, location_info: Dict[str, Any], city: str, intro_content: str, middle_content: str, online_ordering_url: str, content_tone: str) -> str:
        """Generate conclusion with call-to-action based on location status"""
        if content_tone == "operational":
            return CONCLUSION_OPERATIONAL_TEMPLATE.format(
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                phone=location_info.get('phone', ''),
                address=location_info.get('address', '')
            )
        else:
            return CONCLUSION_UPCOMING_TEMPLATE.format(
                business_name=business_name,
                city=city,
                state=location_info.get('state', ''),
                email=location_info.get('email', '')
            )

    @staticmethod
    def validate_content_requirements(content_type: str, content: str) -> Dict[str, Any]:
        """Basic content validation"""
        word_count = len(content.split())
        char_count = len(content)
        requirements = {
            'meta_description': {'min_chars': 100, 'max_chars': 160},
            'intro': {'min_words': 50, 'max_words': 130},
            'middle': {'min_words': 70, 'max_words': 160},
            'conclusion': {'min_words': 35, 'max_words': 90}
        }
        if content_type not in requirements:
            return {"overall_valid": False, "error": f"Unknown content type: {content_type}"}
        req = requirements[content_type]
        if content_type == 'meta_description':
            valid = req['min_chars'] <= char_count <= req['max_chars']
        else:
            valid = req['min_words'] <= word_count <= req['max_words']
        return {
            "overall_valid": valid and len(content.strip()) > 20,
            "word_count": word_count,
            "char_count": char_count,
            "content_type": content_type
        }
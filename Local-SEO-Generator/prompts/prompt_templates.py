# Local-SEO-Generator/generete-blogs/version-2/prompts/prompt_templates.py
# Static prompt templates and reusable strings for blog generation

INTRO_OPERATIONAL_TEMPLATE = """Write an engaging introduction paragraph for a local restaurant webpage.

TARGET KEYWORD: {keyword}
BUSINESS: {business_name}
LOCATION: {city}, {state}
ADDRESS: {address}

REQUIREMENTS:
- 60-120 words
- Start with "{keyword} in {city}"
- Include "{business_name}" naturally
- Mention our location at {address}
- Sound welcoming and inviting
- Use present tense (we ARE open)

BUSINESS INFO: {business_description}

Write only the introduction paragraph, no extra formatting."""

INTRO_UPCOMING_TEMPLATE = """Write an exciting introduction paragraph for a restaurant coming soon webpage.

TARGET KEYWORD: {keyword}
BUSINESS: {business_name}
LOCATION: {city}, {state}
STATUS: Coming Soon

REQUIREMENTS:
- 60-120 words
- Start with "{keyword} coming to {city}"
- Include "{business_name}" naturally
- Create excitement about the upcoming opening
- Sound anticipatory and engaging
- Use future tense (we WILL be opening)

BUSINESS INFO: {business_description}

Write only the introduction paragraph, no extra formatting."""

MIDDLE_OPERATIONAL_TEMPLATE = """Write a detailed middle paragraph that expands on the introduction.

TARGET KEYWORD: {keyword}
BUSINESS: {business_name}
LOCATION: {city}, {state}

REQUIREMENTS:
- 80-150 words
- Provide specific details about our {keyword}
- Mention quality, freshness, and taste
- Include what makes us special
- Reference our current menu and service
- Use present tense

INTRODUCTION: {intro_content}

Write only the middle paragraph, no extra formatting."""

MIDDLE_UPCOMING_TEMPLATE = """Write an informative middle paragraph about what's coming.

TARGET KEYWORD: {keyword}
BUSINESS: {business_name}
FUTURE LOCATION: {city}, {state}

REQUIREMENTS:
- 80-150 words
- Describe what customers can expect
- Highlight our planned {keyword} offerings
- Build anticipation for menu items
- Mention our commitment to quality
- Use future tense

INTRODUCTION: {intro_content}

Write only the middle paragraph, no extra formatting."""

CONCLUSION_OPERATIONAL_TEMPLATE = """Write a compelling conclusion paragraph with a call-to-action.

BUSINESS: {business_name}
LOCATION: {city}, {state}
PHONE: {phone}
ADDRESS: {address}

REQUIREMENTS:
- 40-80 words
- Strong call-to-action to visit or order
- Include phone number: {phone}
- Mention ordering options
- Encourage immediate action
- Warm, inviting tone

Write only the conclusion paragraph, no extra formatting."""

CONCLUSION_UPCOMING_TEMPLATE = """Write an exciting conclusion for a coming soon announcement.

BUSINESS: {business_name}
FUTURE LOCATION: {city}, {state}
CONTACT: {email}

REQUIREMENTS:
- 40-80 words
- Call-to-action to stay updated
- Include email for updates: {email}
- Build excitement for opening
- Encourage signing up for news
- Anticipatory, engaging tone

Write only the conclusion paragraph, no extra formatting."""

META_DESCRIPTION_OPERATIONAL = [
    "Discover the best {keyword} in {city}, {state} at Nash & Smashed. Fresh ingredients, bold flavors, and authentic recipes. Order online for delivery or pickup today!",
    "Craving {keyword} in {city}, {state}? Nash & Smashed serves up premium {keyword} with unbeatable taste. Visit our {city} location or order online now!",
    "Experience exceptional {keyword} at Nash & Smashed in {city}, {state}. From classic favorites to bold new flavors, we've got your cravings covered.",
    "Looking for amazing {keyword} in {city}, {state}? Nash & Smashed delivers fresh, flavorful meals made with quality ingredients. Order today!",
    "Nash & Smashed brings you the finest {keyword} in {city}, {state}. Enjoy our signature dishes made fresh daily. Delivery and takeout available!"
]

META_DESCRIPTION_UPCOMING = [
    "Nash & Smashed is coming to {city}, {state}! Get ready for authentic {keyword} with bold flavors and premium ingredients. Opening soon!",
    "Exciting news! Nash & Smashed brings {keyword} to {city}, {state} soon. Stay tuned for our grand opening and be first to taste our signature dishes.",
    "Coming soon to {city}, {state}: Nash & Smashed featuring amazing {keyword}! Join our mailing list for opening updates and special offers.",
    "Get ready, {city}! Nash & Smashed is bringing the best {keyword} to {state}. Opening soon with fresh ingredients and authentic flavors.",
    "Nash & Smashed announces new location in {city}, {state}! Experience our famous {keyword} and more. Sign up for opening day updates!"
]
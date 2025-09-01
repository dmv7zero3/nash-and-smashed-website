# Local-SEO-Generator/generete-blogs/version-2/utils/content_utils.py
import re

def clean_content(raw_content: str) -> str:
    """Clean and normalize content."""
    if not raw_content:
        return ""
    content = raw_content.strip(' \n\r\t"\'')
    content = re.sub(r'[*_#]', '', content)  # Remove Markdown
    content = re.sub(r'\n{2,}', '\n', content)  # Multiple newlines
    content = content.replace('\n', ' ')  # Newlines to spaces
    content = re.sub(r'\s+', ' ', content).strip()  # Normalize whitespace
    return content

def enhanced_seo_friendly_url(title: str, keyword: str, location: str, max_length: int = 100) -> str:
    """Generate SEO-friendly URL."""
    keyword_clean = re.sub(r'[^a-zA-Z0-9\s-]', '', keyword.lower()).strip()
    keyword_part = '-'.join(keyword_clean.split()[:6])
    city, state = parse_location(location)
    city_clean = re.sub(r'[^a-zA-Z0-9\s-]', '', city.lower()).strip()
    city_part = '-'.join(city_clean.split()[:3])
    state_part = state.lower() if state and state != "UNKNOWN" else ""
    keyword_part = keyword_part[:max_length] or "service"
    city_part = city_part[:max_length] or "location"
    if state_part:
        return f"{keyword_part}/{city_part}-{state_part}"
    else:
        return f"{keyword_part}/{city_part}"

def parse_location(location_part: str):
    """Extract city and state from location string with better international support."""
    location_part = location_part.strip()
    
    # Known international states/regions that aren't 2-letter codes
    international_states = {
        'essex', 'surrey', 'kent', 'london', 'yorkshire', 'lancashire', 
        'cornwall', 'devon', 'somerset', 'dorset', 'hampshire', 'sussex',
        'ontario', 'quebec', 'alberta', 'columbia', 'brunswick', 'scotia',
        'prince edward island', 'newfoundland', 'yukon', 'territories'
    }
    
    # Format: "city-state"
    if "-" in location_part:
        segments = location_part.split("-")
        if len(segments[-1]) == 2:
            state = segments[-1].upper()
            city = " ".join(segments[:-1])
            return city.replace("-", " "), state
    
    # Format: "city state" - handle both US 2-letter states and international regions
    words = location_part.split()
    if len(words) > 1:
        last_word = words[-1].lower()
        
        # Check if last word is a 2-letter state code (US/CA style)
        if len(last_word) == 2:
            state = words[-1].upper()
            city = " ".join(words[:-1])
            return city, state
        
        # Check if last word is a known international state/region
        elif last_word in international_states:
            state = words[-1].title()  # Capitalize properly (Essex, not ESSEX)
            city = " ".join(words[:-1])
            return city, state
        
        # Check for multi-word international states (like "Prince Edward Island")
        elif len(words) >= 3:
            # Try last 2 words
            last_two = f"{words[-2]} {words[-1]}".lower()
            if last_two in international_states:
                state = f"{words[-2]} {words[-1]}".title()
                city = " ".join(words[:-2])
                return city, state
            
            # Try last 3 words for places like "Prince Edward Island"
            if len(words) >= 4:
                last_three = f"{words[-3]} {words[-2]} {words[-1]}".lower()
                if last_three in international_states:
                    state = f"{words[-3]} {words[-2]} {words[-1]}".title()
                    city = " ".join(words[:-3])
                    return city, state
    
    # Format: "city, state"
    if "," in location_part:
        parts = [p.strip() for p in location_part.split(",")]
        if len(parts) >= 2:
            city = parts[0]
            state_part = parts[1].strip()
            
            # Handle 2-letter codes
            if len(state_part) == 2:
                state = state_part.upper()
            # Handle longer state names
            elif state_part.lower() in international_states:
                state = state_part.title()
            else:
                # Try to extract 2-letter code from longer string
                state_match = re.search(r'\b([A-Z]{2})\b', state_part.upper())
                state = state_match.group(1) if state_match else state_part.title()
            
            return city, state
    
    return location_part, "UNKNOWN"
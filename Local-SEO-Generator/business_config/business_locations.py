from typing import Dict, Optional
from .business_profile import LocationProfile, BusinessProfile

def get_location_key(city: str, state: str, location_id: str = None, location_name: str = None) -> str:
    """Generate a normalized key for a location, using ID or name for uniqueness when needed."""
    base_key = f"{city.strip().lower()}-{state.strip().lower()}"
    
    # If we have a location_id or name, use it to ensure uniqueness
    if location_id:
        return f"{base_key}-{location_id.strip().lower()}"
    elif location_name and location_name.strip().lower() != city.strip().lower():
        # Only add name if it's different from city to avoid redundancy
        return f"{base_key}-{location_name.strip().lower().replace(' ', '-')}"
    
    return base_key

def get_location_info(business_config: BusinessProfile, city: str, state: str) -> Optional[LocationProfile]:
    """Retrieve LocationProfile for a given city and state from business config."""
    # First try exact city-state match
    base_key = f"{city.strip().lower()}-{state.strip().lower()}"
    
    # Look for any location that starts with this base key
    for key, location in business_config.locations.items():
        if key.startswith(base_key):
            # Check if the location's city and state match what we're looking for
            if (location.city.strip().lower() == city.strip().lower() and 
                location.state.strip().lower() == state.strip().lower()):
                return location
    
    return None

def add_location(business_config: BusinessProfile, location: LocationProfile):
    """Add a new location to the business config."""
    # Use the location's ID if available, otherwise use name
    location_id = getattr(location, 'id', None)
    location_name = getattr(location, 'name', None)
    key = get_location_key(location.city, location.state, location_id, location_name)
    business_config.locations[key] = location

def count_locations_by_status(business_config: BusinessProfile, status: str) -> int:
    """Count locations by status (operational, upcoming, coming_soon)."""
    return sum(1 for loc in business_config.locations.values() if loc.status == status)
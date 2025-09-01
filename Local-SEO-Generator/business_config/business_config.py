# Local-SEO-Generator/generete-blogs/version-2/business_config/business_config.py
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
from .business_profile import BusinessProfile, LocationProfile
from .business_locations import get_location_key, add_location, count_locations_by_status

logger = logging.getLogger(__name__)

class BusinessConfig:
    """Handles loading and validation of business configuration."""

    @staticmethod
    def get_config(business_id: str, config_path: str = "business-data.json") -> BusinessProfile:
        """Load business configuration from JSON and return BusinessProfile."""
        config_file = Path(config_path)
        if not config_file.exists():
            logger.error(f"Config file not found: {config_path}")
            raise FileNotFoundError(f"Config file not found: {config_path}")

        with open(config_file, "r") as f:
            data = json.load(f)

        if business_id not in data:
            logger.error(f"Business ID '{business_id}' not found in config.")
            raise KeyError(f"Business ID '{business_id}' not found in config.")

        business_data = data[business_id]
        locations_dict = {}

        # Load locations if present
        locations_data = business_data.get("locations", [])
        for loc in locations_data:
            location = LocationProfile(
                city=loc.get("city", ""),
                state=loc.get("state", ""),
                status=loc.get("status", "upcoming"),
                phone=loc.get("phone"),
                address=loc.get("address"),
                email=loc.get("email")
            )
            # Add id and name attributes for key generation
            location.id = loc.get("id", "")
            location.name = loc.get("name", "")
            
            # Use the location's ID and name for unique key generation
            key = get_location_key(location.city, location.state, location.id, location.name)
            locations_dict[key] = location

        # Count locations by status directly
        operational_count = sum(1 for loc in locations_dict.values() if loc.status == "operational")
        upcoming_count = sum(1 for loc in locations_dict.values() if loc.status == "upcoming")

        # Create single BusinessProfile instance
        return BusinessProfile(
            business_id=business_data.get("business_id", business_id),
            business_name=business_data.get("business_name", ""),
            db_path=business_data.get("db_path", "generated_blogs.db"),
            email=business_data.get("email", ""),
            phone=business_data.get("phone", ""),
            online_ordering_url=business_data.get("online_ordering_url", ""),
            description=business_data.get("description", ""),
            locations=locations_dict,
            operational_locations=operational_count,
            upcoming_locations=upcoming_count,
            output_paths=business_data.get("output_paths", {}),
            seo_keywords=business_data.get("seo_keywords", []),
            base_url=business_data.get("base_url", "")
        )

    @staticmethod
    def get_location_info(business_config: BusinessProfile, city: str, state: str) -> Optional[LocationProfile]:
        """Get location info for a given city and state."""
        from .business_locations import get_location_info
        return get_location_info(business_config, city, state)
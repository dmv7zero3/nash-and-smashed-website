from dataclasses import dataclass, field
from typing import Dict, Any, Optional, List

@dataclass
class LocationProfile:
    city: str
    state: str
    status: str = "upcoming"  # operational, upcoming, coming_soon
    phone: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None

@dataclass
class BusinessProfile:
    business_id: str
    business_name: str
    db_path: str
    email: str
    phone: str
    online_ordering_url: str
    description: str = ""
    locations: Dict[str, LocationProfile] = field(default_factory=dict)
    operational_locations: int = 0
    upcoming_locations: int = 0
    output_paths: Dict[str, str] = field(default_factory=dict)
    seo_keywords: List[str] = field(default_factory=list)
    base_url: str = ""
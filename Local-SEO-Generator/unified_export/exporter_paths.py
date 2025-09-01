# Local-SEO-Generator/generete-blogs/version-2/unified_export/exporter_utils.py
import os
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

def ensure_default_paths(output_paths: dict, business_id: str) -> dict:
    """Ensure all required output paths exist and return updated dict."""
    defaults = {
        "react_app": f"src/core/Blogs/Templates/LocalSEO",
        "dist": f"dist/blogs/{business_id}/json",
        "backup": f"backup/blogs/{business_id}",
        "sitemap": "dist/sitemaps"
    }
    for key, path in defaults.items():
        if key not in output_paths:
            output_paths[key] = path
    for path_type, path in output_paths.items():
        try:
            os.makedirs(path, exist_ok=True)
            logger.debug(f"Ensured directory exists: {path}")
        except Exception as e:
            logger.warning(f"Could not create directory {path}: {e}")
    return output_paths
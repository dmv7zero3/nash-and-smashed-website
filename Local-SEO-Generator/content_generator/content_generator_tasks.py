# Local-SEO-Generator/generete-blogs/version-2/content_generator/content_generator_tasks.py
import time
import logging
import random
from typing import Dict, Any, List, Tuple
from .content_generator_core import SimplifiedContentGenerator

logger = logging.getLogger(__name__)

def generate_multiple_blogs(generator: SimplifiedContentGenerator, count: int) -> Dict[str, Any]:
    """
    Generate specified number of blogs using the generator's business configuration.
    Prioritizes operational locations, then upcoming.
    """
    start_time = time.time()
    business_config = generator.business_config

    # Get SEO keywords and location combinations
    seo_keywords = getattr(business_config, "seo_keywords", [])
    combinations = []
    for location_name, location_info in business_config.locations.items():
        for keyword in seo_keywords:
            combinations.append((
                keyword, 
                f"{location_info.city} {location_info.state}",
                location_info.status
            ))

    if not combinations:
        return {"success": False, "reason": "no_combinations_found"}

    # Shuffle and prioritize operational locations
    operational = [(k, l, s) for k, l, s in combinations if s == "operational"]
    upcoming = [(k, l, s) for k, l, s in combinations if s != "operational"]

    random.shuffle(operational)
    random.shuffle(upcoming)

    selected = (operational + upcoming)[:count]

    logger.info(f"Generating {len(selected)} blogs from {len(combinations)} possible combinations")
    logger.info(f"Priority: {len([s for _, _, s in selected if s == 'operational'])} operational, "
                f"{len([s for _, _, s in selected if s != 'operational'])} upcoming")

    results = {
        "success": True,
        "total_requested": count,
        "total_generated": 0,
        "successful": [],
        "failed": [],
        "generation_time": 0,
        "by_status": {"operational": 0, "upcoming": 0, "coming_soon": 0}
    }

    for i, (keyword, location, status) in enumerate(selected, 1):
        if not generator.running:
            logger.info("Generation stopped by user")
            break

        logger.info(f"Generating {i}/{len(selected)}: {keyword} | {location} ({status})")
        try:
            result = generator.generate_blog_content(keyword, location)
            if result.get("success"):
                results["successful"].append({
                    "keyword": keyword,
                    "location": location,
                    "title": result["title"],
                    "url": result["url"],
                    "word_count": result["word_count"],
                    "status": result.get("location_status", status)
                })
                results["total_generated"] += 1
                results["by_status"][result.get("location_status", status)] += 1
                logger.info(f"✓ {i}/{len(selected)}: {result['title']}")
            else:
                results["failed"].append({
                    "keyword": keyword,
                    "location": location,
                    "reason": result.get("reason", "unknown")
                })
                logger.warning(f"✗ {i}/{len(selected)}: {result.get('reason', 'unknown')}")
            time.sleep(2)
        except Exception as e:
            logger.error(f"Error generating {keyword}/{location}: {e}")
            results["failed"].append({
                "keyword": keyword,
                "location": location,
                "reason": f"exception: {e}"
            })

    # Export all generated content
    if results["total_generated"] > 0:
        try:
            export_count = generator.exporter.export_to_react_app(force_update=True)
            logger.info(f"✓ Exported {export_count} blogs to React app")
            results["export_count"] = export_count
        except Exception as e:
            logger.error(f"Export failed: {e}")
            results["export_error"] = str(e)

    results["generation_time"] = time.time() - start_time
    return results
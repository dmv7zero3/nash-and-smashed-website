# Local-SEO-Generator/generete-blogs/version-2/content_generator/content_generator_utils.py
import signal
import logging
import json
from pathlib import Path
from typing import Set, Tuple, Optional

def setup_signal_handling(generator):
    """Attach signal handlers for graceful shutdown."""
    def handler(signum, frame):
        logging.info(f"Received signal {signum}, shutting down generator...")
        generator.running = False
    signal.signal(signal.SIGINT, handler)
    signal.signal(signal.SIGTERM, handler)

def load_existing_metadata(conn, business_id: str) -> Tuple[Set[str], Set[str]]:
    """Load existing titles and meta descriptions for uniqueness checks."""
    used_titles = set()
    used_descriptions = set()
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT title FROM blogs WHERE business_id = ?', (business_id,))
        used_titles = {row[0] for row in cursor.fetchall() if row[0]}
        cursor.execute('SELECT metaDescription FROM blogs WHERE business_id = ?', (business_id,))
        used_descriptions = {row[0] for row in cursor.fetchall() if row[0]}
        logging.info(f"Loaded {len(used_titles)} titles, {len(used_descriptions)} descriptions")
    except Exception as e:
        logging.error(f"Error loading existing metadata: {e}")
    return used_titles, used_descriptions

def content_exists(conn, url: str, business_id: str) -> bool:
    """Check if content already exists for a given URL and business."""
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM blogs WHERE seo_friendly_url = ? AND business_id = ?', (url, business_id))
        return cursor.fetchone() is not None
    except Exception as e:
        logging.warning(f"Error checking existing content: {e}")
        return False

def load_seo_keywords(business_id: str, config_path: str = "business-data.json") -> Optional[list]:
    """Load SEO keywords from business-data.json for a given business."""
    try:
        config_file = Path(config_path)
        if not config_file.exists():
            logging.error(f"Config file not found: {config_path}")
            return None
        with open(config_file, "r") as f:
            data = json.load(f)
        business_data = data.get(business_id, {})
        return business_data.get("seo_keywords", [])
    except Exception as e:
        logging.error(f"Error loading SEO keywords: {e}")
        return None
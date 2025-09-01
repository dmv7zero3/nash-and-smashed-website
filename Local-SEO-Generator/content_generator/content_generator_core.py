# Local-SEO-Generator/generete-blogs/version-2/content_generator/content_generator_core.py
import time
import signal
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

# Fix imports - import from specific modules instead of utils package
from utils.logging_utils import setup_logging
from utils.db_utils import setup_database
from utils.content_utils import enhanced_seo_friendly_url, parse_location, clean_content
from utils.ollama_utils import OllamaManager

from prompts.prompt_logic import EnhancedContentPrompts
from business_config.business_config import BusinessConfig
from business_config.business_profile import LocationProfile
from unified_export.exporter_core import UnifiedExporter

logger = setup_logging('content_generator.log')

class SimplifiedContentGenerator:
    """Simplified content generator with status-based logic"""

    def __init__(self, business_id: str = 'nash-and-smashed', model_name: str = 'llama3.2'):
        self.business_id = business_id
        self.model_name = model_name
        self.running = True

        # Load business configuration
        try:
            self.business_config = BusinessConfig.get_config(business_id)
            logger.info(f"✓ Configuration loaded: {self.business_config.business_name}")
            logger.info(f"  - Operational locations: {self.business_config.operational_locations}")
            logger.info(f"  - Upcoming locations: {self.business_config.upcoming_locations}")
        except Exception as e:
            logger.error(f"Failed to load business config: {e}")
            raise

        # Initialize Ollama
        try:
            self.ollama = OllamaManager(model_name)
            logger.info(f"✓ Ollama initialized: {model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize Ollama: {e}")
            raise

        # Initialize database
        try:
            self.conn = setup_database(self.business_config.db_path)
            logger.info(f"✓ Database ready: {self.business_config.db_path}")
        except Exception as e:
            logger.error(f"Failed to initialize database: {e}")
            raise

        # Initialize exporter
        try:
            self.exporter = UnifiedExporter(self.business_config)
            logger.info("✓ Exporter ready")
        except Exception as e:
            logger.error(f"Failed to initialize exporter: {e}")
            raise

        # Load existing metadata for uniqueness
        self.used_titles = set()
        self.used_descriptions = set()
        self._load_existing_metadata()

        # Set up signal handling
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

        logger.info(f"Content Generator ready for {business_id}")

    def _signal_handler(self, signum, frame):
        """Graceful shutdown"""
        logger.info(f"Received signal {signum}, shutting down...")
        self.running = False

    def _load_existing_metadata(self):
        """Load existing titles and descriptions for uniqueness checking"""
        try:
            cursor = self.conn.cursor()
            cursor.execute('SELECT title FROM blogs WHERE business_id = ?', (self.business_id,))
            self.used_titles = {row[0] for row in cursor.fetchall() if row[0]}
            cursor.execute('SELECT metaDescription FROM blogs WHERE business_id = ?', (self.business_id,))
            self.used_descriptions = {row[0] for row in cursor.fetchall() if row[0]}
            logger.info(f"Loaded {len(self.used_titles)} titles, {len(self.used_descriptions)} descriptions")
        except Exception as e:
            logger.error(f"Error loading existing metadata: {e}")

    def _content_exists(self, url: str) -> bool:
        """Check if content already exists"""
        try:
            cursor = self.conn.cursor()
            cursor.execute('SELECT id FROM blogs WHERE seo_friendly_url = ? AND business_id = ?', (url, self.business_id))
            return cursor.fetchone() is not None
        except Exception as e:
            logger.warning(f"Error checking existing content: {e}")
            return False

    def _generate_content(self, prompt: str, content_type: str) -> Optional[str]:
        """Generate content with basic retry"""
        max_retries = 2
        for attempt in range(max_retries):
            try:
                raw_content = self.ollama.run_prompt(prompt)
                if raw_content:
                    cleaned = clean_content(raw_content)
                    if len(cleaned.strip()) > 20:
                        return cleaned
                logger.warning(f"{content_type} attempt {attempt + 1} failed - content too short")
            except Exception as e:
                logger.warning(f"{content_type} attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    time.sleep(1)
        logger.error(f"Failed to generate {content_type} after {max_retries} attempts")
        return None

    def generate_blog_content(self, keyword: str, location: str) -> Dict[str, Any]:
        """Generate complete blog content with status-based approach"""
        start_time = time.time()
        city, state = parse_location(location)
        if not city or city == "UNKNOWN":
            raise ValueError(f"Could not parse city from location: {location}")

        location_info = BusinessConfig.get_location_info(self.business_config, city, state)
        if not location_info:
            logger.warning(f"Location not found in config: {city}, {state}. Creating as upcoming.")
            location_info = LocationProfile(
                city=city,
                state=state,
                status='coming_soon',
                email=self.business_config.email,
                phone=None,
                address=None
            )

        if location_info.status == "operational":
            title_preposition = "in"
            content_tone = "operational"
        elif location_info.status == "upcoming":
            title_preposition = "coming to"
            content_tone = "upcoming"
        else:
            title_preposition = "coming to"
            content_tone = "coming_soon"

        title = EnhancedContentPrompts.generate_unique_title(
            keyword, city, state, self.used_titles, title_preposition
        )
        meta_description = EnhancedContentPrompts.generate_unique_meta_description(
            keyword, city, state, self.used_descriptions, location_info.status
        )

        self.used_titles.add(title)
        self.used_descriptions.add(meta_description)
        url = enhanced_seo_friendly_url(title, keyword, location)

        if self._content_exists(url):
            logger.warning(f"Content already exists for URL: {url}")
            return {"success": False, "reason": "duplicate_content", "url": url}

        logger.info(f"Generating ({location_info.status}): {title}")

        contents = {}
        location_dict = {
            "city": location_info.city,
            "state": location_info.state,
            "email": location_info.email,
            "phone": location_info.phone,
            "address": location_info.address
        }

        intro_prompt = EnhancedContentPrompts.intro_prompt(
            keyword, title_preposition, location, self.business_config.business_name,
            self.business_config.description, location_dict, city, content_tone
        )
        contents['intro'] = self._generate_content(intro_prompt, 'introduction')

        if contents['intro']:
            middle_prompt = EnhancedContentPrompts.middle_prompt(
                keyword, self.business_config.business_name, location_dict, 
                city, contents['intro'], content_tone
            )
            contents['middle'] = self._generate_content(middle_prompt, 'middle')

        if contents['intro'] and contents['middle']:
            conclusion_prompt = EnhancedContentPrompts.conclusion_prompt(
                self.business_config.business_name, location_dict, city,
                contents['intro'], contents['middle'], self.business_config.online_ordering_url,
                content_tone
            )
            contents['conclusion'] = self._generate_content(conclusion_prompt, 'conclusion')

        required_sections = ['intro', 'middle', 'conclusion']
        missing_sections = [section for section in required_sections if not contents.get(section)]

        if missing_sections:
            logger.error(f"Failed to generate: {missing_sections}")
            return {"success": False, "reason": "content_generation_failed", "missing": missing_sections}

        full_content = f"{contents['intro']} {contents['middle']} {contents['conclusion']}"
        word_count = len(full_content.split())
        generation_time = time.time() - start_time

        try:
            with self.conn:
                cursor = self.conn.execute('''
                    INSERT INTO blogs (
                        business_id, title, seo_friendly_url, metaDescription,
                        introParagraph, middleParagraph, conclusionParagraph,
                        keyword, location, city, state, location_status,
                        phone, address, word_count, created_at, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    self.business_id, title, url, meta_description,
                    contents['intro'], contents['middle'], contents['conclusion'],
                    keyword, location, city, state, location_info.status,
                    location_info.phone, location_info.address,
                    word_count, datetime.now().isoformat(), datetime.now().isoformat()
                ))
                blog_id = cursor.lastrowid
            logger.info(f"✓ Saved blog (ID: {blog_id}): {title}")
            logger.info(f"  Status: {location_info.status}, Words: {word_count}, Time: {generation_time:.2f}s")
            return {
                "success": True,
                "blog_id": blog_id,
                "title": title,
                "url": url,
                "word_count": word_count,
                "generation_time": generation_time,
                "location_status": location_info.status
            }
        except Exception as e:
            logger.error(f"Database error: {e}")
            return {"success": False, "reason": "database_error", "error": str(e)}

    def cleanup(self):
        """Clean up resources"""
        try:
            if hasattr(self, 'conn') and self.conn:
                self.conn.close()
                logger.info("Database connection closed")
        except Exception as e:
            logger.error(f"Cleanup error: {e}")
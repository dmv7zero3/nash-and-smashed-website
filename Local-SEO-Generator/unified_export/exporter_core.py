# Local-SEO-Generator/generete-blogs/version-2/unified_export/exporter_core.py
import json
import sqlite3
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional, Union
from dataclasses import asdict

logger = logging.getLogger(__name__)

class UnifiedExporter:
    """Advanced unified export system that puts content where it belongs"""

    def __init__(self, business_config: Union[Dict[str, Any], object]):
        # Handle both dictionary and dataclass instances
        if hasattr(business_config, "__dataclass_fields__"):
            self.business_profile = business_config
            self.business_config = asdict(business_config)
        else:
            self.business_profile = None
            self.business_config = business_config

        self.business_id = self.business_config.get("business_id")
        self.db_path = self.business_config.get("db_path")

        # Extract output paths
        self.output_paths = self.business_config.get("output_paths", {})
        self._ensure_default_paths()

        logger.debug(f"Initialized exporter for {self.business_id} with paths: {self.output_paths}")

    def _ensure_default_paths(self):
        """Ensure all required output paths exist"""
        defaults = {
            "react_app": f"src/core/Blogs/Templates/LocalSEO",
            "dist": f"dist/blogs/{self.business_id}/json",
            "backup": f"backup/blogs/{self.business_id}",
            "sitemap": "dist/sitemaps"
        }
        for key, path in defaults.items():
            if key not in self.output_paths:
                self.output_paths[key] = path
        for path_type, path in self.output_paths.items():
            try:
                os.makedirs(path, exist_ok=True)
                logger.debug(f"Ensured directory exists: {path}")
            except Exception as e:
                logger.warning(f"Could not create directory {path}: {e}")

    def _query_blogs(self) -> List[Dict[str, Any]]:
        """Query blogs from database"""
        conn = None
        try:
            if not os.path.exists(self.db_path):
                logger.error(f"Database file not found: {self.db_path}")
                return []
            conn = sqlite3.connect(self.db_path)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("""
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name='blogs'
            """)
            if not cursor.fetchone():
                logger.error("Blogs table not found in database")
                return []
            cursor.execute("PRAGMA table_info(blogs)")
            columns = [column[1] for column in cursor.fetchall()]
            if not columns:
                logger.error("No columns found in blogs table")
                return []
            cursor.execute(
                'SELECT * FROM blogs WHERE business_id = ? ORDER BY id DESC', 
                (self.business_id,)
            )
            rows = cursor.fetchall()
            blogs = []
            field_mapping = {
                "metaDescription": "metaDescription",
                "introParagraph": "introParagraph", 
                "middleParagraph": "middleParagraph",
                "conclusionParagraph": "conclusionParagraph",
                "seo_friendly_url": "url",
                "business_id": "businessId"
            }
            for row in rows:
                blog = {}
                for col in columns:
                    key = field_mapping.get(col, col)
                    value = row[col]
                    if value is None:
                        value = ""
                    blog[key] = value
                blogs.append(blog)
            logger.debug(f"Queried {len(blogs)} blogs from database")
            return blogs
        except Exception as e:
            logger.error(f"Error querying blogs: {str(e)}")
            return []
        finally:
            if conn:
                conn.close()

    def export_to_react_app(self, force_update: bool = False) -> int:
        """Export content directly to React app location"""
        try:
            react_path = Path(self.output_paths["react_app"])
            react_path.mkdir(parents=True, exist_ok=True)
            output_file = react_path / "database_content.json"
            old_modified_time = None
            if output_file.exists() and not force_update:
                old_modified_time = os.path.getmtime(output_file)
            blogs = self._query_blogs()
            if not blogs:
                logger.warning(f"No blogs found for {self.business_id}")
                return 0
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(blogs, f, indent=2, ensure_ascii=False)
            if old_modified_time and not force_update:
                new_modified_time = os.path.getmtime(output_file)
                if abs(new_modified_time - old_modified_time) < 0.1:
                    logger.debug("React app content unchanged - skipping additional exports")
                    return len(blogs)
            logger.info(f"Exported {len(blogs)} blogs to React app at {output_file}")
            self._export_to_dist_location(blogs)
            self._export_blogs_list(blogs)
            self._create_backup(blogs)
            return len(blogs)
        except Exception as e:
            logger.error(f"Error exporting to React app: {e}")
            return 0

    def export_all(self, include_individual_files: bool = True) -> Dict[str, int]:
        """Export content to all configured locations"""
        try:
            blogs = self._query_blogs()
            if not blogs:
                logger.warning(f"No blogs found for {self.business_id}")
                return {"total": 0}
            react_count = self._export_to_react_app(blogs)
            dist_count = self._export_to_dist_location(blogs)
            list_count = self._export_blogs_list(blogs)
            backup_count = self._create_backup(blogs)
            individual_count = 0
            if include_individual_files:
                individual_count = self._export_individual_files(blogs)
            result = {
                "react": react_count,
                "dist": dist_count,
                "list": list_count,
                "backup": backup_count,
                "individual": individual_count,
                "total": len(blogs)
            }
            logger.info(f"Exported {len(blogs)} blogs to all locations: {result}")
            return result
        except Exception as e:
            logger.error(f"Error in export_all: {e}")
            return {"total": 0, "error": str(e)}

    def _export_to_react_app(self, blogs: List[Dict[str, Any]]) -> int:
        """Write blogs to React app location"""
        try:
            react_path = Path(self.output_paths["react_app"])
            react_path.mkdir(parents=True, exist_ok=True)
            output_file = react_path / "database_content.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(blogs, f, indent=2, ensure_ascii=False)
            logger.debug(f"Exported {len(blogs)} blogs to React app at {output_file}")
            return len(blogs)
        except Exception as e:
            logger.error(f"Error exporting to React app: {e}")
            return 0

    def _export_to_dist_location(self, blogs: List[Dict[str, Any]]) -> int:
        """Write blogs to dist location"""
        try:
            if "dist" not in self.output_paths:
                logger.debug("No dist path configured, skipping dist export")
                return 0
            dist_path = Path(self.output_paths["dist"])
            dist_path.mkdir(parents=True, exist_ok=True)
            output_file = dist_path / "database_content.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(blogs, f, indent=2, ensure_ascii=False)
            logger.debug(f"Exported {len(blogs)} blogs to dist directory at {output_file}")
            return len(blogs)
        except Exception as e:
            logger.error(f"Error exporting to dist location: {e}")
            return 0

    def _export_blogs_list(self, blogs: List[Dict[str, Any]]) -> int:
        """Create simplified blog list JSON"""
        try:
            blog_list = []
            for blog in blogs:
                blog_entry = {
                    "title": blog.get("title", ""),
                    "seo_friendly_url": blog.get("url", blog.get("seo_friendly_url", "")),
                    "keyword": blog.get("keyword", ""),
                    "location": blog.get("location", ""),
                    "id": blog.get("id", ""),
                    "city": blog.get("city", ""),
                    "state": blog.get("state", "")
                }
                blog_list.append(blog_entry)
            for path_name in ["react_app", "dist"]:
                if path_name in self.output_paths:
                    try:
                        output_path = Path(self.output_paths[path_name])
                        output_path.mkdir(parents=True, exist_ok=True)
                        output_file = output_path / "blogs-list.json"
                        with open(output_file, 'w', encoding='utf-8') as f:
                            json.dump(blog_list, f, indent=2, ensure_ascii=False)
                        logger.debug(f"Created blogs list at {output_file}")
                    except Exception as e:
                        logger.error(f"Error creating blogs list for {path_name}: {e}")
            logger.debug(f"Created blogs list with {len(blog_list)} entries")
            return len(blog_list)
        except Exception as e:
            logger.error(f"Error creating blogs list: {e}")
            return 0

    def _export_individual_files(self, blogs: List[Dict[str, Any]]) -> int:
        """Export individual JSON files for each blog"""
        try:
            if "dist" not in self.output_paths:
                logger.debug("No dist path configured, skipping individual file export")
                return 0
            dist_path = Path(self.output_paths["dist"])
            dist_path.mkdir(parents=True, exist_ok=True)
            count = 0
            for blog in blogs:
                try:
                    url = blog.get("url", blog.get("seo_friendly_url", f"blog-{blog.get('id', 'unknown')}"))
                    filename = self._sanitize_filename(url)
                    if not filename.endswith(".json"):
                        filename = f"{filename}.json"
                    output_file = dist_path / filename
                    with open(output_file, 'w', encoding='utf-8') as f:
                        json.dump(blog, f, indent=2, ensure_ascii=False)
                        count += 1
                except Exception as e:
                    logger.error(f"Error exporting individual file for blog {blog.get('id', 'unknown')}: {e}")
                    continue
            logger.debug(f"Exported {count} individual blog files")
            return count
        except Exception as e:
            logger.error(f"Error exporting individual files: {e}")
            return 0

    def _create_backup(self, blogs: List[Dict[str, Any]]) -> int:
        """Create backup of blog content"""
        try:
            if "backup" not in self.output_paths:
                logger.debug("No backup path configured, skipping backup")
                return 0
            backup_path = Path(self.output_paths["backup"])
            backup_path.mkdir(parents=True, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_file = backup_path / f"blogs_backup_{timestamp}.json"
            backup_data = {
                "business_id": self.business_id,
                "timestamp": timestamp,
                "count": len(blogs),
                "export_date": datetime.now().isoformat(),
                "blogs": blogs
            }
            with open(backup_file, 'w', encoding='utf-8') as f:
                json.dump(backup_data, f, indent=2, ensure_ascii=False)
            logger.debug(f"Created backup with {len(blogs)} blogs at {backup_file}")
            self._cleanup_old_backups(backup_path)
            return len(blogs)
        except Exception as e:
            logger.error(f"Error creating backup: {e}")
            return 0

    def _cleanup_old_backups(self, backup_path: Path, keep_count: int = 5):
        """Clean up old backup files, keeping only the most recent ones"""
        try:
            backup_files = list(backup_path.glob("blogs_backup_*.json"))
            backup_files.sort(key=lambda x: x.stat().st_mtime, reverse=True)
            for old_backup in backup_files[keep_count:]:
                try:
                    old_backup.unlink()
                    logger.debug(f"Removed old backup: {old_backup}")
                except Exception as e:
                    logger.warning(f"Could not remove old backup {old_backup}: {e}")
        except Exception as e:
            logger.warning(f"Error cleaning up old backups: {e}")

    def _sanitize_filename(self, filename: str) -> str:
        """Sanitize filename for safe file system use"""
        import re
        filename = re.sub(r'[<>:"/\\|?*]', '-', filename)
        filename = re.sub(r'\s+', '-', filename)
        filename = re.sub(r'-+', '-', filename)
        filename = filename.strip('-')
        if len(filename) > 100:
            filename = filename[:100]
        return filename or "unnamed"

    def generate_sitemap_entries(self) -> List[Dict[str, str]]:
        """Generate sitemap entries for all blogs"""
        try:
            blogs = self._query_blogs()
            base_url = self.business_config.get("base_url", "")
            if not base_url:
                logger.warning("No base_url configured, using placeholder")
                base_url = "example.com"
            if base_url.startswith(("http://", "https://")):
                base_url = base_url.split("//", 1)[1]
            base_url = base_url.rstrip("/")
            sitemap_entries = []
            for blog in blogs:
                try:
                    url = blog.get("url", blog.get("seo_friendly_url", ""))
                    if not url:
                        logger.debug(f"Skipping blog {blog.get('id', 'unknown')} - no URL")
                        continue
                    full_url = f"https://{base_url}/blog/{url}"
                    lastmod = blog.get("updated_at", blog.get("created_at", datetime.now().isoformat()))
                    if " " in str(lastmod):
                        lastmod = str(lastmod).split(" ")[0]
                    sitemap_entries.append({
                        "url": full_url,
                        "lastmod": str(lastmod),
                        "changefreq": "monthly",
                        "priority": "0.7"
                    })
                except Exception as e:
                    logger.error(f"Error processing sitemap entry for blog {blog.get('id', 'unknown')}: {e}")
                    continue
            logger.info(f"Generated {len(sitemap_entries)} sitemap entries")
            return sitemap_entries
        except Exception as e:
            logger.error(f"Error generating sitemap entries: {e}")
            return []

    def get_export_stats(self) -> Dict[str, Any]:
        """Get export statistics"""
        try:
            blogs = self._query_blogs()
            stats = {
                "business_id": self.business_id,
                "total_blogs": len(blogs),
                "output_paths": dict(self.output_paths),
                "last_export": datetime.now().isoformat(),
                "database_path": self.db_path
            }
            for path_type, path in self.output_paths.items():
                file_path = Path(path) / "database_content.json"
                stats[f"{path_type}_exists"] = file_path.exists()
                if file_path.exists():
                    stats[f"{path_type}_modified"] = datetime.fromtimestamp(
                        file_path.stat().st_mtime
                    ).isoformat()
            return stats
        except Exception as e:
            logger.error(f"Error getting export stats: {e}")
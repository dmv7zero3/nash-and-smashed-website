# Local-SEO-Generator/generete-blogs/version-2/unified_export/exporter_db.py
import sqlite3
import os
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

def query_blogs(db_path: str, business_id: str) -> List[Dict[str, Any]]:
    """Query blogs from the database for a given business_id."""
    conn = None
    try:
        if not os.path.exists(db_path):
            logger.error(f"Database file not found: {db_path}")
            return []
        conn = sqlite3.connect(db_path)
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
            (business_id,)
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
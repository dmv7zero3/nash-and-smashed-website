# Local-SEO-Generator/generete-blogs/version-2/utils/db_utils.py
import sqlite3
import logging
from pathlib import Path
from datetime import datetime

def setup_database(db_path: str) -> sqlite3.Connection:
    """Set up SQLite database with simplified schema."""
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    
    with conn:
        # Create main blogs table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS blogs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id TEXT NOT NULL,
                title TEXT NOT NULL,
                seo_friendly_url TEXT UNIQUE NOT NULL,
                metaDescription TEXT,
                introParagraph TEXT,
                middleParagraph TEXT,
                conclusionParagraph TEXT,
                keyword TEXT,
                location TEXT,
                city TEXT,
                state TEXT,
                location_status TEXT DEFAULT 'operational',
                phone TEXT,
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                word_count INTEGER
            )
        ''')
        
        # Create indexes for performance
        conn.execute('CREATE INDEX IF NOT EXISTS idx_business_id ON blogs(business_id)')
        conn.execute('CREATE INDEX IF NOT EXISTS idx_seo_url ON blogs(seo_friendly_url)')
        conn.execute('CREATE INDEX IF NOT EXISTS idx_city_state ON blogs(city, state)')
        conn.execute('CREATE INDEX IF NOT EXISTS idx_location_status ON blogs(location_status)')
        conn.execute('CREATE INDEX IF NOT EXISTS idx_keyword ON blogs(keyword)')
    
    return conn


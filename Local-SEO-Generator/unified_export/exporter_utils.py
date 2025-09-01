
# Local-SEO-Generator/generete-blogs/version-2/unified_export/exporter_utils.py
import re
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe file system use."""
    filename = re.sub(r'[<>:"/\\|?*]', '-', filename)
    filename = re.sub(r'\s+', '-', filename)
    filename = re.sub(r'-+', '-', filename)
    filename = filename.strip('-')
    if len(filename) > 100:
        filename = filename[:100]
    return filename or "unnamed"

def cleanup_old_backups(backup_path: Path, keep_count: int = 5):
    """Clean up old backup files, keeping only the most recent ones."""
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
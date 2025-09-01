# Local-SEO-Generator/generete-blogs/version-2/utils/logging_utils.py
import logging
from pathlib import Path

def setup_logging(log_file: str = 'content_generator.log', level: int = logging.INFO) -> logging.Logger:
    """Simple logging setup"""
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    
    if not log_file.startswith('logs/'):
        log_file = f"logs/{log_file}"
        
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    
    return logging.getLogger()
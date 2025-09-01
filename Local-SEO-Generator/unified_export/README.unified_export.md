<!-- Local-SEO-Generator/generete-blogs/version-2/unified_export/README.unified-export.md -->

# Unified Export Module

This folder contains the modularized unified export system for blog content.  
Each file is responsible for a specific aspect of exporting, managing, and integrating blog data.

## Recommended File Order

1. **exporter_core.py**  
   Main `UnifiedExporter` class and core export logic.

2. **exporter_db.py**  
   Database helpers for querying blog data.

3. **exporter_utils.py**  
   Utility functions (filename sanitization, backup cleanup).

4. **exporter_paths.py**  
   Output path management and directory creation.

5. **exporter_cli.py**  
   CLI entry point for running exports and generating sitemaps.

6. \***\*init**.py\*\*  
   Module exports for easy imports elsewhere.

---

## Usage

- Import the main exporter:
  ```python
  from unified_export import UnifiedExporter
  ```
- Run the CLI:
  ```sh
  python exporter_cli.py --business nash-and-smashed --stats
  ```

## Example CLI Commands

- Export all blogs:
  ```sh
  python exporter_cli.py --business nash-and-smashed
  ```
- Export individual blog files:
  ```sh
  python exporter_cli.py --business nash-and-smashed --individual
  ```
- Generate sitemap entries:
  ```sh
  python exporter_cli.py --business nash-and-smashed --sitemap
  ```
- Show export statistics:
  ```sh
  python exporter_cli.py --business nash-and-smashed --stats
  ```

---

## Notes

- All helper modules are imported in `__init__.py` for convenience.
- Update or extend each module as needed for your workflow.
- Logging is enabled for debugging

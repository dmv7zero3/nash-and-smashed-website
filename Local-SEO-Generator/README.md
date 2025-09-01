<!-- Local-SEO-Generator/generete-blogs/version-2/README.md -->

# Local SEO Generator — Version 2

This folder contains the **modular, production-ready system** for generating, exporting, and managing local SEO blog content for Nash & Smashed and similar businesses.

## Folder Structure

- **business_config/**  
  Business configuration, location management, and CLI access.
- **content_generator/**  
  Blog content generation, batch processing, CLI, and utilities.
- **prompts/**  
  Prompt templates, logic, and utilities for AI content creation.
- **unified_export/**  
  Export system for React app, JSON, backups, and sitemaps.
- **utils/**  
  Modular utilities for logging, database, content cleaning, Ollama integration, and more.

## Key Files

- `business-data.json`  
  Central business configuration and metadata file.  
  See [README.business-data.md](README.business-data.md) for details.

- `optimization-recommendations.md`  
  Advanced performance and architecture suggestions.

## Getting Started

1. **Configure your business:**  
   Edit `business-data.json` to add locations, keywords, and output paths.

2. **Generate content:**  
   Use the CLI:

   ```sh
   python content_generator/content_generator_cli.py --business nash-and-smashed --generate 5
   ```

3. **Export content:**  
   Use the unified export CLI:

   ```sh
   python unified_export/exporter_cli.py --business nash-and-smashed --stats
   ```

4. **Manage business config:**  
   Use the business config CLI:
   ```sh
   python business_config/business_cli.py --business nash-and-smashed --show
   ```

## Documentation

- [business_config/README.business_config.md](business_config/README.business_config.md)
- [content_generator/README.content_generator.md](content_generator/README.content_generator.md)
- [prompts/README.prompts.md](prompts/README.prompts.md)
- [unified_export/README.unified_export.md](unified_export/README.unified_export.md)
- [utils/README.utils.md](utils/README.utils.md)
- [README.business-data.md](README.business-data.md)

## Notes

- All modules are fully decoupled and easy to extend.
- Logging is enabled for debugging and audit trails.
- No migration logic is required; new databases are built automatically.
- See optimization-recommendations.md for performance tips.

---

\*\*For questions or improvements, see the individual module

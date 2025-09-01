# business-data.json Reference

This file (`business-data.json`) contains all business-specific configuration and metadata for Nash & Smashed and is designed to support automated blog generation, SEO, and location-based content.

## How It Works With The Project

- **Configuration Source:**  
  All modules (content generator, unified export, business config) read business details, locations, keywords, and output paths from this file.
- **Location Management:**  
  Each location entry provides address, contact info, status, and hours, enabling location-aware content and SEO.
- **SEO & Content Themes:**  
  The `seo_keywords` and `content_themes` sections drive keyword targeting and thematic content generation.
- **Output Paths:**  
  The `output_paths` section defines where generated content is saved for React apps, backups, and sitemaps.
- **Database Path:**  
  The `db_path` field specifies the SQLite database file for storing generated blogs.

## Structure Overview

- `business_id`, `business_name`, `base_url`, `online_ordering_url`, `phone`, `email`, `description`:  
  Core business info used throughout the project.
- `specialties`:  
  List of featured menu items for content generation.
- `headquarters`:  
  Main office/location details.
- `locations`:  
  Array of active locations, each with address, contact, hours, and status.
- `target_cities`, `location_mapping`:  
  Used for expanding content to nearby cities and regions.
- `content_themes`:  
  Thematic keywords for richer, more relevant content.
- `seo_keywords`:  
  Main keywords for SEO-focused blog generation.
- `db_path`:  
  SQLite database file name.
- `output_paths`:  
  Directories for saving generated content.

## Usage Example

- **Loading Config in Python:**
  ```python
  import json
  with open("business-data.json") as f:
      data = json.load(f)
      business = data["nash-and-smashed"]
      print(business["business_name"])
  ```
- **Accessing Locations:**
  ```python
  for loc in business["locations"]:
      print(loc["city"], loc["state"], loc["status"])
  ```
- **Using in Content Generation:**
  - The content generator reads `seo_keywords` and `locations` to create unique, location-aware blog posts.
  - Output paths are used to save generated files in the correct directories.

## Notes

- Update this file to add new locations, keywords, or change business info.
- All changes are immediately reflected in generated content and exports.
- Keep sensitive info (emails, phone numbers) accurate for contact and call-to-action

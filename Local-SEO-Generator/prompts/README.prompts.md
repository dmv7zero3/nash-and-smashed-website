<!-- Local-SEO-Generator/generete-blogs/version-2/prompts/README.prompts.md -->

# Modular Prompts System

This folder contains modular files for prompt templates, prompt generation logic, and prompt utilities for blog content creation.

## Recommended File Order

1. **prompt_templates.py**  
   Static prompt templates and reusable strings for intro, middle, conclusion, meta descriptions, etc.

2. **prompt_logic.py**  
   Functions and classes for generating prompts, validating content, and handling status-aware logic (e.g., `EnhancedContentPrompts`).

3. **prompt_utils.py**  
   Utility functions for prompt formatting, uniqueness checks, and fallback logic.

4. \***\*init**.py\*\*  
   Imports and exposes main classes/functions for easy use.

---

## Usage

- Import the main prompt logic:
  ```python
  from prompts import EnhancedContentPrompts
  ```
- Use templates and utilities as needed:
  ```python
  from prompts import INTRO_OPERATIONAL_TEMPLATE, ensure_unique_prompt
  ```

---

## Notes

- Each module is focused and easy to maintain.
- Extend or update templates and logic as needed for your workflow.
- All helpers are exposed in `__init__.py` for convenience.

---

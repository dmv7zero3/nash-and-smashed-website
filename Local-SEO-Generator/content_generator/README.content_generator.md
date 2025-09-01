<!-- Local-SEO-Generator/generete-blogs/version-2/content_generator/README.content_generator.md -->

# Modular Content Generator System

This folder contains the modularized content generator for Nash & Smashed and similar projects.  
Each file is responsible for a specific aspect of blog content generation, batch processing, CLI access, and utility functions.

## Recommended File Order

1. **content_generator_core.py**  
   Start with the main generator class and its methods.

2. **content_generator_utils.py**  
   Add supporting functions used by the core class.

3. **content_generator_tasks.py**  
   Add batch/multiple generation logic if separated from the core.

4. **content_generator_cli.py**  
   Write the CLI entry point and argument parsing.

5. \***\*init**.py\*\*  
   Expose the main class and helpers for easy imports.

---

## Usage

- Import the main generator:
  ```python
  from content_generator import SimplifiedContentGenerator
  ```
- Run the CLI:
  ```sh
  python content_generator_cli.py --business nash-and-smashed --generate 5
  python content_generator_cli.py --business nash-and-smashed --single "Best Chicken Wings" "Manassas VA"
  python content_generator_cli.py --business nash-and-smashed --verify
  ```

## Example CLI Commands

- Generate a single blog:
  ```sh
  python content_generator_cli.py --single "Best Chicken Wings" "Manassas VA"
  ```
- Generate multiple blogs:
  ```sh
  python content_generator_cli.py --generate 5 --business nash-and-smashed
  ```
- Verify setup:
  ```sh
  python content_generator_cli.py --verify --business nash-and-smashed
  ```

---

## Notes

- All helper modules are imported in `__init__.py` for convenience.
- Update or extend each module as needed for your workflow.
- Logging is enabled for debugging and audit trails.

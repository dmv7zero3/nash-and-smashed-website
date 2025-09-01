# Modular Business Config System

This folder contains the modularized business configuration system for Nash & Smashed and similar projects.  
Each file is responsible for a specific aspect of business configuration, location management, and CLI access.

## Recommended File Order

1. **business_profile.py**  
   Define your data classes (e.g., `BusinessProfile`, `LocationProfile`).  
   Other modules will import these classes.

2. **business_locations.py**  
   Add location/status helper functions and logic.  
   These may use the data classes from `business_profile.py`.

3. **business_config.py**  
   Implement config loading, validation, and main `BusinessConfig` class.  
   This will use both data classes and location helpers.

4. **business_cli.py**  
   Add CLI entry point and argument parsing if needed.  
   This will use the main config logic.

5. ****init**.py**  
   Import and expose the main classes/functions for easy access.

---

## Usage

- Import the main config:
  ```python
  from business_config import BusinessConfig
  ```
- Run the CLI:
  ```sh
  python business_cli.py --business nash-and-smashed --show
  python business_cli.py --business nash-and-smashed --locations
  ```

## Example CLI Commands

- Show full business config:
  ```sh
  python business_cli.py --business nash-and-smashed --show
  ```
- Show locations and their status:
  ```sh
  python business_cli.py --business nash-and-smashed --locations
  ```

---

## Notes

- All helper modules are imported in `__init__.py` for convenience.
- Update or extend each module as needed for your workflow.
- Logging is enabled for debugging and audit

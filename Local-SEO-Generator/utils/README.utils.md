# Modular Utils System

This folder contains modular utility files for logging, database setup, content cleaning, Ollama integration, and miscellaneous helpers.

## Recommended File Order

1. **logging_utils.py**  
   Start with logging setup and logger creation.

2. **db_utils.py**  
   Add database setup, migration, and related functions.

3. **content_utils.py**  
   Add content cleaning and normalization.

4. **ollama_utils.py**  
   Add OllamaManager class and related functions.

5. **misc_utils.py**  
   Add retry decorators, random helpers, and miscellaneous utilities.

6. \***\*init**.py\*\*  
   Expose main functions/classes for easy imports.

---

## Usage

- Import utilities in your code:

  ```python
  from utils import setup_logging, setup_database, clean_content, OllamaManager, random_id
  ```

- Example:
  ```python
  logger = setup_logging('mylog.log')
  conn = setup_database('mydb.db')
  cleaned = clean_content(raw_content)
  ollama = OllamaManager('llama3.2')
  unique_id = random_id('blog')
  ```

---

## Notes

- Each utility module is focused and easy to maintain.
- Extend or update modules as needed for your workflow.
- All helpers are exposed in

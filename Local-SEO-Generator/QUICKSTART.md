# Local SEO Generator - Quick Start Guide

## 🚨 Important: How to Run the Scripts

The project uses a modular structure with packages. You **cannot** run files directly like `python content_generator.py` because that file doesn't exist and the imports won't work correctly.

## ✅ Correct Ways to Run

### Option 1: Using Python Module Syntax (Recommended)

From the `version-2` directory:

```bash
# Generate blogs
python -m content_generator.content_generator_cli --generate 5 --business nash-and-smashed

# Generate single blog
python -m content_generator.content_generator_cli --single "Best Chicken Wings" "Manassas VA"

# Export content
python -m unified_export.exporter_cli --business nash-and-smashed --stats

# Show business config
python -m business_config.business_cli --business nash-and-smashed --show
```

### Option 2: Use the Runner Script

Save the `run.py` script in the `version-2` directory and use it:

```bash
# First time setup
chmod +x setup.sh
./setup.sh

# Validate system
python validate_system.py

# Generate content
python run.py generate 5
python run.py single "Best Chicken Wings" "Manassas VA"
python run.py export
python run.py config
```

### Option 3: Set PYTHONPATH

```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python content_generator/content_generator_cli.py --generate 5 --business nash-and-smashed
```

## 🛠️ Initial Setup

1. **Install Ollama** (if not already installed):

   ```bash
   # macOS
   brew install ollama

   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

2. **Pull the model**:

   ```bash
   ollama pull llama3.2
   ```

3. **Start Ollama service**:

   ```bash
   ollama serve
   ```

4. **Run setup script**:

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

5. **Validate installation**:
   ```bash
   python validate_system.py
   ```

## 📁 Project Structure

```
version-2/
├── business_config/          # Business configuration module
│   ├── __init__.py
│   ├── business_cli.py      # CLI entry point
│   └── ...
├── content_generator/        # Content generation module
│   ├── __init__.py
│   ├── content_generator_cli.py  # CLI entry point
│   └── ...
├── unified_export/          # Export module
│   ├── __init__.py
│   ├── exporter_cli.py      # CLI entry point
│   └── ...
├── utils/                   # Utility functions
│   ├── __init__.py
│   └── ...
├── prompts/                 # Prompt templates
│   ├── __init__.py
│   └── ...
├── business-data.json       # Business configuration
├── run.py                   # Convenient runner script
├── validate_system.py       # System validation
└── setup.sh                 # Setup script
```

## ❌ Common Errors and Solutions

### Error: `ImportError: cannot import name 'X' from 'Y'`

**Solution**: You're running the script incorrectly. Use the module syntax or runner script.

### Error: `ModuleNotFoundError: No module named 'utils'`

**Solution**: Run from the `version-2` directory and use proper module syntax.

### Error: `Ollama error`

**Solution**: Make sure Ollama is running (`ollama serve`) and the model is installed (`ollama pull llama3.2`).

## 🎯 Example Workflow

```bash
# 1. Navigate to version-2 directory
cd Local-SEO-Generator/generete-blogs/version-2

# 2. Run setup (first time only)
./setup.sh

# 3. Start Ollama (in a separate terminal)
ollama serve

# 4. Validate system
python validate_system.py

# 5. Generate some blogs
python run.py generate 5

# 6. Export the content
python run.py export

# 7. Check what was generated
python -m business_config.business_cli --business nash-and-smashed --show
```

## 📞 Need Help?

If you encounter issues:

1. Run `python validate_system.py` to check your setup
2. Make sure you're in the `version-2` directory
3. Ensure Ollama is running
4. Use the correct command syntax (module notation or runner script)

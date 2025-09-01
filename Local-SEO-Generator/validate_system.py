#!/usr/bin/env python3
"""
System Validation Script for Local SEO Generator
Run from the version-2 directory using: python validate_system.py
"""

import sys
import os
import importlib.util

# Add current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def test_imports():
    """Test all critical imports"""
    print("🧪 Testing imports...")
    try:
        # Test utils - need to import from the module
        from utils.logging_utils import setup_logging
        from utils.db_utils import setup_database
        from utils.ollama_utils import OllamaManager
        print("  ✅ utils imports successful")
        
        # Test business_config
        from business_config.business_config import BusinessConfig
        from business_config.business_profile import BusinessProfile, LocationProfile
        print("  ✅ business_config imports successful")
        
        # Test prompts
        from prompts.prompt_logic import EnhancedContentPrompts
        print("  ✅ prompts imports successful")
        
        # Test content_generator
        from content_generator.content_generator_core import SimplifiedContentGenerator
        print("  ✅ content_generator imports successful")
        
        # Test unified_export
        from unified_export.exporter_core import UnifiedExporter
        print("  ✅ unified_export imports successful")
        
        return True
    except ImportError as e:
        print(f"  ❌ Import error: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_business_config():
    """Test business configuration loading"""
    print("\n🧪 Testing business configuration...")
    try:
        from business_config.business_config import BusinessConfig
        
        config = BusinessConfig.get_config("nash-and-smashed")
        
        # Check essential fields
        assert config.business_name == "Nash & Smashed"
        assert len(config.locations) > 0
        assert len(config.seo_keywords) > 0
        assert config.base_url == "nashandsmashed.com"
        
        print(f"  ✅ Loaded config for: {config.business_name}")
        print(f"  ✅ Locations: {len(config.locations)}")
        print(f"  ✅ SEO Keywords: {len(config.seo_keywords)}")
        print(f"  ✅ Base URL: {config.base_url}")
        
        # Test location lookup
        manassas = BusinessConfig.get_location_info(config, "Manassas", "VA")
        if manassas:
            print(f"  ✅ Location lookup works: {manassas.city}, {manassas.state} - {manassas.status}")
        
        return True
    except Exception as e:
        print(f"  ❌ Configuration error: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_database():
    """Test database setup"""
    print("\n🧪 Testing database setup...")
    try:
        from utils.db_utils import setup_database
        import tempfile
        
        # Create temporary database
        with tempfile.NamedTemporaryFile(suffix='.db', delete=False) as tmp:
            db_path = tmp.name
        
        conn = setup_database(db_path)
        
        # Check tables exist
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='blogs'")
        table = cursor.fetchone()
        
        assert table is not None
        print("  ✅ Database tables created successfully")
        
        # Check indexes
        cursor.execute("SELECT name FROM sqlite_master WHERE type='index'")
        indexes = cursor.fetchall()
        print(f"  ✅ Created {len(indexes)} indexes")
        
        conn.close()
        os.unlink(db_path)
        
        return True
    except Exception as e:
        print(f"  ❌ Database error: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_ollama_check():
    """Check if Ollama is available"""
    print("\n🧪 Checking Ollama availability...")
    try:
        import subprocess
        result = subprocess.run(['ollama', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("  ✅ Ollama is installed")
            
            # Check if model is available
            result = subprocess.run(['ollama', 'list'], capture_output=True, text=True)
            if 'llama3.2' in result.stdout or 'llama2' in result.stdout:
                print("  ✅ Compatible model found")
            else:
                print("  ⚠️  No llama3.2 model found - run: ollama pull llama3.2")
        else:
            print("  ❌ Ollama not found")
    except FileNotFoundError:
        print("  ❌ Ollama is not installed")
        print("     Install from: https://ollama.ai")
        return False
    except Exception as e:
        print(f"  ⚠️  Could not check Ollama: {e}")
    
    return True

def main():
    """Run all validation tests"""
    print("🚀 Local SEO Generator - System Validation\n")
    
    all_passed = True
    
    # Run tests
    all_passed &= test_imports()
    all_passed &= test_business_config()
    all_passed &= test_database()
    all_passed &= test_ollama_check()
    
    print("\n" + "="*50)
    if all_passed:
        print("✅ All tests passed! System is ready to use.")
        print("\nNext steps:")
        print("1. Ensure Ollama is running: ollama serve")
        print("2. Try generating a blog using module syntax:")
        print("   python -m content_generator.content_generator_cli --single \"Best Chicken Wings\" \"Manassas VA\"")
    else:
        print("❌ Some tests failed. Please fix the issues above.")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
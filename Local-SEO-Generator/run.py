#!/usr/bin/env python3
"""
Convenient runner script for Local SEO Generator
Place this in the version-2 directory and run it directly
"""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    if len(sys.argv) < 2:
        print("Local SEO Generator - Runner Script")
        print("===================================")
        print("\nUsage:")
        print("  python run.py generate [count]     # Generate blogs")
        print("  python run.py single <keyword> <location>  # Generate single blog")
        print("  python run.py export              # Export content")
        print("  python run.py config              # Show business config")
        print("  python run.py validate            # Validate system")
        print("\nExamples:")
        print('  python run.py generate 5')
        print('  python run.py single "Best Chicken Wings" "Manassas VA"')
        print('  python run.py export')
        return 1
    
    command = sys.argv[1]
    
    if command == "generate":
        from content_generator.content_generator_cli import cli_entry_point
        # Modify sys.argv to match expected format
        count = sys.argv[2] if len(sys.argv) > 2 else "1"
        sys.argv = ["content_generator_cli.py", "--generate", count, "--business", "nash-and-smashed", "--verbose"]
        cli_entry_point()
        
    elif command == "single":
        if len(sys.argv) < 4:
            print("Error: 'single' requires keyword and location")
            print('Example: python run.py single "Best Chicken Wings" "Manassas VA"')
            return 1
        from content_generator.content_generator_cli import cli_entry_point
        keyword = sys.argv[2]
        location = sys.argv[3]
        sys.argv = ["content_generator_cli.py", "--single", keyword, location, "--business", "nash-and-smashed"]
        cli_entry_point()
        
    elif command == "export":
        from unified_export.exporter_cli import cli_entry_point
        sys.argv = ["exporter_cli.py", "--business", "nash-and-smashed", "--stats"]
        cli_entry_point()
        
    elif command == "config":
        from business_config.business_cli import cli_entry_point
        sys.argv = ["business_cli.py", "--business", "nash-and-smashed", "--show"]
        cli_entry_point()
        
    elif command == "validate":
        import validate_system
        return validate_system.main()
        
    else:
        print(f"Unknown command: {command}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
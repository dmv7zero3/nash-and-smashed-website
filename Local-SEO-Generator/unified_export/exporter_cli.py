# Local-SEO-Generator/generete-blogs/version-2/unified_export/exporter_cli.py
import argparse
import logging
import sys
import json

def cli_entry_point():
    """Command line entry point for unified export"""
    parser = argparse.ArgumentParser(
        description="Unified export tool for blog content",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --business nash-and-smashed
  %(prog)s --business nash-and-smashed --individual
  %(prog)s --business nash-and-smashed --sitemap
  %(prog)s --business nash-and-smashed --force --individual
        """
    )
    parser.add_argument(
        "--business", "-b", 
        default="nash-and-smashed",
        help="Business ID to export content for (default: nash-and-smashed)"
    )
    parser.add_argument(
        "--individual", "-i", 
        action="store_true",
        help="Export individual blog files"
    )
    parser.add_argument(
        "--force", "-f", 
        action="store_true",
        help="Force update regardless of content changes"
    )
    parser.add_argument(
        "--sitemap", "-s", 
        action="store_true",
        help="Generate sitemap entries"
    )
    parser.add_argument(
        "--stats", 
        action="store_true",
        help="Show export statistics"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable verbose logging"
    )
    
    args = parser.parse_args()
    
    # Set logging level
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        # Import here to avoid circular imports
        from business_config.business_config import BusinessConfig
        from unified_export.exporter_core import UnifiedExporter
        
        # Get business configuration
        business_config = BusinessConfig.get_config(args.business)
        
        # Create exporter
        exporter = UnifiedExporter(business_config)
        
        # Perform requested operation
        if args.stats:
            stats = exporter.get_export_stats()
            print(f"📊 EXPORT STATISTICS")
            print(f"{'=' * 50}")
            for key, value in stats.items():
                print(f"{key}: {value}")
                
        elif args.sitemap:
            sitemap_entries = exporter.generate_sitemap_entries()
            print(f"Generated {len(sitemap_entries)} sitemap entries:")
            print(json.dumps(sitemap_entries, indent=2))
            
        else:
            # Standard export
            if args.force:
                # Force update to React app first
                count = exporter.export_to_react_app(force_update=True)
                print(f"✓ Force exported {count} blogs to React app")
                
            result = exporter.export_all(include_individual_files=args.individual)
            
            if result.get("error"):
                print(f"❌ Export failed: {result['error']}", file=sys.stderr)
                sys.exit(1)
            else:
                print(f"✓ Export completed successfully!")
                print(f"  Total blogs: {result['total']}")
                print(f"  React app: {result['react']}")
                print(f"  Dist: {result['dist']}")
                print(f"  Backup: {result['backup']}")
                if args.individual:
                    print(f"  Individual files: {result['individual']}")
                    
                if args.verbose:
                    print(f"\n📄 DETAILED RESULTS:")
                    print(json.dumps(result, indent=2))
            
    except KeyboardInterrupt:
        print("\n⚠️ Export cancelled by user")
        sys.exit(1)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)
        
    sys.exit(0)


if __name__ == "__main__":
    cli_entry_point()
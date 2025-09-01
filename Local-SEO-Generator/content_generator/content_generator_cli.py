# Local-SEO-Generator/generete-blogs/version-2/content_generator/content_generator_cli.py
import argparse
import logging
import sys

from .content_generator_core import SimplifiedContentGenerator
from .content_generator_tasks import generate_multiple_blogs

def cli_entry_point():
    """Main CLI entry point for the content generator."""
    parser = argparse.ArgumentParser(
        description="Simplified Content Generator for Nash & Smashed",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --business nash-and-smashed
  %(prog)s --single "nashville hot chicken" "manassas va"
  %(prog)s --generate 5 --business nash-and-smashed
  %(prog)s --verify --business nash-and-smashed
        """
    )
    parser.add_argument(
        '--business', '-b', 
        default='nash-and-smashed',
        help='Business ID (default: nash-and-smashed)'
    )
    parser.add_argument(
        '--model', '-m', 
        default='llama3.2',
        help='Ollama model (default: llama3.2)'
    )
    parser.add_argument(
        '--single', '-s',
        nargs=2,
        metavar=('KEYWORD', 'LOCATION'),
        help='Generate single blog: keyword "city state"'
    )
    parser.add_argument(
        '--generate', '-g',
        type=int,
        metavar='COUNT',
        help='Generate specified number of blogs from business-data.json'
    )
    parser.add_argument(
        '--verify', '-v', 
        action='store_true',
        help='Verify setup only'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Verbose logging'
    )
    
    args = parser.parse_args()
    
    # Set logging level
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        if args.verify:
            # Verification mode
            generator = SimplifiedContentGenerator(args.business, args.model)
            logging.info("Verifying setup...")
            logging.info(f"✓ Business config: {generator.business_config.business_name}")
            logging.info(f"  - Operational: {generator.business_config.operational_locations} locations")
            logging.info(f"  - Upcoming: {generator.business_config.upcoming_locations} locations")
            logging.info("✓ Ollama model: %s", args.model)
            logging.info("✓ Database path: %s", generator.business_config.db_path)
            generator.cleanup()
            logging.info("All checks passed!")
            return

        generator = SimplifiedContentGenerator(args.business, args.model)

        try:
            if args.single:
                keyword, location = args.single
                logging.info(f"Generating: {keyword} | {location}")
                result = generator.generate_blog_content(keyword, location)
                if result.get("success"):
                    logging.info(f"✓ Success: {result['title']}")
                    logging.info(f"  URL: {result['url']}")
                    logging.info(f"  Words: {result['word_count']}")
                    logging.info(f"  Status: {result.get('location_status', 'unknown')}")
                else:
                    logging.error(f"✗ Failed: {result.get('reason', 'unknown')}")
                    if 'error' in result:
                        logging.error(f"  Error: {result['error']}")
                    sys.exit(1)

            elif args.generate:
                count = args.generate
                logging.info(f"Generating {count} blogs from business configuration")
                result = generate_multiple_blogs(generator, count)
                if result.get("success"):
                    successful = len(result["successful"])
                    failed = len(result["failed"])
                    total_time = result["generation_time"]
                    logging.info(f"✓ Generation completed!")
                    logging.info(f"  Successful: {successful}/{result['total_requested']}")
                    logging.info(f"  Failed: {failed}")
                    logging.info(f"  By status: {result['by_status']}")
                    logging.info(f"  Total time: {total_time:.2f}s")
                    if successful > 0:
                        logging.info(f"  Average time per blog: {total_time/successful:.2f}s")
                    if 'export_count' in result:
                        logging.info(f"  Exported: {result['export_count']} blogs")
                    if failed > 0:
                        logging.warning(f"\n❌ Failed generations:")
                        for failure in result["failed"][:5]:
                            logging.warning(f"  • {failure['keyword']} | {failure['location']}: {failure['reason']}")
                        if failed > 5:
                            logging.warning(f"  ... and {failed - 5} more")
                    if successful > 0:
                        logging.info(f"\n✅ Sample successful generations:")
                        for success in result["successful"][:3]:
                            logging.info(f"  • {success['title']} ({success['word_count']} words, {success['status']})")
                else:
                    logging.error(f"✗ Generation failed: {result.get('reason', 'unknown')}")
                    if 'error' in result:
                        logging.error(f"  Error: {result['error']}")
                    sys.exit(1)

            else:
                logging.info("Choose an option:")
                logging.info("  --single KEYWORD LOCATION    Generate one blog")
                logging.info("  --generate COUNT             Generate multiple blogs")
                logging.info("  --verify                     Check setup")

        finally:
            generator.cleanup()

    except KeyboardInterrupt:
        logging.info("Interrupted by user")

    except Exception as e:
        logging.error(f"Error: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    cli_entry_point()
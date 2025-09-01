import argparse
import logging
import sys
from .business_config import BusinessConfig

logger = logging.getLogger(__name__)

def cli_entry_point():
    """Command line entry point for business config operations."""
    parser = argparse.ArgumentParser(
        description="Business Config CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --business nash-and-smashed --show
  %(prog)s --business nash-and-smashed --locations
        """
    )
    parser.add_argument(
        "--business", "-b",
        default="nash-and-smashed",
        help="Business ID to show config for (default: nash-and-smashed)"
    )
    parser.add_argument(
        "--show",
        action="store_true",
        help="Show full business config"
    )
    parser.add_argument(
        "--locations",
        action="store_true",
        help="Show locations and their status"
    )
    parser.add_argument(
        "--config-path",
        default="business-data.json",
        help="Path to business-data.json"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable verbose logging"
    )

    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    try:
        config = BusinessConfig.get_config(args.business, args.config_path)

        if args.show:
            import pprint
            pprint.pprint(config)
        elif args.locations:
            print(f"Locations for {config.business_name}:")
            for key, loc in config.locations.items():
                print(f"  {loc.city}, {loc.state} - {loc.status}")
        else:
            print(f"Business: {config.business_name}")
            print(f"Email: {config.email}")
            print(f"Phone: {config.phone}")
            print(f"Operational locations: {config.operational_locations}")
            print(f"Upcoming locations: {config.upcoming_locations}")

    except Exception as e:
        logger.error(f"Error: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    cli_entry_point()
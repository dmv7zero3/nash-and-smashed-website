import re
import logging

logger = logging.getLogger()

def validate_email(email):
    """Validate email format"""
    logger.info(f"Validating email: '{email}' (type: {type(email)})")
    
    if not email:
        logger.warning("Email is None or empty")
        return False
        
    # More permissive email regex
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    result = re.match(email_regex, str(email)) is not None
    
    logger.info(f"Email validation result for '{email}': {result}")
    return result

def validate_subscriber_request(event_body):
    """Validate subscriber form submission data"""
    logger.info(f"Validating request body: {event_body}")
    
    errors = {}
    email = event_body.get("email")
    
    logger.info(f"Extracted email: '{email}' (type: {type(email)})")
    
    if not email:
        logger.warning("No email found in request body")
        errors["email"] = "Email is required."
    elif not validate_email(email):
        logger.warning(f"Email validation failed for: '{email}'")
        errors["email"] = "A valid email address is required."
    else:
        logger.info(f"Email validation passed for: '{email}'")
    
    logger.info(f"Validation errors: {errors}")
    return errors
# ==============================================================================
# AWS_Lambda_Functions/nashsmash-submit-contact-form-uk/validation.py
# ==============================================================================
import re
import logging

logger = logging.getLogger()

def validate_email(email):
    """Validate email format"""
    if not email:
        return False
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        return False
    
    return True

def validate_phone(phone):
    """
    Flexible phone validation - focuses on security, not strict format
    Allows UK, international, and various formats
    Prevents injection attacks while being user-friendly
    """
    if not phone:
        return True  # Phone is optional
    
    logger.info(f"Validating phone: '{phone}'")
    
    # Security check: Remove dangerous characters and check for injection attempts
    dangerous_chars = ['<', '>', 'script', 'javascript:', 'onclick', 'onerror']
    phone_lower = phone.lower()
    for dangerous in dangerous_chars:
        if dangerous in phone_lower:
            logger.warning(f"Phone validation FAILED - dangerous content: '{phone}'")
            return False
    
    # Remove common formatting characters for length check
    cleaned_phone = re.sub(r'[\s\-\(\)\+\.\#ext]', '', phone)
    
    # Very flexible validation:
    # - Must contain at least 7 digits (minimum for valid phone numbers)
    # - Max 20 characters total (generous limit for international + formatting)
    # - Allow digits, spaces, dashes, parentheses, plus sign, periods, # and ext
    if len(cleaned_phone) < 7:
        logger.warning(f"Phone validation FAILED - too short: '{phone}' (cleaned: '{cleaned_phone}')")
        return False
    
    if len(phone) > 20:
        logger.warning(f"Phone validation FAILED - too long: '{phone}'")
        return False
    
    # Check if it contains at least 7 digits and only allowed characters
    allowed_pattern = r'^[\d\s\-\(\)\+\.\#ext]*$'
    if not re.match(allowed_pattern, phone, re.IGNORECASE):
        logger.warning(f"Phone validation FAILED - invalid characters: '{phone}'")
        return False
    
    # Count digits - must have at least 7
    digit_count = len(re.findall(r'\d', phone))
    if digit_count < 7:
        logger.warning(f"Phone validation FAILED - not enough digits: '{phone}' (found {digit_count})")
        return False
    
    logger.info(f"Phone validation PASSED: '{phone}' (digits: {digit_count})")
    return True

def validate_uk_contact_request(event_body):
    """Validate UK contact form submission data"""
    errors = {}
    
    # Security first: Sanitize all inputs
    sanitized_body = sanitize_uk_form_data(event_body)
    
    # Check required fields
    first_name = sanitized_body.get('firstName', '').strip()
    if not first_name:
        errors['firstName'] = "First name is required"
    elif len(first_name) > 100:
        errors['firstName'] = "First name is too long"
    
    # Last name handling - flexible for UK users
    last_name = sanitized_body.get('lastName', '').strip()
    if not last_name:
        # Check if firstName contains multiple words (full name entered)
        if ' ' not in first_name:
            errors['lastName'] = "Last name is required"
    elif len(last_name) > 100:
        errors['lastName'] = "Last name is too long"
    
    # Validate email
    email = sanitized_body.get('email', '').strip()
    if not email:
        errors['email'] = "Email is required"
    elif not validate_email(email):
        errors['email'] = "Please enter a valid email address"
    elif len(email) > 200:
        errors['email'] = "Email address is too long"
    
    # Validate phone (optional but flexible when provided)
    phone = sanitized_body.get('phone', '').strip()
    if phone and phone.lower() not in ['not provided', 'n/a', 'na']:
        if not validate_phone(phone):
            errors['phone'] = "Please enter a valid phone number"
    
    # Validate inquiry type
    inquiry_type = sanitized_body.get('inquiryType') or sanitized_body.get('interestType') or sanitized_body.get('type')
    if not inquiry_type:
        errors['inquiryType'] = "Please select an inquiry type"
    
    # Validate message
    message = sanitized_body.get('message', '').strip()
    if not message:
        errors['message'] = "Message is required"
    elif len(message) < 10:
        errors['message'] = "Message is too short (minimum 10 characters)"
    elif len(message) > 2000:
        errors['message'] = "Message is too long (maximum 2000 characters)"
    
    # Update the original event_body with sanitized data
    event_body.update(sanitized_body)
    
    # Return list of error messages
    if errors:
        logger.warning(f"Validation errors: {errors}")
        return list(errors.values())
    
    logger.info("UK contact form validation passed")
    return []

def sanitize_input(value):
    """
    Remove dangerous content while preserving user-friendly input
    Focus on security, not strict formatting
    """
    if not isinstance(value, str):
        return value
    
    # Remove HTML tags
    clean_value = re.sub(r'<[^>]*>', '', value)
    
    # Remove script content and dangerous attributes
    clean_value = re.sub(r'javascript:', '', clean_value, flags=re.IGNORECASE)
    clean_value = re.sub(r'on\w+\s*=', '', clean_value, flags=re.IGNORECASE)
    clean_value = re.sub(r'style\s*=', '', clean_value, flags=re.IGNORECASE)
    
    # Remove null bytes and other control characters (except newlines and tabs)
    clean_value = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', clean_value)
    
    # Normalize whitespace but preserve line breaks
    clean_value = re.sub(r'[ \t]+', ' ', clean_value)
    clean_value = re.sub(r'\n+', '\n', clean_value)
    
    return clean_value.strip()

def sanitize_uk_form_data(form_data):
    """Sanitize all UK form data fields"""
    sanitized = {}
    for key, value in form_data.items():
        if isinstance(value, str):
            sanitized[key] = sanitize_input(value)
        elif isinstance(value, list):
            sanitized[key] = [sanitize_input(item) if isinstance(item, str) else item for item in value]
        else:
            sanitized[key] = value
    return sanitized

def detect_spam_patterns(form_data):
    """
    Basic spam detection - logs suspicious patterns but doesn't block
    Focuses on obvious spam while avoiding false positives
    """
    spam_indicators = []
    
    # Check for excessive URLs
    message = str(form_data.get('message', ''))
    url_pattern = r'https?://[^\s]+'
    urls = re.findall(url_pattern, message)
    if len(urls) > 3:
        spam_indicators.append(f"Excessive URLs: {len(urls)}")
    
    # Check for repetitive content
    if len(message) > 50 and len(set(message.replace(' ', '').lower())) < 10:
        spam_indicators.append("Repetitive content detected")
    
    # Check for common spam keywords (very basic)
    spam_keywords = ['crypto', 'bitcoin', 'viagra', 'casino', 'lottery', 'inheritance']
    for keyword in spam_keywords:
        if keyword.lower() in message.lower():
            spam_indicators.append(f"Spam keyword: {keyword}")
    
    if spam_indicators:
        logger.warning(f"Potential spam indicators: {spam_indicators}")
    
    return spam_indicators
# AWS_Lambda_Functions/nashsmash-submit-contact-form/validation.py
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
    """Validate phone format if provided"""
    if not phone:
        return True
    phone_regex = r'^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'
    return re.match(phone_regex, phone) is not None

def validate_contact_request(event_body):
    """Validate contact form submission data"""
    errors = {}
    
    # Check required fields
    if not event_body.get('firstName'):
        errors['firstName'] = "First name is required"
    
    if not event_body.get('lastName'):
        errors['lastName'] = "Last name is required"
    
    # Validate email
    email = event_body.get('email')
    if not email:
        errors['email'] = "Email is required"
    elif not validate_email(email):
        errors['email'] = "Email address is invalid"
    
    # Validate phone
    phone = event_body.get('phone')
    if not phone:
        errors['phone'] = "Phone number is required"
    elif not validate_phone(phone):
        errors['phone'] = "Phone number is invalid"
    
    # Validate interest type
    if not event_body.get('interestType'):
        errors['interestType'] = "Interest type is required"
    
    # Validate message
    if not event_body.get('message'):
        errors['message'] = "Message is required"
    elif len(event_body.get('message', '')) < 10:
        errors['message'] = "Message is too short (minimum 10 characters)"
    
    # Convert to list format if needed
    if errors:
        return list(errors.values())
    
    return []
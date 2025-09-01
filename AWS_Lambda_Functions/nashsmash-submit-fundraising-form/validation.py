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

def validate_fundraising_request(event_body):
    """Validate fundraising form submission data"""
    errors = {}
    
    # Check required fields
    if not event_body.get('organizationName'):
        errors['organizationName'] = "Organization name is required"
    
    if not event_body.get('orgType'):
        errors['orgType'] = "Organization type is required"
    
    if not event_body.get('contactName'):
        errors['contactName'] = "Contact name is required"
    
    # Validate email
    email = event_body.get('email')
    if not email:
        errors['email'] = "Email address is required"
    elif not validate_email(email):
        errors['email'] = "Email address is invalid"
    
    # Validate phone
    phone = event_body.get('phone')
    if not phone:
        errors['phone'] = "Phone number is required"
    elif not validate_phone(phone):
        errors['phone'] = "Phone number is invalid"
    
    if not event_body.get('location'):
        errors['location'] = "Location is required"
    
    if not event_body.get('preferredDate'):
        errors['preferredDate'] = "Preferred date is required"
    
    # Convert to list format if needed
    if errors:
        return list(errors.values())
    
    return []
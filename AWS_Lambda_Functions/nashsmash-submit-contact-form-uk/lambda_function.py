# ==============================================================================
# AWS_Lambda_Functions/nashsmash-submit-contact-form-uk/lambda_function.py
# ==============================================================================
import json
import os
import boto3
import logging
from datetime import datetime

# Import modules
from validation import validate_uk_contact_request, detect_spam_patterns
from storage import save_uk_contact_to_dynamodb
from email_services import send_uk_notification_email, send_uk_confirmation_email
from utils import get_body_from_event
from rate_limiting import check_rate_limit

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Check if SES is properly configured
try:
    ses_client = boto3.client('ses')
    sender_email = os.environ.get('SENDER_EMAIL', 'info@nashandsmashed.co.uk')
    identity_verified = False
    
    try:
        response = ses_client.get_identity_verification_attributes(
            Identities=[sender_email]
        )
        if sender_email in response['VerificationAttributes'] and \
           response['VerificationAttributes'][sender_email]['VerificationStatus'] == 'Success':
            identity_verified = True
    except Exception as e:
        logger.warning(f"Could not check SES identity status: {str(e)}")
    
    if not identity_verified:
        logger.warning(f"SES identity '{sender_email}' may not be verified. Email sending might fail.")
except Exception as e:
    logger.error(f"Error checking SES configuration: {str(e)}")

# Environment variables - UK specific
WEBSITE_NAME = os.environ.get('WEBSITE_NAME', 'Nash & Smashed UK')
WEBSITE_URL = os.environ.get('WEBSITE_URL', 'https://nashandsmashed.com')
UK_CONTACT_TABLE = os.environ.get('UK_CONTACT_TABLE', 'nash-and-smashed-uk-contact-form-table')
UK_RECIPIENT_EMAIL = os.environ.get('UK_RECIPIENT_EMAIL', 'info@nashandsmashed.co.uk')
UK_CC_EMAIL = os.environ.get('UK_CC_EMAIL', 'franchising@nashandsmashed.co.uk')

def get_cors_headers():
    """Get CORS headers for all responses"""
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key'
    }

def lambda_handler(event, context):
    """Main handler function for the UK contact form Lambda"""
    try:
        logger.info("Received UK contact form submission")
        
        # Check for OPTIONS request (CORS preflight)
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': get_cors_headers(),
                'body': ''
            }
        
        # Get IP address for rate limiting
        ip_address = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
        
        # Check rate limit
        rate_limit_ok, rate_limit_message = check_rate_limit(ip_address)
        if not rate_limit_ok:
            logger.warning(f"Rate limit exceeded for IP: {ip_address}")
            return {
                'statusCode': 429,
                'headers': get_cors_headers(),
                'body': json.dumps({
                    'success': False,
                    'message': rate_limit_message
                })
            }
        
        # Parse request body
        body = get_body_from_event(event)
        
        # Log form submission (without sensitive data)
        logger.info(f"UK form submission from IP: {ip_address}, inquiry type: {body.get('inquiryType', 'unknown')}")
        
        # Validate the request (includes sanitization)
        validation_errors = validate_uk_contact_request(body)
        if validation_errors:
            logger.warning(f"UK form validation failed for IP {ip_address}: {validation_errors}")
            return {
                'statusCode': 400,
                'headers': get_cors_headers(),
                'body': json.dumps({
                    'success': False,
                    'errors': validation_errors,
                    'message': 'Please check your form data and try again.'
                })
            }
        
        # Check for spam patterns (log but don't block)
        spam_indicators = detect_spam_patterns(body)
        
        # Add metadata to form data
        form_data = body.copy()
        form_data['metadata'] = {
            'submittedAt': datetime.now().isoformat(),
            'userAgent': event.get('headers', {}).get('User-Agent', ''),
            'ipAddress': ip_address,
            'location': 'UK',
            'formType': 'uk_contact',
            'spamIndicators': spam_indicators if spam_indicators else None,
            'sourceCountry': event.get('headers', {}).get('CloudFront-Viewer-Country', 'Unknown'),
            'referer': event.get('headers', {}).get('Referer', '')
        }
        
        # Save UK contact form to DynamoDB
        form_id = save_uk_contact_to_dynamodb(form_data, UK_CONTACT_TABLE)
        
        # Prepare email addresses
        to_addresses = [UK_RECIPIENT_EMAIL]
        cc_addresses = [UK_CC_EMAIL] if UK_CC_EMAIL else None
        
        # Send notification email to UK team
        admin_email_sent = send_uk_notification_email(
            form_data=form_data, 
            form_id=form_id, 
            website_name=WEBSITE_NAME, 
            website_url=WEBSITE_URL,
            to_addresses=to_addresses,
            cc_addresses=cc_addresses
        )
        
        # Send confirmation email to the inquirer
        confirmation_email_sent = send_uk_confirmation_email(
            form_data=form_data, 
            website_name=WEBSITE_NAME, 
            website_url=WEBSITE_URL
        )
        
        # Log spam indicators if any
        if spam_indicators:
            logger.warning(f"UK form {form_id} flagged with spam indicators: {spam_indicators}")
        
        # Log successful submission
        logger.info(f"UK contact form successfully processed: {form_id}, emails sent: admin={admin_email_sent}, confirmation={confirmation_email_sent}")
        
        # Return successful response
        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': json.dumps({
                'success': True,
                'message': 'Your message has been successfully submitted to our UK team. We will get back to you shortly.',
                'formID': form_id,
                'location': 'UK'
            })
        }
        
    except Exception as e:
        # Log the error with context
        logger.error(f"Error processing UK contact form submission: {str(e)}", exc_info=True)
        
        # Return error response
        return {
            'statusCode': 500,
            'headers': get_cors_headers(),
            'body': json.dumps({
                'success': False,
                'message': 'An error occurred while processing your message. Please try again later or contact us directly at info@nashandsmashed.co.uk'
            })
        }
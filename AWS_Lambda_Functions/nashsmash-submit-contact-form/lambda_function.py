# AWS_Lambda_Functions/nashsmash-submit-contact-form/lambda_function.py
import json
import os
import boto3
import logging
from datetime import datetime

# Import modules
from validation import validate_contact_request
from storage import save_contact_to_dynamodb
from email_services import send_notification_email, send_confirmation_email
from utils import get_body_from_event

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Check if SES is properly configured
try:
    # Verify SES identity is available
    ses_client = boto3.client('ses')
    sender_email = os.environ.get('SENDER_EMAIL', 'contact@nashandsmashed.com')
    identity_verified = False
    
    # Try to describe the SES identity to check if it's verified
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

# Environment variables
WEBSITE_NAME = os.environ.get('WEBSITE_NAME', 'Nash & Smashed')
WEBSITE_URL = os.environ.get('WEBSITE_URL', 'https://nashandsmashed.com')
CONTACT_TABLE = os.environ.get('CONTACT_TABLE', 'nash-and-smashed-contact-form-table')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'contact@nashandsmashed.com')
CC_EMAIL = os.environ.get('CC_EMAIL')

def lambda_handler(event, context):
    """Main handler function for the contact form Lambda"""
    try:
        # Log the incoming event (redact sensitive information for production)
        if os.environ.get('LOG_LEVEL') == 'DEBUG':
            logger.info(f"Received contact form submission: {json.dumps(event)}")
        else:
            logger.info(f"Received contact form submission")
        
        # Check for OPTIONS request (CORS preflight)
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                    'Access-Control-Max-Age': '86400'
                },
                'body': ''
            }
        
        # Parse request body
        body = get_body_from_event(event)
        
        # Validate the request
        validation_errors = validate_contact_request(body)
        if validation_errors:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'errors': validation_errors
                })
            }
        
        # Add metadata to form data
        form_data = body.copy()
        form_data['metadata'] = {
            'submittedAt': datetime.now().isoformat(),
            'userAgent': event.get('headers', {}).get('User-Agent', ''),
            'ipAddress': event.get('requestContext', {}).get('identity', {}).get('sourceIp', '')
        }
        
        # Save contact form to DynamoDB
        form_id = save_contact_to_dynamodb(form_data, CONTACT_TABLE)
        
        # Send notification email to admin
        admin_email_sent = send_notification_email(
            form_data=form_data, 
            form_id=form_id, 
            website_name=WEBSITE_NAME, 
            website_url=WEBSITE_URL
        )
        
        # Send confirmation email to the inquirer
        confirmation_email_sent = send_confirmation_email(
            form_data=form_data, 
            website_name=WEBSITE_NAME, 
            website_url=WEBSITE_URL
        )
        
        # Return successful response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Your message has been successfully submitted. We will get back to you shortly.',
                'formID': form_id
            })
        }
        
    except Exception as e:
        # Log the error
        logger.error(f"Error processing contact form submission: {str(e)}")
        
        # Return error response
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'message': 'An error occurred while processing your message. Please try again later or contact us directly.'
            })
        }
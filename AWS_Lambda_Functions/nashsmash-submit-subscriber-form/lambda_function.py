import os
import json
import logging

from validation import validate_subscriber_request
from storage import save_subscriber_to_dynamodb
from email_services import send_confirmation_email
from utils import get_body_from_event, get_metadata, get_ip_address
from rate_limiting import check_rate_limit

logger = logging.getLogger()
logger.setLevel(logging.INFO)

SUBSCRIBER_TABLE = os.environ.get('SUBSCRIBER_TABLE', 'nash-and-smashed-subscriber-form-table')
WEBSITE_NAME = os.environ.get('WEBSITE_NAME', 'Nash & Smashed')
WEBSITE_URL = os.environ.get('WEBSITE_URL', 'https://nashandsmashed.com')

def lambda_handler(event, context):
    """Main handler function for the subscriber form Lambda"""
    try:
        logger.info("Received subscriber form submission")
        
        # Handle CORS preflight
        if event.get("httpMethod", "") == "OPTIONS":
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

        body = get_body_from_event(event)
        metadata = get_metadata(event)
        ip_address = get_ip_address(event)

        # Rate limiting
        allowed, rate_limit_msg = check_rate_limit(ip_address)
        if allowed is False:
            logger.warning(f"Rate limit exceeded for IP: {ip_address}")
            return {
                "statusCode": 429,
                "headers": {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                "body": json.dumps({
                    "success": False,
                    "message": rate_limit_msg or "Rate limit exceeded. Please try again later."
                })
            }

        # Validation
        errors = validate_subscriber_request(body)
        if errors:
            return {
                "statusCode": 400,
                "headers": {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                "body": json.dumps({
                    "success": False,
                    "errors": errors,
                    "message": "Validation failed."
                })
            }

        # Prepare form data
        form_data = {
            "email": body.get("email"),
            "firstName": body.get("firstName"),
            "lastName": body.get("lastName"),
            "metadata": metadata
        }

        # Save to DynamoDB (this handles duplicates automatically)
        result = save_subscriber_to_dynamodb(form_data, SUBSCRIBER_TABLE)
        if result is None or result[0] is None:
            return {
                "statusCode": 500,
                "headers": {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                "body": json.dumps({
                    "success": False,
                    "message": "Failed to save subscriber. Please try again."
                })
            }

        form_id, is_update = result

        # Send confirmation email
        try:
            send_confirmation_email(form_data, WEBSITE_NAME, WEBSITE_URL)
            email_sent = True
            logger.info(f"Confirmation email sent to {body.get('email')}")
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            email_sent = False

        # Return appropriate message based on whether it was a duplicate
        if is_update:
            message = "Your subscription has been updated successfully!"
            logger.info(f"Updated existing subscription for: {body.get('email')}")
        else:
            message = "Subscription successful!"
            logger.info(f"Created new subscription for: {body.get('email')}")

        return {
            "statusCode": 200,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps({
                "success": True,
                "message": message,
                "formID": form_id,
                "isUpdate": is_update,
                "emailSent": email_sent
            })
        }
        
    except Exception as e:
        # Log the error
        logger.error(f"Error processing subscriber form submission: {str(e)}")
        
        # Return error response
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'message': 'An error occurred while processing your subscription. Please try again later or contact us directly.'
            })
        }
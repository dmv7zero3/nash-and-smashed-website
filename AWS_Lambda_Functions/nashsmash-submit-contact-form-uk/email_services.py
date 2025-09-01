# ==============================================================================
# AWS_Lambda_Functions/nashsmash-submit-contact-form-uk/email_services.py
# ==============================================================================
import os
import boto3
import logging
from datetime import datetime
from botocore.exceptions import ClientError
from email_templates import get_uk_contact_notification_template, get_uk_contact_confirmation_template

# Configure logging
logger = logging.getLogger()

# Initialize SES
ses = boto3.client('ses')

# Environment variables - UK specific
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'info@nashandsmashed.co.uk')
UK_RECIPIENT_EMAIL = os.environ.get('UK_RECIPIENT_EMAIL', 'info@nashandsmashed.co.uk')
UK_CC_EMAIL = os.environ.get('UK_CC_EMAIL', 'franchising@nashandsmashed.co.uk')

def send_uk_notification_email(form_data, form_id, website_name, website_url, to_addresses=None, cc_addresses=None):
    """Send notification email to UK contact form administrators"""
    # Use provided to_addresses or default
    if to_addresses is None:
        to_addresses = [UK_RECIPIENT_EMAIL]
        
    # Use provided cc_addresses or default
    if cc_addresses is None and UK_CC_EMAIL:
        cc_addresses = [UK_CC_EMAIL]
    elif cc_addresses is None:
        cc_addresses = []
    
    subject, body_html, body_text = get_uk_contact_notification_template(
        form_data=form_data,
        form_id=form_id,
        website_name=website_name,
        website_url=website_url
    )
    
    try:
        email_destination = {
            'ToAddresses': to_addresses
        }
        
        # Add CC addresses if any exist
        if cc_addresses:
            email_destination['CcAddresses'] = cc_addresses
        
        response = ses.send_email(
            Source=SENDER_EMAIL,
            Destination=email_destination,
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Text': {'Data': body_text},
                    'Html': {'Data': body_html}
                }
            },
            ReplyToAddresses=[form_data.get('email', SENDER_EMAIL)]
        )
        
        recipients_log = ', '.join(to_addresses)
        if cc_addresses:
            recipients_log += f" (CC: {', '.join(cc_addresses)})"
            
        logger.info(f"UK notification email sent to {recipients_log}: {response['MessageId']}")
        return True
    except ClientError as e:
        logger.error(f"SES error: {e}")
        return False

def send_uk_confirmation_email(form_data, website_name, website_url):
    """Send confirmation email to the person who submitted the UK form"""
    subject, body_html, body_text = get_uk_contact_confirmation_template(
        form_data=form_data,
        website_name=website_name,
        website_url=website_url
    )
    
    try:
        to_addresses = [form_data.get('email')]
            
        response = ses.send_email(
            Source=SENDER_EMAIL,
            Destination={
                'ToAddresses': to_addresses
            },
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Text': {'Data': body_text},
                    'Html': {'Data': body_html}
                }
            }
        )
        logger.info(f"UK confirmation email sent to {', '.join(to_addresses)}: {response['MessageId']}")
        return True
    except ClientError as e:
        logger.error(f"SES error for UK confirmation email: {e}")
        return False

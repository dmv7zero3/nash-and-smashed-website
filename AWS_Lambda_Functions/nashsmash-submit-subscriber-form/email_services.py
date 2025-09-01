import boto3
import os
import logging
from email_templates import get_subscriber_confirmation_template

logger = logging.getLogger()
ses = boto3.client('ses')

SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'noreply@nashandsmashed.com')

def send_confirmation_email(form_data, website_name, website_url):
    """Send confirmation email to the subscriber"""
    subject, body = get_subscriber_confirmation_template(form_data, website_name, website_url)
    try:
        ses.send_email(
            Source=SENDER_EMAIL,
            Destination={'ToAddresses': [form_data.get("email")]},
            Message={
                'Subject': {'Data': subject},
                'Body': {'Text': {'Data': body}}
            }
        )
        logger.info(f"Confirmation email sent to {form_data.get('email')}")
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
        raise
# ==============================================================================
# AWS_Lambda_Functions/nashsmash-submit-contact-form-uk/storage.py
# ==============================================================================
import os
import json
import time
import boto3
import logging
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')

def save_uk_contact_to_dynamodb(form_data, table_name):
    """Save UK contact form submission to DynamoDB"""
    table = dynamodb.Table(table_name)
    
    # Generate timestamp and submission ID
    timestamp = int(time.time() * 1000)  # Current time in milliseconds
    form_id = f"UK_CONTACT_{timestamp}"
    
    try:
        # Create item for DynamoDB with proper keys
        item = {
            'formID': form_id,          # This is the partition key
            'timestamp': timestamp,      # This is the sort key
            'firstName': form_data.get('firstName', ''),
            'lastName': form_data.get('lastName', ''),
            'fullName': f"{form_data.get('firstName', '')} {form_data.get('lastName', '')}".strip(),
            'email': form_data.get('email', ''),
            'phone': form_data.get('phone', ''),
            'inquiryType': form_data.get('inquiryType', ''),
            'message': form_data.get('message', ''),
            'location': form_data.get('location', 'Not specified'),
            'formType': 'uk_contact',
            'status': 'new',
            'region': 'UK',
        }
        
        # Add metadata if available
        if form_data.get('metadata'):
            if form_data['metadata'].get('submittedAt'):
                item['submittedAt'] = form_data['metadata']['submittedAt']
            if form_data['metadata'].get('userAgent'):
                item['userAgent'] = form_data['metadata']['userAgent']
            if form_data['metadata'].get('ipAddress'):
                item['ipAddress'] = form_data['metadata']['ipAddress']
            if form_data['metadata'].get('location'):
                item['sourceLocation'] = form_data['metadata']['location']
           
        # Save to DynamoDB
        table.put_item(Item=item)
        logger.info(f"UK contact form submission saved to DynamoDB: {form_id}")
        return form_id
    
    except ClientError as e:
        logger.error(f"DynamoDB error while saving UK contact form: {e}")
        raise Exception("Failed to save UK contact form submission")

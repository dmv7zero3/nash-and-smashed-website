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

def save_fundraising_to_dynamodb(form_data, table_name):
    """Save fundraising form submission to DynamoDB"""
    table = dynamodb.Table(table_name)
    
    # Generate timestamp and submission ID
    timestamp = int(time.time() * 1000)  # Current time in milliseconds
    form_id = f"FUND_{timestamp}"
    
    try:
        # Create item for DynamoDB with proper keys
        item = {
            'formID': form_id,          # This is the partition key
            'timestamp': timestamp,      # This is the sort key
            'organizationName': form_data.get('organizationName', ''),
            'orgType': form_data.get('orgType', ''),
            'contactName': form_data.get('contactName', ''),
            'email': form_data.get('email', ''),
            'phone': form_data.get('phone', ''),
            'taxId': form_data.get('taxId', ''),
            'location': form_data.get('location', ''),
            'preferredDate': form_data.get('preferredDate', ''),
            'description': form_data.get('description', ''),
            'termsAgreed': form_data.get('termsAgreed', False),
            'formType': 'fundraising',
            'status': 'new',
        }
        
        # Add metadata if available
        if form_data.get('metadata'):
            if form_data['metadata'].get('submittedAt'):
                item['submittedAt'] = form_data['metadata']['submittedAt']
            if form_data['metadata'].get('userAgent'):
                item['userAgent'] = form_data['metadata']['userAgent']
            if form_data['metadata'].get('ipAddress'):
                item['ipAddress'] = form_data['metadata']['ipAddress']
           
        # Save to DynamoDB
        table.put_item(Item=item)
        logger.info(f"Fundraising form submission saved to DynamoDB: {form_id}")
        return form_id
    
    except ClientError as e:
        logger.error(f"DynamoDB error while saving fundraising form: {e}")
        raise Exception("Failed to save fundraising form submission")
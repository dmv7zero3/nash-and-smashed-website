import boto3
import time
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger()
dynamodb = boto3.resource('dynamodb')

def save_subscriber_to_dynamodb(form_data, table_name):
    """Save subscriber form submission to DynamoDB with automatic duplicate prevention"""
    table = dynamodb.Table(table_name)
    email = form_data.get("email")
    timestamp = str(int(time.time() * 1000))
    form_id = f"SUBSCR_{timestamp}"
    
    # Check if subscriber already exists
    existing_subscriber = get_subscriber_by_email(email, table_name)
    is_update = existing_subscriber is not None
    
    # Use email as the only key - this automatically prevents duplicates
    item = {
        "email": email,                         # Primary key (String)
        "formID": form_id,
        "firstName": form_data.get("firstName", ""),
        "lastName": form_data.get("lastName", ""),
        "metadata": form_data.get("metadata", {}),
        "formType": "subscriber",
        "status": "active",
        "createdAt": existing_subscriber.get("createdAt", timestamp) if existing_subscriber else timestamp,
        "updatedAt": timestamp,
        "subscriptionCount": (existing_subscriber.get("subscriptionCount", 0) + 1) if existing_subscriber else 1
    }
    
    logger.info(f"{'Updating' if is_update else 'Creating'} subscriber item for: {email}")
    
    try:
        # This will either create a new item or completely replace existing one
        table.put_item(Item=item)
        logger.info(f"Successfully {'updated' if is_update else 'created'} subscriber: {form_id} for email: {email}")
        return form_id, is_update
    except Exception as e:
        logger.error(f"Error saving subscriber: {str(e)}")
        return None, False

def get_subscriber_by_email(email, table_name):
    """Get subscriber by email address"""
    table = dynamodb.Table(table_name)
    
    try:
        response = table.get_item(Key={'email': email})
        item = response.get('Item')
        
        if item:
            logger.info(f"Found existing subscriber: {email}")
            return item
        else:
            logger.info(f"No existing subscriber found for: {email}")
            return None
            
    except Exception as e:
        logger.error(f"Error retrieving subscriber {email}: {str(e)}")
        return None

def get_all_subscribers(table_name, limit=None):
    """Get all subscribers from the table"""
    table = dynamodb.Table(table_name)
    
    try:
        if limit:
            response = table.scan(Limit=limit)
        else:
            response = table.scan()
        
        items = response.get('Items', [])
        logger.info(f"Retrieved {len(items)} subscribers from table")
        return items
        
    except Exception as e:
        logger.error(f"Error retrieving all subscribers: {str(e)}")
        return []

def delete_subscriber(email, table_name):
    """Delete a subscriber by email"""
    table = dynamodb.Table(table_name)
    
    try:
        table.delete_item(Key={'email': email})
        logger.info(f"Successfully deleted subscriber: {email}")
        return True
        
    except Exception as e:
        logger.error(f"Error deleting subscriber {email}: {str(e)}")
        return False
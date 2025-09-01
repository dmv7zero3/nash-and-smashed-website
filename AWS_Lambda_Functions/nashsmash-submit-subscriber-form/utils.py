import json
import logging

logger = logging.getLogger()

def get_body_from_event(event):
    """Extract and parse request body from Lambda event"""
    logger.info(f"Full event received: {json.dumps(event, default=str)}")
    
    try:
        body = event.get('body')
        logger.info(f"Raw body from event: {body} (type: {type(body)})")
        
        if isinstance(body, str):
            logger.info("Body is string, attempting to parse JSON")
            parsed_body = json.loads(body)
            logger.info(f"Parsed body: {parsed_body}")
            return parsed_body
        elif body is not None:
            logger.info("Body is not string but exists, returning as-is")
            return body
        else:
            logger.warning("No body found in event, checking if event itself contains data")
            # Sometimes the event itself contains the data (direct invocation)
            if 'email' in event:
                logger.info("Found email directly in event")
                return event
            else:
                logger.warning("No data found anywhere, returning empty dict")
                return {}
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON body: {str(e)}")
        logger.error(f"Raw body was: {body}")
        return {}
    except Exception as e:
        logger.error(f"Unexpected error parsing request body: {str(e)}")
        return {}

def get_ip_address(event):
    """Extract IP address from event headers"""
    headers = event.get("headers", {})
    x_forwarded_for = headers.get("X-Forwarded-For", "")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    
    # Try other common IP headers
    real_ip = headers.get("X-Real-IP", "")
    if real_ip:
        return real_ip.strip()
    
    # Try from request context
    request_context = event.get("requestContext", {})
    identity = request_context.get("identity", {})
    source_ip = identity.get("sourceIp", "unknown")
    
    logger.info(f"Extracted IP address: {source_ip}")
    return source_ip

def get_metadata(event):
    """Extract metadata from event"""
    request_context = event.get("requestContext", {})
    headers = event.get("headers", {})
    
    metadata = {
        "submittedAt": request_context.get("requestTime", ""),
        "userAgent": headers.get("User-Agent", ""),
        "ipAddress": get_ip_address(event),
        "requestId": request_context.get("requestId", "")
    }
    
    logger.info(f"Generated metadata: {metadata}")
    return metadata
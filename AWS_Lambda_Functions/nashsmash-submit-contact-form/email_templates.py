from datetime import datetime

def get_contact_notification_template(form_data, form_id, website_name, website_url):
    """Generate notification email template for contact form submissions"""
    
    subject = f"{website_name}: New Contact Form Submission"
    
    body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #b87333; color: white; padding: 15px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #eaeaea; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #666; text-align: center; }}
            .details {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; }}
            .highlight {{ background-color: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin-bottom: 15px; }}
            .message-box {{ background-color: #f9f9f9; padding: 15px; border: 1px solid #eaeaea; margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="highlight">
                    <p><span class="label">Submission Time:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    <p><span class="label">Interest Type:</span> {form_data.get('interestType', 'Not specified')}</p>
                </div>
                
                <div class="details">
                    <h3>Contact Information</h3>
                    <p><span class="label">Name:</span> {form_data.get('firstName', '')} {form_data.get('lastName', '')}</p>
                    <p><span class="label">Email:</span> <a href="mailto:{form_data.get('email', '')}">{form_data.get('email', '')}</a></p>
                    <p><span class="label">Phone:</span> {form_data.get('phone', 'Not provided')}</p>
                </div>
                
                <div class="details">
                    <h3>Message</h3>
                    <div class="message-box">
                        <p>{form_data.get('message', 'No message provided').replace('\\n', '<br>')}</p>
                    </div>
                </div>
                
                <hr>
                <p>Please respond to this inquiry as soon as possible.</p>
            </div>
            <div class="footer">
                <p>Form ID: {form_id}</p>
                <p>© {datetime.now().year} {website_name}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    NEW CONTACT FORM SUBMISSION
    
    Submission Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    Form ID: {form_id}
    
    INTEREST TYPE:
    {form_data.get('interestType', 'Not specified')}
    
    CONTACT INFORMATION:
    Name: {form_data.get('firstName', '')} {form_data.get('lastName', '')}
    Email: {form_data.get('email', '')}
    Phone: {form_data.get('phone', 'Not provided')}
    
    MESSAGE:
    {form_data.get('message', 'No message provided')}
    
    Please respond to this inquiry as soon as possible.
    """
    
    return subject, body_html, body_text

def get_contact_confirmation_template(form_data, website_name, website_url):
    """Generate confirmation email template for contact form submissions"""
    
    subject = f"Thank you for contacting {website_name}"
    
    body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #b87333; color: white; padding: 15px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #eaeaea; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #666; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>We've Received Your Message</h2>
            </div>
            <div class="content">
                <p>Dear {form_data.get('firstName', '')},</p>
                
                <p>Thank you for reaching out to Nash & Smashed! We've received your message and appreciate your interest.</p>
                
                <p>Our team will review your inquiry about <strong>{form_data.get('interestType', 'your topic')}</strong> and get back to you as soon as possible, typically within 1-2 business days.</p>
                
                <p>If you have any immediate questions or need urgent assistance, please feel free to email us at <a href="mailto:info@nashandsmashed.com">info@nashandsmashed.com</a>.</p>
                
                <p>We look forward to connecting with you soon!</p>
                
                <p>Warm regards,</p>
                <p>The Nash & Smashed Team<br>{website_name}</p>
            </div>
            <div class="footer">
                <p>© {datetime.now().year} {website_name}</p>
                <p><a href="{website_url}">{website_url}</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    WE'VE RECEIVED YOUR MESSAGE
    
    Dear {form_data.get('firstName', '')},
    
    Thank you for reaching out to Nash & Smashed! We've received your message and appreciate your interest.
    
    Our team will review your inquiry about {form_data.get('interestType', 'your topic')} and get back to you as soon as possible, typically within 1-2 business days.
    
    If you have any immediate questions or need urgent assistance, please feel free to call us at (571) 643-5604.
    
    We look forward to connecting with you soon!
    
    Warm regards,
    The Nash & Smashed Team
    {website_name}
    
    © {datetime.now().year} {website_name}
    {website_url}
    """
    
    return subject, body_html, body_text
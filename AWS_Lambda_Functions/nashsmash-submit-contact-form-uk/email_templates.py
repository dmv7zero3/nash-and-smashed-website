# ==============================================================================
# AWS_Lambda_Functions/nashsmash-submit-contact-form-uk/email_templates.py
# ==============================================================================
from datetime import datetime

def get_uk_contact_notification_template(form_data, form_id, website_name, website_url):
    """Generate notification email template for UK contact form submissions"""
    
    subject = f"{website_name}: New UK Contact Form Submission"
    
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
            .uk-badge {{ background-color: #c41e3a; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New UK Contact Form Submission</h2>
                <div class="uk-badge">🇬🇧 UNITED KINGDOM</div>
            </div>
            <div class="content">
                <div class="highlight">
                    <p><span class="label">Submission Time:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} GMT</p>
                    <p><span class="label">Inquiry Type:</span> {form_data.get('inquiryType', 'Not specified')}</p>
                    <p><span class="label">Location:</span> {form_data.get('location', 'UK - Not specified')}</p>
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
                <p><strong>Action Required:</strong> Please respond to this UK inquiry as soon as possible during UK business hours.</p>
            </div>
            <div class="footer">
                <p>Form ID: {form_id}</p>
                <p>© {datetime.now().year} {website_name}</p>
                <p>UK Operations Team</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    NEW UK CONTACT FORM SUBMISSION
    🇬🇧 UNITED KINGDOM
    
    Submission Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} GMT
    Form ID: {form_id}
    
    INQUIRY TYPE:
    {form_data.get('inquiryType', 'Not specified')}
    
    LOCATION:
    {form_data.get('location', 'UK - Not specified')}
    
    CONTACT INFORMATION:
    Name: {form_data.get('firstName', '')} {form_data.get('lastName', '')}
    Email: {form_data.get('email', '')}
    Phone: {form_data.get('phone', 'Not provided')}
    
    MESSAGE:
    {form_data.get('message', 'No message provided')}
    
    ACTION REQUIRED: Please respond to this UK inquiry as soon as possible during UK business hours.
    
    UK Operations Team
    """
    
    return subject, body_html, body_text

def get_uk_contact_confirmation_template(form_data, website_name, website_url):
    """Generate confirmation email template for UK contact form submissions"""
    
    subject = f"Thank you for contacting {website_name} UK"
    
    body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #b87333; color: white; padding: 15px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #eaeaea; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #666; text-align: center; }}
            .uk-badge {{ background-color: #c41e3a; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>We've Received Your Message</h2>
                <div class="uk-badge">🇬🇧 UK TEAM</div>
            </div>
            <div class="content">
                <p>Dear {form_data.get('firstName', '')},</p>
                
                <p>Thank you for reaching out to Nash & Smashed UK! We've received your message and appreciate your interest in bringing authentic Nashville flavors to the United Kingdom.</p>
                
                <p>Our UK team will review your inquiry about <strong>{form_data.get('inquiryType', 'your topic')}</strong> and get back to you as soon as possible, typically within 1-2 business days during UK business hours.</p>
                
                <p>If you have any immediate questions or need urgent assistance, please feel free to contact our UK team directly:</p>
                <ul>
                    <li>📧 Email: <a href="mailto:info@nashandsmashed.co.uk">info@nashandsmashed.co.uk</a></li>
                    <li>📧 Franchising: <a href="mailto:franchising@nashandsmashed.co.uk">franchising@nashandsmashed.co.uk</a></li>
                </ul>
                
                <p>We're excited about expanding Nash & Smashed across the UK and look forward to connecting with you soon!</p>
                
                <p>Warm regards,</p>
                <p>The Nash & Smashed UK Team<br>{website_name}</p>
            </div>
            <div class="footer">
                <p>© {datetime.now().year} {website_name}</p>
                <p><a href="{website_url}">{website_url}</a></p>
                <p>UK Operations</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    WE'VE RECEIVED YOUR MESSAGE
    🇬🇧 UK TEAM
    
    Dear {form_data.get('firstName', '')},
    
    Thank you for reaching out to Nash & Smashed UK! We've received your message and appreciate your interest in bringing authentic Nashville flavors to the United Kingdom.
    
    Our UK team will review your inquiry about {form_data.get('inquiryType', 'your topic')} and get back to you as soon as possible, typically within 1-2 business days during UK business hours.
    
    If you have any immediate questions or need urgent assistance, please feel free to contact our UK team directly:
    
    📧 Email: info@nashandsmashed.co.uk
    📧 Franchising: franchising@nashandsmashed.co.uk
    
    We're excited about expanding Nash & Smashed across the UK and look forward to connecting with you soon!
    
    Warm regards,
    The Nash & Smashed UK Team
    {website_name}
    
    © {datetime.now().year} {website_name}
    {website_url}
    UK Operations
    """
    
    return subject, body_html, body_text
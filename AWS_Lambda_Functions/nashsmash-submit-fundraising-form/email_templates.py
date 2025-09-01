from datetime import datetime

def get_fundraising_notification_template(form_data, form_id, website_name, website_url):
    """Generate notification email template for fundraising form submissions"""
    
    subject = f"{website_name}: New Fundraising Request - {form_data.get('organizationName', 'Organization')}"
    
    body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #b87333; color: white; padding: 15px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #eaeaea; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #666; text-align: center; }}
            .details {{ margin-bottom: 20px; }}
            .label {{ font-weight: bold; color: #333; }}
            .highlight {{ background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 20px; }}
            .field-group {{ margin-bottom: 15px; }}
            table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
            td {{ padding: 8px; border-bottom: 1px solid #eee; vertical-align: top; }}
            .field-label {{ font-weight: bold; width: 30%; color: #555; }}
            .urgent {{ background-color: #f8d7da; padding: 15px; border-left: 4px solid #dc3545; margin-bottom: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Fundraising Request</h2>
            </div>
            <div class="content">
                <div class="highlight">
                    <p><span class="label">Submission Time:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    <p><span class="label">Form ID:</span> {form_id}</p>
                    <p><span class="label">Organization:</span> {form_data.get('organizationName', 'Not provided')}</p>
                </div>
                
                <div class="urgent">
                    <p><strong>⚠️ Action Required:</strong> Please respond to this fundraising request within 48 hours to confirm availability for the requested date.</p>
                </div>
                
                <div class="details">
                    <h3 style="color: #b87333; border-bottom: 2px solid #b87333; padding-bottom: 5px;">Event Details</h3>
                    <table>
                        <tr>
                            <td class="field-label">Preferred Location:</td>
                            <td>{form_data.get('location', 'Not specified')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Preferred Date:</td>
                            <td>{form_data.get('preferredDate', 'Not specified')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Organization Type:</td>
                            <td>{form_data.get('orgType', 'Not specified')}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="details">
                    <h3 style="color: #b87333; border-bottom: 2px solid #b87333; padding-bottom: 5px;">Organization Information</h3>
                    <table>
                        <tr>
                            <td class="field-label">Organization Name:</td>
                            <td>{form_data.get('organizationName', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Organization Type:</td>
                            <td>{form_data.get('orgType', 'Not specified')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Tax ID Number:</td>
                            <td>{form_data.get('taxId', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Terms Agreed:</td>
                            <td>{'✅ Yes' if form_data.get('termsAgreed') else '❌ No'}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="details">
                    <h3 style="color: #b87333; border-bottom: 2px solid #b87333; padding-bottom: 5px;">Contact Information</h3>
                    <table>
                        <tr>
                            <td class="field-label">Contact Name:</td>
                            <td>{form_data.get('contactName', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Email Address:</td>
                            <td><a href="mailto:{form_data.get('email', '')}">{form_data.get('email', 'Not provided')}</a></td>
                        </tr>
                        <tr>
                            <td class="field-label">Phone Number:</td>
                            <td><a href="tel:{form_data.get('phone', '')}">{form_data.get('phone', 'Not provided')}</a></td>
                        </tr>
                    </table>
                </div>
                
                <div class="details">
                    <h3 style="color: #b87333; border-bottom: 2px solid #b87333; padding-bottom: 5px;">Additional Information</h3>
                    <div class="field-group">
                        <span class="label">Organization Description & Fundraising Goals:</span>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; white-space: pre-wrap;">{form_data.get('description', 'No additional information provided')}</div>
                    </div>
                </div>
                
                <hr style="margin: 20px 0; border: 1px solid #ddd;">
                <p style="text-align: center; font-weight: bold; color: #b87333;">
                    📞 Please contact {form_data.get('contactName', 'the requester')} at {form_data.get('phone', form_data.get('email', ''))} to confirm this fundraising event.
                </p>
            </div>
            <div class="footer">
                <p>Form ID: {form_id}</p>
                <p>© {datetime.now().year} {website_name}</p>
                <p><a href="{website_url}">{website_url}</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    NEW FUNDRAISING REQUEST - ACTION REQUIRED
    ========================================
    
    Submission Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    Form ID: {form_id}
    
    ⚠️  URGENT: Please respond within 48 hours to confirm availability for the requested date.
    
    EVENT DETAILS:
    -------------
    Preferred Location: {form_data.get('location', 'Not specified')}
    Preferred Date: {form_data.get('preferredDate', 'Not specified')}
    Organization Type: {form_data.get('orgType', 'Not specified')}
    
    ORGANIZATION INFORMATION:
    ------------------------
    Organization Name: {form_data.get('organizationName', 'Not provided')}
    Organization Type: {form_data.get('orgType', 'Not specified')}
    Tax ID Number: {form_data.get('taxId', 'Not provided')}
    Terms Agreed: {'Yes' if form_data.get('termsAgreed') else 'No'}
    
    CONTACT INFORMATION:
    -------------------
    Contact Name: {form_data.get('contactName', 'Not provided')}
    Email Address: {form_data.get('email', 'Not provided')}
    Phone Number: {form_data.get('phone', 'Not provided')}
    
    ADDITIONAL INFORMATION:
    ----------------------
    Organization Description & Fundraising Goals:
    {form_data.get('description', 'No additional information provided')}
    
    ========================================
    NEXT STEPS: Please contact {form_data.get('contactName', 'the requester')} at {form_data.get('phone', form_data.get('email', ''))} to confirm this fundraising event.
    
    © {datetime.now().year} {website_name}
    {website_url}
    """
    
    return subject, body_html, body_text

def get_fundraising_confirmation_template(form_data, website_name, website_url):
    """Generate confirmation email template for fundraising form submissions"""
    
    subject = f"Thank you for your fundraising request - {website_name}"
    
    # Get organization type display name
    org_type_display = {
        'school': 'K-12 School',
        'pta': 'PTA/PTO',
        'college': 'College/University Group',
        'sports': 'Youth Sports Team',
        'nonprofit': 'Non-Profit Organization'
    }.get(form_data.get('orgType', ''), form_data.get('orgType', 'Organization'))
    
    body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #b87333; color: white; padding: 15px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #eaeaea; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #666; text-align: center; }}
            .steps {{ background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }}
            .steps h3 {{ color: #b87333; margin-top: 0; }}
            .steps ol {{ padding-left: 20px; }}
            .steps li {{ margin-bottom: 10px; }}
            .highlight {{ background-color: #ecf7ed; padding: 15px; border-left: 4px solid #28a745; margin: 15px 0; }}
            .info-box {{ background-color: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }}
            table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
            td {{ padding: 8px; border-bottom: 1px solid #eee; }}
            .field-label {{ font-weight: bold; width: 40%; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Your Fundraising Request Has Been Received</h2>
            </div>
            <div class="content">
                <p>Dear {form_data.get('contactName', 'Fundraising Coordinator')},</p>
                
                <p>Thank you for submitting a fundraising request on behalf of <strong>{form_data.get('organizationName', 'your organization')}</strong>!</p>
                
                <div class="highlight">
                    <h3 style="margin-top: 0;">📋 Your Request Summary</h3>
                    <table>
                        <tr>
                            <td class="field-label">Organization:</td>
                            <td>{form_data.get('organizationName', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Organization Type:</td>
                            <td>{org_type_display}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Preferred Location:</td>
                            <td>{form_data.get('location', 'Not specified')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Preferred Date:</td>
                            <td>{form_data.get('preferredDate', 'Not specified')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Contact Person:</td>
                            <td>{form_data.get('contactName', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Contact Email:</td>
                            <td>{form_data.get('email', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Contact Phone:</td>
                            <td>{form_data.get('phone', 'Not provided')}</td>
                        </tr>
                        {f'<tr><td class="field-label">Tax ID:</td><td>{form_data.get("taxId", "Not provided")}</td></tr>' if form_data.get('taxId') else ''}
                    </table>
                </div>
                
                <div class="info-box">
                    <h3 style="margin-top: 0;">💰 About Our Fundraising Program</h3>
                    <p>Nash & Smashed is proud to support local organizations through our fundraising program, which offers:</p>
                    <ul>
                        <li><strong>20% giveback</strong> on all qualifying sales during your event</li>
                        <li>Free promotional materials to help spread the word</li>
                        <li>Easy online ordering for supporters who can't attend in person</li>
                        <li>Direct donation check mailed to your organization</li>
                    </ul>
                </div>
                
                <div class="steps">
                    <h3>🚀 Next Steps</h3>
                    <ol>
                        <li><strong>Review Period:</strong> Our team will review your application within 3-5 business days.</li>
                        <li><strong>Confirmation Call:</strong> Once approved, we'll contact you at {form_data.get('phone', 'your provided number')} to confirm the date and details.</li>
                        <li><strong>Promotional Materials:</strong> We'll provide you with digital and physical materials to promote your fundraiser.</li>
                        <li><strong>Event Day:</strong> Host your fundraiser at our {form_data.get('location', 'selected location')}!</li>
                        <li><strong>Donation:</strong> Approximately 3-4 weeks after your event, you'll receive a donation check based on sales.</li>
                    </ol>
                </div>
                
                {f'<div class="info-box"><h4>Your Additional Information:</h4><p style="white-space: pre-wrap;">{form_data.get("description", "")}</p></div>' if form_data.get('description') else ''}
                
                <hr style="margin: 20px 0;">
                
                <p><strong>Questions?</strong> If you have any questions about your fundraising application, please contact us:</p>
                <ul>
                    <li>📧 Email: <a href="mailto:fundraising@nashandsmashed.com">fundraising@nashandsmashed.com</a></li>
                    <li>📞 Phone: Contact your local Nash & Smashed location</li>
                </ul>
                
                <p>Thank you for choosing Nash & Smashed for your fundraising needs. We're excited to help you reach your goals!</p>
                
                <p>Best regards,<br>
                <strong>The Nash & Smashed Fundraising Team</strong><br>
                {website_name}</p>
            </div>
            <div class="footer">
                <p>© {datetime.now().year} {website_name}</p>
                <p><a href="{website_url}">{website_url}</a></p>
                <p>Keep this email for your records</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    body_text = f"""
    YOUR FUNDRAISING REQUEST HAS BEEN RECEIVED
    ==========================================
    
    Dear {form_data.get('contactName', 'Fundraising Coordinator')},
    
    Thank you for submitting a fundraising request on behalf of {form_data.get('organizationName', 'your organization')}!
    
    YOUR REQUEST SUMMARY:
    --------------------
    Organization: {form_data.get('organizationName', 'Not provided')}
    Organization Type: {org_type_display}
    Preferred Location: {form_data.get('location', 'Not specified')}
    Preferred Date: {form_data.get('preferredDate', 'Not specified')}
    Contact Person: {form_data.get('contactName', 'Not provided')}
    Contact Email: {form_data.get('email', 'Not provided')}
    Contact Phone: {form_data.get('phone', 'Not provided')}
    {f'Tax ID: {form_data.get("taxId", "Not provided")}' if form_data.get('taxId') else ''}
    
    ABOUT OUR FUNDRAISING PROGRAM:
    -----------------------------
    Nash & Smashed is proud to support local organizations through our fundraising program, which offers:
    • 20% giveback on all qualifying sales during your event
    • Free promotional materials to help spread the word
    • Easy online ordering for supporters who can't attend in person
    • Direct donation check mailed to your organization
    
    NEXT STEPS:
    ----------
    1. Review Period: Our team will review your application within 3-5 business days.
    2. Confirmation Call: Once approved, we'll contact you at {form_data.get('phone', 'your provided number')} to confirm the date and details.
    3. Promotional Materials: We'll provide you with digital and physical materials to promote your fundraiser.
    4. Event Day: Host your fundraiser at our {form_data.get('location', 'selected location')}!
    5. Donation: Approximately 3-4 weeks after your event, you'll receive a donation check based on sales.
    
    {f'YOUR ADDITIONAL INFORMATION:\n{form_data.get("description", "")}\n' if form_data.get('description') else ''}
    QUESTIONS?
    ----------
    If you have any questions about your fundraising application, please contact us:
    • Email: fundraising@nashandsmashed.com
    • Phone: Contact your local Nash & Smashed location
    
    Thank you for choosing Nash & Smashed for your fundraising needs. We're excited to help you reach your goals!
    
    Best regards,
    The Nash & Smashed Fundraising Team
    {website_name}
    
    © {datetime.now().year} {website_name}
    {website_url}
    
    Keep this email for your records
    """
    
    return subject, body_html, body_text
def get_subscriber_confirmation_template(form_data, website_name, website_url):
    """Generate an engaging confirmation email for Nash & Smashed subscribers"""
    
    # Get first name if provided, otherwise use friendly greeting
    first_name = form_data.get('firstName') or ''
    first_name = first_name.strip() if first_name else ''
    greeting = f"Hi {first_name}!" if first_name else "Hello there!"
    
    subject = f"🔥 Welcome to the {website_name} family!"
    
    body = f"""{greeting}

🎉 You're officially part of the {website_name} community! Get ready for some seriously delicious updates.

Here's what you can expect:
🌶️ Exclusive deals and early access to promotions
📅 Special event invitations and pop-up announcements  
🍗 New menu items and seasonal specials
💡 Insider tips for the ultimate hot chicken experience

Ready to satisfy that craving? Find your nearest location and order online:
{website_url}

Follow us for daily hot chicken inspiration:
📸 Instagram: @nashandsmashed_

Ready to experience Nashville's hottest flavors? Visit us today!

Stay spicy,
The {website_name} Team

"""
    
    return subject, body
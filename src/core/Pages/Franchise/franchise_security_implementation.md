# Nash & Smashed Franchise Form Security Implementation

## Overview
This guide implements comprehensive security features for the franchise form, following the same successful pattern as the career form. All security features include rate limiting, spam detection, input sanitization, and honeypot protection.

## 🔧 Backend Lambda Implementation

### Files to Update/Create:

#### 1. **rate_limiting.py** ✅ 
- **Purpose:** IP-based rate limiting using DynamoDB
- **Features:** 5 submissions/hour, 10 submissions/day per IP
- **Table:** Uses existing `career-form-rate-limits` table
- **Location:** Lambda function root directory

#### 2. **validation.py** ✅ (Enhanced)
- **Purpose:** Form validation with spam detection and input sanitization
- **New Features:** 
  - Honeypot field validation
  - Spam keyword detection
  - Suspicious email domain blocking
  - Input sanitization (HTML/script removal)
  - Business experience length validation (min 10 chars)

#### 3. **lambda_function.py** ✅ (Enhanced)
- **Purpose:** Main handler with integrated security
- **New Features:**
  - Rate limiting check before processing
  - IP address extraction and logging
  - Spam detection and flagging
  - 429 rate limit responses
  - Enhanced error handling

#### 4. **requirements.txt** ✅
- **Purpose:** Lambda dependencies
- **Contents:** boto3==1.34.0, botocore==1.34.0

#### 5. **Existing files remain the same:**
- `email_services.py` ✅ (No changes needed)
- `email_templates.py` ✅ (No changes needed)
- `storage.py` ✅ (No changes needed)
- `utils.py` ✅ (No changes needed)

## 🎨 Frontend React Implementation

### Files to Update:

#### 1. **form.actions.ts** ✅ (Enhanced)
- **New Features:**
  - Honeypot field in interface
  - Client-side honeypot validation
  - 429 rate limit error handling
  - Enhanced error response types
  - Retry-after header processing

#### 2. **FranchiseForm.tsx** ✅ (Enhanced)
- **New Features:**
  - Hidden honeypot field (`website`)
  - Rate limit notification handling
  - Enhanced error states
  - Honeypot field in form state
  - Improved user feedback

## 🚀 AWS Infrastructure Setup

### Environment Variables (Lambda):
```bash
# Rate Limiting
RATE_LIMIT_TABLE=nash-and-smashed-form-rate-limits
MAX_SUBMISSIONS_PER_HOUR=5
MAX_SUBMISSIONS_PER_DAY=10

# Email Configuration
SENDER_EMAIL=franchise@nashandsmashed.com
RECIPIENT_EMAIL=info@nashandsmashed.com

# Application Settings
WEBSITE_NAME=Nash & Smashed
WEBSITE_URL=https://nashandsmashed.com
FRANCHISE_TABLE=nash-and-smashed-franchise-form-table
LOG_LEVEL=INFO
```

### Lambda Configuration:
- **Memory:** 256MB (increased from 128MB)
- **Timeout:** 30 seconds (increased from 15 seconds)
- **Reserved Concurrency:** 10
- **Runtime:** Python 3.9+

### DynamoDB Tables:

#### Rate Limiting Table (Shared):
- **Table Name:** `nash-and-smashed-form-rate-limits`
- **Partition Key:** `rate_limit_key` (String)
- **TTL Attribute:** `expires_at` (Number)
- **Status:** ✅ Already exists (shared with career form)

#### Franchise Form Table:
- **Table Name:** `nash-and-smashed-franchise-form-table`
- **Partition Key:** `formID` (String)
- **Sort Key:** `timestamp` (Number)
- **Status:** Should already exist

## 🔒 Security Features Implemented

### ✅ **Rate Limiting**
- **Hourly Limit:** 5 submissions per IP
- **Daily Limit:** 10 submissions per IP
- **Response:** 429 status with retry-after header
- **Storage:** DynamoDB with TTL for automatic cleanup

### ✅ **Spam Detection**
- **Keywords:** Bitcoin, cryptocurrency, make money fast, etc.
- **Domains:** Temporary email providers (10minutemail, etc.)
- **Patterns:** Excessive URLs, repetitive characters
- **Action:** Flag for review, don't block submission

### ✅ **Input Sanitization**
- **HTML/Script Removal:** Strips all HTML tags and JavaScript
- **Whitespace Normalization:** Removes excessive whitespace
- **Applied to:** All text fields before validation

### ✅ **Honeypot Protection**
- **Field Name:** `website` (hidden from users)
- **Validation:** Frontend and backend check
- **Action:** Block submission if filled

### ✅ **Enhanced Email Validation**
- **Format Check:** Standard email regex
- **Domain Blocking:** Suspicious temporary email domains
- **Required Field:** Cannot be empty

### ✅ **Business Experience Validation**
- **Minimum Length:** 10 characters
- **Purpose:** Ensure meaningful responses
- **Required Field:** Cannot be empty

## 📊 Monitoring & Logging

### CloudWatch Logs:
- Rate limit violations
- Spam detection flags
- Form submission success/failure
- IP address tracking

### Spam Indicators Logged:
- Suspicious keywords found
- Temporary email domains
- Excessive URLs in business experience
- Repetitive character patterns

## 🧪 Testing Checklist

### ✅ **Normal Functionality:**
- [ ] Submit valid franchise inquiry (should work)
- [ ] Receive confirmation email
- [ ] Verify admin notification email
- [ ] Check DynamoDB record creation

### ✅ **Rate Limiting:**
- [ ] Submit 6+ forms quickly (should block after 5)
- [ ] Verify 429 response with retry-after header
- [ ] Check user-friendly rate limit message
- [ ] Verify DynamoDB rate limit entries

### ✅ **Spam Detection:**
- [ ] Include "bitcoin" in business experience (should flag)
- [ ] Use temporary email (10minutemail.com)
- [ ] Add multiple URLs to business experience
- [ ] Check CloudWatch logs for spam indicators

### ✅ **Honeypot Protection:**
- [ ] Fill hidden website field (should block)
- [ ] Verify "Invalid submission detected" message
- [ ] Ensure legitimate users can't see field

### ✅ **Input Sanitization:**
- [ ] Try HTML tags in form fields (should be stripped)
- [ ] Test JavaScript injection attempts
- [ ] Verify data is cleaned in DynamoDB

## 🚀 Deployment Steps

### 1. **Backend Deployment:**
```bash
# Copy files to Lambda function
- rate_limiting.py (new)
- validation.py (enhanced)
- lambda_function.py (enhanced)
- requirements.txt (updated)

# Update Lambda configuration
- Environment variables
- Memory: 256MB
- Timeout: 30 seconds
- Reserved concurrency: 10
```

### 2. **Frontend Deployment:**
```bash
# Update React files
- form.actions.ts (enhanced)
- FranchiseForm.tsx (enhanced)

# Deploy to website
```

### 3. **Infrastructure Verification:**
```bash
# Verify DynamoDB tables exist
- career-form-rate-limits (shared)
- nash-and-smashed-franchise-form-table

# Verify SES configuration
- Sender email verified
- DKIM enabled
```

## 📈 Expected Results

### **Security Improvements:**
- **99% spam reduction** through multi-layer detection
- **Bot protection** via honeypot field
- **Rate limit protection** against abuse
- **Input sanitization** prevents XSS/injection

### **User Experience:**
- **Seamless submission** for legitimate users
- **Clear error messages** for issues
- **Rate limit warnings** with retry guidance
- **Fast response times** with optimized Lambda

### **Monitoring Benefits:**
- **Spam flagging** for manual review
- **Rate limit tracking** for abuse detection
- **Comprehensive logging** for debugging
- **Automated cleanup** via DynamoDB TTL

## 🔄 Maintenance

### **Weekly Reviews:**
- Check CloudWatch logs for spam patterns
- Review flagged submissions in DynamoDB
- Monitor rate limit hit frequency
- Analyze email delivery success rates

### **Monthly Updates:**
- Update spam keyword lists if needed
- Review and add suspicious email domains
- Optimize rate limit thresholds based on usage
- Clean up old rate limit data (automatic via TTL)

## ✅ Completion Status

### **Franchise Form Security: READY FOR IMPLEMENTATION**

- ✅ **Rate Limiting Module:** Complete
- ✅ **Enhanced Validation:** Complete with spam detection
- ✅ **Lambda Function:** Enhanced with security features
- ✅ **Frontend Updates:** Honeypot and error handling added
- ✅ **Infrastructure:** Uses existing shared resources
- ✅ **Testing Plan:** Comprehensive checklist provided
- ✅ **Documentation:** Complete implementation guide

### **Next Priority: Contact Form Implementation**
Following the same security pattern established here and in the career form.

---

*This implementation brings the franchise form security to the same enterprise-level standard as the completed career form, ensuring consistent protection across all Nash & Smashed contact forms.*
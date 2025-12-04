# Contact Form Setup Guide

Your contact form currently shows an alert but doesn't send emails. Here are your options to make it functional:

## Option 1: EmailJS (Recommended) ⭐

**Free Tier**: 200 emails/month

### Quick Setup:

1. **Create EmailJS Account**:
   - Go to https://www.emailjs.com/
   - Sign up for free
   - Verify your email

2. **Set Up Email Service**:
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: New Contact Form Message from Portfolio
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```

4. **Get Your Keys**:
   - Go to "Account" → "General"
   - Copy your Public Key (User ID)
   - Copy Service ID from your email service
   - Copy Template ID from your email template

5. **Update the Code**:
   - Add EmailJS script to `index.html`:
     ```html
     <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
     ```
   - Update `js/script.js` with your keys (see commented code in the file)

---

## Option 2: Formspree

**Free Tier**: 50 submissions/month

### Quick Setup:

1. **Create Formspree Account**:
   - Go to https://formspree.io/
   - Sign up for free

2. **Create a Form**:
   - Get your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update HTML**:
   - Change form action in `index.html`:
     ```html
     <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - Remove the JavaScript form handler (or keep for validation)

---

## Option 3: Direct Email Link

Simple but less professional. Just replace the form with:

```html
<p>Reach out to me at: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
```

---

## Which Should You Choose?

- **EmailJS**: Best for full control, custom emails, free tier is generous
- **Formspree**: Easiest setup, minimal code changes
- **Email Link**: Quick solution but not as professional

**Recommendation**: Use EmailJS - it's free, reliable, and gives you the most control.


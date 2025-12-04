# 📧 EmailJS Setup - Exact Locations

## Step-by-Step Instructions

### STEP 1: Add EmailJS Script to `index.html`

**Location**: Open `index.html`, find line 154-155, and **UNCOMMENT** this line:

**FIND THIS:**
```html
    <!-- JavaScript -->
    <script src="js/script.js"></script>
    <!-- EmailJS - Add this line after you sign up at emailjs.com -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script> -->
</body>
```

**CHANGE TO THIS** (remove the `<!--` and `-->`):
```html
    <!-- JavaScript -->
    <script src="js/script.js"></script>
    <!-- EmailJS Script -->
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
</body>
```

---

### STEP 2: Replace Code in `js/script.js`

**Location**: Open `js/script.js`, find around **line 341-373**

**FIND THIS BLOCK:**
```javascript
                /*
                emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
                
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message
                };

                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                    .then(function(response) {
                        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                        contactForm.reset();
                    }, function(error) {
                        alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
                        console.error('EmailJS error:', error);
                    });
                */

                // Temporary: Show success message (replace with EmailJS or Formspree above)
                alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);

                // Reset form
                this.reset();
```

**REPLACE WITH THIS** (remove `/*` and `*/`, add your actual keys, remove the temporary alert):

```javascript
                // Initialize EmailJS with your Public Key
                emailjs.init("YOUR_PUBLIC_KEY_HERE"); // ⬅️ REPLACE with your actual Public Key from EmailJS
                
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message
                };

                emailjs.send("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", templateParams) // ⬅️ REPLACE both IDs
                    .then(function(response) {
                        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                        contactForm.reset();
                    }, function(error) {
                        alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
                        console.error('EmailJS error:', error);
                    });
```

**IMPORTANT**: Replace these 3 values with your actual EmailJS keys:
- `"YOUR_PUBLIC_KEY_HERE"` → Your Public Key from EmailJS Account → General
- `"YOUR_SERVICE_ID_HERE"` → Your Service ID from EmailJS Email Services
- `"YOUR_TEMPLATE_ID_HERE"` → Your Template ID from EmailJS Email Templates

---

## Quick Checklist:

- [ ] Signed up at https://www.emailjs.com/
- [ ] Created an Email Service (Gmail, Outlook, etc.)
- [ ] Created an Email Template
- [ ] Got your 3 keys (Public Key, Service ID, Template ID)
- [ ] Added EmailJS script to `index.html` (uncommented line 155)
- [ ] Replaced the code in `js/script.js` with your actual keys
- [ ] Tested the form!

---

## Need Help Getting Your Keys?

1. **Public Key**: EmailJS Dashboard → Account → General → "Public Key"
2. **Service ID**: EmailJS Dashboard → Email Services → Your service → "Service ID"
3. **Template ID**: EmailJS Dashboard → Email Templates → Your template → "Template ID"


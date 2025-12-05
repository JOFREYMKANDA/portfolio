# Complete Guide: Hosting Your Portfolio on GitHub Pages + Custom Domain

## Part 1: GitHub Pages Setup (FREE)

### Step 1: Prepare Your Repository

1. **Ensure your code is ready:**
   - Your portfolio is already well-structured with `index.html` at the root
   - All assets (CSS, JS, images) are properly linked
   - Test locally to ensure everything works

2. **Check your `.gitignore`:**
   - Make sure you're not ignoring important files
   - Your current `.gitignore` looks good for GitHub Pages

### Step 2: Push to GitHub

1. **If you haven't already, initialize git and push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   ```

2. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click the "+" icon → "New repository"
   - Name it: `portfolio` (or `username.github.io` for a user site)
   - Choose **Public** (required for free GitHub Pages)
   - **Don't** initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

**Option A: User/Organization Site (username.github.io)**
- If your repo is named `YOUR_USERNAME.github.io`, it will automatically be available at:
  `https://YOUR_USERNAME.github.io`
- Just push to the `main` branch and it works!

**Option B: Project Site (portfolio)**
- Go to your repository on GitHub
- Click **Settings** (top menu)
- Scroll to **Pages** (left sidebar)
- Under **Source**, select:
  - Branch: `main`
  - Folder: `/ (root)`
- Click **Save**
- Your site will be available at: `https://YOUR_USERNAME.github.io/portfolio`

**Note:** For a cleaner URL, consider renaming your repo to `YOUR_USERNAME.github.io` to get the root domain.

### Step 4: Wait for Deployment

- GitHub Pages typically deploys in 1-2 minutes
- You'll see a green checkmark on your repository when it's live
- Visit your site URL to verify it's working

### Step 5: Custom Domain Setup (After buying domain)

Once you have a domain, follow these steps:

1. **Add a `CNAME` file to your repository:**
   - Create a file named `CNAME` (no extension) in the root directory
   - Add your domain name inside (e.g., `jofreymkanda.com`)
   - Commit and push:
     ```bash
     echo "yourdomain.com" > CNAME
     git add CNAME
     git commit -m "Add custom domain"
     git push
     ```

2. **Configure DNS at your domain registrar:**
   - Add these DNS records:
     - **Type:** `A` records
     - **Name:** `@` (or root domain)
     - **Value:** 
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **Type:** `CNAME` record
     - **Name:** `www`
     - **Value:** `YOUR_USERNAME.github.io.` (note the trailing dot)

3. **Enable HTTPS in GitHub:**
   - Go to repository Settings → Pages
   - Check "Enforce HTTPS" (may take a few hours to become available)

---

## Part 2: Domain Recommendations (Cheap & Reliable)

### 🏆 Top Recommendations (Best Value)

#### 1. **Namecheap** ⭐ RECOMMENDED
- **Price:** ~$8-12/year for .com domains
- **Why:** Best balance of price, features, and customer service
- **Pros:**
  - Free WHOIS privacy protection (first year, then ~$3/year)
  - Easy DNS management
  - Good customer support
  - No hidden fees
- **Best for:** Most users
- **Link:** [namecheap.com](https://www.namecheap.com)

#### 2. **Cloudflare Registrar**
- **Price:** At-cost pricing (~$8-10/year for .com)
- **Why:** Cheapest option, no markup
- **Pros:**
  - No profit markup (they charge what they pay)
  - Free WHOIS privacy
  - Excellent DNS service included
  - Very reliable
- **Cons:**
  - Less beginner-friendly interface
- **Best for:** Tech-savvy users who want the absolute cheapest
- **Link:** [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar)

#### 3. **Google Domains** (Now Squarespace Domains)
- **Price:** ~$12/year for .com
- **Why:** Simple, reliable, Google-backed
- **Pros:**
  - Very simple interface
  - Good integration with other services
  - Reliable DNS
- **Cons:**
  - Slightly more expensive
- **Link:** [domains.google](https://domains.google)

#### 4. **Porkbun**
- **Price:** ~$8-10/year for .com
- **Why:** Great prices, modern interface
- **Pros:**
  - Competitive pricing
  - Free WHOIS privacy
  - Good renewal prices (not just first year)
  - Modern, clean interface
- **Best for:** Users who want good long-term pricing
- **Link:** [porkbun.com](https://porkbun.com)

### 💰 Budget Options (Even Cheaper)

#### 5. **NameSilo**
- **Price:** ~$8-9/year for .com
- **Why:** Very cheap, includes privacy
- **Pros:**
  - Free WHOIS privacy forever
  - Low prices
- **Cons:**
  - Older interface
- **Link:** [namesilo.com](https://www.namesilo.com)

#### 6. **Hover**
- **Price:** ~$13-15/year for .com
- **Why:** Simple, no upselling
- **Pros:**
  - Clean interface
  - No aggressive upselling
  - Good customer service
- **Cons:**
  - More expensive than others
- **Link:** [hover.com](https://www.hover.com)

### ⚠️ Avoid These (Common Pitfalls)

- **GoDaddy:** Expensive renewals, aggressive upselling
- **Network Solutions:** Very expensive
- **Domain.com:** High renewal fees

### 📋 Domain Extension Recommendations

- **.com** - Most professional, ~$8-12/year
- **.dev** - For developers, ~$12-15/year
- **.io** - Tech/startup vibe, ~$30-40/year (more expensive)
- **.me** - Personal branding, ~$10-15/year
- **.net** - Alternative to .com, ~$10-12/year

### 🎯 My Top Pick for You

**Go with Namecheap** - Best overall value:
- Good prices
- Free privacy protection
- Easy to use
- Reliable
- Good customer support

**Alternative:** If you want the absolute cheapest and don't mind a slightly more technical setup, **Cloudflare Registrar** is unbeatable.

---

## Part 3: Complete Setup Checklist

### Before Buying Domain:
- [ ] Your portfolio is pushed to GitHub
- [ ] GitHub Pages is enabled and working
- [ ] You've tested your site at `username.github.io`

### After Buying Domain:
- [ ] Add `CNAME` file to your repository
- [ ] Configure DNS records (A records + CNAME)
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Enable HTTPS in GitHub Pages settings
- [ ] Test your custom domain
- [ ] Update any hardcoded URLs in your code if needed

---

## Part 4: Quick DNS Configuration Reference

Once you buy your domain, here's exactly what to add:

### A Records (for root domain):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### CNAME Record (for www subdomain):
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io.
TTL: 3600
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Troubleshooting

### Site not loading?
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify CNAME file is in your repo
- Check GitHub Pages settings
- Wait 24-48 hours for DNS changes

### HTTPS not working?
- Wait a few hours after adding domain
- Check "Enforce HTTPS" is enabled in GitHub Pages settings
- Clear browser cache

### Need help?
- GitHub Pages docs: [docs.github.com/pages](https://docs.github.com/pages)
- GitHub Community: [github.community](https://github.community)

---

## Estimated Total Cost

- **GitHub Pages:** FREE
- **Domain (.com):** $8-12/year
- **Total:** ~$8-12/year (just the domain!)

That's it! You'll have a professional portfolio with a custom domain for less than $1/month.


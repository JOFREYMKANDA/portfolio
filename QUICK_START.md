# Quick Start: Get Your Portfolio Live in 5 Minutes

## ✅ Current Status
- ✅ Repository exists: `https://github.com/JOFREYMKANDA/portfolio.git`
- ✅ Code is pushed to GitHub
- ⏳ GitHub Pages needs to be enabled
- ⏳ Custom domain (optional, after purchase)

---

## 🚀 Step 1: Enable GitHub Pages (2 minutes)

1. **Go to your repository:**
   - Visit: https://github.com/JOFREYMKANDA/portfolio

2. **Enable Pages:**
   - Click **Settings** (top menu)
   - Click **Pages** (left sidebar)
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait 1-2 minutes**, then visit:
   - `https://jofreymkanda.github.io/portfolio`

**That's it! Your site is now live!** 🎉

---

## 🌐 Step 2: Get a Custom Domain (Optional)

### Recommended: Namecheap
1. Visit: https://www.namecheap.com
2. Search for your desired domain (e.g., `jofreymkanda.com`)
3. Add to cart and checkout (~$8-12/year)
4. After purchase, follow the DNS setup in `GITHUB_PAGES_SETUP.md`

### Alternative: Cloudflare (Cheapest)
1. Visit: https://www.cloudflare.com/products/registrar
2. Search and register (~$8-10/year)
3. Follow DNS setup guide

---

## 📝 Step 3: Connect Custom Domain (After Purchase)

1. **Create CNAME file:**
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS at your registrar:**
   - Add 4 A records pointing to GitHub IPs (see full guide)
   - Add 1 CNAME record for www subdomain

3. **Enable HTTPS in GitHub:**
   - Settings → Pages → Check "Enforce HTTPS"

---

## 🎯 Your Current URLs

- **GitHub Repository:** https://github.com/JOFREYMKANDA/portfolio
- **GitHub Pages (after enabling):** https://jofreymkanda.github.io/portfolio

**Note:** If you want a cleaner URL (`jofreymkanda.github.io`), you can:
1. Create a new repository named `JOFREYMKANDA.github.io`
2. Push your code there
3. It will automatically be available at the root URL

---

## 📚 Full Documentation

See `GITHUB_PAGES_SETUP.md` for complete details, troubleshooting, and domain recommendations.


# 🚀 Quick Deploy to darkholds.me

## Step 1: GitHub Upload (5 minutes)
1. Go to https://github.com and create account/login
2. Click **"New repository"** 
3. Name: **"darkholds-website"** (public)
4. Upload all your website files by dragging them
5. Click **"Commit changes"**

## Step 2: Enable GitHub Pages (2 minutes)
1. Go to repository **Settings > Pages**
2. Source: **"Deploy from a branch"** 
3. Branch: **"main"** / Folder: **"/ (root)"**
4. Click **"Save"**

## Step 3: Add Custom Domain (3 minutes)
1. In **Settings > Pages**, add custom domain: **darkholds.me**
2. Check **"Enforce HTTPS"**
3. Click **"Save"**

## Step 4: Configure DNS (10 minutes)
**At your domain registrar (where you bought darkholds.me):**

**Add A Records:**
```
Type: A
Name: @ 
Values: 
185.199.108.153
185.199.109.153  
185.199.110.153
185.199.111.153
```

**Add CNAME Record:**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

## Step 5: Wait & Test (30 minutes)
1. Wait 30 minutes for DNS propagation
2. Visit https://darkholds.me
3. Your website should be live! 🎉

---

**Need help?** The DNS setup varies by registrar:
- **Namecheap**: Domain List > Manage > Advanced DNS
- **GoDaddy**: My Products > DNS > Records  
- **Cloudflare**: DNS > Records

**Your site will be live at:** https://darkholds.me

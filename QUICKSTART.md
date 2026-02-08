# 🚀 Quick Start Guide

Get your Substack articles live on your own domain in **5 minutes**.

---

## ✅ Step 1: Try the Demo (2 minutes)
```bash
# Clone & Install
git clone https://github.com/nikbearbrown/Substack-to-React-Converter.git
cd Substack-to-React-Converter
npm install

# Run Development Server
npm run dev

# Open Browser
# Visit: http://localhost:3000/substack
```

**You should see 2 dummy articles.** Browse them, check the styling, test the links.

**Like what you see?** Continue to Step 2.

---

## ✅ Step 2: Add Your Content (3 minutes)

### Export from Substack

1. Open [Substack Settings](https://substack.com/settings)
2. Click **Import/Export** in sidebar
3. Scroll to "**Exports**" section
4. Click **"New export"**
5. Wait for email (usually 2-5 minutes)
6. Download the ZIP file

### Convert to MDX
```bash
# From project root
python3 convert_substack.py ~/Downloads/your-export.zip
```

**Expected output:**
```
📦 Extracting your-export.zip...
📝 Found 15 posts
✅ [1/15] Converted: Your Article Title
✅ [2/15] Converted: Another Article
...
✨ Conversion complete!
📄 15 MDX files created
```

### Check It Works

Development server should auto-reload. Visit:
```
http://localhost:3000/substack
```

See your articles? **You're done!** 🎉

---

## ✅ Step 3: Deploy to Vercel (1 minute)

### Option A: One-Click Deploy

1. Click: [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nikbearbrown/Substack-to-React-Converter)
2. Connect your GitHub account
3. Click "Deploy"
4. **Done!** Your site is live.

### Option B: Git Integration
```bash
# 1. Push to GitHub
git add .
git commit -m "Add my Substack articles"
git push origin main

# 2. Import to Vercel
# Visit: https://vercel.com/new
# Click "Import Git Repository"
# Select your repo
# Click "Deploy"
```

**Your site will be live at:** `https://your-project.vercel.app`

---

## 🔥 Hot Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check for code issues
npm run type-check   # TypeScript validation
```

### Vercel CLI
```bash
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel logs          # View deployment logs
vercel env pull      # Download environment variables
vercel dev           # Run Vercel dev environment locally
```

### Content Updates
```bash
# After getting new Substack export
python3 convert_substack.py ~/Downloads/new-export.zip

# Push changes
git add app/_content/substack
git commit -m "Update articles"
git push

# Vercel auto-deploys! ✨
```

---

## 🐛 Common Issues & Fixes

### Issue: Articles not showing up

**Fix:**
```bash
# 1. Check files were created
ls app/_content/substack/*.mdx

# 2. Check metadata.json exists
cat app/_content/substack/metadata.json

# 3. Restart dev server
# Press Ctrl+C to stop
npm run dev
```

### Issue: `Module not found: gray-matter`

**Fix:**
```bash
npm install gray-matter next-mdx-remote
```

### Issue: Vercel build fails

**Fix:**
```bash
# Test build locally first
npm run build

# Check for errors
# Fix any TypeScript/build errors
# Then redeploy
vercel --prod
```

---

## 🎯 What's Next?

### Grow Your Audience
- [ ] Submit sitemap to Google Search Console
- [ ] Share articles on social media (working previews!)
- [ ] Keep writing on Substack (emails still go out)
- [ ] Re-run conversion script when you publish new posts

---

**Ready to make your content discoverable?** Start with Step 1! ⬆️

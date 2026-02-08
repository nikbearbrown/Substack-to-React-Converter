# 🚀 Substack Integration for Next.js

**Make your Substack articles discoverable without leaving Substack.**

This Next.js integration solves three critical problems every Substack writer faces: Google can't find your articles, social media blocks your links, and platform discovery doesn't work. Keep writing on Substack, but make your content visible on your own domain too.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nikbearbrown/Substack-to-React-Converter)

---

## 🎯 Why Use This?

### The Three Substack Problems This Solves

#### 1. **Google Can't Find You** 🔍
Substack deliberately prevents new newsletters from being indexed on Google. They've removed sitemaps for smaller sites, which means it can take **many months** before Google's crawlers even discover your newsletter exists.

**Result:** Zero organic search traffic. Your articles don't appear when people search for topics you write about.

#### 2. **Social Media Thinks Your Links Are Spam** 🚫
Twitter/X actively censors Substack links—they don't show preview cards and reduce visibility for posts containing Substack URLs. Even on other platforms, preview cards often fail to load properly.

**Result:** Your shared links look broken or unprofessional, and people scroll past.

#### 3. **Platform Discovery Is Theoretical** 📉
Substack's discovery features only show paid newsletters. To reach broader audiences through Substack's discovery, you must paywall content from those audiences.

**Result:** Minimal organic growth within Substack itself.

---

## ✨ The Solution: Best of Both Worlds

**Keep Substack + Add Your Own Site**

You get:
- ✅ Substack's excellent email delivery
- ✅ Substack's payment processing  
- ✅ Substack's comment system
- ✅ **PLUS** Google discoverability
- ✅ **PLUS** Working social previews
- ✅ **PLUS** Full content ownership

---

## 🎬 Quick Start (Try It Now!)

This repo includes **2 dummy articles** so you can see it working immediately:
```bash
# 1. Clone the repo
git clone https://github.com/nikbearbrown/Substack-to-React-Converter.git
cd Substack-to-React-Converter

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

**Visit:** `http://localhost:3000/substack`

You'll see two articles ready to go. **Try it first**, then add your own content!

---

## 📦 Adding Your Own Articles

### Step 1: Export from Substack

1. Log into your Substack account
2. Navigate to **Settings** → **Import/Export**
3. Click **"New export"** 
4. Download the ZIP file when ready (you'll get an email)

### Step 2: Run Conversion Script
```bash
# Convert your Substack export to MDX files
python3 convert_substack.py ~/Downloads/your-substack-export.zip
```

**Output:**
```
📦 Extracting your-substack-export.zip...
📝 Found 42 posts
✅ [1/42] Converted: Your First Article
✅ [2/42] Converted: Your Second Article
...
✨ Conversion complete!
📁 Output directory: app/_content/substack
📄 42 MDX files created
```

### Step 3: Done! 🎉

Your articles are now live at:
- Archive: `http://localhost:3000/substack`
- Individual: `http://localhost:3000/substack/your-article-slug`

---

## 🚀 Deploy to Vercel (1-Click)

### Option 1: Deploy Button (Easiest)

Click the button at the top of this README:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nikbearbrown/Substack-to-React-Converter)

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Option 3: Git Integration

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy"

**Done!** Your site is live in ~60 seconds.

---

## ⚡ Hot Commands (Development)
```bash
# Start dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Vercel-Specific Commands
```bash
# Link to Vercel project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull
```

---

## 📁 Project Structure
```
Substack-to-React-Converter/
├── app/
│   ├── _content/
│   │   └── substack/              # Your articles (MDX + JSON)
│   │       ├── why-own-your-content.mdx
│   │       ├── ai-education-future.mdx
│   │       └── metadata.json
│   ├── substack/
│   │   ├── [slug]/
│   │   │   └── page.tsx           # Dynamic article route
│   │   └── page.tsx               # Archive/index page
│   └── ...
├── components/
│   └── ui/
│       ├── primary-button.tsx
│       └── secondary-button.tsx
├── convert_substack.py            # Conversion script
├── package.json
└── README.md
```

---

## 🎨 Customization

### Modify Article Styling

Edit `app/substack/[slug]/page.tsx`:
```typescript
const mdxComponents = {
  h1: (props: any) => <h1 className="text-5xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="text-4xl font-bold" {...props} />,
  // Customize all elements
};
```

### Change Archive Layout

Edit `app/substack/page.tsx` to modify the article grid, add filters, change sorting, etc.

---

## 🔧 Troubleshooting

### "Module not found: gray-matter"
```bash
npm install gray-matter next-mdx-remote
```

### Images Not Loading

Images from Substack are hosted on Substack's CDN and should work automatically.

### Article Not Found (404)

1. Check that the MDX file exists in `app/_content/substack/`
2. Verify the slug in the URL matches the filename (minus `.mdx`)
3. Rebuild with `npm run build`

### Vercel Build Fails
```bash
# Check local build first
npm run build

# View Vercel build logs
vercel logs [deployment-url]
```

---

## 🌟 Features

- ✅ **Zero config** - Works out of the box with dummy articles
- ✅ **SEO optimized** - Proper meta tags, sitemaps, structured data
- ✅ **Fast** - Static generation, optimized for Vercel Edge
- ✅ **Responsive** - Mobile-first design
- ✅ **Dark mode** - Automatic theme support
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Links to original** - Every article links back to Substack

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this for your own projects!

---

## 🙋 Support

- **Issues:** [GitHub Issues](https://github.com/nikbearbrown/Substack-to-React-Converter/issues)
- **Discussions:** [GitHub Discussions](https://github.com/nikbearbrown/Substack-to-React-Converter/discussions)
- **Twitter:** [@nikbearbrown](https://twitter.com/nikbearbrown)
- **Website:** [nikbearbrown.com](https://nikbearbrown.com)

---

**Made with ❤️ by [Nik Bear Brown](https://nikbearbrown.com)**

**Star this repo if you find it useful!** ⭐

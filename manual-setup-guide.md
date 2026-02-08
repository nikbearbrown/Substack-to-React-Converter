# 📦 Complete Setup Instructions

## Method 1: Quick Setup (Recommended)

### Step 1: Clone Your Repo
```bash
git clone https://github.com/nikbearbrown/Substack-to-React-Converter.git
cd Substack-to-React-Converter
```

### Step 2: Create All Files from Artifacts

Copy each artifact below into the specified file. I've numbered them in the order they appear in Claude.

---

### 📄 File 1: `convert_substack.py`
**Artifact:** "Substack to MDX Converter"  
**Location:** Root directory

```bash
# Create the file
touch convert_substack.py
# Copy content from artifact into this file
# Make it executable
chmod +x convert_substack.py
```

---

### 📄 File 2: `app/substack/[slug]/page.tsx`
**Artifact:** "app/substack/[slug]/page.tsx"  
**Location:** `app/substack/[slug]/page.tsx`

```bash
mkdir -p app/substack/\[slug\]
touch app/substack/\[slug\]/page.tsx
# Copy content from artifact
```

---

### 📄 File 3: `app/substack/page.tsx`
**Artifact:** "app/substack/page.tsx"  
**Location:** `app/substack/page.tsx`

```bash
touch app/substack/page.tsx
# Copy content from artifact
```

---

### 📄 File 4: `README.md`
**Artifact:** "Setup Guide - README.md"  
**Location:** Root directory

```bash
touch README.md
# Copy content from artifact
```

---

### 📄 File 5: `app/_content/substack/why-own-your-content.mdx`
**Artifact:** "app/_content/substack/why-own-your-content.mdx"  
**Location:** `app/_content/substack/why-own-your-content.mdx`

```bash
mkdir -p app/_content/substack
touch app/_content/substack/why-own-your-content.mdx
# Copy content from artifact
```

---

### 📄 File 6: `app/_content/substack/ai-education-future.mdx`
**Artifact:** "app/_content/substack/ai-education-future.mdx"  
**Location:** `app/_content/substack/ai-education-future.mdx`

```bash
touch app/_content/substack/ai-education-future.mdx
# Copy content from artifact
```

---

### 📄 File 7: `app/_content/substack/metadata.json`
**Artifact:** "app/_content/substack/metadata.json"  
**Location:** `app/_content/substack/metadata.json`

```bash
touch app/_content/substack/metadata.json
# Copy content from artifact
```

---

### 📄 File 8: `QUICKSTART.md`
**Artifact:** "QUICKSTART.md - Step-by-Step Guide"  
**Location:** Root directory

```bash
touch QUICKSTART.md
# Copy content from artifact
```

---

### 📄 File 9: `package.json`
**Artifact:** "Required package.json dependencies"  
**Location:** Root directory

```bash
touch package.json
# Copy content from artifact
```

---

### 📄 File 10: `vercel.json` (Optional)
**Artifact:** "vercel.json (optional config)"  
**Location:** Root directory

```bash
touch vercel.json
# Copy content from artifact
```

---

### 📄 File 11: `.github/workflows/deploy.yml`
**Artifact:** ".github/workflows/deploy.yml"  
**Location:** `.github/workflows/deploy.yml`

```bash
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
# Copy content from artifact
```

---

### 📄 File 12: `FILE_STRUCTURE.md`
**Artifact:** "FILE_STRUCTURE.md - Complete Repo Layout"  
**Location:** Root directory

```bash
touch FILE_STRUCTURE.md
# Copy content from artifact
```

---

### Step 3: Create Additional Config Files

```bash
# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.next/
.env.local
.vercel
*.log
.DS_Store
__pycache__/
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig
EOF

# Create tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
export default config;
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

---

### Step 4: Install Dependencies

```bash
npm install
```

---

### Step 5: Test Locally

```bash
npm run dev
```

Visit: `http://localhost:3000/substack`

You should see 2 dummy articles!

---

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Substack to React Converter"
git push origin main
```

---

### Step 7: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Or use the **Deploy to Vercel** button in README.md!

---

## Method 2: Copy-Paste Checklist

If you prefer to manually create each file:

### ✅ Checklist

- [ ] `convert_substack.py` (copy from artifact 1)
- [ ] `app/substack/[slug]/page.tsx` (copy from artifact 2)
- [ ] `app/substack/page.tsx` (copy from artifact 3)
- [ ] `README.md` (copy from artifact 4)
- [ ] `app/_content/substack/why-own-your-content.mdx` (copy from artifact 5)
- [ ] `app/_content/substack/ai-education-future.mdx` (copy from artifact 6)
- [ ] `app/_content/substack/metadata.json` (copy from artifact 7)
- [ ] `QUICKSTART.md` (copy from artifact 8)
- [ ] `package.json` (copy from artifact 9)
- [ ] `vercel.json` (copy from artifact 10)
- [ ] `.github/workflows/deploy.yml` (copy from artifact 11)
- [ ] `FILE_STRUCTURE.md` (copy from artifact 12)
- [ ] `.gitignore` (create using commands above)
- [ ] `tsconfig.json` (create using commands above)
- [ ] `next.config.js` (create using commands above)
- [ ] `tailwind.config.ts` (create using commands above)
- [ ] `postcss.config.js` (create using commands above)

---

## Need Your UI Components?

Your repo needs these component files (referenced in the pages):

### `components/ui/primary-button.tsx`
```tsx
import Link from "next/link";

export default function PrimaryButton({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
    >
      {children}
    </Link>
  );
}
```

### `components/ui/secondary-button.tsx`
```tsx
import Link from "next/link";

export default function SecondaryButton({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
    >
      {children}
    </Link>
  );
}
```

---

## Final Directory Structure

```
Substack-to-React-Converter/
├── .github/workflows/deploy.yml
├── app/
│   ├── _content/substack/
│   │   ├── why-own-your-content.mdx
│   │   ├── ai-education-future.mdx
│   │   └── metadata.json
│   └── substack/
│       ├── [slug]/page.tsx
│       └── page.tsx
├── components/ui/
│   ├── primary-button.tsx
│   └── secondary-button.tsx
├── convert_substack.py
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── vercel.json
├── .gitignore
├── README.md
├── QUICKSTART.md
└── FILE_STRUCTURE.md
```

---

## ✅ Verification

After setup, verify everything works:

```bash
# 1. Check files exist
ls -la app/_content/substack/*.mdx

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Run dev server
npm run dev

# 5. Test URLs
# http://localhost:3000/substack
# http://localhost:3000/substack/why-own-your-content
# http://localhost:3000/substack/ai-education-future
```

All URLs should load without errors!

---

## 🚀 Ready to Deploy

Once verified locally:

```bash
git push origin main
```

Then deploy to Vercel using the button in README or CLI.

**Your repo is ready!** 🎉

#!/bin/bash

# Substack to React Converter - Repository Setup Script
# This script creates all necessary files for the repository

set -e  # Exit on error

echo "🚀 Setting up Substack to React Converter..."

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p app/_content/substack
mkdir -p app/substack/\[slug\]
mkdir -p components/ui
mkdir -p .github/workflows
mkdir -p public

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Python
__pycache__/
*.py[cod]
*$py.class
EOF

# Create package.json
echo "📝 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "substack-to-react-converter",
  "version": "1.0.0",
  "description": "Make your Substack articles discoverable on your own domain",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gray-matter": "^4.0.3",
    "next-mdx-remote": "^4.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Create tsconfig.json
echo "📝 Creating tsconfig.json..."
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
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.js
echo "📝 Creating next.config.js..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOF

# Create tailwind.config.ts
echo "📝 Creating tailwind.config.ts..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
EOF

# Create postcss.config.js
echo "📝 Creating postcss.config.js..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Note about files that need to be copied from artifacts
echo ""
echo "⚠️  IMPORTANT: You need to manually copy these files from the artifacts:"
echo ""
echo "1. convert_substack.py (from artifact 'Substack to MDX Converter')"
echo "2. app/substack/[slug]/page.tsx (from artifact 'app/substack/[slug]/page.tsx')"
echo "3. app/substack/page.tsx (from artifact 'app/substack/page.tsx')"
echo "4. app/_content/substack/why-own-your-content.mdx (from artifact)"
echo "5. app/_content/substack/ai-education-future.mdx (from artifact)"
echo "6. app/_content/substack/metadata.json (from artifact)"
echo "7. README.md (from artifact 'Setup Guide - README.md')"
echo "8. QUICKSTART.md (from artifact 'QUICKSTART.md')"
echo ""

# Create a simple placeholder README
cat > README-TEMP.md << 'EOF'
# Substack to React Converter

Please replace this with the full README.md from the artifacts.

## Quick Setup

1. Copy all files from the Claude artifacts
2. Run: npm install
3. Run: npm run dev
4. Visit: http://localhost:3000/substack

See QUICKSTART.md for detailed instructions.
EOF

# Create .env.local.example
cat > .env.local.example << 'EOF'
# Site URL (auto-set by Vercel)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=

# Optional: Author info
NEXT_PUBLIC_AUTHOR_NAME=Nik Bear Brown
NEXT_PUBLIC_AUTHOR_EMAIL=nikbearbrown@gmail.com
EOF

echo ""
echo "✅ Basic structure created!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the remaining files from Claude artifacts (see list above)"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Push to GitHub"
echo ""
echo "🎯 Repository structure ready for: https://github.com/nikbearbrown/Substack-to-React-Converter"
EOF

chmod +x setup-repo.sh
echo "✅ Setup script created: setup-repo.sh"
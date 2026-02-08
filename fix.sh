# 1. Create .gitignore (if not already there)
cat > .gitignore << 'EOF'
node_modules/
.next/
.env.local
.vercel
*.log
.DS_Store
__pycache__/
*.py[cod]
EOF

# 2. Create the component files
mkdir -p components/ui

cat > components/ui/primary-button.tsx << 'EOF'
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
EOF

cat > components/ui/secondary-button.tsx << 'EOF'
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
EOF

# 3. Create necessary directories
mkdir -p app/_content/substack
mkdir -p app/substack/\[slug\]
mkdir -p .github/workflows

echo "✅ Basic structure completed!"
echo ""
echo "📋 Now you need to copy these files from Claude artifacts:"
echo "1. convert_substack.py → root directory"
echo "2. app/substack/[slug]/page.tsx"
echo "3. app/substack/page.tsx"
echo "4. app/_content/substack/why-own-your-content.mdx"
echo "5. app/_content/substack/ai-education-future.mdx"
echo "6. app/_content/substack/metadata.json"
echo "7. README.md (replace README-TEMP.md)"
echo "8. QUICKSTART.md"


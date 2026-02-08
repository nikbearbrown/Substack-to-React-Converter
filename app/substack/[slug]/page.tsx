import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import SecondaryButton from "@/components/ui/secondary-button";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mb-3 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold mb-2 mt-4" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  img: (props: any) => (
    <img className="rounded-lg my-8 w-full" {...props} alt={props.alt || "Article image"} />
  ),
};

interface ArticleFrontmatter {
  title: string;
  subtitle?: string;
  date: string;
  displayDate: string;
  slug: string;
  excerpt?: string;
  substackUrl?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "app/_content/substack");

function getArticleBySlug(slug: string): { frontmatter: ArticleFrontmatter; content: string } | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  } catch (error) {
    return null;
  }
}

function getAllSlugs(): string[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const { frontmatter } = article;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt || frontmatter.subtitle,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt || frontmatter.subtitle,
      type: "article",
      publishedTime: frontmatter.date,
    },
  };
}

export default function SubstackArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/substack" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Articles
        </Link>

        {frontmatter.substackUrl && (
          <div className="mb-8 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                <span className="text-sm text-muted-foreground">
                  Originally published on Substack
                </span>
              </div>
              
                <a href={frontmatter.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View original
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {frontmatter.title}
          </h1>
          
          {frontmatter.subtitle && (
            <p className="text-xl text-muted-foreground mb-4">
              {frontmatter.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={frontmatter.date}>
              {frontmatter.displayDate}
            </time>
          </div>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <hr className="my-12 border-muted" />

        <section className="my-12">
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-8">
            <SecondaryButton href="/substack">
              More Articles
            </SecondaryButton>
            <SecondaryButton href="https://www.nikbearbrown.com">
              Learn More
            </SecondaryButton>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Connect with Nik Bear Brown</h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a 
                href="https://twitter.com/nikbearbrown"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Twitter
              </a>
              <a 
                href="https://www.youtube.com/@nikbearbrown"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                YouTube
              </a>
              <a 
                href="https://www.nikbearbrown.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Website
              </a>
              <a 
                href="https://www.linkedin.com/in/nikbearbrown/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

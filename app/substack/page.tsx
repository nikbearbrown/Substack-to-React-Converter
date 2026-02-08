import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Articles from Substack | Nik Bear Brown",
  description: "Archive of articles originally published on Substack",
};

interface Article {
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  displayDate: string;
  excerpt: string;
  filename: string;
}

interface ArticlesMetadata {
  articles: Article[];
  totalCount: number;
  lastUpdated: string;
}

function getArticlesMetadata(): ArticlesMetadata {
  try {
    const metadataPath = path.join(
      process.cwd(),
      "app/_content/substack/metadata.json"
    );
    const fileContents = fs.readFileSync(metadataPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return {
      articles: [],
      totalCount: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

export default function SubstackArchivePage() {
  const { articles, totalCount } = getArticlesMetadata();

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Substack Articles
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A collection of {totalCount} articles originally published on Substack. 
            Topics include AI, education, technology, and social impact.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found. Run the conversion script to import your Substack articles.
            </p>
            <code className="block mt-4 p-4 bg-muted rounded-lg text-sm">
              python convert_substack.py path/to/export.zip
            </code>
          </div>
        ) : (
          <div className="grid gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="p-6 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <Link href={`/substack/${article.slug}`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time dateTime={article.date}>
                        {article.displayDate}
                      </time>
                    </div>

                    <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    {article.subtitle && (
                      <p className="text-lg text-muted-foreground">
                        {article.subtitle}
                      </p>
                    )}

                    {article.excerpt && (
                      <p className="text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="pt-2">
                      <span className="text-sm text-primary hover:underline">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Resources Section */}
        {articles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">More from Nik Bear Brown</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <SecondaryButton href="https://github.com/nikbearbrown">
                GitHub
              </SecondaryButton>
              <SecondaryButton href="https://youtube.com/playlist?list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo&si=caS7A9UMCFewuuRB">
                YouTube Playlist
              </SecondaryButton>
              <SecondaryButton href="https://www.nikbearbrown.com">
                Website
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">
                Connect with Nik Bear Brown
              </h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                
                  href="https://twitter.com/nikbearbrown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Twitter
                </a>
                
                  href="https://www.youtube.com/@nikbearbrown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  YouTube
                </a>
                
                  href="https://www.nikbearbrown.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Website
                </a>
                
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
        )}
      </div>
    </div>
  );
}

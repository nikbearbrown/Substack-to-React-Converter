#!/usr/bin/env python3
"""
Substack to MDX Converter
Converts Substack export ZIP to MDX files with frontmatter

Usage: python convert_substack.py path/to/export.zip
"""

import zipfile
import csv
import json
import re
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser
from io import StringIO
import sys


class HTMLToMarkdown(HTMLParser):
    """Simple HTML to Markdown converter for Substack content"""
    
    def __init__(self):
        super().__init__()
        self.markdown = StringIO()
        self.current_tag = None
        self.list_depth = 0
        self.in_pre = False
        
    def handle_starttag(self, tag, attrs):
        if tag == 'h1':
            self.markdown.write('\n# ')
        elif tag == 'h2':
            self.markdown.write('\n## ')
        elif tag == 'h3':
            self.markdown.write('\n### ')
        elif tag == 'h4':
            self.markdown.write('\n#### ')
        elif tag == 'p':
            self.markdown.write('\n\n')
        elif tag == 'br':
            self.markdown.write('\n')
        elif tag == 'strong' or tag == 'b':
            self.markdown.write('**')
        elif tag == 'em' or tag == 'i':
            self.markdown.write('*')
        elif tag == 'code':
            self.markdown.write('`')
        elif tag == 'pre':
            self.markdown.write('\n```\n')
            self.in_pre = True
        elif tag == 'a':
            href = dict(attrs).get('href', '')
            self.current_tag = ('a', href)
            self.markdown.write('[')
        elif tag == 'img':
            attrs_dict = dict(attrs)
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', 'image')
            self.markdown.write(f'\n\n![{alt}]({src})\n\n')
        elif tag == 'ul':
            self.list_depth += 1
        elif tag == 'ol':
            self.list_depth += 1
        elif tag == 'li':
            indent = '  ' * (self.list_depth - 1)
            self.markdown.write(f'\n{indent}- ')
        elif tag == 'blockquote':
            self.markdown.write('\n> ')
            
    def handle_endtag(self, tag):
        if tag in ['strong', 'b']:
            self.markdown.write('**')
        elif tag in ['em', 'i']:
            self.markdown.write('*')
        elif tag == 'code' and not self.in_pre:
            self.markdown.write('`')
        elif tag == 'pre':
            self.markdown.write('\n```\n')
            self.in_pre = False
        elif tag == 'a':
            if self.current_tag and self.current_tag[0] == 'a':
                href = self.current_tag[1]
                self.markdown.write(f']({href})')
                self.current_tag = None
        elif tag in ['ul', 'ol']:
            self.list_depth -= 1
            self.markdown.write('\n')
            
    def handle_data(self, data):
        if self.in_pre:
            self.markdown.write(data)
        else:
            cleaned = ' '.join(data.split())
            if cleaned:
                self.markdown.write(cleaned)
    
    def get_markdown(self):
        return self.markdown.getvalue().strip()


def slugify(text):
    """Convert text to URL-friendly slug"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def extract_excerpt(html_content, max_length=200):
    """Extract plain text excerpt from HTML"""
    text = re.sub(r'<[^>]+>', '', html_content)
    text = ' '.join(text.split())
    if len(text) > max_length:
        text = text[:max_length].rsplit(' ', 1)[0] + '...'
    return text


def build_substack_url(canonical_url, post_slug, publication_name='nikbearbrown'):
    """Build Substack article URL from available data"""
    if canonical_url:
        return canonical_url
    elif post_slug:
        return f"https://{publication_name}.substack.com/p/{post_slug}"
    else:
        return f"https://substack.com/@{publication_name}"


def convert_substack_export(zip_path, output_dir='app/_content/substack'):
    """Convert Substack export ZIP to MDX files"""
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    articles_metadata = []
    
    print(f"📦 Extracting {zip_path}...")
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        posts_csv = None
        for filename in zip_ref.namelist():
            if filename.endswith('posts.csv'):
                posts_csv = filename
                break
        
        if not posts_csv:
            print("❌ Error: posts.csv not found in export")
            return
        
        with zip_ref.open(posts_csv) as csvfile:
            reader = csv.DictReader(StringIO(csvfile.read().decode('utf-8')))
            posts = list(reader)
        
        print(f"📝 Found {len(posts)} posts")
        
        for i, post in enumerate(posts, 1):
            post_id = post.get('post_id', '')
            title = post.get('title', 'Untitled')
            subtitle = post.get('subtitle', '')
            slug = post.get('slug', slugify(title))
            post_date = post.get('post_date', '')
            canonical_url = post.get('canonical_url', '')
            
            substack_url = build_substack_url(canonical_url, slug)
            
            html_file = f"posts/{post_id}.html"
            html_content = ''
            
            try:
                with zip_ref.open(html_file) as f:
                    html_content = f.read().decode('utf-8')
            except KeyError:
                print(f"⚠️  Warning: HTML file not found for post {post_id}")
                continue
            
            converter = HTMLToMarkdown()
            converter.feed(html_content)
            markdown_content = converter.get_markdown()
            
            excerpt = subtitle or extract_excerpt(html_content)
            
            try:
                date_obj = datetime.fromisoformat(post_date.replace('Z', '+00:00'))
                formatted_date = date_obj.strftime('%Y-%m-%d')
                display_date = date_obj.strftime('%B %d, %Y')
            except:
                formatted_date = post_date
                display_date = post_date
            
            frontmatter = f"""---
title: "{title}"
subtitle: "{subtitle}"
date: "{formatted_date}"
displayDate: "{display_date}"
slug: "{slug}"
excerpt: "{excerpt}"
substackUrl: "{substack_url}"
---

"""
            
            mdx_filename = f"{slug}.mdx"
            mdx_path = output_path / mdx_filename
            
            with open(mdx_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter + markdown_content)
            
            articles_metadata.append({
                'title': title,
                'subtitle': subtitle,
                'slug': slug,
                'date': formatted_date,
                'displayDate': display_date,
                'excerpt': excerpt,
                'substackUrl': substack_url,
                'filename': mdx_filename
            })
            
            print(f"✅ [{i}/{len(posts)}] Converted: {title}")
        
        metadata_path = output_path / 'metadata.json'
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump({
                'articles': sorted(articles_metadata, 
                                 key=lambda x: x['date'], 
                                 reverse=True),
                'totalCount': len(articles_metadata),
                'lastUpdated': datetime.now().isoformat()
            }, f, indent=2)
        
        print(f"\n✨ Conversion complete!")
        print(f"📁 Output directory: {output_path}")
        print(f"📄 {len(articles_metadata)} MDX files created")
        print(f"📋 Metadata saved to: {metadata_path}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_substack.py <path-to-export.zip>")
        print("\nExample: python convert_substack.py ~/Downloads/my-substack-export.zip")
        sys.exit(1)
    
    zip_path = sys.argv[1]
    
    if not Path(zip_path).exists():
        print(f"❌ Error: File not found: {zip_path}")
        sys.exit(1)
    
    convert_substack_export(zip_path)


if __name__ == '__main__':
    main()

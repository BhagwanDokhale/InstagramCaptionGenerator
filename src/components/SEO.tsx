import { useEffect } from 'react';
import { buildSchemaGraph, BreadcrumbItem, FAQItem } from '../lib/schema';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  schemaMarkup?: object | object[];
  url?: string;
  image?: string;
  twitterCard?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
}

export function SEO({ 
  title = "Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption", 
  description = "Free Instagram Creator Tools for creating, organizing, and reusing social content.",
  keywords = "Instagram Creator Tools, Instagram Caption Generator, Instagram Bio Generator, Hashtag Generator, Reels Downloader",
  author = "GrowthCaption",
  robots = "index, follow",
  schemaMarkup,
  url,
  image = "https://growthcaption.com/og-image.jpg",
  twitterCard = "summary_large_image",
  breadcrumbs,
  faqs
}: SEOProps) {
  useEffect(() => {
    // 1. Calculate Canonical URL
    let canonicalUrl = url;
    if (!canonicalUrl) {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
        canonicalUrl = `https://growthcaption.com${normalized === '/' ? '/' : normalized}`;
      } else {
        canonicalUrl = "https://growthcaption.com/";
      }
    } else if (!canonicalUrl.startsWith('http')) {
      canonicalUrl = `https://growthcaption.com${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`;
    }

    // 2. Update Title
    document.title = title;

    // Helper for meta tags by name
    const updateMetaByName = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Update Meta Description, Keywords, Author, Robots
    updateMetaByName('description', description);
    updateMetaByName('keywords', keywords);
    updateMetaByName('author', author);
    updateMetaByName('robots', robots);

    // 4. Update or Create Canonical URL tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Open Graph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:url', canonicalUrl);
    updateOrCreateMeta('og:image', image);
    updateOrCreateMeta('og:image:secure_url', image);
    updateOrCreateMeta('og:image:type', 'image/jpeg');
    updateOrCreateMeta('og:image:width', '1200');
    updateOrCreateMeta('og:image:height', '630');
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:site_name', 'GrowthCaption');

    // 6. Twitter / X Cards Tags
    updateMetaByName('twitter:card', twitterCard);
    updateMetaByName('twitter:title', title);
    updateMetaByName('twitter:description', description);
    updateMetaByName('twitter:image', image);

    // 7. Schema Markup (Organization, WebSite, Breadcrumb, FAQ, Page Schema)
    const existingSchema = document.querySelector('#schema-markup');
    if (existingSchema) {
      existingSchema.remove();
    }

    const fullSchemaGraph = buildSchemaGraph({
      canonicalUrl,
      breadcrumbs,
      faqs,
      customSchema: schemaMarkup
    });

    const script = document.createElement('script');
    script.id = 'schema-markup';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(fullSchemaGraph);
    document.head.appendChild(script);

  }, [title, description, schemaMarkup, url, image, breadcrumbs, faqs]);

  return null;
}


import { TabType } from './navigation';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const getOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": "https://growthcaption.com/#organization",
  "name": "GrowthCaption",
  "url": "https://growthcaption.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://growthcaption.com/favicon.svg"
  },
  "sameAs": [
    "https://instagram.com/growthcaption"
  ],
  "description": "GrowthCaption provides free Instagram Creator Tools for creating, organizing, and reusing social content."
});

export const getWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": "https://growthcaption.com/#website",
  "url": "https://growthcaption.com/",
  "name": "GrowthCaption",
  "alternateName": "GrowthCaption",
  "description": "Free Instagram Creator Tools for creating, organizing, and reusing social content.",
  "publisher": {
    "@id": "https://growthcaption.com/#organization"
  }
});

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  if (!items || items.length === 0) return null;
  const lastItem = items[items.length - 1];
  const lastUrl = lastItem?.url?.startsWith('http')
    ? lastItem.url
    : `https://growthcaption.com${lastItem?.url?.startsWith('/') ? '' : '/'}${lastItem?.url || ''}`;

  return {
    "@type": "BreadcrumbList",
    "@id": `${lastUrl}#breadcrumb`,
    "itemListElement": items.map((item, index) => {
      const fullUrl = item.url.startsWith('http')
        ? item.url
        : `https://growthcaption.com${item.url.startsWith('/') ? '' : '/'}${item.url}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": fullUrl
      };
    })
  };
};

export const getFAQSchema = (faqs: FAQItem[]) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export interface ToolMetadata {
  name: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  url: string;
  keywords: string;
}

export const TOOL_SCHEMA_MAP: Record<TabType, ToolMetadata> = {
  captions: {
    name: "Instagram Caption Generator",
    title: "Instagram Caption Generator – Free AI Captions | GrowthCaption",
    h1: "Instagram Caption Generator",
    description: "Create Instagram caption ideas with AI based on your topic, tone, and platform.",
    intro: "Create Instagram caption ideas with AI based on your topic, tone, and platform.",
    url: "/tools/caption-generator",
    keywords: "Instagram Caption Generator, AI Instagram captions, free instagram captions, caption creator, reel captions"
  },
  comments: {
    name: "Instagram Comment Generator",
    title: "Instagram Comment Generator – Thoughtful Comment Ideas | GrowthCaption",
    h1: "Instagram Comment Generator",
    description: "Generate thoughtful comment ideas for any Instagram post or Reel.",
    intro: "Generate thoughtful comment ideas for any Instagram post or Reel.",
    url: "/tools/comment-generator",
    keywords: "Instagram Comment Generator, thoughtful comments, organic instagram comments, comment ideas"
  },
  bios: {
    name: "Instagram Bio Generator",
    title: "Instagram Bio Generator – Free Bio Ideas | GrowthCaption",
    h1: "Instagram Bio Generator",
    description: "Create Instagram bio ideas based on your profile, brand, niche, and preferred style.",
    intro: "Create Instagram bio ideas based on your profile, brand, niche, and preferred style.",
    url: "/tools/bio-generator",
    keywords: "Instagram Bio Generator, aesthetic bio ideas, instagram bio creator, profile bio generator"
  },
  usernames: {
    name: "Instagram Username Generator",
    title: "Instagram Username Generator – Creative Username Ideas | GrowthCaption",
    h1: "Instagram Username Generator",
    description: "Generate creative Instagram username ideas based on your name, niche, or keywords.",
    intro: "Generate creative Instagram username ideas based on your name, niche, or keywords.",
    url: "/tools/username-generator",
    keywords: "Instagram Username Generator, username ideas, instagram handle generator, creative handles"
  },
  hashtags: {
    name: "Instagram Hashtag Generator",
    title: "Instagram Hashtag Generator – Relevant Hashtag Ideas | GrowthCaption",
    h1: "Instagram Hashtag Generator",
    description: "Generate relevant Instagram hashtag ideas based on your topic, keywords, and niche.",
    intro: "Generate relevant Instagram hashtag ideas based on your topic, keywords, and niche.",
    url: "/tools/hashtag-generator",
    keywords: "Instagram Hashtag Generator, AI hashtag generator, instagram hashtags, hashtag ideas, topic tags"
  },
  alttext: {
    name: "Instagram ALT Text Generator",
    title: "Instagram ALT Text Generator – Descriptive Image Text | GrowthCaption",
    h1: "Instagram ALT Text Generator",
    description: "Create concise, descriptive alt text for your Instagram images.",
    intro: "Create concise, descriptive alt text for your Instagram images.",
    url: "/tools/alt-text-generator",
    keywords: "Instagram ALT Text Generator, image alt text, instagram accessibility, descriptive image text"
  },
  cover: {
    name: "Instagram Reel Cover Maker",
    title: "Instagram Reel Cover Maker – Create Reel Covers | GrowthCaption",
    h1: "Instagram Reel Cover Maker",
    description: "Create and customize Instagram Reel covers for your videos.",
    intro: "Create and customize Instagram Reel covers for your videos.",
    url: "/tools/reel-cover-maker",
    keywords: "Instagram Reel Cover Maker, reel cover creator, safe zone grid overlay, 9:16 cover maker"
  },
  brandkit: {
    name: "Instagram Brand Kit Generator",
    title: "Instagram Brand Kit Generator – Create Your Brand Kit | GrowthCaption",
    h1: "Instagram Brand Kit Generator",
    description: "Create a reusable brand kit with colors, fonts, brand voice, and content ideas.",
    intro: "Create a reusable brand kit with colors, fonts, brand voice, and content ideas.",
    url: "/tools/brand-kit-generator",
    keywords: "Instagram Brand Kit Generator, brand kit creator, color palette generator, font pairings, brand voice"
  },
  resizer: {
    name: "Instagram Photo Resizer",
    title: "Instagram Photo Resizer – Resize Images for Instagram | GrowthCaption",
    h1: "Instagram Photo Resizer",
    description: "Resize and position images for Instagram square, portrait, story, and landscape formats.",
    intro: "Resize and position images for Instagram square, portrait, story, and landscape formats.",
    url: "/tools/photo-resizer",
    keywords: "Instagram Photo Resizer, resize images for instagram, square crop, 4:5 portrait, instagram story resizer"
  },
  grid: {
    name: "Instagram Grid Maker",
    title: "Instagram Grid Maker – Create 3x3 Instagram Grids | GrowthCaption",
    h1: "Instagram Grid Maker",
    description: "Split an image into a 3x3 Instagram grid ready for sequential posting.",
    intro: "Split an image into a 3x3 Instagram grid ready for sequential posting.",
    url: "/tools/grid-maker",
    keywords: "Instagram Grid Maker, 3x3 instagram grid, grid splitter, panoramic photo grid, profile grid maker"
  },
  planner: {
    name: "Instagram Feed Planner",
    title: "Instagram Feed Planner – Plan Your Profile Grid | GrowthCaption",
    h1: "Instagram Feed Planner",
    description: "Plan and preview your Instagram profile grid by arranging your future posts.",
    intro: "Plan and preview your Instagram profile grid by arranging your future posts.",
    url: "/tools/feed-planner",
    keywords: "Instagram Feed Planner, plan instagram grid, preview instagram feed, feed layout planner"
  },
  downloader: {
    name: "Instagram Reels Downloader",
    title: "Instagram Reels Downloader – Download Public Media | GrowthCaption",
    h1: "Instagram Reels Downloader",
    description: "Download available media from supported public Instagram Reel and post URLs without requiring an Instagram login.",
    intro: "Download available media from supported public Instagram Reel and post URLs without requiring an Instagram login.",
    url: "/tools/reels-downloader",
    keywords: "Instagram Reels Downloader, download public instagram reels, supported public instagram url, save public instagram media, reel downloader"
  }
};

export function inferBreadcrumbsFromUrl(url: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];
  
  if (!url || url === 'https://growthcaption.com/' || url === '/') {
    return items;
  }

  const cleanUrl = url.replace('https://growthcaption.com', '');
  const segments = cleanUrl.split('/').filter(Boolean);

  if (segments[0] === 'tools') {
    items.push({ name: 'Tools', url: '/tools' });
    if (segments[1]) {
      const matchingTool = Object.values(TOOL_SCHEMA_MAP).find(t => t.url.endsWith(segments[1]));
      const name = matchingTool ? matchingTool.name : segments[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const toolUrl = matchingTool ? matchingTool.url : cleanUrl;
      items.push({ name, url: toolUrl });
    }
  } else if (segments[0] === 'blog') {
    items.push({ name: 'Blog', url: '/blog' });
    if (segments[1]) {
      const readable = segments[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      items.push({ name: readable, url: cleanUrl });
    }
  } else if (segments[0] === 'how-to-use' || segments[0] === 'how-to') {
    items.push({ name: 'How to Use', url: '/how-to-use' });
  } else if (segments[0] === 'about-us' || segments[0] === 'about') {
    items.push({ name: 'About Us', url: '/about-us' });
  } else if (segments[0] === 'faq') {
    items.push({ name: 'FAQ', url: '/faq' });
  } else if (segments[0] === 'contact') {
    items.push({ name: 'Contact Us', url: '/contact' });
  } else if (segments[0] === 'privacy-policy' || segments[0] === 'privacy') {
    items.push({ name: 'Privacy Policy', url: '/privacy-policy' });
  } else if (segments[0] === 'terms-and-conditions' || segments[0] === 'terms') {
    items.push({ name: 'Terms & Conditions', url: '/terms-and-conditions' });
  } else if (segments[0] === 'sitemap') {
    items.push({ name: 'Sitemap', url: '/sitemap' });
  } else {
    const readable = segments[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    items.push({ name: readable, url: cleanUrl });
  }

  return items;
}

export function buildSchemaGraph(options: {
  canonicalUrl: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  customSchema?: object | object[];
}) {
  const graph: object[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
  ];

  // 1. Breadcrumb
  const breadcrumbItems = options.breadcrumbs || inferBreadcrumbsFromUrl(options.canonicalUrl);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  if (breadcrumbSchema) {
    graph.push(breadcrumbSchema);
  }

  // 2. FAQ
  if (options.faqs && options.faqs.length > 0) {
    const faqSchema = getFAQSchema(options.faqs);
    if (faqSchema) {
      graph.push(faqSchema);
    }
  }

  // 3. Custom Schema(s)
  if (options.customSchema) {
    const customList = Array.isArray(options.customSchema) ? options.customSchema : [options.customSchema];
    for (const item of customList) {
      if (item && typeof item === 'object') {
        const cleanedItem = { ...item } as Record<string, unknown>;
        delete cleanedItem['@context'];
        
        // If custom schema is an FAQPage and we already created one, merge or keep
        if (cleanedItem['@type'] === 'FAQPage' && options.faqs && options.faqs.length > 0) {
          // Skip duplicate FAQPage if we generated one from faqs prop
          continue;
        }
        graph.push(cleanedItem);
      }
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

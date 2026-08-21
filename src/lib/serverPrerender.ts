import { getRouteFromPath, isValidRoute, VALID_BLOG_SLUGS, TabType } from './navigation';
import { buildSchemaGraph, TOOL_SCHEMA_MAP, FAQItem } from './schema';

export interface PrerenderResult {
  html: string;
  status: number;
}

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  faqs?: FAQItem[];
  article?: {
    title: string;
    author: string;
    dateIso: string;
    image: string;
    excerpt: string;
    contentHtml: string;
  };
}

const PAGE_META_MAP: Record<string, PageMeta> = {
  captions: {
    title: "Instagram Caption Generator – Free AI Captions | GrowthCaption",
    description: "Create Instagram caption ideas with AI based on your topic, tone, and platform.",
    keywords: "Instagram Caption Generator, AI Instagram captions, free instagram captions, caption creator, reel captions",
    h1: "Instagram Caption Generator",
    intro: "Create Instagram caption ideas with AI based on your topic, tone, and platform.",
    faqs: [
      { question: "How does the Instagram Caption Generator work?", answer: "Our tool analyzes your selected topic, tone, and post preferences to generate creative caption ideas complete with emojis and call-to-action suggestions." },
      { question: "Is GrowthCaption's caption generator free?", answer: "Yes! GrowthCaption is 100% free with no sign-up or login required." }
    ]
  },
  comments: {
    title: "Instagram Comment Generator – Thoughtful Comment Ideas | GrowthCaption",
    description: "Generate thoughtful comment ideas for any Instagram post or Reel.",
    keywords: "Instagram Comment Generator, thoughtful comments, organic instagram comments, comment ideas",
    h1: "Instagram Comment Generator",
    intro: "Generate thoughtful comment ideas for any Instagram post or Reel.",
    faqs: [
      { question: "Can I generate comments in different languages?", answer: "Yes! Select from English, Spanish, French, German, Hindi, Hinglish, Portuguese, Italian, Japanese, Korean, and more." },
      { question: "Does it include hashtags in comments?", answer: "You can toggle optional hashtags on or off depending on your engagement strategy." }
    ]
  },
  hashtags: {
    title: "Instagram Hashtag Generator – Relevant Hashtag Ideas | GrowthCaption",
    description: "Generate relevant Instagram hashtag ideas based on your topic, keywords, and niche.",
    keywords: "Instagram Hashtag Generator, AI hashtag generator, instagram hashtags, hashtag ideas, topic tags",
    h1: "Instagram Hashtag Generator",
    intro: "Generate relevant Instagram hashtag ideas based on your topic, keywords, and niche.",
    faqs: [
      { question: "Does the generator provide live trending hashtags?", answer: "No. GrowthCaption generates hashtag suggestions based on your input topics and preferences. It does not provide live Instagram trend or competition data." },
      { question: "Will these hashtags increase my reach?", answer: "Hashtag performance can vary by content, audience, account, and platform behavior. Use the suggestions as a starting point and choose hashtags that are genuinely relevant to your post." },
      { question: "How many hashtags should I use on Instagram?", answer: "Instagram allows up to 30 hashtags per post. We recommend a balanced stack of 10 to 20 relevant hashtags." }
    ]
  },
  bios: {
    title: "Instagram Bio Generator – Free Bio Ideas | GrowthCaption",
    description: "Create Instagram bio ideas based on your profile, brand, niche, and preferred style.",
    keywords: "Instagram Bio Generator, aesthetic bio ideas, instagram bio creator, profile bio generator",
    h1: "Instagram Bio Generator",
    intro: "Create Instagram bio ideas based on your profile, brand, niche, and preferred style.",
    faqs: [
      { question: "What makes a great Instagram bio?", answer: "A great bio includes a clear description of your profile, line breaks for readability, relevant keywords, and a helpful call-to-action." }
    ]
  },
  usernames: {
    title: "Instagram Username Generator – Creative Username Ideas | GrowthCaption",
    description: "Generate creative Instagram username ideas based on your name, niche, or keywords.",
    keywords: "Instagram Username Generator, username ideas, instagram handle generator, creative handles",
    h1: "Instagram Username Generator",
    intro: "Generate creative Instagram username ideas based on your name, niche, or keywords.",
    faqs: [
      { question: "Are the generated usernames guaranteed to be unique or available?", answer: "GrowthCaption generates creative username suggestions, but it cannot guarantee that a username is unique or available. Check the username directly on Instagram before using it." },
      { question: "Can I use these usernames on Instagram?", answer: "You can use a generated suggestion if it is available and appropriate for your account. Always check availability directly on Instagram before using it." }
    ]
  },
  alttext: {
    title: "Instagram ALT Text Generator – Descriptive Image Text | GrowthCaption",
    description: "Create concise, descriptive alt text for your Instagram images.",
    keywords: "Instagram ALT Text Generator, image alt text, instagram accessibility, descriptive image text",
    h1: "Instagram ALT Text Generator",
    intro: "Create concise, descriptive alt text for your Instagram images."
  },
  cover: {
    title: "Instagram Reel Cover Maker – Create Reel Covers | GrowthCaption",
    description: "Create and customize Instagram Reel covers for your videos.",
    keywords: "Instagram Reel Cover Maker, reel cover creator, safe zone grid overlay, 9:16 cover maker",
    h1: "Instagram Reel Cover Maker",
    intro: "Create and customize Instagram Reel covers for your videos."
  },
  brandkit: {
    title: "Instagram Brand Kit Generator – Create Your Brand Kit | GrowthCaption",
    description: "Create a reusable brand kit with colors, fonts, brand voice, and content ideas.",
    keywords: "Instagram Brand Kit Generator, brand kit creator, color palette generator, font pairings, brand voice",
    h1: "Instagram Brand Kit Generator",
    intro: "Create a reusable brand kit with colors, fonts, brand voice, and content ideas."
  },
  resizer: {
    title: "Instagram Photo Resizer – Resize Images for Instagram | GrowthCaption",
    description: "Resize and position images for Instagram square, portrait, story, and landscape formats.",
    keywords: "Instagram Photo Resizer, resize images for instagram, square crop, 4:5 portrait, instagram story resizer",
    h1: "Instagram Photo Resizer",
    intro: "Resize and position images for Instagram square, portrait, story, and landscape formats."
  },
  grid: {
    title: "Instagram Grid Maker – Create 3x3 Instagram Grids | GrowthCaption",
    description: "Split an image into a 3x3 Instagram grid ready for sequential posting.",
    keywords: "Instagram Grid Maker, 3x3 instagram grid, grid splitter, panoramic photo grid, profile grid maker",
    h1: "Instagram Grid Maker",
    intro: "Split an image into a 3x3 Instagram grid ready for sequential posting."
  },
  planner: {
    title: "Instagram Feed Planner – Plan Your Profile Grid | GrowthCaption",
    description: "Plan and preview your Instagram profile grid by arranging your future posts.",
    keywords: "Instagram Feed Planner, plan instagram grid, preview instagram feed, feed layout planner",
    h1: "Instagram Feed Planner",
    intro: "Plan and preview your Instagram profile grid by arranging your future posts."
  },
  downloader: {
    title: "Instagram Reels Downloader – Download Public Media | GrowthCaption",
    description: "Download available media from supported public Instagram Reel and post URLs without requiring an Instagram login.",
    keywords: "Instagram Reels Downloader, download public instagram reels, supported public instagram url, save public instagram media, reel downloader",
    h1: "Instagram Reels Downloader",
    intro: "Download available media from supported public Instagram Reel and post URLs without requiring an Instagram login.",
    faqs: [
      { question: "Is the Instagram Reels Downloader safe to use?", answer: "Yes. The tool processes supported public URLs without requiring Instagram login credentials, passwords, or software installation." },
      { question: "Can I download Reels in original quality?", answer: "The available download quality depends on the media provided by the supported public source. GrowthCaption does not guarantee a specific resolution." },
      { question: "Does it remove watermarks?", answer: "No. The tool does not claim to remove watermarks. The available media depends on the supported public source." }
    ]
  }
};

const BLOG_POST_DETAILS: Record<string, { title: string; excerpt: string; author: string; dateIso: string; image: string; summaryHtml: string }> = {
  '10-tips-for-the-perfect-instagram-bio': {
    title: "10 Tips for the Perfect Instagram Bio",
    excerpt: "Your bio is your profile introduction. Learn how to structure and format it to clearly introduce your profile.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-01",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Your Instagram bio serves as your profile introduction. In this guide, we break down 10 practical tips to structure a clear Instagram bio, including keyword placement, line-break formatting, call-to-action options, and link considerations.</p>`
  },
  'why-grid-layouts-boost-engagement': {
    title: "Why Grid Layouts Boost Engagement",
    excerpt: "Learn how planning your feed and organizing grid layouts can help create a cohesive profile appearance.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-02",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Visual consistency helps present a cohesive feed. Learn the principles behind Instagram grid layouts, multi-tile patterns, alternating post styles, and how feed planning helps organize upcoming content.</p>`
  },
  'ultimate-guide-instagram-captions-2026': {
    title: "The Ultimate Guide to Instagram Captions in 2026",
    excerpt: "An in-depth guide on caption length, opening lines, formatting, and practical copywriting techniques.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-03",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Explore best practices for writing Instagram captions, comparing concise text with detailed micro-blogs, emoji usage, descriptive keywords, and practical call-to-action strategies.</p>`
  },
  'how-to-save-instagram-reels-videos-safely': {
    title: "How to Save Instagram Reels & Videos Safely",
    excerpt: "Learn safe and practical methods to bookmark, organize, and download public Reels for research or offline reference.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-04",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Discover how to save and bookmark public Instagram Reels for offline reference, creative research, and inspiration using native features and web-based utilities.</p>`
  },
  'designing-reel-covers-that-get-clicked': {
    title: "Designing Reel Covers That Get Clicked",
    excerpt: "Learn how to design safe-zone compliant Reel covers that look balanced in both full-screen video feeds and on your profile grid.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-05",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Reel covers bridge the gap between video feeds and profile grid aesthetics. Learn safe-zone margins, high-contrast typography tips, and canvas dimensions for 9:16 thumbnails.</p>`
  },
  'how-to-build-cohesive-brand-kit': {
    title: "How to Build a Cohesive Brand Kit That Elevates Your Social Feed",
    excerpt: "Learn how to organize a simple brand kit with complementary colors, readable typography, and consistent voice.",
    author: "Bhagwan Dokhale",
    dateIso: "2026-08-06",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
    summaryHtml: `<p>Build a cohesive brand reference with complementary color palettes, clean font hierarchies, and consistent messaging guidelines across your social channels.</p>`
  }
};

export function renderPageHtml(pathname: string, templateHtml: string): PrerenderResult {
  const urlPath = (pathname || '/').split('?')[0].split('#')[0];
  const normalizedPath = urlPath.length > 1 && urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  const isRouteValid = isValidRoute(normalizedPath);
  const route = getRouteFromPath(normalizedPath);
  const canonicalUrl = `https://growthcaption.com${normalizedPath === '/' ? '/' : normalizedPath}`;

  let status = 200;
  let title = "Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption";
  let description = "Free Instagram Creator Tools for creating, organizing, and reusing social content.";
  let keywords = "Instagram Creator Tools, Instagram Caption Generator, Instagram Bio Generator, Hashtag Generator, Reels Downloader";
  let h1 = "Free Instagram Creator Tools";
  let intro = "Create, organize, and reuse social content with simple Instagram creator tools.";
  let robots = "index, follow";
  let customFaqs: FAQItem[] = [];
  let articleData: PageMeta['article'] = undefined;

  if (!isRouteValid || route.page === 'not-found') {
    status = 404;
    robots = "noindex, nofollow";
    title = "404 - Page Not Found | GrowthCaption";
    description = "The requested page could not be found on GrowthCaption. Explore our free Instagram creator tools and guides.";
    h1 = "Page Not Found (404)";
    intro = "The page you requested doesn't exist or has moved. Discover our popular Instagram creator tools below.";
  } else if (route.page === 'home') {
    if (normalizedPath === '/' || normalizedPath === '/home') {
      title = "Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption";
      description = "Free Instagram Creator Tools for creating, organizing, and reusing social content.";
      h1 = "Free Instagram Creator Tools";
      intro = "Create, organize, and reuse social content with simple Instagram creator tools.";
    } else {
      const meta = PAGE_META_MAP[route.tab] || PAGE_META_MAP['captions'];
      title = meta.title;
      description = meta.description;
      keywords = meta.keywords;
      h1 = meta.h1;
      intro = meta.intro;
      if (meta.faqs) customFaqs = meta.faqs;
    }
  } else if (route.page === 'blog') {
    if (route.blogSlug && BLOG_POST_DETAILS[route.blogSlug]) {
      const b = BLOG_POST_DETAILS[route.blogSlug];
      title = `${b.title} | GrowthCaption`;
      description = b.excerpt;
      h1 = b.title;
      intro = `By ${b.author} • Published on ${b.dateIso}`;
      articleData = {
        title: b.title,
        author: b.author,
        dateIso: b.dateIso,
        image: b.image,
        excerpt: b.excerpt,
        contentHtml: b.summaryHtml
      };
    } else {
      title = "Instagram Creator Blog & Guides | GrowthCaption";
      description = "Practical guides covering Instagram captions, bios, hashtags, visual content, branding, and content planning.";
      h1 = "GrowthCaption Blog & Guides";
      intro = "Explore practical guides on Instagram captioning, grid aesthetics, profile bio formatting, and visual content planning.";
    }
  } else if (route.page === 'how-to') {
    title = "How to Use GrowthCaption - Step-by-Step AI Guide";
    description = "Comprehensive step-by-step guides on using AI caption generators, hashtag tools, bio creators, and Reels downloaders.";
    h1 = "How to Use GrowthCaption AI Tools";
    intro = "Explore our free suite of AI tools and content utilities to help format and plan your social media content.";
  } else if (route.page === 'about') {
    title = "About GrowthCaption - Free AI Instagram Creator Suite";
    description = "Learn about GrowthCaption's mission to provide free AI tools for Instagram creators, brands, and influencers.";
    h1 = "About GrowthCaption";
    intro = "We build intuitive AI tools to help creators, marketers, and brands elevate their social media presence.";
  } else if (route.page === 'faq') {
    title = "Frequently Asked Questions | GrowthCaption";
    description = "Find answers to popular questions about AI Instagram caption generators, Reels downloads, hashtag limits, and account safety.";
    h1 = "Frequently Asked Questions";
    intro = "Have questions about our tools or features? Find fast answers below.";
  } else if (route.page === 'privacy') {
    title = "Privacy Policy | GrowthCaption";
    description = "Read GrowthCaption's privacy policy to understand how we respect user data privacy and media processing security.";
    h1 = "Privacy Policy";
    intro = "Your privacy is important to us. GrowthCaption operates with zero required logins and secure data practices.";
  } else if (route.page === 'terms') {
    title = "Terms & Conditions | GrowthCaption";
    description = "Terms of service and usage guidelines for GrowthCaption free web tools and services.";
    h1 = "Terms & Conditions";
    intro = "Please review the terms and conditions governing the use of GrowthCaption AI tools.";
  } else if (route.page === 'disclaimer') {
    title = "Disclaimer | GrowthCaption";
    description = "GrowthCaption media and content disclaimer regarding Instagram platform integration and public web tools.";
    h1 = "Disclaimer";
    intro = "GrowthCaption is an independent utility platform and is not affiliated with Instagram or Meta.";
  } else if (route.page === 'contact') {
    title = "Contact Us | GrowthCaption";
    description = "Get in touch with the GrowthCaption team for tool feedback, feature suggestions, or business inquiries.";
    h1 = "Contact Us";
    intro = "Have questions, suggestions, or feedback? We'd love to hear from you.";
  } else if (route.page === 'tools') {
    title = "Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption";
    description = "Explore free Instagram creator tools for captions, hashtags, bios, usernames, visual content, branding, and content planning.";
    keywords = "Instagram Creator Tools, Caption Generator, Bio Generator, Hashtag Generator, Username Generator, Reel Cover Maker, Brand Kit Generator";
    h1 = "Instagram Creator Tools";
    intro = "Free Instagram Creator Tools for creating, organizing, and reusing social content.";
  } else if (route.page === 'sitemap') {
    title = "HTML Sitemap | GrowthCaption";
    description = "Complete overview of all tools, guides, legal pages, and blog posts available on GrowthCaption.";
    h1 = "GrowthCaption Sitemap";
    intro = "Explore the full directory of free AI tools, blog guides, and resources.";
  } else if (route.page === 'workspace') {
    robots = "noindex, nofollow";
    title = "My Creator Workspace | GrowthCaption";
    description = "Save, organize, and reuse your favorite creator content in one local workspace.";
    h1 = "My Creator Workspace";
    intro = "Save, organize, and reuse your favorite creator content in one local workspace.";
  }

  // Build JSON-LD Schema graph
  const customSchemaList: object[] = [];
  if (articleData) {
    customSchemaList.push({
      "@type": "Article",
      "headline": articleData.title,
      "description": articleData.excerpt,
      "author": { 
        "@type": "Person", 
        "name": articleData.author,
        "image": "https://growthcaption.com/author-bhagwan.jpg"
      },
      "datePublished": articleData.dateIso,
      "image": articleData.image,
      "publisher": {
        "@type": "Organization",
        "name": "GrowthCaption",
        "logo": { "@type": "ImageObject", "url": "https://growthcaption.com/favicon.svg" }
      }
    });
  } else if (route.page === 'home' && normalizedPath !== '/' && normalizedPath !== '/home' && TOOL_SCHEMA_MAP[route.tab]) {
    const toolInfo = TOOL_SCHEMA_MAP[route.tab];
    customSchemaList.push({
      "@type": "WebApplication",
      "name": toolInfo.name,
      "url": canonicalUrl,
      "operatingSystem": "All",
      "applicationCategory": "SocialNetworkingApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": toolInfo.description
    });
  }

  const fullSchemaObj = buildSchemaGraph({
    canonicalUrl,
    faqs: customFaqs.length > 0 ? customFaqs : undefined,
    customSchema: customSchemaList.length > 0 ? customSchemaList : undefined
  });

  // Construct Prerendered Shell HTML inside #root
  const prerenderedBody = `
    <header style="background: #ffffff; border-bottom: 1px solid #e7e5e4; padding: 16px 24px;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
        <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0c0a09; font-weight: 800; font-size: 20px;">
          <img src="/logo.svg" alt="GrowthCaption Logo" width="32" height="32" style="width: 32px; height: 32px; border-radius: 8px; vertical-align: middle; object-fit: contain;" />
          <span>GrowthCaption</span>
        </a>
        <nav style="display: flex; gap: 16px; font-size: 14px; font-weight: 600;">
          <a href="/tools/caption-generator" style="color: #44403c; text-decoration: none;">Caption Generator</a>
          <a href="/tools/comment-generator" style="color: #44403c; text-decoration: none;">Comment Generator</a>
          <a href="/tools/hashtag-generator" style="color: #44403c; text-decoration: none;">Hashtag Generator</a>
          <a href="/tools/reels-downloader" style="color: #44403c; text-decoration: none;">Reels Downloader</a>
          <a href="/blog" style="color: #44403c; text-decoration: none;">Blog</a>
        </nav>
      </div>
    </header>

    <main style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
      <article>
        <h1 style="font-size: 36px; font-weight: 900; color: #0c0a09; margin-bottom: 16px; tracking: -0.02em;">${escapeHtml(h1)}</h1>
        <p style="font-size: 18px; color: #57534e; line-height: 1.6; margin-bottom: 32px;">${escapeHtml(intro)}</p>
        
        ${articleData ? `
          <div style="margin-bottom: 32px; border-radius: 16px; overflow: hidden; max-height: 400px;">
            <img src="${articleData.image}" alt="${escapeHtml(articleData.title)}" style="width: 100%; height: auto; object-fit: cover;" />
          </div>
          <div style="font-size: 16px; color: #292524; line-height: 1.8;">
            ${articleData.contentHtml}
          </div>
        ` : `
          <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #1c1917; margin-bottom: 12px;">Tool Overview & Highlights</h2>
            <ul style="color: #44403c; line-height: 1.8; margin-left: 20px;">
              <li>100% Free AI Generator - No account or credit card required.</li>
              <li>Instant results with customizable tone, formatting, and options.</li>
              <li>Mobile-responsive interface built for creators and social media managers.</li>
            </ul>
          </div>
        `}

        ${customFaqs.length > 0 ? `
          <section style="margin-top: 40px;">
            <h2 style="font-size: 24px; font-weight: 800; color: #0c0a09; margin-bottom: 20px;">Frequently Asked Questions</h2>
            ${customFaqs.map(faq => `
              <div style="margin-bottom: 16px; padding: 16px; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #1c1917; margin-bottom: 6px;">${escapeHtml(faq.question)}</h3>
                <p style="font-size: 14px; color: #57534e; line-height: 1.5;">${escapeHtml(faq.answer)}</p>
              </div>
            `).join('')}
          </section>
        ` : ''}
      </article>

      <section style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e7e5e4;">
        <h2 style="font-size: 18px; font-weight: 700; color: #1c1917; margin-bottom: 16px;">Popular Instagram Tools</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">
          <a href="/tools/caption-generator" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">✨ Caption Generator</a>
          <a href="/tools/comment-generator" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">💬 Comment Generator</a>
          <a href="/tools/hashtag-generator" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">#️⃣ Hashtag Generator</a>
          <a href="/tools/bio-generator" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">👤 Bio Generator</a>
          <a href="/tools/reels-downloader" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">📥 Reels Downloader</a>
          <a href="/tools/photo-resizer" style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 10px; text-decoration: none; color: #1c1917; font-weight: 600;">🖼️ Photo Resizer</a>
        </div>
      </section>
    </main>

    <footer style="background: #fafaf9; border-top: 1px solid #e7e5e4; padding: 32px 24px; margin-top: 60px; font-size: 14px; color: #78716c; text-align: center;">
      <p style="margin-bottom: 8px;">© 2026 GrowthCaption. Free Instagram Creator Tools.</p>
      <p style="display: flex; gap: 16px; justify-center: center; flex-wrap: wrap;">
        <a href="/about-us" style="color: #57534e; text-decoration: none;">About Us</a> •
        <a href="/how-to-use" style="color: #57534e; text-decoration: none;">How to Use</a> •
        <a href="/faq" style="color: #57534e; text-decoration: none;">FAQ</a> •
        <a href="/privacy-policy" style="color: #57534e; text-decoration: none;">Privacy Policy</a> •
        <a href="/terms-and-conditions" style="color: #57534e; text-decoration: none;">Terms & Conditions</a> •
        <a href="/sitemap" style="color: #57534e; text-decoration: none;">Sitemap</a>
      </p>
    </footer>
  `;

  // Start injecting into templateHtml
  let html = templateHtml;

  // Title replacement
  if (html.includes('<title>')) {
    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  } else {
    html = html.replace('</head>', `  <title>${escapeHtml(title)}</title>\n</head>`);
  }

  // Description replacement
  if (html.includes('name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeHtml(description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
  }

  // Keywords replacement
  if (html.includes('name="keywords"')) {
    html = html.replace(/<meta name="keywords" content=".*?" \/>/s, `<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  }

  // Robots replacement
  const robotsRegex = /<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/is;
  if (html.match(robotsRegex)) {
    html = html.replace(robotsRegex, `<meta name="robots" content="${robots}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="robots" content="${robots}" />\n</head>`);
  }

  // Canonical replacement
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // OpenGraph Tags replacement
  html = updateMetaProperty(html, 'og:title', title);
  html = updateMetaProperty(html, 'og:description', description);
  html = updateMetaProperty(html, 'og:url', canonicalUrl);

  // Twitter Tags replacement
  html = updateMetaName(html, 'twitter:title', title);
  html = updateMetaName(html, 'twitter:description', description);

  // Schema Markup injection
  const schemaScriptTag = `<script type="application/ld+json" id="schema-markup">\n${JSON.stringify(fullSchemaObj, null, 2)}\n</script>`;
  if (html.includes('id="schema-markup"')) {
    html = html.replace(/<script type="application\/ld\+json" id="schema-markup">.*?<\/script>/s, schemaScriptTag);
  } else {
    html = html.replace('</head>', `  ${schemaScriptTag}\n</head>`);
  }

  // Inlining prerendered HTML into <div id="root"></div>
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);
  } else if (html.includes('<div id="root">')) {
    html = html.replace(/<div id="root">.*?<\/div>/s, `<div id="root">${prerenderedBody}</div>`);
  }

  return { html, status };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateMetaProperty(html: string, property: string, content: string): string {
  const metaRegex = new RegExp(`<meta property="${property}" content=".*?" \\/>`, 's');
  if (html.match(metaRegex)) {
    return html.replace(metaRegex, `<meta property="${property}" content="${escapeHtml(content)}" />`);
  }
  return html.replace('</head>', `  <meta property="${property}" content="${escapeHtml(content)}" />\n</head>`);
}

function updateMetaName(html: string, name: string, content: string): string {
  const metaRegex = new RegExp(`<meta name="${name}" content=".*?" \\/>`, 's');
  if (html.match(metaRegex)) {
    return html.replace(metaRegex, `<meta name="${name}" content="${escapeHtml(content)}" />`);
  }
  return html.replace('</head>', `  <meta name="${name}" content="${escapeHtml(content)}" />\n</head>`);
}

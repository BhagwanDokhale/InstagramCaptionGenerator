import { useState } from 'react';
import { BookOpen, User, ArrowLeft, Clock, Share2, Sparkles, Globe, Mail, Camera } from 'lucide-react';
import { SEO } from './SEO';
import { PageType } from '../types';
import { navigateTo, TabType } from '../lib/navigation';
import { BioArticle } from './blog/BioArticle';
import { GridArticle } from './blog/GridArticle';
import { CaptionsArticle } from './blog/CaptionsArticle';
import { ReelsArticle } from './blog/ReelsArticle';
import { ReelCoversArticle } from './blog/ReelCoversArticle';
import { BrandKitArticle } from './blog/BrandKitArticle';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateIso?: string;
  excerpt: string;
  image: string;
  imageSource: string;
  alt: string;
  readingTime: string;
  author: string;
  wordCount: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "10-tips-for-the-perfect-instagram-bio",
    title: "10 Tips for the Perfect Instagram Bio",
    date: "Aug 01, 2026",
    dateIso: "2026-08-01",
    excerpt: "Your bio is your profile introduction. Learn how to structure and format it to clearly introduce your profile.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Georgia de Lotz",
    alt: "Example Instagram Caption Generator - Woman looking at her phone instagram bio",
    readingTime: "10 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1950
  },
  {
    slug: "why-grid-layouts-boost-engagement",
    title: "Why Grid Layouts Boost Engagement",
    date: "Aug 02, 2026",
    dateIso: "2026-08-02",
    excerpt: "Discover the design principles behind grid layouts and how planning your feed helps create a cohesive visual profile.",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Alexander Shatov",
    alt: "Example Instagram Caption Generator - Instagram grid layout on phone screen",
    readingTime: "9 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1920
  },
  {
    slug: "ultimate-guide-instagram-captions-2026",
    title: "The Ultimate Guide to Instagram Captions in 2026",
    date: "Aug 03, 2026",
    dateIso: "2026-08-03",
    excerpt: "Explore whether short captions or longer micro-blog posts work best for different types of social content.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Magnet.me",
    alt: "Example Instagram Caption Generator - Person typing social media captions on their phone",
    readingTime: "10 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1980
  },
  {
    slug: "how-to-save-instagram-reels-videos-safely",
    title: "How to Save Instagram Reels & Videos Safely",
    date: "Aug 04, 2026",
    dateIso: "2026-08-04",
    excerpt: "Reels are dominating attention. Learn the safest, simplest methods to download and save public Reels for references, content research, or offline enjoyment.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Solen Feyissa",
    alt: "Example Instagram Caption Generator - Instagram Reels screen on mobile device",
    readingTime: "9 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1890
  },
  {
    slug: "designing-reel-covers-that-get-clicked",
    title: "Designing Reel Covers That Get Clicked",
    date: "Aug 05, 2026",
    dateIso: "2026-08-05",
    excerpt: "Learn how to design clear, safe-zone compliant Reel covers that look great on the explore feed and your main profile grid.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Milad Fakurian",
    alt: "Example Instagram Caption Generator - Vibrant neon-hued gradient design representing aesthetic Reel Covers",
    readingTime: "9 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1910
  },
  {
    slug: "how-to-build-cohesive-brand-kit",
    title: "How to Build a Cohesive Brand Kit That Elevates Your Social Feed",
    date: "Aug 06, 2026",
    dateIso: "2026-08-06",
    excerpt: "Establishing a consistent identity doesn't require a design degree. Discover how to pair colors, choose typography, and set a distinct brand voice.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
    imageSource: "Unsplash / Photo by Med Badr Chemmaoui",
    alt: "Example Instagram Caption Generator - Curated brand identity design board with color samples and swatches",
    readingTime: "10 min read",
    author: "Bhagwan Dokhale",
    wordCount: 1960
  }
];

interface BlogPageProps {
  blogSlug?: string;
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function BlogPage({ blogSlug }: BlogPageProps) {
  const [copied, setCopied] = useState(false);
  const posts = BLOG_POSTS;
  const activePostIndex = blogSlug ? posts.findIndex(p => p.slug === blogSlug) : -1;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getArticleRenderer = (index: number) => {
    switch (index) {
      case 0:
        return <BioArticle />;
      case 1:
        return <GridArticle />;
      case 2:
        return <CaptionsArticle />;
      case 3:
        return <ReelsArticle />;
      case 4:
        return <ReelCoversArticle />;
      case 5:
        return <BrandKitArticle />;
      default:
        return <p>Article content coming soon.</p>;
    }
  };

  if (activePostIndex !== -1) {
    const post = posts[activePostIndex];
    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://growthcaption.com/blog/${post.slug}`;
    
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-8 md:py-14">
        <SEO 
          title={`${post.title} | GrowthCaption`}
          description={post.excerpt}
          url={`https://growthcaption.com/blog/${post.slug}`}
          schemaMarkup={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": [post.image],
            "author": {
              "@type": "Person",
              "name": post.author,
              "image": "https://growthcaption.com/author-bhagwan.jpg",
              "jobTitle": "Creator of GrowthCaption"
            },
            "publisher": {
              "@type": "Organization",
              "name": "GrowthCaption",
              "url": "https://growthcaption.com"
            },
            "datePublished": post.dateIso || "2026-08-01",
            "wordCount": post.wordCount,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": postUrl
            }
          }}
        />
        
        {/* Back Button */}
        <a 
          href="/blog"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigateTo('/blog');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 text-xs font-medium transition-colors mb-6 border border-stone-200 bg-white shadow-2xs"
        >
          <ArrowLeft size={13} />
          <span>Back to Articles</span>
        </a>

        {/* Hero banner */}
        <figure className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-100 mb-2 relative">
          <img 
            src={post.image} 
            alt={post.alt || post.title} 
            loading="lazy" 
            decoding="async" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </figure>

        {/* Image Attribution */}
        <p className="text-[11px] text-stone-400 font-normal mb-5 text-right flex items-center justify-end gap-1">
          <Camera size={11} className="text-stone-400 shrink-0" />
          <span>Source: {post.imageSource}</span>
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500 mb-5 border-b border-stone-200 pb-4">
          <span className="font-medium text-stone-700">{post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={12} className="text-stone-400" /> {post.readingTime}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <img 
              src="/author-bhagwan.jpg" 
              alt={post.author} 
              className="w-4 h-4 rounded-full object-cover border border-stone-200 shrink-0" 
              loading="lazy" 
              referrerPolicy="no-referrer" 
            />
            <span>{post.author}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-950 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <article className="prose max-w-none text-stone-800 text-sm leading-relaxed mb-10">
          {getArticleRenderer(activePostIndex)}
        </article>

        {/* Author Box */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
            <img 
              id="blog-author-avatar"
              src="/author-bhagwan.jpg" 
              alt="Bhagwan Dokhale - Creator of GrowthCaption"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Author</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 leading-tight">
                Bhagwan Dokhale
              </h3>
              <p className="text-xs text-stone-500">
                Creator of GrowthCaption
              </p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Building practical software utilities to help creators and marketers design and scale social content.
            </p>
            <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
              <a 
                href="https://growthcaption.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 hover:text-stone-900 transition-colors"
              >
                <Globe size={12} className="text-stone-400" />
                <span>growthcaption.com</span>
              </a>
              <a 
                href="mailto:bhagwan5.dokhale@gmail.com" 
                className="flex items-center gap-1 hover:text-stone-900 transition-colors"
              >
                <Mail size={12} className="text-stone-400" />
                <span>bhagwan5.dokhale@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sharing and call to actions */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button 
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
          >
            <Share2 size={13} />
            <span>{copied ? 'Link Copied' : 'Share Article'}</span>
          </button>

          <a 
            href="/tools/caption-generator"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              navigateTo('/tools/caption-generator');
            }}
            className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors cursor-pointer"
          >
            <Sparkles size={14} className="text-stone-700 shrink-0" />
            <p className="text-xs text-stone-700">
              Explore our <span className="font-semibold text-stone-900 underline">AI creator utilities</span>
            </p>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-10 md:py-16">
      <SEO 
        title="Instagram Creator Blog & Guides | GrowthCaption"
        description="Practical guides covering Instagram captions, bios, hashtags, visual content, branding, and content planning."
        url="https://growthcaption.com/blog"
      />
      <div className="text-left mb-8 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <BookOpen size={14} className="text-stone-700" />
          <span>Guides & Resources</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Creator Guides & Strategy
        </h1>
        <p className="text-stone-500 text-sm max-w-xl">
          Practical tutorials covering caption writing, bio design, hashtag research, visual brand identity, and feed layout planning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <a 
            key={i} 
            href={`/blog/${post.slug}`}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              navigateTo(`/blog/${post.slug}`);
            }}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs relative flex flex-col overflow-hidden hover:border-stone-300 transition-colors cursor-pointer group"
          >
            <figure className="aspect-video w-full border-b border-stone-100 bg-stone-100 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.alt || post.title} 
                loading="lazy" 
                decoding="async" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
              />
            </figure>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-medium text-stone-500">{post.date}</span>
                <span className="text-[10px] text-stone-500 px-2 py-0.5 bg-stone-100 rounded">{post.readingTime}</span>
              </div>
              <h2 className="text-sm font-semibold text-stone-900 mb-1.5 leading-snug group-hover:text-stone-700 transition-colors">{post.title}</h2>
              <p className="text-xs text-stone-500 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
              
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                    <img 
                      src="/author-bhagwan.jpg" 
                      alt={post.author} 
                      className="w-full h-full object-cover object-center" 
                      loading="lazy" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <span className="text-xs text-stone-700 font-medium">{post.author}</span>
                </div>
                <span className="text-xs font-semibold text-stone-900 group-hover:underline">Read →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

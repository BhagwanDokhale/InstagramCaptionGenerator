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
      <div className="max-w-3xl mx-auto w-full px-4 py-8 md:py-16">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 text-sm font-bold transition-all mb-8 cursor-pointer border border-stone-200/50 bg-white"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </a>

        {/* Hero banner */}
        <figure className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 mb-2 relative">
          <img 
            src={post.image} 
            alt={post.alt || `Example Instagram Caption Generator - Featured image for article ${post.title}`} 
            loading="lazy" 
            decoding="async" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </figure>

        {/* Image Attribution */}
        <p className="text-[11px] text-stone-500 font-medium mb-6 text-right italic flex items-center justify-end gap-1">
          <Camera size={12} className="text-stone-400 shrink-0" />
          <span>Image Source: {post.imageSource}</span>
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-stone-500 mb-6 border-b border-stone-200/80 pb-6">
          <span className="text-rose-500 uppercase tracking-widest">{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-stone-400" /> {post.readingTime}</span>
          <span className="flex items-center gap-2">
            <img 
              src="/author-bhagwan.jpg" 
              alt={post.author} 
              className="w-5 h-5 rounded-full object-cover border border-stone-200 shadow-2xs shrink-0" 
              loading="lazy" 
              referrerPolicy="no-referrer" 
            />
            <span>By {post.author}</span>
          </span>
          <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-[10px]">{post.wordCount} words</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-stone-950 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <article className="prose max-w-none text-stone-800 mb-12">
          {getArticleRenderer(activePostIndex)}
        </article>

        {/* Author Box */}
        <div className="bg-stone-50 rounded-3xl border border-stone-200/80 p-6 md:p-8 mb-12 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-stone-200 shadow-sm shrink-0 bg-stone-100">
            <img 
              id="blog-author-avatar"
              src="/author-bhagwan.jpg" 
              alt="Bhagwan Dokhale - Creator of GrowthCaption"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">About the Author</span>
            </div>
            <div>
              <h3 className="text-lg font-sans font-extrabold text-stone-900 leading-tight">
                Bhagwan Dokhale
              </h3>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">
                Creator of GrowthCaption
              </p>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
              I create practical tools and resources to help creators, social media managers and businesses improve their social media content.
            </p>
            <div className="pt-3 border-t border-stone-200/60 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-stone-600">
              <a 
                href="https://growthcaption.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
              >
                <Globe size={14} className="text-stone-400" />
                <span>growthCaption.com</span>
              </a>
              <a 
                href="mailto:bhagwan5.dokhale@gmail.com" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
              >
                <Mail size={14} className="text-stone-400" />
                <span>bhagwan5.dokhale@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sharing and call to actions */}
        <div className="pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <button 
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100/50 text-sm font-bold transition-all cursor-pointer"
          >
            <Share2 size={16} />
            {copied ? 'Link Copied!' : 'Share Article'}
          </button>

          <a 
            href="/tools/caption-generator"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              navigateTo('/tools/caption-generator');
            }}
            className="flex items-center gap-3 bg-gradient-to-r from-rose-50 to-indigo-50/50 p-4 rounded-2xl border border-indigo-100/30 hover:border-indigo-200 transition-all cursor-pointer"
          >
            <Sparkles size={18} className="text-rose-500 animate-pulse shrink-0" />
            <p className="text-xs font-bold text-stone-700">
              Need ideas? Use our <span className="text-indigo-600">AI caption and bio generator</span> tools on the home page!
            </p>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="Instagram Creator Blog & Guides | GrowthCaption"
        description="Practical guides covering Instagram captions, bios, hashtags, visual content, branding, and content planning."
        url="https://growthcaption.com/blog"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Creator Blog & Guides
        </h1>
        <p className="text-stone-500 font-medium text-base md:text-lg flex items-center justify-center gap-2">
          <BookOpen size={18} className="text-indigo-600" /> Practical guides covering captions, bios, hashtags, branding, and feed planning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <a 
            key={i} 
            href={`/blog/${post.slug}`}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              navigateTo(`/blog/${post.slug}`);
            }}
            className="bg-white rounded-3xl border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative flex flex-col overflow-hidden hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <figure className="aspect-video w-full border-b border-stone-100 bg-stone-100 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.alt || `Example Instagram Caption Generator - Blog card thumbnail for ${post.title}`} 
                loading="lazy" 
                decoding="async" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </figure>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">{post.date}</span>
                <span className="text-[10px] font-bold font-mono px-2.5 py-1 bg-indigo-50/50 text-indigo-700 rounded-lg border border-indigo-100/40">{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-bold text-stone-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{post.title}</h2>
              <p className="text-xs font-medium text-stone-500 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
              
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-stone-200/80 shadow-2xs shrink-0 bg-stone-100">
                    <img 
                      src="/author-bhagwan.jpg" 
                      alt={post.author} 
                      className="w-full h-full object-cover object-center" 
                      loading="lazy" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <span className="text-xs font-bold text-stone-850">{post.author}</span>
                </div>
                <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 underline">Read Article</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

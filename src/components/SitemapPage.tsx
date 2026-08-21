import React from 'react';
import { Compass, Sparkles, Shield, Info, Link as LinkIcon, ArrowRight, BookOpen } from 'lucide-react';
import { PageType } from '../types';
import { SEO } from './SEO';
import { navigateTo, getHref, TabType } from '../lib/navigation';
import { BLOG_POSTS } from './BlogPage';

interface SitemapPageProps {
  setActivePage: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function SitemapPage({ setActivePage, setActiveTab }: SitemapPageProps) {
  const handleLinkClick = (href: string, page?: PageType, tab?: TabType) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (tab && setActiveTab) {
      setActiveTab(tab);
    }
    if (page && setActivePage) {
      setActivePage(page);
    }
    navigateTo(href);
  };

  const mainPages = [
    { name: 'Home Page', desc: 'Main hub with all generative and visual social media tools.', page: 'home' as PageType, href: '/' },
    { name: 'Tools Directory', desc: 'Overview of all free Instagram creator tools.', page: 'tools' as PageType, href: '/tools' },
    { name: 'How to Use', desc: 'A step-by-step tutorial guide on mastering our tools.', page: 'how-to' as PageType, href: '/how-to-use' },
    { name: 'About Us', desc: 'Our mission, background story, and creative vision.', page: 'about' as PageType, href: '/about-us' },
    { name: 'Blog Hub', desc: 'Deep-dive tips, trends, and tutorials for creators.', page: 'blog' as PageType, href: '/blog' },
    { name: 'FAQ', desc: 'Frequently asked questions about captions, formatting, and downloads.', page: 'faq' as PageType, href: '/faq' },
    { name: 'Contact Us', desc: 'Get in touch with support or share your suggestions.', page: 'contact' as PageType, href: '/contact' }
  ];

  const blogArticles = BLOG_POSTS.map(post => ({
    name: post.title,
    desc: post.excerpt,
    href: `/blog/${post.slug}`
  }));

  const tools = [
    { name: 'Caption Generator', desc: 'AI-generated captions tailored to your custom topics and niches.', tab: 'captions' as const, href: '/tools/caption-generator' },
    { name: 'Comment Generator', desc: 'AI-generated authentic, witty, and supportive Instagram comments for posts and reels.', tab: 'comments' as const, href: '/tools/comment-generator' },
    { name: 'Hashtag Generator', desc: 'AI-generated, categorized hashtag collections to optimize organic visibility.', tab: 'hashtags' as const, href: '/tools/hashtag-generator' },
    { name: 'ALT Text Generator', desc: 'AI-generated professional, accessible, and search-optimized image Alt Texts.', tab: 'alttext' as const, href: '/tools/alt-text-generator' },
    { name: 'Reel Cover Maker', desc: 'Design aesthetic 9:16 Reel Covers with custom gradients, premium fonts, and a 1:1 safe-zone guide.', tab: 'cover' as const, href: '/tools/reel-cover-maker' },
    { name: 'Brand Kit Generator', desc: 'Formulate bespoke brand style guides, dynamic color palettes, typography matches, and copy templates.', tab: 'brandkit' as const, href: '/tools/brand-kit-generator' },
    { name: 'Bio Generator', desc: 'Craft personalized profile biography suggestions with distinct tones.', tab: 'bios' as const, href: '/tools/bio-generator' },
    { name: 'Username Generator', desc: 'Generate creative, memorable Instagram username ideas tailored to your niche.', tab: 'usernames' as const, href: '/tools/username-generator' },
    { name: 'Photo Resizer', desc: 'Perfectly crop and format images for stories, posts, or profiles.', tab: 'resizer' as const, href: '/tools/photo-resizer' },
    { name: 'Grid Maker', desc: 'Split single photos into stunning 3x1, 3x2, or 3x3 profile grids.', tab: 'grid' as const, href: '/tools/grid-maker' },
    { name: 'Feed Planner', desc: 'Drag-and-drop feed visualizer to plan your profile aesthetic.', tab: 'planner' as const, href: '/tools/feed-planner' },
    { name: 'Reels Downloader', desc: 'Download available media from supported public Reels, videos, and carousel posts without an account login.', tab: 'downloader' as const, href: '/tools/reels-downloader' }
  ];

  const legalPages = [
    { name: 'Disclaimer', desc: 'Disclosures on independent operation, AI output review, and media downloader rights.', page: 'disclaimer' as PageType, href: '/disclaimer' },
    { name: 'Privacy Policy', desc: 'How we process data and safeguard your privacy.', page: 'privacy' as PageType, href: '/privacy-policy' },
    { name: 'Terms & Conditions', desc: 'Rules, guidelines, and terms governing our platform usage.', page: 'terms' as PageType, href: '/terms-and-conditions' }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="HTML Sitemap | GrowthCaption"
        description="Complete overview of all tools, guides, legal pages, and blog posts available on GrowthCaption."
        url="https://growthcaption.com/sitemap"
      />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Sitemap
        </h1>
        <p className="text-stone-500 font-medium text-base md:text-lg flex items-center justify-center gap-2">
          <Compass size={18} className="text-indigo-600" /> A comprehensive overview of everything on GrowthCaption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Main Pages */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3 border-b border-stone-100 pb-3">
            <Info className="text-indigo-600" size={20} />
            Main Pages & Content
          </h2>
          <ul className="space-y-4">
            {mainPages.map((item) => (
              <li key={item.name} className="group">
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, item.page)}
                  className="w-full text-left p-3.5 rounded-2xl border border-transparent hover:border-stone-200/60 hover:bg-stone-50/50 transition-all flex items-start gap-3.5 cursor-pointer block"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 transition-transform">
                    <LinkIcon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                      <ArrowRight size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Generative & Visual Tools */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3 border-b border-stone-100 pb-3">
            <Sparkles className="text-rose-500 animate-pulse" size={20} />
            AI & Social Media Tools
          </h2>
          <ul className="space-y-4">
            {tools.map((item) => (
              <li key={item.name} className="group">
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, 'home', item.tab)}
                  className="w-full text-left p-3.5 rounded-2xl border border-transparent hover:border-stone-200/60 hover:bg-stone-50/50 transition-all flex items-start gap-3.5 cursor-pointer block"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 group-hover:scale-105 transition-transform">
                    <LinkIcon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                      <ArrowRight size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Legal & Compliance */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:col-span-2">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3 border-b border-stone-100 pb-3">
            <BookOpen className="text-violet-600" size={20} />
            Blog Articles & Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogArticles.map((item) => (
              <div key={item.name} className="group">
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, 'blog')}
                  className="w-full text-left p-3.5 rounded-2xl border border-transparent hover:border-stone-200/60 hover:bg-stone-50/50 transition-all flex items-start gap-3.5 cursor-pointer block"
                >
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 group-hover:scale-105 transition-transform">
                    <LinkIcon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                      <ArrowRight size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Legal & Compliance */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:col-span-2">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-3 border-b border-stone-100 pb-3">
            <Shield className="text-emerald-600" size={20} />
            Legal & Trust
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legalPages.map((item) => (
              <div key={item.name} className="group">
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, item.page)}
                  className="w-full text-left p-3.5 rounded-2xl border border-transparent hover:border-stone-200/60 hover:bg-stone-50/50 transition-all flex items-start gap-3.5 cursor-pointer block"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                    <LinkIcon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                      <ArrowRight size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}


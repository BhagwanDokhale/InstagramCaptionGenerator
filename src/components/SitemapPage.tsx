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
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-14 space-y-8">
      <SEO 
        title="HTML Sitemap | GrowthCaption"
        description="Complete overview of all tools, guides, legal pages, and blog posts available on GrowthCaption."
        url="https://growthcaption.com/sitemap"
      />
      
      {/* Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <Compass size={14} className="text-stone-700" />
          <span>Site Directory</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Sitemap
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-xl">
          Complete index of all generator tools, documentation tutorials, blog guides, and policy resources on GrowthCaption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Pages */}
        <section className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2 border-b border-stone-100 pb-2.5">
            <Info className="text-stone-600" size={14} />
            <span>Main Pages & Navigation</span>
          </h2>
          <ul className="space-y-1.5">
            {mainPages.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, item.page)}
                  className="p-2.5 rounded-lg border border-transparent hover:border-stone-200 hover:bg-stone-50 transition-colors flex items-start gap-2.5 cursor-pointer block group"
                >
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                    <LinkIcon size={12} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-900 group-hover:text-stone-950">
                        {item.name}
                      </span>
                      <ArrowRight size={11} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Generative & Visual Tools */}
        <section className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2 border-b border-stone-100 pb-2.5">
            <Sparkles className="text-stone-600" size={14} />
            <span>Creator Tools & Utilities</span>
          </h2>
          <ul className="space-y-1.5">
            {tools.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, 'home', item.tab)}
                  className="p-2.5 rounded-lg border border-transparent hover:border-stone-200 hover:bg-stone-50 transition-colors flex items-start gap-2.5 cursor-pointer block group"
                >
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                    <LinkIcon size={12} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-900 group-hover:text-stone-950">
                        {item.name}
                      </span>
                      <ArrowRight size={11} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog Articles */}
        <section className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs space-y-4 md:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2 border-b border-stone-100 pb-2.5">
            <BookOpen className="text-stone-600" size={14} />
            <span>Blog Articles & Guides</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {blogArticles.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, 'blog')}
                  className="p-2.5 rounded-lg border border-transparent hover:border-stone-200 hover:bg-stone-50 transition-colors flex items-start gap-2.5 cursor-pointer block group"
                >
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                    <LinkIcon size={12} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-900 group-hover:text-stone-950">
                        {item.name}
                      </span>
                      <ArrowRight size={11} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Legal & Trust */}
        <section className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs space-y-4 md:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2 border-b border-stone-100 pb-2.5">
            <Shield className="text-stone-600" size={14} />
            <span>Legal & Privacy Policies</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {legalPages.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  onClick={handleLinkClick(item.href, item.page)}
                  className="p-2.5 rounded-lg border border-transparent hover:border-stone-200 hover:bg-stone-50 transition-colors flex items-start gap-2.5 cursor-pointer block group"
                >
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                    <LinkIcon size={12} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-900 group-hover:text-stone-950">
                        {item.name}
                      </span>
                      <ArrowRight size={11} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
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

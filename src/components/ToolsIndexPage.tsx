import React from 'react';
import { Sparkles, MessageSquare, MessageCircle, Hash, Eye, Smartphone, Palette, User, Minimize, Grid, Calendar, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageType } from '../types';
import { SEO } from './SEO';
import { Breadcrumbs } from './Breadcrumbs';
import { navigateTo, TabType } from '../lib/navigation';

interface ToolsIndexPageProps {
  setActivePage: (page: PageType) => void;
  setActiveTab: (tab: TabType) => void;
}

export function ToolsIndexPage({ setActivePage, setActiveTab }: ToolsIndexPageProps) {
  const handleToolClick = (href: string, tab: TabType) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    setActiveTab(tab);
    setActivePage('home');
    navigateTo(href);
  };

  const toolsList = [
    {
      name: 'AI Caption Generator',
      desc: 'Generate engaging Instagram caption drafts tailored to your post topic, target tone, and audience style.',
      href: '/tools/caption-generator',
      tab: 'captions' as const,
      icon: MessageSquare,
      color: 'text-rose-500 bg-rose-50 border-rose-100',
      category: 'Content Generation'
    },
    {
      name: 'AI Comment Generator',
      desc: 'Generate thoughtful, supportive comment ideas for Instagram posts and Reels in multiple languages.',
      href: '/tools/comment-generator',
      tab: 'comments' as const,
      icon: MessageCircle,
      color: 'text-pink-500 bg-pink-50 border-pink-100',
      category: 'Engagement & Community'
    },
    {
      name: 'AI Hashtag Generator',
      desc: 'Find relevant Instagram hashtags grouped by popularity and niche focus to optimize post discoverability.',
      href: '/tools/hashtag-generator',
      tab: 'hashtags' as const,
      icon: Hash,
      color: 'text-violet-500 bg-violet-50 border-violet-100',
        category: 'Discovery & Hashtags'
    },
    {
      name: 'AI ALT Text Generator',
      desc: 'Create clear, descriptive image alt text to improve accessibility and image indexing for Instagram posts.',
      href: '/tools/alt-text-generator',
      tab: 'alttext' as const,
      icon: Eye,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
      category: 'Accessibility & Descriptions'
    },
    {
      name: 'Instagram Reel Cover Maker',
      desc: 'Design 9:16 vertical Reel covers with visual safe-zone guides so text stays visible in the 1:1 profile grid.',
      href: '/tools/reel-cover-maker',
      tab: 'cover' as const,
      icon: Smartphone,
      color: 'text-purple-500 bg-purple-50 border-purple-100',
      category: 'Graphics & Layout'
    },
    {
      name: 'AI Brand Kit Generator',
      desc: 'Build cohesive color palettes, font pairs, taglines, and brand voice guidelines for your Instagram profile.',
      href: '/tools/brand-kit-generator',
      tab: 'brandkit' as const,
      icon: Palette,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      category: 'Branding & Aesthetics'
    },
    {
      name: 'AI Bio Generator',
      desc: 'Create clean, structured Instagram bio suggestions complete with line breaks and call-to-action ideas.',
      href: '/tools/bio-generator',
      tab: 'bios' as const,
      icon: User,
      color: 'text-amber-500 bg-amber-50 border-amber-100',
      category: 'Profile Setup'
    },
    {
      name: 'AI Username Generator',
      desc: 'Generate creative, memorable Instagram username ideas tailored to your niche.',
      href: '/tools/username-generator',
      tab: 'usernames' as const,
      icon: User,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
      category: 'Profile Setup'
    },
    {
      name: 'Instagram Photo Resizer',
      desc: 'Resize and crop photos for Instagram feed posts (1:1, 4:5), Stories (9:16), and profile avatars.',
      href: '/tools/photo-resizer',
      tab: 'resizer' as const,
      icon: Minimize,
      color: 'text-sky-500 bg-sky-50 border-sky-100',
      category: 'Image Formatting'
    },
    {
      name: 'Instagram Grid Maker',
      desc: 'Split panoramic photos into seamless 3x1 or 3x3 grid tile layouts for your Instagram profile.',
      href: '/tools/grid-maker',
      tab: 'grid' as const,
      icon: Grid,
      color: 'text-cyan-500 bg-cyan-50 border-cyan-100',
      category: 'Grid Aesthetics'
    },
    {
      name: 'Instagram Feed Planner',
      desc: 'Preview and arrange upcoming feed posts using a visual drag-and-drop grid simulator.',
      href: '/tools/feed-planner',
      tab: 'planner' as const,
      icon: Calendar,
      color: 'text-teal-500 bg-teal-50 border-teal-100',
      category: 'Feed Planning'
    },
    {
      name: 'Instagram Reels Downloader',
      desc: 'Download available media from supported public Instagram Reels, videos, and carousel posts without requiring an Instagram login.',
      href: '/tools/reels-downloader',
      tab: 'downloader' as const,
      icon: Download,
      color: 'text-pink-500 bg-pink-50 border-pink-100',
      category: 'Media Utilities'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 w-full">
      <SEO 
        title="Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption"
        description="Explore free Instagram creator tools for captions, hashtags, bios, usernames, visual content, branding, and content planning."
        url="https://growthcaption.com/tools"
      />

      <Breadcrumbs setActivePage={setActivePage} setActiveTab={setActiveTab} />

      {/* Header */}
      <header className="text-center mb-14 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm shadow-indigo-100/10 border border-white/80 bg-gradient-to-r from-rose-50/80 via-white/90 to-indigo-50/80">
          <Sparkles size={14} className="text-rose-500 animate-pulse" />
          <span>GrowthCaption Creator Suite</span>
        </div>
        <h1 className="text-4xl md:text-5.5xl font-display font-extrabold tracking-tight text-stone-950 mb-4 max-w-3xl leading-[1.1]">
          Instagram Creator Tools
        </h1>
        <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Free Instagram Creator Tools for creating, organizing, and reusing social content.
        </p>
      </header>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {toolsList.map((tool) => {
          const Icon = tool.icon;
          return (
            <a
              key={tool.tab}
              href={tool.href}
              onClick={handleToolClick(tool.href, tool.tab)}
              className="group glass-card p-6 rounded-3xl border border-stone-200/80 bg-white/70 hover:bg-white hover:border-indigo-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${tool.color} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {tool.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-stone-900 group-hover:text-indigo-600 transition-colors mb-2">
                  {tool.name}
                </h2>
                <p className="text-stone-500 text-xs leading-relaxed font-normal mb-6">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700 pt-3 border-t border-stone-100">
                <span>Open Tool</span>
                <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Trust & Features Section */}
      <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/80 bg-white/60 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Free, Fast & No Registration Required
        </h2>
        <p className="text-stone-500 text-sm leading-relaxed max-w-xl mx-auto">
          All GrowthCaption tools are free to use directly in your browser. No sign-ups, no subscriptions, and no hidden fees.
        </p>
      </div>
    </div>
  );
}

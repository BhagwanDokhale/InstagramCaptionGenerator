import React from 'react';
import { MessageSquare, MessageCircle, Hash, Eye, Smartphone, Palette, User, Minimize, Grid, Calendar, Download, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
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
      category: 'Content Generation'
    },
    {
      name: 'AI Comment Generator',
      desc: 'Generate thoughtful, supportive comment ideas for Instagram posts and Reels in multiple languages.',
      href: '/tools/comment-generator',
      tab: 'comments' as const,
      icon: MessageCircle,
      category: 'Engagement & Community'
    },
    {
      name: 'AI Hashtag Generator',
      desc: 'Find relevant Instagram hashtags grouped by popularity and niche focus to optimize post discoverability.',
      href: '/tools/hashtag-generator',
      tab: 'hashtags' as const,
      icon: Hash,
      category: 'Discovery & Hashtags'
    },
    {
      name: 'AI ALT Text Generator',
      desc: 'Create clear, descriptive image alt text to improve accessibility and image indexing for Instagram posts.',
      href: '/tools/alt-text-generator',
      tab: 'alttext' as const,
      icon: Eye,
      category: 'Accessibility & Descriptions'
    },
    {
      name: 'Instagram Reel Cover Maker',
      desc: 'Design 9:16 vertical Reel covers with visual safe-zone guides so text stays visible in the 1:1 profile grid.',
      href: '/tools/reel-cover-maker',
      tab: 'cover' as const,
      icon: Smartphone,
      category: 'Graphics & Layout'
    },
    {
      name: 'AI Brand Kit Generator',
      desc: 'Build cohesive color palettes, font pairs, taglines, and brand voice guidelines for your Instagram profile.',
      href: '/tools/brand-kit-generator',
      tab: 'brandkit' as const,
      icon: Palette,
      category: 'Branding & Aesthetics'
    },
    {
      name: 'AI Bio Generator',
      desc: 'Create clean, structured Instagram bio suggestions complete with line breaks and call-to-action ideas.',
      href: '/tools/bio-generator',
      tab: 'bios' as const,
      icon: User,
      category: 'Profile Setup'
    },
    {
      name: 'AI Username Generator',
      desc: 'Generate creative, memorable Instagram username ideas tailored to your niche.',
      href: '/tools/username-generator',
      tab: 'usernames' as const,
      icon: User,
      category: 'Profile Setup'
    },
    {
      name: 'Instagram Photo Resizer',
      desc: 'Resize and crop photos for Instagram feed posts (1:1, 4:5), Stories (9:16), and profile avatars.',
      href: '/tools/photo-resizer',
      tab: 'resizer' as const,
      icon: Minimize,
      category: 'Image Formatting'
    },
    {
      name: 'Instagram Grid Maker',
      desc: 'Split panoramic photos into seamless 3x1 or 3x3 grid tile layouts for your Instagram profile.',
      href: '/tools/grid-maker',
      tab: 'grid' as const,
      icon: Grid,
      category: 'Grid Aesthetics'
    },
    {
      name: 'Instagram Feed Planner',
      desc: 'Preview and arrange upcoming feed posts using a visual drag-and-drop grid simulator.',
      href: '/tools/feed-planner',
      tab: 'planner' as const,
      icon: Calendar,
      category: 'Feed Planning'
    },
    {
      name: 'Instagram Reels Downloader',
      desc: 'Download available media from supported public Instagram Reels, videos, and carousel posts without requiring an Instagram login.',
      href: '/tools/reels-downloader',
      tab: 'downloader' as const,
      icon: Download,
      category: 'Media Utilities'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-14 w-full space-y-8">
      <SEO 
        title="Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption"
        description="Explore free Instagram creator tools for captions, hashtags, bios, usernames, visual content, branding, and content planning."
        url="https://growthcaption.com/tools"
      />

      <Breadcrumbs setActivePage={setActivePage} setActiveTab={setActiveTab} />

      {/* Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <Layers size={14} className="text-stone-700" />
          <span>Creator Suite Directory</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Instagram Creator Tools
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-2xl leading-relaxed">
          Comprehensive suite of 12 client-side utilities and AI helpers to compose, format, organize, and publish social media content.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsList.map((tool) => {
          const Icon = tool.icon;
          return (
            <a
              key={tool.tab}
              href={tool.href}
              onClick={handleToolClick(tool.href, tool.tab)}
              className="group bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700">
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-stone-900 group-hover:text-stone-950 transition-colors mb-1.5">
                  {tool.name}
                </h2>
                <p className="text-stone-500 text-xs leading-relaxed font-normal mb-4">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-medium text-stone-800 pt-3 border-t border-stone-100">
                <span>Open Tool</span>
                <ArrowRight size={12} className="ml-1 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Trust & Features Section */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs text-left sm:text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-stone-100 text-stone-800 mb-1">
          <ShieldCheck size={18} />
        </div>
        <h2 className="text-sm font-semibold text-stone-900">
          Free & Privacy-Focused
        </h2>
        <p className="text-stone-500 text-xs leading-relaxed max-w-lg mx-auto">
          All GrowthCaption tools are free to use directly in your browser. No mandatory sign-ups, subscriptions, or hidden walls.
        </p>
      </div>
    </div>
  );
}

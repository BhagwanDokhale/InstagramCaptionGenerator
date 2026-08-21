import React from 'react';
import { 
  AlertCircle, Home, Sparkles, MessageCircle, Hash, UserCheck, 
  Download, Image as ImageIcon, ArrowRight, BookOpen, HelpCircle, Layers
} from 'lucide-react';
import { SEO } from './SEO';
import { PageType } from '../types';
import { navigateTo, TabType, getHref } from '../lib/navigation';

interface NotFoundPageProps {
  setActivePage?: (page: PageType, tab?: TabType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function NotFoundPage({ setActivePage, setActiveTab }: NotFoundPageProps) {
  const handleNav = (page: PageType, tab?: TabType) => {
    const href = getHref(page, tab);
    navigateTo(href, (route) => {
      if (setActivePage) setActivePage(route.page);
      if (setActiveTab) setActiveTab(route.tab);
    });
  };

  const POPULAR_TOOLS = [
    {
      title: "AI Caption Generator",
      description: "Generate Instagram caption ideas tailored to your tone and niche.",
      tab: "captions" as TabType,
      href: "/tools/caption-generator",
      icon: <Sparkles className="text-rose-500 w-5 h-5" />,
      badgeBg: "bg-rose-50 border-rose-200/80"
    },
    {
      title: "AI Comment Generator",
      description: "Generate witty, supportive, and engaging comments for any Instagram post.",
      tab: "comments" as TabType,
      href: "/tools/comment-generator",
      icon: <MessageCircle className="text-pink-500 w-5 h-5" />,
      badgeBg: "bg-pink-50 border-pink-200/80"
    },
    {
      title: "AI Hashtag Generator",
      description: "Generate relevant hashtag ideas based on your post topic and niche.",
      tab: "hashtags" as TabType,
      href: "/tools/hashtag-generator",
      icon: <Hash className="text-violet-600 w-5 h-5" />,
      badgeBg: "bg-violet-50 border-violet-200/80"
    },
    {
      title: "Instagram Bio Generator",
      description: "Craft clear, well-structured Instagram bio suggestions for your profile.",
      tab: "bios" as TabType,
      href: "/tools/bio-generator",
      icon: <UserCheck className="text-emerald-600 w-5 h-5" />,
      badgeBg: "bg-emerald-50 border-emerald-200/80"
    },
    {
      title: "Reels Video Downloader",
      description: "Download public Instagram Reels and video content for offline viewing.",
      tab: "downloader" as TabType,
      href: "/tools/reels-downloader",
      icon: <Download className="text-rose-600 w-5 h-5" />,
      badgeBg: "bg-rose-50 border-rose-200/80"
    },
    {
      title: "Photo Resizer & Grid Maker",
      description: "Resize, crop, and split photos for perfect 3x3 Instagram grid layouts.",
      tab: "resizer" as TabType,
      href: "/tools/photo-resizer",
      icon: <ImageIcon className="text-blue-600 w-5 h-5" />,
      badgeBg: "bg-blue-50 border-blue-200/80"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 w-full flex-1 flex flex-col justify-center">
      <SEO 
        title="404 - Page Not Found | GrowthCaption"
        description="The requested page could not be found on GrowthCaption. Explore our free Instagram creator tools and guides."
        robots="noindex, nofollow"
      />

      <div className="text-center space-y-6 mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
          <AlertCircle size={14} className="text-stone-600" />
          <span>404 Error</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-stone-950 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-stone-600 font-normal text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          The page you're looking for doesn't exist, has been removed, or moved to a new URL. Let's get you back on track with our creator tools and guides.
        </p>

        {/* Quick action buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <a
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              handleNav('home', 'captions');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Home size={15} />
            Go to Homepage
          </a>

          <a
            href="/how-to-use"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              handleNav('how-to');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 font-medium text-sm hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs"
          >
            <HelpCircle size={15} className="text-stone-600" />
            How to Use
          </a>

          <a
            href="/blog"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              handleNav('blog');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 font-medium text-sm hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen size={15} className="text-stone-600" />
            Creator Blog
          </a>
        </div>
      </div>

      {/* Popular Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Layers className="text-stone-700 w-4 h-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">Explore Free Instagram Creator Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {POPULAR_TOOLS.map((tool) => (
            <a
              key={tool.tab}
              href={tool.href}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                handleNav('home', tool.tab);
              }}
              className="p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-300 shadow-2xs transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className={`p-2 rounded-lg w-fit border transition-colors ${tool.badgeBg || 'bg-stone-50 border-stone-200/80'}`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-stone-950 transition-colors flex items-center gap-1.5">
                  {tool.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-3 flex items-center text-xs font-semibold text-stone-800 group-hover:translate-x-0.5 transition-transform">
                Open Tool <ArrowRight size={13} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

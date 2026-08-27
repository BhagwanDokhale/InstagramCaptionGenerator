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
  const handleNav = (href: string, page: PageType, tab?: TabType) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (page === 'home') {
      if (setActiveTab && tab) {
        setActiveTab(tab);
      }
      if (setActivePage) {
        setActivePage('home', tab);
      }
    } else {
      if (setActivePage) {
        setActivePage(page);
      }
    }
    navigateTo(href);
  };

  const POPULAR_TOOLS = [
    {
      title: "AI Caption Generator",
      description: "Generate Instagram caption ideas tailored to your tone and niche.",
      tab: "captions" as TabType,
      href: "/tools/caption-generator",
      icon: <Sparkles className="text-rose-500 w-5 h-5" />
    },
    {
      title: "AI Comment Generator",
      description: "Generate witty, supportive, and engaging comments for any Instagram post.",
      tab: "comments" as TabType,
      href: "/tools/comment-generator",
      icon: <MessageCircle className="text-pink-500 w-5 h-5" />
    },
    {
      title: "AI Hashtag Generator",
      description: "Generate relevant hashtag ideas based on your post topic and niche.",
      tab: "hashtags" as TabType,
      href: "/tools/hashtag-generator",
      icon: <Hash className="text-violet-500 w-5 h-5" />
    },
    {
      title: "Instagram Bio Generator",
      description: "Craft clear, well-structured Instagram bio suggestions for your profile.",
      tab: "bios" as TabType,
      href: "/tools/bio-generator",
      icon: <UserCheck className="text-emerald-500 w-5 h-5" />
    },
    {
      title: "Reels Video Downloader",
      description: "Download public Instagram Reels and video content for offline viewing.",
      tab: "downloader" as TabType,
      href: "/tools/reels-downloader",
      icon: <Download className="text-amber-500 w-5 h-5" />
    },
    {
      title: "Photo Resizer & Grid Maker",
      description: "Resize, crop, and split photos for perfect 3x3 Instagram grid layouts.",
      tab: "resizer" as TabType,
      href: "/tools/photo-resizer",
      icon: <ImageIcon className="text-indigo-500 w-5 h-5" />
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-widest shadow-sm">
          <AlertCircle size={15} className="text-rose-600 animate-pulse" />
          <span>404 Error</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-stone-950 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-stone-600 font-medium text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Oops! The page you're looking for doesn't exist, has been removed, or moved to a new URL. Let's get you back on track with our popular tools and guides.
        </p>

        {/* Quick action buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <a
            href="/"
            onClick={handleNav('/', 'home', 'captions')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 text-white font-bold text-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <Home size={16} />
            Go to Homepage
          </a>

          <a
            href="/how-to-use"
            onClick={handleNav('/how-to-use', 'how-to')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-800 font-bold text-sm hover:bg-stone-50 transition-all cursor-pointer shadow-sm"
          >
            <HelpCircle size={16} className="text-indigo-600" />
            How to Use
          </a>

          <a
            href="/blog"
            onClick={handleNav('/blog', 'blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-800 font-bold text-sm hover:bg-stone-50 transition-all cursor-pointer shadow-sm"
          >
            <BookOpen size={16} className="text-amber-600" />
            Creator Blog
          </a>
        </div>
      </div>

      {/* Popular Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Layers className="text-indigo-600 w-5 h-5" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">Explore Our Free Instagram Creator Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_TOOLS.map((tool) => (
            <a
              key={tool.tab}
              href={tool.href}
              onClick={handleNav(tool.href, 'home', tool.tab)}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-stone-300 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-stone-50 w-fit border border-stone-100 group-hover:bg-stone-100 transition-colors">
                  {tool.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  {tool.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                Open Tool <ArrowRight size={13} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, Menu, X, ChevronDown, MessageSquare, MessageCircle, Hash, Eye, User, Minimize, Grid, Calendar, Download, Smartphone, Palette, Layers, Bookmark } from 'lucide-react';
import { PageType } from '../types';
import { navigateTo, getHref, TabType } from '../lib/navigation';

interface HeaderProps {
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function Header({ setActivePage, setActiveTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
    setIsMobileMenuOpen(false);
  };

  const navLinks: { name: string; href: string; page: PageType }[] = [
    { name: 'Home', href: '/', page: 'home' },
    { name: 'Workspace', href: '/workspace', page: 'workspace' },
    { name: 'How to Use', href: '/how-to-use', page: 'how-to' },
    { name: 'About Us', href: '/about-us', page: 'about' },
    { name: 'FAQ', href: '/faq', page: 'faq' },
    { name: 'Blog', href: '/blog', page: 'blog' },
    { name: 'Privacy Policy', href: '/privacy-policy', page: 'privacy' },
    { name: 'Terms', href: '/terms-and-conditions', page: 'terms' },
    { name: 'Contact', href: '/contact', page: 'contact' }
  ];

  const tools = [
    { name: 'Caption Generator', href: '/tools/caption-generator', tab: 'captions' as const, icon: MessageSquare, color: 'text-rose-500 bg-rose-50' },
    { name: 'Comment Generator', href: '/tools/comment-generator', tab: 'comments' as const, icon: MessageCircle, color: 'text-pink-500 bg-pink-50' },
    { name: 'Hashtag Generator', href: '/tools/hashtag-generator', tab: 'hashtags' as const, icon: Hash, color: 'text-violet-500 bg-violet-50' },
    { name: 'ALT Text Generator', href: '/tools/alt-text-generator', tab: 'alttext' as const, icon: Eye, color: 'text-indigo-500 bg-indigo-50' },
    { name: 'Bio Generator', href: '/tools/bio-generator', tab: 'bios' as const, icon: User, color: 'text-amber-500 bg-amber-50' },
    { name: 'Username Generator', href: '/tools/username-generator', tab: 'usernames' as const, icon: User, color: 'text-emerald-500 bg-emerald-50' },
    { name: 'Brand Kit Generator', href: '/tools/brand-kit-generator', tab: 'brandkit' as const, icon: Palette, color: 'text-indigo-600 bg-indigo-50/80' },
    { name: 'Photo Resizer', href: '/tools/photo-resizer', tab: 'resizer' as const, icon: Minimize, color: 'text-sky-500 bg-sky-50' },
    { name: 'Reel Cover Maker', href: '/tools/reel-cover-maker', tab: 'cover' as const, icon: Smartphone, color: 'text-purple-500 bg-purple-50' },
    { name: 'Grid Maker', href: '/tools/grid-maker', tab: 'grid' as const, icon: Grid, color: 'text-cyan-500 bg-cyan-50' },
    { name: 'Feed Planner', href: '/tools/feed-planner', tab: 'planner' as const, icon: Calendar, color: 'text-teal-500 bg-teal-50' },
    { name: 'Reels Downloader', href: '/tools/reels-downloader', tab: 'downloader' as const, icon: Download, color: 'text-pink-500 bg-pink-50' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 w-full glass-nav backdrop-blur-xl bg-white/75 border-b border-white/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a 
          href="/"
          onClick={handleLinkClick('/', 'home')}
          className="flex items-center gap-2.5 text-stone-900 font-bold tracking-wider cursor-pointer hover:opacity-90 transition-all group"
        >
          <img 
            src="/logo.svg" 
            alt="GrowthCaption Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 rounded-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300 object-contain"
          />
          <span className="uppercase font-display tracking-widest text-sm font-extrabold bg-gradient-to-r from-stone-950 via-stone-800 to-stone-900 bg-clip-text text-transparent">GrowthCaption</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 lg:gap-7 items-center" aria-label="Main Navigation">
          <a 
            href="/"
            onClick={handleLinkClick('/', 'home', 'captions')} 
            className="text-xs font-bold text-stone-500 hover:text-indigo-600 transition-colors uppercase tracking-widest cursor-pointer outline-none bg-transparent border-none p-0"
          >
            Home
          </a>

          {/* Tools Hover Dropdown */}
          <div className="relative group py-2">
            <a 
              href="/tools"
              onClick={handleLinkClick('/tools', 'tools')}
              className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-indigo-600 transition-colors uppercase tracking-widest cursor-pointer outline-none bg-transparent"
            >
              <span>Tools</span>
              <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-200" />
            </a>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] py-3 px-2 grid grid-cols-1 gap-0.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="/workspace"
                onClick={handleLinkClick('/workspace', 'workspace')}
                className="flex items-center gap-3 px-3.5 py-2.5 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl text-left w-full transition-all cursor-pointer group/item outline-none mb-1 border border-indigo-100/60"
              >
                <div className="w-7.5 h-7.5 rounded-lg text-indigo-700 bg-indigo-100 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform shadow-xs">
                  <Bookmark size={14} />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950">
                    My Creator Workspace
                  </div>
                  <p className="text-[10px] text-indigo-700 font-medium">View saved captions & brand kit</p>
                </div>
              </a>

              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.tab}
                    href={tool.href}
                    onClick={handleLinkClick(tool.href, 'home', tool.tab)}
                    className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-white/80 rounded-xl text-left w-full transition-all cursor-pointer group/item outline-none bg-transparent hover:shadow-sm"
                  >
                    <div className={`w-7.5 h-7.5 rounded-lg ${tool.color} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform shadow-xs`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-800 group-hover/item:text-indigo-600 transition-colors">
                        {tool.name}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Workspace Link */}
          <a 
            href="/workspace"
            onClick={handleLinkClick('/workspace', 'workspace')} 
            className="text-xs font-bold text-stone-700 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer outline-none bg-transparent border-none p-0"
          >
            <Bookmark size={13} className="text-indigo-600" />
            <span>Workspace</span>
          </a>

          {navLinks.slice(2, 6).map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={handleLinkClick(link.href, link.page)} 
              className="text-xs font-bold text-stone-500 hover:text-indigo-600 transition-colors uppercase tracking-widest relative cursor-pointer outline-none bg-transparent border-none p-0"
            >
              {link.name}
            </a>
          ))}

          <button 
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-4 py-2 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-widest cursor-pointer shadow-md ${copied ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10' : 'bg-stone-900 hover:bg-stone-800 shadow-stone-900/10'}`}
          >
            <Sparkles size={12} className="fill-current" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            className="p-2 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 right-0 max-h-[85vh] overflow-y-auto border-b border-stone-200/80 bg-white/95 backdrop-blur-md p-6 flex flex-col gap-5 shadow-xl md:hidden" aria-label="Mobile Navigation">
          
          {/* Workspace Mobile Card */}
          <a
            href="/workspace"
            onClick={handleLinkClick('/workspace', 'workspace')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 font-bold text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Bookmark size={15} />
              </div>
              <div>
                <p className="font-extrabold text-indigo-950">My Creator Workspace</p>
                <p className="text-[10px] text-indigo-700 font-normal">Saved captions, hashtags, bios & brand kit</p>
              </div>
            </div>
            <Sparkles size={14} className="text-indigo-600" />
          </a>

          {/* Main Pages */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Pages</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={handleLinkClick(link.href, link.page)}
                  className="block text-left text-xs font-bold text-stone-600 hover:text-indigo-600 transition-colors uppercase tracking-wider py-1.5 cursor-pointer outline-none bg-transparent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="space-y-2.5 border-t border-stone-100 pt-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">AI & Creative Tools</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <a 
                    key={tool.tab} 
                    href={tool.href}
                    onClick={handleLinkClick(tool.href, 'home', tool.tab)}
                    className="flex items-center gap-2.5 text-left text-xs font-semibold text-stone-700 hover:text-indigo-600 transition-colors py-1.5 cursor-pointer outline-none bg-transparent"
                  >
                    <div className={`w-6 h-6 rounded-md ${tool.color} flex items-center justify-center shrink-0`}>
                      <Icon size={13} />
                    </div>
                    <span>{tool.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <button 
            onClick={() => {
              handleShare();
              setTimeout(() => {
                setIsMobileMenuOpen(false);
              }, 1200);
            }}
            className={`mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-widest cursor-pointer w-full shadow-md ${copied ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10' : 'bg-stone-900 hover:bg-stone-800 shadow-stone-900/10'}`}
            aria-label="Share"
          >
            <Sparkles size={12} className="fill-current" />
            {copied ? 'Copied to Clipboard!' : 'Share'}
          </button>
        </nav>
      )}
    </header>
    </>
  );
}


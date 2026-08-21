import React, { useState } from 'react';
import { Sparkles, Menu, X, ChevronDown, MessageSquare, MessageCircle, Hash, Eye, User, Minimize, Grid, Calendar, Download, Smartphone, Palette, Bookmark, Check } from 'lucide-react';
import { PageType } from '../types';
import { navigateTo, TabType } from '../lib/navigation';

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
    { name: 'About', href: '/about-us', page: 'about' },
    { name: 'FAQ', href: '/faq', page: 'faq' },
    { name: 'Blog', href: '/blog', page: 'blog' },
    { name: 'Contact', href: '/contact', page: 'contact' }
  ];

  const tools = [
    { name: 'Caption Generator', href: '/tools/caption-generator', tab: 'captions' as const, icon: MessageSquare },
    { name: 'Comment Generator', href: '/tools/comment-generator', tab: 'comments' as const, icon: MessageCircle },
    { name: 'Hashtag Generator', href: '/tools/hashtag-generator', tab: 'hashtags' as const, icon: Hash },
    { name: 'ALT Text Generator', href: '/tools/alt-text-generator', tab: 'alttext' as const, icon: Eye },
    { name: 'Reel Cover Maker', href: '/tools/reel-cover-maker', tab: 'cover' as const, icon: Smartphone },
    { name: 'Brand Kit Generator', href: '/tools/brand-kit-generator', tab: 'brandkit' as const, icon: Palette },
    { name: 'Bio Generator', href: '/tools/bio-generator', tab: 'bios' as const, icon: User },
    { name: 'Username Generator', href: '/tools/username-generator', tab: 'usernames' as const, icon: User },
    { name: 'Photo Resizer', href: '/tools/photo-resizer', tab: 'resizer' as const, icon: Minimize },
    { name: 'Grid Maker', href: '/tools/grid-maker', tab: 'grid' as const, icon: Grid },
    { name: 'Feed Planner', href: '/tools/feed-planner', tab: 'planner' as const, icon: Calendar },
    { name: 'Reels Downloader', href: '/tools/reels-downloader', tab: 'downloader' as const, icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a 
          href="/"
          onClick={handleLinkClick('/', 'home')}
          className="flex items-center gap-2 text-stone-900 cursor-pointer"
        >
          <img 
            src="/logo.svg" 
            alt="GrowthCaption Logo" 
            width={26} 
            height={26} 
            className="w-6.5 h-6.5 rounded-md object-contain"
          />
          <span className="font-semibold text-sm tracking-tight text-stone-900">GrowthCaption</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center" aria-label="Main Navigation">
          <a 
            href="/"
            onClick={handleLinkClick('/', 'home', 'captions')} 
            className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </a>

          {/* Tools Hover Dropdown */}
          <div className="relative group py-2">
            <a 
              href="/tools"
              onClick={handleLinkClick('/tools', 'tools')}
              className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <span>Tools</span>
              <ChevronDown size={11} className="text-stone-400 group-hover:text-stone-900 transition-transform duration-150 group-hover:rotate-180" />
            </a>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-stone-200 rounded-xl shadow-lg p-1.5 grid grid-cols-1 gap-0.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <a
                href="/workspace"
                onClick={handleLinkClick('/workspace', 'workspace')}
                className="flex items-center gap-2.5 px-3 py-2 bg-stone-50 hover:bg-stone-100 rounded-lg text-left w-full transition-colors cursor-pointer border border-stone-200 mb-1"
              >
                <Bookmark size={13} className="text-stone-900 shrink-0" />
                <div className="truncate">
                  <div className="text-xs font-medium text-stone-900">
                    Creator Workspace
                  </div>
                  <p className="text-[10px] text-stone-500 truncate">Saved content & assets</p>
                </div>
              </a>

              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.tab}
                    href={tool.href}
                    onClick={handleLinkClick(tool.href, 'home', tool.tab)}
                    className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-stone-50 rounded-lg text-left w-full transition-colors cursor-pointer text-stone-700 hover:text-stone-900"
                  >
                    <Icon size={13} className="text-stone-400 shrink-0" />
                    <span className="text-xs font-medium truncate">{tool.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Workspace Link */}
          <a 
            href="/workspace"
            onClick={handleLinkClick('/workspace', 'workspace')} 
            className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark size={12} className="text-stone-500" />
            <span>Workspace</span>
          </a>

          {navLinks.slice(2, 6).map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={handleLinkClick(link.href, link.page)} 
              className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          <button 
            onClick={handleShare}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${copied ? 'bg-stone-900 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Sparkles size={12} />
                <span>Share</span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 right-0 max-h-[85vh] overflow-y-auto border-b border-stone-200 bg-white p-4 flex flex-col gap-4 shadow-lg md:hidden" aria-label="Mobile Navigation">
          {/* Workspace Mobile Card */}
          <a
            href="/workspace"
            onClick={handleLinkClick('/workspace', 'workspace')}
            className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 text-xs font-medium"
          >
            <div className="flex items-center gap-2">
              <Bookmark size={14} className="text-stone-900" />
              <div>
                <p className="font-semibold text-stone-900">Creator Workspace</p>
                <p className="text-[11px] text-stone-500">Saved content, hashtags & brand kit</p>
              </div>
            </div>
          </a>

          {/* Main Pages */}
          <div className="space-y-1">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-1">Pages</h4>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={handleLinkClick(link.href, link.page)}
                  className="block text-left text-xs font-medium text-stone-600 hover:text-stone-900 py-1 px-1 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="space-y-1 border-t border-stone-100 pt-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-1">Tools</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <a 
                    key={tool.tab} 
                    href={tool.href}
                    onClick={handleLinkClick(tool.href, 'home', tool.tab)}
                    className="flex items-center gap-2 text-left text-xs font-medium text-stone-600 hover:text-stone-900 py-1.5 px-1 cursor-pointer"
                  >
                    <Icon size={13} className="text-stone-400 shrink-0" />
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
            className="mt-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors w-full cursor-pointer"
            aria-label="Share"
          >
            {copied ? <Check size={12} /> : <Sparkles size={12} />}
            <span>{copied ? 'Copied to Clipboard' : 'Share GrowthCaption'}</span>
          </button>
        </nav>
      )}
    </header>
  );
}

import React from 'react';
import { Sparkles, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import { PageType } from '../types';
import { navigateTo, TabType } from '../lib/navigation';
import { openCookieConsent } from '../lib/analytics';

interface FooterProps {
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function Footer({ setActivePage, setActiveTab }: FooterProps) {
  const handleLinkClick = (href: string, page?: PageType, tab?: TabType) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (href === '#cookies') {
      openCookieConsent();
      return;
    }
    if (tab && setActiveTab) {
      setActiveTab(tab);
    }
    if (page && setActivePage) {
      setActivePage(page);
    }
    navigateTo(href);
  };

  const linkGroups = [
    {
      title: 'AI Tools',
      links: [
        { name: 'Captions', href: '/tools/caption-generator', page: 'home' as PageType, tab: 'captions' as const },
        { name: 'Comment Generator', href: '/tools/comment-generator', page: 'home' as PageType, tab: 'comments' as const },
        { name: 'Hashtags', href: '/tools/hashtag-generator', page: 'home' as PageType, tab: 'hashtags' as const },
        { name: 'ALT Text', href: '/tools/alt-text-generator', page: 'home' as PageType, tab: 'alttext' as const },
        { name: 'Bios', href: '/tools/bio-generator', page: 'home' as PageType, tab: 'bios' as const },
        { name: 'Usernames', href: '/tools/username-generator', page: 'home' as PageType, tab: 'usernames' as const },
        { name: 'Brand Kit Generator', href: '/tools/brand-kit-generator', page: 'home' as PageType, tab: 'brandkit' as const }
      ]
    },
    {
      title: 'Visual tools',
      links: [
        { name: 'Photo Resizer', href: '/tools/photo-resizer', page: 'home' as PageType, tab: 'resizer' as const },
        { name: 'Reel Cover Maker', href: '/tools/reel-cover-maker', page: 'home' as PageType, tab: 'cover' as const },
        { name: 'Grid Maker', href: '/tools/grid-maker', page: 'home' as PageType, tab: 'grid' as const },
        { name: 'Feed Planner', href: '/tools/feed-planner', page: 'home' as PageType, tab: 'planner' as const },
        { name: 'Downloader', href: '/tools/reels-downloader', page: 'home' as PageType, tab: 'downloader' as const }
      ]
    },
    {
      title: 'Explore',
      links: [
        { name: 'Home', href: '/', page: 'home' as PageType, tab: 'captions' as const },
        { name: 'How to Use', href: '/how-to-use', page: 'how-to' as PageType },
        { name: 'Sitemap', href: '/sitemap', page: 'sitemap' as PageType },
        { name: 'FAQ', href: '/faq', page: 'faq' as PageType },
        { name: 'Blog', href: '/blog', page: 'blog' as PageType }
      ]
    },
    {
      title: 'Legal & Help',
      links: [
        { name: 'Disclaimer', href: '/disclaimer', page: 'disclaimer' as PageType },
        { name: 'Privacy Policy', href: '/privacy-policy', page: 'privacy' as PageType },
        { name: 'Cookie Preferences', href: '#cookies' },
        { name: 'Terms', href: '/terms-and-conditions', page: 'terms' as PageType },
        { name: 'About Us', href: '/about-us', page: 'about' as PageType },
        { name: 'Contact Us', href: '/contact', page: 'contact' as PageType }
      ]
    }
  ];

  return (
    <footer 
      className="border-t border-white/80 bg-white/60 backdrop-blur-xl mt-auto relative overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.01)] min-h-[350px]"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 350px' }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>
      
      {/* Soft gradient ambient glow in footer */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-100/40 via-transparent to-transparent pointer-events-none -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Creator Column */}
          <div className="md:col-span-3 flex flex-col gap-4 items-start">
            <a 
              href="/"
              onClick={handleLinkClick('/', 'home')}
              className="flex items-center gap-2.5 text-stone-900 font-bold text-lg tracking-wider cursor-pointer hover:opacity-90 transition-opacity group"
            >
              <img 
                src="/logo.svg" 
                alt="GrowthCaption Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 rounded-lg shadow-md shadow-rose-500/15 group-hover:scale-105 transition-transform object-contain"
              />
              <span className="uppercase font-display tracking-widest text-xs font-extrabold text-stone-900">GrowthCaption</span>
            </a>
            
            <p className="text-xs text-stone-700 max-w-sm leading-relaxed font-medium">
              Free Instagram Creator Tools for creating, organizing, and reusing social content.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  {group.title}
                </h3>
                <nav aria-label={`${group.title} navigation`}>
                  <ul className="flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.href}
                          onClick={handleLinkClick(link.href, link.page, link.tab)} 
                          className="text-xs font-semibold text-stone-700 hover:text-indigo-600 transition-colors cursor-pointer outline-none bg-transparent block text-left"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.facebook.com/bhagwan.dokhale" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-stone-50 text-stone-700 hover:text-indigo-600 rounded-xl border border-stone-200/80 transition-all shadow-sm" aria-label="Follow us on Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/bhagwan5/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-stone-50 text-stone-700 hover:text-indigo-600 rounded-xl border border-stone-200/80 transition-all shadow-sm" aria-label="Follow us on Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.linkedin.com/in/bhagwan-dokhale-05407891" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-stone-50 text-stone-700 hover:text-indigo-600 rounded-xl border border-stone-200/80 transition-all shadow-sm" aria-label="Follow us on LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright & Disclaimer note */}
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
            &copy; {new Date().getFullYear()} GrowthCaption. All rights reserved.
          </div>
          <p className="text-[11px] text-stone-500 max-w-xl leading-relaxed">
            <span className="font-semibold text-stone-700">Disclaimer:</span> GrowthCaption is independent & not affiliated with Instagram/Meta. AI outputs can contain errors; users should review generated content. Downloader users are responsible for rights/permissions.{' '}
            <a 
              href="/disclaimer" 
              onClick={handleLinkClick('/disclaimer', 'disclaimer')}
              className="text-indigo-600 hover:text-indigo-700 font-bold underline cursor-pointer"
            >
              Read Disclaimer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}


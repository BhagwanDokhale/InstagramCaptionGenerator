import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
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
        { name: 'Caption Generator', href: '/tools/caption-generator', page: 'home' as PageType, tab: 'captions' as const },
        { name: 'Comment Generator', href: '/tools/comment-generator', page: 'home' as PageType, tab: 'comments' as const },
        { name: 'Hashtag Generator', href: '/tools/hashtag-generator', page: 'home' as PageType, tab: 'hashtags' as const },
        { name: 'ALT Text Generator', href: '/tools/alt-text-generator', page: 'home' as PageType, tab: 'alttext' as const },
        { name: 'Bio Generator', href: '/tools/bio-generator', page: 'home' as PageType, tab: 'bios' as const },
        { name: 'Username Generator', href: '/tools/username-generator', page: 'home' as PageType, tab: 'usernames' as const },
        { name: 'Brand Kit Generator', href: '/tools/brand-kit-generator', page: 'home' as PageType, tab: 'brandkit' as const }
      ]
    },
    {
      title: 'Visual Tools',
      links: [
        { name: 'Photo Resizer', href: '/tools/photo-resizer', page: 'home' as PageType, tab: 'resizer' as const },
        { name: 'Reel Cover Maker', href: '/tools/reel-cover-maker', page: 'home' as PageType, tab: 'cover' as const },
        { name: 'Grid Maker', href: '/tools/grid-maker', page: 'home' as PageType, tab: 'grid' as const },
        { name: 'Feed Planner', href: '/tools/feed-planner', page: 'home' as PageType, tab: 'planner' as const },
        { name: 'Reels Downloader', href: '/tools/reels-downloader', page: 'home' as PageType, tab: 'downloader' as const }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Creator Workspace', href: '/workspace', page: 'workspace' as PageType },
        { name: 'How to Use', href: '/how-to-use', page: 'how-to' as PageType },
        { name: 'Blog & Guides', href: '/blog', page: 'blog' as PageType },
        { name: 'FAQ', href: '/faq', page: 'faq' as PageType },
        { name: 'Sitemap', href: '/sitemap', page: 'sitemap' as PageType }
      ]
    },
    {
      title: 'Legal & Company',
      links: [
        { name: 'About Us', href: '/about-us', page: 'about' as PageType },
        { name: 'Contact Support', href: '/contact', page: 'contact' as PageType },
        { name: 'Privacy Policy', href: '/privacy-policy', page: 'privacy' as PageType },
        { name: 'Terms of Service', href: '/terms-and-conditions', page: 'terms' as PageType },
        { name: 'Disclaimer', href: '/disclaimer', page: 'disclaimer' as PageType },
        { name: 'Cookie Preferences', href: '#cookies' }
      ]
    }
  ];

  return (
    <footer 
      className="border-t border-stone-200 bg-white mt-auto py-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>
      
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <a 
              href="/"
              onClick={handleLinkClick('/', 'home')}
              className="flex items-center gap-2 text-stone-900 cursor-pointer"
            >
              <img 
                src="/logo.svg" 
                alt="GrowthCaption Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 rounded-md object-contain"
              />
              <span className="font-semibold text-sm tracking-tight text-stone-900">GrowthCaption</span>
            </a>
            
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              Clean, practical tools for social media creators and managers to generate captions, optimize visuals, and organize content.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://www.facebook.com/bhagwan.dokhale" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-md border border-stone-200 transition-colors" 
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href="https://www.instagram.com/bhagwan5/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-md border border-stone-200 transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://www.linkedin.com/in/bhagwan-dokhale-05407891" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-md border border-stone-200 transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  {group.title}
                </h3>
                <nav aria-label={`${group.title} navigation`}>
                  <ul className="flex flex-col gap-1.5">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.href}
                          onClick={handleLinkClick(link.href, link.page, link.tab)} 
                          className="text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer block text-left"
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

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} GrowthCaption. All rights reserved.
          </div>
          <p className="text-[11px] text-stone-400 max-w-xl leading-relaxed">
            <span>GrowthCaption is an independent tool suite and is not affiliated with Meta or Instagram.</span>{' '}
            <a 
              href="/disclaimer" 
              onClick={handleLinkClick('/disclaimer', 'disclaimer')}
              className="text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              Disclaimer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

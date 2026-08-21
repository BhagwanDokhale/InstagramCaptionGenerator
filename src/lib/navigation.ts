import { PageType } from '../types';

export type TabType = 'captions' | 'comments' | 'bios' | 'resizer' | 'usernames' | 'grid' | 'planner' | 'downloader' | 'hashtags' | 'alttext' | 'cover' | 'brandkit';

export interface RouteState {
  page: PageType;
  tab: TabType;
  blogSlug?: string;
}

export const ROUTE_MAP: Record<string, RouteState> = {
  '/': { page: 'home', tab: 'captions' },
  '/home': { page: 'home', tab: 'captions' },
  '/how-to-use': { page: 'how-to', tab: 'captions' },
  '/how-to': { page: 'how-to', tab: 'captions' },
  '/about-us': { page: 'about', tab: 'captions' },
  '/about': { page: 'about', tab: 'captions' },
  '/faq': { page: 'faq', tab: 'captions' },
  '/blog': { page: 'blog', tab: 'captions' },
  '/privacy-policy': { page: 'privacy', tab: 'captions' },
  '/privacy': { page: 'privacy', tab: 'captions' },
  '/terms-and-conditions': { page: 'terms', tab: 'captions' },
  '/terms': { page: 'terms', tab: 'captions' },
  '/disclaimer': { page: 'disclaimer', tab: 'captions' },
  '/contact': { page: 'contact', tab: 'captions' },
  '/sitemap': { page: 'sitemap', tab: 'captions' },
  '/tools': { page: 'tools', tab: 'captions' },
  '/workspace': { page: 'workspace', tab: 'captions' },

  // Tool specific paths
  '/tools/caption-generator': { page: 'home', tab: 'captions' },
  '/caption-generator': { page: 'home', tab: 'captions' },
  '/tools/comment-generator': { page: 'home', tab: 'comments' },
  '/comment-generator': { page: 'home', tab: 'comments' },
  '/tools/hashtag-generator': { page: 'home', tab: 'hashtags' },
  '/hashtag-generator': { page: 'home', tab: 'hashtags' },
  '/tools/alt-text-generator': { page: 'home', tab: 'alttext' },
  '/alt-text-generator': { page: 'home', tab: 'alttext' },
  '/tools/reel-cover-maker': { page: 'home', tab: 'cover' },
  '/reel-cover-maker': { page: 'home', tab: 'cover' },
  '/tools/brand-kit-generator': { page: 'home', tab: 'brandkit' },
  '/brand-kit-generator': { page: 'home', tab: 'brandkit' },
  '/tools/bio-generator': { page: 'home', tab: 'bios' },
  '/bio-generator': { page: 'home', tab: 'bios' },
  '/tools/username-generator': { page: 'home', tab: 'usernames' },
  '/username-generator': { page: 'home', tab: 'usernames' },
  '/tools/photo-resizer': { page: 'home', tab: 'resizer' },
  '/photo-resizer': { page: 'home', tab: 'resizer' },
  '/tools/grid-maker': { page: 'home', tab: 'grid' },
  '/grid-maker': { page: 'home', tab: 'grid' },
  '/tools/feed-planner': { page: 'home', tab: 'planner' },
  '/feed-planner': { page: 'home', tab: 'planner' },
  '/tools/reels-downloader': { page: 'home', tab: 'downloader' },
  '/reels-downloader': { page: 'home', tab: 'downloader' },
};

export const VALID_BLOG_SLUGS = [
  '10-tips-for-the-perfect-instagram-bio',
  'why-grid-layouts-boost-engagement',
  'ultimate-guide-instagram-captions-2026',
  'how-to-save-instagram-reels-videos-safely',
  'designing-reel-covers-that-get-clicked',
  'how-to-build-cohesive-brand-kit'
];

export function isValidRoute(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (ROUTE_MAP[normalizedPath]) {
    return true;
  }
  if (normalizedPath === '/blog') {
    return true;
  }
  if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '');
    if (slug && VALID_BLOG_SLUGS.includes(slug)) {
      return true;
    }
  }
  return false;
}

export function getRouteFromPath(pathname: string): RouteState {
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (ROUTE_MAP[normalizedPath]) {
    return ROUTE_MAP[normalizedPath];
  }
  if (normalizedPath === '/blog') {
    return { page: 'blog', tab: 'captions' };
  }
  if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '');
    if (slug && VALID_BLOG_SLUGS.includes(slug)) {
      return { page: 'blog', tab: 'captions', blogSlug: slug };
    }
  }
  return { page: 'not-found', tab: 'captions' };
}

export function getHref(page: PageType, tab?: TabType, blogSlug?: string): string {
  if (page === 'not-found') return '/404';
  if (page === 'home') {
    if (!tab || tab === 'captions') return '/tools/caption-generator';
    if (tab === 'comments') return '/tools/comment-generator';
    if (tab === 'hashtags') return '/tools/hashtag-generator';
    if (tab === 'alttext') return '/tools/alt-text-generator';
    if (tab === 'cover') return '/tools/reel-cover-maker';
    if (tab === 'brandkit') return '/tools/brand-kit-generator';
    if (tab === 'bios') return '/tools/bio-generator';
    if (tab === 'usernames') return '/tools/username-generator';
    if (tab === 'resizer') return '/tools/photo-resizer';
    if (tab === 'grid') return '/tools/grid-maker';
    if (tab === 'planner') return '/tools/feed-planner';
    if (tab === 'downloader') return '/tools/reels-downloader';
    return '/';
  }
  if (page === 'how-to') return '/how-to-use';
  if (page === 'about') return '/about-us';
  if (page === 'faq') return '/faq';
  if (page === 'blog') {
    if (blogSlug) return `/blog/${blogSlug}`;
    return '/blog';
  }
  if (page === 'privacy') return '/privacy-policy';
  if (page === 'terms') return '/terms-and-conditions';
  if (page === 'disclaimer') return '/disclaimer';
  if (page === 'contact') return '/contact';
  if (page === 'sitemap') return '/sitemap';
  if (page === 'tools') return '/tools';
  if (page === 'workspace') return '/workspace';
  return '/';
}

export function navigateTo(href: string, onNavigate?: (route: RouteState) => void) {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', href);
    const route = getRouteFromPath(window.location.pathname);
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.dispatchEvent(new CustomEvent('app-navigation', { detail: route }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

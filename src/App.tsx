import { useState, useEffect, lazy, Suspense } from 'react';
import { Sparkles, Image as ImageIcon, UserCircle, LayoutGrid, X } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { GenerateRequest, GenerateBioRequest, GenerateUsernameRequest, PageType } from './types';
import { getRouteFromPath, getHref, navigateTo, TabType } from './lib/navigation';
import { TOOL_GUIDES } from './components/ToolExplanatoryGuide';
import { TOOL_SCHEMA_MAP } from './lib/schema';

import { ToolExplanatoryGuide } from './components/ToolExplanatoryGuide';
import { HowItWorks } from './components/HowItWorks';

// Dynamic lazy imports for heavy components and secondary pages
const CaptionForm = lazy(() => import('./components/CaptionForm').then(m => ({ default: m.CaptionForm })));
const CaptionItem = lazy(() => import('./components/CaptionItem').then(m => ({ default: m.CaptionItem })));
const TrendingList = lazy(() => import('./components/TrendingList').then(m => ({ default: m.TrendingList })));
const ScrollToTop = lazy(() => import('./components/ScrollToTop').then(m => ({ default: m.ScrollToTop })));
const CookieConsent = lazy(() => import('./components/CookieConsent').then(m => ({ default: m.CookieConsent })));
const BioForm = lazy(() => import('./components/BioForm').then(m => ({ default: m.BioForm })));
const UsernameForm = lazy(() => import('./components/UsernameForm').then(m => ({ default: m.UsernameForm })));
const PhotoResizer = lazy(() => import('./components/PhotoResizer').then(m => ({ default: m.PhotoResizer })));
const GridMaker = lazy(() => import('./components/GridMaker').then(m => ({ default: m.GridMaker })));
const FeedPlanner = lazy(() => import('./components/FeedPlanner').then(m => ({ default: m.FeedPlanner })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const FAQPage = lazy(() => import('./components/FAQPage').then(m => ({ default: m.FAQPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const TermsPage = lazy(() => import('./components/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./components/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const DisclaimerPage = lazy(() => import('./components/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const HowToPage = lazy(() => import('./components/HowToPage').then(m => ({ default: m.HowToPage })));
const SitemapPage = lazy(() => import('./components/SitemapPage').then(m => ({ default: m.SitemapPage })));
const ReelsDownloader = lazy(() => import('./components/ReelsDownloader').then(m => ({ default: m.ReelsDownloader })));
const HashtagGenerator = lazy(() => import('./components/HashtagGenerator').then(m => ({ default: m.HashtagGenerator })));
const AltTextGenerator = lazy(() => import('./components/AltTextGenerator').then(m => ({ default: m.AltTextGenerator })));
const ReelCoverMaker = lazy(() => import('./components/ReelCoverMaker').then(m => ({ default: m.ReelCoverMaker })));
const BrandKitGenerator = lazy(() => import('./components/BrandKitGenerator').then(m => ({ default: m.BrandKitGenerator })));
const CommentGenerator = lazy(() => import('./components/CommentGenerator').then(m => ({ default: m.CommentGenerator })));
const ToolsIndexPage = lazy(() => import('./components/ToolsIndexPage').then(m => ({ default: m.ToolsIndexPage })));
const WorkspacePage = lazy(() => import('./components/WorkspacePage').then(m => ({ default: m.WorkspacePage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
import { Breadcrumbs } from './components/Breadcrumbs';
import { addRecentProject } from './lib/creatorWorkspaceStorage';

const ComponentLoader = () => (
  <div className="w-full flex-1 min-h-[calc(100vh-380px)] flex items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-stone-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-xs font-bold uppercase tracking-wider text-stone-700">Loading Page...</p>
    </div>
  </div>
);

const ToolSkeleton = () => (
  <div className="w-full min-h-[500px] rounded-3xl bg-white/60 border border-stone-200/80 backdrop-blur-md flex flex-col items-center justify-center p-8 gap-4 shadow-sm animate-pulse">
    <div className="w-8 h-8 border-3 border-stone-200 border-t-indigo-600 rounded-full animate-spin"></div>
    <p className="text-xs font-bold uppercase tracking-wider text-stone-700">Loading Tool...</p>
  </div>
);

export default function App() {
  const initialRoute = typeof window !== 'undefined' ? getRouteFromPath(window.location.pathname) : { page: 'home' as PageType, tab: 'captions' as TabType };
  const [activePage, setActivePage] = useState<PageType>(initialRoute.page);
  const [activeTab, setActiveTab] = useState<TabType>(initialRoute.tab);
  const [blogSlug, setBlogSlug] = useState<string | undefined>(initialRoute.blogSlug);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncRouteFromPath = () => {
      if (typeof window !== 'undefined') {
        const route = getRouteFromPath(window.location.pathname);
        setActivePage(route.page);
        setActiveTab(route.tab);
        setBlogSlug(route.blogSlug);
      }
    };

    const handleCustomNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setActivePage(detail.page);
        setActiveTab(detail.tab);
        setBlogSlug(detail.blogSlug);
      }
    };

    window.addEventListener('popstate', syncRouteFromPath);
    window.addEventListener('app-navigation', handleCustomNav);

    // Initial check for shared query params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedResult = params.get('result');
      const sharedType = params.get('type') as TabType;
      if (sharedResult) {
        setResults([sharedResult]);
        if (sharedType) {
          setActiveTab(sharedType);
        }
      }

      // Idle background prefetching for instant tab and page switching
      const prefetchIdle = () => {
        const prefetchLoaders = [
          () => import('./components/HashtagGenerator'),
          () => import('./components/CommentGenerator'),
          () => import('./components/ReelsDownloader'),
          () => import('./components/BioForm'),
          () => import('./components/UsernameForm'),
          () => import('./components/ToolsIndexPage'),
          () => import('./components/WorkspacePage'),
        ];
        prefetchLoaders.forEach((loader, index) => {
          setTimeout(() => {
            loader().catch(() => {});
          }, 800 + index * 300);
        });
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(prefetchIdle);
      } else {
        setTimeout(prefetchIdle, 1000);
      }
    }

    return () => {
      window.removeEventListener('popstate', syncRouteFromPath);
      window.removeEventListener('app-navigation', handleCustomNav);
    };
  }, []);

  const handlePageChange = (page: PageType, tab?: TabType, slug?: string) => {
    const href = getHref(page, tab || activeTab, slug);
    navigateTo(href, (route) => {
      setActivePage(route.page);
      setActiveTab(route.tab);
      setBlogSlug(route.blogSlug);
    });
  };

  const handleTabChange = (tab: TabType) => {
    const href = getHref('home', tab);
    navigateTo(href, (route) => {
      setActivePage('home');
      setActiveTab(route.tab);
      setBlogSlug(undefined);
    });
    setResults([]);
    setError(null);
  };

  const handleGenerateCaption = async (data: GenerateRequest) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate captions right now. Please try again with a different topic or prompt.');
      }

      const result = await response.json();
      setResults(result.captions || []);

      // Record recent project in local workspace
      addRecentProject({
        title: data.customTopic || data.category || 'Instagram Caption',
        tool: 'captions',
        toolLabel: 'Caption Generator',
        action: 'Captions generated',
        details: `${data.category || 'General'} • ${data.language || 'English'}`,
        href: '/tools/caption-generator',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to generate captions right now. Please try again with a different topic or prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBio = async (data: GenerateBioRequest) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate bios right now. Please try again with different keywords or style.');
      }

      const result = await response.json();
      setResults(result.bios || []);

      // Record recent project in local workspace
      addRecentProject({
        title: data.details ? (data.details.length > 30 ? `${data.details.slice(0, 30)}...` : data.details) : 'Instagram Bio',
        tool: 'bios',
        toolLabel: 'Bio Generator',
        action: 'Bios generated',
        details: `${data.tone || 'Creative'} tone`,
        href: '/tools/bio-generator',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to generate bios right now. Please try again with different keywords or style.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateUsername = async (data: GenerateUsernameRequest) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/generate-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate username ideas right now. Please try again with different keywords or style.');
      }

      const result = await response.json();
      setResults(result.usernames || []);

      // Record recent project in local workspace
      addRecentProject({
        title: data.keywords || 'Instagram Usernames',
        tool: 'usernames',
        toolLabel: 'Username Generator',
        action: 'Usernames generated',
        details: `${data.style || 'Creative'} style`,
        href: '/tools/username-generator',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to generate username ideas right now. Please try again with different keywords or style.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col subtle-gradient-bg text-stone-800 font-sans selection:bg-rose-500/10 selection:text-stone-900 overflow-x-clip relative">
      {/* Decorative background glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-8%] left-[-8%] w-[50%] h-[50%] bg-gradient-to-br from-rose-200/30 to-pink-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-[20%] right-[-8%] w-[42%] h-[42%] bg-gradient-to-bl from-indigo-200/35 to-violet-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[45%] h-[45%] bg-gradient-to-tr from-amber-100/30 to-rose-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>
      <Header setActivePage={handlePageChange} setActiveTab={handleTabChange} />
      
      <main className="flex-1 w-full min-h-[calc(100vh-380px)] flex flex-col">
        {activePage === 'workspace' ? (
          <Suspense fallback={<ComponentLoader />}><WorkspacePage setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : activePage === 'tools' ? (
          <Suspense fallback={<ComponentLoader />}><ToolsIndexPage setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : activePage === 'contact' ? (
          <Suspense fallback={<ComponentLoader />}><ContactPage /></Suspense>
        ) : activePage === 'about' ? (
          <Suspense fallback={<ComponentLoader />}><AboutPage /></Suspense>
        ) : activePage === 'faq' ? (
          <Suspense fallback={<ComponentLoader />}><FAQPage /></Suspense>
        ) : activePage === 'blog' ? (
          <Suspense fallback={<ComponentLoader />}><BlogPage blogSlug={blogSlug} setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : activePage === 'terms' ? (
          <Suspense fallback={<ComponentLoader />}><TermsPage /></Suspense>
        ) : activePage === 'privacy' ? (
          <Suspense fallback={<ComponentLoader />}><PrivacyPage /></Suspense>
        ) : activePage === 'disclaimer' ? (
          <Suspense fallback={<ComponentLoader />}><DisclaimerPage /></Suspense>
        ) : activePage === 'how-to' ? (
          <Suspense fallback={<ComponentLoader />}><HowToPage setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : activePage === 'sitemap' ? (
          <Suspense fallback={<ComponentLoader />}><SitemapPage setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : activePage === 'not-found' ? (
          <Suspense fallback={<ComponentLoader />}><NotFoundPage setActivePage={handlePageChange} setActiveTab={handleTabChange} /></Suspense>
        ) : (
          <div className="flex-1 max-w-5xl mx-auto px-4 py-12 md:py-20 w-full">
            {(() => {
              const isHomepage = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '/home');
              const currentTool = TOOL_SCHEMA_MAP[activeTab] || TOOL_SCHEMA_MAP['captions'];
              const pageTitle = isHomepage
                ? "Instagram Creator Tools – Captions, Hashtags, Bios & More | GrowthCaption"
                : currentTool.title;
              const pageDescription = isHomepage
                ? "Free Instagram Creator Tools for creating, organizing, and reusing social content."
                : currentTool.description;
              const pageUrl = isHomepage
                ? "https://growthcaption.com/"
                : `https://growthcaption.com${currentTool.url}`;
              const pageH1 = isHomepage
                ? "Free Instagram Creator Tools"
                : currentTool.h1;
              const pageIntro = isHomepage
                ? "Free Instagram Creator Tools for creating, organizing, and reusing social content."
                : currentTool.intro;

              return (
                <>
                  <SEO 
                    title={pageTitle}
                    description={pageDescription}
                    url={pageUrl}
                    keywords={currentTool.keywords}
                    faqs={TOOL_GUIDES[activeTab]?.faqs}
                    schemaMarkup={{
                      "@type": "WebApplication",
                      "name": isHomepage ? "GrowthCaption" : currentTool.name,
                      "url": pageUrl,
                      "description": pageDescription,
                      "applicationCategory": "SocialNetworkingApplication",
                      "operatingSystem": "All",
                      "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                      }
                    }}
                  />
                  
                  <Breadcrumbs setActivePage={handlePageChange} setActiveTab={handleTabChange} />

                  {/* Header */}
                  <header className="text-center mb-12 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm shadow-indigo-100/10 border border-white/80 bg-gradient-to-r from-rose-50/80 via-white/90 to-indigo-50/80">
                      <Sparkles size={14} className="text-rose-500 animate-pulse" />
                      <span>AI Powered Social Suite</span>
                    </div>
                    <h1 className="text-4xl md:text-6.5xl font-display font-extrabold tracking-tight text-stone-950 mb-4 max-w-3xl leading-[1.1]">
                      {pageH1}
                    </h1>
                    <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                      {pageIntro}
                    </p>
                  </header>
                </>
              );
            })()}

            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
              <div className="glass-card p-2 rounded-2xl flex gap-1.5 border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex-wrap justify-center max-w-full bg-white/70 backdrop-blur-xl">
                {[
                  { id: 'captions' as const, label: 'Caption', isPage: false },
                  { id: 'comments' as const, label: 'Comment', isPage: false },
                  { id: 'hashtags' as const, label: 'Hashtag', isPage: false },
                  { id: 'alttext' as const, label: 'ALT Text', isPage: false },
                  { id: 'bios' as const, label: 'Bio', isPage: false },
                  { id: 'usernames' as const, label: 'Username', isPage: false },
                  { id: 'brandkit' as const, label: 'Brand Kit', isPage: false },
                  { id: 'resizer' as const, label: 'Photo Resizer', isPage: false },
                  { id: 'cover' as const, label: 'Reel Cover Maker', isPage: false },
                  { id: 'grid' as const, label: 'Grid Maker', isPage: false },
                  { id: 'planner' as const, label: 'Feed Planner', isPage: false },
                  { id: 'downloader' as const, label: 'Reels Downloader', isPage: false },
                  { id: 'workspace' as const, label: 'Workspace', isPage: true },
                ].map((item) => {
                  const isActive = !item.isPage && activePage === 'home' && activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.isPage) {
                          handlePageChange('workspace');
                        } else {
                          handleTabChange(item.id as TabType);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        isActive 
                          ? 'bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-50 shadow-md shadow-stone-900/15 ring-1 ring-white/30 hover:shadow-lg' 
                          : 'text-stone-500 hover:text-stone-900 hover:bg-white/60 hover:shadow-sm'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Slot with persistent minimum height to prevent CLS */}
            <div className="w-full min-h-[520px]">
              <Suspense fallback={<ToolSkeleton />}>
                <div className={`grid ${activeTab === 'captions' || activeTab === 'bios' || activeTab === 'usernames' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'} gap-8 items-start min-h-[520px]`}>
                  
                  {/* Left Column - Form */}
                  {(activeTab === 'captions' || activeTab === 'bios' || activeTab === 'usernames') && (
                    <div className="lg:col-span-5 w-full min-h-[480px]">
                      {activeTab === 'captions' ? (
                        <CaptionForm onGenerate={handleGenerateCaption} isLoading={isLoading} />
                      ) : activeTab === 'bios' ? (
                        <BioForm onGenerate={handleGenerateBio} isLoading={isLoading} />
                      ) : (
                        <UsernameForm onGenerate={handleGenerateUsername} isLoading={isLoading} />
                      )}
                    </div>
                  )}

                  {/* Right Column - Results */}
                  {(activeTab === 'captions' || activeTab === 'bios' || activeTab === 'usernames') && (
                    <div className="lg:col-span-7 w-full space-y-6 min-h-[480px]">
                      
                      {error && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm">
                          <div className="bg-rose-500 text-white rounded-full p-1"><X size={14} /></div>
                          {error}
                        </div>
                      )}

                      {results.length > 0 ? (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-2 bg-white px-5 py-3 rounded-xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] inline-flex">
                            {activeTab === 'captions' ? <ImageIcon className="text-indigo-600" size={18} /> : <UserCircle className="text-indigo-600" size={18} />}
                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
                              Your Generated {activeTab === 'captions' ? 'Captions' : activeTab === 'bios' ? 'Bios' : 'Usernames'}
                            </h2>
                          </div>
                          <div className="flex flex-col gap-6">
                            {results.map((text, idx) => (
                              <CaptionItem key={idx} text={text} maxLength={activeTab === 'bios' ? 150 : activeTab === 'usernames' ? 30 : 2200} type={activeTab as 'captions' | 'bios' | 'usernames'} />
                            ))}
                          </div>
                        </div>
                      ) : !isLoading && !error && activeTab === 'captions' ? (
                        <TrendingList />
                      ) : !isLoading && !error && (activeTab === 'bios' || activeTab === 'usernames') ? (
                        <div className="h-full min-h-[300px] flex items-center justify-center border border-dashed border-stone-200 rounded-2xl bg-white/50">
                          <div className="text-center space-y-4 px-6 py-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 max-w-sm">
                            <UserCircle size={36} className="mx-auto text-stone-600 animate-pulse" />
                            <p className="text-stone-700 font-medium text-sm">Fill out the form to generate professional {activeTab === 'bios' ? 'bios' : 'usernames'}.</p>
                          </div>
                        </div>
                      ) : null}

                    </div>
                  )}

                  {activeTab === 'resizer' && (
                    <div className="w-full min-h-[520px]">
                      <PhotoResizer />
                    </div>
                  )}

                  {activeTab === 'grid' && (
                    <div className="w-full min-h-[520px]">
                      <GridMaker />
                    </div>
                  )}

                  {activeTab === 'planner' && (
                    <div className="w-full min-h-[520px]">
                      <FeedPlanner />
                    </div>
                  )}

                  {activeTab === 'downloader' && (
                    <div className="w-full min-h-[520px]">
                      <ReelsDownloader />
                    </div>
                  )}

                  {activeTab === 'hashtags' && (
                    <div className="w-full min-h-[520px]">
                      <HashtagGenerator />
                    </div>
                  )}

                  {activeTab === 'alttext' && (
                    <div className="w-full min-h-[520px]">
                      <AltTextGenerator />
                    </div>
                  )}

                  {activeTab === 'cover' && (
                    <div className="w-full min-h-[520px]">
                      <ReelCoverMaker />
                    </div>
                  )}

                  {activeTab === 'brandkit' && (
                    <div className="w-full min-h-[520px]">
                      <BrandKitGenerator />
                    </div>
                  )}

                  {activeTab === 'comments' && (
                    <div className="w-full min-h-[520px]">
                      <CommentGenerator />
                    </div>
                  )}
                </div>
              </Suspense>
            </div>

            {/* How It Works Section */}
            <HowItWorks tab={activeTab} />

            {/* Tool Explanatory Guide - Persistently anchored below the tool slot */}
            <ToolExplanatoryGuide tab={activeTab} onSelectTab={handleTabChange} />
          </div>
        )}
      </main>
      <Footer setActivePage={handlePageChange} setActiveTab={handleTabChange} />
      <Suspense fallback={null}>
        <ScrollToTop />
        <CookieConsent />
      </Suspense>
    </div>
  );
}

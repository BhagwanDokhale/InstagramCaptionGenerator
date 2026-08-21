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
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900">
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
          <div className="flex-1 max-w-5xl mx-auto px-4 py-8 md:py-12 w-full">
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
                  <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-2">
                      {pageH1}
                    </h1>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {pageIntro}
                    </p>
                  </header>
                </>
              );
            })()}

            {/* Responsive Tab Switcher - Auto-adjusts to screen size without horizontal scrollbar */}
            <div className="mb-8 w-full">
              <div className="bg-stone-200/60 p-1 rounded-xl border border-stone-200 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:flex lg:flex-wrap gap-1 w-full">
                {(['captions', 'comments', 'hashtags', 'alttext', 'cover', 'brandkit', 'bios', 'usernames', 'resizer', 'grid', 'planner', 'downloader'] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  const labels = {
                    captions: 'Captions',
                    comments: 'Comments',
                    hashtags: 'Hashtags',
                    alttext: 'ALT Text',
                    cover: 'Cover Maker',
                    brandkit: 'Brand Kit',
                    bios: 'Bios',
                    usernames: 'Usernames',
                    resizer: 'Resizer',
                    grid: 'Grid Maker',
                    planner: 'Planner',
                    downloader: 'Downloader'
                  };
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors text-center cursor-pointer truncate lg:flex-1 lg:min-w-[70px] ${
                        isActive 
                          ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                      title={labels[tab]}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Slot with persistent minimum height to prevent CLS */}
            <div className="w-full min-h-[520px]">
              <Suspense fallback={<ToolSkeleton />}>
                <div className={`grid ${activeTab === 'captions' || activeTab === 'bios' || activeTab === 'usernames' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'} gap-6 items-start min-h-[520px]`}>
                  
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
                    <div className="lg:col-span-7 w-full space-y-4 min-h-[480px]">
                      
                      {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-lg text-xs font-medium flex items-center gap-2">
                          <X size={14} className="text-rose-600 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      {results.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-stone-200 shadow-xs inline-flex">
                            {activeTab === 'captions' ? <ImageIcon className="text-stone-700" size={15} /> : <UserCircle className="text-stone-700" size={15} />}
                            <h2 className="text-xs font-semibold text-stone-900">
                              Generated {activeTab === 'captions' ? 'Captions' : activeTab === 'bios' ? 'Bios' : 'Usernames'} ({results.length})
                            </h2>
                          </div>
                          <div className="flex flex-col gap-4">
                            {results.map((text, idx) => (
                              <CaptionItem key={idx} text={text} maxLength={activeTab === 'bios' ? 150 : activeTab === 'usernames' ? 30 : 2200} type={activeTab as 'captions' | 'bios' | 'usernames'} />
                            ))}
                          </div>
                        </div>
                      ) : !isLoading && !error && activeTab === 'captions' ? (
                        <TrendingList />
                      ) : !isLoading && !error && (activeTab === 'bios' || activeTab === 'usernames') ? (
                        <div className="h-full min-h-[300px] flex items-center justify-center border border-dashed border-stone-200 rounded-xl bg-white p-8">
                          <div className="text-center space-y-2 max-w-xs">
                            <UserCircle size={32} className="mx-auto text-stone-400" />
                            <p className="text-stone-600 font-medium text-xs">Fill out the parameters on the left to generate customized {activeTab === 'bios' ? 'bios' : 'usernames'}.</p>
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

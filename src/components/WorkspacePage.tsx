import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Hash, 
  User, 
  Palette, 
  Clock, 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  Upload, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  RefreshCw,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { PageType } from '../types';
import { navigateTo, getHref, TabType } from '../lib/navigation';
import { 
  getWorkspaceData, 
  removeFavoriteCaption, 
  removeFavoriteHashtagSet, 
  removeBio, 
  removeUsername, 
  clearBrandKit, 
  removeRecentProject, 
  clearRecentProjects, 
  clearWorkspace, 
  exportWorkspaceData, 
  importWorkspaceData,
  isStorageAvailable,
  WorkspaceData,
  SavedCaption,
  SavedHashtagSet,
  SavedBio,
  SavedUsername,
  SavedBrandKit,
  RecentProject
} from '../lib/creatorWorkspaceStorage';
import { SEO } from './SEO';

interface WorkspacePageProps {
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

type WorkspaceFilter = 'all' | 'captions' | 'hashtags' | 'bios' | 'usernames' | 'brandkit' | 'recent';

export function WorkspacePage({ setActivePage, setActiveTab }: WorkspacePageProps) {
  const [data, setData] = useState<WorkspaceData>(getWorkspaceData());
  const [activeFilter, setActiveFilter] = useState<WorkspaceFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Confirmation modal state
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [storageSupported, setStorageSupported] = useState(true);

  // File import input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with storage updates and window events
  const refreshWorkspace = () => {
    setData(getWorkspaceData());
  };

  useEffect(() => {
    setStorageSupported(isStorageAvailable());
    refreshWorkspace();

    const handleUpdate = () => {
      refreshWorkspace();
    };

    window.addEventListener('growthcaption_workspace_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('growthcaption_workspace_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleNavigateToTool = (page: PageType, tab: TabType) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (setActiveTab) setActiveTab(tab);
    if (setActivePage) setActivePage(page);
    navigateTo(getHref(page, tab));
  };

  const handleDeleteCaption = (id: string) => {
    removeFavoriteCaption(id);
    showToast('Caption removed from workspace', 'info');
  };

  const handleDeleteHashtagSet = (id: string) => {
    removeFavoriteHashtagSet(id);
    showToast('Hashtag set removed from workspace', 'info');
  };

  const handleDeleteBio = (id: string) => {
    removeBio(id);
    showToast('Bio removed from workspace', 'info');
  };

  const handleDeleteUsername = (id: string) => {
    removeUsername(id);
    showToast('Username removed from workspace', 'info');
  };

  const handleDeleteBrandKit = () => {
    clearBrandKit();
    showToast('Brand Kit removed from workspace', 'info');
  };

  const handleDeleteRecentProject = (id: string) => {
    removeRecentProject(id);
  };

  const handleClearAllRecent = () => {
    clearRecentProjects();
    showToast('Recent projects cleared', 'info');
  };

  const handleConfirmClearWorkspace = () => {
    clearWorkspace();
    setIsClearModalOpen(false);
    showToast('Entire workspace cleared', 'info');
  };

  const handleExport = () => {
    const jsonString = exportWorkspaceData();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `growthcaption-workspace-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Workspace exported to JSON file');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importWorkspaceData(content);
        if (result.success) {
          showToast(result.message, 'success');
        } else {
          showToast(result.message, 'error');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered lists
  const query = searchQuery.toLowerCase().trim();

  const filteredCaptions = data.captions.filter(c => 
    !query || c.text.toLowerCase().includes(query) || (c.category && c.category.toLowerCase().includes(query)) || (c.tone && c.tone.toLowerCase().includes(query))
  );

  const filteredHashtags = data.hashtagSets.filter(h => 
    !query || (h.topic && h.topic.toLowerCase().includes(query)) || h.hashtags.some(tag => tag.toLowerCase().includes(query))
  );

  const filteredBios = data.bios.filter(b => 
    !query || b.text.toLowerCase().includes(query) || (b.tone && b.tone.toLowerCase().includes(query))
  );

  const filteredUsernames = data.usernames.filter(u => 
    !query || u.username.toLowerCase().includes(query) || (u.style && u.style.toLowerCase().includes(query)) || (u.niche && u.niche.toLowerCase().includes(query))
  );

  const totalSavedCount = data.captions.length + data.hashtagSets.length + data.bios.length + data.usernames.length + (data.brandKit ? 1 : 0);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 md:py-16 w-full animate-fade-in">
      <SEO 
        title="My Creator Workspace | GrowthCaption"
        description="Save your favorite captions, hashtags, bios, username ideas, and brand details in your private local GrowthCaption workspace."
        url="https://growthcaption.com/workspace"
        robots="noindex, nofollow"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-3 text-xs font-bold ${
            toastMessage.type === 'success' ? 'bg-stone-900/90 text-white border-stone-700' :
            toastMessage.type === 'error' ? 'bg-rose-900/90 text-white border-rose-700' :
            'bg-indigo-900/90 text-white border-indigo-700'
          }`}>
            <Sparkles size={14} className="text-amber-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Storage Warning if private mode restricted */}
      {!storageSupported && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Local saving is unavailable in this browser window.</p>
            <p className="text-amber-800 mt-0.5">Private browsing restrictions may prevent data persistence. You can still use all GrowthCaption generator tools normally.</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-1">
          Creator Workspace
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
          Manage your saved captions, hashtags, bios, username ideas, and brand kits locally.
        </p>

        {/* Privacy badge notice */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-600">
          <ShieldCheck size={13} className="text-stone-700 shrink-0" />
          <span>Saved locally in browser storage. No account or cloud sync required.</span>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-7 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Action Buttons: Import, Export, Clear */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportFile} 
            accept=".json,application/json" 
            className="hidden" 
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
            title="Import workspace backup JSON"
          >
            <Download size={12} />
            <span>Import</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
            title="Export workspace data as JSON"
          >
            <Upload size={12} />
            <span>Export</span>
          </button>

          {totalSavedCount > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              title="Clear all saved workspace data"
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {[
          { id: 'all', label: 'All Items', count: totalSavedCount },
          { id: 'captions', label: 'Captions', count: data.captions.length, icon: MessageSquare },
          { id: 'hashtags', label: 'Hashtag Sets', count: data.hashtagSets.length, icon: Hash },
          { id: 'bios', label: 'Bios', count: data.bios.length, icon: User },
          { id: 'usernames', label: 'Usernames', count: data.usernames.length, icon: Sparkles },
          { id: 'brandkit', label: 'Brand Kit', count: data.brandKit ? 1 : 0, icon: Palette },
          { id: 'recent', label: 'Recent Activity', count: data.recentProjects.length, icon: Clock },
        ].map(filter => {
          const isActive = activeFilter === filter.id;
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as WorkspaceFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'bg-white/80 border border-stone-200/80 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {Icon && <Icon size={13} className={isActive ? 'text-rose-400' : 'text-stone-400'} />}
              <span>{filter.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
              }`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Sections */}
      <div className="space-y-12">
        
        {/* ==========================================
            1. FAVORITE CAPTIONS SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'captions') && (
          <section className="space-y-4" aria-labelledby="section-captions">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h2 id="section-captions" className="text-base font-bold text-stone-900">
                    Favorite Captions
                  </h2>
                  <p className="text-xs text-stone-500">Your saved Instagram post and Reel captions</p>
                </div>
              </div>
              <a
                href="/tools/caption-generator"
                onClick={handleNavigateToTool('home', 'captions')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Generator</span>
                <ChevronRight size={13} />
              </a>
            </div>

            {filteredCaptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCaptions.map((caption) => {
                  const words = caption.text.trim().split(/\s+/).filter(Boolean).length;
                  const isCopied = copiedId === caption.id;
                  return (
                    <div 
                      key={caption.id}
                      className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-stone-300 hover:shadow-md transition-all relative"
                    >
                      <div>
                        {/* Meta Tags */}
                        <div className="flex items-center justify-between mb-3 text-[11px] text-stone-400 font-mono">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {caption.category && (
                              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                                {caption.category}
                              </span>
                            )}
                            {caption.tone && (
                              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-bold uppercase tracking-wider text-[10px]">
                                {caption.tone}
                              </span>
                            )}
                          </div>
                          <span>{formatDate(caption.dateSaved)}</span>
                        </div>

                        {/* Caption Text */}
                        <p className="text-stone-800 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-stone-50/50 p-3.5 rounded-xl border border-stone-200/50">
                          {caption.text}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-stone-500 font-mono">
                          {words} words • {caption.text.length} chars
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(caption.text, caption.id)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                              isCopied
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                            aria-label="Copy caption"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteCaption(caption.id)}
                            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                            aria-label="Remove caption from favorites"
                            title="Remove from favorites"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-3">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No saved captions yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Generate a caption and save your favorites here.
                </p>
                <a
                  href="/tools/caption-generator"
                  onClick={handleNavigateToTool('home', 'captions')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>Create Caption</span>
                </a>
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            2. FAVORITE HASHTAGS SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'hashtags') && (
          <section className="space-y-4" aria-labelledby="section-hashtags">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
                  <Hash size={16} />
                </div>
                <div>
                  <h2 id="section-hashtags" className="text-base font-bold text-stone-900">
                    Favorite Hashtags
                  </h2>
                  <p className="text-xs text-stone-500">Saved topic and niche hashtag sets</p>
                </div>
              </div>
              <a
                href="/tools/hashtag-generator"
                onClick={handleNavigateToTool('home', 'hashtags')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Generator</span>
                <ChevronRight size={13} />
              </a>
            </div>

            {filteredHashtags.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHashtags.map((set) => {
                  const isCopied = copiedId === set.id;
                  const allTagText = set.hashtags.join(' ');
                  return (
                    <div 
                      key={set.id}
                      className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-stone-300 hover:shadow-md transition-all relative"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-3 text-[11px] text-stone-400 font-mono">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {set.topic && (
                              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold text-[10px]">
                                Topic: {set.topic}
                              </span>
                            )}
                            {set.strategy && (
                              <span className="px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 font-bold text-[10px]">
                                {set.strategy}
                              </span>
                            )}
                          </div>
                          <span>{formatDate(set.dateSaved)}</span>
                        </div>

                        {/* Hashtag Cloud */}
                        <div className="flex flex-wrap gap-1.5 p-3.5 bg-stone-50/50 rounded-xl border border-stone-200/50 max-h-48 overflow-y-auto">
                          {set.hashtags.map((tag, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleCopy(tag, `${set.id}_${idx}`)}
                              className="text-xs font-mono font-medium text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded-lg border border-stone-200/60 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all cursor-pointer text-left"
                              title="Click to copy single hashtag"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-stone-500 font-mono">
                          {set.hashtags.length} hashtags
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(allTagText, set.id)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                              isCopied
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                            aria-label="Copy entire hashtag set"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{isCopied ? 'Copied Set' : 'Copy Set'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteHashtagSet(set.id)}
                            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                            aria-label="Remove hashtag set"
                            title="Remove hashtag set"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-500 mx-auto flex items-center justify-center mb-3">
                  <Hash size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No saved hashtag sets yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Generate relevant hashtag ideas and save the sets you want to reuse.
                </p>
                <a
                  href="/tools/hashtag-generator"
                  onClick={handleNavigateToTool('home', 'hashtags')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>Create Hashtags</span>
                </a>
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            3. SAVED BIOS SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'bios') && (
          <section className="space-y-4" aria-labelledby="section-bios">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <User size={16} />
                </div>
                <div>
                  <h2 id="section-bios" className="text-base font-bold text-stone-900">
                    Saved Bios
                  </h2>
                  <p className="text-xs text-stone-500">Profile descriptions and hook layouts</p>
                </div>
              </div>
              <a
                href="/tools/bio-generator"
                onClick={handleNavigateToTool('home', 'bios')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Generator</span>
                <ChevronRight size={13} />
              </a>
            </div>

            {filteredBios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBios.map((bio) => {
                  const isCopied = copiedId === bio.id;
                  return (
                    <div 
                      key={bio.id}
                      className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-stone-300 hover:shadow-md transition-all relative"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-3 text-[11px] text-stone-400 font-mono">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {bio.tone && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold uppercase tracking-wider text-[10px]">
                                {bio.tone}
                              </span>
                            )}
                          </div>
                          <span>{formatDate(bio.dateSaved)}</span>
                        </div>

                        {/* Bio Text */}
                        <p className="text-stone-800 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-stone-50/50 p-3.5 rounded-xl border border-stone-200/50">
                          {bio.text}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className={`text-[11px] font-mono font-medium ${bio.text.length > 150 ? 'text-rose-600' : 'text-stone-500'}`}>
                          {bio.text.length} / 150 chars
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(bio.text, bio.id)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                              isCopied
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                            aria-label="Copy bio"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteBio(bio.id)}
                            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                            aria-label="Remove bio"
                            title="Remove bio"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-3">
                  <User size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No saved bios yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Create a bio and save your favorite version.
                </p>
                <a
                  href="/tools/bio-generator"
                  onClick={handleNavigateToTool('home', 'bios')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>Create Bio</span>
                </a>
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            4. SAVED USERNAME IDEAS SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'usernames') && (
          <section className="space-y-4" aria-labelledby="section-usernames">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h2 id="section-usernames" className="text-base font-bold text-stone-900">
                    Saved Username Ideas
                  </h2>
                  <p className="text-xs text-stone-500">Handle suggestions for personal & brand profiles</p>
                </div>
              </div>
              <a
                href="/tools/username-generator"
                onClick={handleNavigateToTool('home', 'usernames')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Generator</span>
                <ChevronRight size={13} />
              </a>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-[11px] text-stone-600 flex items-center gap-2">
              <Info size={14} className="text-stone-400 shrink-0" />
              <span>Username availability should be checked directly on Instagram before registering.</span>
            </div>

            {filteredUsernames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredUsernames.map((u) => {
                  const handleName = u.username.startsWith('@') ? u.username : `@${u.username}`;
                  const cleanName = u.username.replace(/^@/, '');
                  const isCopied = copiedId === u.id;
                  return (
                    <div 
                      key={u.id}
                      className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-stone-300 hover:shadow-md transition-all relative"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold uppercase">
                            {u.style || 'Creative'}
                          </span>
                          <span>{formatDate(u.dateSaved)}</span>
                        </div>
                        <p className="text-base font-mono font-bold text-stone-900 tracking-tight my-2">
                          {handleName}
                        </p>
                        {u.niche && (
                          <p className="text-[11px] text-stone-500">Niche: {u.niche}</p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <a
                          href={`https://instagram.com/${cleanName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-stone-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                          title="Check availability on Instagram"
                        >
                          <span>Check</span>
                          <ExternalLink size={11} />
                        </a>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(cleanName, u.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                            aria-label="Copy username"
                            title="Copy handle"
                          >
                            {isCopied ? <Check size={13} /> : <Copy size={13} />}
                          </button>

                          <button
                            onClick={() => handleDeleteUsername(u.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                            aria-label="Remove username"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center mb-3">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No saved username ideas yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Generate username ideas and save the ones you like.
                </p>
                <a
                  href="/tools/username-generator"
                  onClick={handleNavigateToTool('home', 'usernames')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>Create Usernames</span>
                </a>
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            5. BRAND KIT SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'brandkit') && (
          <section className="space-y-4" aria-labelledby="section-brandkit">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Palette size={16} />
                </div>
                <div>
                  <h2 id="section-brandkit" className="text-base font-bold text-stone-900">
                    Brand Kit
                  </h2>
                  <p className="text-xs text-stone-500">Color palette, typography pairing, and visual guidelines</p>
                </div>
              </div>
              <a
                href="/tools/brand-kit-generator"
                onClick={handleNavigateToTool('home', 'brandkit')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{data.brandKit ? 'Edit in Generator' : 'Open Generator'}</span>
                <ChevronRight size={13} />
              </a>
            </div>

            {data.brandKit ? (
              <div className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                {/* Brand Header & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-display font-extrabold text-stone-900">
                        {data.brandKit.brandName}
                      </h3>
                      {data.brandKit.brandVibe && (
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                          {data.brandKit.brandVibe}
                        </span>
                      )}
                    </div>
                    {data.brandKit.brandNiche && (
                      <p className="text-xs text-stone-500 mt-0.5">Niche: {data.brandKit.brandNiche}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/tools/brand-kit-generator"
                      onClick={handleNavigateToTool('home', 'brandkit')}
                      className="px-3 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-all cursor-pointer"
                    >
                      Update Kit
                    </a>
                    <button
                      onClick={handleDeleteBrandKit}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                      title="Remove Brand Kit from workspace"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Color Palette */}
                {data.brandKit.colorPalette && data.brandKit.colorPalette.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Color Palette</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {data.brandKit.colorPalette.map((color, idx) => {
                        const isColorCopied = copiedId === `color_${idx}`;
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleCopy(color.hex, `color_${idx}`)}
                            className="p-3 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                            title="Click to copy hex code"
                          >
                            <div 
                              className="w-full h-12 rounded-xl shadow-inner mb-2 border border-black/5 flex items-center justify-center transition-transform group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            >
                              {isColorCopied && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black/70 text-white rounded">
                                  Copied!
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-stone-800 truncate">{color.name}</p>
                            <p className="text-[10px] font-mono text-stone-500">{color.hex}</p>
                            <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-600 block mt-0.5">
                              {color.role}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Typography Pair */}
                {data.brandKit.fonts && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Typography Pairing</h4>
                    <div className="p-4 rounded-2xl bg-stone-50/60 border border-stone-200/70 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Display Font</span>
                        <p className="text-lg font-bold text-stone-900 mt-0.5">{data.brandKit.fonts.display}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Body Font</span>
                        <p className="text-base font-medium text-stone-700 mt-0.5">{data.brandKit.fonts.body}</p>
                      </div>
                      {data.brandKit.fonts.rationale && (
                        <div className="md:col-span-2 pt-2 border-t border-stone-200/60">
                          <p className="text-xs text-stone-500 leading-relaxed italic">{data.brandKit.fonts.rationale}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Taglines & Hooks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {data.brandKit.taglines && data.brandKit.taglines.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Taglines</h4>
                      <div className="space-y-2">
                        {data.brandKit.taglines.map((t, idx) => (
                          <div key={idx} className="p-3 bg-stone-50/50 rounded-xl border border-stone-200/60 text-xs font-medium text-stone-800 flex items-center justify-between">
                            <span>"{t}"</span>
                            <button onClick={() => handleCopy(t, `tagline_${idx}`)} className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
                              {copiedId === `tagline_${idx}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.brandKit.brandVoice && data.brandKit.brandVoice.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Brand Voice</h4>
                      <div className="space-y-2">
                        {data.brandKit.brandVoice.map((v, idx) => (
                          <div key={idx} className="p-3 bg-stone-50/50 rounded-xl border border-stone-200/60 text-xs font-medium text-stone-700">
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-3">
                  <Palette size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No Brand Kit saved yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Create your starter Brand Kit to keep your brand details together.
                </p>
                <a
                  href="/tools/brand-kit-generator"
                  onClick={handleNavigateToTool('home', 'brandkit')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>Create Brand Kit</span>
                </a>
              </div>
            )}
          </section>
        )}

        {/* ==========================================
            6. RECENT PROJECTS SECTION
        =========================================== */}
        {(activeFilter === 'all' || activeFilter === 'recent') && (
          <section className="space-y-4" aria-labelledby="section-recent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                  <Clock size={16} />
                </div>
                <div>
                  <h2 id="section-recent" className="text-base font-bold text-stone-900">
                    Recent Projects
                  </h2>
                  <p className="text-xs text-stone-500">History of your latest generator activity and creative tools</p>
                </div>
              </div>
              {data.recentProjects.length > 0 && (
                <button
                  onClick={handleClearAllRecent}
                  className="text-xs font-bold text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Clear History
                </button>
              )}
            </div>

            {data.recentProjects.length > 0 ? (
              <div className="bg-white border border-stone-200/80 rounded-2xl divide-y divide-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                {data.recentProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="p-4 flex items-center justify-between hover:bg-stone-50/80 transition-all gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 font-bold text-xs">
                        <Clock size={14} className="text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {project.title}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                            {project.toolLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                          <span>{project.action}</span>
                          {project.details && (
                            <>
                              <span>•</span>
                              <span className="truncate">{project.details}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{formatRelativeTime(project.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={project.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (project.tool && setActiveTab) {
                            setActiveTab(project.tool as TabType);
                          }
                          if (setActivePage) {
                            setActivePage('home');
                          }
                          navigateTo(project.href);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open</span>
                        <ArrowRight size={12} />
                      </a>

                      <button
                        onClick={() => handleDeleteRecentProject(project.id)}
                        className="p-1.5 text-stone-300 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="border border-dashed border-stone-200 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 mx-auto flex items-center justify-center mb-3">
                  <Clock size={20} />
                </div>
                <h3 className="text-sm font-bold text-stone-800 mb-1">No recent projects yet.</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Your recent work will appear here as you generate content and use tools.
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Clear Workspace Confirmation Dialog Modal */}
      {isClearModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 pb-8 px-4 bg-stone-950/40 backdrop-blur-sm animate-fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsClearModalOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            
            <div className="text-center space-y-1.5">
              <h3 id="clear-modal-title" className="text-base font-bold text-stone-900">
                Clear Workspace?
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Clear all saved captions, hashtags, bios, usernames, brand kit data, and recent projects from this browser?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearWorkspace}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Clear Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, FormEvent, useRef, useEffect } from 'react';
import { Sparkles, Copy, Check, Hash, TrendingUp, BarChart3, Info, Sliders, Flame, Lightbulb, Share2, Bookmark, Heart } from 'lucide-react';
import { GenerateHashtagsRequest, HashtagsResponse } from '../types';
import { saveFavoriteHashtagSet, isHashtagSetSaved, removeFavoriteHashtagSet, addRecentProject } from '../lib/creatorWorkspaceStorage';

const PLATFORMS = [
  { id: 'Instagram', name: 'Instagram' },
  { id: 'TikTok', name: 'TikTok' },
  { id: 'LinkedIn', name: 'LinkedIn' },
  { id: 'Twitter', name: 'Twitter / X' },
  { id: 'YouTube', name: 'YouTube Shorts' },
  { id: 'Pinterest', name: 'Pinterest' }
];

const STRATEGIES = [
  { id: 'Balanced Mix', name: 'Balanced Mix (Recommended)', description: 'A structured split of Popular, Medium, and Niche hashtags.' },
  { id: 'Broad Interest', name: 'Broad Interest', description: 'Broad interest tags related to your topic.' },
  { id: 'Targeted Niche', name: 'Targeted Niche (Community Focus)', description: 'Specific community tags for dedicated topic interests.' },
  { id: 'Relevant & Engaging', name: 'Relevant & Engaging', description: 'Relevant topic tags tailored to your content.' }
];

const PRESETS = [
  { label: '🏋️‍♂️ Fitness & Diet', topic: 'Gym workout, healthy diet recipes, weight loss transformation journey' },
  { label: '✈️ Travel Travelogue', topic: 'Luxury solo travel adventure, wandering, backpacking Europe vlogs' },
  { label: '🍜 Gourmet Foodie', topic: 'Authentic ramen recipe, homemade cooking tutorial, street food review' },
  { label: '👗 Aesthetic Fashion', topic: 'Minimalist sustainable summer outfits, street style lookbook' },
  { label: '💻 Coding & Tech', topic: 'Web development workspace, fullstack developer, AI tools productivity' }
];

export function HashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [strategy, setStrategy] = useState('Balanced Mix');
  const [count, setCount] = useState(20);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HashtagsResponse | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedSingle, setCopiedSingle] = useState<string | null>(null);
  const [isSavedInWorkspace, setIsSavedInWorkspace] = useState(false);

  useEffect(() => {
    if (result && result.hashtags) {
      setIsSavedInWorkspace(isHashtagSetSaved(result.hashtags));
    }
  }, [result]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic, keyword, or description of your post.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          platform,
          strategy,
          count
        } as GenerateHashtagsRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate hashtags right now. Please check your topic and try again.');
      }

      const data = await response.json();
      setResult(data);

      // Record recent project in local workspace
      addRecentProject({
        title: topic.trim(),
        tool: 'hashtags',
        toolLabel: 'Hashtag Generator',
        action: 'Hashtags generated',
        details: `${data.hashtags?.length || count} tags • ${platform}`,
        href: '/tools/hashtag-generator',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to generate hashtags right now. Please check your topic and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!result) return;
    const hashtagText = result.hashtags.join(' ');
    navigator.clipboard.writeText(hashtagText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySection = (section: 'popular' | 'medium' | 'niche') => {
    if (!result) return;
    const tags = result.categorized[section];
    navigator.clipboard.writeText(tags.join(' '));
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopySingle = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedSingle(tag);
    setTimeout(() => setCopiedSingle(null), 1500);
  };

  const handleToggleSaveWorkspace = () => {
    if (!result) return;
    if (isSavedInWorkspace) {
      // Find matching set
      const sets = isHashtagSetSaved(result.hashtags);
      if (sets) {
        removeFavoriteHashtagSet(result.hashtags.join(' '));
      }
      setIsSavedInWorkspace(false);
    } else {
      saveFavoriteHashtagSet({
        hashtags: result.hashtags,
        topic: topic.trim(),
        strategy,
        platform,
      });
      setIsSavedInWorkspace(true);
    }
  };

  const applyPreset = (presetTopic: string) => {
    setTopic(presetTopic);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>

            {/* Keyword / Topic Input */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <Hash size={14} className="text-indigo-600" />
                Niche / Topic / Keywords
              </label>
              <textarea
                ref={textareaRef}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Weekend trip to Paris, sunset view over Eiffel Tower, travel vlog lifestyle"
                rows={3}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/40 rounded-2xl text-sm transition-all resize-none outline-none placeholder:text-stone-400 font-sans"
              />
              <p className="text-[10px] font-medium text-stone-400">
                Tip: Be specific! Enter keywords, post ideas, or describe your content for relevant tag suggestions.
              </p>
            </div>

            {/* Platform Selector */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <Flame size={14} className="text-indigo-600" />
                Target Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => {
                  const isSelected = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlatform(p.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer text-center ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hashtag Strategy */}
            <div className="space-y-2.5">
              <label htmlFor="hashtag-strategy-select" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <Sliders size={14} className="text-indigo-600" />
                Hashtag Preferences
              </label>
              <select
                id="hashtag-strategy-select"
                aria-label="Hashtag Preferences"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/40 rounded-xl text-xs font-bold text-stone-700 outline-none cursor-pointer"
              >
                {STRATEGIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 leading-normal font-medium">
                {STRATEGIES.find((s) => s.id === strategy)?.description}
              </p>
            </div>

            {/* Count Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                  <TrendingUp size={14} className="text-indigo-600" />
                  Hashtags Count
                </label>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {count} Tags
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold px-1">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>

            {/* Transparency Note */}
            <p className="text-[11px] text-stone-500 bg-stone-50/80 border border-stone-200/80 p-3 rounded-xl leading-relaxed font-normal">
              <span className="font-semibold text-stone-700">Transparency Note:</span> Hashtag suggestions are generated from your input and are not based on live Instagram trend or competition data.
            </p>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Hashtags...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="fill-current" />
                  <span>Generate Hashtag Ideas</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Presets Block */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200/60 p-5 space-y-3.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Lightbulb size={12} className="text-amber-500" />
              Quick Presets
            </h4>
            <div className="flex flex-col gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.topic)}
                  className="w-full text-left p-2.5 bg-white hover:bg-stone-100/50 rounded-xl border border-stone-200/50 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-all duration-150 flex items-center justify-between"
                >
                  <span>{preset.label}</span>
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Load Preset →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm">
              <div className="bg-rose-500 text-white rounded-full p-1 shrink-0">
                <svg className="w-3.5 h-3.5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Hash className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-sm font-bold text-stone-800">Generating Hashtag Suggestions...</h3>
                <p className="text-xs text-stone-400 font-medium">
                  Generating hashtag suggestions based on your topic, niche, and selected platform preferences.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Header Title with stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200/80 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Relevant Hashtag Ideas</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">{platform} • {strategy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    onClick={handleToggleSaveWorkspace}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                      isSavedInWorkspace
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50'
                    }`}
                    title={isSavedInWorkspace ? 'Saved in Workspace' : 'Save Set to Workspace'}
                  >
                    <Heart size={14} className={isSavedInWorkspace ? 'fill-rose-500 text-rose-500' : ''} />
                    <span>{isSavedInWorkspace ? 'Saved in Workspace' : 'Save Set'}</span>
                  </button>

                  <button
                    onClick={handleCopyAll}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm flex-1 sm:flex-initial"
                  >
                    {copiedAll ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedAll ? 'Copied All!' : 'Copy All Tags'}</span>
                  </button>
                </div>
              </div>

              {/* Categorized Split Boxes */}
              <div className="grid grid-cols-1 gap-4">
                {/* Popular Tags */}
                {result.categorized.popular && result.categorized.popular.length > 0 && (
                  <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-3.5 relative">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                          Popular Tags (&gt;1M estimated posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('popular')}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'popular' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copiedSection === 'popular' ? 'Copied!' : 'Copy Section'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.popular.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1.5 bg-rose-50/50 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold border border-rose-100 transition-colors flex items-center gap-1 group cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-[9px] text-rose-500">
                            {copiedSingle === tag ? '✓' : '＋'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medium Tags */}
                {result.categorized.medium && result.categorized.medium.length > 0 && (
                  <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-3.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                          Medium Volume (100k - 1M estimated posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('medium')}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'medium' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copiedSection === 'medium' ? 'Copied!' : 'Copy Section'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.medium.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1.5 bg-violet-50/50 hover:bg-violet-50 text-violet-700 rounded-xl text-xs font-semibold border border-violet-100 transition-colors flex items-center gap-1 group cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-[9px] text-violet-500">
                            {copiedSingle === tag ? '✓' : '＋'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Niche Tags */}
                {result.categorized.niche && result.categorized.niche.length > 0 && (
                  <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-3.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                          Niche Community (&lt;100k estimated posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('niche')}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'niche' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copiedSection === 'niche' ? 'Copied!' : 'Copy Section'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.niche.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-100 transition-colors flex items-center gap-1 group cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-[9px] text-indigo-500">
                            {copiedSingle === tag ? '✓' : '＋'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Insights Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-indigo-950">
                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/15 rounded-full filter blur-2xl pointer-events-none"></div>

                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} className="text-indigo-400" />
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
                    GrowthCaption Hashtag Overview
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 border-b border-indigo-800/40">
                  {/* Topic Focus */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-wider">Topic Focus</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-base font-extrabold px-2.5 py-0.5 rounded-lg inline-block uppercase tracking-wider text-xs ${
                        (result.analytics.topicFocus || result.analytics.difficulty || '').toLowerCase().includes('low') || (result.analytics.topicFocus || '').toLowerCase().includes('niche')
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : (result.analytics.topicFocus || result.analytics.difficulty || '').toLowerCase().includes('medium') || (result.analytics.topicFocus || '').toLowerCase().includes('balanced')
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {(result.analytics.topicFocus || result.analytics.difficulty || 'Balanced').split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                      {(result.analytics.topicFocus || result.analytics.difficulty || '').includes(' ') 
                        ? (result.analytics.topicFocus || result.analytics.difficulty || '').substring((result.analytics.topicFocus || result.analytics.difficulty || '').indexOf(' ') + 1)
                        : 'Topic focus and category breakdown tailored to your selected keywords.'}
                    </p>
                  </div>

                  {/* Audience Focus */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-wider">Audience Focus</span>
                    <div className="text-base font-extrabold text-indigo-100">
                      {result.analytics.audienceFocus || result.analytics.potentialReach || 'Topic-relevant audience'}
                    </div>
                    <p className="text-xs text-indigo-200/90 leading-relaxed font-medium">
                      Using a mix of hashtag categories helps present your content clearly to interested users.
                    </p>
                  </div>
                </div>

                {/* Hashtag Preferences Pro Tip */}
                <div className="pt-4 flex gap-3.5 items-start">
                  <div className="p-2 bg-indigo-800/40 rounded-xl text-indigo-300 shrink-0">
                    <Info size={16} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Posting Pro-Tip</h5>
                    <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                      {result.analytics.topNicheTips}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-stone-200 rounded-3xl bg-white/50">
              <div className="text-center space-y-4 px-6 py-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 mx-auto">
                  <Hash size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">Ready to Generate Hashtag Ideas?</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed font-medium">
                    Enter your topic and keywords to generate relevant hashtag ideas tailored to your niche.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

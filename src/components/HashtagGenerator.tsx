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
          <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-5 shadow-xs">
            {/* Keyword / Topic Input */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Hash size={14} className="text-stone-500" />
                Niche / Topic / Keywords <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={textareaRef}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Weekend trip to Paris, sunset view over Eiffel Tower, travel vlog lifestyle"
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg text-sm text-stone-900 transition-colors resize-none outline-none placeholder:text-stone-400 font-sans"
              />
              <p className="text-xs text-stone-500">
                Enter keywords or describe your content for relevant tag suggestions.
              </p>
            </div>

            {/* Platform Selector */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Flame size={14} className="text-stone-500" />
                Target Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {PLATFORMS.map((p) => {
                  const isSelected = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlatform(p.id)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer text-center truncate ${
                        isSelected
                          ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
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
            <div className="space-y-1.5">
              <label htmlFor="hashtag-strategy-select" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Sliders size={14} className="text-stone-500" />
                Hashtag Preferences
              </label>
              <select
                id="hashtag-strategy-select"
                aria-label="Hashtag Preferences"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg text-xs font-medium text-stone-800 outline-none cursor-pointer"
              >
                {STRATEGIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-stone-500">
                {STRATEGIES.find((s) => s.id === strategy)?.description}
              </p>
            </div>

            {/* Count Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                  <TrendingUp size={14} className="text-stone-500" />
                  Hashtags Count
                </label>
                <span className="text-xs font-semibold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded">
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
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900 focus:outline-none"
              />
              <div className="flex justify-between text-xs text-stone-400 px-1 font-medium">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>

            {/* Transparency Note */}
            <p className="text-xs text-stone-500 bg-stone-50 border border-stone-200 p-3 rounded-lg leading-relaxed">
              <span className="font-semibold text-stone-700">Note:</span> Hashtag suggestions are generated from your input and are not based on live Instagram trend data.
            </p>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Hashtags...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Generate Hashtag Ideas</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Presets Block */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-500" />
              Example Topics
            </h4>
            <div className="flex flex-col gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.topic)}
                  className="w-full text-left p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200/80 text-xs font-medium text-stone-700 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{preset.label}</span>
                  <span className="text-xs text-stone-500 font-normal">Use topic →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[380px] shadow-xs">
              <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
              <div className="space-y-1 max-w-sm">
                <h3 className="text-sm font-semibold text-stone-800">Generating Hashtag Suggestions...</h3>
                <p className="text-xs text-stone-500">
                  Creating tag sets tailored to your topic and selected platform.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-5 animate-fade-in">
              {/* Header Title with stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-4 rounded-xl shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">Generated Hashtags</h3>
                    <p className="text-xs text-stone-500">{platform} • {strategy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    onClick={handleToggleSaveWorkspace}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors border ${
                      isSavedInWorkspace
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                    title={isSavedInWorkspace ? 'Saved in Workspace' : 'Save Set to Workspace'}
                  >
                    <Heart size={14} className={isSavedInWorkspace ? 'fill-rose-500 text-rose-500' : ''} />
                    <span>{isSavedInWorkspace ? 'Saved' : 'Save Set'}</span>
                  </button>

                  <button
                    onClick={handleCopyAll}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs flex-1 sm:flex-initial"
                  >
                    {copiedAll ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedAll ? 'Copied All!' : 'Copy All Tags'}</span>
                  </button>
                </div>
              </div>

              {/* Categorized Split Boxes */}
              <div className="grid grid-cols-1 gap-3.5">
                {/* Popular Tags */}
                {result.categorized.popular && result.categorized.popular.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <h4 className="text-xs font-semibold text-stone-700">
                          Broad / Popular Tags (&gt;1M posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('popular')}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'popular' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedSection === 'popular' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.popular.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-800 rounded-md text-xs font-medium border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="text-[10px] text-stone-400 ml-0.5">
                            {copiedSingle === tag ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medium Tags */}
                {result.categorized.medium && result.categorized.medium.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <h4 className="text-xs font-semibold text-stone-700">
                          Medium Volume Tags (100k - 1M posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('medium')}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'medium' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedSection === 'medium' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.medium.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-800 rounded-md text-xs font-medium border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="text-[10px] text-stone-400 ml-0.5">
                            {copiedSingle === tag ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Niche Tags */}
                {result.categorized.niche && result.categorized.niche.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <h4 className="text-xs font-semibold text-stone-700">
                          Niche Community Tags (&lt;100k posts)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopySection('niche')}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'niche' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedSection === 'niche' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.categorized.niche.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleCopySingle(tag)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-800 rounded-md text-xs font-medium border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Click to copy single hashtag"
                        >
                          <span>{tag}</span>
                          <span className="text-[10px] text-stone-400 ml-0.5">
                            {copiedSingle === tag ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Insights Card */}
              <div className="bg-stone-900 rounded-xl p-5 text-white shadow-xs border border-stone-800">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} className="text-stone-300" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                    Hashtag Strategy Summary
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-stone-800">
                  <div className="space-y-1">
                    <span className="text-xs text-stone-400 font-medium">Topic Focus</span>
                    <div className="text-sm font-semibold text-stone-100">
                      {result.analytics.topicFocus || result.analytics.difficulty || 'Balanced Mix'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-stone-400 font-medium">Audience Focus</span>
                    <div className="text-sm font-semibold text-stone-100">
                      {result.analytics.audienceFocus || result.analytics.contentFocus || 'Targeted Community'}
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 flex gap-2.5 items-start">
                  <Info size={15} className="text-stone-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {result.analytics.topNicheTips}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[380px] flex items-center justify-center border border-dashed border-stone-200 rounded-xl bg-white p-8">
              <div className="text-center space-y-2 max-w-sm">
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                  <Hash size={20} />
                </div>
                <h3 className="text-sm font-semibold text-stone-800">Ready to Generate Hashtags</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Enter your topic and keywords on the left to generate relevant tag suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

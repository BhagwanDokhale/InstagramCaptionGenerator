import { useState, FormEvent, useRef, ChangeEvent, DragEvent } from 'react';
import { Sparkles, Copy, Check, Image as ImageIcon, Sliders, Flame, Lightbulb, BarChart3, Info, Eye, Trash2, ArrowRight, HelpCircle } from 'lucide-react';
import { GenerateAltTextRequest, AltTextResponse } from '../types';

const USE_CASES = [
  { id: 'Standard Accessibility', name: 'Standard Accessibility (A11y)', description: 'Perfect for general web standard screen readers (< 125 chars).' },
  { id: 'Blog & SEO', name: 'Blog & Web SEO', description: 'Optimized for high-intent search visibility on Google Images.' },
  { id: 'E-commerce & Products', name: 'E-commerce / Products', description: 'Highlighting product specs, colors, materials, and context.' },
  { id: 'Social Media', name: 'Social Media & Pinterest', description: 'Modern, engaging, platform-tailored descriptive context.' }
];

const TONES = [
  { id: 'Descriptive', name: 'Vivid & Descriptive', description: 'Rich details with textures, tones, and layouts.' },
  { id: 'Professional', name: 'Professional & Objective', description: 'No fluff, straightforward, and highly accessible.' },
  { id: 'Casual', name: 'Casual & Conversational', description: 'Friendly and light-hearted tone.' },
  { id: 'Minimalist', name: 'Minimalist / Ultra-Concise', description: 'Core elements only, fast reading.' }
];

const PRESETS = [
  { label: '☕ Laptop & Coffee', keywords: 'Cozy coffee shop, white ceramic latte art mug next to a laptop with lines of code, soft warm morning lighting' },
  { label: '🌿 Eco Summer Dress', keywords: 'Model wearing a beige organic linen summer dress, straw hat, standing in a field of green grass under high sun' },
  { label: '🥞 Stack of Pancakes', keywords: 'Tall stack of golden buttermilk pancakes topped with fresh wild berries and maple syrup dripping down the side' }
];

export function AltTextGenerator() {
  const [keywords, setKeywords] = useState('');
  const [useCase, setUseCase] = useState('Standard Accessibility');
  const [tone, setTone] = useState('Descriptive');
  
  // Image states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AltTextResponse | null>(null);

  // Copy indicators
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const keywordsRef = useRef<HTMLTextAreaElement>(null);

  // File conversion
  const processFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select or drop an actual image file.');
      return;
    }
    
    // Check file size (limit base64 processing to ~8MB to be safe)
    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large. Please upload an image smaller than 8MB.');
      return;
    }

    setError(null);
    setImageMime(file.type);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setImageMime('image/jpeg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imagePreview && !keywords.trim()) {
      setError('Please upload an image or provide descriptive keywords of the scene.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload: GenerateAltTextRequest = {
        useCase,
        tone,
        keywords: keywords.trim() || undefined
      };

      if (imagePreview) {
        payload.image = imagePreview;
        payload.mimeType = imageMime;
      }

      const response = await fetch('/api/generate-alt-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate alt text right now. Please ensure the image is clear or try again with keywords.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Unable to generate alt text right now. Please ensure the image is clear or try again with keywords.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  const applyPreset = (presetKeywords: string) => {
    setKeywords(presetKeywords);
    setError(null);
    if (keywordsRef.current) {
      keywordsRef.current.focus();
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>

            {/* Title */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <ImageIcon size={16} className="text-indigo-600" />
                Image Analyzer & Config
              </h3>
            </div>

            {/* Image Dropzone / Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500">
                Source Image (Optional but highly recommended)
              </label>
              
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 group">
                  <img 
                    src={imagePreview} 
                    alt="Instagram Alt Text Generator - Image Alt Text Generator uploaded source image preview" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 bg-white text-stone-800 rounded-xl text-xs font-bold shadow-md hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="p-2 bg-rose-600 text-white rounded-xl shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-2.5 ${
                    isDragging 
                      ? 'border-indigo-600 bg-indigo-50/20' 
                      : 'border-stone-200 hover:border-indigo-500 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <ImageIcon size={22} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-stone-700">Drag & drop your image here, or <span className="text-indigo-600">browse</span></p>
                    <p className="text-[10px] text-stone-400 font-medium">Supports JPEG, PNG, WEBP up to 8MB</p>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Context / Keywords description */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <HelpCircle size={14} className="text-indigo-600" />
                Image Context / Target Keywords
              </label>
              <textarea
                ref={keywordsRef}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={imagePreview ? "E.g., sustainable brand, linen summer dress, eco lifestyle (Optional, helps guide AI context)" : "Since you haven't uploaded an image, describe the scene in detail here so the AI can generate alt text."}
                rows={3}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/40 rounded-2xl text-sm transition-all resize-none outline-none placeholder:text-stone-400 font-sans"
              />
              <p className="text-[10px] font-medium text-stone-400">
                Tip: Providing more context can help create a more specific and descriptive alt text suggestion.
              </p>
            </div>

            {/* Use Case Selection */}
            <div className="space-y-2.5">
              <label htmlFor="alt-use-case-select" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <Sliders size={14} className="text-indigo-600" />
                Target Use Case
              </label>
              <select
                id="alt-use-case-select"
                aria-label="Target Use Case"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/40 rounded-xl text-xs font-bold text-stone-700 outline-none cursor-pointer"
              >
                {USE_CASES.map((uc) => (
                  <option key={uc.id} value={uc.id}>
                    {uc.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 leading-normal font-medium">
                {USE_CASES.find((uc) => uc.id === useCase)?.description}
              </p>
            </div>

            {/* Tone Selection */}
            <div className="space-y-2.5">
              <label htmlFor="alt-tone-select" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <Flame size={14} className="text-indigo-600" />
                Descriptive Tone
              </label>
              <select
                id="alt-tone-select"
                aria-label="Descriptive Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/40 rounded-xl text-xs font-bold text-stone-700 outline-none cursor-pointer"
              >
                {TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 leading-normal font-medium">
                {TONES.find((t) => t.id === tone)?.description}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Image Context...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="fill-current" />
                  <span>Generate ALT Text & Keywords</span>
                </>
              )}
            </button>
          </form>

          {/* Presets block */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200/60 p-5 space-y-3.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Lightbulb size={12} className="text-amber-500" />
              Try Scene Description Presets
            </h4>
            <div className="flex flex-col gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.keywords)}
                  className="w-full text-left p-2.5 bg-white hover:bg-stone-100/50 rounded-xl border border-stone-200/50 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-all duration-150 flex items-center justify-between cursor-pointer"
                >
                  <span>{preset.label}</span>
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Load Description →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Section */}
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
            <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[450px]">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Eye className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-sm font-bold text-stone-800">Processing Computer Vision...</h3>
                <p className="text-xs text-stone-400 font-medium">
                  We are leveraging neural models to identify objects, text, layouts, lighting, colors, and textures to build perfectly optimized descriptions.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200/80 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Optimized ALT Texts</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Use Case: {useCase} • Tone: {tone}</p>
                  </div>
                </div>
              </div>

              {/* Variations Cards */}
              <div className="space-y-4">
                {/* 1. Accessibility */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-2 relative hover:border-stone-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Standard Screen Reader (Accessibility)
                    </span>
                    <button
                      onClick={() => handleCopyText(result.standard, 'standard')}
                      className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedType === 'standard' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedType === 'standard' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 leading-relaxed pt-1.5">
                    {result.standard}
                  </p>
                </div>

                {/* 2. SEO */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-2 relative hover:border-stone-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      SEO & Search-Engine Optimized
                    </span>
                    <button
                      onClick={() => handleCopyText(result.seo, 'seo')}
                      className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedType === 'seo' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedType === 'seo' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 leading-relaxed pt-1.5">
                    {result.seo}
                  </p>
                </div>

                {/* 3. Detailed */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-2 relative hover:border-stone-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                      Rich Detailed Context (Long Description)
                    </span>
                    <button
                      onClick={() => handleCopyText(result.detailed, 'detailed')}
                      className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedType === 'detailed' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedType === 'detailed' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 leading-relaxed pt-1.5">
                    {result.detailed}
                  </p>
                </div>

                {/* 4. Social / Pinterest */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-2 relative hover:border-stone-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      Social Media & Pinterest Alt
                    </span>
                    <button
                      onClick={() => handleCopyText(result.instagram, 'instagram')}
                      className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedType === 'instagram' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedType === 'instagram' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 leading-relaxed pt-1.5">
                    {result.instagram}
                  </p>
                </div>
              </div>

              {/* Extracted SEO Keywords */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-emerald-600" />
                  Identified SEO Focus Keywords
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.suggestedKeywords.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleCopyKeyword(tag)}
                      className="px-2.5 py-1.5 bg-stone-50 hover:bg-indigo-50/50 text-stone-700 hover:text-indigo-700 rounded-xl text-xs font-semibold border border-stone-200/60 transition-all flex items-center gap-1 group cursor-pointer"
                      title="Click to copy keyword"
                    >
                      <span>{tag}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-[10px] text-indigo-500">
                        {copiedKeyword === tag ? '✓' : '＋'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights and SEO analysis */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-indigo-950">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-indigo-400" />
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
                    Accessibility & SEO Insight
                  </h4>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                  {result.seoAnalysis}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] flex items-center justify-center border border-dashed border-stone-200 rounded-3xl bg-white/50">
              <div className="text-center space-y-4 px-6 py-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 mx-auto animate-pulse">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">Ready to Analyze Your Image?</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed font-medium">
                    Upload an image or load a preset on the left, then trigger high-powered AI to generate accessibility-compliant and search-engine optimized alt texts.
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

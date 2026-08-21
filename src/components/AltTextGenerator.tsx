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
        <div className="lg:col-span-5 space-y-5">
          <form onSubmit={handleSubmit} className="bg-white border border-stone-200 p-6 rounded-xl space-y-5 shadow-xs">
            {/* Title */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <ImageIcon size={15} className="text-stone-500" />
                Image Analyzer & Configuration
              </h3>
            </div>

            {/* Image Dropzone / Preview */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Source Image (Optional but recommended)
              </label>
              
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-1.5 group">
                  <img 
                    src={imagePreview} 
                    alt="Uploaded source image preview" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-stone-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-stone-900 rounded-md text-xs font-medium shadow-sm hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="p-1.5 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${
                    isDragging 
                      ? 'border-stone-900 bg-stone-50' 
                      : 'border-stone-300 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
                    <ImageIcon size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-stone-800">Drag & drop image, or <span className="text-stone-900 underline">browse</span></p>
                    <p className="text-[11px] text-stone-400">JPEG, PNG, WEBP up to 8MB</p>
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
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <HelpCircle size={13} className="text-stone-500" />
                Image Context / Target Keywords
              </label>
              <textarea
                ref={keywordsRef}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={imagePreview ? "E.g., sustainable brand, linen summer dress, eco lifestyle (Optional, guides AI context)" : "Describe the scene in detail here so the AI can generate alt text."}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 rounded-lg text-sm transition-colors resize-none outline-none placeholder:text-stone-400 font-sans"
              />
              <p className="text-[11px] text-stone-400 font-normal">
                Tip: Adding specific nouns and settings improves SEO relevancy.
              </p>
            </div>

            {/* Use Case Selection */}
            <div className="space-y-1.5">
              <label htmlFor="alt-use-case-select" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Sliders size={13} className="text-stone-500" />
                Target Use Case
              </label>
              <select
                id="alt-use-case-select"
                aria-label="Target Use Case"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 focus:border-stone-900 rounded-lg text-xs font-medium text-stone-800 outline-none cursor-pointer"
              >
                {USE_CASES.map((uc) => (
                  <option key={uc.id} value={uc.id}>
                    {uc.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-400 font-normal">
                {USE_CASES.find((uc) => uc.id === useCase)?.description}
              </p>
            </div>

            {/* Tone Selection */}
            <div className="space-y-1.5">
              <label htmlFor="alt-tone-select" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Flame size={13} className="text-stone-500" />
                Descriptive Tone
              </label>
              <select
                id="alt-tone-select"
                aria-label="Descriptive Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 focus:border-stone-900 rounded-lg text-xs font-medium text-stone-800 outline-none cursor-pointer"
              >
                {TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-400 font-normal">
                {TONES.find((t) => t.id === tone)?.description}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg transition-colors shadow-2xs focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Image Context...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Generate ALT Text & Keywords</span>
                </>
              )}
            </button>
          </form>

          {/* Presets block */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-500" />
              Scene Description Presets
            </h4>
            <div className="flex flex-col gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.keywords)}
                  className="w-full text-left p-2.5 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:text-stone-900 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{preset.label}</span>
                  <span className="text-[11px] font-medium text-stone-500">Load →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Section */}
        <div className="lg:col-span-7 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium flex items-center gap-2.5 shadow-2xs">
              <div className="bg-red-600 text-white rounded-full p-0.5 shrink-0">
                <svg className="w-3 h-3 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[450px]">
              <div className="relative">
                <div className="w-12 h-12 border-3 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
                <Eye className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-stone-700" size={16} />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-sm font-semibold text-stone-800">Analyzing Visual Elements...</h3>
                <p className="text-xs text-stone-500 font-normal">
                  Evaluating composition, subject details, lighting, and textures to formulate accessible descriptions.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-stone-200 p-4 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Optimized ALT Texts</h3>
                    <p className="text-[11px] text-stone-500 font-normal">Use Case: {useCase} • Tone: {tone}</p>
                  </div>
                </div>
              </div>

              {/* Variations Cards */}
              <div className="space-y-3">
                {/* 1. Accessibility */}
                <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 hover:border-stone-300 transition-colors shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      Standard Screen Reader (Accessibility)
                    </span>
                    <button
                      onClick={() => handleCopyText(result.standard, 'standard')}
                      className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    >
                      {copiedType === 'standard' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedType === 'standard' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed pt-1">
                    {result.standard}
                  </p>
                </div>

                {/* 2. SEO */}
                <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 hover:border-stone-300 transition-colors shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      SEO & Search-Engine Optimized
                    </span>
                    <button
                      onClick={() => handleCopyText(result.seo, 'seo')}
                      className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    >
                      {copiedType === 'seo' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedType === 'seo' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed pt-1">
                    {result.seo}
                  </p>
                </div>

                {/* 3. Detailed */}
                <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 hover:border-stone-300 transition-colors shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      Rich Detailed Context (Long Description)
                    </span>
                    <button
                      onClick={() => handleCopyText(result.detailed, 'detailed')}
                      className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    >
                      {copiedType === 'detailed' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedType === 'detailed' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed pt-1">
                    {result.detailed}
                  </p>
                </div>

                {/* 4. Social / Pinterest */}
                <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 hover:border-stone-300 transition-colors shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      Social Media & Pinterest Alt
                    </span>
                    <button
                      onClick={() => handleCopyText(result.instagram, 'instagram')}
                      className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    >
                      {copiedType === 'instagram' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedType === 'instagram' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed pt-1">
                    {result.instagram}
                  </p>
                </div>
              </div>

              {/* Extracted SEO Keywords */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2.5 shadow-2xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-stone-500" />
                  Identified SEO Focus Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {result.suggestedKeywords.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleCopyKeyword(tag)}
                      className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-md text-xs font-medium border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Click to copy keyword"
                    >
                      <span>{tag}</span>
                      <span className="text-[10px] text-stone-400">
                        {copiedKeyword === tag ? '✓' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights and SEO analysis */}
              <div className="bg-stone-900 rounded-xl p-5 text-white space-y-2 border border-stone-800 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Info size={15} className="text-stone-400" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Accessibility & SEO Insight
                  </h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  {result.seoAnalysis}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] flex items-center justify-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
              <div className="text-center space-y-3 px-6 py-8 bg-white rounded-xl border border-stone-200 max-w-sm shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                  <ImageIcon size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-stone-800">Ready to Analyze Your Image?</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Upload an image or load a preset on the left to generate accessibility-compliant and search-engine optimized alt texts.
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

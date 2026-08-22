import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  Volume2, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Eye, 
  BookOpen, 
  Grid, 
  FileText, 
  Flame, 
  Info,
  Heart,
  Sliders,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { BrandKit, BrandColor } from '../types';
import { saveBrandKit, addRecentProject } from '../lib/creatorWorkspaceStorage';

const VIBE_PRESETS = [
  {
    id: 'Minimalist Luxury',
    name: 'Minimalist Luxury',
    description: 'High-end, subtle, spacious, and extremely refined.',
    accent: 'bg-stone-900 text-stone-50',
    colors: [
      { hex: '#1C1917', name: 'Charcoal Obsidian', role: 'Primary', description: 'Deep grounding shade for text & display' },
      { hex: '#D6CFC7', name: 'Warm Putty', role: 'Secondary', description: 'Elegant neutral for borders & structure' },
      { hex: '#D4AF37', name: 'Aureolin Gold', role: 'Accent', description: 'Sophisticated highlight color for CTAs' },
      { hex: '#292524', name: 'Stone Hearth', role: 'Dark Neutral', description: 'Dark elements & subheadings' },
      { hex: '#F9F8F6', name: 'Alabaster Silk', role: 'Light Neutral', description: 'Luminous backdrop canvas color' }
    ],
    fonts: {
      display: 'Playfair Display',
      body: 'Plus Jakarta Sans',
      rationale: 'Playfair Display brings historical elegance and luxury, while Plus Jakarta Sans maintains an exceptionally clean, modern readability.'
    }
  },
  {
    id: 'Vibrant & Playful',
    name: 'Vibrant & Playful',
    description: 'Energetic, cheerful, magnetic, and full of life.',
    accent: 'bg-rose-500 text-white',
    colors: [
      { hex: '#FF5E62', name: 'Coral Punch', role: 'Primary', description: 'Energetic branding focal point' },
      { hex: '#FFBE53', name: 'Sunbeam Ochre', role: 'Secondary', description: 'Warm supportive tone for banners' },
      { hex: '#7C3AED', name: 'Electric Violet', role: 'Accent', description: 'Vibrant highlight color for links' },
      { hex: '#1E1B4B', name: 'Midnight Ink', role: 'Dark Neutral', description: 'Contrast shade for heavy text' },
      { hex: '#FFFBEB', name: 'Vanilla Cream', role: 'Light Neutral', description: 'Warm, highly cheerful background tone' }
    ],
    fonts: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      rationale: 'Outfit provides a rounded, energetic display appearance that pairs seamlessly with the friendly geometric curves of Plus Jakarta Sans.'
    }
  },
  {
    id: 'Bold & Retro',
    name: 'Bold & Retro',
    description: 'Strong, nostalgic, full of personality and warmth.',
    accent: 'bg-amber-600 text-white',
    colors: [
      { hex: '#C2410C', name: 'Burnt Terracotta', role: 'Primary', description: 'Nostalgic, warm primary branding shade' },
      { hex: '#15803D', name: 'Forest Sage', role: 'Secondary', description: 'Rich earthy supportive green' },
      { hex: '#EAB308', name: 'Golden Mustard', role: 'Accent', description: 'High-contrast pop color for elements' },
      { hex: '#451A03', name: 'Dark Cocoa', role: 'Dark Neutral', description: 'Heavy retro shade for copy & borders' },
      { hex: '#FEFBF3', name: 'Warm Oatmeal', role: 'Light Neutral', description: 'Nostalgic off-white background canvas' }
    ],
    fonts: {
      display: 'Space Grotesk',
      body: 'Inter',
      rationale: 'Space Grotesk introduces quirky, high-personality geometric lettering while Inter provides a solid, highly-readable base.'
    }
  },
  {
    id: 'Elegant & Pastel',
    name: 'Elegant & Pastel',
    description: 'Soft, graceful, delicate, and beautifully curated.',
    accent: 'bg-indigo-500 text-white',
    colors: [
      { hex: '#A5B4FC', name: 'Soft Lavender', role: 'Primary', description: 'Graceful main brand colorway' },
      { hex: '#FDA4AF', name: 'Powder Rose', role: 'Secondary', description: 'Gentle secondary rose highlight' },
      { hex: '#0D9488', name: 'Deep Teal', role: 'Accent', description: 'Sharp, elegant highlight for links' },
      { hex: '#1E293B', name: 'Slate Obsidian', role: 'Dark Neutral', description: 'Readable cool gray for typography' },
      { hex: '#FAFAFF', name: 'Blush Ice', role: 'Light Neutral', description: 'Gently cool lavender-tinted background' }
    ],
    fonts: {
      display: 'Playfair Display',
      body: 'Outfit',
      rationale: 'The luxury serifs of Playfair Display express maximum sophistication when paired with the modern, lightweight geometric sans Outfit.'
    }
  },
  {
    id: 'Cyberpunk Tech',
    name: 'Cyberpunk Tech',
    description: 'Futuristic, high-contrast, edgy, and digital-first.',
    accent: 'bg-violet-600 text-white',
    colors: [
      { hex: '#8B5CF6', name: 'Neon Indigo', role: 'Primary', description: 'Electric neon glow brand focal' },
      { hex: '#06B6D4', name: 'Cyber Cyan', role: 'Secondary', description: 'Futuristic digital secondary highlight' },
      { hex: '#10B981', name: 'Matrix Emerald', role: 'Accent', description: 'Sharp functional tech pop color' },
      { hex: '#0F172A', name: 'Deep Slate Carbon', role: 'Dark Neutral', description: 'Ultra-dark digital slate base' },
      { hex: '#F8FAFC', name: 'Clean Titanium', role: 'Light Neutral', description: 'Modern, sterile gray base canvas' }
    ],
    fonts: {
      display: 'Space Grotesk',
      body: 'Inter',
      rationale: 'The futuristic mono-spaced elements of Space Grotesk blend perfectly with the clean, neutral digital density of Inter.'
    }
  },
  {
    id: 'Earthy & Organic',
    name: 'Earthy & Organic',
    description: 'Natural, grounded, holistic, and deeply authentic.',
    accent: 'bg-emerald-800 text-white',
    colors: [
      { hex: '#166534', name: 'Moss Fern', role: 'Primary', description: 'Organic forest main shade' },
      { hex: '#B45309', name: 'Terracotta Clay', role: 'Secondary', description: 'Grounded warm secondary earth tone' },
      { hex: '#0891B2', name: 'Aqua Eucalyptus', role: 'Accent', description: 'Refreshing natural highlight' },
      { hex: '#14532D', name: 'Dark Spruce', role: 'Dark Neutral', description: 'Deep moss-dark shade for captions' },
      { hex: '#F4F7F4', name: 'Soft Sage Dust', role: 'Light Neutral', description: 'Extremely calm natural-tint canvas' }
    ],
    fonts: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      rationale: 'Outfit provides a friendly, organic display appearance that pairs beautifully with the balanced natural weight of Plus Jakarta Sans.'
    }
  }
];

type BrandKitSource = 'preset' | 'generating' | 'ai-generated' | 'fallback';

export function BrandKitGenerator() {
  const [brandName, setBrandName] = useState('');
  const [brandNiche, setBrandNiche] = useState('');
  const [brandVibe, setBrandVibe] = useState('Minimalist Luxury');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Explicit state logic to distinguish initial starter/preset kits from AI-generated results
  const [brandKitSource, setBrandKitSource] = useState<BrandKitSource>('preset');

  // Custom generated or preset brand kit
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [isSavedInWorkspace, setIsSavedInWorkspace] = useState(false);

  // On mount or vibe change, populate preset as a start
  useEffect(() => {
    const selectedPreset = VIBE_PRESETS.find(p => p.id === brandVibe);
    if (selectedPreset) {
      setCustomColors(selectedPreset.colors.map(c => c.hex));
      
      // Default initial templates before generating with AI
      const mockKit: BrandKit = {
        taglines: [
          `Elevate your daily ritual.`,
          `Designed for the intentional observer.`,
          `Crafted simplicity, reimagined.`
        ],
        bioHooks: [
          `✨ Crafting intentional living spaces\n☕ Curating aesthetic design details\n👇 Discover our catalog below`,
          `Minimalism isn't subtraction. It's focus.\n🌿 Curated design, zero noise.\nShop our minimal capsule ⬇️`,
          `Modern aesthetic essentials.\nPure elements. Timeless appeal.\nEst. 2026 🪐`
        ],
        colorPalette: selectedPreset.colors,
        fonts: selectedPreset.fonts,
        brandVoice: [
          'Intentional — Every communication is measured, thoughtful, and delivers value.',
          'Understated — Avoids hype, exclamation marks, or boastful claims.',
          'Warm — Relatably human, sophisticated yet welcoming and accessible.'
        ],
        keywords: ['#MinimalistAesthetic', '#IntentionalLiving', '#CurationStyle', '#DesignInspiration', '#SlowLiving'],
        gridTheme: 'Aesthetic Checkerboard: alternate high-contrast Alabaster Silk graphics with clean, high-negative-space photography of single objects framed with Stone Hearth shadows.'
      };
      setBrandKit(mockKit);
      setBrandKitSource('preset');
    }
  }, [brandVibe]);

  // Load Google Fonts dynamically for visual preview
  useEffect(() => {
    if (brandKit?.fonts?.display || brandKit?.fonts?.body) {
      const displayFont = brandKit.fonts.display.split(' ')[0] || '';
      const bodyFont = brandKit.fonts.body.split(' ')[0] || '';
      
      const linkId = 'dynamic-brand-fonts';
      let linkElement = document.getElementById(linkId) as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.id = linkId;
        linkElement.rel = 'stylesheet';
        document.head.appendChild(linkElement);
      }
      
      const families = [];
      if (displayFont) families.push(`family=${encodeURIComponent(displayFont.replace(/['"]/g, ''))}:wght@400;700;800`);
      if (bodyFont) families.push(`family=${encodeURIComponent(bodyFont.replace(/['"]/g, ''))}:wght@400;500;700`);
      
      if (families.length > 0) {
        linkElement.href = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
      }
    }
  }, [brandKit]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setError('Please provide a brand name to generate your personalized kit.');
      return;
    }

    setIsLoading(true);
    setBrandKitSource('generating');
    setError(null);

    try {
      const response = await fetch('/api/generate-brandkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          brandNiche: brandNiche.trim() || 'Lifestyle and aesthetic curation',
          brandVibe,
          language
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate custom brand kit right now. We loaded a curated starter brand kit based on your selected vibe.');
      }

      const data: BrandKit = await response.json();
      setBrandKit(data);
      setCustomColors(data.colorPalette.map(c => c.hex));
      setBrandKitSource('ai-generated');

      // Record recent project
      addRecentProject({
        title: brandName.trim() || 'Brand Kit',
        tool: 'brandkit',
        toolLabel: 'Brand Kit Generator',
        action: 'AI Brand Kit generated',
        details: `${brandVibe} • ${brandNiche.trim() || 'Lifestyle'}`,
        href: '/tools/brand-kit-generator',
      });
    } catch (err: any) {
      console.warn('AI Generation Error:', err);
      // Fail gracefully: generate custom placeholders locally based on the selected vibe!
      const selectedPreset = VIBE_PRESETS.find(p => p.id === brandVibe) || VIBE_PRESETS[0];
      const fallbackKit: BrandKit = {
        taglines: [
          `The essence of ${brandName.trim()}.`,
          `Crafted for the modern explorer.`,
          `Live beautifully, choose ${brandName.trim()}.`
        ],
        bioHooks: [
          `✨ ${brandName.trim()} | ${brandNiche.trim() || 'Aesthetic lifestyle'}\n🌿 Intentional design, curation, and details.\n👇 Discover more below`,
          `Welcome to the world of ${brandName.trim()}.\n☕ ${brandNiche.trim() || 'Lifestyle essentials'}\nJoin our journey ⬇️`,
          `Est. 2026 | ${brandName.trim()}\nCurated for the timeless observer.\nExplore the capsule collections ⬇️`
        ],
        colorPalette: selectedPreset.colors,
        fonts: selectedPreset.fonts,
        brandVoice: [
          'Authentic: Grounded in high-quality elements, speaking clearly and honestly.',
          'Inspiring: Uplifts the audience with high visual quality and beautiful styling cues.',
          'Cohesive: Creates a peaceful atmosphere of structured elegance.'
        ],
        keywords: [
          `#${brandName.trim().replace(/\s+/g, '')}`,
          '#AestheticBrand',
          '#DesignInspiration',
          `#${brandVibe.replace(/\s+/g, '')}Vibe`,
          '#SocialCuration'
        ],
        gridTheme: `Row-by-Row Storytelling: Design your grid using a 3-post narrative. Post 1: A close-up texture shot with ${selectedPreset.colors[4].hex} tone; Post 2: A minimalist text graphic in ${selectedPreset.colors[0].hex}; Post 3: A portrait showcasing human interaction.`
      };
      setBrandKit(fallbackKit);
      setCustomColors(fallbackKit.colorPalette.map(c => c.hex));
      setBrandKitSource('fallback');
      setError('Unable to reach the generation service right now. We loaded a curated starter brand kit based on your selected vibe.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleColorChange = (index: number, newHex: string) => {
    if (!brandKit) return;
    const updatedPalette = [...brandKit.colorPalette];
    updatedPalette[index] = {
      ...updatedPalette[index],
      hex: newHex
    };
    setBrandKit({
      ...brandKit,
      colorPalette: updatedPalette
    });
    const updatedCustomColors = [...customColors];
    updatedCustomColors[index] = newHex;
    setCustomColors(updatedCustomColors);
  };

  const downloadBrandKitJSON = () => {
    if (!brandKit) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ brandName: brandName || 'My Brand', ...brandKit }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${(brandName || 'brand').toLowerCase().replace(/\s+/g, '_')}_brand_kit.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getPlainTextSummary = () => {
    if (!brandKit) return '';
    return `=== BRAND KIT FOR: ${brandName || 'My Brand'} ===
Vibe: ${brandVibe}
Niche: ${brandNiche || 'General'}

--- CORE TAGLINES ---
${brandKit.taglines.map((t, idx) => `${idx + 1}. "${t}"`).join('\n')}

--- INSTAGRAM BIO HOOKS ---
${brandKit.bioHooks.map((b, idx) => `[Option ${idx + 1}]\n${b}\n`).join('\n')}

--- BRAND COLOR PALETTE ---
${brandKit.colorPalette.map(c => `- ${c.role} (${c.name}): ${c.hex} - ${c.description}`).join('\n')}

--- TYPOGRAPHY ---
Display Font (Headings): ${brandKit.fonts.display}
Body Font (Text): ${brandKit.fonts.body}
Rationale: ${brandKit.fonts.rationale}

--- BRAND VOICE GUIDELINES ---
${brandKit.brandVoice.map(v => `- ${v}`).join('\n')}

--- SEO KEYWORDS & TAGS ---
${brandKit.keywords.join(', ')}

--- INSTAGRAM FEED THEME RECIPE ---
${brandKit.gridTheme}
`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10" id="brand-kit-section">
      {/* Intro info bar */}
      <div className="glass-card p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-white/80 bg-white/75 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 md:max-w-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
            <Palette size={16} className="text-violet-500" />
            Social Brand Identity Generator
          </h2>
          <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
            Instantly formulate a coherent Instagram brand identity. Design color combinations, pair web fonts, establish voice styles, and formulate clear bio layouts that fit cleanly on your feed.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 text-xs font-bold border border-violet-100/80 shadow-xs">
          <Sparkles size={13} className="text-violet-600 animate-pulse" />
          <span>Professional Palette Curation</span>
        </div>
      </div>

      {/* Main interactive container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Setup Form */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-white/80 bg-white/75 backdrop-blur-xl space-y-6">
          <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
            <Sliders size={18} className="text-rose-500" />
            Configure Brand
          </h3>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Brand Name Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. SÖDER Cafe, Solstice Wear"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-850 font-medium placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 bg-stone-50/30 transition-all"
                required
              />
            </div>

            {/* Brand Description / Niche */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Niche & Description
              </label>
              <textarea
                placeholder="e.g. Scandinavian espresso bar serving fresh matcha & vegan sourdough in Seattle."
                value={brandNiche}
                onChange={(e) => setBrandNiche(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-850 font-medium placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 bg-stone-50/30 transition-all resize-none"
              />
              <p className="text-[11px] text-stone-400">Describe what you do, who your target audience is, or key brand objects.</p>
            </div>

            {/* Vibe Selection Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Brand Vibe Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VIBE_PRESETS.map((p) => {
                  const isSelected = brandVibe === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setBrandVibe(p.id)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'border-stone-900 bg-stone-900/5 shadow-sm text-stone-900' 
                          : 'border-stone-200 hover:border-stone-400 text-stone-500 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{p.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label htmlFor="brandkit-language-select" className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Output Language
              </label>
              <select
                id="brandkit-language-select"
                aria-label="Output Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 font-bold bg-white text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 cursor-pointer"
              >
                {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Hindi', 'Arabic'].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-3 bg-amber-50 border border-amber-100 text-amber-800 text-xs rounded-xl font-bold flex gap-2 items-start">
                <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                isLoading 
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-50 hover:shadow-md active:scale-98'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Synthesizing Brand Identity...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Generate AI Brand Kit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Identity Preview Card Board */}
        <div className="lg:col-span-7 space-y-6">
          
          {brandKit ? (
            <div className="space-y-6">
              
              {/* Transparency & Status Header Banner */}
              <div aria-live="polite">
                {brandKitSource === 'preset' && (
                  <div className="bg-amber-50/90 border border-amber-200/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5 sm:mt-0">
                        <Sliders size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                            Starter Brand Kit
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 text-[10px] font-bold border border-amber-200/90">
                            Preset Preview
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-0.5">
                          Example preset based on the <strong className="text-stone-800">{brandVibe}</strong> style. Customize this starter kit or generate your own with AI.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {brandKitSource === 'generating' && (
                  <div className="bg-indigo-50/90 border border-indigo-200/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200/80 flex items-center justify-center text-indigo-800 shrink-0 mt-0.5 sm:mt-0">
                        <RefreshCw size={16} className="animate-spin text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                            Generating your brand kit...
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100/90 text-indigo-900 text-[10px] font-bold border border-indigo-200/90">
                            Creating personalized brand kit
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-0.5">
                          Formulating custom colors, typography, taglines, and bios based on your brand details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {brandKitSource === 'ai-generated' && (
                  <div className="bg-emerald-50/90 border border-emerald-200/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5 sm:mt-0">
                        <Sparkles size={16} className="text-emerald-600" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                            AI Generated Brand Kit
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-900 text-[10px] font-bold border border-emerald-200/90 flex items-center gap-1">
                            <Sparkles size={11} className="text-emerald-600" aria-hidden="true" />
                            ✨ AI Generated
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-0.5">
                          Generated based on your brand details and preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {brandKitSource === 'fallback' && (
                  <div className="bg-stone-100/90 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-700 shrink-0 mt-0.5 sm:mt-0">
                        <Info size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                            Starter Brand Kit
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[10px] font-bold border border-stone-300">
                            Generated Locally
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-0.5">
                          Generated locally from your selections.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="bg-white/80 border border-stone-200/80 p-3 rounded-2xl flex items-center justify-between gap-4 flex-wrap shadow-sm">
                <div className="flex items-center gap-2 pl-2">
                  <Palette size={16} className="text-indigo-600" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {brandKitSource === 'ai-generated' 
                      ? `${brandName || 'Brand'}: ${brandVibe} Identity`
                      : `Starter Kit: ${brandVibe}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => {
                      if (!brandKit) return;
                      const saved = saveBrandKit(brandKit, {
                        brandName: brandName.trim() || 'My Brand',
                        brandNiche: brandNiche.trim() || undefined,
                        brandVibe: brandVibe,
                      });
                      if (saved) {
                        setIsSavedInWorkspace(true);
                        setTimeout(() => setIsSavedInWorkspace(false), 2500);
                      }
                    }}
                    className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                      isSavedInWorkspace
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600 hover:text-rose-600 hover:border-rose-200'
                    }`}
                    title={isSavedInWorkspace ? "Saved in Workspace" : "Save Brand Kit to Workspace"}
                  >
                    <Heart size={13} className={isSavedInWorkspace ? "fill-rose-500 text-rose-500" : ""} />
                    <span>{isSavedInWorkspace ? 'Saved in Workspace' : 'Save to Workspace'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(getPlainTextSummary(), 'all')}
                    className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    title="Copy all details to clipboard"
                  >
                    {copiedSection === 'all' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedSection === 'all' ? 'Copied' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={downloadBrandKitJSON}
                    className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    title="Download kit as JSON file"
                  >
                    <Download size={13} />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* 1. Color Palette Card */}
              <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <Palette size={16} className="text-rose-500" />
                    Color Palette (5 Cohesive Tones)
                  </h4>
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Click color bubble to copy HEX</span>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {brandKit.colorPalette.map((color, idx) => {
                    const currentHex = customColors[idx] || color.hex;
                    return (
                      <div key={idx} className="flex flex-col items-center space-y-2 group">
                        {/* Interactive Color Box */}
                        <div 
                          onClick={() => copyToClipboard(currentHex, `hex-${idx}`)}
                          className="w-full aspect-[4/5] rounded-xl shadow-inner border border-stone-200/30 cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                          style={{ backgroundColor: currentHex }}
                        >
                          {/* Hover hex overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-1 text-white text-[10px] font-bold">
                            {copiedSection === `hex-${idx}` ? (
                              <Check size={14} className="text-emerald-400" />
                            ) : (
                              <Copy size={12} />
                            )}
                            <span>{copiedSection === `hex-${idx}` ? 'Copied' : 'Copy'}</span>
                          </div>
                        </div>

                        {/* Color details */}
                        <div className="text-center w-full min-w-0">
                          <div className="text-[10px] font-bold text-stone-800 truncate" title={color.name}>
                            {color.name}
                          </div>
                          <div className="text-[9px] text-stone-400 font-mono mt-0.5 uppercase tracking-wide">
                            {currentHex}
                          </div>
                          <div className="inline-block px-1 py-0.5 rounded bg-stone-100 text-[8px] font-bold uppercase text-stone-500 mt-1">
                            {color.role}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Color edit inputs section */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 md:grid-cols-5 gap-2 bg-stone-50/50 p-3 rounded-xl border border-stone-100">
                  {brandKit.colorPalette.map((color, idx) => {
                    const currentHex = customColors[idx] || color.hex;
                    return (
                      <div key={idx} className="space-y-1">
                        <span className="text-[9px] font-bold text-stone-400 block uppercase truncate">{color.role}</span>
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="color" 
                            value={currentHex}
                            onChange={(e) => handleColorChange(idx, e.target.value)}
                            className="w-5 h-5 rounded cursor-pointer border border-stone-200 shrink-0"
                          />
                          <input 
                            type="text" 
                            value={currentHex} 
                            onChange={(e) => handleColorChange(idx, e.target.value)}
                            maxLength={7}
                            className="w-full text-[10px] font-mono px-1 py-0.5 border border-stone-200 rounded focus:outline-none focus:border-stone-600 bg-white text-stone-800"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <p className="text-[11px] text-stone-500 leading-relaxed italic">
                    <strong>Creative Guide:</strong> {brandKit.colorPalette.map(c => `Use ${c.name} (${c.hex}) as ${c.role.toLowerCase()}: ${c.description.toLowerCase()}`).join('. ')}.
                  </p>
                </div>
              </div>

              {/* 2. Real-Time Typographic Preview */}
              <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <Type size={16} className="text-violet-500" />
                  Premium Typography & Visual Mockup
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                  
                  {/* Left: Typo detail list */}
                  <div className="md:col-span-5 space-y-4 flex flex-col justify-between bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-stone-400 block uppercase">Display Font (Titles)</span>
                        <div className="text-base font-bold text-stone-900 font-sans">
                          {brandKit.fonts.display}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-stone-400 block uppercase">Body Font (Captions)</span>
                        <div className="text-base font-bold text-stone-900 font-sans">
                          {brandKit.fonts.body}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 leading-relaxed pt-3 border-t border-stone-100">
                      <strong>Typography Rationale:</strong> {brandKit.fonts.rationale}
                    </div>
                  </div>

                  {/* Right: Instagram Post Mockup */}
                  <div className="md:col-span-7 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden flex flex-col justify-between aspect-square p-6 md:p-8"
                    style={{ backgroundColor: customColors[4] || '#FAFAFA' }}
                  >
                    {/* Watermark/Profile Header */}
                    <div className="flex items-center justify-between w-full border-b pb-3" style={{ borderColor: `${customColors[1] || '#EFEFEF'}40` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-dashed text-white" 
                          style={{ 
                            backgroundColor: customColors[0],
                            fontFamily: brandKit.fonts.display 
                          }}
                        >
                          {brandName ? brandName.substring(0, 2).toUpperCase() : 'CO'}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-stone-800 tracking-wide font-sans">{brandName || 'mybrand.agency'}</div>
                          <div className="text-[9px] text-stone-400 font-sans">Sponsored</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] font-bold text-stone-500">Preview Layout</span>
                    </div>

                    {/* Central Design Focus */}
                    <div className="my-auto space-y-3 text-center py-4">
                      <h5 
                        className="text-2xl md:text-3.5xl font-extrabold tracking-tight"
                        style={{ 
                          color: customColors[0],
                          fontFamily: `${brandKit.fonts.display}, serif, sans-serif`
                        }}
                      >
                        {brandName || 'Your Brand Here'}
                      </h5>
                      <p 
                        className="text-xs md:text-sm font-medium max-w-xs mx-auto leading-relaxed"
                        style={{ 
                          color: customColors[3],
                          fontFamily: `${brandKit.fonts.body}, sans-serif`
                        }}
                      >
                        {brandKit.taglines[0]}
                      </p>
                    </div>

                    {/* Call to action footer */}
                    <div className="flex items-center justify-between w-full pt-3" style={{ borderTop: `1px solid ${(customColors[1] || '#EFEFEF')}40` }}>
                      <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase font-sans">Explore Collection</span>
                      <div 
                        className="px-3.5 py-1.5 rounded-full text-[9px] font-bold text-white shadow-sm flex items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: customColors[2] }}
                      >
                        <span>Learn More</span>
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. Core Slogans / Hooks */}
              <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <Flame size={16} className="text-amber-500" />
                  Magnetic Slogans & Taglines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {brandKit.taglines.map((tagline, idx) => (
                    <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex flex-col justify-between gap-3 group relative hover:border-stone-300 transition-colors">
                      <span className="text-[9px] font-bold text-stone-400 block uppercase">Tagline Option {idx + 1}</span>
                      <p className="text-stone-850 font-bold text-sm leading-relaxed font-sans italic">
                        "{tagline}"
                      </p>
                      <button
                        onClick={() => copyToClipboard(`"${tagline}"`, `tagline-${idx}`)}
                        className="self-end p-1.5 rounded bg-white hover:bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                        title="Copy tagline"
                      >
                        {copiedSection === `tagline-${idx}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Instagram Bio Hooks */}
              <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-500" />
                  Optimized Instagram Bios (Under 150 Chars)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {brandKit.bioHooks.map((bio, idx) => (
                    <div key={idx} className="bg-stone-50/50 rounded-xl p-4 border border-stone-100 flex flex-col justify-between gap-3 relative hover:border-stone-200 transition-all">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-stone-400 uppercase">Bio Layout Suggestion {idx + 1}</span>
                          <span className="text-[9px] font-bold text-stone-400 font-mono">{bio.length}/150</span>
                        </div>
                        <p className="text-stone-800 font-semibold text-xs leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-stone-100 font-sans shadow-sm">
                          {bio}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bio, `bio-${idx}`)}
                        className="w-full py-2 px-3 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedSection === `bio-${idx}` ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied to Clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Instagram Bio</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Brand Guidelines & Grid Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Voice adjectives */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <Volume2 size={16} className="text-indigo-500" />
                    Brand Tone & Communication Voice
                  </h4>
                  <ul className="space-y-3">
                    {brandKit.brandVoice.map((voice, idx) => {
                      const parts = voice.split(':');
                      const title = parts[0] || 'Attribute';
                      const desc = parts.slice(1).join(':') || '';
                      return (
                        <li key={idx} className="bg-stone-50/50 p-3 rounded-xl border border-stone-100/60 flex items-start gap-3">
                          <span className="text-xs font-extrabold text-white bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">{idx + 1}</span>
                          <div>
                            <span className="text-xs font-bold text-stone-900 block">{title}</span>
                            <span className="text-[11px] text-stone-500 leading-relaxed mt-0.5 block">{desc}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Grid feed and Keywords */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                      <Grid size={16} className="text-purple-500" />
                      Recommended Grid Theme & Layout
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed bg-purple-50/30 p-3 rounded-xl border border-purple-100/40">
                      <strong>Visual Recipe:</strong> {brandKit.gridTheme}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">SEO Keywords & Search tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {brandKit.keywords.map((kw, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-stone-100 text-stone-600 text-[10px] font-semibold">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* Empty state placeholder */
            <div className="h-full min-h-[500px] flex items-center justify-center border-2 border-dashed border-stone-200 rounded-2xl bg-white/50">
              <div className="text-center space-y-4 px-6 py-8 max-w-sm">
                <Palette size={40} className="mx-auto text-stone-300 animate-pulse" />
                <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wide">Synthesize Brand Identity</h4>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Provide your brand details in the configuration form on the left, pick an aesthetic style preset, and generate your custom color palettes, matching font pairs, ready-made Instagram biographies, and copywriting guidelines.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

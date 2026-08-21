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
    <div className="w-full max-w-5xl mx-auto space-y-8" id="brand-kit-section">
      {/* Intro info bar */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 md:max-w-xl">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2">
            <Palette size={15} className="text-stone-700" />
            Social Brand Identity Generator
          </h2>
          <p className="text-stone-500 text-xs leading-relaxed">
            Formulate a coherent Instagram brand identity: color combinations, font pairings, brand voice guidelines, and bio layouts.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
          <Sparkles size={12} className="text-stone-600" />
          <span>Palette & Style Curation</span>
        </div>
      </div>

      {/* Main interactive container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Setup Form */}
        <div className="lg:col-span-5 bg-white p-5 md:p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 pb-3 border-b border-stone-100 flex items-center gap-2">
            <Sliders size={14} className="text-stone-700" />
            Configure Brand
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Brand Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Brand Name <span className="text-stone-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. SÖDER Cafe, Solstice Studio"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-stone-800 placeholder-stone-400 text-xs font-normal focus:outline-none focus:border-stone-900 bg-white transition-colors"
                required
              />
            </div>

            {/* Brand Description / Niche */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Niche & Description
              </label>
              <textarea
                placeholder="e.g. Scandinavian espresso bar serving fresh matcha & vegan sourdough."
                value={brandNiche}
                onChange={(e) => setBrandNiche(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-stone-800 placeholder-stone-400 text-xs font-normal focus:outline-none focus:border-stone-900 bg-white transition-colors resize-none"
              />
              <p className="text-[11px] text-stone-400">Describe your product, target audience, or aesthetic.</p>
            </div>

            {/* Vibe Selection Pills */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Brand Vibe Preset
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {VIBE_PRESETS.map((p) => {
                  const isSelected = brandVibe === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setBrandVibe(p.id)}
                      className={`px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? 'border-stone-900 bg-stone-900 text-white' 
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-semibold">{p.name}</div>
                      <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>{p.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-1.5">
              <label htmlFor="brandkit-language-select" className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Output Language
              </label>
              <select
                id="brandkit-language-select"
                aria-label="Output Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-stone-800 font-medium bg-white text-xs focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Hindi', 'Arabic'].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex gap-2 items-start">
                <Info size={13} className="shrink-0 mt-0.5 text-amber-700" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer ${
                isLoading 
                  ? 'bg-stone-200 text-stone-500 cursor-not-allowed' 
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Synthesizing Brand Identity...</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Generate Brand Kit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Identity Preview Card Board */}
        <div className="lg:col-span-7 space-y-6">
          
          {brandKit ? (
            <div className="space-y-6">
              
              {/* Status Header Banner */}
              <div aria-live="polite">
                {brandKitSource === 'preset' && (
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Sliders size={15} className="text-stone-600 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-stone-600 font-normal">
                        Starter kit preview for <strong className="text-stone-800">{brandVibe}</strong>. Customize below or click Generate.
                      </p>
                    </div>
                  </div>
                )}

                {brandKitSource === 'generating' && (
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <RefreshCw size={15} className="animate-spin text-stone-600 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-stone-600 font-normal">
                        Formulating custom colors, typography, taglines, and bios...
                      </p>
                    </div>
                  </div>
                )}

                {brandKitSource === 'ai-generated' && (
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={15} className="text-stone-700 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-stone-700 font-medium">
                        Custom AI brand kit generated successfully.
                      </p>
                    </div>
                  </div>
                )}

                {brandKitSource === 'fallback' && (
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Info size={15} className="text-stone-600 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-stone-600">
                        Generated locally from your selections.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="bg-white border border-stone-200 p-3 rounded-xl flex items-center justify-between gap-3 flex-wrap shadow-2xs">
                <div className="flex items-center gap-2 pl-1">
                  <Palette size={14} className="text-stone-600" aria-hidden="true" />
                  <span className="text-xs font-semibold text-stone-700">
                    {brandKitSource === 'ai-generated' 
                      ? `${brandName || 'Brand'}: ${brandVibe}`
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
                    className={`px-2.5 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                      isSavedInWorkspace
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                    title={isSavedInWorkspace ? "Saved in Workspace" : "Save Brand Kit to Workspace"}
                  >
                    <Heart size={12} className={isSavedInWorkspace ? "fill-white text-white" : "text-stone-500"} />
                    <span>{isSavedInWorkspace ? 'Saved in Workspace' : 'Save to Workspace'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(getPlainTextSummary(), 'all')}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                    title="Copy all details to clipboard"
                  >
                    {copiedSection === 'all' ? <Check size={12} className="text-stone-900" /> : <Copy size={12} />}
                    <span>{copiedSection === 'all' ? 'Copied' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={downloadBrandKitJSON}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                    title="Download kit as JSON file"
                  >
                    <Download size={12} />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* 1. Color Palette Card */}
              <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                    <Palette size={14} className="text-stone-600" />
                    Color Palette (5 Cohesive Tones)
                  </h4>
                  <span className="text-[10px] text-stone-400">Click swatch to copy HEX</span>
                </div>

                <div className="grid grid-cols-5 gap-2.5">
                  {brandKit.colorPalette.map((color, idx) => {
                    const currentHex = customColors[idx] || color.hex;
                    return (
                      <div key={idx} className="flex flex-col items-center space-y-1.5 group">
                        {/* Interactive Color Box */}
                        <div 
                          onClick={() => copyToClipboard(currentHex, `hex-${idx}`)}
                          className="w-full aspect-[4/5] rounded-lg border border-stone-200 cursor-pointer relative overflow-hidden transition-all duration-200 hover:scale-102"
                          style={{ backgroundColor: currentHex }}
                        >
                          {/* Hover hex overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-1 text-white text-[10px] font-medium">
                            {copiedSection === `hex-${idx}` ? (
                              <Check size={13} className="text-white" />
                            ) : (
                              <Copy size={11} />
                            )}
                            <span>{copiedSection === `hex-${idx}` ? 'Copied' : 'Copy'}</span>
                          </div>
                        </div>

                        {/* Color details */}
                        <div className="text-center w-full min-w-0">
                          <div className="text-[10px] font-semibold text-stone-800 truncate" title={color.name}>
                            {color.name}
                          </div>
                          <div className="text-[9px] text-stone-400 font-mono mt-0.5 uppercase tracking-wide">
                            {currentHex}
                          </div>
                          <div className="inline-block px-1 py-0.5 rounded bg-stone-100 text-[8px] font-medium uppercase text-stone-600 mt-1">
                            {color.role}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Color edit inputs section */}
                <div className="pt-3 border-t border-stone-100 grid grid-cols-1 md:grid-cols-5 gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  {brandKit.colorPalette.map((color, idx) => {
                    const currentHex = customColors[idx] || color.hex;
                    return (
                      <div key={idx} className="space-y-1">
                        <span className="text-[9px] font-medium text-stone-500 block uppercase truncate">{color.role}</span>
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
                            className="w-full text-[10px] font-mono px-1 py-0.5 border border-stone-200 rounded focus:outline-none focus:border-stone-900 bg-white text-stone-800"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-stone-50 rounded-lg p-3 border border-stone-200">
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Guide:</strong> {brandKit.colorPalette.map(c => `${c.name} (${c.hex}) as ${c.role.toLowerCase()}: ${c.description.toLowerCase()}`).join('. ')}.
                  </p>
                </div>
              </div>

              {/* 2. Typographic Preview */}
              <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <Type size={14} className="text-stone-600" />
                  Typography & Visual Mockup
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  
                  {/* Left: Typo detail list */}
                  <div className="md:col-span-5 space-y-3 flex flex-col justify-between bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <div className="space-y-3">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-semibold text-stone-400 block uppercase">Display Font (Titles)</span>
                        <div className="text-sm font-semibold text-stone-900 font-sans">
                          {brandKit.fonts.display}
                        </div>
                      </div>
                      
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-semibold text-stone-400 block uppercase">Body Font (Captions)</span>
                        <div className="text-sm font-semibold text-stone-900 font-sans">
                          {brandKit.fonts.body}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 leading-relaxed pt-2.5 border-t border-stone-200">
                      <strong className="text-stone-700">Rationale:</strong> {brandKit.fonts.rationale}
                    </div>
                  </div>

                  {/* Right: Instagram Post Mockup */}
                  <div className="md:col-span-7 rounded-lg border border-stone-200 shadow-2xs relative overflow-hidden flex flex-col justify-between aspect-square p-5 md:p-6"
                    style={{ backgroundColor: customColors[4] || '#FAFAFA' }}
                  >
                    {/* Watermark/Profile Header */}
                    <div className="flex items-center justify-between w-full border-b pb-2.5" style={{ borderColor: `${customColors[1] || '#EFEFEF'}40` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" 
                          style={{ 
                            backgroundColor: customColors[0],
                            fontFamily: brandKit.fonts.display 
                          }}
                        >
                          {brandName ? brandName.substring(0, 2).toUpperCase() : 'CO'}
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-stone-800 tracking-wide font-sans">{brandName || 'mybrand.agency'}</div>
                          <div className="text-[9px] text-stone-400 font-sans">Sponsored</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-black/5 text-[9px] font-medium text-stone-500">Preview</span>
                    </div>

                    {/* Central Design Focus */}
                    <div className="my-auto space-y-2 text-center py-3">
                      <h5 
                        className="text-xl md:text-2xl font-bold tracking-tight"
                        style={{ 
                          color: customColors[0],
                          fontFamily: `${brandKit.fonts.display}, serif, sans-serif`
                        }}
                      >
                        {brandName || 'Your Brand Here'}
                      </h5>
                      <p 
                        className="text-xs font-normal max-w-xs mx-auto leading-relaxed"
                        style={{ 
                          color: customColors[3],
                          fontFamily: `${brandKit.fonts.body}, sans-serif`
                        }}
                      >
                        {brandKit.taglines[0]}
                      </p>
                    </div>

                    {/* Call to action footer */}
                    <div className="flex items-center justify-between w-full pt-2.5" style={{ borderTop: `1px solid ${(customColors[1] || '#EFEFEF')}40` }}>
                      <span className="text-[10px] font-medium text-stone-400 uppercase font-sans">Explore Collection</span>
                      <div 
                        className="px-3 py-1 rounded-md text-[9px] font-semibold text-white shadow-2xs flex items-center gap-1 cursor-pointer"
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
              <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <Flame size={14} className="text-stone-600" />
                  Slogans & Taglines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {brandKit.taglines.map((tagline, idx) => (
                    <div key={idx} className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 flex flex-col justify-between gap-2.5">
                      <span className="text-[9px] font-semibold text-stone-400 block uppercase">Option {idx + 1}</span>
                      <p className="text-stone-800 font-medium text-xs leading-relaxed font-sans italic">
                        "{tagline}"
                      </p>
                      <button
                        onClick={() => copyToClipboard(`"${tagline}"`, `tagline-${idx}`)}
                        className="self-end p-1 rounded bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 transition-colors cursor-pointer"
                        title="Copy tagline"
                      >
                        {copiedSection === `tagline-${idx}` ? <Check size={11} className="text-stone-900" /> : <Copy size={11} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Instagram Bio Hooks */}
              <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <BookOpen size={14} className="text-stone-600" />
                  Instagram Bios (Under 150 Chars)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {brandKit.bioHooks.map((bio, idx) => (
                    <div key={idx} className="bg-stone-50 rounded-lg p-3.5 border border-stone-200 flex flex-col justify-between gap-2.5">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-semibold text-stone-400 uppercase">Layout {idx + 1}</span>
                          <span className="text-[9px] text-stone-400 font-mono">{bio.length}/150</span>
                        </div>
                        <p className="text-stone-800 font-normal text-xs leading-relaxed whitespace-pre-wrap bg-white p-2.5 rounded-md border border-stone-200 font-sans">
                          {bio}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bio, `bio-${idx}`)}
                        className="w-full py-1.5 px-2.5 rounded-md bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 font-medium text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedSection === `bio-${idx}` ? (
                          <>
                            <Check size={12} className="text-stone-900" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Bio</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Brand Guidelines & Grid Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Voice adjectives */}
                <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                    <Volume2 size={14} className="text-stone-600" />
                    Brand Tone & Communication Voice
                  </h4>
                  <ul className="space-y-2">
                    {brandKit.brandVoice.map((voice, idx) => {
                      const parts = voice.split(':');
                      const title = parts[0] || 'Attribute';
                      const desc = parts.slice(1).join(':') || '';
                      return (
                        <li key={idx} className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-start gap-2.5">
                          <span className="text-xs font-semibold text-stone-700 bg-stone-200 w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                          <div>
                            <span className="text-xs font-semibold text-stone-800 block">{title}</span>
                            <span className="text-[11px] text-stone-500 leading-relaxed block">{desc}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Grid feed and Keywords */}
                <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                      <Grid size={14} className="text-stone-600" />
                      Recommended Grid Theme
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <strong className="text-stone-800">Visual Recipe:</strong> {brandKit.gridTheme}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-semibold text-stone-400 block uppercase">SEO Keywords & Search tags</span>
                    <div className="flex flex-wrap gap-1">
                      {brandKit.keywords.map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium border border-stone-200">
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
            <div className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50 p-8">
              <div className="text-center space-y-3 max-w-sm">
                <Palette size={32} className="mx-auto text-stone-400" />
                <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Brand Identity Setup</h4>
                <p className="text-stone-500 text-xs leading-relaxed font-normal">
                  Configure brand details on the left, select a style preset, and generate your custom color palette, font pairings, and Instagram bio.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

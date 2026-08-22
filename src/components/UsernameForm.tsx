import React, { useState, FormEvent } from 'react';
import { Sparkles, Hash, Loader2, Type, Briefcase } from 'lucide-react';
import { GenerateUsernameRequest } from '../types';

interface UsernameFormProps {
  onGenerate: (data: GenerateUsernameRequest) => void;
  isLoading: boolean;
}

const STYLES = ["Aesthetic", "Professional", "Funny", "Minimalist", "Creative", "Baddie"];

export function UsernameForm({ onGenerate, isLoading }: UsernameFormProps) {
  const [style, setStyle] = useState("Aesthetic");
  const [keywords, setKeywords] = useState("");
  const [niche, setNiche] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeUnderscores, setIncludeUnderscores] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;
    
    onGenerate({
      keywords: keywords.trim(),
      niche: niche.trim(),
      style,
      includeNumbers,
      includeUnderscores
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
      
      <div className="space-y-6 relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-2">
          <Type className="text-indigo-600" size={14} />
          Username Details
        </h2>
        
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
            <Type size={14} className="text-indigo-600" />
            Name or Core Keywords (Required)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. John Doe, coffee, traveler..."
            className="w-full bg-stone-50/50 border border-stone-200/80 rounded-xl px-4 py-3 text-stone-800 font-mono text-sm placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all text-sm"
            required
          />
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
            <Briefcase size={14} className="text-indigo-600" />
            Niche / Category
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Developer, Fitness, Photography..."
            className="w-full bg-stone-50/50 border border-stone-200/80 rounded-xl px-4 py-3 text-stone-800 font-mono text-sm placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all text-sm"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Vibe / Style</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {STYLES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setStyle(t)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  style === t
                    ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <label className="flex items-center gap-3 bg-stone-50/20 border border-stone-200 px-4 py-3.5 rounded-xl cursor-pointer hover:border-stone-300 hover:bg-stone-50 transition-all flex-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-10 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Include Numbers</span>
          </label>

          <label className="flex items-center gap-3 bg-stone-50/20 border border-stone-200 px-4 py-3.5 rounded-xl cursor-pointer hover:border-stone-300 hover:bg-stone-50 transition-all flex-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={includeUnderscores}
                onChange={(e) => setIncludeUnderscores(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-10 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Underscores or Dots</span>
          </label>
        </div>

        {/* Transparency Note */}
        <p className="text-[11px] text-stone-500 bg-stone-50/80 border border-stone-200/80 p-3 rounded-xl leading-relaxed font-normal">
          <span className="font-semibold text-stone-700">Transparency Note:</span> Username suggestions are generated based on your input keywords and style preferences. GrowthCaption does not verify availability on Instagram in real-time—please check availability directly on Instagram before using a username.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !keywords.trim()}
        className="w-full relative z-10 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-75 disabled:cursor-not-allowed mt-4 cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating Username Ideas...</span>
          </div>
        ) : (
          <>
            <Sparkles size={16} className="text-white fill-white" />
            <span>Generate Username Ideas</span>
          </>
        )}
      </button>
    </form>
  );
}

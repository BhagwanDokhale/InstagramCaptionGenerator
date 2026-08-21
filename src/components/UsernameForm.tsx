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
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-6 shadow-xs w-full">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <Type size={14} className="text-stone-500" />
            Name or Core Keywords <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. John Doe, coffee, traveler..."
            className="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <Briefcase size={14} className="text-stone-500" />
            Niche / Category
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Developer, Fitness, Photography..."
            className="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">Vibe / Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STYLES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setStyle(t)}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-center ${
                  style === t
                    ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <label className="flex items-center gap-3 bg-stone-50 border border-stone-200 px-3.5 py-3 rounded-lg cursor-pointer hover:bg-stone-100/70 transition-colors flex-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-900"></div>
            </div>
            <span className="text-xs font-medium text-stone-700">Include Numbers</span>
          </label>

          <label className="flex items-center gap-3 bg-stone-50 border border-stone-200 px-3.5 py-3 rounded-lg cursor-pointer hover:bg-stone-100/70 transition-colors flex-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={includeUnderscores}
                onChange={(e) => setIncludeUnderscores(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-900"></div>
            </div>
            <span className="text-xs font-medium text-stone-700">Underscores or Dots</span>
          </label>
        </div>

        {/* Transparency Note */}
        <p className="text-xs text-stone-500 bg-stone-50 border border-stone-200 p-3 rounded-lg leading-relaxed">
          <span className="font-semibold text-stone-700">Note:</span> Username suggestions are generated based on your input keywords. Check availability directly on Instagram before using.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !keywords.trim()}
        className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating Username Ideas...</span>
          </div>
        ) : (
          <>
            <Sparkles size={15} />
            <span>Generate Username Ideas</span>
          </>
        )}
      </button>
    </form>
  );
}

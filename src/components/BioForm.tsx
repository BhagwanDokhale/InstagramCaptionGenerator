import { useState, FormEvent } from "react";
import { Sparkles, Smile, PenLine, Tag } from "lucide-react";
import { GenerateBioRequest } from "../types";
import { cn } from "../lib/utils";

const TONES = [
  "Professional",
  "Casual",
  "Funny",
  "Inspirational",
  "Minimalist",
  "Creative"
];

interface BioFormProps {
  onGenerate: (data: GenerateBioRequest) => void;
  isLoading: boolean;
}

export function BioForm({ onGenerate, isLoading }: BioFormProps) {
  const [tone, setTone] = useState("Professional");
  const [details, setDetails] = useState("");
  const [hasEmojis, setHasEmojis] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerate({
      tone,
      details: details.trim(),
      hasEmojis
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-6 shadow-xs">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <PenLine size={14} className="text-stone-500" />
          About You / Profile Description
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g. Freelance photographer based in NY. I love coffee, travel, and capturing moments."
          rows={3}
          className="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors resize-none"
        />
      </div>

      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <Tag size={14} className="text-stone-500" />
          Tone & Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TONES.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer",
                tone === t 
                  ? "bg-stone-900 text-white border-stone-900 shadow-2xs" 
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-1">
        <label className="flex w-full items-center gap-3 bg-stone-50 border border-stone-200 px-3.5 py-3 rounded-lg cursor-pointer hover:bg-stone-100/70 transition-colors">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              checked={hasEmojis}
              onChange={(e) => setHasEmojis(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-900"></div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
            <Smile size={14} className="text-stone-500" />
            Include Emojis
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !details.trim()}
        className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating Bios...</span>
          </div>
        ) : (
          <>
            <Sparkles size={15} />
            <span>Generate Bios</span>
          </>
        )}
      </button>
    </form>
  );
}

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
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
      <div className="space-y-2.5 relative z-10">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <PenLine size={14} className="text-indigo-600" />
          About You / Details
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g. Freelance photographer based in NY. I love coffee, travel, and capturing moments."
          rows={3}
          className="w-full bg-stone-50/50 border border-stone-200/80 rounded-xl px-4 py-3 text-stone-800 font-mono text-sm placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all resize-none"
        />
      </div>

      <div className="space-y-2.5 relative z-10">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <Tag size={14} className="text-indigo-600" />
          Tone & Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TONES.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                tone === t 
                  ? "bg-stone-900 text-white border-stone-900 shadow-sm" 
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex pt-1 relative z-10">
        <label className="flex w-full items-center gap-3 bg-stone-50/20 border border-stone-200 px-4 py-3.5 rounded-xl cursor-pointer hover:border-stone-300 hover:bg-stone-50 transition-all">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              checked={hasEmojis}
              onChange={(e) => setHasEmojis(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
            <Smile size={14} className="text-indigo-600" />
            Include Emojis
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !details.trim()}
        className="w-full relative z-10 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-75 disabled:cursor-not-allowed mt-4 cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Crafting Magic...</span>
          </div>
        ) : (
          <>
            <Sparkles size={16} className="text-white fill-white" />
            <span>Generate Bios</span>
          </>
        )}
      </button>
    </form>
  );
}

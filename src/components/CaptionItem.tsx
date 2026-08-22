import { useState, useEffect } from 'react';
import { Copy, Check, Bookmark, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  isCaptionSaved, 
  toggleFavoriteCaption, 
  isBioSaved, 
  toggleSavedBio, 
  isUsernameSaved, 
  toggleSavedUsername 
} from '../lib/creatorWorkspaceStorage';

interface CaptionItemProps {
  key?: string | number;
  text: string;
  maxLength?: number;
  type?: 'captions' | 'bios' | 'usernames';
  category?: string;
  tone?: string;
  niche?: string;
}

export function CaptionItem({ 
  text, 
  maxLength = 2200, 
  type = 'captions',
  category,
  tone,
  niche 
}: CaptionItemProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const checkIfSaved = () => {
    if (type === 'captions') {
      setSaved(isCaptionSaved(text));
    } else if (type === 'bios') {
      setSaved(isBioSaved(text));
    } else if (type === 'usernames') {
      setSaved(isUsernameSaved(text));
    }
  };

  useEffect(() => {
    checkIfSaved();

    const handleStorageUpdate = () => {
      checkIfSaved();
    };

    window.addEventListener('growthcaption_workspace_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('growthcaption_workspace_updated', handleStorageUpdate);
    };
  }, [text, type]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    if (type === 'captions') {
      const nowSaved = toggleFavoriteCaption({ text, category, tone });
      setSaved(nowSaved);
    } else if (type === 'bios') {
      const nowSaved = toggleSavedBio({ text, tone });
      setSaved(nowSaved);
    } else if (type === 'usernames') {
      const nowSaved = toggleSavedUsername({ username: text, style: tone, niche });
      setSaved(nowSaved);
    }
  };

  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div 
      className="glass-card glass-card-hover rounded-3xl p-6 border border-white/80 bg-white/75 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative group w-full animate-fade-in"
    >
      <p className="text-stone-800 whitespace-pre-wrap pr-16 text-sm font-medium leading-relaxed font-mono bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-stone-200/50 shadow-inner">
        {text}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-1 rounded-lg bg-stone-100/60 border border-stone-200/60 text-stone-500">
            {words} {words === 1 ? 'word' : 'words'}
          </span>
          <span className={cn(
            "text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-1 rounded-lg border",
            text.length > maxLength 
              ? "bg-rose-50 border-rose-200 text-rose-600" 
              : "bg-stone-100/60 border-stone-200/60 text-stone-500"
          )}>
            {text.length} / {maxLength}
          </span>
          {saved && (
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center gap-1">
              <Bookmark size={11} className="fill-rose-500" />
              Saved
            </span>
          )}
        </div>
        
        <div className="absolute top-8 right-8 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          {/* Favorite / Save to Workspace Button */}
          <button
            onClick={handleToggleSave}
            className={cn(
              "p-2 rounded-xl border transition-all focus:outline-none shadow-sm cursor-pointer",
              saved 
                ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100" 
                : "bg-white border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50"
            )}
            title={saved ? "Remove from My Workspace" : "Save to My Workspace"}
            aria-label={saved ? "Remove from My Workspace" : "Save to My Workspace"}
          >
            <Heart size={16} className={cn("transition-transform", saved && "fill-rose-500 scale-110")} />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={cn(
              "p-2 rounded-xl border transition-all focus:outline-none shadow-sm cursor-pointer",
              copied 
                ? "bg-emerald-50 border-emerald-200/60 text-emerald-600" 
                : "bg-white border-stone-200 text-stone-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30"
            )}
            title="Copy text"
            aria-label="Copy text"
          >
            {copied ? (
              <div className="relative">
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <Check size={16} />
              </div>
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

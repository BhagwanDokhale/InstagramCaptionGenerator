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
      className="bg-white rounded-xl p-4 md:p-5 border border-stone-200 shadow-xs relative group w-full transition-colors hover:border-stone-300"
    >
      <p className="text-stone-800 whitespace-pre-wrap pr-14 text-xs md:text-sm font-mono leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
        {text}
      </p>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600">
            {words} {words === 1 ? 'word' : 'words'}
          </span>
          <span className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded border",
            text.length > maxLength 
              ? "bg-rose-50 border-rose-200 text-rose-600" 
              : "bg-stone-100 border-stone-200 text-stone-600"
          )}>
            {text.length} / {maxLength}
          </span>
          {saved && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-900 text-white flex items-center gap-1">
              <Bookmark size={10} className="fill-current" />
              Saved
            </span>
          )}
        </div>
        
        <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {/* Favorite / Save to Workspace Button */}
          <button
            onClick={handleToggleSave}
            className={cn(
              "p-1.5 rounded-md border transition-colors focus:outline-none cursor-pointer shadow-2xs",
              saved 
                ? "bg-rose-50 border-rose-200 text-rose-600" 
                : "bg-white border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-300"
            )}
            title={saved ? "Remove from My Workspace" : "Save to My Workspace"}
            aria-label={saved ? "Remove from My Workspace" : "Save to My Workspace"}
          >
            <Heart size={13} className={cn(saved && "fill-rose-500 text-rose-500")} />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={cn(
              "p-1.5 rounded-md border transition-colors focus:outline-none cursor-pointer shadow-2xs",
              copied 
                ? "bg-stone-900 border-stone-900 text-white" 
                : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300"
            )}
            title="Copy text"
            aria-label="Copy text"
          >
            {copied ? (
              <Check size={13} />
            ) : (
              <Copy size={13} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

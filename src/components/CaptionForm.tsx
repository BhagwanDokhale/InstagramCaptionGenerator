import { useState, FormEvent, DragEvent, ChangeEvent } from "react";
import { Sparkles, Hash, Smile, PenLine, Tag, ImageIcon, Upload, Trash2, AlertCircle, Globe } from "lucide-react";
import { GenerateRequest } from "../types";
import { cn } from "../lib/utils";

const CATEGORIES = [
  "General",
  "Travel",
  "Love",
  "Attitude",
  "Business",
  "Fitness",
  "Food",
  "Nature",
  "Fashion"
];

interface CaptionFormProps {
  onGenerate: (data: GenerateRequest) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
];

export function CaptionForm({ onGenerate, isLoading }: CaptionFormProps) {
  const [category, setCategory] = useState("General");
  const [customTopic, setCustomTopic] = useState("");
  const [hasHashtags, setHasHashtags] = useState(true);
  const [hasEmojis, setHasEmojis] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image file (PNG, JPG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("File is too large. Max size is 5MB.");
      return;
    }

    setImageError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setImageError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerate({
      category,
      customTopic: customTopic.trim(),
      hasHashtags,
      hasEmojis,
      image: image || undefined,
      language
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-white/80 bg-white/75 backdrop-blur-xl">
      {/* Decorative dot grid inside form */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
      
      {/* Image Upload Option */}
      <div className="space-y-2.5 relative z-10">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <ImageIcon size={14} className="text-indigo-600" />
          Upload your Instagram photo (optional)
        </label>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload-input")?.click()}
          className={cn(
            "border border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all relative flex flex-col items-center justify-center min-h-[140px]",
            isDragging 
              ? "border-indigo-500 bg-indigo-50/40 backdrop-blur-sm" 
              : "border-stone-200/80 bg-white/50 backdrop-blur-sm hover:border-indigo-300 hover:bg-white/80"
          )}
        >
          <input
            id="photo-upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          {image ? (
            <div className="w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative group">
                <img
                  src={image}
                  alt="Instagram Caption Generator - Uploaded user photo preview for AI caption analysis"
                  loading="lazy"
                  decoding="async"
                  className="max-h-48 object-contain rounded-lg border border-stone-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImageError(null);
                  }}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full border border-rose-600 hover:bg-rose-600 shadow-sm transition-all transform hover:scale-105"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-xs font-bold text-stone-400">
                Image loaded successfully. Click above to remove.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100/40">
                <Upload size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-stone-700">
                  Drag and drop or <span className="text-indigo-600 underline">browse</span>
                </p>
                <p className="text-xs font-medium text-stone-450">
                  PNG, JPG etc. up to 5MB - AI analyzes your image for perfect captions
                </p>
              </div>
            </div>
          )}
        </div>
        {imageError && (
          <div className="flex items-center gap-2 text-xs font-bold text-rose-500 mt-1">
            <AlertCircle size={14} />
            <span>{imageError}</span>
          </div>
        )}
      </div>

      {/* Custom Topic */}
      <div className="space-y-2.5 relative z-10">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <PenLine size={14} className="text-indigo-600" />
          Custom Topic (Optional)
        </label>
        <textarea
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="e.g. A rainy day in Paris, Launching my new startup..."
          rows={3}
          className="w-full bg-stone-50/50 border border-stone-200/80 rounded-xl px-4 py-3 text-stone-800 font-mono text-sm placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all resize-none"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5 relative z-10">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <Tag size={14} className="text-indigo-600" />
          Select Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                category === cat 
                  ? "bg-stone-900 text-white border-stone-900 shadow-sm" 
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Languages (Optional Option) */}
      <div className="space-y-2.5 relative z-10">
        <label htmlFor="caption-language-select" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
          <Globe size={14} className="text-indigo-600" />
          Language (Optional)
        </label>
        <div className="relative">
          <select
            id="caption-language-select"
            aria-label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-stone-50/50 border border-stone-200/80 rounded-xl px-4 py-3 text-stone-800 font-bold appearance-none focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all cursor-pointer shadow-sm text-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1 relative z-10">
        <label className="flex items-center gap-3 bg-stone-50/20 border border-stone-200 px-4 py-3.5 rounded-xl cursor-pointer hover:border-stone-300 hover:bg-stone-50 transition-all flex-1">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              checked={hasHashtags}
              onChange={(e) => setHasHashtags(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
            <Hash size={14} className="text-indigo-600" />
            Include Hashtags
          </span>
        </label>

        <label className="flex items-center gap-3 bg-stone-50/20 border border-stone-200 px-4 py-3.5 rounded-xl cursor-pointer hover:border-stone-300 hover:bg-stone-50 transition-all flex-1">
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
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
            <span>Generate Captions</span>
          </>
        )}
      </button>
    </form>
  );
}

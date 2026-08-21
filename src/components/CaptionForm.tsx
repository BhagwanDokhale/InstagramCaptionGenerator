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
    <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
      {/* Image Upload Option */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
          <ImageIcon size={13} className="text-stone-500" />
          <span>Upload reference photo (optional)</span>
        </label>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload-input")?.click()}
          className={cn(
            "border border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors relative flex flex-col items-center justify-center min-h-[110px]",
            isDragging 
              ? "border-stone-900 bg-stone-100" 
              : "border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100/50"
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
            <div className="w-full flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <div className="relative group">
                <img
                  src={image}
                  alt="Uploaded photo preview"
                  loading="lazy"
                  decoding="async"
                  className="max-h-36 object-contain rounded-md border border-stone-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImageError(null);
                  }}
                  className="absolute -top-2 -right-2 bg-stone-900 text-white p-1 rounded-full hover:bg-rose-600 shadow-xs transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Image attached. Click icon to remove.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="p-2 bg-white rounded-md text-stone-600 border border-stone-200 shadow-2xs">
                <Upload size={15} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-stone-700">
                  Drag and drop photo, or <span className="text-stone-900 underline">browse</span>
                </p>
                <p className="text-[11px] text-stone-400">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
        {imageError && (
          <div className="flex items-center gap-1 text-xs text-rose-600">
            <AlertCircle size={12} />
            <span>{imageError}</span>
          </div>
        )}
      </div>

      {/* Custom Topic */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
          <PenLine size={13} className="text-stone-500" />
          <span>Topic or Keywords (optional)</span>
        </label>
        <textarea
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="e.g., Launching my handmade ceramic mugs, weekend coffee run in Brooklyn..."
          rows={2}
          className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors resize-none"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
          <Tag size={13} className="text-stone-500" />
          <span>Post Category</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border cursor-pointer",
                category === cat 
                  ? "bg-stone-900 text-white border-stone-900" 
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Languages (Optional Option) */}
      <div className="space-y-1.5">
        <label htmlFor="caption-language-select" className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
          <Globe size={13} className="text-stone-500" />
          <span>Language</span>
        </label>
        <div className="relative">
          <select
            id="caption-language-select"
            aria-label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-900 font-medium appearance-none focus:outline-none focus:border-stone-900 transition-colors cursor-pointer text-xs"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <label className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/60 transition-colors">
          <input 
            type="checkbox" 
            checked={hasHashtags}
            onChange={(e) => setHasHashtags(e.target.checked)}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 h-3.5 w-3.5"
          />
          <span className="flex items-center gap-1 text-xs font-medium text-stone-700">
            <Hash size={12} className="text-stone-500" />
            <span>Hashtags</span>
          </span>
        </label>

        <label className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-100/60 transition-colors">
          <input 
            type="checkbox" 
            checked={hasEmojis}
            onChange={(e) => setHasEmojis(e.target.checked)}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 h-3.5 w-3.5"
          />
          <span className="flex items-center gap-1 text-xs font-medium text-stone-700">
            <Smile size={12} className="text-stone-500" />
            <span>Emojis</span>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
            <span>Generating...</span>
          </div>
        ) : (
          <>
            <Sparkles size={13} />
            <span>Generate Captions</span>
          </>
        )}
      </button>
    </form>
  );
}

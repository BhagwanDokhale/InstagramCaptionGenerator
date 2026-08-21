import React, { useState, useRef } from 'react';
import { 
  MessageSquare, Sparkles, Copy, Check, Heart, Upload, X, RefreshCw, 
  Smile, User, Zap, MessageCircle, HelpCircle, Flame, Award, Lightbulb, Image as ImageIcon,
  Globe, Hash
} from 'lucide-react';
import { GenerateCommentRequest, CommentGeneratorResponse, GeneratedComment } from '../types';

const QUICK_PROMPTS = [
  { label: '✨ OOTD / Fashion', topic: 'Trendy summer outfit of the day with street aesthetic' },
  { label: '🏋️ Workout & Fitness', topic: 'Gym workout progress and personal record squat session' },
  { label: '✈️ Travel & Vacation', topic: 'Breathtaking sunset view over the mountains in Italy' },
  { label: '🍕 Food & Recipe', topic: 'Homemade wood-fired artisan pizza with fresh basil' },
  { label: '🚀 Career & Milestone', topic: 'Celebrating 5 years at my dream company and new promotion' },
  { label: '💍 Wedding & Romance', topic: 'Romantic golden hour engagement photos on the beach' },
  { label: '🎨 Art & Design', topic: 'Finished 3D digital illustration and brand design layout' },
];

const TONE_OPTIONS = [
  { id: 'Supportive & Hype', label: '🔥 Hype & Supportive', desc: 'Enthusiastic, encouraging, high energy' },
  { id: 'Funny & Witty', label: '😂 Funny & Witty', desc: 'Playful banter, clever jokes, lighthearted' },
  { id: 'Complimentary & Aesthetic', label: '😍 Complimentary', desc: 'Sweet, flattering aesthetic praise' },
  { id: 'Questions & Conversation', label: '❓ Question Starter', desc: 'Sparks discussion & encourages a reply' },
  { id: 'Professional & Insightful', label: '💼 Professional', desc: 'Thoughtful, value-add, industry aware' },
  { id: 'Short & Snappy', label: '⚡ Short & Snappy', desc: 'Quick 1-liner reaction' },
];

const RELATIONSHIP_OPTIONS = [
  { id: 'Friend', label: '👥 Close Friend' },
  { id: 'Creator/Influencer', label: '⭐ Creator / Influencer' },
  { id: 'Colleague', label: '💼 Colleague / Network' },
  { id: 'Client/Brand', label: '🏷️ Brand / Client' },
  { id: 'Fan/Follower', label: '🙌 Fan / Follower' },
];

const LENGTH_OPTIONS = [
  { id: 'Short One-Liner', label: 'Short' },
  { id: 'Medium Natural', label: 'Medium' },
  { id: 'Detailed Reaction', label: 'Detailed' },
];

const LANGUAGE_OPTIONS = [
  { id: 'English', label: '🌐 English' },
  { id: 'Spanish (Español)', label: '🇪🇸 Spanish (Español)' },
  { id: 'French (Français)', label: '🇫🇷 French (Français)' },
  { id: 'German (Deutsch)', label: '🇩🇪 German (Deutsch)' },
  { id: 'Hindi (हिंदी)', label: '🇮🇳 Hindi (हिंदी)' },
  { id: 'Hinglish (Hindi + English)', label: '🇮🇳 Hinglish (Colloquial)' },
  { id: 'Portuguese (Português)', label: '🇧🇷 Portuguese (Português)' },
  { id: 'Italian (Italiano)', label: '🇮🇹 Italian (Italiano)' },
  { id: 'Japanese (日本語)', label: '🇯🇵 Japanese (日本語)' },
  { id: 'Korean (한국어)', label: '🇰🇷 Korean (한국어)' },
  { id: 'Arabic (العربية)', label: '🇦🇪 Arabic (العربية)' },
  { id: 'Turkish (Türkçe)', label: '🇹🇷 Turkish (Türkçe)' },
  { id: 'Dutch (Nederlands)', label: '🇳🇱 Dutch (Nederlands)' },
  { id: 'Indonesian (Bahasa Indonesia)', label: '🇮🇩 Indonesian' },
];

export function CommentGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Supportive & Hype');
  const [relationship, setRelationship] = useState('Friend');
  const [length, setLength] = useState('Medium Natural');
  const [language, setLanguage] = useState('English');
  const [hasEmojis, setHasEmojis] = useState(true);
  const [hasHashtags, setHasHashtags] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<GeneratedComment[]>([]);
  const [proTips, setProTips] = useState<string[]>([]);
  
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const [previewComment, setPreviewComment] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size exceeds the 10MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const reqData: GenerateCommentRequest = {
        topic: topic.trim() || 'Instagram post photo or reel',
        tone,
        relationship,
        length,
        language,
        hasEmojis,
        hasHashtags,
        image: image || undefined,
      };

      const response = await fetch('/api/generate-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to generate comments right now. Please try again with a different post topic or description.');
      }

      const data: CommentGeneratorResponse = await response.json();
      setComments(data.comments || []);
      setProTips(data.proTips || []);
    } catch (err: any) {
      setError(err.message || 'Unable to generate comments right now. Please try again with a different post topic or description.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleStartEdit = (index: number, currentText: string) => {
    setEditingIdx(index);
    setEditedText(currentText);
  };

  const handleSaveEdit = (index: number) => {
    if (editedText.trim()) {
      setComments(prev => prev.map((c, i) => i === index ? { ...c, text: editedText.trim() } : c));
    }
    setEditingIdx(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Main Form & Results Container */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Form */}
          <form onSubmit={handleGenerate} className="w-full lg:w-1/2 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-stone-500" />
                  What is the Instagram Post about?
                </label>
                <span className="text-xs text-stone-400 font-medium">{topic.length}/300</span>
              </div>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value.slice(0, 300))}
                placeholder="Paste the caption, describe the photo/reel, or type a topic (e.g., Beach sunset in Bali, Gym workout PR, Friend's promotion)..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none text-sm text-stone-900 placeholder:text-stone-400 transition-colors bg-white resize-none"
              />

              {/* Quick Prompts */}
              <div className="pt-1">
                <span className="text-xs font-medium text-stone-500 block mb-1.5">Quick Inspiration:</span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      type="button"
                      onClick={() => setTopic(prompt.topic)}
                      className="px-2.5 py-1 rounded-md text-xs font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo Attachment (Optional Vision) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-stone-500" />
                Upload Photo or Post Screenshot (Optional)
              </label>
              
              {image ? (
                <div className="relative rounded-lg overflow-hidden border border-stone-200 max-h-40 bg-stone-900 group">
                  <img src={image} alt="Post preview" className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-stone-900/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer shadow-sm"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-stone-900/80 px-2 py-0.5 rounded text-xs font-medium text-white flex items-center gap-1">
                    <Sparkles size={11} className="text-stone-300" /> AI Vision Attached
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-stone-300 hover:border-stone-400 rounded-lg p-3.5 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group flex flex-col items-center justify-center gap-1"
                >
                  <Upload size={16} className="text-stone-400 group-hover:text-stone-700 transition-colors" />
                  <span className="text-xs font-medium text-stone-700">Attach Post Image / Screenshot</span>
                  <span className="text-xs text-stone-400">AI will analyze visual context to suggest tailored reactions</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Comment Tone Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Smile size={14} className="text-stone-500" />
                Comment Vibe & Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {TONE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id)}
                    className={`p-2 rounded-lg text-left border transition-colors cursor-pointer ${
                      tone === item.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-medium truncate">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${tone === item.id ? 'text-stone-300' : 'text-stone-400'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Relationship, Length, and Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <User size={12} className="text-stone-500" /> Relationship
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  {RELATIONSHIP_OPTIONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <Zap size={12} className="text-stone-500" /> Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  {LENGTH_OPTIONS.map((l) => (
                    <option key={l.id} value={l.id}>{l.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <Globe size={12} className="text-stone-500" /> Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Emojis & Hashtags Toggles */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2">
                  <Smile size={15} className="text-stone-500 shrink-0" />
                  <span className="text-xs font-medium text-stone-700">Include Emojis</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasEmojis(!hasEmojis)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    hasEmojis ? 'bg-stone-900' : 'bg-stone-300'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                    hasEmojis ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2">
                  <Hash size={15} className="text-stone-500 shrink-0" />
                  <span className="text-xs font-medium text-stone-700">Include Hashtags</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasHashtags(!hasHashtags)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    hasHashtags ? 'bg-stone-900' : 'bg-stone-300'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                    hasHashtags ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={15} className="animate-spin text-white" />
                  <span>Generating Comments...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Generate Instagram Comments</span>
                </>
              )}
            </button>
          </form>

          {/* Right Output Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 min-h-[400px]">
            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <X size={15} className="shrink-0 text-red-500" />
                {error}
              </div>
            )}

            {comments.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-stone-700" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Generated Comments ({comments.length})
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded">
                    {tone}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {comments.map((comment, idx) => {
                    const isCopied = copiedIdx === idx;
                    const isFav = favorites.has(idx);
                    const isEditing = editingIdx === idx;

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-white border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-stone-100 text-[10px] font-semibold uppercase tracking-wider text-stone-700">
                              {comment.tone || 'Comment'}
                            </span>
                            <span className="text-xs text-stone-400">
                              • {comment.vibe}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleFavorite(idx)}
                              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                                isFav ? 'text-rose-500 bg-rose-50' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                              }`}
                              title={isFav ? 'Unfavorite' : 'Favorite'}
                            >
                              <Heart size={14} className={isFav ? 'fill-current' : ''} />
                            </button>

                            <button
                              onClick={() => setPreviewComment(previewComment === comment.text ? null : comment.text)}
                              className={`p-1.5 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer text-xs font-medium ${
                                previewComment === comment.text ? 'text-stone-900 bg-stone-100' : ''
                              }`}
                              title="Preview on Instagram layout"
                            >
                              Preview
                            </button>

                            <button
                              onClick={() => handleCopy(comment.text, idx)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white'
                              }`}
                            >
                              {isCopied ? <Check size={12} /> : <Copy size={12} />}
                              {isCopied ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </div>

                        {isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              rows={2}
                              className="w-full p-2.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-800 bg-stone-50 outline-none"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingIdx(null)}
                                className="px-2.5 py-1 text-xs font-medium text-stone-500 hover:text-stone-700 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEdit(idx)}
                                className="px-3 py-1 text-xs font-medium bg-stone-900 text-white rounded-md cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStartEdit(idx, comment.text)}
                            className="text-xs text-stone-800 leading-relaxed cursor-pointer hover:bg-stone-50 p-1.5 rounded-md transition-colors font-sans"
                            title="Click to edit inline"
                          >
                            {comment.text}
                          </div>
                        )}

                        {/* Inline Mock Instagram Feed Preview */}
                        {previewComment === comment.text && (
                          <div className="mt-2.5 p-3 rounded-lg bg-stone-900 text-white space-y-2 border border-stone-800">
                            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                              <span>Feed Preview</span>
                              <button onClick={() => setPreviewComment(null)} className="text-stone-400 hover:text-white cursor-pointer">
                                <X size={12} />
                              </button>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs pt-1">
                              <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center font-bold text-[9px] text-white shrink-0">
                                GC
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-white mr-1.5">your_handle</span>
                                <span className="text-stone-200">{comment.text}</span>
                                <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-1 font-medium">
                                  <span>2m</span>
                                  <span>14 likes</span>
                                  <span>Reply</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pro Tips Banner */}
                {proTips.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      <Lightbulb size={14} className="text-amber-500" /> Engagement Tips
                    </div>
                    <ul className="space-y-1 text-xs text-stone-600 font-normal list-disc list-inside">
                      {proTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center border border-dashed border-stone-200 rounded-lg bg-stone-50/50 p-8 text-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-stone-800">No Comments Generated Yet</h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Fill out the form on the left or click a quick inspiration button to generate 6 authentic Instagram comments instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center border border-stone-200 rounded-lg bg-white p-8 text-center gap-3">
                <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">Generating Comments...</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

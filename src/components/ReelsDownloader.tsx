import { useState, FormEvent, useEffect } from "react";
import { Sparkles, Download, Video, Image, Link2, Loader2, AlertCircle, ExternalLink, X, CheckCircle2, ListPlus, ChevronLeft, ChevronRight, Music } from "lucide-react";

interface MediaItem {
  url: string;
  thumbnail: string;
  type?: 'video' | 'image';
}

interface UrlProcessStatus {
  url: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  errorMsg?: string;
  media: MediaItem[];
}

export function ReelsDownloader() {
  const [inputText, setInputText] = useState("");
  const [detectedUrls, setDetectedUrls] = useState<string[]>([]);
  const [processingStatuses, setProcessingStatuses] = useState<UrlProcessStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMediaIndexes, setSelectedMediaIndexes] = useState<Record<number, number>>({});
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadErrors, setDownloadErrors] = useState<Record<string, string>>({});

  const handleDownloadMedia = async (mediaUrl: string, isVideo: boolean, format: string, defaultFilename: string, itemKey: string) => {
    setDownloadingKey(itemKey);
    setDownloadErrors(prev => {
      const next = { ...prev };
      delete next[itemKey];
      return next;
    });

    const ext = format === "audio" || format === "mp3" ? "mp3" : format;
    const finalFilename = `${defaultFilename}.${ext}`;
    const proxyDownloadUrl = `/api/proxy-media?url=${encodeURIComponent(mediaUrl)}&format=${format}&download=true&filename=${encodeURIComponent(defaultFilename)}&type=${isVideo ? "video" : "image"}`;

    try {
      // 1. Fetch through backend media proxy
      const response = await fetch(proxyDownloadUrl);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html") || contentType.includes("application/json")) {
        const text = await response.text();
        let errMsg = "Media conversion or download failed.";
        try {
          const parsed = JSON.parse(text);
          if (parsed.error) errMsg = parsed.error;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("Received empty media payload.");
      }

      // Trigger standard browser download via Object URL
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
    } catch (err: any) {
      console.warn("Direct blob download encounter:", err);
      // Fallback: If proxy download failed, trigger direct navigation/download link
      try {
        const fallbackLink = document.createElement("a");
        fallbackLink.href = mediaUrl;
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        fallbackLink.download = finalFilename;
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
      } catch (_) {
        setDownloadErrors(prev => ({
          ...prev,
          [itemKey]: "Unable to save file automatically. Please use 'Open Direct Media Link' below to save directly."
        }));
      }
    } finally {
      setDownloadingKey(null);
    }
  };

  // Extract Instagram URLs automatically from input text
  useEffect(() => {
    const regex = /https?:\/\/(?:www\.)?instagram\.com\/[^\s,]+/gi;
    const matches = inputText.match(regex);
    if (matches) {
      // De-duplicate parsed URLs to avoid redundant fetches
      const uniqueUrls = Array.from(new Set(matches.map(u => u.trim())));
      setDetectedUrls(uniqueUrls);
    } else {
      setDetectedUrls([]);
    }
  }, [inputText]);

  const handleProcessBulk = async (e: FormEvent) => {
    e.preventDefault();
    if (detectedUrls.length === 0) return;

    setIsProcessing(true);
    setSelectedMediaIndexes({});
    
    // Initialize status for each detected URL
    const initialStatuses: UrlProcessStatus[] = detectedUrls.map(url => ({
      url,
      status: 'pending',
      media: []
    }));
    setProcessingStatuses(initialStatuses);

    // Process each URL sequentially to show progress and avoid severe rate limiting
    for (let i = 0; i < detectedUrls.length; i++) {
      const currentUrl = detectedUrls[i];
      
      // Update status to 'loading'
      setProcessingStatuses(prev => 
        prev.map((item, idx) => idx === i ? { ...item, status: 'loading' } : item)
      );

      try {
        const response = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: currentUrl }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Unable to fetch this Instagram link. Please ensure the account or post is public and try again.");
        }

        if (result.success && result.media && result.media.length > 0) {
          setProcessingStatuses(prev => 
            prev.map((item, idx) => idx === i ? { 
              ...item, 
              status: 'success', 
              media: result.media 
            } : item)
          );
        } else {
          throw new Error("No downloadable media was found at this URL. Please verify the link is a valid public post or Reel.");
        }
      } catch (err: any) {
        setProcessingStatuses(prev => 
          prev.map((item, idx) => idx === i ? { 
            ...item, 
            status: 'error', 
            errorMsg: err.message || "Unable to retrieve media from this link. Please check that the link is accessible." 
          } : item)
        );
      }
    }

    setIsProcessing(false);
  };

  const isVideoUrl = (urlStr: string) => {
    if (!urlStr) return false;
    let textToCheck = urlStr.toLowerCase();

    try {
      const parsed = new URL(urlStr);
      const token = parsed.searchParams.get("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length >= 2) {
          const payloadBase64 = parts[1];
          const normalizedBase64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
          const decoded = window.atob(normalizedBase64);
          if (decoded) {
            textToCheck += " " + decoded.toLowerCase();
          }
        }
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    return (
      textToCheck.includes(".mp4") || 
      textToCheck.includes("video_format") || 
      textToCheck.includes("video") || 
      textToCheck.includes(".m4v") || 
      textToCheck.includes(".mov") ||
      textToCheck.includes(".webm")
    );
  };

  const successfulJobs = processingStatuses.filter(job => job.status === 'success' && job.media.length > 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Input Form block */}
      <div className="bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
        
        <form onSubmit={handleProcessBulk} className="space-y-6 relative z-10">
          <div className="space-y-3">
            <label htmlFor="instagram-urls" className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
              <span className="flex items-center gap-2">
                <Link2 size={14} className="text-indigo-600" />
                Instagram URL(s) - One or Multiple
              </span>
              {detectedUrls.length > 0 && (
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100/40">
                  Detected {detectedUrls.length} Link{detectedUrls.length > 1 ? "s" : ""}
                </span>
              )}
            </label>
            <div className="relative">
              <textarea
                id="instagram-urls"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste Instagram link(s) here. You can paste multiple links, one per line (or separate them by spaces/commas).&#10;&#10;e.g.&#10;https://www.instagram.com/reel/C3_k8x8S7_x/&#10;https://www.instagram.com/p/C9_A8B..."
                disabled={isProcessing}
                className="w-full bg-stone-50/50 border border-stone-200/80 rounded-2xl p-4 text-stone-800 font-mono text-xs placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all resize-y min-h-[150px] shadow-sm"
              />
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText("")}
                  className="absolute right-3 bottom-3 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200/80 text-stone-600 text-[10px] font-bold rounded-xl border border-stone-200 transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
                  title="Clear input"
                  disabled={isProcessing}
                >
                  <X size={12} /> Clear All
                </button>
              )}
            </div>
            <p className="text-xs text-stone-400 font-medium leading-relaxed">
              Paste supported public Instagram Reel, video, carousel, or photo URLs to retrieve available media without an account login.
            </p>
          </div>

          <button
            type="submit"
            disabled={isProcessing || detectedUrls.length === 0}
            className="w-full px-5 py-3.5 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider text-xs shadow-md shadow-indigo-500/10"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Extracting Media ({processingStatuses.filter(s => s.status === 'success' || s.status === 'error').length} of {processingStatuses.length})...
              </>
            ) : (
              <>
                <Download size={16} />
                Extract All {detectedUrls.length > 0 ? `(${detectedUrls.length})` : ""} Media Links
              </>
            )}
          </button>
        </form>
      </div>

      {/* Progress Status Board */}
      {processingStatuses.length > 0 && (
        <div className="bg-stone-50/30 border border-stone-200/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
            <ListPlus size={14} className="text-indigo-600" />
            Extraction Progress ({processingStatuses.filter(s => s.status === 'success' || s.status === 'error').length}/{processingStatuses.length})
          </h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
            {processingStatuses.map((item, index) => (
              <div key={index} className="bg-white border border-stone-100 p-3 rounded-xl flex flex-col gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-start md:items-center gap-2 overflow-hidden flex-1">
                    <Link2 size={14} className="text-stone-400 shrink-0 mt-0.5 md:mt-0" />
                    <span className="text-[10px] font-mono text-stone-500 truncate max-w-full" title={item.url}>
                      {item.url}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 self-end md:self-auto">
                    {item.status === 'pending' && (
                      <span className="text-[10px] font-bold text-stone-500 bg-stone-50 border border-stone-200 px-2.5 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                    {item.status === 'loading' && (
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                        <Loader2 size={10} className="animate-spin" />
                        Extracting...
                      </span>
                    )}
                    {item.status === 'success' && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {item.media.length} found
                      </span>
                    )}
                    {item.status === 'error' && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle size={10} />
                        Extraction Failed
                      </span>
                    )}
                  </div>
                </div>

                {item.status === 'error' && (
                  <div className="bg-rose-50/80 border border-rose-200/60 rounded-lg p-2.5 text-xs text-rose-700 flex items-start gap-2 mt-1">
                    <AlertCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-[11px]">
                      <p className="font-semibold">{item.errorMsg || "Unable to extract media from this link."}</p>
                      <p className="text-rose-600/80">Please ensure the link is a valid public Instagram Reel, Post, or Carousel.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Results State */}
      {successfulJobs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] inline-flex">
            <Video className="text-indigo-600" size={16} />
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Extracted Media ({successfulJobs.length} Post{successfulJobs.length > 1 ? "s" : ""})
            </h3>
          </div>

          {successfulJobs.map((job, jobIdx) => (
            <div key={jobIdx} className="space-y-4 bg-stone-50/20 p-5 rounded-2xl border border-dashed border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 overflow-hidden border-b pb-3 border-stone-100">
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0">Source URL:</span>
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] font-mono text-indigo-600 hover:text-indigo-700 underline truncate flex-1"
                  >
                    {job.url}
                  </a>
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 self-start sm:self-auto">
                  {job.media.length} item{job.media.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="max-w-md mx-auto w-full">
                {(() => {
                  const activeIdx = selectedMediaIndexes[jobIdx] || 0;
                  const clampedActiveIdx = Math.min(Math.max(0, activeIdx), job.media.length - 1);
                  const item = job.media[clampedActiveIdx];
                  if (!item) return null;
                  const isVideo = item.type === "video" || isVideoUrl(item.url);
                  const proxiedUrl = `/api/proxy-media?url=${encodeURIComponent(item.url)}&type=${isVideo ? "video" : "image"}`;
                  const proxiedPoster = item.thumbnail ? `/api/proxy-media?url=${encodeURIComponent(item.thumbnail)}&type=image` : undefined;

                  return (
                    <div className="bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl overflow-hidden flex flex-col">
                      {/* Carousel Index Selector controls */}
                      {job.media.length > 1 && (
                        <div className="bg-stone-50/50 border-b border-stone-100/60 flex flex-col sm:flex-row sm:items-center justify-between p-3.5 gap-2.5">
                          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                            <ListPlus size={12} className="text-indigo-600" />
                            Select Carousel Slide:
                          </span>
                          <div className="flex items-center gap-2">
                            <select
                              aria-label="Select Carousel Slide"
                              value={clampedActiveIdx}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: val }));
                              }}
                              className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-bold text-stone-700 focus:outline-none cursor-pointer"
                            >
                              {job.media.map((_, idx) => (
                                <option key={idx} value={idx}>
                                  Slide {idx + 1} of {job.media.length}
                                </option>
                              ))}
                            </select>
                            
                            <div className="flex gap-1">
                              <button
                                type="button"
                                disabled={clampedActiveIdx === 0}
                                onClick={() => {
                                  setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: clampedActiveIdx - 1 }));
                                }}
                                className="px-2 py-1 bg-white border border-stone-200 rounded-lg text-[10px] font-bold hover:bg-stone-50 disabled:opacity-40 cursor-pointer text-stone-600"
                              >
                                Prev
                              </button>
                              <button
                                type="button"
                                disabled={clampedActiveIdx === job.media.length - 1}
                                onClick={() => {
                                  setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: clampedActiveIdx + 1 }));
                                }}
                                className="px-2 py-1 bg-white border border-stone-200 rounded-lg text-[10px] font-bold hover:bg-stone-50 disabled:opacity-40 cursor-pointer text-stone-600"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Media Content Box */}
                      <div className="aspect-video bg-stone-950 relative flex items-center justify-center overflow-hidden border-b border-stone-200 group">
                        {isVideo ? (
                          <video
                            key={`video-${clampedActiveIdx}-${item.url}`}
                            src={proxiedUrl}
                            poster={proxiedPoster}
                            controls
                            playsInline
                            className="w-full h-full object-contain"
                            preload="metadata"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // If proxied fetch fails, fallback directly to direct CDN URL
                              const target = e.currentTarget;
                              if (target && target.src !== item.url) {
                                target.src = item.url;
                              }
                            }}
                          />
                        ) : (
                          <img
                            key={`img-${clampedActiveIdx}-${item.url}`}
                            src={proxiedUrl}
                            alt={`Instagram Reels Downloader - Downloaded Instagram carousel photo slide #${clampedActiveIdx + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // If proxied fetch fails, fallback directly to direct CDN URL
                              const target = e.currentTarget;
                              if (target && target.src !== item.url) {
                                target.src = item.url;
                              }
                            }}
                          />
                        )}

                        {/* Interactive overlay left arrow (Previous) */}
                        {job.media.length > 1 && clampedActiveIdx > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: clampedActiveIdx - 1 }));
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-stone-200 text-stone-700 flex items-center justify-center shadow-md hover:bg-stone-50 transition-all z-20 cursor-pointer"
                            title="Previous Media Item"
                          >
                            <ChevronLeft size={16} />
                          </button>
                        )}

                        {/* Interactive overlay right arrow (Next) */}
                        {job.media.length > 1 && clampedActiveIdx < job.media.length - 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: clampedActiveIdx + 1 }));
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-stone-200 text-stone-700 flex items-center justify-center shadow-md hover:bg-stone-50 transition-all z-20 cursor-pointer"
                            title="Next Media Item"
                          >
                            <ChevronRight size={16} />
                          </button>
                        )}

                        {/* Interactive Slide indicator dots */}
                        {job.media.length > 1 && (
                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 z-10">
                            {job.media.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setSelectedMediaIndexes(prev => ({ ...prev, [jobIdx]: idx }));
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-150 focus:outline-none cursor-pointer ${
                                  idx === clampedActiveIdx 
                                    ? "bg-indigo-500 scale-125" 
                                    : "bg-stone-500 hover:bg-white"
                                }`}
                                title={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        <span className="absolute top-2.5 left-2.5 bg-stone-900/85 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 z-10 border border-white/10">
                          {isVideo ? (
                            <>
                              <Video size={10} className="text-indigo-400" /> Video / Reel
                            </>
                          ) : (
                            <>
                              <Image size={10} className="text-indigo-400" /> Image
                            </>
                          )}
                          {job.media.length > 1 && ` (${clampedActiveIdx + 1}/${job.media.length})`}
                        </span>
                      </div>

                      {/* Actions Box */}
                      <div className="p-4 flex flex-col gap-2.5 mt-auto bg-stone-50/50">
                        {downloadErrors[`${jobIdx}-${clampedActiveIdx}`] && (
                          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] p-2.5 rounded-xl flex items-start gap-1.5 leading-relaxed">
                            <AlertCircle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                            <span>{downloadErrors[`${jobIdx}-${clampedActiveIdx}`]}</span>
                          </div>
                        )}

                        {isVideo ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              disabled={downloadingKey !== null}
                              onClick={() => handleDownloadMedia(
                                item.url,
                                true,
                                "mp4",
                                `instagram_video_${clampedActiveIdx + 1}`,
                                `${jobIdx}-${clampedActiveIdx}-mp4`
                              )}
                              className="px-3.5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 text-center uppercase tracking-wider shadow-sm cursor-pointer"
                              title="Download Video in MP4 Format"
                            >
                              {downloadingKey === `${jobIdx}-${clampedActiveIdx}-mp4` ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Video size={14} />
                                  Download MP4
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={downloadingKey !== null}
                              onClick={() => handleDownloadMedia(
                                item.url,
                                true,
                                "mp3",
                                `instagram_audio_${clampedActiveIdx + 1}`,
                                `${jobIdx}-${clampedActiveIdx}-mp3`
                              )}
                              className="px-3.5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:opacity-95 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 text-center uppercase tracking-wider shadow-sm cursor-pointer"
                              title="Download Audio in MP3 Format"
                            >
                              {downloadingKey === `${jobIdx}-${clampedActiveIdx}-mp3` ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  Converting MP3...
                                </>
                              ) : (
                                <>
                                  <Music size={14} />
                                  Download MP3
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              disabled={downloadingKey !== null}
                              onClick={() => handleDownloadMedia(
                                item.url,
                                false,
                                "jpg",
                                `instagram_photo_${clampedActiveIdx + 1}`,
                                `${jobIdx}-${clampedActiveIdx}-jpg`
                              )}
                              className="px-3.5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 text-center uppercase tracking-wider shadow-sm cursor-pointer"
                              title="Download Photo in JPG Format"
                            >
                              {downloadingKey === `${jobIdx}-${clampedActiveIdx}-jpg` ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Image size={14} />
                                  Download JPG
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={downloadingKey !== null}
                              onClick={() => handleDownloadMedia(
                                item.url,
                                false,
                                "png",
                                `instagram_photo_${clampedActiveIdx + 1}`,
                                `${jobIdx}-${clampedActiveIdx}-png`
                              )}
                              className="px-3.5 py-2.5 bg-white hover:bg-stone-100 disabled:opacity-60 text-stone-700 font-bold text-xs rounded-xl border border-stone-200 transition-all flex items-center justify-center gap-1.5 text-center uppercase tracking-wider shadow-sm cursor-pointer"
                              title="Download Photo in PNG Format"
                            >
                              {downloadingKey === `${jobIdx}-${clampedActiveIdx}-png` ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  Converting PNG...
                                </>
                              ) : (
                                <>
                                  <Image size={14} />
                                  Download PNG
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        <a
                          href={proxiedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-white hover:bg-stone-100 text-stone-600 font-bold text-xs rounded-xl border border-stone-200/80 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          title="Open Direct Media Link"
                        >
                          <ExternalLink size={12} />
                          Open Direct Media Link
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


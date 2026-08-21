import React, { useState, useRef } from 'react';
import { Upload, X, LayoutTemplate, GripHorizontal, Download as DownloadIcon, User } from 'lucide-react';
import { toJpeg } from 'html-to-image';

interface FeedImage {
  id: string;
  dataUrl: string;
  file: File;
}

export function FeedPlanner() {
  const [images, setImages] = useState<FeedImage[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const mockupRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    const newImages = files.slice(0, 15).map(file => {
      return new Promise<FeedImage>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            id: Math.random().toString(36).substring(7),
            dataUrl: event.target?.result as string,
            file
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(loadedImages => {
      setImages(prev => [...loadedImages, ...prev]);
    });
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = images.findIndex(img => img.id === draggedId);
    const targetIndex = images.findIndex(img => img.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);

    setImages(newImages);
    setDraggedId(null);
  };

  const onDragEnd = () => {
    setDraggedId(null);
  };

  const downloadPreview = async () => {
    if (!mockupRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toJpeg(mockupRef.current, {
        backgroundColor: '#09090b', // zinc-950
        quality: 0.95,
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'instagram-feed-planner.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to capture mockup', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col min-h-[520px] relative">
      <div className="p-5 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-stone-100">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-0.5 flex items-center gap-2">
                <LayoutTemplate className="text-stone-700" size={14} />
                Feed Planner
              </h2>
              <p className="text-stone-500 text-xs font-normal">Plan, curate, and rearrange your grid layout with drag-and-drop preview.</p>
            </div>
            
            <div className="flex items-center gap-2">
               {images.length > 0 && (
                <>
                  <button 
                    onClick={downloadPreview}
                    disabled={isDownloading}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <DownloadIcon size={13} />
                    <span>{isDownloading ? 'Exporting...' : 'Export View'}</span>
                  </button>
                  <button 
                    onClick={clearAll}
                    className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </>
               )}
               <label className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs">
                  <Upload size={13} />
                  <span>Upload Photos</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
               </label>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div ref={mockupRef} className="w-full max-w-sm bg-white border border-stone-200 rounded-xl p-5 shadow-xs min-h-[380px]">
              
              {/* Instagram Profile Header Mockup */}
              <div className="flex flex-col gap-3.5 mb-5 pb-4 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  {/* Profile Picture */}
                  <div className="relative w-16 h-16 rounded-full bg-stone-100 border border-stone-200 p-0.5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center overflow-hidden">
                       <User className="text-stone-400" size={24} />
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex flex-1 justify-around text-center ml-3 text-stone-800">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{images.length}</span>
                      <span className="text-stone-400 text-[10px] uppercase">posts</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">12.4K</span>
                      <span className="text-stone-400 text-[10px] uppercase">followers</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">480</span>
                      <span className="text-stone-400 text-[10px] uppercase">following</span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <div className="text-left text-xs text-stone-600 px-0.5">
                  <div className="font-semibold text-stone-900 text-xs mb-0.5">Creator Name</div>
                  <div className="text-stone-400 text-[10px]">Digital Creator & Strategist</div>
                  <div className="mt-1 text-stone-600 leading-relaxed text-[11px]">
                    Curating aesthetics & visual brand experiences.<br/>
                    Weekly tips & creative workflows.
                  </div>
                  <div className="text-stone-800 mt-1 font-medium text-[11px] underline">growthcaption.com</div>
                </div>
              </div>

              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 text-stone-400 gap-2 text-xs bg-stone-50/60 rounded-lg border border-dashed border-stone-200">
                  <LayoutTemplate size={28} className="text-stone-300" />
                  <p className="text-stone-500 font-medium">Upload photos to preview grid layout.<br/><span className="text-stone-400 font-normal">Drag and drop to rearrange tiles.</span></p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, img.id)}
                      onDragOver={onDragOver}
                      onDrop={(e) => onDrop(e, img.id)}
                      onDragEnd={onDragEnd}
                      className={`relative aspect-square group cursor-move ${draggedId === img.id ? 'opacity-40' : ''} transition-opacity duration-150 rounded-md overflow-hidden bg-stone-100 border border-stone-200`}
                    >
                      <img 
                        src={img.dataUrl} 
                        alt="Feed Planner Preview" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-1.5 transition-opacity">
                        <div className="flex justify-end">
                           <button 
                             onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                             className="bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 p-1 rounded-md shadow-2xs border border-stone-200 transition-colors"
                             title="Remove image"
                           >
                              <X size={11} />
                           </button>
                        </div>
                        <div className="flex justify-center pb-1">
                           <GripHorizontal size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty slots to fill the row if needed */}
                  {Array.from({ length: (3 - (images.length % 3)) % 3 }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-stone-50 border border-stone-100 rounded-md"></div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

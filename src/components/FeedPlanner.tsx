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
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md flex flex-col min-h-[600px] relative">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none -z-10"></div>
      <div className="p-6 md:p-8 flex flex-col items-center relative z-10">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                <LayoutTemplate className="text-blue-600" size={14} />
                Feed Planner
              </h2>
              <p className="text-slate-500 text-xs font-medium">Visualize your Instagram profile layout using drag and drop.</p>
            </div>
            
            <div className="flex items-center gap-3">
               {images.length > 0 && (
                <>
                  <button 
                    onClick={downloadPreview}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-lg transition-all disabled:opacity-50 uppercase tracking-wider"
                  >
                    <DownloadIcon size={14} />
                    {isDownloading ? 'Saving...' : 'Preview'}
                  </button>
                  <button 
                    onClick={clearAll}
                    className="px-4 py-2.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 border border-red-100 shadow-sm rounded-lg transition-all uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </>
               )}
               <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase tracking-wider shadow-sm">
                  <Upload size={14} />
                  Add Photos
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
               </label>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div ref={mockupRef} className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md min-h-[400px]">
              
              {/* Instagram Profile Header Mockup */}
              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  {/* Profile Picture */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center overflow-hidden">
                       <User className="text-slate-300" size={32} />
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex flex-1 justify-around text-center ml-4 text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold text-base">{images.length}</span>
                      <span className="text-slate-400 font-bold text-[10px] uppercase pt-0.5">posts</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-base">10.5K</span>
                      <span className="text-slate-400 font-bold text-[10px] uppercase pt-0.5">followers</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-base">450</span>
                      <span className="text-slate-400 font-bold text-[10px] uppercase pt-0.5">following</span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <div className="text-left text-xs text-slate-600 px-1">
                  <div className="font-bold text-slate-800 text-sm mb-0.5">Your Name</div>
                  <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Digital creator</div>
                  <div className="mt-1.5 text-slate-500 font-medium leading-relaxed">
                    ✨ Sparking creativity every day<br/>
                    📸 Photographer & Designer<br/>
                    📍 New York City
                  </div>
                  <div className="text-blue-600 mt-1.5 cursor-pointer font-bold text-xs flex items-center gap-1 hover:underline">linktr.ee/yourname</div>
                </div>
              </div>

              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 gap-3 text-xs font-bold bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <LayoutTemplate size={36} className="text-slate-300" />
                  <p className="text-slate-500 leading-relaxed">Upload photos to start planning your feed.<br/>Drag and drop to rearrange them.</p>
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
                      className={`relative aspect-square group cursor-move ${draggedId === img.id ? 'opacity-50 scale-95' : 'hover:scale-[1.01] hover:shadow-sm hover:z-20'} transition-all duration-200 z-10 origin-center rounded-lg overflow-hidden border border-transparent bg-slate-100`}
                    >
                      <img 
                        src={img.dataUrl} 
                        alt={`Instagram Feed Planner Generator - Feed Planner mockup grid item #${images.findIndex(i => i.id === img.id) + 1}`} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-2 transition-opacity">
                        <div className="flex justify-end">
                           <button 
                             onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                             className="bg-white hover:bg-red-50 text-red-600 p-1.5 rounded-full shadow-sm border border-slate-100 transition-all font-bold"
                           >
                              <X size={12} />
                           </button>
                        </div>
                        <div className="flex justify-center pb-2">
                           <GripHorizontal size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty slots to fill the row if needed, visually */}
                  {Array.from({ length: (3 - (images.length % 3)) % 3 }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-slate-50 border border-slate-100 rounded-lg"></div>
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

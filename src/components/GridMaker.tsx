import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, ImageIcon, Download, Grid3X3, Trash2, LayoutGrid, ZoomIn } from 'lucide-react';
import Cropper from 'react-easy-crop';

interface SplitImage {
  id: string;
  dataUrl: string;
}

export function GridMaker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [gridRows, setGridRows] = useState<number>(3);
  const [splitImages, setSplitImages] = useState<SplitImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setSplitImages([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    if (!imageSrc || !croppedAreaPixels) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      const cols = 3;
      const rows = gridRows;
      const { x, y, width, height } = croppedAreaPixels;
      
      const tileWidth = width / cols;
      const tileHeight = height / rows;
      
      const newSplitImages: SplitImage[] = [];

      canvas.width = tileWidth;
      canvas.height = tileHeight;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            x + (c * tileWidth),
            y + (r * tileHeight),
            tileWidth,
            tileHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
          
          newSplitImages.push({
            id: `row-${r}-col-${c}`,
            dataUrl: canvas.toDataURL('image/jpeg', 0.95)
          });
        }
      }
      
      setSplitImages(newSplitImages);
      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  const downloadImage = (dataUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    // Instagram order: to post them so they appear correctly on the profile,
    // you must post the LAST tile first. So we give them a specific numbering to help users.
    const totalTiles = splitImages.length;
    const postOrder = totalTiles - index; // 1 goes first
    a.download = `grid_part_${postOrder}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    splitImages.forEach((img, index) => {
      // Small timeout to prevent the browser from blocking multiple downloads
      setTimeout(() => {
        downloadImage(img.dataUrl, index);
      }, index * 200);
    });
  };

  return (
    <div className="bg-white border border-stone-200/85 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col min-h-[600px] relative">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Column: Config */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-2">
              <LayoutGrid className="text-indigo-600" size={14} />
              Grid Maker
            </h2>
            <p className="text-stone-500 text-xs font-medium">Split one photo into a perfect Instagram grid layout.</p>
          </div>

          {!imageSrc ? (
            <label className="flex flex-col items-center justify-center p-8 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 hover:bg-stone-100/50 hover:border-stone-300 transition-colors cursor-pointer group shadow-sm">
              <div className="p-4 bg-white shadow-sm border border-stone-200 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-indigo-600" />
              </div>
              <span className="text-stone-700 font-bold text-xs mb-1">Click to upload photo</span>
              <span className="text-stone-400 text-[10px] font-medium">JPG, PNG up to 10MB</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm flex flex-col min-h-[300px]">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={3 / gridRows}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <button 
                  onClick={() => { setImageSrc(null); setSplitImages([]); }}
                  className="absolute top-4 right-4 bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-xl border border-rose-100 shadow-sm transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bg-white px-4 py-2.5 rounded-xl border border-stone-200 flex items-center gap-3 shadow-sm">
                <ZoomIn size={16} className="text-stone-400" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              
              <div className="bg-white p-4 rounded-2xl border border-stone-200/85 space-y-3 shadow-sm">
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500">
                  Grid Layout Ratio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((rows) => (
                    <button
                      key={rows}
                      onClick={() => setGridRows(rows)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        gridRows === rows
                        ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                        : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800'
                      }`}
                    >
                      3 × {rows}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={processImage}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white rounded-xl py-3.5 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-indigo-500/10 uppercase tracking-wider text-xs cursor-pointer"
              >
                <Grid3X3 size={16} />
                {isProcessing ? 'Processing...' : 'Split Image'}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 bg-stone-50/40 rounded-3xl p-6 flex flex-col border border-stone-200/60 shadow-inner">
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
             {splitImages.length > 0 ? (
                <div className="w-full max-w-sm flex flex-col space-y-6 items-center">
                  <div 
                    className="grid gap-2 w-full bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm"
                    style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
                  >
                    {splitImages.map((img, idx) => (
                      <div key={img.id} className="relative aspect-square group cursor-pointer border border-stone-200/60 rounded-xl overflow-hidden shadow-sm transition-all hover:-translate-y-[1px]" onClick={() => downloadImage(img.dataUrl, idx)}>
                        <img src={img.dataUrl} alt={`Instagram Grid Maker Generator - Split Grid Tile ${idx + 1} preview (Post Sequence #${splitImages.length - idx})`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-indigo-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Download size={20} className="text-white" />
                        </div>
                        {/* Number badge helping users know posting order */}
                        <div className="absolute top-1.5 right-1.5 bg-indigo-600 border border-white text-white text-[9px] font-bold font-mono h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                          {splitImages.length - idx}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50 text-indigo-800 text-xs font-medium px-4 py-3 rounded-2xl border border-indigo-100/40 w-full text-center leading-relaxed">
                    <strong className="text-indigo-900 font-bold">Tip:</strong> Post these to Instagram starting with the highest number (part {splitImages.length}) first!
                  </div>

                  <button
                    onClick={downloadAll}
                    className="w-full max-w-xs flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white py-3.5 rounded-xl transition-all font-bold text-xs shadow-md shadow-indigo-500/10 uppercase tracking-widest cursor-pointer"
                  >
                    <Download size={16} />
                    Download All
                  </button>
                </div>
             ) : (
                <div className="text-center text-stone-400 flex flex-col items-center gap-3 bg-white p-6 rounded-2xl border border-dashed border-stone-200/80 max-w-sm shadow-sm">
                  <LayoutGrid size={36} className="text-stone-300" />
                  <p className="font-bold text-stone-500 text-xs">Upload and split an image to see your grid preview here.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

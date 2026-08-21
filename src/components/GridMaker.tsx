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
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col min-h-[520px] relative">
      <div className="p-5 md:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Config */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1 flex items-center gap-2">
              <LayoutGrid className="text-stone-700" size={14} />
              Grid Maker
            </h2>
            <p className="text-stone-500 text-xs font-normal">Split one high-resolution photo into a clean multi-tile grid layout.</p>
          </div>

          {!imageSrc ? (
            <label className="flex flex-col items-center justify-center p-8 border border-dashed border-stone-300 rounded-xl bg-stone-50/50 hover:bg-stone-100 hover:border-stone-400 transition-colors cursor-pointer group">
              <div className="p-3 bg-white border border-stone-200 rounded-lg mb-3">
                <Upload size={18} className="text-stone-700" />
              </div>
              <span className="text-stone-800 font-semibold text-xs mb-0.5">Click to upload photo</span>
              <span className="text-stone-400 text-[11px]">JPG, PNG, WebP up to 15MB</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex flex-col min-h-[280px]">
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
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 p-1.5 rounded-lg border border-stone-200 shadow-2xs transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="bg-stone-50 px-3 py-2 rounded-lg border border-stone-200 flex items-center gap-2.5">
                <ZoomIn size={14} className="text-stone-500" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1 bg-stone-200 rounded-lg cursor-pointer accent-stone-900"
                />
              </div>
              
              <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Grid Rows (3 × N)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((rows) => (
                    <button
                      key={rows}
                      onClick={() => setGridRows(rows)}
                      className={`py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                        gridRows === rows
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
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
                className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-lg py-2.5 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-xs cursor-pointer shadow-2xs"
              >
                <Grid3X3 size={14} />
                <span>{isProcessing ? 'Processing Tiles...' : 'Split Image'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 bg-stone-50/70 rounded-xl p-5 flex flex-col border border-stone-200">
          <div className="flex-1 flex flex-col items-center justify-center min-h-[360px]">
             {splitImages.length > 0 ? (
                <div className="w-full max-w-sm flex flex-col space-y-4 items-center">
                  <div 
                    className="grid gap-1.5 w-full bg-white p-3 rounded-xl border border-stone-200"
                    style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
                  >
                    {splitImages.map((img, idx) => (
                      <div key={img.id} className="relative aspect-square group cursor-pointer border border-stone-200 rounded-lg overflow-hidden" onClick={() => downloadImage(img.dataUrl, idx)}>
                        <img src={img.dataUrl} alt={`Grid Tile ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Download size={16} className="text-white" />
                        </div>
                        {/* Number badge helping users know posting order */}
                        <div className="absolute top-1 right-1 bg-stone-900 text-white text-[9px] font-mono h-4 w-4 flex items-center justify-center rounded-full">
                          {splitImages.length - idx}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-stone-100 text-stone-700 text-xs px-3.5 py-2.5 rounded-lg border border-stone-200 w-full text-center leading-relaxed">
                    <strong className="text-stone-900 font-semibold">Posting Order:</strong> Post tile #{splitImages.length} first, descending down to #1 so it renders seamlessly on your profile grid.
                  </div>

                  <button
                    onClick={downloadAll}
                    className="w-full max-w-xs flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-lg transition-colors font-semibold text-xs shadow-2xs cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download All ({splitImages.length} Tiles)</span>
                  </button>
                </div>
             ) : (
                <div className="text-center text-stone-400 flex flex-col items-center gap-2 bg-white p-6 rounded-xl border border-dashed border-stone-200 max-w-xs">
                  <LayoutGrid size={28} className="text-stone-300" />
                  <p className="font-medium text-stone-600 text-xs">Upload and split a photo to view generated tiles.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Upload, ImageIcon, Download, Settings, RefreshCw, Smartphone, Monitor, Square, Maximize, ZoomIn, ZoomOut, RotateCcw, Move, Crop, Check, X, Sliders, Layers, FileDown, Zap, HardDrive } from 'lucide-react';

type RatioVariant = 'square' | 'portrait' | 'landscape' | 'story' | 'profile' | 'custom';

interface RatioInfo {
  id: RatioVariant;
  label: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const INSTAGRAM_RATIOS: RatioInfo[] = [
  { id: 'square', label: 'Square (1:1)', width: 1080, height: 1080, icon: <Square size={16} /> },
  { id: 'portrait', label: 'Portrait (4:5)', width: 1080, height: 1350, icon: <Smartphone size={16} /> },
  { id: 'landscape', label: 'Landscape (1.91:1)', width: 1080, height: 566, icon: <Monitor size={16} /> },
  { id: 'story', label: 'Story/Reel (9:16)', width: 1080, height: 1920, icon: <Maximize size={16} /> },
  { id: 'profile', label: 'Profile (1:1)', width: 320, height: 320, icon: <Square size={16} /> },
  { id: 'custom', label: 'Custom Size', width: 1080, height: 1080, icon: <Settings size={16} /> },
];

type CropRatioOption = 'free' | '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:2';

interface CropBox {
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  w: number; // percentage 0..100
  h: number; // percentage 0..100
}

export function PhotoResizer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImageObj, setOriginalImageObj] = useState<HTMLImageElement | null>(null);
  const [workingImageObj, setWorkingImageObj] = useState<HTMLImageElement | null>(null);
  const [originalFileSize, setOriginalFileSize] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'resize' | 'crop' | 'compress'>('resize');

  // Resize & Format states
  const [ratio, setRatio] = useState<RatioInfo>(INSTAGRAM_RATIOS[0]);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [bgColor, setBgColor] = useState<string>('#ffffff');

  // Compression states
  const [quality, setQuality] = useState<number>(80); // 10..100
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [compressedSizeBytes, setCompressedSizeBytes] = useState<number | null>(null);
  const [scalePercent, setScalePercent] = useState<number>(100); // 25, 50, 75, 100
  
  // Interactive placement states for Resize tab
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffsetStart = useRef({ x: 0, y: 0 });

  // Touch states for pinch-to-zoom
  const touchStartDist = useRef<number | null>(null);
  const touchStartZoom = useRef<number>(1);

  // Crop mode states
  const [cropRatio, setCropRatio] = useState<CropRatioOption>('free');
  const [cropBox, setCropBox] = useState<CropBox>({ x: 10, y: 10, w: 80, h: 80 });
  const [isCroppingApplied, setIsCroppingApplied] = useState(false);
  const cropDragType = useRef<string | null>(null); // 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'
  const cropStartPos = useRef({ x: 0, y: 0 });
  const cropStartBox = useRef<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const cropContainerRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const compressCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!canvasRef.current || !workingImageObj) return;
    isDragging.current = true;
    dragStart.current = { x: clientX, y: clientY };
    dragOffsetStart.current = { x: offsetX, y: offsetY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current || !canvasRef.current || !workingImageObj) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    
    // Convert on-screen drag size to high-resolution canvas coordinates
    const displayToSourceX = canvas.width / rect.width;
    const displayToSourceY = canvas.height / rect.height;
    
    setOffsetX(dragOffsetStart.current.x + dx * displayToSourceX);
    setOffsetY(dragOffsetStart.current.y + dy * displayToSourceY);
  };

  const handleEnd = () => {
    isDragging.current = false;
    touchStartDist.current = null;
  };

  // Listen globally to mouse events during dragging to avoid cursor drop
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX, e.clientY);
      } else if (cropDragType.current) {
        handleCropMouseMove(e);
      }
    };

    const handleWindowMouseUp = () => {
      if (isDragging.current) {
        handleEnd();
      }
      if (cropDragType.current) {
        cropDragType.current = null;
      }
    };

    if (selectedImage) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [offsetX, offsetY, selectedImage, workingImageObj, cropBox]);

  // Touch handlers for mobile pan & pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canvasRef.current || !workingImageObj) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
      touchStartDist.current = null;
    } else if (e.touches.length === 2) {
      isDragging.current = false; // Suspend dragging during pinch
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = dist;
      touchStartZoom.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current || !workingImageObj) return;
    if (e.touches.length === 1 && isDragging.current) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist.current;
      const newZoom = Math.min(4.0, Math.max(0.5, touchStartZoom.current * factor));
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Reset position & zoom when image, ratio preset or fit mode changes
  useEffect(() => {
    setOffsetX(0);
    setOffsetY(0);
    setZoom(1);
  }, [workingImageObj, ratio.id, fitMode]);

  const loadImageFromUrl = (url: string, fileByteSize?: number) => {
    setSelectedImage(url);
    if (fileByteSize) {
      setOriginalFileSize(fileByteSize);
    }
    const img = new Image();
    img.onload = () => {
      setOriginalImageObj(img);
      setWorkingImageObj(img);
      setIsCroppingApplied(false);
      resetCropBoxForImage(img, 'free');
    };
    img.src = url;
  };

  const resetCropBoxForImage = (img: HTMLImageElement, aspect: CropRatioOption) => {
    let w = 80;
    let h = 80;

    if (aspect !== 'free') {
      const [numW, numH] = aspect.split(':').map(Number);
      const targetAspect = numW / numH;
      const imgAspect = img.width / img.height;

      if (imgAspect > targetAspect) {
        h = 80;
        w = (h * targetAspect) / imgAspect;
      } else {
        w = 80;
        h = (w / targetAspect) * imgAspect;
      }
    }

    const x = (100 - w) / 2;
    const y = (100 - h) / 2;
    setCropBox({ x, y, w, h });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loadImageFromUrl(url, file.size);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      loadImageFromUrl(url, file.size);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Crop drag logic
  const handleCropMouseDown = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    cropDragType.current = type;
    cropStartPos.current = { x: e.clientX, y: e.clientY };
    cropStartBox.current = { ...cropBox };
  };

  const handleCropTouchStart = (e: React.TouchEvent, type: string) => {
    e.stopPropagation();
    if (e.touches.length === 1) {
      cropDragType.current = type;
      cropStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      cropStartBox.current = { ...cropBox };
    }
  };

  const handleCropMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!cropDragType.current || !cropContainerRef.current || !originalImageObj) return;

    const rect = cropContainerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = ((clientX - cropStartPos.current.x) / rect.width) * 100;
    const dy = ((clientY - cropStartPos.current.y) / rect.height) * 100;

    let { x, y, w, h } = cropStartBox.current;
    const type = cropDragType.current;

    let targetRatioVal: number | null = null;
    if (cropRatio !== 'free') {
      const [numW, numH] = cropRatio.split(':').map(Number);
      targetRatioVal = (numW / numH) / (originalImageObj.width / originalImageObj.height);
    }

    if (type === 'move') {
      x = Math.max(0, Math.min(100 - w, x + dx));
      y = Math.max(0, Math.min(100 - h, y + dy));
    } else {
      if (type.includes('e')) {
        w = Math.max(10, Math.min(100 - x, w + dx));
        if (targetRatioVal) h = w / targetRatioVal;
      }
      if (type.includes('s')) {
        h = Math.max(10, Math.min(100 - y, h + dy));
        if (targetRatioVal) w = h * targetRatioVal;
      }
      if (type.includes('w')) {
        const newW = Math.max(10, Math.min(x + w, w - dx));
        x = x + (w - newW);
        w = newW;
        if (targetRatioVal) h = w / targetRatioVal;
      }
      if (type.includes('n')) {
        const newH = Math.max(10, Math.min(y + h, h - dy));
        y = y + (h - newH);
        h = newH;
        if (targetRatioVal) w = h * targetRatioVal;
      }

      // Constrain inside bounds
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + w > 100) w = 100 - x;
      if (y + h > 100) h = 100 - y;
    }

    setCropBox({ x, y, w, h });
  };

  const applyCrop = () => {
    if (!originalImageObj) return;

    const sourceX = (cropBox.x / 100) * originalImageObj.width;
    const sourceY = (cropBox.y / 100) * originalImageObj.height;
    const sourceW = (cropBox.w / 100) * originalImageObj.width;
    const sourceH = (cropBox.h / 100) * originalImageObj.height;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = Math.max(1, Math.round(sourceW));
    tempCanvas.height = Math.max(1, Math.round(sourceH));

    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      originalImageObj,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    const croppedUrl = tempCanvas.toDataURL('image/png');
    const newImg = new Image();
    newImg.onload = () => {
      setWorkingImageObj(newImg);
      setIsCroppingApplied(true);
      setActiveTab('resize');
    };
    newImg.src = croppedUrl;
  };

  const resetToOriginal = () => {
    if (originalImageObj) {
      setWorkingImageObj(originalImageObj);
      setIsCroppingApplied(false);
      resetCropBoxForImage(originalImageObj, cropRatio);
    }
  };

  const handleCropRatioChange = (newRatio: CropRatioOption) => {
    setCropRatio(newRatio);
    if (originalImageObj) {
      resetCropBoxForImage(originalImageObj, newRatio);
    }
  };

  // Render Resized Canvas
  useEffect(() => {
    if (workingImageObj && canvasRef.current && activeTab === 'resize') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = ratio.width;
      canvas.height = ratio.height;

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let baseScale = 1;
      if (fitMode === 'cover') {
        baseScale = Math.max(canvas.width / workingImageObj.width, canvas.height / workingImageObj.height);
      } else {
        baseScale = Math.min(canvas.width / workingImageObj.width, canvas.height / workingImageObj.height);
      }

      const finalScale = baseScale * zoom;
      const defaultX = (canvas.width / 2) - (workingImageObj.width * finalScale) / 2;
      const defaultY = (canvas.height / 2) - (workingImageObj.height * finalScale) / 2;

      const drawX = defaultX + offsetX;
      const drawY = defaultY + offsetY;

      ctx.drawImage(workingImageObj, drawX, drawY, workingImageObj.width * finalScale, workingImageObj.height * finalScale);
    }
  }, [workingImageObj, ratio, fitMode, bgColor, offsetX, offsetY, zoom, activeTab]);

  // Compression canvas drawing and live size estimation
  useEffect(() => {
    if (!workingImageObj) return;

    const targetW = Math.max(1, Math.round(workingImageObj.width * (scalePercent / 100)));
    const targetH = Math.max(1, Math.round(workingImageObj.height * (scalePercent / 100)));

    const canvas = compressCanvasRef.current || document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(workingImageObj, 0, 0, targetW, targetH);

    const qVal = exportFormat === 'image/png' ? undefined : quality / 100;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCompressedSizeBytes(blob.size);
        }
      },
      exportFormat,
      qVal
    );
  }, [workingImageObj, quality, exportFormat, scalePercent, activeTab]);

  const handleDownloadResized = () => {
    if (canvasRef.current && selectedImage) {
      const qVal = exportFormat === 'image/png' ? undefined : quality / 100;
      const imgDataUrl = canvasRef.current.toDataURL(exportFormat, qVal);
      const ext = exportFormat === 'image/webp' ? 'webp' : exportFormat === 'image/png' ? 'png' : 'jpg';
      const link = document.createElement('a');
      link.href = imgDataUrl;
      link.download = `instagram-${ratio.id}-${Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadCompressed = () => {
    if (!workingImageObj) return;

    const targetW = Math.max(1, Math.round(workingImageObj.width * (scalePercent / 100)));
    const targetH = Math.max(1, Math.round(workingImageObj.height * (scalePercent / 100)));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(workingImageObj, 0, 0, targetW, targetH);

    const qVal = exportFormat === 'image/png' ? undefined : quality / 100;
    const ext = exportFormat === 'image/webp' ? 'webp' : exportFormat === 'image/png' ? 'png' : 'jpg';

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `compressed-photo-${quality}pct-${Date.now()}.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      },
      exportFormat,
      qVal
    );
  };

  const clearImage = () => {
    setSelectedImage(null);
    setOriginalImageObj(null);
    setWorkingImageObj(null);
    setOriginalFileSize(null);
    setCompressedSizeBytes(null);
    setIsCroppingApplied(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number | null) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate actual pixel dimensions of cropped area
  const croppedPixelWidth = originalImageObj ? Math.round((cropBox.w / 100) * originalImageObj.width) : 0;
  const croppedPixelHeight = originalImageObj ? Math.round((cropBox.h / 100) * originalImageObj.height) : 0;

  // Calculate percentage saved in compressor mode
  const rawOriginalBytes = originalFileSize || (workingImageObj ? workingImageObj.width * workingImageObj.height * 0.75 : 0);
  const percentSaved = compressedSizeBytes && rawOriginalBytes > 0
    ? Math.round(((rawOriginalBytes - compressedSizeBytes) / rawOriginalBytes) * 100)
    : 0;

  return (
    <div className="bg-white border border-slate-200 shadow-md p-6 md:p-8 rounded-2xl relative overflow-hidden w-full text-left">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none -z-10"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-100 pb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <ImageIcon className="text-blue-600" size={16} />
          Instagram Photo Resizer, Cropper & Compressor
        </h2>

        {selectedImage && (
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('resize')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'resize'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders size={14} />
              Resize & Format
            </button>
            <button
              onClick={() => setActiveTab('crop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'crop'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crop size={14} />
              Crop Photo
              {isCroppingApplied && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-0.5"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('compress')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'compress'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap size={14} className="text-amber-500" />
              Compress Image
            </button>
          </div>
        )}
      </div>

      {!selectedImage ? (
        <div 
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border border-dashed border-slate-200 rounded-xl bg-slate-50 p-12 text-center cursor-pointer hover:border-slate-300 hover:bg-slate-100/50 transition-all flex flex-col items-center justify-center min-h-[300px] shadow-sm relative z-10 group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-4 bg-white shadow-sm border border-slate-200 rounded-xl mb-4 group-hover:scale-110 transition-transform flex gap-2">
             <Upload size={24} className="text-blue-600" />
             <Zap size={24} className="text-amber-500" />
          </div>
          <h3 className="text-sm font-bold text-slate-700 mb-1">Upload a photo to Resize, Crop or Compress</h3>
          <p className="text-xs font-medium text-slate-400 max-w-sm mb-6">
            Drag and drop an image here, or click to browse your files. Convert format, adjust quality, resize or crop instantly.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest shadow-sm">
            Select Photo
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : activeTab === 'compress' ? (
        /* IMAGE COMPRESSOR INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-5 space-y-6">
            {/* File Size Comparison Badge */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <HardDrive size={14} className="text-amber-400" />
                  File Size Comparison
                </span>
                {percentSaved > 0 && (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    -{percentSaved}% Smaller
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Original Size</p>
                  <p className="font-mono text-base font-bold text-slate-200">{formatBytes(rawOriginalBytes)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-amber-400 tracking-wider mb-1">Compressed Estimate</p>
                  <p className="font-mono text-xl font-black text-amber-400">{formatBytes(compressedSizeBytes)}</p>
                </div>
              </div>
            </div>

            {/* Compression Quality Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Image Quality: {quality}%
                </label>
                <span className="text-[10px] font-semibold text-slate-400">
                  {quality >= 85 ? 'High Quality' : quality >= 65 ? 'Balanced' : 'High Compression'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer mb-3"
              />

              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'Compact', val: 50 },
                  { label: 'Balanced', val: 70 },
                  { label: 'High', val: 85 },
                  { label: 'Max', val: 95 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => setQuality(preset.val)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                      quality === preset.val
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {preset.label} ({preset.val}%)
                  </button>
                ))}
              </div>
            </div>

            {/* Export Format Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'image/jpeg', label: 'JPG', desc: 'Best for photos' },
                  { id: 'image/webp', label: 'WebP', desc: 'Next-gen web' },
                  { id: 'image/png', label: 'PNG', desc: 'Lossless / Alpha' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      exportFormat === fmt.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs">{fmt.label}</div>
                    <div className={`text-[9px] font-medium ${exportFormat === fmt.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {fmt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scale / Dimension Reduction */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Resize Dimensions Scaling
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[100, 75, 50, 25].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScalePercent(s)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      scalePercent === s
                        ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {s}% Size
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Output resolution: {workingImageObj ? Math.round(workingImageObj.width * (scalePercent / 100)) : 0} × {workingImageObj ? Math.round(workingImageObj.height * (scalePercent / 100)) : 0} px
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleDownloadCompressed}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 px-5 rounded-xl font-bold text-xs flex justify-center items-center gap-2 transition-all shadow-md uppercase tracking-wider"
              >
                <FileDown size={16} />
                Download Compressed Image
              </button>

              <button
                onClick={clearImage}
                className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 py-2.5 px-4 rounded-xl font-bold text-xs flex justify-center items-center gap-2 transition-all"
              >
                <RefreshCw size={14} />
                Start Over / Choose New Photo
              </button>
            </div>
          </div>

          {/* Canvas Compression Live Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[380px] shadow-inner select-none relative">
            <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={12} className="text-amber-400" />
              Live Compressed Image Preview
            </p>
            <canvas
              ref={compressCanvasRef}
              className="max-w-full max-h-[460px] object-contain rounded-xl shadow-2xl border border-slate-700 bg-black/40"
            />
          </div>
        </div>
      ) : activeTab === 'crop' ? (
        /* CROP PHOTO INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <Crop size={14} className="text-blue-600" />
                Aspect Ratio Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {[
                  { id: 'free', label: 'Freeform' },
                  { id: '1:1', label: '1:1 Square' },
                  { id: '4:5', label: '4:5 Portrait' },
                  { id: '9:16', label: '9:16 Story' },
                  { id: '16:9', label: '16:9 Landscape' },
                  { id: '4:3', label: '4:3 Photo' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleCropRatioChange(opt.id as CropRatioOption)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      cropRatio === opt.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Original Dimensions:</span>
                <span className="font-mono font-bold text-slate-800">{originalImageObj?.width} × {originalImageObj?.height} px</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Cropped Region:</span>
                <span className="font-mono font-bold text-blue-600">{croppedPixelWidth} × {croppedPixelHeight} px</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={applyCrop}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 rounded-xl font-bold text-xs flex justify-center items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
              >
                <Check size={16} />
                Apply Crop & Continue
              </button>

              {isCroppingApplied && (
                <button
                  onClick={resetToOriginal}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-xl font-bold text-xs flex justify-center items-center gap-2 transition-all shadow-sm"
                >
                  <RotateCcw size={14} />
                  Reset to Original Uncropped Photo
                </button>
              )}

              <button
                onClick={() => setActiveTab('resize')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 px-4 rounded-xl font-bold text-xs flex justify-center items-center gap-2 transition-all"
              >
                Cancel / Return to Resizer
              </button>
            </div>
          </div>

          {/* Interactive Crop Preview Canvas Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 min-h-[360px] shadow-inner select-none relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <Move size={12} className="text-blue-400" />
              Drag box or corner handles to adjust crop region
            </p>

            <div 
              ref={cropContainerRef}
              className="relative max-w-full max-h-[460px] inline-block overflow-hidden rounded-xl shadow-2xl border border-slate-700 bg-black/40"
              onMouseMove={(e) => cropDragType.current && handleCropMouseMove(e.nativeEvent)}
              onTouchMove={(e) => cropDragType.current && handleCropMouseMove(e.nativeEvent)}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Original preview for cropping"
                  className="max-w-full max-h-[440px] object-contain block pointer-events-none select-none"
                />
              )}

              {/* Darkened overlay outside crop box */}
              <div 
                className="absolute inset-0 bg-black/60 pointer-events-none"
                style={{
                  clipPath: `polygon(
                    0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                    ${cropBox.x}% ${cropBox.y}%,
                    ${cropBox.x}% ${cropBox.y + cropBox.h}%,
                    ${cropBox.x + cropBox.w}% ${cropBox.y + cropBox.h}%,
                    ${cropBox.x + cropBox.w}% ${cropBox.y}%,
                    ${cropBox.x}% ${cropBox.y}%
                  )`
                }}
              />

              {/* Crop selection rectangle */}
              <div
                className="absolute border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)] cursor-move"
                style={{
                  left: `${cropBox.x}%`,
                  top: `${cropBox.y}%`,
                  width: `${cropBox.w}%`,
                  height: `${cropBox.h}%`,
                }}
                onMouseDown={(e) => handleCropMouseDown(e, 'move')}
                onTouchStart={(e) => handleCropTouchStart(e, 'move')}
              >
                {/* Rule of Thirds Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-white/60"></div>
                  <div className="border-r border-b border-white/60"></div>
                  <div className="border-b border-white/60"></div>
                  <div className="border-r border-b border-white/60"></div>
                  <div className="border-r border-b border-white/60"></div>
                  <div className="border-b border-white/60"></div>
                  <div className="border-r border-white/60"></div>
                  <div className="border-r border-white/60"></div>
                  <div></div>
                </div>

                {/* Corner Resize Handles */}
                <div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md cursor-nwse-resize z-20 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleCropMouseDown(e, 'nw')}
                  onTouchStart={(e) => handleCropTouchStart(e, 'nw')}
                />
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md cursor-nesw-resize z-20 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleCropMouseDown(e, 'ne')}
                  onTouchStart={(e) => handleCropTouchStart(e, 'ne')}
                />
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md cursor-nesw-resize z-20 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleCropMouseDown(e, 'sw')}
                  onTouchStart={(e) => handleCropTouchStart(e, 'sw')}
                />
                <div
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md cursor-nwse-resize z-20 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleCropMouseDown(e, 'se')}
                  onTouchStart={(e) => handleCropTouchStart(e, 'se')}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* RESIZE & FORMAT INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
          <div className="space-y-6">
            {/* Quick Crop Banner indicator if cropped */}
            {isCroppingApplied && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2 font-medium">
                  <Check size={16} className="text-emerald-600" />
                  <span>Custom cropped image applied</span>
                </div>
                <button
                  onClick={() => setActiveTab('crop')}
                  className="text-emerald-700 underline font-bold hover:text-emerald-900"
                >
                  Adjust Crop
                </button>
              </div>
            )}

            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <Settings size={14} className="text-blue-600" />
                Select Output Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {INSTAGRAM_RATIOS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRatio(ratio.id === 'custom' && r.id === 'custom' ? ratio : r)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs text-left transition-all ${
                      ratio.id === r.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    <div className={ratio.id === r.id ? 'text-white' : 'text-slate-400'}>
                      {r.icon}
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold">{r.label}</div>
                      <div className="text-[10px] font-medium opacity-80">
                        {r.id === 'custom' && ratio.id === 'custom' ? `${ratio.width} × ${ratio.height} px` : `${r.width} × ${r.height} px`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {ratio.id === 'custom' && (
                <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Width (px)</label>
                    <input 
                      type="number" 
                      value={ratio.width}
                      onChange={(e) => setRatio({ ...ratio, width: Math.max(1, parseInt(e.target.value) || 1080) })}
                      className="w-full bg-white border border-slate-200 font-mono text-xs rounded-lg px-3 py-1.5 font-bold text-slate-800 outline-none focus:border-blue-600 transition-colors shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Height (px)</label>
                    <input 
                      type="number" 
                      value={ratio.height}
                      onChange={(e) => setRatio({ ...ratio, height: Math.max(1, parseInt(e.target.value) || 1080) })}
                      className="w-full bg-white border border-slate-200 font-mono text-xs rounded-lg px-3 py-1.5 font-bold text-slate-800 outline-none focus:border-blue-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Fit Strategy</label>
                <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <button 
                    onClick={() => setFitMode('cover')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${fitMode === 'cover' ? 'bg-white text-slate-800 shadow-sm border border-slate-150' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Fill (Cover)
                  </button>
                  <button 
                    onClick={() => setFitMode('contain')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${fitMode === 'contain' ? 'bg-white text-slate-800 shadow-sm border border-slate-150' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Fit (Pad)
                  </button>
                </div>
              </div>

              {fitMode === 'contain' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Padding Color</label>
                  <div className="flex gap-1.5">
                    {['#ffffff', '#000000', '#f4f4f5', '#18181b', '#3b82f6', '#10b981'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setBgColor(c)}
                        className={`w-6 h-6 rounded-full border ${bgColor === c ? 'border-blue-600 ring-2 ring-blue-100 scale-105 shadow-sm' : 'border-slate-200'} transition-all hover:scale-105`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-6 h-6 rounded-full border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quality & Format Selection in Resize Mode */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Export Quality: {quality}%
                </label>
                <div className="flex gap-1.5">
                  {(['image/jpeg', 'image/webp', 'image/png'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                        exportFormat === fmt
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {fmt.replace('image/', '')}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Position and Zoom Interactive Controls */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Move size={14} className="text-blue-600" />
                  Position & Zoom
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOffsetX(0);
                    setOffsetY(0);
                    setZoom(1);
                  }}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-all bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm cursor-pointer"
                >
                  <RotateCcw size={10} />
                  Reset Position
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Zoom scale: {zoom.toFixed(2)}x</span>
                  <span>Drag photo directly to adjust</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut size={14} className="text-slate-400 shrink-0" />
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-blue-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <ZoomIn size={14} className="text-slate-400 shrink-0" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleDownloadResized}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
              >
                <Download size={16} />
                Download Resized Photo
              </button>

              <button 
                onClick={() => setActiveTab('crop')}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-3 rounded-xl transition-all font-bold text-xs flex justify-center items-center gap-2 shadow-sm"
              >
                <Crop size={15} className="text-blue-600" />
                Crop Photo
              </button>

              <button 
                onClick={clearImage}
                className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm px-4 py-3 rounded-xl transition-all font-bold group"
                title="Start over"
              >
                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[300px] shadow-inner select-none">
            <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <Move size={12} className="text-blue-500" />
              Drag photo to reposition
            </p>
            {/* The canvas is displayed scaled down visually using CSS to fit the container naturally but actual resolution is high */}
            <div className="relative w-full flex justify-center overflow-hidden">
              <canvas 
                ref={canvasRef} 
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="max-w-full max-h-[500px] object-contain rounded-xl shadow-md border border-slate-200 bg-white cursor-move touch-none select-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

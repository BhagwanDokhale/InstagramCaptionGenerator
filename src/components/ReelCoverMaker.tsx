import React, { useState, useRef, useEffect } from 'react';
import { Upload, ImageIcon, Download, RefreshCw, Smartphone, RotateCcw, Move, Type, Layout, AlignCenter, Sparkles, Check, Eye, EyeOff, Plus, Trash2, Sliders, Palette, ZoomIn, ZoomOut } from 'lucide-react';

interface TextOverlay {
  text: string;
  fontFamily: 'Inter' | 'Space Grotesk' | 'Playfair Display' | 'JetBrains Mono' | 'Outfit';
  fontSize: number;
  color: string;
  badgeStyle: 'none' | 'pill' | 'block' | 'shadow';
  badgeColor: string;
  badgeOpacity: number;
  yPosition: number; // Percentage from top (e.g. 50 is center)
}

interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  title: string;
  subtitle: string;
  bgType: 'solid' | 'gradient';
  bgColor: string;
  bgGradient: { from: string; to: string };
  titleStyle: Partial<TextOverlay>;
  subtitleStyle: Partial<TextOverlay>;
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Clean Sans (Inter)' },
  { value: 'Space Grotesk', label: 'Modern Tech (Space Grotesk)' },
  { value: 'Playfair Display', label: 'Classic Serif (Playfair)' },
  { value: 'JetBrains Mono', label: 'Developer Mono (JetBrains)' },
  { value: 'Outfit', label: 'Sleek Geometric (Outfit)' },
];

const BG_GRADIENTS = [
  { name: 'Midnight Charcoal', from: '#111827', to: '#1f2937' },
  { name: 'Sunset Peach', from: '#ff7e5f', to: '#feb47b' },
  { name: 'Lavender Haze', from: '#7f7fd5', to: '#86a8e7' },
  { name: 'Cyber Neon', from: '#0f0c20', to: '#2b1055' },
  { name: 'Emerald Forest', from: '#064e3b', to: '#022c22' },
  { name: 'Ocean Calm', from: '#0f2027', to: '#2c5364' },
];

const TEMPLATES: TemplatePreset[] = [
  {
    id: 'minimal-bold',
    name: 'Minimal Bold',
    description: 'Clean background with a strong focus-grabbing badge',
    title: 'NEW REEL OUT NOW',
    subtitle: 'tap to watch',
    bgType: 'gradient',
    bgColor: '#111827',
    bgGradient: { from: '#121214', to: '#2a2b30' },
    titleStyle: {
      fontFamily: 'Space Grotesk',
      fontSize: 58,
      color: '#ffffff',
      badgeStyle: 'block',
      badgeColor: '#6366f1',
      badgeOpacity: 1,
      yPosition: 46
    },
    subtitleStyle: {
      fontFamily: 'Space Grotesk',
      fontSize: 28,
      color: '#a5b4fc',
      badgeStyle: 'none',
      badgeColor: '#000000',
      badgeOpacity: 0.5,
      yPosition: 54
    }
  },
  {
    id: 'elegant-editorial',
    name: 'Elegant Editorial',
    description: 'Sophisticated Serif layout for lifestyle or fashion',
    title: 'The Art of Simplicity',
    subtitle: 'A CURATED LIFESTYLE JOURNAL',
    bgType: 'gradient',
    bgColor: '#ffffff',
    bgGradient: { from: '#fbc5d8', to: '#ecd5e3' },
    titleStyle: {
      fontFamily: 'Playfair Display',
      fontSize: 68,
      color: '#1e1e1e',
      badgeStyle: 'none',
      badgeColor: '#ffffff',
      badgeOpacity: 0.8,
      yPosition: 44
    },
    subtitleStyle: {
      fontFamily: 'Inter',
      fontSize: 22,
      color: '#4b5563',
      badgeStyle: 'none',
      badgeColor: '#000000',
      badgeOpacity: 0,
      yPosition: 53
    }
  },
  {
    id: 'cyberpunk-tech',
    name: 'Cyber Tech',
    description: 'Striking terminal-inspired monochrome aesthetics',
    title: 'SYSTEM_STARTUP //',
    subtitle: 'EPISODE_04.CONFIG',
    bgType: 'solid',
    bgColor: '#080810',
    bgGradient: { from: '#080810', to: '#080810' },
    titleStyle: {
      fontFamily: 'JetBrains Mono',
      fontSize: 48,
      color: '#10b981',
      badgeStyle: 'block',
      badgeColor: '#000000',
      badgeOpacity: 1,
      yPosition: 43
    },
    subtitleStyle: {
      fontFamily: 'JetBrains Mono',
      fontSize: 24,
      color: '#34d399',
      badgeStyle: 'none',
      badgeColor: '#000000',
      badgeOpacity: 0,
      yPosition: 51
    }
  },
  {
    id: 'modern-creator',
    name: 'Creator Glow',
    description: 'Smooth translucent glows to pop over your photos',
    title: '3 SECRET HACKS',
    subtitle: 'to scale your brand organically',
    bgType: 'gradient',
    bgColor: '#111827',
    bgGradient: { from: '#0d1b2a', to: '#1b4965' },
    titleStyle: {
      fontFamily: 'Outfit',
      fontSize: 64,
      color: '#ffffff',
      badgeStyle: 'pill',
      badgeColor: '#000000',
      badgeOpacity: 0.6,
      yPosition: 40
    },
    subtitleStyle: {
      fontFamily: 'Inter',
      fontSize: 30,
      color: '#fbbf24',
      badgeStyle: 'none',
      badgeColor: '#000000',
      badgeOpacity: 0,
      yPosition: 49
    }
  }
];

export function ReelCoverMaker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  
  // Fit strategy
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [solidColor, setSolidColor] = useState<string>('#1e1b4b');
  const [bgType, setBgType] = useState<'solid' | 'gradient'>('gradient');
  const [gradientPresetIdx, setGradientPresetIdx] = useState<number>(2);

  // Position & Zoom
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffsetStart = useRef({ x: 0, y: 0 });

  // Text overlays state
  const [titleText, setTitleText] = useState<TextOverlay>({
    text: 'HOW TO SCALE ORGANICALLY',
    fontFamily: 'Space Grotesk',
    fontSize: 54,
    color: '#ffffff',
    badgeStyle: 'block',
    badgeColor: '#6366f1',
    badgeOpacity: 1,
    yPosition: 45
  });

  const [subtitleText, setSubtitleText] = useState<TextOverlay>({
    text: 'Essential Instagram Guide',
    fontFamily: 'Inter',
    fontSize: 26,
    color: '#e2e8f0',
    badgeStyle: 'none',
    badgeColor: '#000000',
    badgeOpacity: 0.5,
    yPosition: 53
  });

  const [activeTextTab, setActiveTextTab] = useState<'title' | 'subtitle'>('title');

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setOffsetX(0);
        setOffsetY(0);
        setZoom(1);
      };
      img.src = url;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setOffsetX(0);
        setOffsetY(0);
        setZoom(1);
      };
      img.src = url;
    }
  };

  // Drag interaction
  const handleStart = (clientX: number, clientY: number) => {
    if (!canvasRef.current || !imageObj) return;
    isDragging.current = true;
    dragStart.current = { x: clientX, y: clientY };
    dragOffsetStart.current = { x: offsetX, y: offsetY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current || !canvasRef.current || !imageObj) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    
    const displayToSourceX = canvas.width / rect.width;
    const displayToSourceY = canvas.height / rect.height;
    
    setOffsetX(dragOffsetStart.current.x + dx * displayToSourceX);
    setOffsetY(dragOffsetStart.current.y + dy * displayToSourceY);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX, e.clientY);
    };

    const handleWindowMouseUp = () => {
      if (isDragging.current) handleEnd();
    };

    if (selectedImage) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [offsetX, offsetY, selectedImage, imageObj]);

  // Load Custom Font Styles dynamically if not loaded yet
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Outfit:wght@600;800&family=JetBrains+Mono:wght@600;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {}
    };
  }, []);

  // Primary Draw Engine
  const drawCanvas = (exportMode: boolean) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Instagram standard Reel cover dimensions: 1080x1920
    canvas.width = 1080;
    canvas.height = 1920;

    // 1. Draw Background (Solid or Gradient)
    if (bgType === 'solid') {
      ctx.fillStyle = solidColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const gradPreset = BG_GRADIENTS[gradientPresetIdx];
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, gradPreset.from);
      grad.addColorStop(1, gradPreset.to);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. Draw User Photo if selected
    if (imageObj) {
      let baseScale = 1;
      if (fitMode === 'cover') {
        baseScale = Math.max(canvas.width / imageObj.width, canvas.height / imageObj.height);
      } else {
        baseScale = Math.min(canvas.width / imageObj.width, canvas.height / imageObj.height);
      }

      const finalScale = baseScale * zoom;
      const defaultX = (canvas.width / 2) - (imageObj.width * finalScale) / 2;
      const defaultY = (canvas.height / 2) - (imageObj.height * finalScale) / 2;

      const drawX = defaultX + offsetX;
      const drawY = defaultY + offsetY;

      ctx.save();
      ctx.drawImage(imageObj, drawX, drawY, imageObj.width * finalScale, imageObj.height * finalScale);
      ctx.restore();
    }

    // 3. Ambient dark cover overlays for high legibility (optional soft vignette)
    const overlayGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    overlayGrad.addColorStop(0, 'rgba(0,0,0,0.3)');
    overlayGrad.addColorStop(0.2, 'rgba(0,0,0,0.0)');
    overlayGrad.addColorStop(0.8, 'rgba(0,0,0,0.0)');
    overlayGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = overlayGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Render Text Overlay items
    const drawTextItem = (item: TextOverlay) => {
      if (!item.text.trim()) return;

      ctx.save();
      const fontName = item.fontFamily;
      // Setup font sizing/weight
      ctx.font = `bold ${item.fontSize}px "${fontName}", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const x = canvas.width / 2;
      const y = (item.yPosition / 100) * canvas.height;

      const textWidth = ctx.measureText(item.text).width;
      const textHeight = item.fontSize;

      // Draw Badge backdrop
      if (item.badgeStyle !== 'none') {
        ctx.fillStyle = item.badgeColor;
        ctx.globalAlpha = item.badgeOpacity;

        const padX = item.fontSize * 0.6;
        const padY = item.fontSize * 0.4;
        const badgeW = textWidth + padX * 2;
        const badgeH = textHeight + padY * 2;
        const badgeX = x - badgeW / 2;
        const badgeY = y - badgeH / 2;

        if (item.badgeStyle === 'pill') {
          // Rounded rect
          const radius = badgeH / 2;
          ctx.beginPath();
          ctx.moveTo(badgeX + radius, badgeY);
          ctx.lineTo(badgeX + badgeW - radius, badgeY);
          ctx.quadraticCurveTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + radius);
          ctx.lineTo(badgeX + badgeW, badgeY + badgeH - radius);
          ctx.quadraticCurveTo(badgeX + badgeW, badgeY + badgeH, badgeX + badgeW - radius, badgeY + badgeH);
          ctx.lineTo(badgeX + radius, badgeY + badgeH);
          ctx.quadraticCurveTo(badgeX, badgeY + badgeH, badgeX, badgeY + badgeH - radius);
          ctx.lineTo(badgeX, badgeY + radius);
          ctx.quadraticCurveTo(badgeX, badgeY, badgeX + radius, badgeY);
          ctx.closePath();
          ctx.fill();
        } else if (item.badgeStyle === 'block') {
          ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
        } else if (item.badgeStyle === 'shadow') {
          // Translucent soft backing
          const gradient = ctx.createRadialGradient(x, y, 10, x, y, badgeW * 0.8);
          gradient.addColorStop(0, item.badgeColor);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, badgeW * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw text
      ctx.globalAlpha = 1;
      ctx.fillStyle = item.color;
      
      // Draw subtle text shadow if no backdrops are used to ensure excellent legibility
      if (item.badgeStyle === 'none') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      }

      ctx.fillText(item.text, x, y);
      ctx.restore();
    };

    // Draw subtitle then title
    drawTextItem(subtitleText);
    drawTextItem(titleText);

    // 5. Draw 1:1 Profile grid safe zone guide if enabled and not in export mode
    if (showSafeZone && !exportMode) {
      ctx.save();
      // Center 1:1 square box: width 1080, height 1080. Y ranges from (1920-1080)/2 = 420 to 1500.
      const boxSize = 1080;
      const startY = (1920 - 1080) / 2;

      // Draw semi-transparent dim fields outside the safe zone
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(0, 0, canvas.width, startY); // Top dim
      ctx.fillRect(0, startY + boxSize, canvas.width, startY); // Bottom dim

      // Draw safe zone bounding borders
      ctx.strokeStyle = '#f43f5e'; // Rose-500
      ctx.lineWidth = 6;
      ctx.setLineDash([15, 10]);
      ctx.strokeRect(3, startY, canvas.width - 6, boxSize);

      // Safe Zone Label
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('INSTAGRAM FEED GRID SAFE ZONE (1:1 CROP)', canvas.width / 2, startY + 50);
      ctx.fillText('Items inside this area will show on your profile grid', canvas.width / 2, startY + 90);

      ctx.restore();
    }
  };

  // Redraw canvas whenever states change
  useEffect(() => {
    drawCanvas(false);
  }, [
    imageObj,
    fitMode,
    solidColor,
    bgType,
    gradientPresetIdx,
    offsetX,
    offsetY,
    zoom,
    titleText,
    subtitleText,
    showSafeZone
  ]);

  const applyTemplate = (tpl: TemplatePreset) => {
    setBgType(tpl.bgType);
    if (tpl.bgType === 'solid') {
      setSolidColor(tpl.bgColor);
    } else {
      const idx = BG_GRADIENTS.findIndex(g => g.from.toLowerCase() === tpl.bgGradient.from.toLowerCase());
      if (idx !== -1) {
        setGradientPresetIdx(idx);
      }
    }
    setTitleText(prev => ({ ...prev, ...tpl.titleStyle, text: tpl.title }));
    setSubtitleText(prev => ({ ...prev, ...tpl.subtitleStyle, text: tpl.subtitle }));
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      // Draw canvas without Safe Zone for export
      drawCanvas(true);
      
      const imgDataUrl = canvasRef.current.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = imgDataUrl;
      link.download = `reel-cover-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore Safe Zone display after short timeout
      setTimeout(() => {
        drawCanvas(false);
      }, 100);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageObj(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white border border-stone-200 shadow-xs p-5 md:p-6 rounded-xl relative w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2">
            <Smartphone className="text-stone-700" size={14} />
            Instagram Reel Cover Maker
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">Design 9:16 covers with exact 1:1 grid safe zones and crisp typography.</p>
        </div>
        
        {/* Toggle Safe Zone button */}
        <button
          onClick={() => setShowSafeZone(!showSafeZone)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
            showSafeZone 
              ? 'bg-stone-900 text-white border-stone-900' 
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          {showSafeZone ? <Eye size={13} /> : <EyeOff size={13} />}
          {showSafeZone ? 'Hide Safe Zone' : 'Show 1:1 Safe Zone'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Control Column */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Section: Templates */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <Layout size={13} className="text-stone-700" />
              Presets & Layouts
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  className="flex flex-col items-start p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-semibold text-stone-800 mb-0.5">
                    {tpl.name}
                  </span>
                  <span className="text-[10px] text-stone-500 leading-normal line-clamp-2">
                    {tpl.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Photo / Media */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <ImageIcon size={13} className="text-stone-700" />
              Background Cover Photo
            </label>

            {!selectedImage ? (
              <div 
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-stone-300 rounded-lg bg-white p-5 text-center cursor-pointer hover:border-stone-400 transition-colors flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="p-2 bg-stone-100 rounded-md mb-2">
                  <Upload size={16} className="text-stone-700" />
                </div>
                <h3 className="text-xs font-semibold text-stone-800 mb-0.5">Upload cover photo</h3>
                <p className="text-[11px] text-stone-500">
                  Drop image here or browse (PNG, JPG, WebP)
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 border border-stone-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-100 rounded-md overflow-hidden border border-stone-200 shrink-0">
                    <img src={selectedImage} alt="Selected cover" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-800">Photo Loaded</p>
                    <p className="text-[11px] text-stone-500">Drag canvas preview to re-position</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-medium px-2.5 py-1.5 border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                  <button 
                    onClick={clearImage}
                    className="text-xs font-medium px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 rounded-md transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>
            )}

            {selectedImage && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Fit Strategy</label>
                  <div className="flex bg-stone-100 border border-stone-200 rounded-md p-0.5">
                    <button 
                      onClick={() => setFitMode('cover')}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${fitMode === 'cover' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      Fill Cover
                    </button>
                    <button 
                      onClick={() => setFitMode('contain')}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${fitMode === 'contain' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      Fit Bounds
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    <span>Scale Zoom ({zoom.toFixed(1)}x)</span>
                    <button 
                      onClick={() => { setOffsetX(0); setOffsetY(0); setZoom(1); }} 
                      className="text-[10px] text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-md border border-stone-200">
                    <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))} className="p-0.5 text-stone-500 hover:text-stone-800 cursor-pointer"><ZoomOut size={12} /></button>
                    <input
                      type="range"
                      min="0.5"
                      max="4.0"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="flex-1 accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <button onClick={() => setZoom(prev => Math.min(4.0, prev + 0.1))} className="p-0.5 text-stone-500 hover:text-stone-800 cursor-pointer"><ZoomIn size={12} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section: Color & Gradient Backdrop Options */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Palette size={13} className="text-stone-700" />
                Backdrop Canvas Styling
              </label>
              
              <div className="flex bg-stone-100 border border-stone-200 rounded-md p-0.5">
                <button 
                  onClick={() => setBgType('gradient')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${bgType === 'gradient' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Gradient
                </button>
                <button 
                  onClick={() => setBgType('solid')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${bgType === 'solid' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Solid Color
                </button>
              </div>
            </div>

            {bgType === 'gradient' ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BG_GRADIENTS.map((g, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGradientPresetIdx(idx)}
                    className={`h-10 rounded-lg border relative overflow-hidden transition-all cursor-pointer ${
                      gradientPresetIdx === idx 
                        ? 'border-stone-900 ring-2 ring-stone-400 shadow-2xs' 
                        : 'border-stone-200'
                    }`}
                    style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                    title={g.name}
                  >
                    {gradientPresetIdx === idx && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check size={14} className="text-white drop-shadow-md" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {['#111827', '#080810', '#1e1b4b', '#4c1d95', '#31102f', '#064e3b', '#1c1917', '#ffffff'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setSolidColor(c)}
                      className={`w-7 h-7 rounded-md border cursor-pointer ${solidColor === c ? 'border-stone-900 ring-2 ring-stone-400 shadow-2xs' : 'border-stone-200'} transition-all`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-stone-200 rounded-md p-1.5 bg-white shrink-0">
                  <input 
                    type="color" 
                    value={solidColor}
                    onChange={(e) => setSolidColor(e.target.value)}
                    className="w-6 h-6 rounded border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                  />
                  <span className="text-[10px] font-mono font-medium text-stone-600 uppercase">{solidColor}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section: Typography / Text Overlays */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <Type size={13} className="text-stone-700" />
                Text Overlay Editor
              </label>

              <div className="flex bg-stone-100 border border-stone-200 rounded-md p-0.5">
                <button 
                  onClick={() => setActiveTextTab('title')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${activeTextTab === 'title' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Heading Text
                </button>
                <button 
                  onClick={() => setActiveTextTab('subtitle')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${activeTextTab === 'subtitle' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  Subheading
                </button>
              </div>
            </div>

            {/* Editing Tab context */}
            {activeTextTab === 'title' ? (
              <div className="space-y-3">
                {/* Input Text */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Heading Input</label>
                  <input
                    type="text"
                    value={titleText.text}
                    onChange={(e) => setTitleText(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter heading..."
                    className="w-full bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                {/* Font Styling controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="title-font-family-select" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Font Family</label>
                    <select
                      id="title-font-family-select"
                      aria-label="Heading Font Family"
                      value={titleText.fontFamily}
                      onChange={(e) => setTitleText(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                      className="w-full bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 outline-none focus:border-stone-900 transition-colors cursor-pointer"
                    >
                      {FONT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Text Color</label>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex gap-1">
                        {['#ffffff', '#ff7e5f', '#fbbf24', '#34d399', '#6366f1', '#000000'].map(c => (
                          <button 
                            key={c}
                            onClick={() => setTitleText(prev => ({ ...prev, color: c }))}
                            className={`w-6 h-6 rounded border cursor-pointer ${titleText.color === c ? 'border-stone-900 ring-2 ring-stone-300' : 'border-stone-200'} transition-all`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <input 
                        type="color" 
                        value={titleText.color}
                        onChange={(e) => setTitleText(prev => ({ ...prev, color: e.target.value }))}
                        className="w-6 h-6 rounded border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Sizing & Position sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 border border-stone-200 rounded-lg">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Font Size: {titleText.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={titleText.fontSize}
                      onChange={(e) => setTitleText(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Vertical Position: {titleText.yPosition}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={titleText.yPosition}
                      onChange={(e) => setTitleText(prev => ({ ...prev, yPosition: parseInt(e.target.value) }))}
                      className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Badge Backdrop Style */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Heading Backdrop Badge
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'pill', label: 'Pill' },
                      { id: 'block', label: 'Block' },
                      { id: 'shadow', label: 'Shadow' },
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setTitleText(prev => ({ ...prev, badgeStyle: st.id as any }))}
                        className={`py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          titleText.badgeStyle === st.id 
                            ? 'bg-stone-900 border-stone-900 text-white' 
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {titleText.badgeStyle !== 'none' && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-1.5 p-3 bg-white border border-stone-200 rounded-lg">
                      <div className="flex-1 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-stone-500 uppercase shrink-0">Color:</label>
                        <div className="flex gap-1 items-center flex-1">
                          {['#000000', '#6366f1', '#f43f5e', '#10b981', '#ffffff'].map(bc => (
                            <button
                              key={bc}
                              onClick={() => setTitleText(prev => ({ ...prev, badgeColor: bc }))}
                              className={`w-5 h-5 rounded border cursor-pointer ${titleText.badgeColor === bc ? 'border-stone-900' : 'border-stone-200'}`}
                              style={{ backgroundColor: bc }}
                            />
                          ))}
                          <input 
                            type="color" 
                            value={titleText.badgeColor}
                            onChange={(e) => setTitleText(prev => ({ ...prev, badgeColor: e.target.value }))}
                            className="w-5 h-5 rounded border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <label className="block text-[10px] font-medium text-stone-500 uppercase">
                          Opacity: {Math.round(titleText.badgeOpacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={titleText.badgeOpacity}
                          onChange={(e) => setTitleText(prev => ({ ...prev, badgeOpacity: parseFloat(e.target.value) }))}
                          className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Input Text */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Subheading Input</label>
                  <input
                    type="text"
                    value={subtitleText.text}
                    onChange={(e) => setSubtitleText(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter subheading..."
                    className="w-full bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                {/* Font Styling controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="subtitle-font-family-select" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Font Family</label>
                    <select
                      id="subtitle-font-family-select"
                      aria-label="Subtitle Font Family"
                      value={subtitleText.fontFamily}
                      onChange={(e) => setSubtitleText(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                      className="w-full bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 outline-none focus:border-stone-900 transition-colors cursor-pointer"
                    >
                      {FONT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Text Color</label>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex gap-1">
                        {['#ffffff', '#ff7e5f', '#fbbf24', '#34d399', '#6366f1', '#000000'].map(c => (
                          <button 
                            key={c}
                            onClick={() => setSubtitleText(prev => ({ ...prev, color: c }))}
                            className={`w-6 h-6 rounded border cursor-pointer ${subtitleText.color === c ? 'border-stone-900 ring-2 ring-stone-300' : 'border-stone-200'} transition-all`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <input 
                        type="color" 
                        value={subtitleText.color}
                        onChange={(e) => setSubtitleText(prev => ({ ...prev, color: e.target.value }))}
                        className="w-6 h-6 rounded border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Sizing & Position sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 border border-stone-200 rounded-lg">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Font Size: {subtitleText.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="14"
                      max="70"
                      value={subtitleText.fontSize}
                      onChange={(e) => setSubtitleText(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Vertical Position: {subtitleText.yPosition}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={subtitleText.yPosition}
                      onChange={(e) => setSubtitleText(prev => ({ ...prev, yPosition: parseInt(e.target.value) }))}
                      className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Badge Backdrop Style */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Subheading Backdrop Badge
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'pill', label: 'Pill' },
                      { id: 'block', label: 'Block' },
                      { id: 'shadow', label: 'Shadow' },
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setSubtitleText(prev => ({ ...prev, badgeStyle: st.id as any }))}
                        className={`py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          subtitleText.badgeStyle === st.id 
                            ? 'bg-stone-900 border-stone-900 text-white' 
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {subtitleText.badgeStyle !== 'none' && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-1.5 p-3 bg-white border border-stone-200 rounded-lg">
                      <div className="flex-1 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-stone-500 uppercase shrink-0">Color:</label>
                        <div className="flex gap-1 items-center flex-1">
                          {['#000000', '#6366f1', '#f43f5e', '#10b981', '#ffffff'].map(bc => (
                            <button
                              key={bc}
                              onClick={() => setSubtitleText(prev => ({ ...prev, badgeColor: bc }))}
                              className={`w-5 h-5 rounded border cursor-pointer ${subtitleText.badgeColor === bc ? 'border-stone-900' : 'border-stone-200'}`}
                              style={{ backgroundColor: bc }}
                            />
                          ))}
                          <input 
                            type="color" 
                            value={subtitleText.badgeColor}
                            onChange={(e) => setSubtitleText(prev => ({ ...prev, badgeColor: e.target.value }))}
                            className="w-5 h-5 rounded border-0 p-0 cursor-pointer overflow-hidden bg-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <label className="block text-[10px] font-medium text-stone-500 uppercase">
                          Opacity: {Math.round(subtitleText.badgeOpacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={subtitleText.badgeOpacity}
                          onChange={(e) => setSubtitleText(prev => ({ ...prev, badgeOpacity: parseFloat(e.target.value) }))}
                          className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Download and start over controls */}
          <div className="pt-2 flex gap-3">
            <button 
              onClick={handleDownload}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-4 rounded-lg font-semibold text-xs flex justify-center items-center gap-2 transition-colors cursor-pointer"
            >
              <Download size={13} />
              <span>Export Cover (9:16)</span>
            </button>
            <button 
              onClick={() => {
                clearImage();
                applyTemplate(TEMPLATES[0]);
              }}
              className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 px-4 py-2.5 rounded-lg transition-colors font-medium text-xs flex items-center justify-center cursor-pointer"
              title="Reset All Controls"
            >
              <RefreshCw size={13} className="text-stone-600" />
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col items-center select-none">
            
            <p className="text-[10px] font-semibold text-stone-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Move size={11} className="text-stone-600" />
              Cover Canvas Preview (9:16)
            </p>

            <div className="relative w-full flex justify-center items-center overflow-hidden">
              <canvas 
                ref={canvasRef} 
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                className="max-w-full max-h-[520px] object-contain rounded-lg border border-stone-200 bg-black cursor-move touch-none select-none"
                style={{ aspectRatio: '9/16' }}
              />
            </div>

            <p className="text-[10px] text-stone-400 mt-2 text-center">
              Drag image to position inside safe zone
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

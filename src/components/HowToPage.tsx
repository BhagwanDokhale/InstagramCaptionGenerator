import React from 'react';
import { 
  Sparkles, Image as ImageIcon, Type, LayoutGrid, Compass, Hash, Video, 
  Smartphone, Palette, CheckCircle2, ArrowRight, Lightbulb, Zap, HelpCircle, 
  Layers, Crop, BookOpen, ExternalLink, Sliders, MessageCircle
} from 'lucide-react';
import { PageType } from '../types';
import { TabType, navigateTo, getHref } from '../lib/navigation';
import { SEO } from './SEO';

interface HowToPageProps {
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
}

export function HowToPage({ setActivePage, setActiveTab }: HowToPageProps) {
  const handleToolClick = (e: React.MouseEvent, tab?: TabType, isPage?: boolean, page?: PageType) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (isPage && page) {
      if (setActivePage) setActivePage(page);
      navigateTo(getHref(page));
    } else if (tab) {
      if (setActivePage) setActivePage('home');
      if (setActiveTab) setActiveTab(tab);
      navigateTo(getHref('home', tab));
    }
  };

  const handlePageClick = (e: React.MouseEvent, page: PageType) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (setActivePage) setActivePage(page);
    navigateTo(getHref(page));
  };

  const toolGuides = [
    {
      id: "captions",
      tab: "captions" as TabType,
      href: "/tools/caption-generator",
      icon: <Type className="text-indigo-600 w-6 h-6" />,
      title: "Instagram Caption Generator",
      shortTitle: "Caption",
      tagline: "Write scroll-stopping hooks, engaging stories & strong CTAs for every post.",
      whyYouNeedIt: "A good photo captures attention, while a descriptive caption can provide more context and encourage discussion. Our AI Caption Generator helps you draft hooks, story structures, and clear calls-to-action.",
      steps: [
        "Choose your desired tone of voice (e.g., Casual, Storytelling, Professional, Witty, Aesthetic).",
        "Describe what your photo or video is about in a brief sentence.",
        "Toggle whether you want emojis or automated hashtag inclusion.",
        "Click 'Generate Captions' and review multiple tailored variations to copy with one click."
      ],
      proTip: "Use the 'Storytelling' tone for behind-the-scenes posts to build deeper connection, and pair it with a direct question in the final sentence to invite responses from your audience.",
      complementaryTools: [
        { name: "Instagram Comment Generator", tab: "comments" as TabType, href: "/tools/comment-generator" },
        { name: "Instagram Hashtag Generator", tab: "hashtags" as TabType, href: "/tools/hashtag-generator" },
        { name: "Instagram ALT Text Generator", tab: "alttext" as TabType, href: "/tools/alt-text-generator" }
      ]
    },
    {
      id: "comments",
      tab: "comments" as TabType,
      href: "/tools/comment-generator",
      icon: <MessageCircle className="text-pink-500 w-6 h-6" />,
      title: "Instagram Comment Generator",
      shortTitle: "Comment",
      tagline: "Generate authentic, witty, supportive, and conversation-starting comments.",
      whyYouNeedIt: "Leaving thoughtful comments on posts in your niche can help you participate in community conversations and connect with other creators. Our Instagram Comment Generator creates natural, polite comment suggestions tailored to any post topic, caption, or uploaded photo.",
      steps: [
        "Enter the post caption, describe the post theme, or upload a photo/screenshot of the post.",
        "Select your desired comment vibe (Hype & Supportive, Funny & Witty, Complimentary, Question Starter, Professional, or Snappy).",
        "Choose your relationship to the author (Close Friend, Creator, Colleague, Brand, Fan).",
        "Click 'Generate Instagram Comments' to receive 6 distinct, ready-to-copy comment variations."
      ],
      proTip: "Use 'Question Starter' vibe when commenting on creator posts—asking a thoughtful question makes it easier to start a conversation.",
      complementaryTools: [
        { name: "Instagram Caption Generator", tab: "captions" as TabType, href: "/tools/caption-generator" },
        { name: "Instagram Hashtag Generator", tab: "hashtags" as TabType, href: "/tools/hashtag-generator" }
      ]
    },
    {
      id: "hashtags",
      tab: "hashtags" as TabType,
      href: "/tools/hashtag-generator",
      icon: <Hash className="text-rose-500 w-6 h-6" />,
      title: "Instagram Hashtag Generator",
      shortTitle: "Hashtag",
      tagline: "Discover relevant hashtag ideas based on your post topic and niche.",
      whyYouNeedIt: "Using overly broad hashtags can make it harder for interested users to find specific content. Our Instagram Hashtag Generator suggests relevant hashtag ideas organized around your topic and niche.",
      steps: [
        "Enter your primary topic, industry keyword, or caption theme.",
        "Select your hashtag density and niche focus level.",
        "Generate a set of 15–30 relevant hashtags categorized by estimated topic volume.",
        "Click to copy all hashtags or select specific ones to append to your post."
      ],
      proTip: "Mix specific niche community hashtags with broader topic hashtags for balanced post categorization.",
      complementaryTools: [
        { name: "Instagram Caption Generator", tab: "captions" as TabType, href: "/tools/caption-generator" },
        { name: "Instagram Bio Generator", tab: "bios" as TabType, href: "/tools/bio-generator" }
      ]
    },
    {
      id: "alttext",
      tab: "alttext" as TabType,
      href: "/tools/alt-text-generator",
      icon: <BookOpen className="text-teal-600 w-6 h-6" />,
      title: "Instagram ALT Text Generator",
      shortTitle: "ALT Text",
      tagline: "Create clear, descriptive image alt text to improve accessibility and provide more context about your images.",
      whyYouNeedIt: "Instagram uses automated vision models and alt text to index images in search results and assist screen-reader users. Well-written alt text improves accessibility for people using screen readers and provides additional context about an image.",
      steps: [
        "Upload your post image or enter a concise description of key visual elements.",
        "Select your main target keyword or subject focus.",
        "Generate objective, descriptive alt text rich in relevant terms.",
        "Copy and paste into Instagram's 'Advanced Settings' → 'Write Alt Text' before publishing."
      ],
      proTip: "Keep alt text factual and descriptive of key visual elements rather than stuffing it with hashtags or promotional links.",
      complementaryTools: [
        { name: "Instagram Caption Generator", tab: "captions" as TabType, href: "/tools/caption-generator" },
        { name: "Instagram Hashtag Generator", tab: "hashtags" as TabType, href: "/tools/hashtag-generator" }
      ]
    },
    {
      id: "bios",
      tab: "bios" as TabType,
      href: "/tools/bio-generator",
      icon: <Sparkles className="text-pink-500 w-6 h-6" />,
      title: "Instagram Bio Generator",
      shortTitle: "Bio",
      tagline: "Create clear and focused 150-character bio suggestions.",
      whyYouNeedIt: "Your Instagram bio is your profile introduction. You have 150 characters to clearly communicate who you are, what value you provide, and how visitors can connect with you.",
      steps: [
        "Input your name, business keyword, and key credentials or offerings.",
        "Select a vibe (e.g., Professional, Creator, Minimalist, Funny, Aesthetic).",
        "Generate punchy bio options formatted with line breaks, vertical dividers, and emojis.",
        "Copy your favorite output directly into your Instagram profile settings."
      ],
      proTip: "Always include a clear call-to-action (CTA) pointing to your link-in-bio (e.g., 👇 Download free guide below).",
      complementaryTools: [
        { name: "Instagram Username Generator", tab: "usernames" as TabType, href: "/tools/username-generator" },
        { name: "Instagram Brand Kit Generator", tab: "brandkit" as TabType, href: "/tools/brand-kit-generator" }
      ]
    },
    {
      id: "usernames",
      tab: "usernames" as TabType,
      href: "/tools/username-generator",
      icon: <Zap className="text-amber-600 w-6 h-6" />,
      title: "Instagram Username Generator",
      shortTitle: "Username",
      tagline: "Find catchy, search-friendly Instagram handles for personal or business accounts.",
      whyYouNeedIt: "Finding a memorable username without excessive numbers or underscores can take time. Our generator blends your target keyword with creative prefixes, suffixes, and aesthetic styling to give you ideas.",
      steps: [
        "Enter your primary brand name, niche, or personal name.",
        "Select a style category (e.g., Minimal, Professional, Cute, Trendy, Creative).",
        "Browse organized username suggestions designed for your niche and style preferences.",
        "Click to copy your preferred handle and check availability directly on Instagram before using it."
      ],
      proTip: "Including a descriptive keyword in your username or display name (e.g., @jane.design) can help users understand what your account is about when searching.",
      complementaryTools: [
        { name: "Instagram Bio Generator", tab: "bios" as TabType, href: "/tools/bio-generator" },
        { name: "Instagram Brand Kit Generator", tab: "brandkit" as TabType, href: "/tools/brand-kit-generator" }
      ]
    },
    {
      id: "brandkit",
      tab: "brandkit" as TabType,
      href: "/tools/brand-kit-generator",
      icon: <Palette className="text-amber-500 w-6 h-6" />,
      title: "Instagram Brand Kit Generator",
      shortTitle: "Brand Kit",
      tagline: "Build a cohesive visual identity, font pairing & brand voice in seconds.",
      whyYouNeedIt: "In a crowded social feed, visual consistency helps make your profile recognizable and visually cohesive. Instead of spending hours matching hex codes or guessing font hierarchy, our Brand Kit Generator helps craft a harmonious brand system tailored to your niche.",
      steps: [
        "Enter your Brand or Account Name and describe your target audience or niche.",
        "Select your visual aesthetic vibe (e.g., Minimalist Luxury, Warm Editorial, Cyberpunk, Bold Creative).",
        "Click 'Generate AI Brand Kit' to receive matching primary, secondary, and accent color hex codes.",
        "Get instant Google Font pairings, brand voice adjectives, compelling taglines, and formatted bios ready to copy."
      ],
      proTip: "Copy your brand hex codes and use them consistently across your Reel covers and Instagram Stories to establish consistent brand recognition.",
      complementaryTools: [
        { name: "Instagram Bio Generator", tab: "bios" as TabType, href: "/tools/bio-generator" },
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" }
      ]
    },
    {
      id: "resizer",
      tab: "resizer" as TabType,
      href: "/tools/photo-resizer",
      icon: <Crop className="text-violet-500 w-6 h-6" />,
      title: "Instagram Photo Resizer",
      shortTitle: "Photo Resizer",
      tagline: "Crop, frame, and resize photos to exact Instagram ratios without quality loss.",
      whyYouNeedIt: "Instagram automatically crops images that don't match standard aspect ratios, often cutting off heads or key subjects. Our resizer lets you precisely position, scale, and frame your photos before publishing.",
      steps: [
        "Upload any JPG, PNG, or WebP photo from your computer or phone.",
        "Select your target aspect ratio: 1:1 Square, 4:5 Portrait (Recommended for Feed), 9:16 Story/Reel, or 1.91:1 Landscape.",
        "Drag your image on the interactive canvas and use the zoom slider to fine-tune cropping.",
        "Download your high-resolution optimized photo ready for instant upload."
      ],
      proTip: "Always use 4:5 Portrait ratio (1080x1350 px) for regular feed posts — it takes up maximum screen real estate on mobile devices!",
      complementaryTools: [
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" },
        { name: "Instagram Grid Maker", tab: "grid" as TabType, href: "/tools/grid-maker" }
      ]
    },
    {
      id: "cover",
      tab: "cover" as TabType,
      href: "/tools/reel-cover-maker",
      icon: <Smartphone className="text-purple-600 w-6 h-6" />,
      title: "Instagram Reel Cover Maker",
      shortTitle: "Reel Cover Maker",
      tagline: "Design 9:16 vertical covers with 1:1 safe-zone alignment.",
      whyYouNeedIt: "Reels with cut-off text or poorly aligned elements can make your feed look cluttered. Our canvas-based Reel Cover Maker lets you design clean 9:16 covers while showing you the exact 1:1 square crop that appears on your profile grid.",
      steps: [
        "Choose a vibrant background gradient, solid color, or upload your own custom photo.",
        "Add crisp title text and pick from modern Google Fonts (Space Grotesk, Playfair Display, etc.).",
        "Customize text badge backgrounds (Pill, Block, Minimalist) and accent colors.",
        "Use interactive mouse or touch dragging on the canvas to reposition your photo or text.",
        "Toggle the '1:1 Safe-Zone Overlay' to ensure your text remains clearly visible in your main feed grid."
      ],
      proTip: "Keep title text short (3 to 5 words max) and centered within the middle 1:1 safe zone box so it looks flawless on both the Reels tab and profile grid.",
      complementaryTools: [
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" },
        { name: "Instagram Photo Resizer", tab: "resizer" as TabType, href: "/tools/photo-resizer" }
      ]
    },
    {
      id: "grid",
      tab: "grid" as TabType,
      href: "/tools/grid-maker",
      icon: <LayoutGrid className="text-emerald-500 w-6 h-6" />,
      title: "Instagram Grid Maker",
      shortTitle: "Grid Maker",
      tagline: "Slice high-res photos into seamless 3x1, 3x2, or 3x3 multi-post grid layouts.",
      whyYouNeedIt: "Large split-image grids create a dramatic visual impact when visitors view your profile grid. Our Grid Maker precisely cuts high-res images into perfectly aligned tiles with numbered posting order instructions.",
      steps: [
        "Upload a high-resolution photo or artwork.",
        "Select your grid layout configuration (3x1 Banner, 3x2 Grid, or 3x3 Mega Grid).",
        "Adjust framing and click 'Split Image' to process tiles.",
        "Download all numbered tiles in a single ZIP or individual files, and post in reverse sequential order."
      ],
      proTip: "Always post tiles starting from the bottom-right corner (#1) so your full grid image reconstructs properly on your profile page.",
      complementaryTools: [
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" },
        { name: "Instagram Photo Resizer", tab: "resizer" as TabType, href: "/tools/photo-resizer" }
      ]
    },
    {
      id: "planner",
      tab: "planner" as TabType,
      href: "/tools/feed-planner",
      icon: <Compass className="text-amber-500 w-6 h-6" />,
      title: "Instagram Feed Planner",
      shortTitle: "Feed Planner",
      tagline: "Visualize and curate your 3-column feed grid aesthetics before posting.",
      whyYouNeedIt: "Planning your visual flow in advance helps ensure that colors, photo styles, and graphics look balanced. Our interactive feed planner lets you drag and reorder upcoming photos and Reels covers to organize your grid layout.",
      steps: [
        "Upload multiple planned photos, graphics, or Reel covers.",
        "Drag and drop thumbnails around the 3-column simulated profile layout.",
        "Test color flow, photo density balance (e.g., alternating close-ups and quotes), and visual rhythm.",
        "Save your feed preview or screenshot your layout for easy content scheduling."
      ],
      proTip: "Alternate between dark and light photos or busy patterns and minimal graphics to maintain balanced visual contrast on your grid.",
      complementaryTools: [
        { name: "Instagram Grid Maker", tab: "grid" as TabType, href: "/tools/grid-maker" },
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" }
      ]
    },
    {
      id: "downloader",
      tab: "downloader" as TabType,
      href: "/tools/reels-downloader",
      icon: <Video className="text-rose-500 w-6 h-6" />,
      title: "Instagram Reels Downloader",
      shortTitle: "Reels Downloader",
      tagline: "Download available media from supported public Reels, videos, and photos without requiring an Instagram login.",
      whyYouNeedIt: "Whether you're building a content mood board, archiving your own past Reels, or studying video formats for inspiration, our downloader lets you retrieve available public media directly to your device.",
      steps: [
        "Copy the URL link of any public Instagram Reel, Video, or Carousel Post.",
        "Paste the link into the URL input field and click 'Fetch Media'.",
        "Preview video or image thumbnails and click 'Download' to save directly to camera roll or desktop."
      ],
      proTip: "Use downloaded video references to analyze pacing, editing cuts, and caption structures when planning your own original content.",
      complementaryTools: [
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" },
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" }
      ]
    },
    {
      id: "workspace",
      tab: "captions" as TabType,
      isPage: true,
      page: "workspace" as PageType,
      href: "/workspace",
      icon: <Layers className="text-indigo-600 w-6 h-6" />,
      title: "All-in-One Creator Workspace",
      shortTitle: "Workspace",
      tagline: "Organize, draft, design, preview, and save your Instagram campaigns in one unified dashboard.",
      whyYouNeedIt: "Instead of jumping between separate tools and losing your creative momentum, the Creator Workspace brings text generators, visual tools, hashtags, and a live phone simulator into one cohesive creation studio.",
      steps: [
        "Open your workspace and select or create your current campaign.",
        "Draft captions, generate hashtags, and write descriptive alt text side-by-side.",
        "Upload and preview visual assets directly in the real-time interactive phone simulator.",
        "Save drafts locally and copy or export all components when ready to publish."
      ],
      proTip: "Use the live phone preview in Workspace to test your caption line breaks and Reel covers together before scheduling your content.",
      complementaryTools: [
        { name: "Instagram Caption Generator", tab: "captions" as TabType, href: "/tools/caption-generator" },
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-10 md:py-16 space-y-16">
      <SEO 
        title="How to Use GrowthCaption - Step-by-Step AI Guide"
        description="Comprehensive step-by-step guides on using AI caption generators, hashtag tools, bio creators, and Reels downloaders."
        url="https://growthcaption.com/how-to-use"
        schemaMarkup={{
          "@type": "HowTo",
          "name": "How to Use GrowthCaption - Step-by-Step AI Guide",
          "description": "Step-by-step guides on using caption generators, hashtag tools, brand kit creation, Reel cover design, photo resizing, and grid planning.",
          "step": toolGuides.map((guide, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": guide.title,
            "itemListElement": guide.steps.map((s, stepIdx) => ({
              "@type": "HowToDirection",
              "position": stepIdx + 1,
              "text": s
            }))
          }))
        }}
      />

      {/* Hero Header */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-widest shadow-xs">
          <Sparkles size={14} className="animate-pulse" />
          <span>Complete Creator Guidebook</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-stone-900 leading-tight">
          How to Create Content with <span className="bg-gradient-to-r from-indigo-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">GrowthCaption</span>
        </h1>
        <p className="text-stone-600 font-medium text-base md:text-lg leading-relaxed">
          Welcome! Whether you're a solo creator, small business owner, or agency manager, creating standout social media content doesn't have to take hours. Here is your step-by-step guide to using all 12 GrowthCaption tools to streamline your daily workflow.
        </p>
      </header>

      {/* Quick Jump Bar */}
      <nav aria-label="Tool Navigation" className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Layers size={14} className="text-indigo-600" /> Quick Tool Navigation
          </span>
          <span className="text-xs font-semibold text-stone-700">13 AI & Visual Tools</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {toolGuides.map((t) => (
            <a
              key={t.id}
              href={t.href}
              onClick={(e) => handleToolClick(e, t.tab, t.isPage, t.page)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-100/80 hover:bg-indigo-50 hover:text-indigo-600 text-stone-700 transition-all border border-stone-200/60"
            >
              <span>{t.shortTitle}</span>
              <ArrowRight size={12} className="opacity-60" />
            </a>
          ))}
        </div>
      </nav>

      {/* 5-Minute Creator Workflow Showcase */}
      <section className="bg-gradient-to-br from-indigo-900 via-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden space-y-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">
              <Zap size={14} /> The 5-Minute Daily Content Routine
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Streamline Your Daily Content Workflow</h2>
          </div>
          <a 
            href="/tools/caption-generator"
            onClick={(e) => handleToolClick(e, 'captions')}
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg"
          >
            Start Workflow Now <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10 pt-2">
          {[
            { num: "01", title: "Brand Kit", desc: "Define colors & voice", tab: "brandkit" as TabType, href: "/tools/brand-kit-generator" },
            { num: "02", title: "Caption & Tags", desc: "Generate hooks & hashtags", tab: "captions" as TabType, href: "/tools/caption-generator" },
            { num: "03", title: "Resize / Cover", desc: "Format visuals for 4:5 or 9:16", tab: "resizer" as TabType, href: "/tools/photo-resizer" },
            { num: "04", title: "Feed Planner", desc: "Preview grid aesthetic", tab: "planner" as TabType, href: "/tools/feed-planner" },
            { num: "05", title: "Alt Text", desc: "Add descriptive accessibility", tab: "alttext" as TabType, href: "/tools/alt-text-generator" }
          ].map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              onClick={(e) => handleToolClick(e, s.tab)}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all flex flex-col justify-between"
            >
              <div className="text-indigo-400 font-extrabold text-xs tracking-wider mb-2">{s.num}</div>
              <div className="font-bold text-sm text-white mb-1">{s.title}</div>
              <div className="text-xs text-stone-300 leading-snug">{s.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Detailed Tool-by-Tool Guides */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Detailed Step-by-Step Tool Tutorials
          </h2>
          <p className="text-stone-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
            Click on any tool below to launch it directly, or read our step-by-step tutorials and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {toolGuides.map((guide) => (
            <article 
              key={guide.id} 
              id={guide.id}
              className="bg-white rounded-3xl p-6 md:p-10 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8 relative overflow-hidden transition-all hover:border-stone-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 shrink-0">
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-1">{guide.title}</h3>
                    <p className="text-stone-500 font-medium text-xs md:text-sm">{guide.tagline}</p>
                  </div>
                </div>

                <a
                  href={guide.href}
                  onClick={(e) => handleToolClick(e, guide.tab, guide.isPage, guide.page)}
                  className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shrink-0 shadow-xs group"
                >
                  <span>Launch {guide.shortTitle}</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Why You Need It */}
              <div className="bg-stone-50/70 p-5 rounded-2xl border border-stone-100/80 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                  <Lightbulb size={14} className="text-amber-500" />
                  <span>Why Creators Use This Tool</span>
                </div>
                <p className="text-stone-700 font-medium text-xs md:text-sm leading-relaxed">
                  {guide.whyYouNeedIt}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Step-by-Step Instructions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200/60 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-stone-700 text-xs font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip & Complementary Tools Footer */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                <div className="md:col-span-7 bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Pro Creator Tip</span>
                    <p className="text-xs text-amber-800 font-medium leading-relaxed">{guide.proTip}</p>
                  </div>
                </div>

                <div className="md:col-span-5 bg-stone-50 border border-stone-200/60 rounded-2xl p-4 space-y-2 flex flex-col justify-center">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Recommended Pairings</span>
                  <div className="flex flex-wrap gap-2">
                    {guide.complementaryTools.map((comp, i) => (
                      <a
                        key={i}
                        href={comp.href}
                        onClick={(e) => handleToolClick(e, comp.tab)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-2xs hover:border-indigo-300 transition-all inline-flex items-center gap-1"
                      >
                        <span>{comp.name}</span>
                        <ArrowRight size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interlinked Related Pages & Resources */}
      <section className="bg-white rounded-3xl p-8 md:p-10 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900">Explore More Helpful Resources</h2>
          <p className="text-stone-500 font-medium text-xs md:text-sm">
            Deepen your Instagram knowledge with our articles, answers to common questions, and creator guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <a
            href="/blog"
            onClick={(e) => handlePageClick(e, 'blog')}
            className="p-6 bg-stone-50/80 hover:bg-indigo-50/50 border border-stone-200/80 hover:border-indigo-200 rounded-2xl transition-all space-y-3 group"
          >
            <div className="p-2.5 bg-white rounded-xl border border-stone-200/80 w-fit text-indigo-600 shadow-2xs">
              <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm group-hover:text-indigo-600 transition-colors">Blog & Guide Articles</h3>
            <p className="text-stone-500 text-xs leading-relaxed">Read practical guide articles on Instagram formatting, caption hooks, and content creation strategies.</p>
            <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">Read Blog Articles <ArrowRight size={12} /></span>
          </a>

          <a
            href="/faq"
            onClick={(e) => handlePageClick(e, 'faq')}
            className="p-6 bg-stone-50/80 hover:bg-indigo-50/50 border border-stone-200/80 hover:border-indigo-200 rounded-2xl transition-all space-y-3 group"
          >
            <div className="p-2.5 bg-white rounded-xl border border-stone-200/80 w-fit text-pink-600 shadow-2xs">
              <HelpCircle size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm group-hover:text-pink-600 transition-colors">Frequently Asked Questions</h3>
            <p className="text-stone-500 text-xs leading-relaxed">Find quick answers about account safety, privacy guarantees, commercial usage, and tool limits.</p>
            <span className="text-xs font-bold text-pink-600 inline-flex items-center gap-1">View All FAQs <ArrowRight size={12} /></span>
          </a>

          <a
            href="/sitemap"
            onClick={(e) => handlePageClick(e, 'sitemap')}
            className="p-6 bg-stone-50/80 hover:bg-indigo-50/50 border border-stone-200/80 hover:border-indigo-200 rounded-2xl transition-all space-y-3 group"
          >
            <div className="p-2.5 bg-white rounded-xl border border-stone-200/80 w-fit text-emerald-600 shadow-2xs">
              <Sliders size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm group-hover:text-emerald-600 transition-colors">Complete Tool Index</h3>
            <p className="text-stone-500 text-xs leading-relaxed">Browse the full directory of GrowthCaption tools, legal policies, and contact channels.</p>
            <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">View Tool Index <ArrowRight size={12} /></span>
          </a>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-indigo-950 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight relative z-10">
          Ready to Elevate Your Social Media Presence?
        </h2>
        <p className="text-stone-300 font-medium text-xs md:text-sm max-w-xl mx-auto relative z-10 leading-relaxed">
          No credit card, account registration, or downloads required. Start generating caption ideas, aesthetic bios, and formatted Reel covers right now.
        </p>
        <div className="pt-2 relative z-10">
          <a 
            href="/tools/caption-generator"
            onClick={(e) => handleToolClick(e, 'captions')}
            className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-2xl transition-all shadow-lg hover:scale-105"
          >
            <span>Launch Free Caption Generator</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

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
  const handleToolClick = (e: React.MouseEvent, tab: TabType) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (setActivePage) setActivePage('home');
    if (setActiveTab) setActiveTab(tab);
    navigateTo(getHref('home', tab));
  };

  const handlePageClick = (e: React.MouseEvent, page: PageType) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (setActivePage) setActivePage(page);
    navigateTo(getHref(page));
  };

  const toolGuides = [
    {
      id: "brandkit",
      tab: "brandkit" as TabType,
      href: "/tools/brand-kit-generator",
      icon: <Palette className="text-fuchsia-600 w-4 h-4" />,
      badgeBg: "bg-fuchsia-50 border-fuchsia-200/80",
      title: "Instagram Brand Kit Generator",
      shortTitle: "Brand Kit",
      tagline: "Build a cohesive visual identity, font pairing, and brand voice in seconds.",
      whyYouNeedIt: "In a crowded social feed, visual consistency helps make your profile recognizable and cohesive. Instead of spending hours matching hex codes or guessing font hierarchy, our Brand Kit Generator crafts a harmonious palette and typography system tailored to your niche.",
      steps: [
        "Enter your Brand or Account Name and describe your target audience or niche.",
        "Select your visual aesthetic vibe (e.g., Minimalist Luxury, Warm Editorial, Cyberpunk, Bold Creative).",
        "Click 'Generate AI Brand Kit' to receive matching primary, secondary, and accent color hex codes.",
        "Get instant Google Font pairings, brand voice adjectives, compelling taglines, and formatted bios ready to copy."
      ],
      proTip: "Copy your brand hex codes and use them consistently across your Reel covers and Instagram Stories to establish reliable visual recognition.",
      complementaryTools: [
        { name: "Instagram Bio Generator", tab: "bios" as TabType, href: "/tools/bio-generator" },
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" }
      ]
    },
    {
      id: "captions",
      tab: "captions" as TabType,
      href: "/tools/caption-generator",
      icon: <Type className="text-rose-500 w-4 h-4" />,
      badgeBg: "bg-rose-50 border-rose-200/80",
      title: "Instagram Caption Generator",
      shortTitle: "Captions",
      tagline: "Write scroll-stopping hooks, engaging stories, and strong CTAs for every post.",
      whyYouNeedIt: "A good photo captures attention, while a descriptive caption provides context and sparks conversations. Our AI Caption Generator helps you draft hooks, story structures, and clear calls-to-action.",
      steps: [
        "Choose your desired tone of voice (e.g., Casual, Storytelling, Professional, Witty, Aesthetic).",
        "Describe what your photo or video is about in a brief sentence.",
        "Toggle whether you want emojis or automated hashtag inclusion.",
        "Click 'Generate Captions' and review multiple tailored variations to copy with one click."
      ],
      proTip: "Use the 'Storytelling' tone for behind-the-scenes posts to build connection, and pair it with a direct question in the final sentence to invite community comments.",
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
      icon: <MessageCircle className="text-pink-500 w-4 h-4" />,
      badgeBg: "bg-pink-50 border-pink-200/80",
      title: "Instagram Comment Generator",
      shortTitle: "Comments",
      tagline: "Generate authentic, witty, supportive, and conversation-starting comments.",
      whyYouNeedIt: "Leaving thoughtful comments on posts in your niche can help you participate in community conversations and connect with other creators. Our Instagram Comment Generator creates natural comment suggestions tailored to any post topic, caption, or screenshot.",
      steps: [
        "Enter the post caption, describe the post theme, or upload a photo/screenshot of the post.",
        "Select your desired comment vibe (Hype & Supportive, Funny & Witty, Complimentary, Question Starter, Professional, or Snappy).",
        "Choose your relationship to the author (Close Friend, Creator, Colleague, Brand, Fan).",
        "Click 'Generate Instagram Comments' to receive 6 distinct, ready-to-copy comment variations."
      ],
      proTip: "Use 'Question Starter' vibe when commenting on creator posts—asking a thoughtful question makes it natural for the creator and audience to reply.",
      complementaryTools: [
        { name: "Instagram Caption Generator", tab: "captions" as TabType, href: "/tools/caption-generator" },
        { name: "Instagram Hashtag Generator", tab: "hashtags" as TabType, href: "/tools/hashtag-generator" }
      ]
    },
    {
      id: "hashtags",
      tab: "hashtags" as TabType,
      href: "/tools/hashtag-generator",
      icon: <Hash className="text-violet-600 w-4 h-4" />,
      badgeBg: "bg-violet-50 border-violet-200/80",
      title: "Instagram Hashtag Generator",
      shortTitle: "Hashtags",
      tagline: "Discover relevant hashtag ideas based on your post topic and niche.",
      whyYouNeedIt: "Using overly broad hashtags makes it harder for interested users to discover specific content. Our Instagram Hashtag Generator suggests relevant hashtag ideas organized around your topic and niche.",
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
      id: "cover",
      tab: "cover" as TabType,
      href: "/tools/reel-cover-maker",
      icon: <Smartphone className="text-indigo-600 w-4 h-4" />,
      badgeBg: "bg-indigo-50 border-indigo-200/80",
      title: "Instagram Reel Cover Maker",
      shortTitle: "Reel Cover",
      tagline: "Design 9:16 vertical covers with 1:1 safe-zone alignment.",
      whyYouNeedIt: "Reels with cut-off text or poorly aligned elements make profile feeds look cluttered. Our canvas-based Reel Cover Maker lets you design clean 9:16 covers while showing you the exact 1:1 square crop that appears on your profile grid.",
      steps: [
        "Choose a clean background gradient, solid color, or upload your own custom photo.",
        "Add crisp title text and pick from modern Google Fonts (Space Grotesk, Playfair Display, etc.).",
        "Customize text badge backgrounds (Pill, Block, Minimalist) and accent colors.",
        "Use interactive mouse or touch dragging on the canvas to reposition your photo or text.",
        "Toggle the '1:1 Safe-Zone Overlay' to ensure your text remains clearly visible in your main feed grid."
      ],
      proTip: "Keep title text short (3 to 5 words max) and centered within the middle 1:1 safe zone box so it looks clean on both the Reels tab and profile grid.",
      complementaryTools: [
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" },
        { name: "Instagram Photo Resizer", tab: "resizer" as TabType, href: "/tools/photo-resizer" }
      ]
    },
    {
      id: "bios",
      tab: "bios" as TabType,
      href: "/tools/bio-generator",
      icon: <Sparkles className="text-emerald-600 w-4 h-4" />,
      badgeBg: "bg-emerald-50 border-emerald-200/80",
      title: "Instagram Bio Generator",
      shortTitle: "Bio Generator",
      tagline: "Create clear and focused 150-character bio suggestions.",
      whyYouNeedIt: "Your Instagram bio is your digital business card. You have 150 characters to clearly communicate who you are, what value you provide, and how visitors can connect with you.",
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
      icon: <Zap className="text-sky-600 w-4 h-4" />,
      badgeBg: "bg-sky-50 border-sky-200/80",
      title: "Instagram Username Generator",
      shortTitle: "Usernames",
      tagline: "Find catchy, search-friendly Instagram handles for personal or business accounts.",
      whyYouNeedIt: "Finding a memorable username without excessive numbers or underscores can take time. Our generator blends your target keyword with creative prefixes, suffixes, and aesthetic styling to give you ideas.",
      steps: [
        "Enter your primary brand name, niche, or personal name.",
        "Select a style category (e.g., Minimal, Professional, Cute, Trendy, Creative).",
        "Browse organized username suggestions designed for your niche and style preferences.",
        "Click to copy your preferred handle and check availability directly on Instagram before using it."
      ],
      proTip: "Including a descriptive keyword in your username or display name (e.g., @jane.design) helps visitors understand what your account is about immediately.",
      complementaryTools: [
        { name: "Instagram Bio Generator", tab: "bios" as TabType, href: "/tools/bio-generator" },
        { name: "Instagram Brand Kit Generator", tab: "brandkit" as TabType, href: "/tools/brand-kit-generator" }
      ]
    },
    {
      id: "resizer",
      tab: "resizer" as TabType,
      href: "/tools/photo-resizer",
      icon: <Crop className="text-blue-600 w-4 h-4" />,
      badgeBg: "bg-blue-50 border-blue-200/80",
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
      proTip: "Always use 4:5 Portrait ratio (1080x1350 px) for regular feed posts — it takes up maximum vertical screen real estate on mobile devices.",
      complementaryTools: [
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" },
        { name: "Instagram Grid Maker", tab: "grid" as TabType, href: "/tools/grid-maker" }
      ]
    },
    {
      id: "grid",
      tab: "grid" as TabType,
      href: "/tools/grid-maker",
      icon: <LayoutGrid className="text-purple-600 w-4 h-4" />,
      badgeBg: "bg-purple-50 border-purple-200/80",
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
      icon: <Compass className="text-amber-600 w-4 h-4" />,
      badgeBg: "bg-amber-50 border-amber-200/80",
      title: "Instagram Feed Planner",
      shortTitle: "Feed Planner",
      tagline: "Visualize and curate your 3-column feed grid aesthetics before posting.",
      whyYouNeedIt: "Planning your visual flow in advance helps ensure that colors, photo styles, and graphics look balanced. Our interactive feed planner lets you drag and reorder upcoming photos and Reel covers to organize your grid layout.",
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
      id: "alttext",
      tab: "alttext" as TabType,
      href: "/tools/alt-text-generator",
      icon: <BookOpen className="text-teal-600 w-4 h-4" />,
      badgeBg: "bg-teal-50 border-teal-200/80",
      title: "Instagram ALT Text Generator",
      shortTitle: "Alt Text",
      tagline: "Create clear, descriptive image alt text to improve accessibility and provide context.",
      whyYouNeedIt: "Instagram uses automated vision models and alt text to index images in search results and assist screen-reader users. Well-written alt text improves accessibility and provides additional context about an image.",
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
      id: "downloader",
      tab: "downloader" as TabType,
      href: "/tools/reels-downloader",
      icon: <Video className="text-rose-600 w-4 h-4" />,
      badgeBg: "bg-rose-50 border-rose-200/80",
      title: "Instagram Reels Downloader",
      shortTitle: "Reels Downloader",
      tagline: "Download available media from supported public Reels, videos, and photos.",
      whyYouNeedIt: "Whether you're building a content mood board, archiving your own past Reels, or studying video formats for inspiration, our downloader lets you retrieve available public media directly to your device.",
      steps: [
        "Copy the URL link of any public Instagram Reel, Video, or Carousel Post.",
        "Paste the link into the URL input field and click 'Fetch Media'.",
        "Preview video or image thumbnails and click 'Download' to save directly to your camera roll or desktop."
      ],
      proTip: "Use downloaded video references to analyze pacing, editing cuts, and caption structures when planning your own original content.",
      complementaryTools: [
        { name: "Instagram Reel Cover Maker", tab: "cover" as TabType, href: "/tools/reel-cover-maker" },
        { name: "Instagram Feed Planner", tab: "planner" as TabType, href: "/tools/feed-planner" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-14 space-y-10">
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

      {/* Main Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <BookOpen size={14} className="text-stone-700" />
          <span>Documentation & Tutorials</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          How to Use GrowthCaption
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-2xl leading-relaxed">
          Step-by-step tutorials and best practices for using all 12 GrowthCaption AI generators and visual tools to streamline your daily social media workflow.
        </p>
      </div>

      {/* Quick Jump Bar */}
      <nav aria-label="Tool Navigation" className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
            <Layers size={13} className="text-stone-600" /> Quick Navigation
          </span>
          <span className="text-[11px] text-stone-400">12 Creator Tools</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {toolGuides.map((t) => (
            <a
              key={t.id}
              href={t.href}
              onClick={(e) => handleToolClick(e, t.tab)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-colors border border-stone-200"
            >
              <span>{t.shortTitle}</span>
              <ArrowRight size={10} className="text-stone-400" />
            </a>
          ))}
        </div>
      </nav>

      {/* 5-Minute Daily Content Routine */}
      <section className="bg-stone-900 text-white rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-stone-400 text-xs font-medium mb-1">
              <Zap size={13} className="text-stone-300" />
              <span>Recommended Daily Routine</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">5-Minute Content Workflow</h2>
          </div>
          <a 
            href="/tools/caption-generator"
            onClick={(e) => handleToolClick(e, 'captions')}
            className="inline-flex items-center gap-1.5 bg-white text-stone-900 hover:bg-stone-100 px-3.5 py-2 rounded-lg font-semibold text-xs transition-colors shrink-0"
          >
            <span>Start Workflow</span>
            <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { num: "01", title: "Brand Kit", desc: "Define colors & voice", tab: "brandkit" as TabType, href: "/tools/brand-kit-generator" },
            { num: "02", title: "Captions & Tags", desc: "Generate hooks & tags", tab: "captions" as TabType, href: "/tools/caption-generator" },
            { num: "03", title: "Resize / Cover", desc: "Format 4:5 or 9:16", tab: "resizer" as TabType, href: "/tools/photo-resizer" },
            { num: "04", title: "Feed Planner", desc: "Preview grid layout", tab: "planner" as TabType, href: "/tools/feed-planner" },
            { num: "05", title: "Alt Text", desc: "Add descriptive text", tab: "alttext" as TabType, href: "/tools/alt-text-generator" }
          ].map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              onClick={(e) => handleToolClick(e, s.tab)}
              className="bg-stone-800/80 border border-stone-700/80 p-3.5 rounded-lg hover:bg-stone-800 transition-colors flex flex-col justify-between"
            >
              <div className="text-[10px] font-mono font-semibold text-stone-400 mb-2">{s.num}</div>
              <div>
                <div className="font-semibold text-xs text-white mb-0.5">{s.title}</div>
                <div className="text-[11px] text-stone-400 leading-snug">{s.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Detailed Tool-by-Tool Guides */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900">
            Step-by-Step Tool Tutorials
          </h2>
          <span className="text-xs text-stone-400">Click any card to launch</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {toolGuides.map((guide) => (
            <article 
              key={guide.id} 
              id={guide.id}
              className="bg-white rounded-xl p-5 md:p-6 border border-stone-200 shadow-xs space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border shrink-0 ${guide.badgeBg || 'bg-stone-50 border-stone-200'}`}>
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">{guide.title}</h3>
                    <p className="text-stone-500 text-xs mt-0.5">{guide.tagline}</p>
                  </div>
                </div>

                <a
                  href={guide.href}
                  onClick={(e) => handleToolClick(e, guide.tab)}
                  className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors shrink-0 self-start sm:self-auto"
                >
                  <span>Launch Tool</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Why You Need It */}
              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Lightbulb size={13} className="text-stone-500" />
                  <span>Why Use This Tool</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {guide.whyYouNeedIt}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Step-by-Step Instructions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-stone-50/50 p-3 rounded-lg border border-stone-200/70">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-stone-700 text-xs leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip & Complementary Tools Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                <div className="sm:col-span-7 bg-stone-50 border border-stone-200 rounded-lg p-3 flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-stone-700 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider block">Pro Tip</span>
                    <p className="text-xs text-stone-600 leading-relaxed">{guide.proTip}</p>
                  </div>
                </div>

                <div className="sm:col-span-5 bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-1.5 flex flex-col justify-center">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Recommended Pairings</span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.complementaryTools.map((comp, i) => (
                      <a
                        key={i}
                        href={comp.href}
                        onClick={(e) => handleToolClick(e, comp.tab)}
                        className="text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200 hover:border-stone-300 transition-colors inline-flex items-center gap-1"
                      >
                        <span>{comp.name}</span>
                        <ArrowRight size={9} className="text-stone-400" />
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
      <section className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-stone-900">Additional Resources</h2>
          <p className="text-stone-500 text-xs mt-0.5">
            Deepen your Instagram knowledge with our guides, articles, and creator FAQs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="/blog"
            onClick={(e) => handlePageClick(e, 'blog')}
            className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors space-y-2 group"
          >
            <div className="p-1.5 bg-white rounded-md border border-stone-200 w-fit text-stone-700">
              <BookOpen size={16} />
            </div>
            <h3 className="font-semibold text-stone-900 text-xs group-hover:text-stone-950">Blog & Guides</h3>
            <p className="text-stone-500 text-[11px] leading-relaxed">Practical articles on formatting, caption hooks, and organic growth strategies.</p>
          </a>

          <a
            href="/faq"
            onClick={(e) => handlePageClick(e, 'faq')}
            className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors space-y-2 group"
          >
            <div className="p-1.5 bg-white rounded-md border border-stone-200 w-fit text-stone-700">
              <HelpCircle size={16} />
            </div>
            <h3 className="font-semibold text-stone-900 text-xs group-hover:text-stone-950">FAQ</h3>
            <p className="text-stone-500 text-[11px] leading-relaxed">Quick answers on privacy guarantees, rate limits, and tool features.</p>
          </a>

          <a
            href="/sitemap"
            onClick={(e) => handlePageClick(e, 'sitemap')}
            className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors space-y-2 group"
          >
            <div className="p-1.5 bg-white rounded-md border border-stone-200 w-fit text-stone-700">
              <Sliders size={16} />
            </div>
            <h3 className="font-semibold text-stone-900 text-xs group-hover:text-stone-950">Tool Index</h3>
            <p className="text-stone-500 text-[11px] leading-relaxed">Complete directory of all GrowthCaption tools, legal pages, and links.</p>
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-stone-900 rounded-xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white mb-1">
            Ready to streamline your social media content?
          </h2>
          <p className="text-stone-400 text-xs max-w-md leading-relaxed">
            No registration or credit card required. Generate captions, bio ideas, and formatted Reel covers in your browser.
          </p>
        </div>
        <a 
          href="/tools/caption-generator"
          onClick={(e) => handleToolClick(e, 'captions')}
          className="inline-flex items-center gap-1.5 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs px-4 py-2 rounded-lg transition-colors shrink-0 shadow-2xs"
        >
          <span>Launch Caption Generator</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

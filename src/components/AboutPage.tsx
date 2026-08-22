import { Sparkles, User, Target, ShieldCheck, Code, Mail, XCircle, CheckCircle2, LayoutGrid, Smartphone, Move, Download, Heart } from 'lucide-react';
import { SEO } from './SEO';

export function AboutPage() {
  const toolsList = [
    {
      icon: <Sparkles className="text-amber-500 w-6 h-6" />,
      title: "AI Caption & Bio Suite",
      description: "Use AI-powered tools to create captions, bios, usernames, and other Instagram content ideas in seconds."
    },
    {
      icon: <Smartphone className="text-purple-500 w-6 h-6" />,
      title: "Reel Cover Maker",
      description: "Create customized 9:16 Reel Cover layouts in seconds with custom typography, backdrop gradients, and real-time safe-zone guides."
    },
    {
      icon: <Move className="text-violet-500 w-6 h-6" />,
      title: "Interactive Photo Resizer",
      description: "Crop, frame, and adjust posts for Instagram dimensions with live touch and drag repositioning."
    },
    {
      icon: <LayoutGrid className="text-indigo-500 w-6 h-6" />,
      title: "Grid Maker & Feed Planner",
      description: "Split single images into multi-tile grid layouts and visually organize your aesthetic feed preview before publishing."
    },
    {
      icon: <Download className="text-rose-500 w-6 h-6" />,
      title: "Reels & Video Downloader",
      description: "Download available media from supported public Instagram Reels, carousel posts, and videos without requiring an account login."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="About GrowthCaption - Free AI Instagram Creator Suite"
        description="Learn about GrowthCaption's mission to provide free AI tools for Instagram creators, brands, and influencers."
        url="https://growthcaption.com/about-us"
      />

      {/* Main Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          About GrowthCaption
        </h1>
        <p className="text-stone-500 font-medium text-base md:text-lg max-w-2xl mx-auto">
          Free Instagram Creator Tools for creating, organizing, and reusing social content.
        </p>
      </div>

      {/* Founder & Mission Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden mb-10">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md shadow-indigo-500/10 shrink-0 bg-stone-100">
            <img 
              id="about-author-avatar"
              src="/author-bhagwan.jpg" 
              alt="Bhagwan Dokhale - Founder & Developer of GrowthCaption"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-4 text-stone-600 font-medium text-base leading-relaxed flex-1">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Creator & Origin</h2>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Founded by Bhagwan Dokhale</p>
            </div>
            <p>
              GrowthCaption was created by Bhagwan Dokhale to solve a frustration shared by content creators worldwide: spending endless hours staring at blank screens, struggling to write engaging captions, manually formatting grid layouts, or adjusting media ratios.
            </p>
            <p>
              Driven by a desire to simplify content production, GrowthCaption brings together intelligent AI utilities and browser-native image processors into a seamless, accessible toolkit designed to eliminate creative fatigue and streamline daily workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Purpose & Audience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Core Purpose & Problem Solved</h2>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            Creating social content consistently can take time, especially when you need to write captions, format images, plan your feed, or maintain a consistent visual style. GrowthCaption solves this by centralizing caption generation, organizing your profile content, layout splitting, and photo resizing into simple tools that deliver ready-to-publish assets.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Who We Build For</h2>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            Our platform is built specifically for individual content creators, social media managers, agency strategists, small business owners, digital marketers, and influencers who want to maintain a polished, professional online identity without spending hours on repetitive tasks.
          </p>
        </div>
      </div>

      {/* Development & Technology */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Code className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Tool Architecture & Development</h2>
        </div>
        <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-medium space-y-2">
          Every tool on GrowthCaption is engineered using modern web standards. Image operations — such as photo resizing, grid slicing, and preview rendering — execute directly inside your browser using client-side HTML5 canvas processing for maximum speed and privacy. For text utilities, we leverage secure server-side AI integrations to provide tailored, context-aware content suggestions.
        </p>
      </div>

      {/* Data Privacy & Platform Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Data Privacy & Collection</h2>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            We prioritize user privacy above all else. Images used by our browser-based image tools are processed locally in your browser. AI generation requests and certain server-based features are processed through our servers as described in this Privacy Policy. GrowthCaption does not collect personal identity information, require mandatory account sign-ups, or track user activity across external sites.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <XCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">What GrowthCaption Does Not Do</h2>
          <ul className="text-xs text-stone-600 leading-relaxed font-medium space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>We do not store or retain your personal photos or media files.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>We do not sell or share user data with third-party advertisers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>We do not auto-post content directly to your social media accounts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>We do not lock basic utilities behind paywalls or subscriptions.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Toolkit Overview */}
      <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6 text-center">
        Our Unified Creator Toolkit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {toolsList.map((tool, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-stone-50/50 p-2.5 rounded-2xl border border-stone-100">
                {tool.icon}
              </div>
              <h3 className="font-bold text-stone-900 text-base">{tool.title}</h3>
            </div>
            <p className="text-xs font-medium text-stone-500 leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Getting in Touch</h2>
          <p className="text-stone-300 text-xs md:text-sm font-medium leading-relaxed">
            We welcome feedback, tool suggestions, bug reports, and collaboration opportunities. You can reach out directly via our Contact Page or by emailing us.
          </p>
          <div className="pt-2">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
            >
              Visit Contact Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



import { Sparkles, Target, ShieldCheck, Code, Mail, XCircle, CheckCircle2, LayoutGrid, Smartphone, Move, Download, Heart } from 'lucide-react';
import { SEO } from './SEO';

export function AboutPage() {
  const toolsList = [
    {
      icon: <Sparkles className="text-stone-700 w-4 h-4" />,
      title: "AI Caption & Bio Suite",
      description: "Generate structured, on-brand captions, bios, and username concepts in seconds."
    },
    {
      icon: <Smartphone className="text-stone-700 w-4 h-4" />,
      title: "Reel Cover Maker",
      description: "Compose 9:16 vertical cover designs with live 1:1 square safe-zone overlays."
    },
    {
      icon: <Move className="text-stone-700 w-4 h-4" />,
      title: "Interactive Photo Resizer",
      description: "Crop and reposition posts for Instagram dimensions with touch and mouse dragging."
    },
    {
      icon: <LayoutGrid className="text-stone-700 w-4 h-4" />,
      title: "Grid Maker & Feed Planner",
      description: "Split photos into multi-tile layouts and organize upcoming grid aesthetic previews."
    },
    {
      icon: <Download className="text-stone-700 w-4 h-4" />,
      title: "Reels & Video Downloader",
      description: "Download available media from supported public Instagram posts without account login."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10 md:py-16">
      <SEO 
        title="About GrowthCaption - Free AI Instagram Creator Suite"
        description="Learn about GrowthCaption's mission to provide free AI tools for Instagram creators, brands, and influencers."
        url="https://growthcaption.com/about-us"
      />

      {/* Main Header */}
      <div className="text-left mb-8 pb-6 border-b border-stone-200">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          About GrowthCaption
        </h1>
        <p className="text-stone-500 text-sm max-w-xl">
          A dedicated toolkit of browser utilities and AI helpers engineered for creators, marketers, and social media strategists.
        </p>
      </div>

      {/* Founder & Mission */}
      <div className="bg-white rounded-xl p-6 md:p-7 border border-stone-200 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
            <img 
              id="about-author-avatar"
              src="/author-bhagwan.jpg" 
              alt="Bhagwan Dokhale - Founder & Developer of GrowthCaption"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-3 text-stone-600 text-xs md:text-sm leading-relaxed flex-1">
            <div>
              <h2 className="text-base font-semibold text-stone-900">Creator & Origin</h2>
              <p className="text-xs text-stone-500">Founded by Bhagwan Dokhale</p>
            </div>
            <p>
              GrowthCaption was built to solve a simple workflow problem: creator fatigue from switching between multiple disparate apps for captions, image resizing, feed planning, and bio formatting.
            </p>
            <p>
              By combining client-side image processing with server-side AI generation, GrowthCaption provides instant, private, and frictionless tools without requiring account registrations or subscriptions.
            </p>
          </div>
        </div>
      </div>

      {/* Purpose & Audience Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            <Target className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-stone-900">Core Purpose</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eliminating repetitive social media tasks by providing focused single-purpose tools that deliver publish-ready assets in seconds.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            <Heart className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-stone-900">Who It's Built For</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Content creators, digital agencies, small business owners, and solo marketers who need high visual standards without complex software.
          </p>
        </div>
      </div>

      {/* Development & Technology */}
      <div className="bg-white rounded-xl p-5 md:p-6 border border-stone-200 shadow-xs mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
            <Code className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-stone-900">Architecture & Performance</h2>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          Every tool is built with modern web technologies. Canvas-based operations (image resizing, cover creation, and tile slicing) run entirely in your local browser for maximum privacy and zero latency. Text generation tools communicate with secure server endpoints to provide structured, context-rich responses.
        </p>
      </div>

      {/* Data Privacy & Platform Boundaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-stone-900">Privacy First</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Browser image tools process files locally in memory. We do not track users across the web, require sign-ups, or store personal media files.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            <XCircle className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-stone-900">Our Commitments</h2>
          <ul className="text-xs text-stone-600 leading-relaxed space-y-1.5">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>Zero retention of user image files</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>No user data sales or monetization</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>No mandatory registrations or hidden walls</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Toolkit Overview */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
          Available Creator Utilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {toolsList.map((tool, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="bg-stone-50 p-1.5 rounded-md border border-stone-200">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-stone-900 text-xs">{tool.title}</h3>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-stone-900 text-white rounded-xl p-6 md:p-7 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white mb-1">Have feedback or suggestions?</h2>
          <p className="text-stone-400 text-xs max-w-md">
            We actively update GrowthCaption based on creator feedback, feature requests, and bug reports.
          </p>
        </div>
        <a 
          href="/contact" 
          className="inline-flex items-center gap-1.5 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs px-4 py-2 rounded-lg transition-colors shrink-0 shadow-2xs"
        >
          <Mail size={13} />
          <span>Contact Team</span>
        </a>
      </div>
    </div>
  );
}



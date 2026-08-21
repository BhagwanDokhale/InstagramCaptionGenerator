import React from 'react';
import { TableOfContents, TOCItem } from './TableOfContents';
import { InternalLink } from './InternalLink';
import { Palette, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Type, Volume2 } from 'lucide-react';

export const brandKitTocItems: TOCItem[] = [
  { id: 'brand-sec-1', title: 'The Role of a Cohesive Visual Identity on Social Media' },
  { id: 'brand-sec-2', title: 'What Exactly is a Social Brand Kit?' },
  { id: 'brand-sec-3', title: 'Pillar 1: The 5-Color Palette Architecture' },
  { id: 'brand-sec-4', title: 'The 60-30-10 Rule for Color Distribution in Feeds' },
  { id: 'brand-sec-5', title: 'Pillar 2: Typographical Pairing (Display vs. Body Copy)' },
  { id: 'brand-sec-6', title: 'Selecting Fonts That Match Your Brand Personality' },
  { id: 'brand-sec-7', title: 'Pillar 3: Defining Your Authentic Brand Voice & Tone' },
  { id: 'brand-sec-8', title: 'Pillar 4: Creating Clear Slogans & Taglines' },
  { id: 'brand-sec-9', title: 'Pillar 5: Bio Architecture & Value Proposition Alignment' },
  { id: 'brand-sec-10', title: 'Documenting Your Brand Guidelines Style Guide' },
  { id: 'brand-sec-11', title: 'Executing Your Brand Kit Across All Feed Touchpoints' },
  { id: 'brand-sec-12', title: 'Generating Your Brand Kit Instantly with AI Tools' },
  { id: 'brand-sec-13', title: 'Frequently Asked Questions About Brand Kits' },
  { id: 'brand-sec-14', title: 'Final Brand Kit Implementation Checklist' },
];

export const BrandKitArticle: React.FC = () => {
  return (
    <div className="space-y-8 text-stone-800 text-sm md:text-base leading-relaxed font-sans">
      <TableOfContents items={brandKitTocItems} />

      {/* Section 1 & 2 */}
      <section id="brand-sec-1" className="space-y-4">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          The Role of a Cohesive Visual Identity on Social Media
        </h2>
        <p>
          Have you ever scrolled through your Instagram feed and recognized an account's post before reading the handle? Visual consistency—such as a signature color palette, distinctive typography, and uniform framing—helps make a profile recognizable.
        </p>
        <p>
          Developing a clear visual identity helps give your account a cohesive look across posts, carousels, Stories, and Reels.
        </p>
        <p>
          When your social media presence operates under a structured aesthetic system, creating new content becomes simpler and faster. In this guide, we break down five core pillars to organize your social brand kit.
        </p>
        <p>
          To apply your brand identity across all touchpoints, combine this guide with our <InternalLink href="/blog/10-tips-for-the-perfect-instagram-bio">Instagram Bio Guide</InternalLink>, our <InternalLink href="/blog/why-grid-layouts-boost-engagement">Grid Layout Strategy</InternalLink>, and our <InternalLink href="/blog/designing-reel-covers-that-get-clicked">Reel Cover Design Manual</InternalLink>.
        </p>
      </section>

      <section id="brand-sec-2" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          What Exactly is a Social Brand Kit?
        </h2>
        <p>
          A Brand Kit is a centralized reference document that organizes your visual assets, typography selections, color hex codes, and messaging guidelines in one place.
        </p>
        <p>
          Having a structured brand kit prevents inconsistent font selections, mismatched colors, and shifting tones across your posts, making regular content creation more efficient.
        </p>
      </section>

      {/* Pillar 1 & Color Rule */}
      <section id="brand-sec-3" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <Palette className="text-stone-700" size={20} />
          Pillar 1: The 5-Color Palette Architecture
        </h2>
        <p>
          Color is the most immediate sensory trigger in branding. However, using too many arbitrary colors creates visual noise and dilutes brand recall. High-performing digital brands adhere to a tight 5-color palette consisting of:
        </p>
        <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-5 my-4 space-y-3">
          <p className="font-bold text-stone-900">The 5 Core Color Roles Explained:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-700 text-xs md:text-sm">
            <li><strong className="text-stone-900">Primary Brand Shade:</strong> Your signature brand anchor used for main headings and logo marks.</li>
            <li><strong className="text-stone-900">Secondary Accent Shade:</strong> A supportive tone that adds depth to backgrounds and card borders.</li>
            <li><strong className="text-stone-900">High-Contrast Action Pop:</strong> A vibrant shade reserved exclusively for Call-To-Action (CTA) buttons and key highlights.</li>
            <li><strong className="text-stone-900">Dark Neutral Text Color:</strong> A deep charcoal slate or espresso chocolate shade for body text legibility.</li>
            <li><strong className="text-stone-900">Light Canvas Background:</strong> A soft, spacious background tone (alabaster silk, soft cream, or light sage) providing breathing room.</li>
          </ul>
        </div>
      </section>

      <section id="brand-sec-4" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900">
          The 60-30-10 Rule for Color Distribution in Feeds
        </h3>
        <p>
          To maintain visual balance across graphics, carousels, and video covers, follow the classic interior design 60-30-10 rule:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>60% Canvas Dominance:</strong> Fill 60% of your graphic with your light canvas background.</li>
          <li><strong>30% Structure & Text:</strong> Dedicate 30% to dark neutral typography and primary structural cards.</li>
          <li><strong>10% Focal Pop:</strong> Save 10% for your high-contrast pop color to direct eyes to CTAs and key statistics.</li>
        </ul>
      </section>

      {/* Pillar 2 & Typography */}
      <section id="brand-sec-5" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <Type className="text-stone-700" size={20} />
          Pillar 2: Typographical Pairing (Display vs. Body Copy)
        </h2>
        <p>
          Typography conveys subtle psychological mood cues before a single word is read. High-end serifs feel luxurious and authoritative; geometric sans-serifs feel modern and tech-forward; rounded fonts feel warm and approachable.
        </p>
        <p>
          The universal typography pairing rule is to select exactly **two complementary fonts**:
        </p>
        <div className="bg-white border border-stone-200 rounded-xl p-5 my-3 space-y-2 shadow-2xs">
          <p className="font-bold text-stone-900 text-sm">The Golden Font Duo:</p>
          <ul className="space-y-1.5 text-xs md:text-sm text-stone-700">
            <li><strong className="text-stone-900">1. Display Title Font:</strong> High-personality font reserved for main headlines on graphics and Reel covers (e.g. Space Grotesk, Outfit, Playfair Display).</li>
            <li><strong className="text-stone-900">2. Body Copy Font:</strong> Ultra-clean, neutral font optimized for effortless mobile reading (e.g. Plus Jakarta Sans, Inter).</li>
          </ul>
        </div>
      </section>

      {/* Pillar 3: Voice & Tone */}
      <section id="brand-sec-7" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <Volume2 className="text-stone-700" size={20} />
          Pillar 3: Defining Your Authentic Brand Voice & Tone
        </h2>
        <p>
          Your brand voice is your written personality across captions, direct messages, and comments. Define three core adjectives that encapsulate your tone:
        </p>
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-xs md:text-sm text-stone-900 space-y-1">
          <p className="font-bold">Example Voice Archetypes:</p>
          <p>• <strong>Empathetic Mentor:</strong> Warm, encouraging, patient, value-driven.</p>
          <p>• <strong>Sharp Industry Insider:</strong> Direct, data-backed, concise, zero-fluff.</p>
          <p>• <strong>Playful Creator:</strong> Witty, energetic, relatable, emoji-friendly.</p>
        </div>
        <p>
          Ensure all your caption copy aligns with this chosen voice using our <InternalLink href="/blog/ultimate-guide-instagram-captions-2026">Caption Copywriting Framework</InternalLink>.
        </p>
      </section>

      {/* Pillar 4 & 5 */}
      <section id="brand-sec-8" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Pillar 4: Creating Clear Slogans & Taglines
        </h2>
        <p>
          A memorable slogan summarizes your brand promise in a single catchy sentence. Use punchy formulas like:
        </p>
        <p className="font-mono text-xs md:text-sm bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-800">
          "Master [Skill] in [Timeframe] without [Pain Point]"
        </p>
      </section>

      <section id="brand-sec-9" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Pillar 5: Bio Architecture & Value Proposition Alignment
        </h2>
        <p>
          Integrate your brand kit directly into your social media bio. Ensure your 150-character bio includes your target keywords, primary value proposition, social proof, and a clear call-to-action leading to your bio link.
        </p>
        <p>
          Draft clear bio suggestions instantly with our <InternalLink href="/tools/bio-generator">AI Bio Generator Tool</InternalLink>.
        </p>
      </section>

      {/* Tool Section */}
      <section id="brand-sec-12" className="space-y-4 pt-6 bg-stone-50 p-6 rounded-xl border border-stone-200">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
          <Sparkles className="text-stone-700" size={18} />
          <h2>Generating Your Brand Kit Instantly with AI Tools</h2>
        </div>
        <p>
          Building a professional brand kit manually can take days of trial and error. GrowthCaption’s free <InternalLink href="/tools/brand-kit">Brand Kit Generator</InternalLink> automates the entire process.
        </p>
        <p>
          Simply enter your brand name and niche description, pick an aesthetic vibe (Minimalist Luxury, Cyberpunk, Warm Earthy, Modern SaaS), and our AI engine synthesizes a complete brand kit with custom color palettes, Google Font pairings, slogan options, bio drafts, and feed advice instantly!
        </p>
        <div className="pt-2">
          <InternalLink href="/tools/brand-kit" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors no-underline">
            <span>Generate Free Brand Kit Now</span>
            <ArrowRight size={14} />
          </InternalLink>
        </div>
      </section>

      {/* FAQ & Checklist */}
      <section id="brand-sec-13" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <HelpCircle className="text-stone-700" size={20} />
          Frequently Asked Questions About Brand Kits
        </h2>
        <div className="space-y-4">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: Can I update my brand kit as my business grows?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Yes! Brands evolve over time. Evolving your brand kit every 12 to 18 months keeps your aesthetic feeling fresh while preserving your core visual identity.
            </p>
          </div>
        </div>
      </section>

      <section id="brand-sec-14" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Final Brand Kit Implementation Checklist
        </h2>
        <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80 space-y-3">
          <ul className="space-y-2 text-xs md:text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>5 core brand color hex codes defined and saved</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Two complementary Google Fonts selected for titles and body text</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Brand voice adjectives codified into caption guidelines</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Profile bio updated using our <InternalLink href="/tools/bio-generator">AI Bio Generator</InternalLink></span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

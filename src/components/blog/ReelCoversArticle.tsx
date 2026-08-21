import React from 'react';
import { TableOfContents, TOCItem } from './TableOfContents';
import { InternalLink } from './InternalLink';
import { Image as ImageIcon, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Eye } from 'lucide-react';

export const reelCoversTocItems: TOCItem[] = [
  { id: 'cover-sec-1', title: 'The Role of Reel Cover Design on Viewer Engagement' },
  { id: 'cover-sec-2', title: 'The 1:1 Feed Grid vs. 9:16 Video Frame Math' },
  { id: 'cover-sec-3', title: 'The Golden Rule: Understanding the 1:1 Safe Zone' },
  { id: 'cover-sec-4', title: 'Visual Design Principles of Effective Thumbnail Graphics' },
  { id: 'cover-sec-5', title: 'Typography & Readability Rules for Mobile Feed Scroll' },
  { id: 'cover-sec-6', title: 'Text Badge Overlays: Pills, Badges & Solid Overlays' },
  { id: 'cover-sec-7', title: 'Choosing & Grading Backdrops: Screenshots vs. Custom Graphics' },
  { id: 'cover-sec-8', title: 'Color Palette Integration with Your Overall Feed Aesthetic' },
  { id: 'cover-sec-9', title: 'Creating Scalable Reel Cover Templates for Series' },
  { id: 'cover-sec-10', title: 'Common Reel Cover Design Disasters to Avoid' },
  { id: 'cover-sec-11', title: 'A/B Testing Thumbnail Angles & Headline Variations' },
  { id: 'cover-sec-12', title: 'Designing Perfect Covers with GrowthCaption Reel Cover Maker' },
  { id: 'cover-sec-13', title: 'Frequently Asked Questions About Reel Covers' },
  { id: 'cover-sec-14', title: 'Reel Cover Pre-Publishing Audit Checklist' },
];

export const ReelCoversArticle: React.FC = () => {
  return (
    <div className="space-y-8 text-stone-800 text-sm md:text-base leading-relaxed font-sans">
      <TableOfContents items={reelCoversTocItems} />

      {/* Section 1 & 2 */}
      <section id="cover-sec-1" className="space-y-4">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          The Role of Reel Cover Design on Viewer Engagement
        </h2>
        <p>
          You put time into recording video clips, editing cuts, timing audio transitions, and drafting a thoughtful caption. However, how your video is presented on the Explore tab, recommendation feeds, and your profile grid depends heavily on the selected thumbnail image.
        </p>
        <p>
          A clear, legible, and well-framed **Reel Cover** gives viewers an accurate preview of what the video is about.
        </p>
        <p>
          Your Reel cover represents your video content across multiple surfaces. If a thumbnail is blurry, text is cut off, or the image is uninformative, viewers are more likely to scroll past. A clear cover with legible text helps users decide whether the video is relevant to their interests.
        </p>
        <p>
          In this guide, we break down best practices for designing safe-zone compliant Reel covers that look great on both full-screen video feeds and your profile grid. To harmonize your video covers with your overall feed layout, combine this guide with our <InternalLink href="/blog/why-grid-layouts-boost-engagement">Grid Layout Strategy</InternalLink> and our <InternalLink href="/blog/how-to-build-cohesive-brand-kit">Brand Kit Framework</InternalLink>.
        </p>
      </section>

      <section id="cover-sec-2" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          The 1:1 Feed Grid vs. 9:16 Video Frame Math
        </h2>
        <p>
          The single biggest technical challenge in designing Reel covers stems from Instagram's dual aspect ratio rendering system.
        </p>
        <p>
          When a Reel plays in full-screen mode or appears in the dedicated Reels tab, it renders in vertical <strong>9:16 aspect ratio (1080x1920 pixels)</strong>. However, when someone views your main profile feed, Instagram crops that exact same cover into a square <strong>1:1 aspect ratio (1080x1080 pixels)</strong> located directly in the vertical center of the frame.
        </p>
        <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-5 my-4 space-y-3">
          <p className="font-bold text-stone-900">Dimensions & Aspect Ratio Breakdown:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-700 text-xs md:text-sm font-medium">
            <li><strong className="text-stone-900">Full Reel Canvas:</strong> 1080px width × 1920px height (9:16 ratio).</li>
            <li><strong className="text-stone-900">Profile Feed Crop:</strong> 1080px width × 1080px height (1:1 square centered).</li>
            <li><strong className="text-stone-900">Top Invisible Buffer:</strong> 420px height top margin (hidden on profile grid).</li>
            <li><strong className="text-stone-900">Bottom Invisible Buffer:</strong> 420px height bottom margin (hidden on profile grid).</li>
          </ul>
        </div>
      </section>

      {/* Safe Zone */}
      <section id="cover-sec-3" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-stone-900">The Golden Rule:</span> Understanding the 1:1 Safe Zone
        </h2>
        <p>
          If you place your primary text title, brand logo, or main subject's head outside the central 1080x1080 safe zone, those critical elements will get sliced off when viewed on your main profile page.
        </p>
        <p>
          A profile full of cut-off titles and unreadable text looks chaotic and amateurish. By keeping all text titles strictly within the 1:1 square, your profile feed stays clean, professional, and easy for visitors to navigate.
        </p>
        <p>
          You can test your cover alignment instantly using our live <InternalLink href="/tools/reel-cover">GrowthCaption Reel Cover Maker</InternalLink> which features a real-time 1:1 Safe Zone toggle overlay!
        </p>
      </section>

      {/* Psychology */}
      <section id="cover-sec-4" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Visual Design Principles of Effective Thumbnail Graphics
        </h2>
        <p>
          What makes a user stop scrolling and click? Eye-tracking studies reveal three primary visual triggers:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>Expressive Human Faces:</strong> High-contrast close-up portraits showing emotion (excitement, intrigue, surprise) pull eyes faster than inanimate objects.</li>
          <li><strong>Punchy Text Headlines:</strong> Summarize the core value promise of the video in 3 to 6 words.</li>
          <li><strong>High Luminance Contrast:</strong> Bright text placed on dark background badges or high-contrast backdrops stands out amidst busy mobile feeds.</li>
        </ul>
      </section>

      {/* Typography & Badges */}
      <section id="cover-sec-5" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Typography & Readability Rules for Mobile Feed Scroll
        </h2>
        <p>
          Never copy-paste long sentences onto your cover. Space is limited, and users view thumbnails on small smartphone screens.
        </p>
        <p>
          Use bold, high-weight display fonts (like Space Grotesk, Outfit, or Playfair Display). Keep headline text under two lines, and ensure font size is large enough to read easily without zooming.
        </p>
      </section>

      <section id="cover-sec-6" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          Text Badge Overlays: Pills, Badges & Solid Overlays
        </h3>
        <p>
          When placing text over photographic backgrounds, busy background details often degrade text legibility. To guarantee WCAG-compliant contrast:
        </p>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 my-3 text-xs md:text-sm text-stone-900 space-y-2">
          <p className="font-bold">3 Text Container Solutions:</p>
          <ul className="list-disc list-inside space-y-1 text-indigo-900">
            <li><strong>Solid Background Pill:</strong> Enclose each line of text inside a solid rounded rectangle container.</li>
            <li><strong>Dark Gradient Blur Overlay:</strong> Apply a subtle 40% black gradient behind the text area.</li>
            <li><strong>High-Contrast Card Container:</strong> Place text inside a centered white or dark card container.</li>
          </ul>
        </div>
      </section>

      {/* Backdrops & Color */}
      <section id="cover-sec-7" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Choosing & Grading Backdrops: Screenshots vs. Custom Graphics
        </h2>
        <p>
          You have two primary options for cover backdrops:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>Video Freeze-Frame Screenshot:</strong> Select a crisp, well-lit, expressive frame from the video itself. Avoid blurry action shots.</li>
          <li><strong>Custom Designed Graphic or Gradient:</strong> Use aesthetic gradient canvases (lavender silk, cosmic slate, warm amber) to maintain a unified brand signature across all video posts.</li>
        </ul>
      </section>

      <section id="cover-sec-8" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Color Palette Integration with Your Overall Feed Aesthetic
        </h2>
        <p>
          Ensure your Reel covers utilize the exact color hex codes defined in your brand guidelines. If your brand palette features soft neutrals, avoid using bright neon green Reel covers that clash with your past grid uploads.
        </p>
        <p>
          Synthesize custom color schemes instantly using our <InternalLink href="/blog/how-to-build-cohesive-brand-kit">Brand Kit Generator Guide</InternalLink>.
        </p>
      </section>

      {/* Tool Section */}
      <section id="cover-sec-12" className="space-y-4 pt-6 bg-stone-50 p-6 rounded-xl border border-stone-200">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
          <Sparkles className="text-stone-700" size={18} />
          <h2>Designing Perfect Covers with GrowthCaption Reel Cover Maker</h2>
        </div>
        <p>
          Stop struggling with complex graphic editing software or guessing safe zone boundaries. GrowthCaption’s <InternalLink href="/tools/reel-cover">Reel Cover Maker</InternalLink> gives you a free, browser-based design studio tailored specifically for Instagram Reels.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <p className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
              <Eye size={16} className="text-stone-700" />
              <span>Live Safe Zone Toggle</span>
            </p>
            <p className="text-xs text-stone-600">
              Instantly toggle between 9:16 full-screen preview and 1:1 profile grid preview.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <p className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
              <ImageIcon size={16} className="text-stone-700" />
              <span>Aesthetic Backdrops & Fonts</span>
            </p>
            <p className="text-xs text-stone-600">
              Access premium gradients, custom fonts, text pills, and export full-res 1080x1920 PNG files.
            </p>
          </div>
        </div>
        <div className="pt-2">
          <InternalLink href="/tools/reel-cover" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors no-underline">
            <span>Create Free Reel Cover Now</span>
            <ArrowRight size={14} />
          </InternalLink>
        </div>
      </section>

      {/* FAQ & Checklist */}
      <section id="cover-sec-13" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <HelpCircle className="text-stone-700" size={20} />
          Frequently Asked Questions About Reel Covers
        </h2>
        <div className="space-y-4">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: Can I change a Reel cover after publishing?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Yes! Tap the three dots on your published Reel, select "Edit", and tap "Cover" to upload a new image from your camera roll anytime.
            </p>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: What file format and dimensions should I export?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Export high-resolution PNG or JPG images at 1080x1920 pixels resolution (9:16 aspect ratio).
            </p>
          </div>
        </div>
      </section>

      <section id="cover-sec-14" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Reel Cover Pre-Publishing Audit Checklist
        </h2>
        <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80 space-y-3">
          <ul className="space-y-2 text-xs md:text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>All text titles reside strictly within the central 1:1 square safe zone</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Headline copy is punchy, high-contrast, and limited to 3–6 words</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Text pills or gradient overlays ensure 100% legibility over background details</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Cover colors match your profile grid palette in our <InternalLink href="/tools/feed-planner">Visual Feed Planner</InternalLink></span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

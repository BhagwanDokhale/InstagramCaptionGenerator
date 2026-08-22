import React from 'react';
import { TableOfContents, TOCItem } from './TableOfContents';
import { InternalLink } from './InternalLink';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const bioTocItems: TOCItem[] = [
  { id: 'bio-sec-1', title: 'Understanding the Role of Your Instagram Bio' },
  { id: 'bio-sec-2', title: 'Tip 1: Clearly Explain Who You Are and What You Do' },
  { id: 'bio-sec-3', title: 'Tip 2: Include Relevant Keywords for Profile Searchability' },
  { id: 'bio-sec-4', title: 'Tip 3: Craft a Compelling Value Proposition' },
  { id: 'bio-sec-5', title: 'Tip 4: Structure Your Text with Clean Line Breaks & Formatting' },
  { id: 'bio-sec-6', title: 'Tip 5: Strategic Use of Emojis and Visual Spacers' },
  { id: 'bio-sec-7', title: 'Tip 6: Include a Clear Call-to-Action (CTA)' },
  { id: 'bio-sec-8', title: 'Tip 7: Maximize Your Single Bio Link (or Multi-Link Strategy)' },
  { id: 'bio-sec-9', title: 'Tip 8: Highlight Social Proof and Key Accomplishments' },
  { id: 'bio-sec-10', title: 'Tip 9: Align Your Bio Aesthetics with Your Overall Feed' },
  { id: 'bio-sec-11', title: 'Tip 10: Continuously Test and Update Your Bio Performance' },
  { id: 'bio-sec-12', title: 'Leveraging AI Tools for Effortless Bio Creation' },
  { id: 'bio-sec-13', title: 'Frequently Asked Questions About Instagram Bios' },
  { id: 'bio-sec-14', title: 'Final Checklist and Actionable Takeaways' },
];

export const BioArticle: React.FC = () => {
  return (
    <div className="space-y-8 text-stone-800 text-sm md:text-base leading-relaxed font-sans">
      <TableOfContents items={bioTocItems} />

      {/* Intro & Section 1 */}
      <section id="bio-sec-1" className="space-y-4">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Understanding the Role of Your Instagram Bio
        </h2>
        <p>
          When a user visits your profile—whether from a Reel, a comment, or an external link—your Instagram bio is the very first piece of content they encounter. In under 150 characters, your bio introduces your account: it defines your focus, communicates what content you create, and gives visitors context on what to expect.
        </p>
        <p>
          Think of your Instagram profile as a digital landing page. The profile image serves as your avatar or logo, your handle is your username, your grid is your visual portfolio, and your bio is your profile introduction. If your introduction is clear and well-structured, visitors can easily understand who you are and what topics you cover.
        </p>
        <p>
          In this guide, we break down 10 practical tips to structure a clear and effective Instagram bio. Whether you are an individual creator, a small business, or an organization, these principles will help you communicate clearly. For a complete profile setup, pair this guide with our <InternalLink href="/blog/how-to-build-cohesive-brand-kit">brand kit guide</InternalLink> and our <InternalLink href="/blog/why-grid-layouts-boost-engagement">feed grid layout strategies</InternalLink>.
        </p>
      </section>

      {/* Tip 1 */}
      <section id="bio-sec-2" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 1:</span> Clearly Explain Who You Are and What You Do
        </h2>
        <p>
          Clarity helps new visitors quickly understand your account. Stating your primary role, industry, or creative focus in straightforward language ensures readers immediately grasp your focus.
        </p>
        <p>
          Start with absolute clarity. State your primary role, industry, or creative focus in straightforward, plain language. If you offer specialized services, be direct about your domain expertise.
        </p>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 my-4 space-y-3">
          <p className="font-bold text-stone-900">Clear Profile Bio Examples Across Niches:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-700 font-medium pl-2">
            <li><strong className="text-stone-900">E-Commerce:</strong> "Sustainable activewear designed for outdoor movement & daily comfort."</li>
            <li><strong className="text-stone-900">Fitness Coach:</strong> "Helping busy parents build sustainable workout & nutrition habits."</li>
            <li><strong className="text-stone-900">Tech Content Creator:</strong> "Reviewing consumer gadgets, AI tools & desk setup accessories."</li>
            <li><strong className="text-stone-900">Consultant:</strong> "Actionable marketing tips and software growth strategies."</li>
          </ul>
        </div>
        <p>
          If you are still finalizing your brand positioning or username identity, experiment with our free <InternalLink href="/tools/username-generator">Instagram Username Generator</InternalLink> to ensure your handle and name field align nicely with your topic.
        </p>
      </section>

      {/* Tip 2 */}
      <section id="bio-sec-3" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 2:</span> Include Relevant Keywords for Profile Searchability
        </h2>
        <p>
          Instagram's search tool allows users to discover accounts based on search terms like "Wedding Photographer", "Meal Prep", "UI Design", or "Book Reviews".
        </p>
        <p>
          To make your profile discoverable when users search for your niche, include descriptive keywords in your <strong>Name Field</strong> and your <strong>Bio Text</strong>.
        </p>
        <p>
          Your Name Field gives you 30 characters that appear prominently below your profile picture. Adding your primary specialty or topic next to your name can help clarify your focus.
        </p>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 my-4">
          <p className="font-bold text-indigo-950 mb-2">Name Field Keyword Structure:</p>
          <p className="font-mono text-sm text-indigo-900 bg-white p-3 rounded-xl border border-indigo-200/60">
            [Your Name] | [Primary Keyword / Niche Topic]
          </p>
          <p className="text-xs text-indigo-800 mt-2 font-medium">
            Example: "Sarah Jenkins | Social Media Coach" or "Apex Coffee | Specialty Roaster"
          </p>
        </div>
        <p>
          Adding descriptive topic words in your bio text provides further clarity about the kind of content you post.
        </p>
      </section>

      {/* Tip 3 */}
      <section id="bio-sec-4" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 3:</span> Craft a Compelling Value Proposition
        </h2>
        <p>
          Why should someone follow you today instead of just closing the tab? Your bio must answer the "WIFM" question: <em>"What's In It For Me?"</em>
        </p>
        <p>
          Most people follow accounts not out of charity, but because the account promises ongoing entertainment, actionable education, aesthetic inspiration, or tangible transformation. Shift the focus of your bio from self-centered statements to follower-focused outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-rose-50/60 border border-rose-200/70 p-4 rounded-2xl">
            <p className="font-bold text-rose-900 text-sm mb-1">❌ Weak & Self-Centered</p>
            <p className="text-xs text-rose-800">"I love taking photos, drinking matcha, and sharing my personal journey in life!"</p>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-200/70 p-4 rounded-2xl">
            <p className="font-bold text-emerald-900 text-sm mb-1">✅ Strong & Value-Driven</p>
            <p className="text-xs text-emerald-800">"Learn how to shoot & edit professional iPhone portraits in under 60 seconds a day."</p>
          </div>
        </div>
        <p>
          Notice how the value-driven version sets a clear expectation of what the follower gains. When paired with high-quality posts formatted with advice from our <InternalLink href="/blog/ultimate-guide-instagram-captions-2026">Ultimate Instagram Captions Guide</InternalLink>, your profile becomes irresistible.
        </p>
      </section>

      {/* Tip 4 */}
      <section id="bio-sec-5" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 4:</span> Structure Your Text with Clean Line Breaks & Formatting
        </h2>
        <p>
          Mobile users do not read text line-by-line; they scan visually. A dense paragraph of 150 continuous characters without line breaks creates mental friction and reduces readability dramatically.
        </p>
        <p>
          Structure your bio as a vertical list using concise bullet points or individual lines. Each line should represent a single logical thought or piece of information.
        </p>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 my-4 space-y-2">
          <p className="font-bold text-stone-900 text-sm">Recommended 4-Line Bio Architecture:</p>
          <ol className="list-decimal list-inside text-stone-700 text-xs md:text-sm space-y-1.5 font-mono">
            <li><strong>Line 1:</strong> Identity / Primary Keyword ("Digital Creator & Tech Reviewer")</li>
            <li><strong>Line 2:</strong> Value Proposition / Mission ("Helping 100k+ builders master AI tools")</li>
            <li><strong>Line 3:</strong> Social Proof / Credibility ("Featured in Forbes & TechCrunch")</li>
            <li><strong>Line 4:</strong> Call-To-Action + Pointer ("Free AI Toolkit below 👇")</li>
          </ol>
        </div>
        <p>
          To insert clean line breaks on Instagram without awkward formatting glitches, draft your bio inside a text editor or use our automated <InternalLink href="/tools/bio-generator">GrowthCaption Bio Generator</InternalLink> which automatically formats whitespace and character counts cleanly.
        </p>
      </section>

      {/* Tip 5 */}
      <section id="bio-sec-6" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 5:</span> Strategic Use of Emojis and Visual Spacers
        </h2>
        <p>
          Emojis are not merely decorative ornaments; they function as visual signposts that guide the reader’s eyes through your bio structure. When used intentionally, emojis replace boring punctuation marks, add brand character, and save precious character count space.
        </p>
        <p>
          However, balance is critical. Oversaturating every single word with colorful emojis creates visual clutter and makes your account look spammy or unprofessional.
        </p>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 my-4 space-y-3 shadow-2xs">
          <p className="font-bold text-stone-900 text-sm">Effective Emoji Pairings for Bio Bullet Points:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-stone-700">
            <li>📍 <strong>Location:</strong> "Based in Austin, TX"</li>
            <li>🎓 <strong>Education/Credentials:</strong> "Stanford CS '22"</li>
            <li>📩 <strong>Contact/Inquiries:</strong> "Inquiries: hello@brand.com"</li>
            <li>🎙️ <strong>Podcast/Media:</strong> "Host of The Creator Pod"</li>
            <li>👇 <strong>Link Direction:</strong> "Claim your free guide below"</li>
            <li>🏆 <strong>Achievements:</strong> "Over $1M generated in client revenue"</li>
          </ul>
        </div>
      </section>

      {/* Tip 6 */}
      <section id="bio-sec-7" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 6:</span> Include a Clear Call-to-Action (CTA)
        </h2>
        <p>
          Never assume that visitors know what to do next. If you want them to click your link, subscribe to your newsletter, purchase your physical product, or book a consultation call, you must explicitly instruct them to do so.
        </p>
        <p>
          Place your Call-to-Action on the final line of your bio text, immediately above your link. Use directional emojis like down arrows (👇) or right pointers (👉) to physically draw the eye toward the link container.
        </p>
        <p>
          To maximize click-through rates, pair your CTA with a high-value incentive (a lead magnet), such as a free cheat sheet, a discount code, a free consultation, or an exclusive template download.
        </p>
      </section>

      {/* Tip 7 */}
      <section id="bio-sec-8" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 7:</span> Maximize Your Single Bio Link (or Multi-Link Strategy)
        </h2>
        <p>
          Instagram allows accounts to feature external links directly in the bio. You can either link directly to a single destination (such as your main website homepage, YouTube channel, or Shopify product page) or utilize a link-in-bio landing page that houses multiple curated destinations.
        </p>
        <p>
          If you choose a multi-link setup, ensure the top option matches the exact incentive mentioned in your bio CTA. Giving users too many choices can lead to decision paralysis, so limit your link tree to 3 to 5 core links at any given time.
        </p>
      </section>

      {/* Tip 8 */}
      <section id="bio-sec-9" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 8:</span> Highlight Social Proof and Key Accomplishments
        </h2>
        <p>
          Social proof reduces perceived risk and builds instant trust with cold traffic. If you have noteworthy achievements, client milestones, awards, or press features, showcase them succinctly in your bio.
        </p>
        <p>
          Examples of impactful social proof markers include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li>"Featured in NYT, WSJ, and TechCrunch"</li>
          <li>"Trusted by 50,000+ active email subscribers"</li>
          <li>"Over 10M+ views on YouTube"</li>
          <li>"3x Amazon Best-Selling Author"</li>
        </ul>
        <p>
          Even as a smaller creator, you can showcase social proof through client testimonials or total community impact ("Helped 200+ creators grow organically").
        </p>
      </section>

      {/* Tip 9 */}
      <section id="bio-sec-10" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 9:</span> Align Your Bio Aesthetics with Your Overall Feed
        </h2>
        <p>
          Your bio does not exist in isolation—it sits directly on top of your profile grid and profile picture. Visual discord between your bio tone and your content aesthetic breaks trust.
        </p>
        <p>
          If your account is a minimalist luxury aesthetic with neutral tones, avoid using bright neon or cartoonish emojis in your bio. Conversely, if your page is vibrant, playful, and energetic, a stiff corporate bio will feel mismatched.
        </p>
        <p>
          Ensure your profile photo is high-resolution, centered, and brightly lit. If you post vertical videos and Reels, make sure your cover images align with your bio tone. Learn how to format your video covers with our <InternalLink href="/blog/designing-reel-covers-that-get-clicked">Reel cover design guide</InternalLink>.
        </p>
      </section>

      {/* Tip 10 */}
      <section id="bio-sec-11" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span className="text-indigo-600">Tip 10:</span> Continuously Test and Update Your Bio Performance
        </h2>
        <p>
          An Instagram bio is not a static document that you set once and forget forever. As your business evolves, as you launch new products, or as your content strategy shifts, your bio should update dynamically.
        </p>
        <p>
          Monitor your Instagram Insights metrics monthly. Pay close attention to two primary activity metrics: <strong>Profile Activity</strong> (total visits) and <strong>Website Taps</strong> (link clicks).
        </p>
        <p>
          If your profile visits are high but link clicks are low, your CTA or lead magnet offer might need refining. If visitors arrive but don't hit follow, test a clearer value proposition in line 2 of your bio.
        </p>
      </section>

      {/* AI Tools Section */}
      <section id="bio-sec-12" className="space-y-4 pt-6 bg-gradient-to-br from-indigo-50/60 to-rose-50/40 p-6 rounded-3xl border border-indigo-100">
        <div className="flex items-center gap-2 text-indigo-950 font-bold text-lg">
          <Sparkles className="text-rose-500 animate-pulse" size={20} />
          <h2>Leveraging AI Tools for Effortless Bio Creation</h2>
        </div>
        <p>
          Drafting 150 characters that hit every SEO keyword, CTA requirement, and line-break rule can take hours of trial and error. That’s why we created the <InternalLink href="/tools/bio-generator">GrowthCaption Bio Generator</InternalLink>.
        </p>
        <p>
          By simply inputting your niche, tone preference (e.g., Professional, Friendly, Witty, or Minimalist), and key offer, our AI engine synthesizes dozens of perfectly formatted bio variations instantly. You can test multiple hooks, tweak emojis, and copy formatted text straight into your Instagram app in seconds.
        </p>
        <div className="pt-2">
          <InternalLink href="/tools/bio-generator" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all no-underline">
            <span>Try AI Bio Generator Now</span>
            <ArrowRight size={14} />
          </InternalLink>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="bio-sec-13" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" size={22} />
          Frequently Asked Questions About Instagram Bios
        </h2>
        <div className="space-y-4">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: How long can an Instagram bio be?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              An Instagram bio has a strict character limit of 150 characters. This includes letters, numbers, spaces, line breaks, and emojis.
            </p>
          </div>
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: Should I use custom fonts in my Instagram bio?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Use custom unicode fonts sparingly (for example, on a single word or header). Overusing stylized script fonts can create accessibility issues for people using screen readers and may prevent text from being properly recognized by search tools.
            </p>
          </div>
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: How often should I change my bio?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              We recommend reviewing your bio quarterly or whenever you launch a major campaign, release a new freebie, or update your core business offerings.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist & Takeaways */}
      <section id="bio-sec-14" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Final Checklist and Actionable Takeaways
        </h2>
        <p>
          Before saving your updated profile in the Instagram app, run through this quick audit checklist to ensure your bio is clear and readable:
        </p>
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
          <ul className="space-y-2 text-xs md:text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Name field includes target niche keywords (e.g. "Jane | Fitness Coach")</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Bio immediately states who you are and what value you provide</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Text is broken into 3–4 clean, scannable vertical lines</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Emojis act as intentional bullet points, not random clutter</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Clear Call-to-Action on the bottom line pointing directly to your link</span>
            </li>
          </ul>
        </div>
        <p>
          By implementing these ten strategies, your Instagram bio will clearly communicate your value and introduce your profile effectively. Pair your new bio with compelling posts crafted using our <InternalLink href="/tools/caption-generator">AI Caption Generator</InternalLink> and organize a cohesive feed using our <InternalLink href="/tools/feed-planner">Visual Feed Planner</InternalLink>!
        </p>
      </section>
    </div>
  );
};

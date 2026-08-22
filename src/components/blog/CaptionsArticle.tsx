import React from 'react';
import { TableOfContents, TOCItem } from './TableOfContents';
import { InternalLink } from './InternalLink';
import { Sparkles, CheckCircle2, HelpCircle, ArrowRight, MessageSquareText } from 'lucide-react';

export const captionsTocItems: TOCItem[] = [
  { id: 'cap-sec-1', title: 'The Evolution of Instagram Captions in 2026' },
  { id: 'cap-sec-2', title: 'How Caption Length & Detail Influence Engagement' },
  { id: 'cap-sec-3', title: 'Anatomy of an Effective Caption Framework' },
  { id: 'cap-sec-4', title: 'Part 1: The Hook (Overcoming the See More Truncation)' },
  { id: 'cap-sec-5', title: 'Part 2: Micro-Blogging & Value-Packed Body Copy' },
  { id: 'cap-sec-6', title: 'Part 3: Storytelling Frameworks That Build Emotional Connection' },
  { id: 'cap-sec-7', title: 'Part 4: Formatting Rules for Skimmable Mobile Copy' },
  { id: 'cap-sec-8', title: 'Part 5: Clear Calls-to-Action (CTAs)' },
  { id: 'cap-sec-9', title: 'Effective Hashtag Selection: Quality over Quantity' },
  { id: 'cap-sec-10', title: 'Keyword Context & Accessibility via Alt Text' },
  { id: 'cap-sec-11', title: 'How Long Should Your Captions Be? (Short vs. Long Form)' },
  { id: 'cap-sec-12', title: 'Generating Captions with AI' },
  { id: 'cap-sec-13', title: 'Frequently Asked Questions About Captions' },
  { id: 'cap-sec-14', title: 'Summary Checklist for Caption Success' },
];

export const CaptionsArticle: React.FC = () => {
  return (
    <div className="space-y-8 text-stone-800 text-sm md:text-base leading-relaxed font-sans">
      <TableOfContents items={captionsTocItems} />

      {/* Section 1 */}
      <section id="cap-sec-1" className="space-y-4">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          The Evolution of Instagram Captions in 2026
        </h2>
        <p>
          For years, common social media advice suggested that Instagram was purely a photo platform where captions played a secondary, background role. One-word captions, random emoji strings, or vague quotes were common. However, how audiences interact with content on the platform has evolved significantly.
        </p>
        <p>
          Today, Instagram combines photos, carousels, and video formats. While visual elements capture attention, your caption provides the necessary context, sparks discussions in the comments, and helps clarify the topic of your content for viewers and search queries.
        </p>
        <p>
          Whether you are building a personal brand, running a business, or sharing creative projects, writing clear captions is a valuable skill. In this guide, we break down copywriting structures, formatting tips, hashtag recommendations, and interaction factors to help you craft clear, readable captions. For a complete profile upgrade, pair this guide with our <InternalLink href="/blog/10-tips-for-the-perfect-instagram-bio">Instagram Bio Guide</InternalLink> and our <InternalLink href="/blog/how-to-save-instagram-reels-videos-safely">Reels Research Blueprint</InternalLink>.
        </p>
      </section>

      {/* Section 2 */}
      <section id="cap-sec-2" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          How Caption Length & Detail Influence Engagement
        </h2>
        <p>
          To write better captions, it helps to understand how user engagement is measured on social platforms. While likes indicate quick visual approval, longer engagement—such as reading through a full caption, opening comments, or saving a post—often reflects deeper interest in the topic.
        </p>
        <p>
          When a user stops scrolling to read a thoughtful caption, tap "...more", and read the complete message, they spend more time with your content. Engaging content that encourages saves, shares, and comments can also help your posts reach interested audiences through Instagram's recommendation and search features.
        </p>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 my-4 space-y-3">
          <p className="font-bold text-stone-900">Key Post Interaction Factors:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-700 text-xs md:text-sm">
            <li><strong className="text-stone-900">Saves:</strong> Users bookmark helpful recipes, tutorials, or guides to reference later.</li>
            <li><strong className="text-stone-900">Shares (DM Sending):</strong> Informative or entertaining captions prompt users to send posts to colleagues or friends.</li>
            <li><strong className="text-stone-900">Comment Depth:</strong> Clear discussion questions encourage thoughtful responses in the comments.</li>
            <li><strong className="text-stone-900">Search Discovery:</strong> Descriptive keywords in body copy help users find your posts when searching for specific topics.</li>
          </ul>
        </div>
      </section>

      {/* Section 3 & 4 */}
      <section id="cap-sec-3" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Anatomy of an Effective Caption Framework
        </h2>
        <p>
          Structured captions follow a 4-part layout that guides the reader cleanly from initial interest to the post's conclusion.
        </p>
      </section>

      <section id="cap-sec-4" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="text-indigo-600">Part 1:</span> The Hook (Opening Lines)
        </h3>
        <p>
          Instagram automatically truncates captions after the first few lines on mobile feeds, showing a "...more" button. Crafting a clear, compelling first sentence gives readers a clear reason to expand and read the rest of your post.
        </p>
        <p>
          Your opening sentence sets the context. Rather than generic opening remarks, summarize the most interesting insight or question right at the start.
        </p>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 my-3 text-xs md:text-sm text-indigo-950 space-y-2">
          <p className="font-bold">5 Common Hook Formats:</p>
          <ul className="list-disc list-inside space-y-1 text-indigo-900">
            <li><strong>The Contrarian Perspective:</strong> "Why posting every single day might not be necessary for community growth."</li>
            <li><strong>The Case Study:</strong> "What we learned after testing 3 different Reel formats this month."</li>
            <li><strong>The Personal Story:</strong> "Here is how our design workflow changed over the past year."</li>
            <li><strong>The Helpful Tip:</strong> "The most overlooked setting when setting up an Instagram profile."</li>
            <li><strong>The Curated List:</strong> "5 helpful tools to streamline your weekly content planning."</li>
          </ul>
        </div>
      </section>

      {/* Section 5 & 6 */}
      <section id="cap-sec-5" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="text-indigo-600">Part 2:</span> Micro-Blogging & Value-Packed Body Copy
        </h3>
        <p>
          Once the hook opens the door, the body copy must deliver on the promise. Treat your body copy as a micro-blog post. Provide actionable tips, step-by-step tutorials, honest reviews, or deep industry breakdowns.
        </p>
        <p>
          Focus on providing immediate, tactical value that the reader can implement right away. When copy delivers genuine value, saves and shares naturally skyrocket.
        </p>
      </section>

      <section id="cap-sec-6" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="text-indigo-600">Part 3:</span> Storytelling Frameworks That Build Emotional Connection
        </h3>
        <p>
          Facts educate, but stories connect. To build an authentic community, incorporate classical storytelling frameworks into your captions:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>The PAS Formula (Problem, Agitation, Solution):</strong> Identify a pain point your audience struggles with, agitate the consequences of leaving it unfixed, and present your solution clearly.</li>
          <li><strong>The Before-After-Bridge (BAB):</strong> Describe a frustrating past state, paint a picture of the ideal present state, and provide the exact bridge (methodology) to get there.</li>
          <li><strong>Behind-the-Scenes Journey:</strong> Share honest mistakes, hard-earned lessons, and real struggles behind your successes.</li>
        </ul>
      </section>

      {/* Section 7 & 8 */}
      <section id="cap-sec-7" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="text-indigo-600">Part 4:</span> Formatting Rules for Skimmable Mobile Copy
        </h3>
        <p>
          On mobile screens, giant blocks of unformatted text strain the reader's eyes. To ensure maximum readability:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li>Keep paragraphs under 2–3 sentences each.</li>
          <li>Use clean white space and line breaks between paragraphs.</li>
          <li>Use bullet points, numbered lists, or bold emojis to break up long sections.</li>
          <li>Use capital letters strategically for sub-headers (e.g. "STEP 1:", "PRO TIP:").</li>
        </ul>
      </section>

      <section id="cap-sec-8" className="space-y-4 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="text-indigo-600">Part 5:</span> Clear Calls-to-Action (CTAs)
        </h3>
        <p>
          Never end a caption without instructing your audience on what step to take next. Tailor your CTA to your specific goal for the post:
        </p>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 my-3 space-y-3 shadow-2xs">
          <p className="font-bold text-stone-900 text-sm">Targeted CTA Examples:</p>
          <ul className="space-y-2 text-xs md:text-sm text-stone-700">
            <li><strong>For Comment Engagement:</strong> "Which of these 5 tools have you tried? Drop a comment below! 👇"</li>
            <li><strong>For Saves:</strong> "Save this post to reference during your next content planning session! 📌"</li>
            <li><strong>For Shares:</strong> "Tag a creator friend who needs to see this today! 🚀"</li>
            <li><strong>For Profile Traffic:</strong> "Want the full free guide? Tap the link in my bio to download! 🔗"</li>
          </ul>
        </div>
      </section>

      {/* Section 9 & 10 */}
      <section id="cap-sec-9" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Effective Hashtag Selection: Quality over Quantity
        </h2>
        <p>
          Hashtag strategies have evolved. Using excessive or completely unrelated hashtags is less effective than choosing a focused set of relevant tags.
        </p>
        <p>
          Consider using a focused group of relevant hashtags grouped into three categories:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>Broad Industry Tags (1-3):</strong> #DigitalMarketing, #FitnessTips</li>
          <li><strong>Niche Subject Tags (3-5):</strong> #InstagramSEO, #KetoMealPrep</li>
          <li><strong>Community/Location Tags (1-2):</strong> #AustinCreators, #SaaSFounders</li>
        </ol>
        <p>
          Generate fresh, relevant tag collections using our free <InternalLink href="/tools/hashtag-generator">Instagram Hashtag Generator</InternalLink>.
        </p>
      </section>

      <section id="cap-sec-10" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Keyword Context & Accessibility via Alt Text
        </h2>
        <p>
          To make your visual content accessible to all users, add descriptive Alt Text to your images. Descriptive alt text helps screen reader users understand the visual content and provides search engines with accurate context about the image.
        </p>
        <p>
          Generate clear alt descriptions with our <InternalLink href="/tools/alt-text">Instagram Alt Text Generator</InternalLink>.
        </p>
      </section>

      {/* Section 11 & 12 */}
      <section id="cap-sec-11" className="space-y-4 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          How Long Should Your Captions Be? (Short vs. Long Form)
        </h2>
        <p>
          There is no one-size-fits-all length rule. Test both short-form and long-form copy:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 pl-2">
          <li><strong>Short-Form (10–30 words):</strong> Useful for quick visual memes, outfit photos, and short video Reels where visual elements tell the story.</li>
          <li><strong>Long-Form (150–300 words):</strong> Useful for informative carousels, tutorials, personal reflections, and brand announcements.</li>
        </ul>
      </section>

      <section id="cap-sec-12" className="space-y-4 pt-6 bg-gradient-to-br from-indigo-50/60 to-rose-50/40 p-6 rounded-3xl border border-indigo-100">
        <div className="flex items-center gap-2 text-indigo-950 font-bold text-lg">
          <Sparkles className="text-rose-500 animate-pulse" size={20} />
          <h2>Generating Captions with AI</h2>
        </div>
        <p>
          When you need new content ideas, GrowthCaption’s <InternalLink href="/tools/caption-generator">Instagram Caption Generator</InternalLink> allows you to enter a brief topic description, select your desired tone (Casual, Storytelling, Professional, Witty, or Aesthetic), and generate multi-option caption drafts with hooks, body copy, and CTAs in seconds.
        </p>
        <div className="pt-2">
          <InternalLink href="/tools/caption-generator" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all no-underline">
            <span>Generate Captions Now</span>
            <ArrowRight size={14} />
          </InternalLink>
        </div>
      </section>

      {/* FAQ & Checklist */}
      <section id="cap-sec-13" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" size={22} />
          Frequently Asked Questions About Captions
        </h2>
        <div className="space-y-4">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: Should hashtags go in the caption or comments?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Instagram indexes hashtags placed in both the caption body and the first comment. You can place them at the end of your caption or in the comments depending on your layout preference.
            </p>
          </div>
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h3 className="font-bold text-stone-900 text-sm md:text-base">Q: Does editing a caption after posting affect performance?</h3>
            <p className="text-xs md:text-sm text-stone-600 mt-1">
              Correcting typos or formatting shortly after posting has minimal effect. Editing text as needed ensures your information is accurate and clear.
            </p>
          </div>
        </div>
      </section>

      <section id="cap-sec-14" className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-stone-950 border-b border-stone-200 pb-2">
          Summary Checklist for Caption Success
        </h2>
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
          <ul className="space-y-2 text-xs md:text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Clear opening line that introduces the topic</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Body copy delivers clear, informative value</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Text formatted with short paragraphs and clean line breaks</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Clear call-to-action inviting discussion or saving for reference</span>
            </li>
          </ul>
        </div>
        <p>
          Applying clear structure, readable formatting, and thoughtful questions to your captions helps create engaging posts and invites meaningful conversations with your audience.
        </p>
      </section>
    </div>
  );
};

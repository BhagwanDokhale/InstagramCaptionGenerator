import { SEO } from './SEO';
import { AlertTriangle, ShieldCheck, Cpu, Download, Info } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="Disclaimer | GrowthCaption"
        description="GrowthCaption media and content disclaimer regarding Instagram platform integration and public web tools."
        url="https://growthcaption.com/disclaimer"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Disclaimer
        </h1>
        <p className="text-stone-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Important disclosures regarding our service independence, AI technology usage, and platform responsibilities.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
        
        {/* Independence & Non-Affiliation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <h2>1. Independent Entity & Non-Affiliation</h2>
          </div>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            <strong>GrowthCaption is an independent platform</strong> and software service created to assist social media creators, marketers, and individuals. 
          </p>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            GrowthCaption is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected with Instagram, Meta Platforms, Inc.</strong>, or any of their subsidiaries or affiliates. The official Instagram website can be found at <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-semibold">https://instagram.com</a>. All product names, logos, brands, and trademarks referenced on this website are the property of their respective owners.
          </p>
        </div>

        {/* AI Output Notice & Errors */}
        <div className="space-y-3 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Cpu size={18} />
            </div>
            <h2>2. Artificial Intelligence Output & Potential Errors</h2>
          </div>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            Our platform utilizes advanced artificial intelligence (AI) algorithms to generate captions, bios, usernames, hashtags, alt text, and brand assets. While we strive for high quality and relevance:
          </p>
          <ul className="list-disc pl-16 text-stone-600 text-xs md:text-sm space-y-1.5 font-medium">
            <li>AI outputs can contain errors, factual inaccuracies, outdated information, or unexpected language.</li>
            <li>Generative AI models produce probabilistic suggestions based on patterns rather than verified facts.</li>
            <li>We do not guarantee specific social media algorithm performance, engagement rates, virality, or search engine ranking gains resulting from generated content.</li>
          </ul>
        </div>

        {/* User Content Review Responsibility */}
        <div className="space-y-3 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <AlertTriangle size={18} />
            </div>
            <h2>3. User Responsibility to Review & Verify Content</h2>
          </div>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            <strong>Users are strictly responsible for reviewing, editing, and verifying all generated content</strong> before publishing, distributing, or using it in any personal, public, or commercial context.
          </p>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            GrowthCaption and its developers assume no liability or responsibility for any damages, claim, penalties, loss of reputation, or platform account actions resulting from the use or publication of unverified AI-generated text or assets.
          </p>
        </div>

        {/* Media Downloader & Rights/Permissions */}
        <div className="space-y-3 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Download size={18} />
            </div>
            <h2>4. Media Downloader & Copyright Rights / Permissions</h2>
          </div>
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed pl-10 font-medium">
            Our Reels Downloader and visual media utilities are designed solely for lawful, personal, backup, or authorized content creation workflows.
          </p>
          <ul className="list-disc pl-16 text-stone-600 text-xs md:text-sm space-y-1.5 font-medium">
            <li><strong>Downloader users are solely responsible for obtaining all necessary rights, licenses, and permissions</strong> from original copyright holders before downloading, saving, distributing, or reposting any media content.</li>
            <li>GrowthCaption does not store, host, or claim ownership over any third-party media extracted using our downloader utility.</li>
            <li>Users must adhere to copyright laws, intellectual property rights, and Instagram's Terms of Service when handling third-party media.</li>
          </ul>
        </div>

        {/* Contact Support Note */}
        <div className="pt-6 border-t border-stone-100">
          <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl flex items-start gap-3">
            <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs font-medium text-stone-600 leading-relaxed">
              <p className="font-bold text-stone-900 text-sm mb-1">Questions or Legal Inquiries?</p>
              <p>
                If you have any questions regarding this Disclaimer or need to report concerns, please contact us at{' '}
                <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-bold underline">
                  bhagwan5.dokhale@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

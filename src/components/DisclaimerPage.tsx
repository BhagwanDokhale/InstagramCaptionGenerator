import { SEO } from './SEO';
import { ShieldCheck, Cpu, AlertTriangle, Download, Info } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-14 space-y-8">
      <SEO 
        title="Disclaimer | GrowthCaption"
        description="GrowthCaption media and content disclaimer regarding Instagram platform integration and public web tools."
        url="https://growthcaption.com/disclaimer"
      />

      {/* Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <Info size={14} className="text-stone-700" />
          <span>Disclosures & Compliance</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Disclaimer
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-xl">
          Important disclosures regarding our service independence, AI technology usage, and platform responsibilities.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 border border-stone-200 shadow-2xs space-y-6 text-stone-700">
        
        {/* Independence & Non-Affiliation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
            <ShieldCheck size={16} className="text-stone-700 shrink-0" />
            <h2>1. Independent Entity & Non-Affiliation</h2>
          </div>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-6">
            <strong className="text-stone-900">GrowthCaption is an independent platform</strong> and software service created to assist social media creators, marketers, and individuals.
          </p>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-6">
            GrowthCaption is <strong className="text-stone-900">not affiliated, associated, authorized, endorsed by, or in any way officially connected with Instagram, Meta Platforms, Inc.</strong>, or any of their subsidiaries or affiliates. All product names, logos, brands, and trademarks referenced on this website are the property of their respective owners.
          </p>
        </div>

        {/* AI Output Notice */}
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
            <Cpu size={16} className="text-stone-700 shrink-0" />
            <h2>2. Artificial Intelligence Output & Suggestions</h2>
          </div>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-6">
            Our platform utilizes artificial intelligence (AI) models to generate captions, bios, usernames, hashtags, alt text, and brand assets. While we strive for high quality and relevance:
          </p>
          <ul className="list-disc pl-11 text-xs md:text-sm text-stone-600 space-y-1">
            <li>AI outputs can contain errors, inaccuracies, or unexpected language.</li>
            <li>Generative AI models produce probabilistic suggestions based on patterns rather than verified facts.</li>
            <li>We do not guarantee specific social media algorithm performance or engagement rates.</li>
          </ul>
        </div>

        {/* User Content Review Responsibility */}
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
            <AlertTriangle size={16} className="text-stone-700 shrink-0" />
            <h2>3. User Review Responsibility</h2>
          </div>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-6">
            <strong className="text-stone-900">Users are strictly responsible for reviewing, editing, and verifying all generated content</strong> before publishing or using it in any personal or commercial context. GrowthCaption assumes no liability for the publication of unverified AI-generated text or assets.
          </p>
        </div>

        {/* Media Downloader Policy */}
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
            <Download size={16} className="text-stone-700 shrink-0" />
            <h2>4. Media Downloader & Copyright Rights</h2>
          </div>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-6">
            Our Reels Downloader and visual media utilities are designed solely for lawful, personal, backup, or authorized content creation workflows. Users are solely responsible for obtaining necessary rights and permissions before downloading or reposting third-party content.
          </p>
        </div>

        {/* Contact Support Note */}
        <div className="pt-4 border-t border-stone-100">
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-start gap-2.5">
            <Info size={16} className="text-stone-700 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-600 leading-relaxed">
              <p className="font-semibold text-stone-900 text-xs mb-0.5">Questions or Inquiries?</p>
              <p>
                If you have questions regarding this Disclaimer, please contact us at{' '}
                <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-stone-900 hover:underline font-semibold">
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

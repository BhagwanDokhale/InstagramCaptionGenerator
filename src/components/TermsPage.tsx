import { SEO } from './SEO';
import { FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-14 space-y-8">
      <SEO 
        title="Terms & Conditions | GrowthCaption"
        description="Terms of service and usage guidelines for GrowthCaption free web tools and services."
        url="https://growthcaption.com/terms-and-conditions"
      />

      {/* Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <FileText size={14} className="text-stone-700" />
          <span>Legal & Policy</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Terms & Conditions
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-xl">
          Guidelines and terms governing your use of GrowthCaption web applications and creator tools.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 border border-stone-200 shadow-2xs space-y-6 text-stone-700">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">1. Acceptance of Terms</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            By accessing and using GrowthCaption, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you are prohibited from using our services.
          </p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">2. Use License</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            You are permitted to use the content and graphics templates generated or exported by GrowthCaption (including custom captions, bios, usernames, hashtags, resized images, grid tiles, and Reel covers) for both personal and commercial purposes. However, you are prohibited from using our services to generate, design, or distribute unlawful, harassing, copyrighted (without permission), or malicious content.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">3. Disclaimer</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            The materials, text, and graphics design templates on our website are provided on an 'as is' basis. We make no warranties regarding the market success, search engine ranking, or specific audience engagement rates of the captions, hashtags, bios, usernames, or Reel cover graphics designed on our platform.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">4. Media Downloader & Design Assets Policy</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            Our Reels & Video Downloader and Reel Cover templates are intended for personal or professional branding use with assets that you own or have permission to use. You agree not to download or incorporate third-party copyrighted materials without consent, and you assume full responsibility for complying with Instagram's terms of service, trademark policies, and local copyright laws.
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-stone-100">
          <h2 className="text-base font-semibold text-stone-900">5. Contact Information</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            If you have any questions regarding these terms, please contact us at{' '}
            <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-stone-900 hover:underline font-semibold">
              bhagwan5.dokhale@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

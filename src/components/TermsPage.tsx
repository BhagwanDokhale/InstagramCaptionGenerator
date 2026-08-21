import { SEO } from './SEO';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="Terms & Conditions | GrowthCaption"
        description="Terms of service and usage guidelines for GrowthCaption free web tools and services."
        url="https://growthcaption.com/terms-and-conditions"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Terms & Conditions
        </h1>
      </div>
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-none">
        <h3 className="text-lg font-bold text-stone-900 mb-3">1. Acceptance of Terms</h3>
        <p className="text-xs font-medium text-stone-500 mb-6 leading-relaxed">By accessing and using GrowthCaption, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you are prohibited from using our services.</p>
        
        <h3 className="text-lg font-bold text-stone-900 mb-3">2. Use License</h3>
        <p className="text-xs font-medium text-stone-500 mb-6 leading-relaxed">You are permitted to use the content and graphics templates generated or exported by GrowthCaption (including custom captions, bios, usernames, hashtags, resized images, grid tiles, and Reel covers) for both personal and commercial purposes. However, you are prohibited from using our services to generate, design, or distribute unlawful, harassing, copyrighted (without permission), or malicious content.</p>

        <h3 className="text-lg font-bold text-stone-900 mb-3">3. Disclaimer</h3>
        <p className="text-xs font-medium text-stone-500 mb-6 leading-relaxed">The materials, text, and graphics design templates on our website are provided on an 'as is' basis. We make no warranties regarding the market success, search engine ranking, or specific audience engagement rates of the captions, hashtags, bios, usernames, or Reel cover graphics designed on our platform.</p>

        <h3 className="text-lg font-bold text-stone-900 mb-3">4. Media Downloader & Design Assets Policy</h3>
        <p className="text-xs font-medium text-stone-500 mb-6 leading-relaxed">Our Reels & Video Downloader and Reel Cover templates are intended for personal or professional branding use with assets that you own or have permission to use. You agree not to download or incorporate third-party copyrighted materials without consent, and you assume full responsibility for complying with Instagram's terms of service, trademark policies, and local copyright laws.</p>

        <h3 className="text-lg font-bold text-stone-900 mb-3">5. Contacting Us</h3>
        <p className="text-xs font-medium text-stone-500 mb-4 leading-relaxed">
          If you have any questions about these terms, the practices of this site, or your dealings with this site, please contact us at:
        </p>
        <div className="bg-white/60 border border-stone-200/80 p-5 rounded-2xl shadow-xs">
          <p className="font-bold text-stone-900 text-sm mb-1">GrowthCaption Support</p>
          <p className="text-xs font-medium text-stone-600">
            Email: <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-bold underline">bhagwan5.dokhale@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

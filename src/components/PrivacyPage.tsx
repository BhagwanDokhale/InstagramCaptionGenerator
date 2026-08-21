import { SEO } from './SEO';
import { openCookieConsent } from '../lib/analytics';
import { PRIVACY_POLICY_LAST_UPDATED } from '../lib/constants';
import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-14 space-y-8">
      <SEO 
        title="Privacy Policy | GrowthCaption"
        description="Read GrowthCaption's privacy policy to understand how we respect user data privacy and media processing security."
        url="https://growthcaption.com/privacy-policy"
      />

      {/* Header */}
      <div className="text-left pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          <Shield size={14} className="text-stone-700" />
          <span>Trust & Privacy</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-stone-500 text-xs md:text-sm max-w-xl">
          We are committed to transparency and protecting your privacy. This policy explains how data is handled across GrowthCaption.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 border border-stone-200 shadow-2xs space-y-6 text-stone-700">
        
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">Your Privacy Matters</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            This Privacy Policy governs the manner in which GrowthCaption collects, uses, maintains, and discloses information collected from users (each, a "User") of the GrowthCaption website. This privacy policy applies to the site and all products and services offered by GrowthCaption.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">Technical Architecture & Data Processing Operations</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            To maintain full transparency, the following section describes how data flows through the specific technological architecture powering GrowthCaption:
          </p>
          <div className="space-y-3 text-xs md:text-sm text-stone-600">
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-stone-900">1. AI Content Generation (Google Gemini API)</h3>
              <p className="leading-relaxed">
                Our AI-powered tools (Caption Generator, Bio Generator, Username Generator, Hashtag Generator, Alt Text Generator, and Brand Kit Generator) process user prompts server-side via encrypted proxy requests connected to the Google Gemini API. User text prompts (such as topic keywords, tone selections, and image descriptions) are transmitted securely to generate creative output. No personal user identifiers, account names, or tracking cookies are attached to these AI generation queries. All secret API keys remain strictly secured in server environment variables and are never exposed to client browsers.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-stone-900">2. Client-Side Image Tools (Photo Resizer, Grid Maker, Feed Planner, Reel Cover Maker)</h3>
              <p className="leading-relaxed">
                All image processing, photo cropping, grid slicing, feed planning, and Reel cover graphics design occur <strong className="text-stone-900">100% client-side within your browser memory</strong> using HTML5 Canvas technology. Any photos, graphics, or images you upload or drop into these tools remain strictly on your local device. <strong className="text-stone-900">Your images are never uploaded, transmitted, stored, or cached on GrowthCaption servers or any external cloud storage.</strong>
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-stone-900">3. Instagram Media & Reels Downloader</h3>
              <p className="leading-relaxed">
                Our media extraction utility processes publicly accessible Instagram URLs to locate available video and image media streams. No Instagram account login or password is required to use this tool, and GrowthCaption does not maintain permanent archives of downloaded media files on our servers.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-stone-900">4. Local Storage & Client Session Persistence</h3>
              <p className="leading-relaxed">
                We utilize browser <strong className="text-stone-900">localStorage</strong> to save non-sensitive, functional user preferences locally on your device (such as Feed Planner image drafts, active tool tab states, and UI preferences). This data resides exclusively in your web browser and can be cleared at any time through your browser settings.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1.5">
              <h3 className="font-semibold text-stone-900">5. Local Creator Workspace</h3>
              <p className="leading-relaxed">
                GrowthCaption provides a local-first <strong className="text-stone-900">Creator Workspace</strong> that allows you to save, organize, and reuse content you create or generate, including captions, hashtag sets, bios, username ideas, Brand Kits, and recent projects.
              </p>
              <p className="leading-relaxed">
                <strong className="text-stone-900">Local Browser Storage & Separation:</strong> Workspace data is stored locally in your browser using browser storage (<code className="text-xs bg-stone-200 px-1 py-0.5 rounded text-stone-800">localStorage</code>) and is not synchronized to a GrowthCaption account.
              </p>
              <p className="leading-relaxed">
                <strong className="text-stone-900">User Control, Import & Export:</strong> You maintain direct control over your workspace data. You can copy, favorite, search, filter, and delete individual items directly through the workspace interface, or export/import JSON backups.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1.5">
              <h3 className="font-semibold text-stone-900">6. Contact Form Submissions & Third-Party Processing (FormSubmit)</h3>
              <p className="leading-relaxed">
                When you submit the contact form on GrowthCaption, the information you provide is transmitted through <strong className="text-stone-900">FormSubmit</strong>, a third-party form-processing and email-forwarding service, so that we can receive and respond to your inquiry.
              </p>
              <p className="leading-relaxed">
                The information transmitted is limited to your name, email address, subject, and message. We use this information solely to evaluate and respond to your inquiry.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-stone-900">7. External APIs, Encryption & Data Security</h3>
              <p className="leading-relaxed">
                All communications between your device, our web application, and backend proxy endpoints are protected using industry-standard SSL/TLS (HTTPS) encryption.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">Web Browser Cookies & Analytics</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            Our website uses cookies and local storage to enhance user experience, remember active tabs, and analyze aggregate traffic patterns when consent is granted.
          </p>
          <div className="my-3 p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">GrowthCaption Analytics Preferences</h3>
              <p className="text-xs text-stone-500">Review, update, or revoke your consent for analytics tracking on this website.</p>
            </div>
            <button
              onClick={() => openCookieConsent()}
              className="px-3.5 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Manage Cookie Preferences
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-2">Contact Us</h2>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            If you have any questions regarding this Privacy Policy, please contact us directly at{' '}
            <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-stone-900 hover:underline font-semibold">
              bhagwan5.dokhale@gmail.com
            </a>.
          </p>
        </div>
        
        <div className="pt-4 border-t border-stone-100">
          <p className="text-xs text-stone-400">Last Updated: {PRIVACY_POLICY_LAST_UPDATED}</p>
        </div>
      </div>
    </div>
  );
}

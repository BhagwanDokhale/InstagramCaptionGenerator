import { SEO } from './SEO';
import { openCookieConsent } from '../lib/analytics';
import { PRIVACY_POLICY_LAST_UPDATED } from '../lib/constants';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="Privacy Policy | GrowthCaption"
        description="Read GrowthCaption's privacy policy to understand how we respect user data privacy and media processing security."
        url="https://growthcaption.com/privacy-policy"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-500 max-w-xl mx-auto">
          We are committed to transparency and protecting your privacy. This page explains how we collect, use, and safeguard your data.
        </p>
      </div>
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/80 bg-white/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-8 max-w-none text-stone-750">
        
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Your Privacy Matters</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            This Privacy Policy governs the manner in which GrowthCaption collects, uses, maintains, and discloses information collected from users (each, a "User") of the GrowthCaption website. This privacy policy applies to the site and all products and services offered by GrowthCaption.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Technical Architecture & Data Processing Operations</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-4">
            To maintain full transparency, the following section describes how data flows through the specific technological architecture powering GrowthCaption:
          </p>
          <div className="space-y-4 text-sm text-stone-600">
            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">1. AI Content Generation (Google Gemini API)</h3>
              <p className="leading-relaxed">
                Our AI-powered tools (Caption Generator, Bio Generator, Username Generator, Hashtag Generator, Alt Text Generator, and Brand Kit Generator) process user prompts server-side via encrypted proxy requests connected to the Google Gemini API. User text prompts (such as topic keywords, tone selections, and image descriptions) are transmitted securely to generate creative output. No personal user identifiers, account names, or tracking cookies are attached to these AI generation queries. All secret API keys remain strictly secured in server environment variables and are never exposed to client browsers.
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">2. Client-Side Image Tools (Photo Resizer, Grid Maker, Feed Planner, Reel Cover Maker)</h3>
              <p className="leading-relaxed">
                All image processing, photo cropping, grid slicing, feed planning, and Reel cover graphics design occur <strong className="text-stone-850">100% client-side within your browser memory</strong> using HTML5 Canvas technology. Any photos, graphics, or images you upload or drop into these tools remain strictly on your local device. <strong className="text-stone-850">Your images are never uploaded, transmitted, stored, or cached on GrowthCaption servers or any external cloud storage.</strong>
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">3. Instagram Media & Reels Downloader</h3>
              <p className="leading-relaxed">
                Our media extraction utility processes publicly accessible Instagram URLs to locate available video and image media streams. No Instagram account login or password is required to use this tool, and GrowthCaption does not maintain permanent archives of downloaded media files on our servers.
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">4. Local Storage & Client Session Persistence</h3>
              <p className="leading-relaxed">
                We utilize browser <strong className="text-stone-850">localStorage</strong> to save non-sensitive, functional user preferences locally on your device (such as Feed Planner image drafts, active tool tab states, and UI preferences). This data resides exclusively in your web browser and can be cleared at any time through your browser settings.
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">5. Local Creator Workspace</h3>
              <p className="leading-relaxed mb-2">
                GrowthCaption provides a local-first <strong className="text-stone-850">Creator Workspace</strong> (available at <code className="text-xs bg-stone-200/60 px-1 py-0.5 rounded text-stone-800">/workspace</code>) that allows you to save, organize, and reuse content you create or generate, including <strong className="text-stone-850">captions</strong>, <strong className="text-stone-850">hashtag sets</strong>, <strong className="text-stone-850">bios</strong>, <strong className="text-stone-850">username ideas</strong>, <strong className="text-stone-850">Brand Kits</strong>, and <strong className="text-stone-850">recent projects</strong>.
              </p>
              <p className="leading-relaxed mb-2">
                <strong className="text-stone-850">Local Browser Storage & Account Separation:</strong> Workspace data is stored locally in your browser using browser storage (<code className="text-xs bg-stone-200/60 px-1 py-0.5 rounded text-stone-800">localStorage</code>) and is not synchronized to a GrowthCaption account. When you save AI-generated content to your Creator Workspace, the saved information is stored locally in your browser. This persistent local storage is separate from temporary server-side generation requests, Contact Form submissions, and analytics cookies.
              </p>
              <p className="leading-relaxed mb-2">
                <strong className="text-stone-850">User Control, Import & Export:</strong> You maintain direct control over your workspace data. You can copy, favorite, search, filter, and delete individual items directly through the workspace interface. You can also export your workspace data as a downloadable JSON backup file to your device or import a compatible backup file. You can remove locally stored Workspace data at any time using the "Clear Workspace" control or by clearing your browser storage.
              </p>
              <p className="leading-relaxed text-xs text-stone-500">
                Because Workspace data is stored locally in your browser, it is not available across different devices or browsers, and it cannot be recovered by GrowthCaption if the relevant browser storage is cleared.
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">6. Contact Form Submissions & Third-Party Processing (FormSubmit)</h3>
              <p className="leading-relaxed mb-2">
                When you submit the contact form on GrowthCaption, the information you provide is transmitted through <strong className="text-stone-850">FormSubmit</strong>, a third-party form-processing and email-forwarding service, so that we can receive, review, and respond to your inquiry.
              </p>
              <p className="leading-relaxed mb-2">
                The information transmitted is limited to the fields provided in our contact form, specifically your <strong className="text-stone-850">name</strong>, <strong className="text-stone-850">email address</strong>, <strong className="text-stone-850">subject</strong>, and <strong className="text-stone-850">message</strong>. We use this information solely to evaluate and respond to your request, provide support, and communicate with you regarding your message.
              </p>
              <p className="leading-relaxed mb-2">
                Because FormSubmit processes form submissions on our behalf, the information you submit is processed by FormSubmit in accordance with its own privacy practices and policies. GrowthCaption does not sell, rent, or trade contact submissions to third parties.
              </p>
              <p className="leading-relaxed text-xs text-stone-500">
                Retention and handling of information submitted through the contact form may also be subject to the third-party service's policies and practices. Users should review <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">FormSubmit's Privacy Policy</a> for details about its processing and retention practices.
              </p>
            </div>

            <div className="bg-stone-50/80 border border-stone-200/60 p-4 rounded-xl">
              <h3 className="font-bold text-stone-850 mb-1">7. External APIs, Encryption & Data Security</h3>
              <p className="leading-relaxed">
                All communications between your device, our web application, and backend proxy endpoints are protected using industry-standard SSL/TLS (HTTPS) encryption. We implement robust access controls and security protocols to prevent unauthorized access, alteration, disclosure, or destruction of technical data.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Data Collection & Information We Collect</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-3">
            GrowthCaption processes information from Users to provide, maintain, and optimize our services:
          </p>
          <div className="space-y-3 text-sm text-stone-600">
            <p>
              <strong className="text-stone-850">Personal Identification Information:</strong> We may collect personal information such as name, email address, or feedback messages when Users voluntarily submit them via contact forms or support inquiries. Users may visit our site anonymously and refuse to supply personal identification information at any time.
            </p>
            <p>
              <strong className="text-stone-850">Technical Information & Request Metadata:</strong> We may process limited technical information, such as IP address and request metadata, for security, abuse prevention, service operation, and analytics where you have provided the applicable consent.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Web Browser Cookies & Advertising Cookies</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-3">
            Our website uses "cookies" and similar tracking technologies (such as local storage and web beacons) to enhance user experience, analyze traffic patterns, and customize content delivery:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-stone-600">
            <li><strong className="text-stone-850">Essential & Functional Cookies:</strong> Required for fundamental site operations, storing tool state preferences (like active tabs), and ensuring fast page load speeds.</li>
            <li><strong className="text-stone-850">Analytics Cookies:</strong> Help us measure site performance, visitor traffic sources, and user engagement metrics across our creator tools when consent is granted.</li>
            <li><strong className="text-stone-850">Advertising & Third-Party Cookies:</strong> If advertising services are enabled in the future, third-party advertising providers may use cookies or similar technologies to deliver and measure advertisements in accordance with applicable consent choices.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Google Analytics</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-3">
            GrowthCaption uses <strong className="text-stone-850">Google Analytics</strong>, a web analytics service provided by Google LLC ("Google"), to understand how visitors interact with our creator tools and optimize site performance.
          </p>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-3">
            <strong className="text-stone-850">Consent-Controlled Activation:</strong> Google Analytics scripts and tracking cookies are strictly loaded only after you explicitly click "Accept Analytics" on our cookie consent banner. If you decline or close the banner without accepting, Google Analytics is not initialized, and tracking scripts are not executed.
          </p>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            You can change or revoke your analytics consent at any time using our on-site cookie preferences tool below, or by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">Google Analytics Opt-out Browser Add-on</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Advertising & Third-Party Advertising</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            GrowthCaption may introduce advertising services in the future. If advertising is enabled, third-party advertising providers may use cookies or similar technologies in accordance with applicable consent choices and this Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">How Users Can Manage Cookie Preferences & Opt-Out</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-3">
            Users have full control over their analytics cookies and preferences:
          </p>
          <div className="my-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">GrowthCaption Analytics Preferences</h3>
              <p className="text-xs text-stone-600">Review, update, or revoke your consent for Google Analytics tracking on this website.</p>
            </div>
            <button
              onClick={() => openCookieConsent()}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Manage Cookie Preferences
            </button>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-stone-600">
            <li>
              <strong className="text-stone-850">Browser Cookie Settings:</strong> You can configure your browser to reject all cookies, accept specific cookies, or alert you when cookies are placed. Note that disabling essential cookies may affect certain functional features on our website.
            </li>
            <li>
              <strong className="text-stone-850">Advertising Opt-Out Resources:</strong> If third-party advertising is enabled in the future, you can manage preferences or opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">Google Ads Settings</a>, <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">www.aboutads.info/choices/</a>, or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">Network Advertising Initiative Opt-Out</a>. European visitors may use <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline font-semibold">Your Online Choices</a>.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Children's Privacy</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            Protecting the privacy of young children is especially important to us. For that reason, GrowthCaption does not knowingly collect or maintain personal identification information from persons under 13 years of age (or under 16 in certain jurisdictions), and no part of our website or services is structured to attract anyone under these ages. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately so we can promptly take appropriate steps to remove such information from our records.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Changes to This Privacy Policy</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            GrowthCaption has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Your Acceptance of These Terms</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed">
            By using this site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site. Your continued use of the site following the posting of changes to this policy will be deemed your acceptance of those changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-2">Contacting Us</h2>
          <p className="text-sm font-normal text-stone-600 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
          </p>
          <div className="bg-white/60 border border-stone-200/80 p-5 rounded-2xl shadow-xs">
            <p className="font-bold text-stone-900 text-sm mb-1">GrowthCaption Support</p>
            <p className="text-xs font-medium text-stone-600">Email: <a href="mailto:bhagwan5.dokhale@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-bold underline">bhagwan5.dokhale@gmail.com</a></p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-stone-100">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Last Updated: {PRIVACY_POLICY_LAST_UPDATED}</p>
        </div>
      </div>
    </div>
  );
}


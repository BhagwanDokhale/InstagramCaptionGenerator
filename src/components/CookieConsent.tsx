import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { setAnalyticsConsent, getAnalyticsConsent } from '../lib/analytics';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getAnalyticsConsent();
    if (consent === null) {
      setIsVisible(true);
    }

    const handleOpen = () => {
      setIsVisible(true);
    };

    window.addEventListener('growthcaption:open-cookie-consent', handleOpen);
    return () => {
      window.removeEventListener('growthcaption:open-cookie-consent', handleOpen);
    };
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 pointer-events-none fade-in">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-5 md:p-6 pointer-events-auto flex flex-col md:flex-row gap-5 items-center justify-between relative overflow-hidden">
        
        <div className="flex-1 pr-6">
          <h2 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
            <span>🍪</span> Cookie & Analytics Preferences
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            We use analytics cookies to measure website traffic and improve our creator tools. Google Analytics is activated only if you click accept. You can choose to accept or decline analytics tracking in accordance with our <a href="/privacy-policy" className="text-indigo-600 underline font-semibold hover:text-indigo-700">Privacy Policy</a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 min-w-max">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all bg-white shadow-sm cursor-pointer"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Accept Analytics
          </button>
        </div>
        
        <button 
          onClick={handleDecline}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

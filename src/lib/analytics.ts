export const GA_MEASUREMENT_ID = 'G-YK9Y29ZBST';
export const CONSENT_STORAGE_KEY = 'cookie-consent';

/**
 * Consent state architecture separating categories:
 * - necessary: Always true for core app operations and storage
 * - analytics: Explicit user choice for Google Analytics
 * - advertising: Future advertising technologies (disabled until CMP/AdSense integration)
 */
export interface ConsentState {
  necessary: boolean;
  analytics: boolean | null;
  advertising: boolean;
  updatedAt?: number;
}

/**
 * DEVELOPER ARCHITECTURE NOTE: Future Google AdSense Integration
 * 
 * Before enabling Google AdSense and personalized advertising for applicable users:
 * 1. Integrate an appropriate Google-certified CMP (Consent Management Platform) and
 *    required consent framework (such as IAB TCF v2.2+ where applicable in EEA/UK/Switzerland).
 * 2. Advertising scripts must only load according to the applicable user consent state.
 * 3. GrowthCaption's built-in cookie banner manages analytics measurement consent and
 *    does NOT make unsupported claims of CMP certification or IAB TCF compliance.
 * 
 * Architecture Flow:
 * Current:
 *   Consent Management -> Analytics Consent -> Google Analytics (gtag.js)
 * 
 * Future (when ads are introduced):
 *   Consent Management / Certified CMP -> Advertising Consent -> Google AdSense (adsbygoogle.js)
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    _gtagLoaded?: boolean;
    initGrowthAnalytics?: () => void;
    disableGrowthAnalytics?: () => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Retrieve the current structured consent state.
 */
export function getConsentState(): ConsentState {
  const analyticsConsent = getAnalyticsConsent();
  return {
    necessary: true,
    analytics: analyticsConsent,
    advertising: false // Advertising disabled until CMP and ad system are integrated
  };
}

/**
 * Check if the user has explicitly granted analytics consent.
 * Returns true if accepted, false if declined, or null if no decision recorded.
 */
export function getAnalyticsConsent(): boolean | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'true') return true;
    if (val === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

/**
 * Initialize Google Analytics only if consent has been granted.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (getAnalyticsConsent() !== true) return;

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  if (window.initGrowthAnalytics) {
    window.initGrowthAnalytics();
  } else {
    if (window._gtagLoaded) return;
    window._gtagLoaded = true;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer?.push(arguments);
      };
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }
}

/**
 * Disable Google Analytics tracking and stop future tracking events.
 */
export function disableAnalytics(): void {
  if (typeof window === 'undefined') return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  if (window.disableGrowthAnalytics) {
    window.disableGrowthAnalytics();
  }
}

/**
 * Save user consent choice and update analytics status accordingly.
 */
export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'true' : 'false');
  } catch (e) {
    console.warn('Unable to persist cookie consent preference:', e);
  }

  if (granted) {
    initAnalytics();
  } else {
    disableAnalytics();
  }
}

/**
 * Open the cookie consent banner to allow user to manage or revoke preferences.
 */
export function openCookieConsent(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('growthcaption:open-cookie-consent'));
}

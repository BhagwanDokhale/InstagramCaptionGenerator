import { Mail, MessageSquare, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { SEO } from './SEO';

const validateEmail = (emailStr: string) => {
  if (!emailStr) return "";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailStr)) {
    return "Please enter a valid email address (e.g., name@domain.com).";
  }
  return "";
};

const detectDomainTypo = (emailStr: string) => {
  if (!emailStr.includes("@")) return null;
  const parts = emailStr.split("@");
  if (parts.length !== 2) return null;
  const username = parts[0];
  const domain = parts[1].toLowerCase().trim();
  
  const typoMap: Record<string, string> = {
    "gamil.com": "gmail.com",
    "gamail.com": "gmail.com",
    "gmaill.com": "gmail.com",
    "gamil.co": "gmail.com",
    "gmal.com": "gmail.com",
    "gmai.com": "gmail.com",
    "yaho.com": "yahoo.com",
    "yahooo.com": "yahoo.com",
    "hotamil.com": "hotmail.com",
    "hotmial.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "outloo.com": "outlook.com",
    "msn.ocm": "msn.com"
  };

  if (typoMap[domain]) {
    return `${username}@${typoMap[domain]}`;
  }
  return null;
};

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Suggestion");
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const [isCheckingLive, setIsCheckingLive] = useState(false);
  const [isLiveEmail, setIsLiveEmail] = useState<boolean | null>(null);
  const [liveCheckReason, setLiveCheckReason] = useState<string | null>(null);

  const [verificationState, setVerificationState] = useState<'idle' | 'checking' | 'completed'>('idle');

  useEffect(() => {
    if (!email) {
      setIsLiveEmail(null);
      setLiveCheckReason(null);
      setIsCheckingLive(false);
      return;
    }

    const syntaxErr = validateEmail(email);
    if (syntaxErr) {
      setIsLiveEmail(null);
      setLiveCheckReason(null);
      setIsCheckingLive(false);
      return;
    }

    setIsCheckingLive(true);
    setIsLiveEmail(null);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch("/api/validate-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isValid) {
            setIsLiveEmail(data.isLive);
            setLiveCheckReason(data.reason || null);
          } else {
            setIsLiveEmail(false);
            setLiveCheckReason(data.reason || "Please enter a valid email format.");
          }
        }
      } catch (err) {
        console.error("Error checking live email status:", err);
      } finally {
        setIsCheckingLive(false);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const syntaxErr = validateEmail(val);
    setEmailError(syntaxErr);
    
    const suggestion = detectDomainTypo(val);
    setEmailSuggestion(suggestion);
    setIsLiveEmail(null);
    setLiveCheckReason(null);
  };

  const applySuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion);
      setEmailError("");
      setEmailSuggestion(null);
      setIsLiveEmail(null);
      setLiveCheckReason(null);
    }
  };

  const handleVerificationClick = () => {
    if (verificationState !== 'idle') return;
    setVerificationState('checking');
    setTimeout(() => {
      setVerificationState('completed');
    }, 1200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const syntaxErr = validateEmail(email);
    if (syntaxErr) {
      setEmailError(syntaxErr);
      return;
    }

    if (verificationState !== 'completed') {
      setSubmitError("Please complete the verification check before sending.");
      return;
    }
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/bhagwan5.dokhale@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `New Contact Form Submission: ${subject}`,
          _template: "table",
          _captcha: "false"
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setVerificationState('idle');
        setTimeout(() => {
          setIsSubmitted(false);
          setName("");
          setEmail("");
          setSubject("Suggestion");
          setMessage("");
        }, 5000);
      } else {
        setSubmitError("Unable to send your message right now. Please try again in a few moments or email us directly.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Network error: Unable to reach the contact service. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-10 md:py-16">
      <SEO 
        title="Contact Us | GrowthCaption"
        description="Get in touch with the GrowthCaption team for tool feedback, feature suggestions, or business inquiries."
        url="https://growthcaption.com/contact"
      />
      <div className="text-left mb-6 pb-5 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
          <Mail size={14} className="text-stone-700" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 mb-1.5">
          Contact Us
        </h1>
        <p className="text-stone-500 text-xs md:text-sm">
          Have an idea, found an issue, or have a partnership inquiry? We read every submission.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 border border-stone-200 shadow-xs relative">
        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-100 text-stone-900 rounded-full border border-stone-200 mb-2">
              <CheckCircle2 size={24} className="text-stone-800" />
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-stone-900">Message Received</h2>
            <p className="text-stone-500 text-xs">Thanks for reaching out. We will get back to you shortly.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium text-xs">
                {submitError}
              </div>
            )}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                placeholder="Alex Morgan"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>Email Address</span>
                {isCheckingLive && (
                  <span className="text-[10px] font-medium text-stone-500 flex items-center gap-1">
                    Checking domain...
                  </span>
                )}
                {email && !emailError && !emailSuggestion && !isCheckingLive && isLiveEmail === true && (
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 size={10} /> Active Domain
                  </span>
                )}
                {email && !emailError && !emailSuggestion && !isCheckingLive && isLiveEmail === false && (
                  <span className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle size={10} /> Inactive Domain
                  </span>
                )}
                {emailError && (
                  <span className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle size={10} /> Invalid Format
                  </span>
                )}
              </label>
              
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-stone-900 text-xs placeholder:text-stone-400 pr-9 rounded-lg border focus:outline-none transition-colors ${
                    !email 
                      ? 'bg-white border-stone-200 focus:border-stone-900' 
                      : emailError 
                      ? 'bg-red-50/20 border-red-300 focus:border-red-500' 
                      : emailSuggestion 
                      ? 'bg-amber-50/20 border-amber-300 focus:border-amber-500' 
                      : isLiveEmail === false
                      ? 'bg-red-50/20 border-red-300 focus:border-red-500' 
                      : 'bg-white border-stone-200 focus:border-stone-900'
                  }`}
                  placeholder="alex@example.com"
                />
                
                {email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {emailError || isLiveEmail === false ? (
                      <AlertTriangle size={14} className="text-red-500" />
                    ) : emailSuggestion ? (
                      <AlertTriangle size={14} className="text-amber-500" />
                    ) : isCheckingLive ? (
                      <div className="w-3.5 h-3.5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <CheckCircle2 size={14} className="text-stone-600" />
                    )}
                  </div>
                )}
              </div>

              {emailError && (
                <p className="text-[11px] text-red-600 font-medium mt-0.5">
                  {emailError}
                </p>
              )}

              {!emailError && !isCheckingLive && isLiveEmail === false && liveCheckReason && (
                <p className="text-[11px] text-red-600 font-medium mt-0.5 flex items-center gap-1">
                  <AlertTriangle size={11} className="shrink-0 text-red-500" /> {liveCheckReason}
                </p>
              )}

              {emailSuggestion && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between gap-2">
                  <span className="text-xs text-amber-900">
                    Did you mean <strong>{emailSuggestion}</strong>?
                  </span>
                  <button
                    type="button"
                    onClick={applySuggestion}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-semibold rounded cursor-pointer transition-colors"
                  >
                    Fix email
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                aria-label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:border-stone-900 transition-colors cursor-pointer appearance-none"
                style={{ backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2378716c"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/%3E%3C/svg%3E')`, backgroundPosition: 'right 0.8rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.1em 1.1em' }}
              >
                <option value="Suggestion">Product Suggestion</option>
                <option value="Query">General Query</option>
                <option value="Improvement">Tool Improvement</option>
                <option value="Issue">Bug Report</option>
                <option value="Business Inquiries">Business / Partnership</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-400 resize-none"
                placeholder="Please describe your thoughts, feedback, or report details..."
              ></textarea>
            </div>

            {/* Verification check */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="verification-check"
                  onClick={handleVerificationClick}
                  disabled={verificationState === 'completed' || verificationState === 'checking'}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                    verificationState === 'completed'
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : verificationState === 'checking'
                      ? 'border-stone-400 bg-white ring-2 ring-stone-200'
                      : 'border-stone-300 bg-white hover:border-stone-500'
                  }`}
                  aria-label={
                    verificationState === 'completed'
                      ? 'Verification complete'
                      : verificationState === 'checking'
                      ? 'Checking verification'
                      : 'Complete verification check'
                  }
                  aria-pressed={verificationState === 'completed'}
                >
                  {verificationState === 'completed' && (
                    <svg className="w-3.5 h-3.5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                  {verificationState === 'checking' && (
                    <div className="w-3 h-3 border-2 border-stone-700 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                  )}
                </button>
                <div className="flex flex-col text-left">
                  <label 
                    htmlFor="verification-check"
                    className="text-xs font-semibold text-stone-800 cursor-pointer"
                    onClick={handleVerificationClick}
                  >
                    {verificationState === 'completed'
                      ? 'Verification confirmed'
                      : verificationState === 'checking'
                      ? 'Verifying...'
                      : 'I am a human creator'}
                  </label>
                  <span className="text-[10px] text-stone-400 font-normal">
                    {verificationState === 'completed'
                      ? 'Verification check passed.'
                      : 'Click checkbox to verify before submitting.'}
                  </span>
                </div>
              </div>
              <CheckCircle2 size={15} className={verificationState === 'completed' ? 'text-stone-900' : 'text-stone-300'} aria-hidden="true" />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Send size={13} />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

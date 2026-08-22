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
    <div className="max-w-2xl mx-auto w-full px-4 py-12 md:py-20">
      <SEO 
        title="Contact Us | GrowthCaption"
        description="Get in touch with the GrowthCaption team for tool feedback, feature suggestions, or business inquiries."
        url="https://growthcaption.com/contact"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-900 mb-4">
          Contact Us
        </h1>
        <p className="text-stone-500 font-medium text-base md:text-lg">
          Have an idea, found a bug, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none -z-10"></div>

        {isSubmitted ? (
          <div className="text-center py-16 space-y-6 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 mb-4 shadow-sm animate-bounce">
              <Send size={32} className="ml-1" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Message Sent!</h2>
            <p className="text-stone-500 font-medium text-sm">Thanks for reaching out. We will get back to you shortly.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 relative z-10"
          >
            {submitError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 font-bold text-sm">
                {submitError}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200/80 rounded-xl text-stone-850 font-medium text-sm placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all text-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-stone-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="flex items-center gap-2"><Mail size={14} className="text-indigo-600" /> Email Address</span>
                {isCheckingLive && (
                  <span className="text-[10px] font-bold text-indigo-600 animate-pulse flex items-center gap-1">
                    Checking live status...
                  </span>
                )}
                {email && !emailError && !emailSuggestion && !isCheckingLive && isLiveEmail === true && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 size={10} /> Active & Live Domain
                  </span>
                )}
                {email && !emailError && !emailSuggestion && !isCheckingLive && isLiveEmail === false && (
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertTriangle size={10} /> Inactive Mail Domain
                  </span>
                )}
                {email && !emailError && !emailSuggestion && !isCheckingLive && isLiveEmail === null && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 size={10} /> Valid Format
                  </span>
                )}
                {emailError && (
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertTriangle size={10} /> Invalid Email
                  </span>
                )}
                {email && emailSuggestion && (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertTriangle size={10} /> Potential Typo
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
                  className={`w-full px-4 py-3 font-medium text-stone-850 text-sm placeholder:text-stone-400 pr-10 rounded-xl border focus:outline-none transition-all ${
                    !email 
                      ? 'bg-stone-50/50 border-stone-200/80 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50' 
                      : emailError 
                      ? 'bg-rose-50/10 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-100/50' 
                      : emailSuggestion 
                      ? 'bg-amber-50/10 border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-100/50' 
                      : isLiveEmail === false
                      ? 'bg-rose-50/10 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-100/50'
                      : isLiveEmail === true
                      ? 'bg-emerald-50/10 border-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100/50'
                      : 'bg-emerald-50/10 border-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100/50'
                  }`}
                  placeholder="john@example.com"
                />
                
                {email && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {emailError || isLiveEmail === false ? (
                      <AlertTriangle size={16} className="text-rose-500" />
                    ) : emailSuggestion ? (
                      <AlertTriangle size={16} className="text-amber-500" />
                    ) : isCheckingLive ? (
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                )}
              </div>

              {emailError && (
                <p className="text-[11px] text-rose-600 font-bold mt-1 pl-1">
                  {emailError}
                </p>
              )}

              {!emailError && !isCheckingLive && isLiveEmail === false && liveCheckReason && (
                <p className="text-[11px] text-rose-600 font-bold mt-1 pl-1 flex items-center gap-1">
                  <AlertTriangle size={11} className="shrink-0 text-rose-500" /> {liveCheckReason}
                </p>
              )}

              {!emailError && !isCheckingLive && isLiveEmail === true && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 pl-1 flex items-center gap-1">
                  <CheckCircle2 size={11} className="shrink-0 text-emerald-500" /> This email domain is active and can receive messages.
                </p>
              )}

              {emailSuggestion && (
                <div className="mt-2.5 p-3.5 bg-amber-50/50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                    Did you mean <strong className="text-amber-800">{emailSuggestion}</strong>?
                  </span>
                  <button
                    type="button"
                    onClick={applySuggestion}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer self-start sm:self-auto transition-all shadow-sm"
                  >
                    Yes, fix it!
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                aria-label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200/80 rounded-xl text-stone-850 font-medium text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2378716c"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/%3E%3C/svg%3E')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
              >
                <option value="Suggestion">Suggestion</option>
                <option value="Query">Query</option>
                <option value="Improvement">Improvement</option>
                <option value="Issue">Issue</option>
                <option value="Business Inquiries">Business Inquiries</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <MessageSquare size={14} className="text-indigo-600" /> Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200/80 rounded-xl text-stone-850 font-medium text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100/50 transition-all placeholder:text-stone-400 resize-none"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>

            {/* Verification check */}
            <div className="p-4 bg-stone-50/60 border border-stone-200/80 rounded-2xl flex items-center justify-between shadow-2xs select-none">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  id="verification-check"
                  onClick={handleVerificationClick}
                  disabled={verificationState === 'completed' || verificationState === 'checking'}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer outline-none ${
                    verificationState === 'completed'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                      : verificationState === 'checking'
                      ? 'border-indigo-400 bg-white ring-2 ring-indigo-100/50'
                      : 'border-stone-300 bg-white hover:border-stone-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100/50'
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
                    <svg className="w-3.5 h-3.5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                  {verificationState === 'checking' && (
                    <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                  )}
                </button>
                <div className="flex flex-col text-left">
                  <label 
                    htmlFor="verification-check"
                    className="text-xs font-bold text-stone-850 cursor-pointer"
                    onClick={handleVerificationClick}
                  >
                    {verificationState === 'completed'
                      ? 'Verification complete'
                      : verificationState === 'checking'
                      ? 'Checking...'
                      : 'Verification check'}
                  </label>
                  <span className="text-[11px] text-stone-500 font-medium" aria-live="polite">
                    {verificationState === 'completed'
                      ? 'Verification complete.'
                      : verificationState === 'checking'
                      ? 'Please wait while we complete the verification check.'
                      : 'Click to complete the verification check.'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold shrink-0">
                <CheckCircle2 size={16} className={verificationState === 'completed' ? 'text-emerald-600' : 'text-stone-300'} aria-hidden="true" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              Send Message
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

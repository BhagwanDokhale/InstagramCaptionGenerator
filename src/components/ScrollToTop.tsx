import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 bg-pink-500 text-white rounded-full shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] focus:outline-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}

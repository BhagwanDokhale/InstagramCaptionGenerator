import React from 'react';
import { navigateTo } from '../../lib/navigation';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const InternalLink: React.FC<InternalLinkProps> = ({ href, children, className }) => {
  const baseClasses = "text-indigo-600 hover:text-indigo-800 font-bold underline decoration-indigo-200 hover:decoration-indigo-500 underline-offset-2 transition-colors cursor-pointer";
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigateTo(href);
      }}
      className={className ? `${baseClasses} ${className}` : baseClasses}
    >
      {children}
    </a>
  );
};

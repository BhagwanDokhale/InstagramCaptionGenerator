import React from 'react';
import { ListOrdered } from 'lucide-react';

export interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const handleScroll = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 md:p-6 my-8">
      <div className="flex items-center gap-2 mb-4 text-stone-900 font-bold text-sm uppercase tracking-wider border-b border-stone-200 pb-3">
        <ListOrdered size={16} className="text-stone-700 shrink-0" />
        <span>Table of Contents</span>
      </div>
      <nav aria-label="Table of Contents">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-xs md:text-sm text-stone-700 font-medium">
          {items.map((item, idx) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScroll(item.id, e)}
                className="hover:text-stone-900 hover:underline transition-colors flex items-start gap-2 py-0.5"
              >
                <span className="text-stone-500 font-bold shrink-0">{idx + 1}.</span>
                <span className="line-clamp-2">{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};



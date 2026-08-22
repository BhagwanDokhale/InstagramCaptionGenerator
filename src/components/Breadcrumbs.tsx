import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem, inferBreadcrumbsFromUrl } from '../lib/schema';
import { navigateTo, getRouteFromPath, TabType } from '../lib/navigation';
import { PageType } from '../types';

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  setActivePage?: (page: PageType) => void;
  setActiveTab?: (tab: TabType) => void;
  className?: string;
}

export function Breadcrumbs({ items, setActivePage, setActiveTab, className = '' }: BreadcrumbsProps) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const listItems = items && items.length > 0 ? items : inferBreadcrumbsFromUrl(currentPath);

  if (!listItems || listItems.length <= 1) return null;

  const handleClick = (e: React.MouseEvent, item: BreadcrumbItem, isLast: boolean) => {
    if (isLast) {
      e.preventDefault();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    const route = getRouteFromPath(item.url);
    if (setActivePage) {
      setActivePage(route.page);
    }
    if (setActiveTab && route.tab) {
      setActiveTab(route.tab);
    }
    navigateTo(item.url);
  };

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 flex items-center ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs font-medium text-stone-500">
        {listItems.map((item, index) => {
          const isLast = index === listItems.length - 1;
          const isHome = index === 0 && item.url === '/';

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={12} className="text-stone-400 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  onClick={(e) => handleClick(e, item, isLast)}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1 outline-none text-stone-600 font-semibold"
                >
                  {isHome && <Home size={12} className="shrink-0 text-stone-500" />}
                  <span>{item.name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

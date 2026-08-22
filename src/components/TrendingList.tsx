import { TrendingTemplate } from '../types';
import { CaptionItem } from './CaptionItem';
import { Flame } from 'lucide-react';

const TRENDING_TEMPLATES: TrendingTemplate[] = [
  {
    category: "Travel",
    text: "Catch flights, not feelings. ✈️🌍 Let the adventure begin!"
  },
  {
    category: "Business",
    text: "Building an empire, one coffee at a time. ☕📈 #Hustle #Entrepreneur"
  },
  {
    category: "Fitness",
    text: "Sweat early, shine all day. 💪✨"
  },
  {
    category: "Love",
    text: "You are my today and all of my tomorrows. ❤️"
  },
  {
    category: "Attitude",
    text: "They told me I couldn't. That's why I did. 🔥"
  }
];

export function TrendingList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 bg-white px-4 py-2.5 rounded-xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] inline-flex">
        <Flame className="text-rose-500 animate-pulse" size={16} />
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">Trending Templates</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRENDING_TEMPLATES.map((item, i) => (
          <CaptionItem key={i} text={item.text} />
        ))}
      </div>
    </div>
  );
}

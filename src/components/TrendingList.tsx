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
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Flame className="text-stone-700" size={14} />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Popular Templates</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TRENDING_TEMPLATES.map((item, i) => (
          <CaptionItem key={i} text={item.text} category={item.category} />
        ))}
      </div>
    </div>
  );
}

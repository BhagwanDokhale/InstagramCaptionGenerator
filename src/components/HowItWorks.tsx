import React from 'react';
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { TabType } from '../lib/navigation';

export interface HowItWorksStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface HowItWorksData {
  title: string;
  steps: HowItWorksStep[];
}

export const HOW_IT_WORKS_MAP: Record<string, HowItWorksData> = {
  captions: {
    title: 'How the Caption Generator Works',
    steps: [
      {
        number: '01',
        icon: '✍️',
        title: 'Describe Your Post',
        description: 'Enter a short description of your photo, video, or post.'
      },
      {
        number: '02',
        icon: '🎭',
        title: 'Choose Your Tone',
        description: 'Select the style that fits your content, such as professional, funny, friendly, inspirational, or casual.'
      },
      {
        number: '03',
        icon: '🌐',
        title: 'Select Your Platform',
        description: 'Choose the social platform or format you want the caption for.'
      },
      {
        number: '04',
        icon: '✨',
        title: 'Generate Captions',
        description: 'Generate multiple caption ideas based on your description and selected preferences.'
      },
      {
        number: '05',
        icon: '📋',
        title: 'Copy & Customize',
        description: 'Choose your favorite caption, make any edits you want, and copy it for your post.'
      }
    ]
  },
  comments: {
    title: 'How the Comment Generator Works',
    steps: [
      {
        number: '01',
        icon: '📝',
        title: 'Describe the Post',
        description: 'Tell the tool what the post is about.'
      },
      {
        number: '02',
        icon: '🎨',
        title: 'Choose a Style',
        description: 'Select the type of comment you want.'
      },
      {
        number: '03',
        icon: '💬',
        title: 'Set the Tone',
        description: 'Choose a tone that matches the conversation.'
      },
      {
        number: '04',
        icon: '⚡',
        title: 'Generate Comments',
        description: 'Create comment ideas based on your selections.'
      },
      {
        number: '05',
        icon: '✂️',
        title: 'Copy & Personalize',
        description: 'Choose a comment and personalize it before posting.'
      }
    ]
  },
  bios: {
    title: 'How the Instagram Bio Generator Works',
    steps: [
      {
        number: '01',
        icon: '👤',
        title: 'Describe Yourself',
        description: 'Tell us about yourself, your brand, or your niche.'
      },
      {
        number: '02',
        icon: '🎨',
        title: 'Choose Your Style',
        description: 'Select a professional, creative, funny, minimal, or other style.'
      },
      {
        number: '03',
        icon: '🔑',
        title: 'Add Your Keywords',
        description: 'Include important words that describe you or your brand.'
      },
      {
        number: '04',
        icon: '✨',
        title: 'Generate Bio Ideas',
        description: 'Generate several bio options based on your information.'
      },
      {
        number: '05',
        icon: '📋',
        title: 'Copy & Customize',
        description: 'Choose your favorite bio and customize it for your profile.'
      }
    ]
  },
  usernames: {
    title: 'How the Username Generator Works',
    steps: [
      {
        number: '01',
        icon: '🔤',
        title: 'Enter Your Keywords',
        description: 'Add your name, niche, interests, or keywords.'
      },
      {
        number: '02',
        icon: '🎨',
        title: 'Choose a Style',
        description: 'Select a style such as aesthetic, professional, creative, or minimal.'
      },
      {
        number: '03',
        icon: '⚡',
        title: 'Generate Ideas',
        description: 'Create username ideas based on your inputs.'
      },
      {
        number: '04',
        icon: '🔍',
        title: 'Review Suggestions',
        description: 'Compare the generated username ideas.'
      },
      {
        number: '05',
        icon: '✅',
        title: 'Check Availability',
        description: 'Choose your favorite idea and verify its availability on the platform before using it.'
      }
    ]
  },
  hashtags: {
    title: 'How the Hashtag Generator Works',
    steps: [
      {
        number: '01',
        icon: '💡',
        title: 'Enter Your Topic',
        description: 'Describe your post, niche, or topic.'
      },
      {
        number: '02',
        icon: '📂',
        title: 'Choose Your Category',
        description: 'Select the category that best matches your content.'
      },
      {
        number: '03',
        icon: '#️⃣',
        title: 'Generate Hashtags',
        description: 'Create relevant hashtag ideas.'
      },
      {
        number: '04',
        icon: '🎯',
        title: 'Review the Results',
        description: 'Choose hashtags that are genuinely relevant to your post.'
      },
      {
        number: '05',
        icon: '📋',
        title: 'Copy & Customize',
        description: 'Create your final hashtag set and copy it for your post.'
      }
    ]
  },
  alttext: {
    title: 'How the ALT Text Generator Works',
    steps: [
      {
        number: '01',
        icon: '🖼️',
        title: 'Upload Your Image',
        description: 'Select the image you want to describe.'
      },
      {
        number: '02',
        icon: '📝',
        title: 'Add Context',
        description: 'Provide optional information about the image.'
      },
      {
        number: '03',
        icon: '⚡',
        title: 'Generate ALT Text',
        description: 'Create a concise description of the image.'
      },
      {
        number: '04',
        icon: '🔎',
        title: 'Review the Description',
        description: 'Make sure the description accurately represents the image.'
      },
      {
        number: '05',
        icon: '📋',
        title: 'Copy & Use',
        description: 'Add the final ALT text wherever it is appropriate.'
      }
    ]
  },
  brandkit: {
    title: 'How the Brand Kit Generator Works',
    steps: [
      {
        number: '01',
        icon: '🏷️',
        title: 'Enter Your Brand',
        description: 'Add your brand name and description.'
      },
      {
        number: '02',
        icon: '🎨',
        title: 'Choose Your Style',
        description: 'Select a visual style that matches your brand.'
      },
      {
        number: '03',
        icon: '🌈',
        title: 'Choose Your Colors',
        description: 'Select or generate a suitable color palette.'
      },
      {
        number: '04',
        icon: '🛠️',
        title: 'Build Your Brand Kit',
        description: 'Generate your brand colors, fonts, voice, bio ideas, and related elements.'
      },
      {
        number: '05',
        icon: '💾',
        title: 'Customize & Save',
        description: 'Review the results and customize your brand kit for your needs.'
      }
    ]
  },
  resizer: {
    title: 'How the Photo Resizer Works',
    steps: [
      {
        number: '01',
        icon: '📸',
        title: 'Upload Your Photo',
        description: 'Select the image you want to resize.'
      },
      {
        number: '02',
        icon: '📐',
        title: 'Choose a Format',
        description: 'Select a standard social media size or enter custom dimensions.'
      },
      {
        number: '03',
        icon: '🔍',
        title: 'Position Your Image',
        description: 'Use the interactive controls to position and zoom your photo.'
      },
      {
        number: '04',
        icon: '👁️',
        title: 'Preview the Result',
        description: 'Check how your image will appear at the selected dimensions.'
      },
      {
        number: '05',
        icon: '⬇️',
        title: 'Download Your Image',
        description: 'Download the resized image to your device.'
      }
    ]
  },
  grid: {
    title: 'How the Instagram Grid Maker Works',
    steps: [
      {
        number: '01',
        icon: '🖼️',
        title: 'Upload Your Image',
        description: 'Select the large image you want to split.'
      },
      {
        number: '02',
        icon: '📐',
        title: 'Choose Your Grid',
        description: 'Select the grid layout you want to create.'
      },
      {
        number: '03',
        icon: '👁️',
        title: 'Preview the Grid',
        description: 'Check how the image will be divided.'
      },
      {
        number: '04',
        icon: '⬇️',
        title: 'Download the Tiles',
        description: 'Download the individual grid images.'
      },
      {
        number: '05',
        icon: '📲',
        title: 'Upload Them in Order',
        description: 'Upload the generated tiles to Instagram in the correct sequence.'
      }
    ]
  },
  planner: {
    title: 'How the Instagram Feed Planner Works',
    steps: [
      {
        number: '01',
        icon: '📷',
        title: 'Upload Your Photos',
        description: 'Add the images you want to plan.'
      },
      {
        number: '02',
        icon: '🖐️',
        title: 'Arrange Your Posts',
        description: 'Drag and reorder your photos.'
      },
      {
        number: '03',
        icon: '👁️',
        title: 'Preview Your Feed',
        description: 'See how your profile grid will look.'
      },
      {
        number: '04',
        icon: '⚙️',
        title: 'Adjust the Layout',
        description: 'Experiment with different arrangements.'
      },
      {
        number: '05',
        icon: '🎯',
        title: 'Finalize Your Plan',
        description: 'Use the final arrangement as a guide when publishing your posts.'
      }
    ]
  },
  cover: {
    title: 'How the Reel Cover Maker Works',
    steps: [
      {
        number: '01',
        icon: '📹',
        title: 'Upload Your Image',
        description: 'Choose an image for your Reel cover.'
      },
      {
        number: '02',
        icon: '📐',
        title: 'Choose Your Layout',
        description: 'Select the desired Reel cover format.'
      },
      {
        number: '03',
        icon: '🎯',
        title: 'Position Your Image',
        description: 'Adjust the image framing and placement.'
      },
      {
        number: '04',
        icon: '🎨',
        title: 'Add Your Design',
        description: 'Customize text or visual elements if supported by the existing tool.'
      },
      {
        number: '05',
        icon: '⬇️',
        title: 'Download Your Cover',
        description: 'Download the finished cover and use it for your Reel.'
      }
    ]
  }
};

export interface HowItWorksProps {
  tab?: TabType;
  title?: string;
  steps?: HowItWorksStep[];
  className?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ tab, title, steps, className = '' }) => {
  const data = tab ? HOW_IT_WORKS_MAP[tab] : (title && steps ? { title, steps } : null);

  if (!data || !data.steps || data.steps.length === 0) {
    return null;
  }

  return (
    <section 
      aria-label={data.title}
      className={`w-full max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-8 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] my-10 md:my-14 ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} className="text-rose-500" />
          <span>Step-by-Step Process</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
          {data.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
        {data.steps.map((step, idx) => (
          <div 
            key={idx} 
            className="flex flex-col relative group how-it-works-card"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex-1 bg-stone-50/90 hover:bg-white rounded-2xl p-5 border border-stone-200/70 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-indigo-600 bg-indigo-50/90 px-2.5 py-1 rounded-lg border border-indigo-100/80">
                    {step.number}
                  </span>
                  <div 
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-indigo-200 transition-all"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-stone-900 mb-1.5 leading-snug group-hover:text-indigo-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Desktop Connector Arrow */}
            {idx < data.steps.length - 1 && (
              <div 
                className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-stone-200/80 text-stone-400 items-center justify-center shadow-xs" 
                aria-hidden="true"
              >
                <ArrowRight size={13} className="text-stone-400" />
              </div>
            )}

            {/* Mobile Connector Arrow */}
            {idx < data.steps.length - 1 && (
              <div 
                className="flex lg:hidden justify-center my-1 text-stone-300" 
                aria-hidden="true"
              >
                <ArrowDown size={14} className="text-stone-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

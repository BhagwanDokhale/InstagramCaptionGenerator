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
      className={`w-full max-w-5xl mx-auto bg-white rounded-xl border border-stone-200 p-6 md:p-8 shadow-xs my-8 ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-stone-900">
          {data.title}
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Step-by-step walkthrough to get the best output
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {data.steps.map((step, idx) => (
          <div 
            key={idx} 
            className="bg-stone-50 rounded-lg p-3.5 border border-stone-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold text-stone-500 bg-stone-200/70 px-1.5 py-0.5 rounded">
                  {step.number}
                </span>
                <span className="text-base" aria-hidden="true">
                  {step.icon}
                </span>
              </div>
              <h3 className="text-xs font-semibold text-stone-900 mb-1 leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

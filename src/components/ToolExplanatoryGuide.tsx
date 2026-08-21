import { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Link2, 
  Info, 
  FileText, 
  Lock, 
  Lightbulb,
  Grid,
  Image as ImageIcon,
  UserCircle,
  Hash,
  Palette,
  LayoutGrid,
  Download,
  Video
} from 'lucide-react';
import { TabType } from '../lib/navigation';

export interface ToolGuideData {
  tab: TabType;
  title: string;
  subtitle: string;
  whatItDoes: string;
  howToUseSteps: string[];
  supportedFormatsOrUrls: {
    label: string;
    items: string[];
  };
  troubleshootingTips: {
    issue: string;
    solution: string;
  }[];
  privacyDetails: string;
  appropriateUseGuidance: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedTools: {
    tab: TabType;
    name: string;
    description: string;
  }[];
}

export const TOOL_GUIDES: Record<TabType, ToolGuideData> = {
  downloader: {
    tab: 'downloader',
    title: 'Instagram Reels Downloader Guide',
    subtitle: 'Comprehensive guide to extracting, downloading, and troubleshooting public Instagram media.',
    whatItDoes: 'The Instagram Reels Downloader by GrowthCaption is a web utility designed to help creators, educators, and researchers download available media from supported public Instagram Reel, video, and carousel post URLs. Whether you need to archive your own published content, save reference clips for creative projects, or extract an audio stream as an MP3 file, the tool allows you to retrieve available public media without requiring an Instagram login or software installation.\n\nThe tool processes supported public Instagram URLs—including Reels, feed videos, and multi-image carousel posts—to identify available media files provided by the public source. Once processed, you can choose to preview items and download available MP4 video files, JPEG/PNG images, or extracted MP3 audio streams directly in your browser.\n\nWhen a multi-slide carousel URL is entered, the tool retrieves the individual image and video slides so you can preview and save specific items. The downloader works in standard web browsers across desktop and mobile devices without requiring account credentials, passwords, or personal cookies.',
    howToUseSteps: [
      'Open Instagram on your phone or browser and navigate to any public Reel, video, photo, or carousel post.',
      'Tap the share icon or three dots, then click "Copy Link".',
      'Paste the Instagram link (or multiple links separated by new lines) into the input field above.',
      'Click "Extract Media & Links" to analyze and process the media URL.',
      'Preview the parsed media items, select your desired download format (MP4, MP3, JPG, or PNG), and click "Download".'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Instagram URL Formats',
      items: [
        'Reels: https://www.instagram.com/reel/Cxxxxxx/',
        'Feed Posts & Videos: https://www.instagram.com/p/Cxxxxxx/',
        'Carousel Posts (Multiple Photos/Videos): https://www.instagram.com/p/Cxxxxxx/',
        'IGTV Videos: https://www.instagram.com/tv/Cxxxxxx/',
        'Short Share Links: https://instagr.am/p/Cxxxxxx/',
        'Mobile App Share URLs (with tracking query parameters automatically stripped)'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Private Account Content',
        solution: 'Our server cannot extract media from private accounts because Instagram requires login authentication. Make sure the content is published on a public account.'
      },
      {
        issue: 'Expired or Broken Links',
        solution: 'If a post was removed, archived, or contains a broken link, verify that the link opens properly in an incognito browser tab.'
      },
      {
        issue: 'Temporary Delay / Rate Limits',
        solution: 'If processing takes longer than expected during peak traffic hours, wait 15–20 seconds before submitting a new URL batch.'
      },
      {
        issue: 'Saving Files on iPhone / iOS Safari',
        solution: 'Tap "Download", then open Safari Downloads menu (down arrow icon in address bar) to save the file to your Photos app or Files directory.'
      }
    ],
    privacyDetails: 'No Instagram account login or password is required to use this tool. GrowthCaption processes supported public URLs without requesting your account credentials or personal cookies.',
    appropriateUseGuidance: 'This downloader is built strictly for personal archiving, bookmarking inspirational media, offline educational reference, and creator research. Always respect intellectual property rights and copyright laws. Do not republish downloaded content as your own without permission and proper attribution to the original creator.',
    faqs: [
      {
        question: 'Is this Instagram Downloader free to use?',
        answer: 'Yes. GrowthCaption provides a free web tool to download available media from supported public Instagram links without requiring account registration.'
      },
      {
        question: 'Can I extract audio as an MP3 file from an Instagram Reel?',
        answer: 'Yes. When processing supported video URLs, the tool can extract the audio stream so you can save an MP3 audio file to your device.'
      },
      {
        question: 'What quality are downloaded videos and photos?',
        answer: 'The available download quality depends on the media provided by the supported public source. GrowthCaption retrieves available media streams from the public URL and does not guarantee a specific resolution.'
      },
      {
        question: 'Can I download entire carousel slider posts?',
        answer: 'Yes. When you enter a supported public carousel URL, the tool retrieves available image and video slides so you can preview and download individual items.'
      }
    ],
    relatedTools: [
      { tab: 'cover', name: 'Reel Cover Maker', description: 'Design 9:16 vertical Reel covers with centered 1:1 profile safe zones.' },
      { tab: 'planner', name: 'Feed Planner', description: 'Simulate and drag-and-drop your upcoming Instagram posts before publishing.' },
      { tab: 'captions', name: 'Caption Generator', description: 'Generate Instagram caption ideas based on your topic, tone, and audience.' }
    ]
  },

  comments: {
    tab: 'comments',
    title: 'Instagram Comment Generator Guide',
    subtitle: 'Generate authentic, witty, supportive, and conversation-starting Instagram comments in seconds.',
    whatItDoes: 'The AI Instagram Comment Generator by GrowthCaption is an intelligent social engagement tool designed to help creators, brands, social media managers, and community builders write natural, respectful Instagram comment ideas. Leaving thoughtful comments on posts within your niche is a great way to participate in conversations, build creator relationships, and engage with community members. However, coming up with unique, non-spammy comments for dozens of posts daily can quickly become exhausting.\n\nThis tool solves engagement fatigue by generating authentic, human-sounding comment variations tailored to any post topic, caption, or uploaded photo. You can select from a wide range of comment vibes—including Supportive, Funny & Witty, Complimentary, Professional, Short & Snappy, or Question Starters that encourage post authors to reply. With optional multimodal AI Vision support, you can even upload a screenshot or photo of an Instagram post, allowing the generator to analyze visual details (like outfits, locations, colors, or objects) and craft hyper-specific, genuine comment suggestions.\n\nEvery comment is crafted to sound natural and spontaneous—avoiding generic bot phrases like "nice post!" or "great content!". The generator also includes an interactive Instagram Feed preview modal, inline text editor, and practical commenting tips to help you engage thoughtfully on social media.',
    howToUseSteps: [
      'Enter the post caption or topic (or upload a photo/screenshot of the post).',
      'Select your desired comment vibe (e.g., Hype, Funny, Complimentary, Question, Professional).',
      'Choose your relationship to the author (e.g., Friend, Influencer, Colleague, Brand).',
      'Toggle emojis on or off according to your style preference.',
      'Click "Generate Instagram Comments" to get 6 tailored comment variations.',
      'Preview on the interactive feed mockup, copy your favorite, or edit text inline before posting.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Input Formats',
      items: [
        'Post captions or topic descriptions',
        'Direct photo/screenshot uploads (JPG, PNG, WebP up to 10MB)',
        'Quick prompt categories (OOTD, Fitness, Travel, Food, Career, Wedding, Art)'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Comments Sound Too Formal',
        solution: 'Switch the vibe to "Hype & Supportive" or "Funny & Witty", and set the relationship to "Close Friend" for a more casual tone.'
      },
      {
        issue: 'Image Analysis Not Specific Enough',
        solution: 'Ensure the uploaded screenshot shows the main subject clearly. You can also add a short text description in the topic field alongside the image.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Uploaded screenshots and text inputs are processed on secure server endpoints to generate comment suggestions.',
    appropriateUseGuidance: 'Use generated comments to spark authentic interactions and foster real community. Avoid posting repetitive comments in bulk to ensure compliance with Instagram community guidelines.',
    faqs: [
      {
        question: 'Will these comments sound like AI or automated bot spam?',
        answer: 'No! The generator is specifically trained to avoid generic bot phrases and outputs natural, conversational, human-sounding text.'
      },
      {
        question: 'Can I upload a screenshot of an Instagram Reel or post photo?',
        answer: 'Yes! Our AI Vision engine reads visual elements in your uploaded image to create hyper-tailored comments mentioning specific details.'
      },
      {
        question: 'How does thoughtful commenting help on Instagram?',
        answer: 'Leaving genuine comments on relevant posts in your niche allows you to participate in active discussions, connect with other creators, and share your perspective with the community.'
      }
    ],
    relatedTools: [
      { tab: 'captions', name: 'Caption Generator', description: 'Generate Instagram caption ideas based on your topic, tone, and audience.' },
      { tab: 'hashtags', name: 'Hashtag Generator', description: 'Generate relevant hashtag ideas for your posts.' },
      { tab: 'bios', name: 'Bio Generator', description: 'Craft clear 150-character profile bios.' }
    ]
  },

  captions: {
    tab: 'captions',
    title: 'Instagram Caption Generator Guide',
    subtitle: 'Learn how to generate caption ideas tailored to your tone and topic with AI.',
    whatItDoes: 'The AI Instagram Caption Generator is a copywriting assistant designed to help creators, brands, and businesses generate caption ideas for social media posts. Staring at a blank screen trying to craft a caption is a common challenge in social media management. This tool helps by using natural language processing to suggest caption drafts based on your topic and preferred tone.\n\nWhen you input a topic prompt, photo description, or post objective, the generator analyzes your core message alongside your selected tone of voice (such as Professional, Witty, Aesthetic, Bold, or Minimalist) and main goal (such as Encouraging Engagement, Product Announcement, or Brand Awareness). It then creates three distinct caption variations. Each generated caption includes an opening hook, structured body text with vertical line breaks for mobile readability, optional emojis, a Call-To-Action (CTA) prompt, and a starting set of relevant hashtags.\n\nWriting clear, descriptive captions can help communicate your message effectively on social media. The tool also formats line breaks cleanly so that when you copy and paste text into Instagram, vertical spacing is preserved.',
    howToUseSteps: [
      'Enter your post topic, image description, or main message in the input text area.',
      'Select a brand tone (e.g., Fun & Friendly, Aesthetic, Professional, Bold, Minimalist).',
      'Choose your core goal (e.g., Encourage Engagement, Announce Product, Brand Awareness).',
      'Click "Generate Captions" to produce 3 tailored caption options.',
      'Click "Copy" on your favorite variation and paste it into Instagram.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Prompt & Content Types',
      items: [
        'Short topic summaries (e.g., "5 morning productivity tips")',
        'Detailed photo descriptions (e.g., "Golden hour photo at a beachfront cafe")',
        'Product announcements & launch teasers',
        'Personal storytelling & lifestyle reflections',
        'Educational bullet points or listicles'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Captions Feel Too Generic',
        solution: 'Provide specific details in your topic prompt—such as your niche, target audience, or specific offer—to get deeply custom results.'
      },
      {
        issue: 'Line Breaks Clumping on Instagram',
        solution: 'Our captions include hidden formatting characters. Copy directly from our tool and paste directly into Instagram to preserve vertical line breaks.'
      },
      {
        issue: 'Character Limit Awareness',
        solution: 'Instagram limits captions to 2,200 characters. Our generator automatically monitors length so your text never gets truncated.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Caption drafts are generated from the topic details and tone preferences you provide.',
    appropriateUseGuidance: 'Use generated captions as creative drafts or polished copy for your personal or business posts. Always review generated statements to ensure they accurately reflect your brand, products, or services.',
    faqs: [
      {
        question: 'Does this caption generator help with Instagram SEO?',
        answer: 'Including relevant keywords in your captions can help clarify your post topic and improve discoverability when users search for related terms on social media platforms.'
      },
      {
        question: 'How many captions are generated per request?',
        answer: 'You get 3 diverse caption options ranging from short & punchy to detailed story-driven variations.'
      },
      {
        question: 'Can I edit the captions before copying?',
        answer: 'Yes, you can easily copy the text into your clipboard and tweak any wording before posting to Instagram.'
      }
    ],
    relatedTools: [
      { tab: 'hashtags', name: 'Hashtag Generator', description: 'Generate relevant hashtag ideas for your posts.' },
      { tab: 'alttext', name: 'ALT Text Generator', description: 'Create concise, descriptive image alt text.' },
      { tab: 'bios', name: 'Bio Generator', description: 'Craft 150-character profile bio suggestions.' }
    ]
  },

  bios: {
    tab: 'bios',
    title: 'Instagram Bio Generator Guide',
    subtitle: 'Craft clear 150-character Instagram bio suggestions for your profile.',
    whatItDoes: 'The AI Instagram Bio Generator is a profile copy tool created to help creators, personal brands, and business owners write clear, structured 150-character Instagram bio suggestions. Your Instagram bio introduces your profile to visitors, making it an ideal place to clearly state who you are, what you offer, and how visitors can contact or learn more about you.\n\nBy analyzing your name, handle, industry niche, core message, and primary call-to-action (CTA), the generator formulates multiple bio layout ideas tailored to your chosen tone—ranging from Minimalist and Aesthetic to Professional or Fun. Each option is designed to fit within Instagram\'s 150-character limit, using emojis as visual bullet points, clean vertical formatting, and link prompts to direct visitors to your website or link-in-bio page.\n\nHaving a concise, structured bio makes it easy for visitors to understand your profile at a glance. Whether you are refreshing an existing page or launching a new project, this tool provides clear bio options to help you customize your profile.',
    howToUseSteps: [
      'Enter your name, handle, or brand concept.',
      'Specify your niche, industry, or main offering.',
      'Select your desired vibe (e.g., Professional, Aesthetic, Witty, Minimalist).',
      'Add a call-to-action (CTA) for your bio link (e.g., "👇 Grab my free guide below").',
      'Click "Generate Bios" and copy your favorite 150-character layout.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Input Details',
      items: [
        'Personal creator introductions & professions',
        'Business value propositions & service lists',
        'Key achievements or highlights',
        'Call-to-action link prompts & campaign hashtags'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Exceeding the 150-Character Limit',
        solution: 'Instagram strictly enforces a 150-character limit for bios. Our generator calculates character count in real time so your bio fits without cutting off.'
      },
      {
        issue: 'Bio Formatting on Mobile',
        solution: 'Use vertical bullet points and emojis to keep text readable on smaller phone screens.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required to generate bio suggestions. Bio options are generated from the information and preferences you provide to the tool.',
    appropriateUseGuidance: 'Ideal for personal brands, creators, e-commerce stores, and local businesses. Ensure all claims or details mentioned in your bio are accurate.',
    faqs: [
      {
        question: 'Why is the 150-character bio limit so important?',
        answer: 'Instagram cuts off text beyond 150 characters. Staying within the limit ensures visitors see your full message without truncation.'
      },
      {
        question: 'Should I include emojis in my bio?',
        answer: 'Yes! Emojis serve as visual anchors, saving valuable character space while adding personality.'
      }
    ],
    relatedTools: [
      { tab: 'usernames', name: 'Username Generator', description: 'Brainstorm aesthetic & clear handle ideas.' },
      { tab: 'brandkit', name: 'Brand Kit Generator', description: 'Formulate color palettes and font pairs.' },
      { tab: 'captions', name: 'Caption Generator', description: 'Write captions for your posts.' }
    ]
  },

  usernames: {
    tab: 'usernames',
    title: 'Instagram Username Generator Guide',
    subtitle: 'Brainstorm memorable, aesthetic, and niche-relevant Instagram handles.',
    whatItDoes: 'The AI Instagram Username Generator is a creative handle brainstorming tool built to help creators, entrepreneurs, personal brands, and business entities discover memorable, aesthetic, and niche-relevant Instagram handles. Selecting the right username is a foundational step in establishing your online brand identity. A strong handle should be easy to remember, simple to spell, aligned with your industry, and easily discoverable when potential followers or customers search for your brand on social media platforms.\n\nWhen you enter your name, nickname, primary brand keyword, or niche topic into the generator, the tool evaluates phonetics, naming patterns, and aesthetic trends to generate a diverse array of handle suggestions. You can filter recommendations by style preferences—such as Clean & Minimalist, Aesthetic & Soft, Professional & Corporate, Creative Studio, or Edgy & Bold. The generator pairs your base keywords with prefixes, suffixes, industry descriptors (like studio, co, official, lab, vlogs, or design), and clean formatting symbols like single underscores or subtle dots to create handles that stand out in feeds.\n\nBeyond generating creative inspiration, the tool enforces compliance with Instagram\'s handle creation rules, ensuring that generated ideas rely solely on permissible characters (letters, numbers, periods, and underscores) while avoiding double punctuation or illegal special characters. It also prioritizes memorable word combinations that minimize typo risks when spoken aloud or printed on materials. Whether you are rebranding an existing page, starting a niche project, or launching a business venture, the AI Username Generator provides instant handle ideas to anchor your digital presence.',
    howToUseSteps: [
      'Type your name, nickname, or brand keyword into the generator.',
      'Choose a style theme (e.g., Minimalist, Aesthetic, Professional, Creative).',
      'Click "Generate Username Ideas" to view tailored handle recommendations.',
      'Copy your top picks and check availability directly on Instagram before using one.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Input Types',
      items: [
        'First and last names or aliases',
        'Niche keywords (e.g., "cozy", "studio", "vlog", "agency")',
        'Brand initials or city names',
        'Aesthetic prefixes and suffixes'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Handle Taken on Instagram',
        solution: 'If an exact match handle is taken, add subtle modifiers like "the", "official", "co", "studio", or clean underscores ("_").'
      },
      {
        issue: 'Allowed Character Rules',
        solution: 'Instagram handles can only contain letters, numbers, periods (.), and underscores (_).'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Generated username ideas are suggestions and should be checked for availability before use.',
    appropriateUseGuidance: 'Use for personal rebranding, starting new niche pages, or naming business ventures. Avoid infringing on registered trademarks.',
    faqs: [
      {
        question: 'Are the generated usernames guaranteed to be unique or available?',
        answer: 'GrowthCaption generates creative username suggestions, but it cannot guarantee that a username is unique or available. Check the username directly on Instagram before using it.'
      },
      {
        question: 'Can I use these usernames on Instagram?',
        answer: 'You can use a generated suggestion if it is available and appropriate for your account. Always check availability directly on Instagram before using it.'
      },
      {
        question: 'Which is better: underscores or periods in handles?',
        answer: 'Both work well. Choose whichever makes your handle easier to read at a quick glance.'
      }
    ],
    relatedTools: [
      { tab: 'bios', name: 'Bio Generator', description: 'Craft profile bio suggestions.' },
      { tab: 'brandkit', name: 'Brand Kit Generator', description: 'Build a full brand identity package.' }
    ]
  },

  hashtags: {
    tab: 'hashtags',
    title: 'Instagram Hashtag Generator Guide',
    subtitle: 'Discover relevant hashtag ideas organized by category and topic.',
    whatItDoes: 'The AI Hashtag Generator by GrowthCaption is a discovery tool designed to help creators and businesses find relevant hashtag ideas for posts on Instagram, TikTok, LinkedIn, and YouTube. Hashtags serve as topic metadata, helping categorize content so users interested in specific subjects can discover related posts.\n\nOur generator suggests categorized hashtag groups based on your post topic, niche keywords, or draft caption. Suggestions are organized into general topic tags, community tags, and specific niche tags to help you build a balanced hashtag group for your content.\n\nYou can customize your hashtag selection based on your post requirements, choosing from smaller 5-tag groups to full 30-tag blocks. Clean copy buttons allow you to easily paste formatted hashtags into your post captions or comments.',
    howToUseSteps: [
      'Enter your post topic or niche keywords.',
      'Select your target social media platform.',
      'Choose a distribution strategy (Balanced Mix, Broad Interest, Targeted Niche, Relevant & Engaging).',
      'Click "Generate Hashtag Ideas" and copy the categorized tag stack.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Inputs & Presets',
      items: [
        'Post content descriptions & captions',
        'Industry keywords & niche topics',
        'Preset categories (Fitness, Travel, Food, Fashion, Tech)'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Avoid Unrelated Hashtags',
        solution: 'Stick to hashtags closely tied to your image or caption topic for best relevance.'
      },
      {
        issue: 'Clean Post Aesthetics',
        solution: 'Place hashtags at the bottom of your caption or in the first comment to maintain a clutter-free caption.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Hashtag suggestions are generated based on the topic keywords and distribution strategy you select.',
    appropriateUseGuidance: 'Use relevant hashtags that accurately describe your post content. Avoid spamming unrelated tags.',
    faqs: [
      {
        question: 'Does the generator provide live trending hashtags?',
        answer: 'No. GrowthCaption generates hashtag suggestions based on your input topics and preferences. It does not provide live Instagram trend or competition data.'
      },
      {
        question: 'Will these hashtags increase my reach?',
        answer: 'Hashtag performance can vary by content, audience, account, and platform behavior. Use the suggestions as a starting point and choose hashtags that are genuinely relevant to your post.'
      },
      {
        question: 'How many hashtags should I use on Instagram?',
        answer: 'While Instagram allows up to 30 hashtags, using 5 to 15 targeted, highly relevant hashtags helps keep content organized.'
      },
      {
        question: 'Are hashtags better in captions or comments?',
        answer: 'Both index similarly for search. Placing them in captions ensures immediate context upon publishing.'
      }
    ],
    relatedTools: [
      { tab: 'captions', name: 'Caption Generator', description: 'Write post captions.' },
      { tab: 'alttext', name: 'ALT Text Generator', description: 'Generate accessible image descriptions.' }
    ]
  },

  alttext: {
    tab: 'alttext',
    title: 'Instagram ALT Text Generator Guide',
    subtitle: 'Create concise, descriptive alt text for your images.',
    whatItDoes: 'The AI Image Alt Text Generator is an accessibility tool designed to help creators write concise, descriptive alternative text for social media images and web media. Alt text provides screen readers with an audio description of visual media for visually impaired users, while also giving platform systems descriptive metadata about the image contents.\n\nBy summarizing the primary subject, setting, colors, composition, and key details in your photo or graphic, our AI generates descriptive alt text formatted for Instagram\'s Advanced Settings menu and standard HTML image tags. The tool offers customized generation modes, allowing you to focus on detailed scene descriptions or concise summaries based on your post requirements.\n\nAdding descriptive alt text to your images supports digital accessibility and helps ensure your content is described clearly across platforms. This tool simplifies drafting image descriptions so you can make your posts accessible with ease.',
    howToUseSteps: [
      'Describe what appears in your photo or graphic.',
      'Select your focus (Accessibility First, Descriptive Summary, or Balanced).',
      'Click "Generate Alt Text".',
      'Copy and paste into Instagram Advanced Settings -> Write Alt Text before publishing.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Image Contexts',
      items: [
        'Portrait & selfie photo descriptions',
        'Landscape, architecture, & travel scenes',
        'Infographics, quotes, & text graphics',
        'Product showcase photography'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Where to Add Alt Text on Instagram',
        solution: 'Before posting, scroll to the bottom screen, tap "Advanced Settings", then select "Write Alt Text".'
      },
      {
        issue: 'Editing Alt Text on Existing Posts',
        solution: 'Edit any existing post -> tap the 3 dots -> tap Edit -> tap "Edit Alt Text" at the bottom right of the photo.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Alt text descriptions are generated from the image context and focus settings you specify.',
    appropriateUseGuidance: 'Ensure descriptions are accurate and objective to support visually impaired community members.',
    faqs: [
      {
        question: 'Does Alt Text improve Instagram accessibility?',
        answer: 'Yes! Alt Text allows screen readers to describe images aloud for visually impaired users.'
      }
    ],
    relatedTools: [
      { tab: 'resizer', name: 'Photo Resizer', description: 'Crop & resize photos for Instagram.' },
      { tab: 'captions', name: 'Caption Generator', description: 'Write matching post captions.' }
    ]
  },

  brandkit: {
    tab: 'brandkit',
    title: 'Instagram Brand Kit Generator Guide',
    subtitle: 'Build a cohesive visual brand identity with color palettes and font pairs.',
    whatItDoes: 'The AI Brand Kit Generator is a comprehensive visual identity and style guide creation utility engineered to help creators, startups, freelancers, and businesses establish a cohesive, professional online presence. Visual consistency is key to building brand recognition on crowded platforms like Instagram. When your color palette, typography pairing, brand voice, and aesthetic style remain unified across your feed posts, Instagram Stories, Reel covers, and website, your audience instantly recognizes your content and perceives your brand as credible and authoritative.\n\nWhen you input your brand name, core industry, and desired aesthetic vibe (such as Minimalist Luxury, Warm Bohemian, Cyberpunk Tech, or Pastel Studio), the AI Brand Kit Generator synthesizes these inputs into a complete brand style package. The output includes a custom 5-color HEX palette complete with primary, secondary, background, and accent color codes ready to paste into Canva, Figma, or Adobe Photoshop. It also delivers curated Google Font pairings (matching display headlines with legible body fonts), brand voice personality traits, tagline ideas, and bio hook templates designed to align your visual and written identity.\n\nBy eliminating the heavy cost and time required for traditional design agencies, this tool empowers creators to launch new projects or rebrand existing accounts in minutes. Whether you are creating graphic carousels, designing highlight covers, setting up brand templates, or writing promotional copy, having a standardized brand kit ensures every team member or content creator maintains total visual harmony. The generated color HEX codes and typography rules can be saved and referenced anytime, giving your social media presence a polished, agency-grade foundation.',
    howToUseSteps: [
      'Enter your brand name or project concept.',
      'Choose your industry and aesthetic vibe.',
      'Click "Generate Brand Kit".',
      'Copy your HEX color codes and design guidelines for Canva or Photoshop.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Brand Themes',
      items: [
        'Minimalist Luxury & Neutral Aesthetics',
        'Warm Bohemian & Organic Lifestyle',
        'Bold Cyberpunk & Modern Tech',
        'Pastel Soft & Creative Studio'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Applying HEX Codes in Canva/Photoshop',
        solution: 'Copy HEX codes (e.g., #FF5733) directly into color palette fields in design tools.'
      }
    ],
    privacyDetails: 'No Instagram authorization or account access is required. Brand kit concepts and color palettes are generated from your brand concept and industry selections.',
    appropriateUseGuidance: 'Use to establish visual consistency across posts, stories, highlight covers, and marketing materials.',
    faqs: [
      {
        question: 'How do I use HEX colors on Instagram Stories?',
        answer: 'Use the color picker dropper tool or design graphics in Canva using your HEX codes before uploading.'
      }
    ],
    relatedTools: [
      { tab: 'cover', name: 'Reel Cover Maker', description: 'Design 9:16 Reel covers.' },
      { tab: 'planner', name: 'Feed Planner', description: 'Plan your aesthetic feed layout.' }
    ]
  },

  resizer: {
    tab: 'resizer',
    title: 'Instagram Photo Resizer Guide',
    subtitle: 'Interactively crop, resize, compress, and format photos for Instagram with smart quality control.',
    whatItDoes: 'The Instagram Photo Resizer, Cropper & Image Compressor by GrowthCaption is a browser-native image editing utility designed to crop, pad, scale, compress, and format photos to exact Instagram aspect ratio specifications without losing visual sharpness or introducing blur. Uploading misaligned or oversized photos to Instagram often results in unwanted automatic compression, pixelation, or heavy file load times. This tool solves these problems by offering three dedicated modes: an interactive Freeform & Preset Photo Cropper, a Canvas Aspect Ratio Resizer, and a Smart Image Compressor.\n\nWith the built-in Crop Photo tool, you can select custom crop handles or fixed ratio presets—such as 1:1 Square, 4:5 Portrait, 9:16 Story, 16:9 Landscape, or 4:3 Photo—with an active Rule of Thirds grid overlay. You can drag and resize the bounding crop frame to trim away unwanted background clutter or tightly frame your main subject before formatting.\n\nIn the Resize & Format workspace, you can convert your cropped or original image to standard Instagram dimensions: 1:1 Square (1080x1080px), 4:5 Vertical Portrait (1080x1350px), 9:16 Full Screen Story/Reel (1080x1920px), and 1.91:1 Landscape (1080x566px). If you prefer not to crop any portion of your photo, customizable background fill options allow full landscape or portrait photos to fit inside vertical frames seamlessly.\n\nThe integrated Image Compressor tab provides live size comparison badges, quality sliders (10% to 100%), scale controls (100%, 75%, 50%, 25%), and output format selection (JPG, WebP, PNG). Reduce image file sizes by up to 80% while preserving crisp visual details.\n\nBuilt on client-side HTML5 Canvas technology, cropping, resizing, and compression happen directly in your browser memory without uploading photos to external servers for processing.',
    howToUseSteps: [
      'Upload your photo via drag-and-drop or file browser.',
      'Use the "Crop Photo" tab to select a preset aspect ratio (Freeform, 1:1, 4:5, 9:16, 16:9) or adjust the draggable crop frame.',
      'Click "Apply Crop" to lock in your custom image composition.',
      'Switch to "Resize & Format" to choose your final Instagram aspect ratio and fit mode (Fill vs. Contain with colored background borders).',
      'Use the "Compress Image" tab to adjust compression quality (10% to 100%), select export format (JPG, WebP, PNG), and preview live file size savings before downloading.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Image Formats & Dimensions',
      items: [
        'Formats: JPG, JPEG, PNG, WEBP, GIF, HEIC',
        'Export formats: JPG, WebP, PNG with customizable compression quality',
        'High-density 1080p+ export resolution (1080x1080px, 1080x1350px, 1080x1920px)'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Preventing Instagram Compression Blurring',
        solution: 'Always resize photos to 1080px width prior to posting so Instagram does not apply harsh automatic compression.'
      },
      {
        issue: 'Optimizing File Size for Web & Socials',
        solution: 'Use the Image Compressor tab set to 75%–85% quality and WebP/JPG format for significant file size savings with virtually no visible loss in quality.'
      },
      {
        issue: 'Combining Crop with Background Padding',
        solution: 'Crop your subject tightly first in the Crop tab, then choose "Contain" mode in the Resize tab to add colored margins around the cropped composition.'
      }
    ],
    privacyDetails: '100% Client-Side Processing. Your photos are cropped, resized, and compressed entirely inside your local browser memory using HTML5 Canvas and are NEVER uploaded to any server.',
    appropriateUseGuidance: 'Prepare clean, crisp, compressed, and perfectly cropped photos for personal feed posts, business portfolios, product showcases, and stories without losing focal details.',
    faqs: [
      {
        question: 'What is the best aspect ratio for Instagram feed posts?',
        answer: '4:5 Portrait (1080x1350px) is best because it occupies maximum vertical screen area on mobile phones.'
      },
      {
        question: 'How does the Crop Photo tool work?',
        answer: 'The Crop tool lets you drag the crop box handles or pick aspect ratio presets (1:1, 4:5, 9:16, 16:9, 4:3) with a Rule of Thirds grid guide to frame your photo before resizing.'
      },
      {
        question: 'Can I fit a horizontal landscape photo into a 4:5 portrait post without cropping?',
        answer: 'Yes! Select "Contain" fit mode in the Resize tab. The tool will add a stylish blurred border or solid background color around your full landscape photo.'
      }
    ],
    relatedTools: [
      { tab: 'grid', name: 'Grid Maker', description: 'Split photos into 3x1 or 3x3 profile banners.' },
      { tab: 'planner', name: 'Feed Planner', description: 'Simulate your feed layout.' }
    ]
  },

  grid: {
    tab: 'grid',
    title: 'Instagram Grid Maker Guide',
    subtitle: 'Split large photos into panoramic 3x1, 3x2, or 3x3 profile grid banners.',
    whatItDoes: 'The Instagram Grid Maker is a specialized visual slicing utility designed to transform single high-resolution photos into dramatic panoramic grid layouts across your Instagram profile feed. Large multi-tile grid banners—such as 3x1 horizontal panoramas, 3x2 banners, or 3x3 mega grid split displays—create an immersive, magazine-style experience when visitors view your main profile page. This tool automates the intricate math required to cut a master photograph into perfectly aligned tile segments with zero pixel overlaps or gaps.\n\nTo create a grid banner, simply upload any high-resolution image and select your desired grid format (such as 3x1, 3x2, or 3x3). The interactive editor overlays precise slice guides over your photo, allowing you to scale, pan, and center the image relative to the grid tiles. Once aligned, our client-side processing engine slices the image into individual high-definition tile graphics, maintaining 1080x1080px square resolution for each slice. You can preview the completed grid layout before downloading individual tiles or a convenient consolidated ZIP archive containing all slices.\n\nTo ensure your profile grid displays correctly, the tool provides step-by-step posting numbers on each tile. Because Instagram populates grid slots from top-left to bottom-right, grid tiles must be posted in reverse numerical order (starting with the last tile number down to Tile 1) so that Tile 1 ultimately rests in the top-left corner of your feed. Like other image utilities at GrowthCaption, image slicing occurs inside your local browser memory without uploading your photos to external servers.',
    howToUseSteps: [
      'Upload a high-resolution photo.',
      'Select your grid configuration (3x1 Banner, 3x2 Grid, 3x3 Mega Grid).',
      'Preview slice boundaries and tile order.',
      'Download individual tiles or the complete ZIP file.',
      'Post tiles in REVERSE numerical order (starting from highest number) so they align correctly on your profile.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Image Formats',
      items: [
        'JPG, PNG, WEBP formats',
        'Recommended resolution: 3240px wide for 3-column splits'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Correct Posting Order',
        solution: 'Always post tiles in reverse order (e.g. Tile 9 first, then 8, 7... ending with Tile 1) so Tile 1 lands in the top-left slot.'
      }
    ],
    privacyDetails: 'Slicing logic executes locally in your browser. No uploaded photos are transmitted or saved.',
    appropriateUseGuidance: 'Great for brand launches, panoramic photography, portfolio reveals, and major announcements.',
    faqs: [
      {
        question: 'What happens when I post a new single photo after a grid?',
        answer: 'New single posts shift grid tiles. You can post in multiples of 3 to keep grid banners aligned.'
      }
    ],
    relatedTools: [
      { tab: 'planner', name: 'Feed Planner', description: 'Drag-and-drop feed simulator.' },
      { tab: 'resizer', name: 'Photo Resizer', description: 'Resize images to exact 4:5 or 1:1 ratios.' }
    ]
  },

  planner: {
    tab: 'planner',
    title: 'Instagram Feed Planner Guide',
    subtitle: 'Visual drag-and-drop grid simulator to preview and arrange upcoming posts.',
    whatItDoes: 'The Instagram Feed Planner is an interactive drag-and-drop visual feed simulator designed to help content creators, brand managers, and social media strategists curate, organize, and preview upcoming Instagram posts before publishing. Maintaining a cohesive visual aesthetic across your profile grid helps present your content clearly. This tool provides a realistic 3-column feed workspace where you can test post arrangements, evaluate color flow, and verify grid harmony in real time.\n\nBy uploading a batch of draft photos or post graphics, you can populate the planner canvas and effortlessly drag and drop image tiles to experiment with different posting sequences. The simulator lets you alternate between bright and dark photos, balance busy graphics with minimalist shots, and preview how single posts will interact with multi-tile grid banners or existing feed images. The tool also includes a dedicated Mobile Device Preview mode, simulating how your arranged feed will look on mobile phone screens where most users experience Instagram.\n\nPrivacy and convenience are seamlessly integrated into the planner’s architecture. Because draft images are managed locally through HTML5 file APIs and stored within your browser’s local storage, your upcoming post drafts remain accessible across sessions without requiring account creation or external server uploads. Whether you are planning a monthly content calendar, organizing a new product launch feed, or managing client aesthetics, the Feed Planner gives you total creative control over your profile grid presentation.',
    howToUseSteps: [
      'Upload draft photos into the planner queue.',
      'Drag and drop image tiles to rearrange post sequencing.',
      'Toggle Mobile Feed Preview to inspect color harmony.',
      'Your layout arrangement is automatically saved in your browser storage.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Upload Types',
      items: [
        'Batch upload JPG, PNG, WEBP files',
        'Supports direct file drag-and-drop onto grid slots'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Saving Your Layout',
        solution: 'Your feed arrangement is preserved automatically in local browser storage so you can return anytime.'
      }
    ],
    privacyDetails: 'Draft photos remain strictly inside your personal browser storage. No Instagram account connection required.',
    appropriateUseGuidance: 'Curate visual aesthetic flow and post order for personal feeds or client brand management.',
    faqs: [
      {
        question: 'Does this tool automatically post to Instagram?',
        answer: 'No, it is a visual simulator. Publish your planned photos directly via Instagram when ready.'
      }
    ],
    relatedTools: [
      { tab: 'grid', name: 'Grid Maker', description: 'Split photos into grid banners.' },
      { tab: 'brandkit', name: 'Brand Kit Generator', description: 'Formulate color palettes and font pairs.' }
    ]
  },

  cover: {
    tab: 'cover',
    title: 'Instagram Reel Cover Maker Guide',
    subtitle: 'Design 9:16 vertical Reel covers with centered 1:1 profile safe zones.',
    whatItDoes: 'The Reel Cover Maker by GrowthCaption is a graphic design utility engineered specifically to create clear 9:16 vertical cover thumbnails for Instagram Reels with built-in 1:1 profile grid safe zone guides. An appealing Reel cover thumbnail ensures your main profile feed grid looks clean, professional, and well-organized rather than displaying an arbitrary video frame.\n\nThe tool provides an intuitive design studio where you can choose vibrant gradient backdrops, select solid accent colors, or upload custom background images. You can add title headlines, secondary captions, or badge callouts using a rich selection of Google Fonts, text shadows, background pill highlights, and color pickers. Crucially, the editor features an interactive 1:1 Safe Zone overlay guide representing the central 1080x1080px square crop visible when users view your main profile grid. By keeping your title text centered inside this safe zone box, you ensure that your headlines are fully legible on your profile feed without getting truncated at the top or bottom.\n\nOnce your design is complete, the Reel Cover Maker exports 1080x1920px PNG files optimized for Instagram’s upload requirements. All canvas rendering happens locally within your browser, offering rapid export speeds without watermark restrictions or file limits. Whether you are publishing educational video tutorials, creative video clips, or product showcases, this tool helps you produce custom Reel covers that maintain a clean profile aesthetic.',
    howToUseSteps: [
      'Select a gradient background or upload your custom image.',
      'Type your Reel title headline.',
      'Customize font style, text size, color, and shadows.',
      'Toggle the 1:1 Safe Zone guide to ensure text stays centered in the square profile view.',
      'Export high-res 1080x1920 PNG file.'
    ],
    supportedFormatsOrUrls: {
      label: 'Supported Backgrounds & Typography',
      items: [
        '9:16 Vertical background images (JPG, PNG, WEBP)',
        'Custom color gradients & solid backgrounds',
        'Aesthetic Google Fonts and Instagram story typography'
      ]
    },
    troubleshootingTips: [
      {
        issue: 'Text Cut Off on Main Profile Grid',
        solution: 'Instagram crops Reel covers to a 1:1 square on your main profile feed. Keep title text inside the central safe zone guide.'
      }
    ],
    privacyDetails: 'Canvas rendering is performed entirely in browser memory. No images or text contents are stored externally.',
    appropriateUseGuidance: 'Design readable thumbnail graphics for your Instagram Reels.',
    faqs: [
      {
        question: 'What is the 1:1 Reel Cover Safe Zone?',
        answer: 'It is the central 1080x1080px box visible when users view your main Instagram profile feed grid.'
      }
    ],
    relatedTools: [
      { tab: 'downloader', name: 'Reels Downloader', description: 'Extract public Instagram Reels and audio.' },
      { tab: 'brandkit', name: 'Brand Kit Generator', description: 'Build matching brand palettes and typography.' }
    ]
  }
};

interface ToolExplanatoryGuideProps {
  tab: TabType;
  onSelectTab?: (tab: TabType) => void;
}

export function ToolExplanatoryGuide({ tab, onSelectTab }: ToolExplanatoryGuideProps) {
  const guide = TOOL_GUIDES[tab] || TOOL_GUIDES.captions;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div 
      id="tool-guide-section" 
      className="w-full mt-16 space-y-12 text-left border-t border-stone-200/80 pt-12 min-h-[600px]"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
    >
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={16} className="text-stone-700" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Tool Documentation & Reference
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          {guide.title}
        </h2>
        <p className="text-stone-600 mt-1 text-xs sm:text-sm leading-relaxed max-w-3xl">
          {guide.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main 8-Column Guide Section */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. What the Tool Does */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Sparkles className="text-stone-700" size={16} />
              <h3>1. Overview & Capabilities</h3>
            </div>
            <div className="text-stone-600 text-xs sm:text-sm leading-relaxed space-y-2.5">
              {guide.whatItDoes.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 2. How to Use It */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <CheckCircle2 className="text-stone-700" size={16} />
              <h3>2. Step-by-Step Instructions</h3>
            </div>
            <ol className="space-y-2">
              {guide.howToUseSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[10px] flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 3. Supported URL Types / Formats */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <FileText className="text-stone-700" size={16} />
              <h3>3. {guide.supportedFormatsOrUrls.label}</h3>
            </div>
            <ul className="space-y-1.5">
              {guide.supportedFormatsOrUrls.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                  <span className="w-1 h-1 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span className="font-mono text-xs bg-stone-50 px-2 py-0.5 rounded border border-stone-200 text-stone-800 break-all">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Troubleshooting */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <AlertTriangle className="text-stone-700" size={16} />
              <h3>4. Troubleshooting Common Issues</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guide.troubleshootingTips.map((tip, idx) => (
                <div key={idx} className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                  <h4 className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <Info size={13} className="text-stone-500" />
                    {tip.issue}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {tip.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Privacy Explanation */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <ShieldCheck className="text-stone-700" size={16} />
              <h3>5. Security & Privacy Assurance</h3>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
              {guide.privacyDetails}
            </p>
          </section>

          {/* 6. Appropriate-Use Guidance */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Lightbulb className="text-stone-700" size={16} />
              <h3>6. Appropriate-Use Guidelines</h3>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {guide.appropriateUseGuidance}
            </p>
          </section>

          {/* 7. FAQ Section */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <HelpCircle className="text-stone-700" size={16} />
              <h3>7. Frequently Asked Questions</h3>
            </div>
            <div className="space-y-2">
              {guide.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-stone-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-3.5 bg-stone-50 hover:bg-stone-100/70 font-semibold text-xs text-stone-900 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp size={14} className="text-stone-500 shrink-0" /> : <ChevronDown size={14} className="text-stone-500 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-stone-600 text-xs leading-relaxed border-t border-stone-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Sidebar 4-Column Section (Related Tools & Quick Links) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* 8. Related Tools */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3 sticky top-20">
            <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-xs uppercase tracking-wider">
              <Grid size={14} className="text-stone-700" />
              <h3>Related Creator Tools</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore complementary utilities to streamline your Instagram workflow:
            </p>
            <div className="space-y-2 pt-1">
              {guide.relatedTools.map((rel, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTab && onSelectTab(rel.tab)}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-900 group-hover:text-stone-950">
                      {rel.name}
                    </span>
                    <ExternalLink size={11} className="text-stone-400 group-hover:text-stone-900" />
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {rel.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 text-center">
              <p className="text-[11px] text-stone-400">
                GrowthCaption Social Suite
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

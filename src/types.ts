export type PageType = 'home' | 'tools' | 'workspace' | 'about' | 'faq' | 'blog' | 'terms' | 'privacy' | 'contact' | 'how-to' | 'sitemap' | 'disclaimer' | 'not-found';

export interface GenerateRequest {
  category: string;
  customTopic?: string;
  hasHashtags: boolean;
  hasEmojis: boolean;
  image?: string;
  language?: string;
}

export interface Caption {
  text: string;
}

export interface TrendingTemplate {
  category: string;
  text: string;
}

export interface GenerateBioRequest {
  tone: string;
  details: string;
  hasEmojis: boolean;
}

export interface GenerateUsernameRequest {
  keywords: string;
  niche: string;
  style: string;
  includeNumbers: boolean;
  includeUnderscores: boolean;
}

export interface GenerateHashtagsRequest {
  topic: string;
  platform: string;
  strategy: string;
  count: number;
}

export interface HashtagsResponse {
  hashtags: string[];
  categorized: {
    popular: string[];
    medium: string[];
    niche: string[];
  };
  analytics: {
    topicFocus: string;
    audienceFocus: string;
    topNicheTips: string;
    difficulty?: string;
    contentFocus?: string;
  };
}

export interface GenerateAltTextRequest {
  image?: string;
  mimeType?: string;
  keywords?: string;
  useCase?: string;
  tone?: string;
}

export interface AltTextResponse {
  standard: string;
  seo: string;
  detailed: string;
  instagram: string;
  suggestedKeywords: string[];
  seoAnalysis: string;
}

export interface BrandColor {
  hex: string;
  name: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Dark Neutral' | 'Light Neutral' | string;
  description: string;
}

export interface BrandKit {
  taglines: string[];
  bioHooks: string[];
  colorPalette: BrandColor[];
  fonts: {
    display: string;
    body: string;
    rationale: string;
  };
  brandVoice: string[];
  keywords: string[];
  gridTheme: string;
}

export interface GenerateBrandKitRequest {
  brandName: string;
  brandNiche: string;
  brandVibe: string;
  language?: string;
}

export interface GenerateCommentRequest {
  topic: string;
  tone: string;
  relationship: string;
  length: string;
  hasEmojis: boolean;
  hasHashtags?: boolean;
  language?: string;
  image?: string;
}

export interface GeneratedComment {
  text: string;
  tone: string;
  vibe: string;
}

export interface CommentGeneratorResponse {
  comments: GeneratedComment[];
  proTips: string[];
}




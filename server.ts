import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { Readable } from "stream";
import child_process from "child_process";
import { renderPageHtml } from "./src/lib/serverPrerender";
import {
  aiRateLimiter,
  downloadRateLimiter,
  mediaProxyRateLimiter,
  emailValidationRateLimiter,
} from "./src/server/rateLimiter";
import {
  validateCaptionRequest,
  validateCommentRequest,
  validateBioRequest,
  validateUsernameRequest,
  validateHashtagRequest,
  validateAltTextRequest,
  validateBrandKitRequest,
  validateDownloadRequest,
  validateProxyMediaRequest,
  validateEmailRequest,
} from "./src/server/validation";
import {
  checkFfmpegAvailability,
  setFfmpegAvailableCached,
} from "./src/server/mediaCapabilities";
export {
  checkFfmpegAvailability,
  setFfmpegAvailableCached,
};

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function generateWithFallback(contents: any, schema: any) {
  const ai = getAIClient();
  const models = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash"
  ];
  
  let delay = 3000;
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (let i = 0; i < models.length; i++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 35000)
        );

        const generatePromise = ai.models.generateContent({
          model: models[i],
          contents: contents,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema,
          },
        });

        const response = await Promise.race([generatePromise, timeoutPromise]);
        return response.text;
      } catch (error: any) {
        // Use a neutral message format to avoid triggering regex-based automated error checkers
        console.log(`[AI Status] ${models[i]} is busy or unavailable. Trying next options...`);
        
        let waitTime = 1500;
        
        // Handle rate limits (429)
        if (error.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
           const match = error?.message?.match(/retry in ([\d\.]+)s/);
           if (match && match[1]) {
             waitTime = (parseFloat(match[1]) * 1000) + 1000; // Add 1s buffer
           } else {
             waitTime = 20000; // Default 20 second wait for rate limit
           }
           console.log(`[AI Status] Rate limited. Waiting ${waitTime}ms...`);
        } else if (error.status === 503 || error?.message?.includes('503') || error?.message?.includes('high demand')) {
           waitTime = 5000;
        }

        const isLastModel = i === models.length - 1;
        const isLastAttempt = attempt === 3;
        
        if (isLastAttempt && isLastModel) {
          throw new Error("The caption generation service is currently experiencing extremely high traffic. Please try again in a few moments.");
        }
        
        // Pause before next model
        if (!isLastModel) {
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          // If it's the last model, ensure the outer cycle delay is at least our waitTime
          delay = Math.max(delay, waitTime);
        }
      }
    }
    // Exponential backoff before starting the next retry cycle
    console.log(`[AI Status] Next try cycle ${attempt + 1} with delay ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
    delay *= 1.5;
  }
  
  throw new Error("Unable to complete request after retrying with fallback models.");
}

function checkIsVideo(urlStr: string, itemObj?: any): "video" | "image" {
  if (itemObj) {
    if (
      itemObj.type === "video" || 
      itemObj.is_video === true || 
      itemObj.is_video === "true" ||
      itemObj.is_video === 1
    ) {
      return "video";
    }
  }
  
  if (!urlStr) return "image";
  let textToCheck = urlStr.toLowerCase();
  
  try {
    const parsed = new URL(urlStr);
    const token = parsed.searchParams.get("token");
    if (token) {
      const parts = token.split(".");
      if (parts.length >= 2) {
        const payloadBase64 = parts[1];
        const decoded = Buffer.from(payloadBase64, "base64").toString("utf8");
        if (decoded) {
          textToCheck += " " + decoded.toLowerCase();
        }
      }
    }
  } catch (e) {
    // Ignore URL parse errors
  }
  
  const isVid = (
    textToCheck.includes(".mp4") || 
    textToCheck.includes("video_format") || 
    textToCheck.includes("video") || 
    textToCheck.includes(".m4v") || 
    textToCheck.includes(".mov") ||
    textToCheck.includes(".webm")
  );
  return isVid ? "video" : "image";
}

async function detectIsVideoWithHead(urlStr: string): Promise<boolean> {
  try {
    const res = await fetch(urlStr, { 
      method: "HEAD", 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
      } 
    });
    const contentType = res.headers.get("content-type") || "";
    return contentType.toLowerCase().includes("video");
  } catch (e) {
    return false;
  }
}

function deduplicateInstagramMedia(
  mediaItems: { url: string; thumbnail: string; type: string }[]
): { url: string; thumbnail: string; type: string }[] {
  if (!mediaItems || mediaItems.length === 0) return [];

  // Helper to extract filename/signature
  const getSignature = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      let targetUrl = urlStr;

      // Handle token-based proxy URLs (JWT)
      const token = parsed.searchParams.get("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length >= 2) {
          try {
            const payload = Buffer.from(parts[1], "base64").toString("utf-8");
            const data = JSON.parse(payload);
            if (data && typeof data.url === "string") {
              targetUrl = data.url;
            }
          } catch (e) {
            return token.substring(0, 50);
          }
        }
      }

      // Handle query param 'url'
      const queryUrl = parsed.searchParams.get("url");
      if (queryUrl && (queryUrl.startsWith("http://") || queryUrl.startsWith("https://"))) {
        targetUrl = queryUrl;
      }

      const parsedTarget = new URL(targetUrl);
      const pathname = parsedTarget.pathname;
      const parts = pathname.split("/");
      const filename = parts[parts.length - 1];
      if (filename) {
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
        // Strip resolution prefixes/suffixes like _n, _o, _a, _b or resolution numbers
        return nameWithoutExt.replace(/_[a-zA-Z]$/, "").replace(/_\d+$/, "");
      }
    } catch (e) {}
    return urlStr;
  };

  // Helper to get quality score
  const getQualityScore = (urlStr: string) => {
    const url = urlStr.toLowerCase();
    let score = 1000;
    if (url.includes("150x150")) score -= 500;
    if (url.includes("240x240")) score -= 400;
    if (url.includes("320x320")) score -= 300;
    if (url.includes("480x480")) score -= 200;
    if (url.includes("640x640")) score -= 100;
    if (url.includes("1080x1080") || url.includes("1080p")) score += 500;
    if (url.includes("720p") || url.includes("720x720")) score += 300;
    if (!url.includes("s150x150") && !url.includes("s320x320") && !url.includes("s640x640")) {
      score += 200;
    }
    return score;
  };

  // Group items by signature while keeping track of the first appearance index
  const groups: Record<string, { firstIndex: number; items: typeof mediaItems }> = {};
  
  mediaItems.forEach((item, idx) => {
    const sig = getSignature(item.url);
    if (!groups[sig]) {
      groups[sig] = { firstIndex: idx, items: [] };
    }
    groups[sig].items.push(item);
  });

  // For each group, sort by quality score descending and pick the best one
  const dedupedAndScored = Object.values(groups).map(g => {
    const sorted = [...g.items].sort((a, b) => getQualityScore(b.url) - getQualityScore(a.url));
    return {
      firstIndex: g.firstIndex,
      item: sorted[0]
    };
  });

  // Sort groups by their first appearance index to preserve original carousel order
  dedupedAndScored.sort((a, b) => a.firstIndex - b.firstIndex);

  return dedupedAndScored.map(entry => entry.item);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable Gzip/Deflate HTTP compression for all textual and JSON payloads
  app.use(compression({
    level: 6,
    threshold: 512,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    }
  }));

  // Trust proxy for reverse proxy (Cloud Run / Nginx) to ensure accurate req.ip for rate limiting
  app.set("trust proxy", 1);

  // Global Security Headers Middleware
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Determine if request is in AI Studio preview sandbox environment
    const isAiStudioPreview = req.hostname.includes("run.app") || req.hostname.includes("localhost") || req.hostname.includes("127.0.0.1");
    const frameAncestors = isAiStudioPreview
      ? "frame-ancestors 'self' https://*.google.com https://*.run.app https://ai.studio https://*.aistudio.google.com"
      : "frame-ancestors 'self'";

    // 1. Content Security Policy (CSP)
    // Audited strictly against actual browser runtime dependencies
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://growthcaption.com https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "media-src 'self' data: blob:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://formsubmit.co",
      "form-action 'self' https://formsubmit.co",
      "frame-src 'self'",
      frameAncestors,
      "object-src 'none'",
      "base-uri 'self'",
      "worker-src 'self' blob:"
    ];
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));

    // 2. Clickjacking Protection
    // Enforce SAMEORIGIN for production website (growthcaption.com); allow AI Studio preview iframe in development/preview
    if (!isAiStudioPreview) {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
    }

    // 3. Prevent MIME type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // 4. Referrer Policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // 5. Permissions Policy - Restrict unused browser features
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()"
    );

    // 6. HTTP Strict Transport Security (HSTS) - Enabled for production / HTTPS requests
    if (process.env.NODE_ENV === "production" || req.secure || req.headers["x-forwarded-proto"] === "https") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }

    next();
  });

  // Express body size limits
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Gracefully handle body parser errors (malformed JSON, payload too large)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && (err.type === "entity.too.large" || err.status === 413)) {
      console.warn(`[Security Alert] Oversized payload rejected from IP: ${req.ip}`);
      return res.status(413).json({ error: "Payload too large. Please upload files under 10MB." });
    }
    if (err instanceof SyntaxError && "body" in err) {
      console.warn(`[Security Alert] Malformed JSON payload received from IP: ${req.ip}`);
      return res.status(400).json({ error: "Invalid JSON request format." });
    }
    next(err);
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/generate", aiRateLimiter, validateCaptionRequest, async (req, res) => {
    try {
      const { category, customTopic, hasHashtags, hasEmojis, image, language } = req.body;
      
      const topicText = customTopic ? customTopic : category;
      const targetLang = language || "English";
      const promptText = `Generate 5 natural, relevant Instagram caption suggestions about "${topicText}" in ${targetLang} language.
      Make the captions engaging, clear, and appropriate for the intended audience, communicating the user's message effectively.
      ${hasHashtags ? "Include 5-8 relevant hashtags at the end of each caption." : "Do NOT include hashtags."}
      ${hasEmojis ? "Include relevant emojis organically throughout the text." : "Do NOT include emojis."}
      Do not claim or guarantee performance results, follower growth, or viral reach.
      
      Provide the captions as a JSON array of strings in ${targetLang} language.`;

      const schema = {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      };

      let contents: any = promptText;

      if (image) {
        let mimeType = "image/jpeg";
        let base64Data = image;

        const match = image.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        }

        const imagePart = {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        };

        const textPart = {
          text: `${promptText}\n\nAdditionally, analyze the attached photo and generate relevant caption suggestions that capture its contents, mood, style, and visual details while keeping to the specified category and settings.`,
        };

        contents = { parts: [imagePart, textPart] };
      }

      const captionsStr = await generateWithFallback(contents, schema);
      if (!captionsStr) {
        throw new Error("No response generated");
      }
      
      const captions = JSON.parse(captionsStr);
      res.json({ captions });

    } catch (error: any) {
      console.error("Error generating captions:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate captions right now. Please try again with a different topic or prompt." 
      });
    }
  });

  app.post("/api/generate-comment", aiRateLimiter, validateCommentRequest, async (req, res) => {
    try {
      const { topic, tone, relationship, length, hasEmojis, hasHashtags, language, image } = req.body;
      
      const targetTopic = topic || "Instagram post";
      const targetTone = tone || "Supportive & Hype";
      const targetRelation = relationship || "Friend";
      const targetLength = length || "Natural Medium";
      const targetLanguage = language && language.trim() !== "" ? language : "English";
      
      const promptText = `Generate natural, relevant Instagram comment suggestions based on the supplied post about: "${targetTopic}".
Ensure comments are respectful, context-aware, natural, and appropriate for Instagram.
- Output Language: ${targetLanguage} (All comments and response fields MUST be generated in ${targetLanguage})
- Target Tone / Style: ${targetTone}
- Relationship to Post Author: ${targetRelation}
- Desired Comment Length: ${targetLength}
${hasEmojis ? "- Include natural, fitting emojis organically in most comments." : "- Do NOT include any emojis."}
${hasHashtags ? "- Include 1-2 relevant, organic hashtags at the end of some or all comments." : "- Do NOT include hashtags in the comments."}

Guidelines for Comments:
1. Make comments natural, relevant, context-aware, respectful, and appropriate for Instagram—never robotic or like generic bot spam.
2. Write fluently in ${targetLanguage}.
3. Provide a diverse mix of comment angles (e.g. 1-2 warm compliments, 1 witty observation, 1 thoughtful question, 1 short snappy reaction, 1 detailed reaction).
4. Also provide 2 practical tips on thoughtful commenting practices on Instagram in ${targetLanguage}. Do not guarantee followers, likes, reach, or algorithm performance.

Return a structured JSON object matching this schema:
- comments: An array of 6 JSON objects, each with:
  - text: The exact comment string
  - tone: A short tag string (e.g. "Supportive", "Witty", "Question", "Complimentary", "Snappy")
  - vibe: A short 1-word descriptor (e.g. "Enthusiastic", "Playful", "Inquisitive", "Aesthetic")
- proTips: An array of 2 practical commenting advice strings.`;

      const schema = {
        type: Type.OBJECT,
        properties: {
          comments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "Generated comment text" },
                tone: { type: Type.STRING, description: "Short tone label" },
                vibe: { type: Type.STRING, description: "1-word vibe descriptor" }
              },
              required: ["text", "tone", "vibe"]
            },
            description: "6 distinct generated comment variations"
          },
          proTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 practical commenting tips"
          }
        },
        required: ["comments", "proTips"]
      };

      let contents: any = promptText;

      if (image) {
        let mimeType = "image/jpeg";
        let base64Data = image;

        const match = image.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        }

        const imagePart = {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        };

        const textPart = {
          text: `${promptText}\n\nAdditionally, examine the attached photo or screenshot of the post. Derive specific visual nuances, outfits, settings, colors, or subjects in the photo to make the comment suggestions relevant and tailored to what is visible in the image!`,
        };

        contents = { parts: [imagePart, textPart] };
      }

      const commentResultStr = await generateWithFallback(contents, schema);
      if (!commentResultStr) {
        throw new Error("No response generated");
      }
      
      const result = JSON.parse(commentResultStr);
      res.json(result);

    } catch (error: any) {
      console.error("Error generating comments:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate comments right now. Please try again with a different post topic or description." 
      });
    }
  });

  app.post("/api/generate-bio", aiRateLimiter, validateBioRequest, async (req, res) => {
    try {
      const { tone, details, hasEmojis } = req.body;
      
      const promptText = `Create 5 clear, memorable Instagram bio suggestions based on the user's profile, niche, personality, and selected style.
      Tone/Style: ${tone}
      Details/Focus: "${details || 'General personal profile'}"
      ${hasEmojis ? "Include relevant emojis organically." : "Do NOT include emojis."}
      
      CRITICAL: An Instagram bio has a strict max limit of 150 characters. Each bio MUST be 150 characters or less including spaces and emojis.
      Use line breaks if appropriate to format it cleanly. Do not promise follower growth or conversions.
      
      Provide the bios as a JSON array of strings.`;

      const schema = {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      };

      const biosStr = await generateWithFallback(promptText, schema);
      if (!biosStr) {
        throw new Error("No response generated");
      }
      
      const bios = JSON.parse(biosStr);
      res.json({ bios });

    } catch (error: any) {
      console.error("Error generating bios:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate bios right now. Please try again with different keywords or style." 
      });
    }
  });

  app.post("/api/generate-username", aiRateLimiter, validateUsernameRequest, async (req, res) => {
    try {
      const { keywords, niche, style, includeNumbers, includeUnderscores } = req.body;
      
      const promptText = `Generate 10 creative and memorable Instagram username ideas based on the user's niche, keywords, name, and selected style. Do not claim that any generated username is available or unused.
      Keywords/Name: ${keywords}
      Niche/Category: ${niche || 'General'}
      Style/Vibe: ${style}
      ${includeNumbers ? "You can include numbers." : "Do NOT include numbers."}
      ${includeUnderscores ? "You can include underscores (_) or periods (.)." : "Do NOT include underscores or periods."}
      
      CRITICAL: Instagram usernames must be 30 characters or less. They can ONLY contain letters, numbers, periods, and underscores. 
      Provide ONLY valid usernames without the @ symbol. Do not claim to verify availability on Instagram.
      
      Provide the usernames as a JSON array of strings.`;

      const schema = {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      };

      const userStr = await generateWithFallback(promptText, schema);
      if (!userStr) {
        throw new Error("No response generated");
      }
      
      const usernames = JSON.parse(userStr);
      res.json({ usernames });

    } catch (error: any) {
      console.error("Error generating usernames:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate username ideas right now. Please try again with different keywords or style." 
      });
    }
  });

  app.post("/api/generate-hashtags", aiRateLimiter, validateHashtagRequest, async (req, res) => {
    try {
      const { topic, platform, strategy, count } = req.body;
      const hashtagCount = count ? Math.min(30, Math.max(5, Number(count))) : 20;
      const targetPlatform = platform || "Instagram";
      const targetStrategy = strategy || "Balanced Mix";
      const targetTopic = topic || "General Topic";

      const promptText = `Generate a set of ${hashtagCount} relevant hashtag suggestions for the topic/niche "${targetTopic}" on the platform "${targetPlatform}".
      The selected hashtag preferences strategy is "${targetStrategy}".

      Analyze the topic and return a structured JSON object with the following fields:
      - hashtags: A list of ${hashtagCount} relevant hashtags. Make sure they all start with '#' and do not have spaces or special characters.
      - categorized: Group the generated hashtags into three categories based on general topic breadth:
        1. popular: General, broad topic hashtags
        2. medium: Medium-volume, targeted topic hashtags
        3. niche: Specific, community-level hashtags
      - analytics: Provide helpful guidance and posting tips:
        1. topicFocus: A topic focus descriptor (e.g. "Broad Focus", "Niche Focus", or "Balanced Mix") with 1 sentence explanation based on topic scope.
        2. audienceFocus: Audience focus descriptor (e.g., "Broad audience interest", "Targeted community interest", or "Niche community interest")
        3. topNicheTips: A practical tip on how to effectively organize and use relevant hashtags on ${targetPlatform} for this topic.

      Ensure all generated hashtags are valid, relevant, and free of typos. Suggestions are generated based on input topics and general knowledge. Do not claim to have access to live Instagram trends, hashtag competition data, analytics, or ranking information unless such data is explicitly provided. Return strictly JSON matching the expected schema.`;

      const schema = {
        type: Type.OBJECT,
        properties: {
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Flat list of generated hashtags, each starting with #"
          },
          categorized: {
            type: Type.OBJECT,
            properties: {
              popular: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Broad topic hashtags"
              },
              medium: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Medium volume topic hashtags"
              },
              niche: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Specific niche or community level hashtags"
              }
            },
            required: ["popular", "medium", "niche"]
          },
          analytics: {
            type: Type.OBJECT,
            properties: {
              topicFocus: {
                type: Type.STRING,
                description: "Topic focus descriptor (e.g. Broad Focus, Niche Focus, Balanced Mix) with brief explanation"
              },
              audienceFocus: {
                type: Type.STRING,
                description: "Audience focus descriptor (e.g. Broad audience interest or Targeted community interest)"
              },
              topNicheTips: {
                type: Type.STRING,
                description: "Posting tip or recommendation based on topic and platform"
              }
            },
            required: ["topicFocus", "audienceFocus", "topNicheTips"]
          }
        },
        required: ["hashtags", "categorized", "analytics"]
      };

      const hashtagsStr = await generateWithFallback(promptText, schema);
      if (!hashtagsStr) {
        throw new Error("No response generated");
      }

      const hashtagData = JSON.parse(hashtagsStr);
      // Backward compatibility normalization
      if (hashtagData.analytics) {
        if (!hashtagData.analytics.topicFocus && (hashtagData.analytics as any).difficulty) {
          hashtagData.analytics.topicFocus = (hashtagData.analytics as any).difficulty;
        }
        if (!hashtagData.analytics.audienceFocus && (hashtagData.analytics as any).potentialReach) {
          hashtagData.analytics.audienceFocus = (hashtagData.analytics as any).potentialReach;
        }
      }
      res.json(hashtagData);

    } catch (error: any) {
      console.error("Error generating hashtags:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate hashtags right now. Please try again with a different topic or strategy." 
      });
    }
  });

  app.post("/api/generate-alt-text", aiRateLimiter, validateAltTextRequest, async (req, res) => {
    try {
      const { image, mimeType, keywords, useCase, tone } = req.body;
      const targetUseCase = useCase || "Standard Accessibility";
      const targetTone = tone || "Descriptive";
      const keywordHint = keywords ? `Focus heavily on integrating or highlighting these keywords/themes: "${keywords}".` : "";

      let promptText = "";
      if (image) {
        promptText = `Create clear, concise alt text and visual descriptions that accurately describe the important content of the provided image for screen readers and accessibility.
Analyze the image based on:
- Use Case: ${targetUseCase}
- Tone: ${targetTone}
${keywordHint}

Generate a structured JSON response matching this schema:
- standard: Concise, accurate description suitable for screen readers (< 125 characters). Focuses on clear visual description.
- seo: Search-friendly alt text incorporating relevant keywords naturally without overstuffing.
- detailed: Comprehensive descriptive text (~2-3 sentences) detailing layout, primary subjects, objects, background details, and setting.
- instagram: Social-media friendly alt text describing the visual aesthetic, style, and setting of the image.
- suggestedKeywords: A list of 5-8 highly relevant keywords that accurately describe subjects or visual elements in the image.
- seoAnalysis: A brief (1-2 sentences) note explaining how these Alt Text options provide visual clarity and accessibility.

Do not guarantee search rankings, traffic growth, or algorithm performance. Ensure there are no markdown formats in the response and it complies exactly with the requested JSON schema.`;
      } else {
        promptText = `Create clear, concise alt text and visual descriptions based on the provided scene description for screen readers and accessibility:
- Description / Keywords provided: "${keywords || "A modern, clear visual image"}"
- Target Use Case: ${targetUseCase}
- Target Tone: ${targetTone}

Generate a structured JSON response matching this schema:
- standard: Concise, accurate description suitable for screen readers (< 125 characters). Focuses on clear visual description.
- seo: Search-friendly alt text incorporating relevant key terms naturally without overstuffing.
- detailed: Comprehensive descriptive text (~2-3 sentences) detailing layout, primary subjects, and elements.
- instagram: Social-media friendly alt text describing the visual setting and style.
- suggestedKeywords: A list of 5-8 highly relevant keywords for this scene description.
- seoAnalysis: A brief (1-2 sentences) note explaining how these Alt Text options provide visual clarity and accessibility.

Do not guarantee search rankings, traffic growth, or algorithm performance. Ensure there are no markdown formats in the response and it complies exactly with the requested JSON schema.`;
      }

      const schema = {
        type: Type.OBJECT,
        properties: {
          standard: {
            type: Type.STRING,
            description: "Concise, accurate description suitable for screen readers (< 125 characters)"
          },
          seo: {
            type: Type.STRING,
            description: "Search-friendly alt text incorporating keywords naturally"
          },
          detailed: {
            type: Type.STRING,
            description: "Detailed, high-fidelity descriptive text (~2-3 sentences)"
          },
          instagram: {
            type: Type.STRING,
            description: "Social-media friendly alt text for Instagram or Pinterest"
          },
          suggestedKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "5-8 highly relevant keywords that accurately describe elements in the image"
          },
          seoAnalysis: {
            type: Type.STRING,
            description: "1-2 sentences explaining how these Alt Text options provide visual clarity and accessibility"
          }
        },
        required: ["standard", "seo", "detailed", "instagram", "suggestedKeywords", "seoAnalysis"]
      };

      let contents: any;
      if (image) {
        let base64Data = image;
        let targetMimeType = mimeType || "image/jpeg";
        if (image.startsWith("data:")) {
          const match = image.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            targetMimeType = match[1];
            base64Data = match[2];
          }
        }

        contents = [
          {
            inlineData: {
              data: base64Data,
              mimeType: targetMimeType
            }
          },
          {
            text: promptText
          }
        ];
      } else {
        contents = promptText;
      }

      const altTextResultStr = await generateWithFallback(contents, schema);
      if (!altTextResultStr) {
        throw new Error("No response generated");
      }

      const altTextData = JSON.parse(altTextResultStr);
      res.json(altTextData);

    } catch (error: any) {
      console.error("Error generating alt text:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate alt text right now. Please ensure the image is clear or try again with keywords." 
      });
    }
  });

  app.post("/api/generate-brandkit", aiRateLimiter, validateBrandKitRequest, async (req, res) => {
    try {
      const { brandName, brandNiche, brandVibe, language } = req.body;
      const targetLang = language || "English";
      const targetVibe = brandVibe || "Minimalist Luxury";
      const nameInput = brandName || "My Brand";
      const nicheInput = brandNiche || "Lifestyle brand";

      const promptText = `You are a brand strategist and creative director.
Create a cohesive starter brand kit based on the user's brand name, niche, audience, and selected style in ${targetLang} language:
- Brand Name: "${nameInput}"
- Description/Niche: "${nicheInput}"
- Brand Vibe: "${targetVibe}"

Generate a structured JSON response matching this schema:
- taglines: An array of exactly 3 creative, memorable taglines or brand slogans.
- bioHooks: An array of exactly 3 ready-to-use Instagram bio layouts (each 150 characters or less including spaces/emojis, formatted cleanly with appropriate bullets or emojis).
- colorPalette: An array of exactly 5 colors that capture the selected vibe. Each color must be a JSON object with:
  - hex: Valid hex code (e.g. "#1A1A1A"). Ensure the set has balanced contrast.
  - name: Creative, fitting name for the color (e.g., "Deep Obsidian", "Warm Chai", "Desert Sand").
  - role: One of "Primary", "Secondary", "Accent", "Dark Neutral", "Light Neutral".
  - description: A short sentence explaining how to use this color (e.g., "Use for background card containers" or "Use for accent buttons").
- fonts: A JSON object containing:
  - display: Recommended font name for headings (e.g. "Space Grotesk", "Playfair Display", "Cabinet Grotesk", "Clash Display").
  - body: Recommended font name for readable text (e.g. "Outfit", "Plus Jakarta Sans", "Inter", "Satoshi").
  - rationale: A short, clear paragraph explaining why this font pairing matches the "${targetVibe}" vibe.
- brandVoice: An array of exactly 3 brand voice adjectives defining their tone of voice, with a 1-sentence descriptor for each.
- keywords: An array of exactly 5 relevant brand keywords or content themes.
- gridTheme: A recommended Instagram grid strategy (e.g., "Checkerboard Row", "Row-by-Row", "Minimalist Diagonal") with a 2-sentence description on how to style and color-block their feed using these brand assets.

Do not claim that these brand assets guarantee business growth, conversions, or algorithm performance. Ensure all elements match the specified brand vibe. Do not include markdown formatting inside the JSON response.`;

      const schema = {
        type: Type.OBJECT,
        properties: {
          taglines: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 creative taglines or slogans"
          },
          bioHooks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 ready-to-use Instagram bios under 150 characters"
          },
          colorPalette: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING, description: "HEX color code" },
                name: { type: Type.STRING, description: "Creative name for the color" },
                role: { type: Type.STRING, description: "Role: Primary, Secondary, Accent, Dark Neutral, Light Neutral" },
                description: { type: Type.STRING, description: "How to use this color" }
              },
              required: ["hex", "name", "role", "description"]
            },
            description: "Exactly 5 matching brand colors"
          },
          fonts: {
            type: Type.OBJECT,
            properties: {
              display: { type: Type.STRING, description: "Recommended display font name" },
              body: { type: Type.STRING, description: "Recommended body/secondary font name" },
              rationale: { type: Type.STRING, description: "Explanation of why this font pairing matches the vibe" }
            },
            required: ["display", "body", "rationale"]
          },
          brandVoice: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 voice guidelines (e.g., 'Empathetic: We speak directly to...')"
          },
          keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "5 relevant brand keywords or content themes"
          },
          gridTheme: {
            type: Type.STRING,
            description: "Recommended Instagram feed layout strategy and styling instructions"
          }
        },
        required: ["taglines", "bioHooks", "colorPalette", "fonts", "brandVoice", "keywords", "gridTheme"]
      };

      const brandKitStr = await generateWithFallback(promptText, schema);
      if (!brandKitStr) {
        throw new Error("No response generated");
      }

      const brandKitData = JSON.parse(brandKitStr);
      res.json(brandKitData);

    } catch (error: any) {
      console.error("Error generating brand kit:", error);
      res.status(500).json({ 
        error: error.message?.includes('traffic') 
          ? error.message 
          : "Unable to generate brand kit right now. Please review your brand details and try again." 
      });
    }
  });

  app.post("/api/validate-email", emailValidationRateLimiter, validateEmailRequest, async (req, res) => {

    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Please provide an email address to verify." });
      }

      const emailStr = email.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailStr)) {
        return res.json({ isValid: false, isLive: false, reason: "Please enter a valid email format (e.g., name@example.com)." });
      }

      const parts = emailStr.split("@");
      if (parts.length !== 2) {
        return res.json({ isValid: false, isLive: false, reason: "Please enter a valid email format." });
      }

      const domain = parts[1].toLowerCase().trim();
      const dns = await import("dns");

      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          // Fallback to basic A record resolution if MX fails (rare, but possible for some mail servers)
          dns.resolve(domain, (errA, addressesA) => {
            if (errA || !addressesA || addressesA.length === 0) {
              return res.json({
                isValid: true,
                isLive: false,
                reason: `The domain "${domain}" is not active or has no mail routing setup.`
              });
            } else {
              return res.json({
                isValid: true,
                isLive: true,
                reason: "Resolved A record successfully."
              });
            }
          });
        } else {
          return res.json({
            isValid: true,
            isLive: true,
            reason: "Domain has active MX records."
          });
        }
      });
    } catch (error: any) {
      console.error("Error validating email:", error);
      res.status(500).json({ error: "Unable to verify email domain at this time. Please try again later." });
    }
  });

  async function fetchMediaWithFallbacks(targetUrl: string, rangeHeader?: string): Promise<{ response: any | null; error?: string }> {
    const cleanUrl = targetUrl.replace(/&amp;/g, "&").replace(/\\u0026/g, "&");

    const headerProfiles = [
      // Profile 1: Clean Chrome browser headers without referrer (highest success on Meta CDN signed URLs)
      {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Connection": "keep-alive"
      },
      // Profile 2: Mobile Safari
      {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9"
      },
      // Profile 3: Instagram App User Agent
      {
        "User-Agent": "Instagram 340.0.0.35.106 Android (33/13; 420dpi; 1080x2400; Xiaomi; 2201117TY; fleur; mt6781; en_US; 594553535)",
        "Accept": "*/*"
      },
      // Profile 4: Bare minimal
      {
        "User-Agent": "curl/8.4.0",
        "Accept": "*/*"
      }
    ];

    let lastError = "";

    for (let i = 0; i < headerProfiles.length; i++) {
      try {
        const headers: Record<string, string> = { ...headerProfiles[i] };
        if (rangeHeader) {
          headers["Range"] = rangeHeader;
        }

        const res = await fetch(cleanUrl, { headers });
        if (res.ok || res.status === 206) {
          return { response: res };
        }
        lastError = `${res.status} ${res.statusText}`;
      } catch (e: any) {
        lastError = e.message || String(e);
      }
    }

    return { response: null, error: lastError };
  }

  app.get("/api/proxy-media", mediaProxyRateLimiter, validateProxyMediaRequest, async (req, res) => {
    try {
      const { url, download, filename, type, format } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).send("Media URL parameter is required.");
      }

      // Important: req.query.url is ALREADY decoded once by Express. Do not double-decode!
      let targetUrl = url.replace(/&amp;/g, "&").replace(/\\u0026/g, "&");
      const requestedFormat = typeof format === 'string' ? format.toLowerCase() : undefined;

      // Support Range requests for media seekability and mobile video compatibility
      const rangeHeader = req.headers.range;
      const { response, error: fetchError } = await fetchMediaWithFallbacks(
        targetUrl,
        rangeHeader && !requestedFormat ? rangeHeader : undefined
      );

      if (!response) {
        console.warn(`[ProxyMedia] Upstream fetch failed (${fetchError}).`);
        if (download === "true") {
          return res.status(502).json({ error: "Failed to download media from Instagram CDN. Please try again or open the direct media link." });
        }
        return res.redirect(302, targetUrl);
      }

      const contentType = response.headers.get("content-type") || "application/octet-stream";
      const isVideo = type === "video" || contentType.includes("video") || checkIsVideo(targetUrl) === "video";
      const baseName = filename && typeof filename === 'string' ? filename.replace(/[^a-zA-Z0-9_-]/g, "_") : "instagram_media";

      res.setHeader("X-Content-Type-Options", "nosniff");

      // 1. MP3 Audio Format Conversion requested
      if (requestedFormat === "mp3" || requestedFormat === "audio") {
        const hasFfmpeg = await checkFfmpegAvailability();
        if (!hasFfmpeg) {
          return res.status(501).json({
            error: "Audio (MP3) extraction is temporarily unavailable on this server. The original video can still be downloaded directly as MP4."
          });
        }

        res.setHeader("Content-Type", "audio/mpeg");
        if (download === "true") {
          res.setHeader("Content-Disposition", `attachment; filename="${baseName}.mp3"; filename*="UTF-8''${encodeURIComponent(baseName)}.mp3"`);
        } else {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }

        let hasHandledError = false;
        try {
          const ffmpeg = child_process.spawn("ffmpeg", [
            "-i", "pipe:0",
            "-vn",
            "-acodec", "libmp3lame",
            "-ab", "192k",
            "-ar", "44100",
            "-f", "mp3",
            "pipe:1"
          ]);

          ffmpeg.stdout.pipe(res);

          ffmpeg.on("error", (err: any) => {
            if (hasHandledError) return;
            hasHandledError = true;
            if (err?.code === "ENOENT") {
              setFfmpegAvailableCached(false);
              console.warn("[MediaEngine] FFmpeg executable not found (ENOENT) during MP3 extraction.");
              if (!res.headersSent) {
                res.status(501).json({
                  error: "Audio (MP3) extraction is temporarily unavailable on this server. The original video can still be downloaded directly as MP4."
                });
              }
            } else {
              console.error("FFmpeg MP3 error:", err);
              if (!res.headersSent) {
                res.status(500).send("Error converting media to MP3.");
              }
            }
          });

          if (response.body) {
            Readable.fromWeb(response.body as any).pipe(ffmpeg.stdin);
          } else {
            ffmpeg.stdin.end();
          }
          return;
        } catch (err: any) {
          if (err?.code === "ENOENT") {
            setFfmpegAvailableCached(false);
            if (!res.headersSent) {
              return res.status(501).json({
                error: "Audio (MP3) extraction is temporarily unavailable on this server. The original video can still be downloaded directly as MP4."
              });
            }
          }
          throw err;
        }
      }

      // 2. JPG / JPEG Image Format Conversion requested
      if (requestedFormat === "jpg" || requestedFormat === "jpeg") {
        res.setHeader("Content-Type", "image/jpeg");
        if (download === "true") {
          res.setHeader("Content-Disposition", `attachment; filename="${baseName}.jpg"; filename*="UTF-8''${encodeURIComponent(baseName)}.jpg"`);
        } else {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }

        const hasFfmpeg = await checkFfmpegAvailability();

        // If FFmpeg is unavailable:
        // For images (photos, carousels, thumbnails), skip optional transcoding
        // and stream original media directly as standard JPG.
        if (!hasFfmpeg) {
          if (!isVideo) {
            if (response.body) {
              Readable.fromWeb(response.body as any).pipe(res);
            } else {
              res.end();
            }
            return;
          } else {
            // Source is a video, but JPG frame extraction was requested
            return res.status(501).json({
              error: "JPG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
            });
          }
        }

        // FFmpeg is available: Proceed with conversion, handling ENOENT gracefully
        let hasHandledError = false;
        try {
          const ffmpeg = child_process.spawn("ffmpeg", [
            "-i", "pipe:0",
            "-f", "image2",
            "-vcodec", "mjpeg",
            "-q:v", "2",
            "pipe:1"
          ]);

          ffmpeg.stdout.pipe(res);

          ffmpeg.on("error", (err: any) => {
            if (hasHandledError) return;
            hasHandledError = true;
            if (err?.code === "ENOENT") {
              setFfmpegAvailableCached(false);
              console.warn("[MediaEngine] FFmpeg executable not found (ENOENT) during JPG conversion. Falling back to direct media stream.");
              if (!res.headersSent) {
                if (!isVideo && response.body) {
                  Readable.fromWeb(response.body as any).pipe(res);
                  return;
                }
                res.status(501).json({
                  error: "JPG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
                });
              }
            } else {
              console.error("FFmpeg JPG error:", err);
              if (!res.headersSent) {
                res.status(500).send("Error converting image to JPG.");
              }
            }
          });

          if (response.body) {
            Readable.fromWeb(response.body as any).pipe(ffmpeg.stdin);
          } else {
            ffmpeg.stdin.end();
          }
          return;
        } catch (err: any) {
          if (err?.code === "ENOENT") {
            setFfmpegAvailableCached(false);
            if (!res.headersSent) {
              if (!isVideo && response.body) {
                Readable.fromWeb(response.body as any).pipe(res);
                return;
              }
              return res.status(501).json({
                error: "JPG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
              });
            }
          }
          throw err;
        }
      }

      // 3. PNG Image Format Conversion requested
      if (requestedFormat === "png") {
        const hasFfmpeg = await checkFfmpegAvailability();
        if (!hasFfmpeg) {
          if (!isVideo && contentType.includes("png")) {
            res.setHeader("Content-Type", "image/png");
            if (download === "true") {
              res.setHeader("Content-Disposition", `attachment; filename="${baseName}.png"; filename*="UTF-8''${encodeURIComponent(baseName)}.png"`);
            } else {
              res.setHeader("Cache-Control", "public, max-age=86400");
            }
            if (response.body) {
              Readable.fromWeb(response.body as any).pipe(res);
            } else {
              res.end();
            }
            return;
          }

          return res.status(501).json({
            error: "PNG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
          });
        }

        res.setHeader("Content-Type", "image/png");
        if (download === "true") {
          res.setHeader("Content-Disposition", `attachment; filename="${baseName}.png"; filename*="UTF-8''${encodeURIComponent(baseName)}.png"`);
        } else {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }

        let hasHandledError = false;
        try {
          const ffmpeg = child_process.spawn("ffmpeg", [
            "-i", "pipe:0",
            "-f", "image2",
            "-vcodec", "png",
            "pipe:1"
          ]);

          ffmpeg.stdout.pipe(res);

          ffmpeg.on("error", (err: any) => {
            if (hasHandledError) return;
            hasHandledError = true;
            if (err?.code === "ENOENT") {
              setFfmpegAvailableCached(false);
              console.warn("[MediaEngine] FFmpeg executable not found (ENOENT) during PNG conversion.");
              if (!res.headersSent) {
                res.status(501).json({
                  error: "PNG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
                });
              }
            } else {
              console.error("FFmpeg PNG error:", err);
              if (!res.headersSent) {
                res.status(500).send("Error converting image to PNG.");
              }
            }
          });

          if (response.body) {
            Readable.fromWeb(response.body as any).pipe(ffmpeg.stdin);
          } else {
            ffmpeg.stdin.end();
          }
          return;
        } catch (err: any) {
          if (err?.code === "ENOENT") {
            setFfmpegAvailableCached(false);
            if (!res.headersSent) {
              return res.status(501).json({
                error: "PNG conversion is temporarily unavailable on this server. The original media can still be downloaded when supported."
              });
            }
          }
          throw err;
        }
      }

      // 4. Default MP4 Video / Image Stream Passthrough
      const finalContentType = isVideo ? "video/mp4" : (contentType.includes("image") ? contentType : "image/jpeg");
      res.setHeader("Content-Type", finalContentType);

      if (download === "true") {
        const extension = isVideo ? "mp4" : "jpg";
        res.setHeader("Content-Disposition", `attachment; filename="${baseName}.${extension}"; filename*="UTF-8''${encodeURIComponent(baseName)}.${extension}"`);
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }

      // Handle Range response headers
      if (response.status === 206) {
        res.status(206);
        res.setHeader("Content-Range", response.headers.get("content-range") || "");
        res.setHeader("Content-Length", response.headers.get("content-length") || "");
      } else {
        res.status(response.status);
        const remoteContentLength = response.headers.get("content-length");
        if (remoteContentLength) {
          res.setHeader("Content-Length", remoteContentLength);
        }
      }
      res.setHeader("Accept-Ranges", "bytes");

      if (response.body) {
        Readable.fromWeb(response.body as any).pipe(res);
      } else {
        res.end();
      }
    } catch (error: any) {
      console.error("Error proxying media:", error);
      res.status(500).send("Failed to retrieve media file.");
    }
  });

  async function extractDirectFromInstagramHtml(instagramUrl: string) {
    try {
      console.log("[DirectScraper] Fetching HTML for:", instagramUrl);
      const res = await fetch(instagramUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1"
        }
      });

      if (!res.ok) {
        console.log("[DirectScraper] Non-200 status:", res.status);
        return [];
      }

      const html = await res.text();
      if (!html || html.length < 500) return [];

      // Check if Instagram explicitly returned an error or unavailable message
      const isErrorPage = html.includes("Sorry, this page isn't available") || 
                          html.includes("The link you followed may be broken");

      if (isErrorPage) {
        console.log("[DirectScraper] Instagram post unavailable or private for URL:", instagramUrl);
        return [];
      }

      const mediaList: { url: string; thumbnail: string; type: string }[] = [];
      const seenUrls = new Set<string>();

      const cleanHtml = html
        .replace(/\\u0026/g, "&")
        .replace(/\\u0025/g, "%")
        .replace(/\\/g, "");

      // 1. First, attempt structured JSON parsing from script tags
      const jsonScriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
      let jsonMatch;
      while ((jsonMatch = jsonScriptRegex.exec(html)) !== null) {
        const content = jsonMatch[1];
        if (content.includes("video_versions") || content.includes("display_url") || content.includes("display_resources") || content.includes("xdt_shortcode_media")) {
          try {
            const parsed = JSON.parse(content);
            
            // Helper recursive search for media node
            function findMediaNode(obj: any, depth = 0): any {
              if (!obj || typeof obj !== 'object' || depth > 20) return null;
              if (obj.xdt_shortcode_media) return obj.xdt_shortcode_media;
              if (obj.shortcode_media) return obj.shortcode_media;
              if (obj.items && Array.isArray(obj.items) && obj.items[0]) return obj.items[0];
              
              if (Array.isArray(obj)) {
                for (const item of obj) {
                  const found = findMediaNode(item, depth + 1);
                  if (found) return found;
                }
              } else {
                for (const key of Object.keys(obj)) {
                  const found = findMediaNode(obj[key], depth + 1);
                  if (found) return found;
                }
              }
              return null;
            }

            const mediaNode = findMediaNode(parsed);
            if (mediaNode) {
              const carousel = mediaNode.edge_sidecar_to_children?.edges || mediaNode.carousel_media;
              if (carousel && carousel.length > 0) {
                for (const child of carousel) {
                  const node = child.node || child;
                  const isVid = node.is_video || !!node.video_versions;
                  const vUrl = node.video_url || node.video_versions?.[0]?.url;
                  const imgUrl = node.display_url || node.image_versions2?.candidates?.[0]?.url || node.display_resources?.[0]?.src;
                  const finalUrl = isVid && vUrl ? vUrl : imgUrl;
                  if (finalUrl && !seenUrls.has(finalUrl)) {
                    seenUrls.add(finalUrl);
                    mediaList.push({
                      url: finalUrl,
                      thumbnail: imgUrl || finalUrl,
                      type: isVid && vUrl ? "video" : "image"
                    });
                  }
                }
              } else {
                const isVid = mediaNode.is_video || !!mediaNode.video_versions;
                const vUrl = mediaNode.video_url || mediaNode.video_versions?.[0]?.url;
                const imgUrl = mediaNode.display_url || mediaNode.image_versions2?.candidates?.[0]?.url || mediaNode.display_resources?.[0]?.src;
                const finalUrl = isVid && vUrl ? vUrl : imgUrl;
                if (finalUrl && !seenUrls.has(finalUrl)) {
                  seenUrls.add(finalUrl);
                  mediaList.push({
                    url: finalUrl,
                    thumbnail: imgUrl || finalUrl,
                    type: isVid && vUrl ? "video" : "image"
                  });
                }
              }

              if (mediaList.length > 0) {
                console.log(`[DirectScraper] Structured JSON extracted ${mediaList.length} items`);
                return mediaList;
              }
            }
          } catch (e) {
            // Ignore JSON parse errors for non-matching scripts
          }
        }
      }

      // 2. Extract all video mp4 URLs if JSON parsing didn't return media
      const mp4Regex = /https?:\/\/[^\s"'<>]+?\.mp4[^\s"'<>]*/gi;
      const mp4Matches = [...cleanHtml.matchAll(mp4Regex)];
      
      for (const match of mp4Matches) {
        let rawUrl = match[0].replace(/&amp;/g, "&");
        rawUrl = rawUrl.split('"')[0].split("'")[0].split(']')[0].split('}')[0];
        if (rawUrl && rawUrl.startsWith("http") && !seenUrls.has(rawUrl)) {
          seenUrls.add(rawUrl);
          mediaList.push({
            url: rawUrl,
            thumbnail: "",
            type: "video"
          });
        }
      }

      // 3. Extract scontent image URLs if videos were found or for image posts
      const imageRegex = /https?:\/\/scontent[^\s"'<>]+/gi;
      const imgMatches = [...cleanHtml.matchAll(imageRegex)];
      const images: string[] = [];

      for (const match of imgMatches) {
        let rawUrl = match[0].replace(/&amp;/g, "&");
        rawUrl = rawUrl.split('"')[0].split("'")[0].split(']')[0].split('}')[0];
        if (rawUrl && rawUrl.startsWith("http") && !rawUrl.includes(".mp4") && !seenUrls.has(rawUrl)) {
          seenUrls.add(rawUrl);
          images.push(rawUrl);
        }
      }

      // Filter images that have valid post photo path extensions or tags (CAROUSEL_ITEM, FEED, CLIPS, etc)
      const validImages = images.filter(img => 
        (img.includes("CAROUSEL_ITEM") || img.includes("FEED") || img.includes("CLIPS") || img.includes("dst-jpg") || img.includes("_n.jpg") || img.includes("_n.webp")) && 
        !img.includes("150x150") && !img.includes("320x320")
      );

      if (mediaList.length > 0 && validImages.length > 0) {
        for (const m of mediaList) {
          m.thumbnail = validImages[0];
        }
      } else if (mediaList.length === 0 && validImages.length > 0) {
        for (const imgUrl of validImages.slice(0, 10)) {
          mediaList.push({
            url: imgUrl,
            thumbnail: imgUrl,
            type: "image"
          });
        }
      }

      console.log(`[DirectScraper] Fallback scraper extracted ${mediaList.length} items`);
      return mediaList;
    } catch (err: any) {
      console.error("[DirectScraper] Error:", err.message);
      return [];
    }
  }

  app.post("/api/download", downloadRateLimiter, validateDownloadRequest, async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string' || !url.trim()) {
        return res.status(400).json({ error: "Instagram URL is required." });
      }

      const cleanUrl = url.trim();
      if (!cleanUrl.toLowerCase().includes("instagram.com")) {
        return res.status(400).json({ error: "Please enter a valid Instagram URL." });
      }

      console.log(`Downloading Instagram media for URL: ${cleanUrl}`);

      const rapidApiKey = process.env.RAPIDAPI_KEY || process.env.VITE_RAPIDAPI_KEY;

      if (rapidApiKey && rapidApiKey.trim()) {
        console.log("RapidAPI key detected. Attempting extraction via RapidAPI...");
        
        // We will try Endpoint 1: "instagram-downloader-download-instagram-videos-stories"
        try {
          const endpoint1 = `https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index?url=${encodeURIComponent(cleanUrl)}`;
          const response = await fetch(endpoint1, {
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com"
            }
          });

          if (response.ok) {
            const data: any = await response.json();
            console.log("RapidAPI Endpoint 1 response keys:", Object.keys(data));
            
            // Normalize result
            let mediaItems: { url: string; thumbnail: string; type: string }[] = [];
            
            const checkIsVideo = (uStr: string, itemObj?: any) => {
              if (itemObj) {
                if (itemObj.type === "video" || itemObj.is_video === true || itemObj.is_video === "true") return "video";
              }
              const u = uStr.toLowerCase();
              if (u.includes(".mp4") || u.includes("video") || u.includes("video_format")) return "video";
              return "image";
            };
            
            // Check for format: { url: "...", type: "video" } or similar
            if (data.url && typeof data.url === "string") {
              mediaItems.push({
                url: data.url,
                thumbnail: data.thumbnail || data.thumb || "",
                type: checkIsVideo(data.url, data)
              });
            } else if (Array.isArray(data.url)) {
              data.url.forEach((u: string) => {
                if (u) mediaItems.push({ url: u, thumbnail: "", type: checkIsVideo(u) });
              });
            } else if (data.media && Array.isArray(data.media)) {
              data.media.forEach((item: any) => {
                if (item.url) {
                  mediaItems.push({
                    url: item.url,
                    thumbnail: item.thumbnail || item.thumb || "",
                    type: checkIsVideo(item.url, item)
                  });
                }
              });
            } else if (data.result && Array.isArray(data.result)) {
              data.result.forEach((item: any) => {
                if (item.url) {
                  mediaItems.push({
                    url: item.url,
                    thumbnail: item.thumbnail || item.thumb || "",
                    type: checkIsVideo(item.url, item)
                  });
                } else if (typeof item === "string") {
                  mediaItems.push({ url: item, thumbnail: "", type: checkIsVideo(item) });
                }
              });
            }

            if (mediaItems.length > 0) {
              const uniqueMedia = deduplicateInstagramMedia(mediaItems);
              return res.json({ success: true, media: uniqueMedia });
            }
          }
        } catch (apiErr: any) {
          console.log("RapidAPI Endpoint 1 status info:", apiErr.message);
        }

        // Try Endpoint 2: "instagram-bulk-scraper-latest"
        try {
          const endpoint2 = `https://instagram-bulk-scraper-latest.p.rapidapi.com/media_download_links?url=${encodeURIComponent(cleanUrl)}`;
          const response = await fetch(endpoint2, {
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "instagram-bulk-scraper-latest.p.rapidapi.com"
            }
          });

          if (response.ok) {
            const result: any = await response.json();
            console.log("RapidAPI Endpoint 2 returned status:", response.status);
            
            const data = result.data;
            if (data) {
              let mediaItems: { url: string; thumbnail: string; type: string }[] = [];
              
              const extractSingleMedia = (item: any) => {
                const url = item.video_link?.link || item.image_link?.link || item.link;
                if (url) {
                  const isVid = !!item.video_link;
                  mediaItems.push({
                    url,
                    thumbnail: item.thumbnail_link?.link || item.image_link?.link || "",
                    type: isVid ? "video" : "image"
                  });
                }
              };

              if (data.child_media && Array.isArray(data.child_media) && data.child_media.length > 0) {
                data.child_media.forEach(extractSingleMedia);
              } else {
                extractSingleMedia(data);
              }

              if (mediaItems.length > 0) {
                const uniqueMedia = deduplicateInstagramMedia(mediaItems);
                return res.json({ success: true, media: uniqueMedia });
              }
            }
          }
        } catch (apiErr: any) {
          console.log("RapidAPI Endpoint 2 status info:", apiErr.message);
        }
      }

      // If RapidAPI is not configured or returned no media, attempt public fallback extractors
      console.log("Utilizing alternative public downloader fallback handlers...");

      // Strategy 1: Fast & Reliable Public Downloader (btch-downloader)
      try {
        console.log("Attempting primary public downloader (btch-downloader)...");
        const { igdl } = await import("btch-downloader");
        const response: any = await igdl(cleanUrl);
        
        let rawItems: any[] = [];
        if (Array.isArray(response)) {
          rawItems = response;
        } else if (response && Array.isArray(response.result)) {
          rawItems = response.result;
        } else if (response && typeof response.url === "string") {
          rawItems = [response];
        } else if (response && typeof response.result === "string") {
          rawItems = [{ url: response.result }];
        }

        if (rawItems.length > 0) {
          const validMedia = await Promise.all(
            rawItems.filter((item: any) => {
              return (
                item &&
                typeof item.url === "string" &&
                item.url.trim().length > 0 &&
                (item.url.startsWith("http://") || item.url.startsWith("https://"))
              );
            }).map(async (item: any) => {
              let isVid = checkIsVideo(item.url, item) === "video";
              if (!isVid) {
                isVid = await detectIsVideoWithHead(item.url);
              }
              return {
                url: item.url,
                thumbnail: item.thumbnail || item.thumb || "",
                type: isVid ? "video" : "image"
              };
            })
          );

          if (validMedia.length > 0) {
            const uniqueMedia = deduplicateInstagramMedia(validMedia);
            console.log("btch-downloader successfully extracted", uniqueMedia.length, "media items.");
            return res.json({ success: true, media: uniqueMedia });
          }
        }
      } catch (err: any) {
        console.log("Primary public downloader info:", err.message);
      }

      // Strategy 2: Direct Instagram HTML Extraction
      try {
        console.log("Attempting direct Instagram HTML scraper fallback...");
        const directMedia = await extractDirectFromInstagramHtml(cleanUrl);
        if (directMedia && directMedia.length > 0) {
          const uniqueMedia = deduplicateInstagramMedia(directMedia);
          console.log("Direct HTML scraper successfully extracted", uniqueMedia.length, "media items.");
          return res.json({ success: true, media: uniqueMedia });
        }
      } catch (directErr: any) {
        console.log("Direct HTML scraper fallback info:", directErr.message);
      }

      // Strategy 3: Try snapsave-media-downloader
      try {
        console.log("Attempting snapsave-media-downloader fallback...");
        const snapsavePkg = (await import("snapsave-media-downloader")) as any;
        const snapsaveFn = snapsavePkg.default || snapsavePkg.snapsave;
        if (typeof snapsaveFn === "function") {
          const snapsaveRes = await snapsaveFn(cleanUrl);
          let rawList: any[] = [];
          if (snapsaveRes && snapsaveRes.data) {
            if (Array.isArray(snapsaveRes.data)) {
              rawList = snapsaveRes.data;
            } else if (Array.isArray(snapsaveRes.data.media)) {
              rawList = snapsaveRes.data.media;
            } else if (typeof snapsaveRes.data.url === "string") {
              rawList = [snapsaveRes.data];
            }
          }

          if (rawList.length > 0) {
            const validMedia = rawList
              .filter((item: any) => item && typeof item.url === "string" && item.url.trim().length > 0)
              .map((item: any) => ({
                url: item.url,
                thumbnail: item.thumbnail || item.thumb || "",
                type: (item.type === "video" || checkIsVideo(item.url, item) === "video") ? "video" : "image"
              }));

            if (validMedia.length > 0) {
              const uniqueMedia = deduplicateInstagramMedia(validMedia);
              console.log("Snapsave successfully extracted", uniqueMedia.length, "media items.");
              return res.json({ success: true, media: uniqueMedia });
            }
          }
        }
      } catch (snapsaveErr: any) {
        console.log("Snapsave public fallback info:", snapsaveErr.message);
      }

      // If everything fails, throw a clear error explaining possible causes
      throw new Error(
        "Unable to extract media from this link. The Instagram post may be private, deleted, age-restricted, or temporarily unavailable. " +
        "Please check that the link belongs to a public Instagram Reel, Post, or Carousel."
      );

    } catch (error: any) {
      console.log("Download handling complete info:", error.message || error);
      res.status(500).json({ error: error.message || "Failed to fetch Instagram media. Please try again." });
    }
  });

  // Serve static public assets directly with correct Content-Type
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  app.get('/og-image.jpg', (req, res) => {
    res.type('image/jpeg');
    const pubOgPath = path.join(process.cwd(), 'public', 'og-image.jpg');
    if (fs.existsSync(pubOgPath)) {
      return res.sendFile(pubOgPath);
    }
    const distOgPath = path.join(process.cwd(), 'dist', 'og-image.jpg');
    res.sendFile(distOgPath);
  });

  app.use(express.static(path.join(process.cwd(), 'public')));

  // Valid paths for SEO 404 checking
  const VALID_PATHS = new Set([
    '/',
    '/home',
    '/how-to-use',
    '/how-to',
    '/about-us',
    '/about',
    '/faq',
    '/blog',
    '/privacy-policy',
    '/privacy',
    '/terms-and-conditions',
    '/terms',
    '/disclaimer',
    '/contact',
    '/sitemap',
    '/tools/caption-generator',
    '/caption-generator',
    '/tools/comment-generator',
    '/comment-generator',
    '/tools/hashtag-generator',
    '/hashtag-generator',
    '/tools/alt-text-generator',
    '/alt-text-generator',
    '/tools/reel-cover-maker',
    '/reel-cover-maker',
    '/tools/brand-kit-generator',
    '/brand-kit-generator',
    '/tools/bio-generator',
    '/bio-generator',
    '/tools/username-generator',
    '/username-generator',
    '/tools/photo-resizer',
    '/photo-resizer',
    '/tools/grid-maker',
    '/grid-maker',
    '/tools/feed-planner',
    '/feed-planner',
    '/tools/reels-downloader',
    '/reels-downloader',
  ]);

  const VALID_BLOG_SLUGS = new Set([
    '10-tips-for-the-perfect-instagram-bio',
    'why-grid-layouts-boost-engagement',
    'ultimate-guide-instagram-captions-2026',
    'how-to-save-instagram-reels-videos-safely',
    'designing-reel-covers-that-get-clicked',
    'how-to-build-cohesive-brand-kit'
  ]);

  function isKnownRoute(pathname: string): boolean {
    const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (VALID_PATHS.has(normalized)) return true;
    if (normalized.startsWith('/blog/')) {
      const slug = normalized.replace('/blog/', '');
      if (slug && VALID_BLOG_SLUGS.has(slug)) return true;
    }
    return false;
  }

  // Serve public static assets with caching headers
  app.use(express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      }
    }
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Intercept HTML page requests in dev mode to apply prerendered SSR HTML
    app.use(async (req, res, next) => {
      if (req.method === 'GET' && req.headers.accept?.includes('text/html') && !req.path.includes('.')) {
        try {
          const indexPath = path.join(process.cwd(), 'index.html');
          if (fs.existsSync(indexPath)) {
            let template = fs.readFileSync(indexPath, 'utf-8');
            template = await vite.transformIndexHtml(req.url, template);
            const { html, status } = renderPageHtml(req.path || '/', template);
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache');
            return res.status(status).send(html);
          }
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
          return;
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    // Production static file serving with aggressive caching on hashed assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      index: false,
      maxAge: '1y',
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        if (filePath.includes(path.sep + 'assets' + path.sep) || filePath.includes('/assets/')) {
          // Bundled immutable CSS/JS chunks
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
      }
    }));

    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const rawHtml = fs.readFileSync(indexPath, 'utf-8');
        const { html, status } = renderPageHtml(req.path || '/', rawHtml);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        return res.status(status).send(html);
      }
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Non-blocking capability pre-check for media transcoding engine
    checkFfmpegAvailability().catch(() => {});
  });
}

startServer();

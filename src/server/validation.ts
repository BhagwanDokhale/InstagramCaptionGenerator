import { Request, Response, NextFunction } from "express";

const ALLOWED_IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif"
]);

// Maximum allowed base64 string length (~8MB raw binary payload)
const MAX_IMAGE_BASE64_LENGTH = 11 * 1024 * 1024;

/**
 * Validates a base64 image string for size and mime type
 */
export function validateBase64Image(image: unknown): { isValid: boolean; error?: string } {
  if (typeof image !== "string" || !image.trim()) {
    return { isValid: false, error: "Image data is empty or invalid." };
  }

  if (image.length > MAX_IMAGE_BASE64_LENGTH) {
    return { isValid: false, error: "Please upload a supported image within the 8MB size limit." };
  }

  if (image.startsWith("data:")) {
    const match = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return { isValid: false, error: "Please upload a supported image in JPEG, PNG, or WebP format." };
    }
    const mime = match[1].toLowerCase();
    if (!ALLOWED_IMAGE_MIMES.has(mime)) {
      return { isValid: false, error: "Unsupported image format. Please upload a JPEG, PNG, WebP, or GIF image." };
    }
  }

  return { isValid: true };
}

// 1. Caption Generator Validation
export function validateCaptionRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { category, customTopic, language, image } = body;

  if (customTopic !== undefined && typeof customTopic !== "string") {
    return res.status(400).json({ error: "Topic must be a text string." });
  }

  if (customTopic && customTopic.length > 3000) {
    console.warn(`[Security Alert] Oversized customTopic received (${customTopic.length} chars) from IP ${req.ip}`);
    return res.status(400).json({ error: "Your input is too long. Please shorten your topic or description and try again." });
  }

  if (category !== undefined && (typeof category !== "string" || category.length > 100)) {
    return res.status(400).json({ error: "Invalid category selection." });
  }

  if (language !== undefined && (typeof language !== "string" || language.length > 50)) {
    return res.status(400).json({ error: "Invalid language selection." });
  }

  if (image) {
    const imgCheck = validateBase64Image(image);
    if (!imgCheck.isValid) {
      return res.status(400).json({ error: imgCheck.error });
    }
  }

  const hasTopic = (typeof customTopic === "string" && customTopic.trim().length > 0) ||
                   (typeof category === "string" && category.trim().length > 0);
  
  if (!hasTopic && !image) {
    return res.status(400).json({ error: "Please provide a topic, category, or upload an image to generate captions." });
  }

  next();
}

// 2. Comment Generator Validation
export function validateCommentRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { topic, tone, relationship, length, language, image } = body;

  if (topic !== undefined && typeof topic !== "string") {
    return res.status(400).json({ error: "Post description must be a text string." });
  }

  if (topic && topic.length > 3000) {
    console.warn(`[Security Alert] Oversized comment topic received (${topic.length} chars) from IP ${req.ip}`);
    return res.status(400).json({ error: "Your input is too long. Please shorten your post topic and try again." });
  }

  if (tone !== undefined && (typeof tone !== "string" || tone.length > 100)) {
    return res.status(400).json({ error: "Invalid tone parameter." });
  }

  if (relationship !== undefined && (typeof relationship !== "string" || relationship.length > 100)) {
    return res.status(400).json({ error: "Invalid relationship parameter." });
  }

  if (length !== undefined && (typeof length !== "string" || length.length > 100)) {
    return res.status(400).json({ error: "Invalid length parameter." });
  }

  if (language !== undefined && (typeof language !== "string" || language.length > 50)) {
    return res.status(400).json({ error: "Invalid language selection." });
  }

  if (image) {
    const imgCheck = validateBase64Image(image);
    if (!imgCheck.isValid) {
      return res.status(400).json({ error: imgCheck.error });
    }
  }

  const hasTopic = typeof topic === "string" && topic.trim().length > 0;
  if (!hasTopic && !image) {
    return res.status(400).json({ error: "Please enter a post context/topic or upload an image." });
  }

  next();
}

// 3. Bio Generator Validation
export function validateBioRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { details, tone } = body;

  if (details !== undefined && typeof details !== "string") {
    return res.status(400).json({ error: "Bio details must be a text string." });
  }

  if (details && details.length > 2000) {
    console.warn(`[Security Alert] Oversized bio details received (${details.length} chars) from IP ${req.ip}`);
    return res.status(400).json({ error: "Your input is too long. Please shorten your bio details and try again." });
  }

  if (tone !== undefined && (typeof tone !== "string" || tone.length > 100)) {
    return res.status(400).json({ error: "Invalid tone parameter." });
  }

  next();
}

// 4. Username Generator Validation
export function validateUsernameRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { keywords, niche, style } = body;

  if (!keywords || typeof keywords !== "string" || !keywords.trim()) {
    return res.status(400).json({ error: "Please provide keywords or a name for username generation." });
  }

  if (keywords.length > 500) {
    return res.status(400).json({ error: "Your keywords are too long. Please shorten your input and try again." });
  }

  if (niche !== undefined && (typeof niche !== "string" || niche.length > 100)) {
    return res.status(400).json({ error: "Invalid niche parameter." });
  }

  if (style !== undefined && (typeof style !== "string" || style.length > 100)) {
    return res.status(400).json({ error: "Invalid style parameter." });
  }

  next();
}

// 5. Hashtag Generator Validation
export function validateHashtagRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { topic, platform, strategy, count } = body;

  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return res.status(400).json({ error: "Please enter a topic or niche to generate hashtags." });
  }

  if (topic.length > 2000) {
    return res.status(400).json({ error: "Your input is too long. Please shorten your topic and try again." });
  }

  if (platform !== undefined && (typeof platform !== "string" || platform.length > 100)) {
    return res.status(400).json({ error: "Invalid platform selection." });
  }

  if (strategy !== undefined && (typeof strategy !== "string" || strategy.length > 100)) {
    return res.status(400).json({ error: "Invalid strategy selection." });
  }

  if (count !== undefined) {
    const numCount = Number(count);
    if (isNaN(numCount) || numCount < 1 || numCount > 50) {
      return res.status(400).json({ error: "Hashtag count must be a number between 5 and 30." });
    }
  }

  next();
}

// 6. ALT Text Generator Validation
export function validateAltTextRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { image, keywords, useCase, tone } = body;

  if (keywords !== undefined && typeof keywords !== "string") {
    return res.status(400).json({ error: "Keywords must be a text string." });
  }

  if (keywords && keywords.length > 2000) {
    return res.status(400).json({ error: "Your input is too long. Please shorten your keywords and try again." });
  }

  if (useCase !== undefined && (typeof useCase !== "string" || useCase.length > 100)) {
    return res.status(400).json({ error: "Invalid use case parameter." });
  }

  if (tone !== undefined && (typeof tone !== "string" || tone.length > 100)) {
    return res.status(400).json({ error: "Invalid tone parameter." });
  }

  if (image) {
    const imgCheck = validateBase64Image(image);
    if (!imgCheck.isValid) {
      return res.status(400).json({ error: imgCheck.error });
    }
  }

  const hasKeywords = typeof keywords === "string" && keywords.trim().length > 0;
  if (!hasKeywords && !image) {
    return res.status(400).json({ error: "Please upload an image or provide descriptive keywords." });
  }

  next();
}

// 7. Brand Kit Generator Validation
export function validateBrandKitRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { brandName, brandNiche, brandVibe, language } = body;

  if (brandName !== undefined && typeof brandName !== "string") {
    return res.status(400).json({ error: "Brand name must be a text string." });
  }

  if (brandName && brandName.length > 200) {
    return res.status(400).json({ error: "Brand name must be under 200 characters." });
  }

  if (brandNiche !== undefined && typeof brandNiche !== "string") {
    return res.status(400).json({ error: "Brand niche must be a text string." });
  }

  if (brandNiche && brandNiche.length > 1000) {
    return res.status(400).json({ error: "Your input is too long. Please shorten your brand description and try again." });
  }

  if (brandVibe !== undefined && (typeof brandVibe !== "string" || brandVibe.length > 100)) {
    return res.status(400).json({ error: "Invalid brand vibe parameter." });
  }

  if (language !== undefined && (typeof language !== "string" || language.length > 50)) {
    return res.status(400).json({ error: "Invalid language selection." });
  }

  const hasName = typeof brandName === "string" && brandName.trim().length > 0;
  const hasNiche = typeof brandNiche === "string" && brandNiche.trim().length > 0;

  if (!hasName && !hasNiche) {
    return res.status(400).json({ error: "Please provide a brand name or niche to generate a brand kit." });
  }

  next();
}

// 8. Reels Downloader URL Validation
export function validateDownloadRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { url } = body;

  if (!url || typeof url !== "string" || !url.trim()) {
    return res.status(400).json({ error: "Instagram URL is required." });
  }

  const cleanUrl = url.trim();

  if (cleanUrl.length > 1000) {
    return res.status(400).json({ error: "URL is too long. Please provide a standard Instagram URL." });
  }

  const lower = cleanUrl.toLowerCase();
  if (!lower.startsWith("http://") && !lower.startsWith("https://")) {
    return res.status(400).json({ error: "Please enter a valid URL starting with https://." });
  }

  if (!lower.includes("instagram.com")) {
    return res.status(400).json({ error: "Please enter a valid Instagram post, Reel, or video URL." });
  }

  next();
}

// 9. Media Proxy Query Validation
export function validateProxyMediaRequest(req: Request, res: Response, next: NextFunction) {
  const { url, format, filename, download, type } = req.query;

  if (!url || typeof url !== "string" || !url.trim()) {
    return res.status(400).send("Media URL parameter is required.");
  }

  if (url.length > 3000) {
    return res.status(400).send("Media URL is invalid or excessively long.");
  }

  const testUrl = url.trim();
  if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
    return res.status(400).send("Invalid media URL protocol.");
  }

  if (format !== undefined) {
    if (typeof format !== "string" || !["mp3", "audio", "jpg", "jpeg", "png", "mp4"].includes(format.toLowerCase())) {
      return res.status(400).send("Unsupported conversion format.");
    }
  }

  if (filename !== undefined && typeof filename === "string" && filename.length > 150) {
    return res.status(400).send("Filename parameter is too long.");
  }

  if (download !== undefined && download !== "true" && download !== "false") {
    return res.status(400).send("Invalid download parameter.");
  }

  if (type !== undefined && type !== "video" && type !== "image") {
    return res.status(400).send("Invalid media type parameter.");
  }

  next();
}

// 10. Email Validation Route Validation
export function validateEmailRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { email } = body;

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Please provide an email address to verify." });
  }

  if (email.length > 254) {
    return res.status(400).json({ error: "Email address exceeds maximum length." });
  }

  next();
}

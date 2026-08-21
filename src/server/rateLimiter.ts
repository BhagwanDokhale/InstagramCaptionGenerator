import { Request, Response, NextFunction } from "express";

/**
 * ============================================================================
 * RATE LIMITER ARCHITECTURE & SCALING DOCUMENTATION
 * ============================================================================
 * 
 * Storage Model:
 * - Current Store: In-memory Map (`MemoryRateLimitStore`).
 * - Current Deployment Target: Single-server / single-instance deployment (e.g. standard Node.js server container).
 * 
 * Developer / Architecture Note:
 * The current rate limiter uses in-memory storage and is suitable for a
 * single-server/single-instance deployment. If the application is later deployed
 * across multiple server instances, containers, or serverless instances, rate-limit
 * state should be moved to a shared/distributed store such as Redis or another
 * centralized datastore.
 * 
 * Future Scaling & Multi-Instance Behavior:
 * - Single instance:
 *     Instance A -> In-memory rate limiter -> Requests tracked consistently.
 * - Multiple instances / Serverless:
 *     Instance A -> Counter A
 *     Instance B -> Counter B
 *     Instance C -> Counter C
 *   Because memory is not shared between processes/replicas, a client connecting to
 *   different instances would have independent counter buckets.
 *   
 * Future Redis Migration Path:
 * To migrate to Redis/distributed store in the future, implement the `RateLimitStore`
 * interface below (e.g., `RedisRateLimitStore`) and pass it to `createRateLimiter({ ... store: new RedisRateLimitStore() })`.
 * No endpoint route changes will be necessary.
 * ============================================================================
 */

export interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export interface RateLimitStore {
  /**
   * Increment the counter for a key within the window.
   * Returns current count and reset timestamp in ms.
   */
  increment(key: string, windowMs: number): Promise<RateLimitRecord> | RateLimitRecord;
  /**
   * Optional cleanup hook for maintenance.
   */
  cleanup?(): Promise<void> | void;
}

/**
 * In-memory Store Implementation
 * Suitable for single-instance Node.js processes.
 * Features automatic passive expiration and periodic sweep to prevent memory leaks.
 */
export class MemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, RateLimitRecord>();
  private cleanupTimer: NodeJS.Timeout | null = null;
  private readonly maxEntries: number;

  constructor(maxEntries = 10000) {
    this.maxEntries = maxEntries;

    // Periodic sweep every 2 minutes for stale keys
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, 120000);

    if (this.cleanupTimer && typeof this.cleanupTimer.unref === "function") {
      this.cleanupTimer.unref();
    }
  }

  increment(key: string, windowMs: number): RateLimitRecord {
    const now = Date.now();
    let record = this.store.get(key);

    if (!record || now > record.resetTime) {
      // If store reached maximum capacity, purge expired entries immediately to protect memory
      if (this.store.size >= this.maxEntries) {
        this.cleanup();
      }

      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.store.set(key, record);
    } else {
      record.count += 1;
    }

    return record;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [k, rec] of this.store.entries()) {
      if (now > rec.resetTime) {
        this.store.delete(k);
      }
    }
  }

  // Helper for tests/inspecting size
  size(): number {
    return this.store.size;
  }
}

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Max requests per window
  message?: string;
  name: string; // Identifier for logging and bucket scoping
  store?: RateLimitStore; // Optional custom store (defaults to shared in-memory store)
}

// Default shared in-memory store for single-instance deployment
const defaultMemoryStore = new MemoryRateLimitStore(20000);

/**
 * Creates an Express rate-limiting middleware.
 * Evaluates limits BEFORE downstream endpoint logic or expensive AI/cloud operations.
 */
export function createRateLimiter(config: RateLimitConfig) {
  const {
    windowMs,
    max,
    message = "Too many requests. Please wait a moment and try again.",
    name,
    store = defaultMemoryStore,
  } = config;

  return async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    // Determine client IP safely.
    // When Express has `app.set("trust proxy", 1)` enabled (or specific hops),
    // `req.ip` resolves the trusted client IP from the outermost proxy.
    // If not behind a proxy or if req.ip is unset, fallback safely to socket remote address.
    const clientIp = req.ip || req.socket.remoteAddress || "unknown-ip";
    const key = `${name}:${clientIp}`;
    const now = Date.now();

    try {
      const record = await store.increment(key, windowMs);

      const remaining = Math.max(0, max - record.count);
      const resetSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

      // Standard RateLimit HTTP headers (RFC 6585 compliant)
      res.setHeader("X-RateLimit-Limit", max.toString());
      res.setHeader("X-RateLimit-Remaining", remaining.toString());
      res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000).toString());

      if (record.count > max) {
        // Exceeded limit: Set standard Retry-After header (in seconds) and return 429
        res.setHeader("Retry-After", resetSeconds.toString());

        // Lightweight security log (no sensitive user data)
        console.warn(
          `[Security Alert] Rate limit exceeded for [${name}] from IP: ${clientIp}. Retry-After: ${resetSeconds}s`
        );

        return res.status(429).json({
          error: message,
        });
      }

      next();
    } catch (err) {
      // In case of unexpected limiter error, log and fail open safely so normal traffic isn't completely dropped
      console.error(`[RateLimit Error] Middleware error for ${name}:`, err);
      next();
    }
  };
}

/**
 * ============================================================================
 * PRESET RATE LIMITERS
 * Tuned strictly to endpoint cost, cloud resource protection, and normal user flow.
 * ============================================================================
 */

export const aiRateLimiter = createRateLimiter({
  name: "ai-generation",
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // 10 requests per minute per IP for Gemini AI calls
  message: "Too many requests. Please wait a moment and try again.",
});

export const downloadRateLimiter = createRateLimiter({
  name: "reels-downloader",
  windowMs: 60 * 1000, // 1 minute window
  max: 15, // 15 requests per minute per IP for Reels metadata extraction
  message: "Too many download requests. Please wait a moment and try again.",
});

export const mediaProxyRateLimiter = createRateLimiter({
  name: "media-proxy",
  windowMs: 60 * 1000, // 1 minute window
  max: 60, // 60 requests per minute per IP for media streaming and transcode
  message: "Too many media requests. Please wait a moment and try again.",
});

export const emailValidationRateLimiter = createRateLimiter({
  name: "email-validation",
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // 20 requests per minute per IP for DNS checks
  message: "Too many verification requests. Please wait a moment and try again.",
});


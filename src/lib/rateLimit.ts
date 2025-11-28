/**
 * Simple in-memory rate limiter
 * For production with multiple servers, consider using @upstash/ratelimit with Redis
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Map to store attempts per IP
const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup expired records periodically (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /** Maximum number of allowed requests */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Checks and updates rate limit for a given identifier (e.g., IP)
 * @param identifier - Unique identifier (usually user IP)
 * @param config - Rate limit configuration
 * @returns Result with rate limit information
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  
  let record = rateLimitMap.get(identifier);
  
  // If no record exists or it has expired, create a new one
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(identifier, record);
  }
  
  // Increment counter
  record.count++;
  
  const remaining = Math.max(0, config.maxRequests - record.count);
  const success = record.count <= config.maxRequests;
  
  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: Math.ceil(record.resetTime / 1000), // Unix timestamp in seconds
  };
}

/**
 * Extracts client IP from the request
 * Considers proxies and load balancers (Vercel, Cloudflare, etc)
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  
  // Tries several common headers
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback to 'unknown' if unable to determine
  return 'unknown';
}

/**
 * Rate limiting presets for different use cases
 */
export const RateLimitPresets = {
  /** Contact forms: 5 req/min */
  FORM_SUBMISSION: { maxRequests: 5, windowSeconds: 60 },
  
  /** Public APIs: 30 req/min */
  API_PUBLIC: { maxRequests: 30, windowSeconds: 60 },
  
  /** Preview/Draft: 10 req/min */
  PREVIEW: { maxRequests: 10, windowSeconds: 60 },
  
  /** Checkout: 3 req/min (evitar spam) */
  CHECKOUT: { maxRequests: 3, windowSeconds: 60 },
  
  /** Busca/Filtros: 60 req/min */
  SEARCH: { maxRequests: 60, windowSeconds: 60 },
} as const;

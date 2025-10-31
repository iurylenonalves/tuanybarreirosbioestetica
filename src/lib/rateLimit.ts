/**
 * Simple in-memory rate limiter
 * Para produção com múltiplos servers, considere usar @upstash/ratelimit com Redis
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Map para armazenar tentativas por IP
const rateLimitMap = new Map<string, RateLimitRecord>();

// Limpar registros expirados a cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /** Número máximo de requisições permitidas */
  maxRequests: number;
  /** Janela de tempo em segundos */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Verifica se uma requisição está dentro do limite de taxa
 * @param identifier - Identificador único (geralmente IP do usuário)
 * @param config - Configuração do rate limit
 * @returns Resultado com informações do rate limit
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  
  let record = rateLimitMap.get(identifier);
  
  // Se não existe registro ou expirou, criar novo
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(identifier, record);
  }
  
  // Incrementar contador
  record.count++;
  
  const remaining = Math.max(0, config.maxRequests - record.count);
  const success = record.count <= config.maxRequests;
  
  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: Math.ceil(record.resetTime / 1000), // Unix timestamp em segundos
  };
}

/**
 * Extrai IP do cliente da requisição
 * Considera proxies e load balancers (Vercel, Cloudflare, etc)
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  
  // Tenta vários headers comuns
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
  
  // Fallback para 'unknown' se não conseguir determinar
  return 'unknown';
}

/**
 * Presets de rate limiting para diferentes casos de uso
 */
export const RateLimitPresets = {
  /** Formulários de contato: 5 req/min */
  FORM_SUBMISSION: { maxRequests: 5, windowSeconds: 60 },
  
  /** APIs públicas: 30 req/min */
  API_PUBLIC: { maxRequests: 30, windowSeconds: 60 },
  
  /** Preview/Draft: 10 req/min */
  PREVIEW: { maxRequests: 10, windowSeconds: 60 },
  
  /** Checkout: 3 req/min (evitar spam) */
  CHECKOUT: { maxRequests: 3, windowSeconds: 60 },
  
  /** Busca/Filtros: 60 req/min */
  SEARCH: { maxRequests: 60, windowSeconds: 60 },
} as const;

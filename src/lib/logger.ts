/**
 * Helper for conditional logs based on environment
 * Sensitive logs should not appear in production
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * Development log
 */
export function devLog(...args: unknown[]): void {
  if (IS_DEVELOPMENT) {
    console.log('[DEV]', ...args);
  }
}

/**
 * Error log (appears in all environments, but sanitized in production)
 */
export function errorLog(message: string, error?: unknown): void {
  if (IS_PRODUCTION) {
    // In production, log only generic message
    console.error(message);
  } else {
    // In development, log full error
    console.error(message, error);
  }
}

/**
 * Info log (development only)
 */
export function infoLog(...args: unknown[]): void {
  if (IS_DEVELOPMENT) {
    console.info('[INFO]', ...args);
  }
}

/**
 * Warning log
 */
export function warnLog(...args: unknown[]): void {
  console.warn('[WARN]', ...args);
}

/**
 * Sanitizes sensitive data for logging
 */
export function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    
    // Obfuscate sensitive data
    if (lowerKey.includes('secret') || 
        lowerKey.includes('token') || 
        lowerKey.includes('password') ||
        lowerKey.includes('api') && lowerKey.includes('key')) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'string' && value.length > 50) {
      // Truncate long strings
      sanitized[key] = value.substring(0, 47) + '...';
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

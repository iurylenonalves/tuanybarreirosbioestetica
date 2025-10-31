/**
 * Helper para logs condicionais baseados no ambiente
 * Logs sensíveis não devem aparecer em produção
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * Log somente em desenvolvimento
 */
export function devLog(...args: unknown[]): void {
  if (IS_DEVELOPMENT) {
    console.log('[DEV]', ...args);
  }
}

/**
 * Log de erro (aparece em todos os ambientes, mas sanitizado em produção)
 */
export function errorLog(message: string, error?: unknown): void {
  if (IS_PRODUCTION) {
    // Em produção, logar apenas mensagem genérica
    console.error(message);
  } else {
    // Em desenvolvimento, logar erro completo
    console.error(message, error);
  }
}

/**
 * Log de informação (somente desenvolvimento)
 */
export function infoLog(...args: unknown[]): void {
  if (IS_DEVELOPMENT) {
    console.info('[INFO]', ...args);
  }
}

/**
 * Log de aviso
 */
export function warnLog(...args: unknown[]): void {
  console.warn('[WARN]', ...args);
}

/**
 * Sanitiza dados sensíveis para log
 */
export function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    
    // Ofuscar dados sensíveis
    if (lowerKey.includes('secret') || 
        lowerKey.includes('token') || 
        lowerKey.includes('password') ||
        lowerKey.includes('api') && lowerKey.includes('key')) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'string' && value.length > 50) {
      // Truncar strings longas
      sanitized[key] = value.substring(0, 47) + '...';
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

import { z } from 'zod';

// Regex para validações brasileiras
const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\s?)?[6-9]\d{3}[-\s]?\d{4}$/;
const cepRegex = /^\d{5}-?\d{3}$/;

// Schema para Checkout
export const checkoutSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email muito longo')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(phoneRegex, 'Telefone inválido. Use formato: (11) 99999-9999')
    .transform(val => val.replace(/\D/g, '')), // Remove caracteres não numéricos
  
  address: z.string()
    .min(5, 'Endereço deve ter no mínimo 5 caracteres')
    .max(200, 'Endereço muito longo')
    .trim(),
  
  city: z.string()
    .min(2, 'Cidade deve ter no mínimo 2 caracteres')
    .max(100, 'Cidade muito longa')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Cidade deve conter apenas letras')
    .trim(),
  
  zipCode: z.string()
    .regex(cepRegex, 'CEP inválido. Use formato: 00000-000')
    .transform(val => val.replace(/\D/g, '')), // Remove caracteres não numéricos
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Schema para Formulário de Contato
export const contactSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email muito longo')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(phoneRegex, 'Telefone inválido. Use formato: (11) 99999-9999')
    .transform(val => val.replace(/\D/g, '')),
  
  message: z.string()
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(1000, 'Mensagem muito longa (máximo 1000 caracteres)')
    .trim(),
  
  agreedToTerms: z.boolean()
    .refine(val => val === true, {
      message: 'Você precisa aceitar os termos de serviço'
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Schema para Newsletter/Email simples
export const newsletterSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email muito longo')
    .toLowerCase()
    .trim(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Função helper para formatar mensagens de erro
export function formatZodError(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    if (issue.path[0]) {
      errors[issue.path[0].toString()] = issue.message;
    }
  });
  return errors;
}

// Função helper para sanitizar strings (prevenir XSS)
export function sanitizeString(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

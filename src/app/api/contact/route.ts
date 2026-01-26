import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, RateLimitPresets } from '@/lib/rateLimit';
import { contactSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Origin Check - CSRF PROTECTION
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    const allowedOrigins = [
      `http://${host}`,
      `https://${host}`,
      'http://localhost:3000', 
    ];
    
    if (!origin || !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return NextResponse.json(
        { error: 'Origem não autorizada' },
        { status: 403 }
      );
    }

    // Rate Limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, RateLimitPresets.FORM_SUBMISSION);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Muitas requisições. Por favor, aguarde antes de enviar outra mensagem.',
          limit: rateLimitResult.limit,
          reset: rateLimitResult.reset
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    // Parse and validate the body
    const body = await request.json();

    //  Zod Validation
    const validatedData = contactSchema.parse(body);

    //  ALL: EMAIL SERVICE INTEGRATION
    // 
    // Option 1 - Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contato@seudominio.com',
    //   to: 'tuany@email.com',
    //   subject: `Contato de ${validatedData.name}`,
    //   html: `
    //     <h2>Nova mensagem do site</h2>
    //     <p><strong>Nome:</strong> ${validatedData.name}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     <p><strong>Telefone:</strong> ${validatedData.phone}</p>
    //     <p><strong>Mensagem:</strong></p>
    //     <p>${validatedData.message}</p>
    //   `
    // });
    //
    // Option 2 - SendGrid:
    // const msg = {
    //   to: 'tuany@email.com',
    //   from: 'contato@seudominio.com',
    //   subject: `Contato de ${validatedData.name}`,
    //   text: validatedData.message,
    //   html: `<strong>${validatedData.message}</strong>`,
    // };
    // await sgMail.send(msg);
    //
    // Option 3 - Nodemailer (Gmail SMTP):
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_APP_PASSWORD
    //   }
    // });
    // await transporter.sendMail({
    //   from: process.env.GMAIL_USER,
    //   to: 'tuany@email.com',
    //   subject: `Contato de ${validatedData.name}`,
    //   html: '...'
    // });

    // Development Logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Contato recebido:', {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message.substring(0, 50) + '...'
      });
    }

    // Success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      },
      { status: 200 }
    );

  } catch (error) {
    // Zod Validation Error
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    // Generic Error
    console.error('[ERROR] Erro ao processar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}

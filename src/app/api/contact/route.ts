import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, RateLimitPresets } from '@/lib/rateLimit';
import { contactSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting - PROTEÇÃO CONTRA SPAM
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

    // 2. Parse e validação do body
    const body = await request.json();

    // 3. Validação com Zod
    const validatedData = contactSchema.parse(body);

    // 4. TODO: INTEGRAÇÃO COM SERVIÇO DE EMAIL
    // Aqui você vai integrar com o serviço que a cliente escolher:
    // 
    // Opção 1 - Resend (Recomendado, fácil e profissional):
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
    // Opção 2 - SendGrid:
    // const msg = {
    //   to: 'tuany@email.com',
    //   from: 'contato@seudominio.com',
    //   subject: `Contato de ${validatedData.name}`,
    //   text: validatedData.message,
    //   html: `<strong>${validatedData.message}</strong>`,
    // };
    // await sgMail.send(msg);
    //
    // Opção 3 - Nodemailer (Gmail SMTP):
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

    // Por enquanto, apenas logamos (em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Contato recebido:', {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message.substring(0, 50) + '...'
      });
    }

    // 5. Resposta de sucesso
    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      },
      { status: 200 }
    );

  } catch (error) {
    // Erro de validação Zod
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

    // Erro genérico
    console.error('[ERROR] Erro ao processar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}

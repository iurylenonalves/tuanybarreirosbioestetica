import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-brand-dark-nude/10">
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-brown max-w-none space-y-6 text-gray-600">
          <p>
            A <strong>Tuany Barreiros Bioestética</strong> valoriza a privacidade de seus usuários e clientes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">1. Coleta de Dados</h2>
          <p>
            Coletamos informações pessoais que você nos fornece voluntariamente ao:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Realizar um cadastro em nosso site;</li>
            <li>Agendar uma consulta ou procedimento;</li>
            <li>Realizar uma compra em nossa loja virtual;</li>
            <li>Entrar em contato conosco via formulários ou WhatsApp.</li>
          </ul>
          <p>
            Os dados coletados podem incluir: nome completo, e-mail, telefone, endereço, CPF e dados de pagamento (processados de forma segura por gateways externos).
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">2. Uso dos Dados</h2>
          <p>
            Utilizamos seus dados para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processar agendamentos e pedidos;</li>
            <li>Enviar confirmações e atualizações sobre seus serviços/produtos;</li>
            <li>Responder a dúvidas e solicitações;</li>
            <li>Melhorar a experiência de navegação em nosso site;</li>
            <li>Enviar comunicações de marketing (caso você tenha consentido).</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">3. Compartilhamento de Dados</h2>
          <p>
            Não vendemos ou alugamos seus dados pessoais. Podemos compartilhar informações apenas com:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Prestadores de serviço essenciais (ex: processadores de pagamento, transportadoras para entrega de produtos);</li>
            <li>Autoridades judiciais ou governamentais, quando exigido por lei.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">4. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a funcionalidade do site e entender como você interage com nosso conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador ou do nosso banner de consentimento.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">5. Seus Direitos</h2>
          <p>
            De acordo com a LGPD, você tem direito a:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Confirmar a existência de tratamento de dados;</li>
            <li>Acessar seus dados;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a eliminação de dados desnecessários;</li>
            <li>Revogar seu consentimento a qualquer momento.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">6. Contato</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato conosco pelo e-mail: <strong>contato@tuanybarreiros.com.br</strong>.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}

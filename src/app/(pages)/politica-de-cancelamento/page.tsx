import React from 'react';

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-brand-dark-nude/10">
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-8">Política de Cancelamento e Reembolso</h1>
        
        <div className="prose prose-brown max-w-none space-y-6 text-gray-600">
          <p>
            A <strong>Tuany Barreiros Bioestética</strong> preza pela transparência e respeito aos seus clientes. Abaixo, detalhamos nossa política de cancelamento para serviços e devolução de produtos, em conformidade com o Código de Defesa do Consumidor (CDC).
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">1. Cancelamento de Agendamentos (Serviços)</h2>
          <p>
            Entendemos que imprevistos acontecem. Para garantir o bom funcionamento da clínica e o respeito aos horários de outros clientes, solicitamos que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Aviso Prévio:</strong> Cancelamentos ou reagendamentos devem ser comunicados com no mínimo <strong>24 horas de antecedência</strong>.</li>
            <li><strong>Não Comparecimento (No-Show):</strong> O não comparecimento sem aviso prévio poderá implicar na cobrança de uma taxa ou na perda do sinal pago para reserva do horário.</li>
            <li><strong>Atrasos:</strong> Atrasos superiores a 15 minutos podem resultar na redução do tempo de atendimento ou na necessidade de reagendamento, para não prejudicar o próximo cliente.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">2. Troca e Devolução de Produtos</h2>
          <p>
            Para compras realizadas em nossa loja virtual (e-commerce), seguimos o Artigo 49 do CDC:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Direito de Arrependimento:</strong> Você tem até <strong>7 (sete) dias corridos</strong> após o recebimento do produto para solicitar a devolução por arrependimento, desde que o produto esteja <strong>lacrado, sem uso e na embalagem original</strong>.</li>
            <li><strong>Produtos de Uso Pessoal (Cosméticos):</strong> Por questões de saúde e higiene, não aceitamos devolução ou troca de produtos cosméticos (cremes, gloss, séruns, etc.) que tenham sido abertos, testados ou cujos lacres tenham sido rompidos, exceto em caso de defeito de fabricação comprovado.</li>
            <li><strong>Produtos com Defeito:</strong> Caso o produto apresente defeito de fabricação, você tem até 30 dias para solicitar a troca.</li>
            <li><strong>Como Solicitar:</strong> Entre em contato pelo e-mail <strong>contato@tuanybarreiros.com.br</strong> ou WhatsApp informando o número do pedido e o motivo.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">3. Reembolsos</h2>
          <p>
            Os reembolsos serão processados após a análise do caso (cancelamento dentro do prazo ou recebimento do produto devolvido):
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Cartão de Crédito:</strong> O estorno será solicitado à operadora do cartão e poderá aparecer em até duas faturas subsequentes.</li>
            <li><strong>Pix ou Boleto:</strong> O reembolso será feito via transferência bancária para a conta do titular da compra em até 10 dias úteis.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">4. Pacotes de Serviços</h2>
          <p>
            Para pacotes de tratamentos estéticos adquiridos antecipadamente:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>O cancelamento do pacote pode ser solicitado a qualquer momento.</li>
            <li>Será descontado o valor das sessões já realizadas (pelo valor avulso de tabela, sem o desconto do pacote) e uma taxa administrativa de 10% sobre o saldo restante.</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}

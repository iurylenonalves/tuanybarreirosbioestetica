import React from 'react';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-brand-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-brand-dark-nude/10">
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-8">Termos de Uso</h1>
        
        <div className="prose prose-brown max-w-none space-y-6 text-gray-600">
          <p>
            Bem-vindo ao site da <strong>Tuany Barreiros Bioestética</strong>. Ao acessar e utilizar este site, você concorda com os seguintes Termos de Uso. Recomendamos que leia atentamente antes de prosseguir.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar nossos serviços, agendar consultas ou adquirir produtos através deste site, você declara ter lido, compreendido e aceito estes Termos de Uso e nossa Política de Privacidade.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">2. Uso do Site</h2>
          <p>
            Você concorda em utilizar este site apenas para fins lícitos e de acordo com a legislação vigente. É proibido:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Utilizar o site para publicar conteúdo ofensivo, ilegal ou que viole direitos de terceiros;</li>
            <li>Tentar acessar áreas restritas do site sem autorização;</li>
            <li>Utilizar bots ou scripts automatizados para coletar dados.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-brown mt-6">3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo deste site, incluindo textos, imagens, logotipos, vídeos e design, é de propriedade exclusiva da Tuany Barreiros Bioestética ou de seus licenciadores, sendo protegido pelas leis de direitos autorais e propriedade intelectual. É proibida a reprodução total ou parcial sem autorização prévia.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">4. Agendamentos e Compras</h2>
          <p>
            Os agendamentos de serviços e compras de produtos estão sujeitos à disponibilidade e confirmação. Nos reservamos o direito de cancelar pedidos ou agendamentos em caso de inconsistência de dados, falta de estoque ou impossibilidade de prestação do serviço, com o devido reembolso quando aplicável.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">5. Isenção de Responsabilidade</h2>
          <p>
            Embora nos esforcemos para manter as informações do site precisas e atualizadas, não garantimos que o conteúdo esteja livre de erros. As informações sobre tratamentos e produtos têm caráter informativo e não substituem a avaliação profissional presencial.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">6. Alterações nos Termos</h2>
          <p>
            Podemos atualizar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos a revisão periódica desta página.
          </p>

          <h2 className="text-xl font-bold text-brand-brown mt-6">7. Legislação Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas ou litígios oriundos destes termos.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}

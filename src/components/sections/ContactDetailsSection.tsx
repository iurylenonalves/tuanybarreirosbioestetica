import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactDetailsSection() {
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-brand-brown" />,
      title: 'Email',
      value: 'contato@tuanybarreiros.com.br',
      href: 'mailto:contato@tuanybarreiros.com.br',
    },
    {
      icon: <Phone size={24} className="text-brand-brown" />,
      title: 'Telefone',
      value: '+55 (11) 98765-4321',
      href: 'tel:+5511987654321',
    },
    {
      icon: <MapPin size={24} className="text-brand-brown" />,
      title: 'Endereço',
      value: 'Rua Oscar Freire, 1234 - São Paulo, SP',
      // TODO: Troque pelo link "Compartilhar" do Google Maps
      href: '#',
      target: '_blank',
    },
  ];

  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
          
          {/* Coluna Esquerda: Título e Mapa */}
          <div>
            <span className="text-sm font-semibold uppercase text-brand-dark-nude">
              Vamos conversar
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
              Fale conosco
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Estou pronta para esclarecer qualquer dúvida sobre nossos serviços de bioestética.
            </p>

            {/* Placeholder do Mapa do Google */}
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg shadow-md">              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30525.476516722898!2d-46.59747847045781!3d-23.51508555989273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5f365f75e849%3A0x2244bb10424d0f6e!2sPra%C3%A7a%20Santo%20Eduardo%20-%20Vila%20Maria%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002120-005%2C%20Brasil!5e1!3m2!1spt-BR!2suk!4v1761240911394!5m2!1spt-BR!2suk" // <-- COLE O SRC DO GOOGLE MAPS AQUI
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Coluna Direita: Informações de Contato */}
          <div className="space-y-8 pt-4">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                  <a 
                    href={item.href} 
                    target={item.target || '_self'} 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:underline"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
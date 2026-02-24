import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

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
      value: '+55 (11) 95447-4237',
      href: 'tel:+5511954474237',
    },
    {
      icon: <MapPin size={24} className="text-brand-brown" />,
      title: 'Endereço',
      value: (
        <>
          Clínica Tuany Barreiros - Estética Integrativa e Avançada<br />
          Av. Guilherme Cotching, 1948 - sala 13<br />
          Vila Maria, São Paulo - SP<br />
          CEP: 02113-014
        </>
      ),
      href: 'https://www.google.com/maps/search/?api=1&query=Av.+Guilherme+Cotching%2C+1948+-+sala+13+-+Vila+Maria%2C+S%C3%A3o+Paulo+-+SP%2C+02113-014',
      target: '_blank',
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/tuanybarreiros_bioestetica/' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Linkedin size={20} />, href: '#' },
    { icon: <Youtube size={20} />, href: '#' },
  ];

  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
          
          {/* Left column: Title and Map */}
          <div>
            <span className="text-sm font-semibold uppercase text-brand-text-button">
              Vamos conversar
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
              Fale conosco
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Estou pronta para esclarecer qualquer dúvida sobre nossos serviços de bioestética.
            </p>

            {/* Placeholder for Google Map */}
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg shadow-md">              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7631.471647656955!2d-46.5879054869564!3d-23.513316578744693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5f37c77d742b%3A0xd64e5b6827bcef02!2sAv.%20Guilherme%20Cotching%2C%201948%20-%20sala%2013%20-%20Vila%20Maria%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002113-014%2C%20Brazil!5e1!3m2!1sen!2suk!4v1762951789377!5m2!1sen!2suk" // <-- COLE O SRC DO GOOGLE MAPS AQUI
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right column: Contact Information */}
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

            {/* Social Media */}
            <div className="pt-4 border-t border-brand-brown/20">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-brown hover:text-brand-text-button transition-colors p-3 bg-white rounded-full shadow-sm hover:shadow-md"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
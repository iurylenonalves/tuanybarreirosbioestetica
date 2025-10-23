import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/tuanybarreiros_bioestetica/' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Linkedin size={20} />, href: '#' },
    { icon: <Youtube size={20} />, href: '#' },
  ];

   return (
    <footer className="bg-white font-medium text-brand-brown">
      <div className="container mx-auto px-4 py-16">
        {/* Grid Principal do Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          
          {/* Coluna 1: Endereço, Contato e Icones */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="font-semibold text-brand-text-button mb-2">Endereço</h4>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                São Paulo, Brasil
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-brand-text-button mb-2">Contato</h4>
              <div className="flex flex-col items-start gap-1">
                <a href="tel:+5511912345678" className="hover:underline">+55 11 9 1234 5678</a>
                <a href="mailto:contato@tuanybarreiros.com.br" className="hover:underline">contato@tuanybarreiros.com.br</a>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-opacity-70 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação Principal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-text-button mb-2">Navegação</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:underline">Início</Link></li>
              <li><Link href="/sobre" className="hover:underline">Sobre mim</Link></li>
              <li><Link href="/servicos" className="hover:underline">Serviços</Link></li>
              <li><Link href="/resultados" className="hover:underline">Resultados</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Links Úteis/Legais */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-text-button mb-2">Informações</h4>
            <ul className="space-y-3">
              <li><Link href="/contato" className="hover:underline">Contato</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:underline">Política de privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="hover:underline">Termos de uso</Link></li>
              <li><Link href="/configuracoes-de-cookies" className="hover:underline">Configurações de cookies</Link></li>
              <li><Link href="/politica-de-cancelamento" className="hover:underline">Política de cancelamento</Link></li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t text-brand-brown my-8"></div>

        {/* Barra de Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-xs space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Tuany Barreiros Bioestética. Todos os direitos reservados.</p>
          <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
            <Link href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:underline">Termos de Serviço</Link>
            <Link href="/configuracoes-de-cookies" className="hover:underline">Configurações de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
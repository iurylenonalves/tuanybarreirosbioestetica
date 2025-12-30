import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          
          {/* Column 1 */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="font-semibold text-brand-text-button mb-2">Endereço</h4>
              <a href="https://www.google.com/maps/search/?api=1&query=Av.+Guilherme+Cotching%2C+1948+-+sala+13+-+Vila+Maria%2C+S%C3%A3o+Paulo+-+SP%2C+02113-014" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Clínica Tuany Barreiros - Estética Integrativa e Avançada<br />
                Av. Guilherme Cotching, 1948 - sala 13<br />
                Vila Maria, São Paulo - SP<br />
                CEP: 02113-014<br />
                <span className="text-xs text-brand-brown mt-2 block">CNPJ: 32.883.323/0001-67</span>
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-brand-text-button mb-2">Contato</h4>
              <div className="flex flex-col items-start gap-1">
                <a href="tel:+5511954474237" className="hover:underline">+55 11 95447-4237</a>
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

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-text-button mb-2">Navegação</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:underline">Início</Link></li>
              <li><Link href="/sobre" className="hover:underline">Sobre mim</Link></li>
              <li><Link href="/procedimentos" className="hover:underline">Procedimentos</Link></li>
              <li><Link href="/#resultados" className="hover:underline">Resultados</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-text-button mb-2">Informações</h4>
            <ul className="space-y-3">
              <li><Link href="/contato" className="hover:underline">Contato</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:underline">Política de privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="hover:underline">Termos de uso</Link></li>
              <li><Link href="/politica-de-cancelamento" className="hover:underline">Política de cancelamento</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t text-brand-brown my-8"></div>

        {/* Copyright Bar & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-xs gap-4">
          
          {/* Left: Copyright */}
          <p className="opacity-80">
            &copy; {new Date().getFullYear()} Tuany Barreiros Bioestética. Todos os direitos reservados.
          </p>
          
          {/* Right: Credits */}
          <a 
            href="https://iurylenon.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 hover:text-brand-text-button transition-all duration-300 flex items-center gap-1"
            title="Tech Partner & Digital Infrastructure"
          >
            Digital Infrastructure by <span className="font-bold">Iury Lenon</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
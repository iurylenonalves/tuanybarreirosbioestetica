'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre mim", href: "/sobre" },
    { label: "Serviços", href: "/servicos" },
    { label: "Produtos", href: "/produtos" },
    { label: "Blog", href: "/blog", hasDropdown: true },
  ];

  return (
    // O 'relative' no container principal é crucial para o posicionamento do menu
    <header className="w-full h-24 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        
        {/* 1. Logo à Esquerda */}
        <div className="flex-1 flex justify-start">
          <Link href="/">
            {/* Ajuste o src, width e height conforme o seu arquivo de logo */}
            <Image src="/logo.png" alt="Tuany Barreiros Logo" width={180} height={40} />
          </Link>
        </div>

        {/* 2. Navegação Centralizada */}
        {/* Escondemos em telas pequenas (md:) e usamos posicionamento absoluto para centralizar perfeitamente */}
        <nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1 font-medium text-brand-brown hover:text-opacity-70 transition-all"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. Botão à Direita */}
        <div className="hidden md:flex flex-1 justify-end">
          <Link 
            href="/agendar" // Ou link direto do Calendly
            className="bg-brand-background text-brand-text-button px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            Agendar
          </Link>
        </div>

        {/* 5. Botão Hambúrguer para Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="z-50">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 6. Painel do Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white pt-24">
            <nav className="flex flex-col items-center text-center gap-8 mt-8">
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} 
                      className="flex items-center gap-1 font-medium text-brand-brown text-2xl hover:text-opacity-70 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown size={16} />}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contato"
                className="bg-brand-background text-brand-text-button px-8 py-3 rounded-lg font-semibold shadow-md mt-8"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agendar
              </Link>
            </nav>
          </div>
        )}


      </div>
    </header>
  );
}
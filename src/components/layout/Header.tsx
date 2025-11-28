'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { CartIcon } from "@/components/ui/CartIcon";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre mim", href: "/sobre" },
    { label: "Procedimentos", href: "/procedimentos" },
    { label: "Produtos", href: "/produtos" },
    { label: "Blog", href: "/blog", hasDropdown: true },
    { label: "Contato", href: "/contato" },
  ];

  return (    
    <header className="w-full h-24 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Tuany Barreiros Logo" 
              width={120} 
              height={65}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-6 xl:gap-10">
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

        {/* Buttons */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
          <CartIcon />
          <Link 
            href="/agendar" // Ou link direto do Calendly
            className="bg-brand-background text-brand-text-button px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            Agendar
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <CartIcon />
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="z-50">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-white pt-24">
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
"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Evita erro no SSR
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = "https://api.whatsapp.com/send?phone=5511954474237&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-5 left-5 z-50 flex items-center justify-center w-14 h-14 bg-brand-whatsapp text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp size={28} />
      {/* 🔴 bolinha de notificação */}
      <span className="absolute top-1 right-1 w-3 h-3 bg-brand-notification rounded-full border border-white"></span>
    </a>
  );
}
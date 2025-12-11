'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-dark-nude/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 flex-1">
          <p>
            Utilizamos cookies para melhorar sua experiência e personalizar conteúdo. 
            Ao continuar navegando, você concorda com nossa{' '}
            <Link href="/politica-de-privacidade" className="text-brand-text-button font-semibold hover:underline">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button 
            variant="primary" 
            onClick={handleAccept}
            className="whitespace-nowrap py-2 px-4"
          >
            Aceitar e Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}

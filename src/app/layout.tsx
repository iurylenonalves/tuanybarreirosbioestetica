import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import  WhatsAppButton from "@/components/ui/WhatsAppButton";
import { SanityLive } from '@/sanity/lib/live';
import { CartProvider } from '@/contexts/CartContext';
import { Cart } from '@/components/ui/Cart';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { Toaster } from 'sonner';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' 
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: '700',
});

export const metadata: Metadata = {
  
  title: {
    default: 'Tuany Barreiros Bioestética | Cuidado e Transformação',
    template: '%s | Tuany Barreiros Bioestética',
  },
  description: "Bioestética que valoriza sua beleza natural. Transforme sua confiança com cuidados estéticos personalizados.",
    
  openGraph: {
    title: 'Tuany Barreiros Bioestética | Cuidado e Transformação',
    description: 'Transforme sua confiança com cuidados estéticos personalizados.',
    url: 'https://tuanybarreiros.com.br/',
    siteName: 'Tuany Barreiros Bioestética',
    images: [
      {
        url: 'https://tuanybarreiros.com.br/tuany-retrato.jpg',
        width: 800,
        height: 600,
        alt: 'Retrato de Tuany Barreiros, especialista em bioestética',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFCFA',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR">
      <body 
        className={`${inter.variable} ${dancingScript.variable} antialiased bg-brand-background`}
        suppressHydrationWarning
      >
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <CartProvider>
          <Header />
          <main>
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
          <Cart />
          <CookieConsent />
          <SanityLive />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}

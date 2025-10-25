import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import  WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' 
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: '700',
});

export const metadata: Metadata = {
  // Título principal e template para outras páginas
  title: {
    default: 'Tuany Barreiros Bioestética | Cuidado e Transformação',
    template: '%s | Tuany Barreiros Bioestética',
  },
  description: "Bioestética que valoriza sua beleza natural. Transforme sua confiança com cuidados estéticos personalizados.",
  
  // Objeto Open Graph para compartilhamento em redes sociais
  openGraph: {
    title: 'Tuany Barreiros Bioestética | Cuidado e Transformação',
    description: 'Transforme sua confiança com cuidados estéticos personalizados.',
    url: 'https://tuanybarreirosbioestetica.vercel.app/', // <-- IMPORTANTE: Troque pela sua URL da Vercel
    siteName: 'Tuany Barreiros Bioestética',
    images: [
      {
        url: 'https://tuanybarreirosbioestetica.vercel.app/tuany-retrato.jpg', // <-- URL ABSOLUTA DA IMAGEM
        width: 800, // Largura da imagem
        height: 600, // Altura da imagem
        alt: 'Retrato de Tuany Barreiros, especialista em bioestética',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} antialiased bg-brand-background`}>
        <Header />
        <main>
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import  WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' 
});

const garet = localFont({
  src: [
    {
      path: '../assets/fonts/Garet-Regular.woff2', // Caminho relativo ao arquivo layout.tsx
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Garet-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // Adicione outros pesos/estilos aqui se tiver
  ],
  variable: '--font-garet', // <<< DEFINIR A VARIÁVEL CSS
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
      <body className={`${inter.variable} ${garet.variable} ${dancingScript.variable} antialiased bg-brand-background`}>
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

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
  title: "Tuany Barreiros Bioestética",
  description: "Bioestética que valoriza sua beleza natural.",
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

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSnippetSection />
      <ServicesSection />
    </main>
  );
}
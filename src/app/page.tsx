import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { CtaFormSection } from "@/components/sections/CtaFormSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSnippetSection />
      <ServicesSection />
      <ResultsSection />
      <CtaFormSection />
    </main>
  );
}
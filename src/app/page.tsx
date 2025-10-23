import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { CtaFormSection } from "@/components/sections/CtaFormSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSnippetSection />
      <ServicesSection />
      <ResultsSection />
      <CtaFormSection />
      <ProductsSection />
      <BlogSection />
    </main>
  );
}
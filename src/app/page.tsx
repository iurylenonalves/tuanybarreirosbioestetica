import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { CtaFormSection } from "@/components/sections/CtaFormSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSnippetSection />
      <MethodologySection />
      <ServicesSection />
      <ResultsSection />
      <CtaFormSection />
      <ProductsSection />
      <BlogSection />
      <ContactFormSection />
    </main>
  );
}
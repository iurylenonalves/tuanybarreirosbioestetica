import { ServiceListSection } from "@/components/sections/ServiceListSection";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { FeaturesListSection } from "@/components/sections/FeaturesListSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { ServiceCtaSection } from "@/components/sections/ServiceCtaSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServiceListSection />
      <FeaturesListSection />
      <ServiceCtaSection />
      <TestimonialSection />
      <FaqSection />
    </>
  );
}
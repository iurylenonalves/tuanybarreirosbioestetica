import { ServiceListSection } from "@/components/sections/ServiceListSection";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { FeaturesListSection } from "@/components/sections/FeaturesListSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { SchedulingCtaSection } from "@/components/sections/SchedulingCtaSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServiceListSection />
      <FeaturesListSection />
      <TestimonialSection />
      <SchedulingCtaSection />
      <FaqSection />
    </>
  );
}
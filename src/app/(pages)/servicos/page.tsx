import { ServiceListSection } from "@/components/sections/ServiceListSection";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { FeaturesListSection } from "@/components/sections/FeaturesListSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { SchedulingCtaSection } from "@/components/sections/SchedulingCtaSection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServiceListSection />
      <FeaturesListSection />
      <TestimonialSection />
      <SchedulingCtaSection />
    </>
  );
}
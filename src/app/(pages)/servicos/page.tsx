import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { ServiceListSection } from "@/components/sections/ServiceListSection";
import { FeaturesListSection } from "@/components/sections/FeaturesListSection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServiceListSection />
      <FeaturesListSection />
    </>
  );
}
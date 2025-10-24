import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactDetailsSection } from "@/components/sections/ContactDetailsSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactDetailsSection />
      <FaqSection />
    </>
  );
}
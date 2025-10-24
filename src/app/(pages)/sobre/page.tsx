import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { AboutBioSection } from "@/components/sections/AboutBioSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutBioSection />
      <ValuesSection />
      <TimelineSection />
    </>
  );
}
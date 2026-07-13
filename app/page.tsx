import type { Metadata } from "next";
import {
  AboutSection,
  CTASection,
  HeroSection,
  QuickAccessSection,
} from "@/components/sections";


export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      
      <HeroSection />
      <QuickAccessSection />
      <AboutSection />
      <CTASection />
    </>
  );
}

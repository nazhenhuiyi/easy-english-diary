import { CTASection } from "@/components/home/cta-section";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { PricingSection } from "@/components/home/pricing-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      {/* <FeaturesSection /> */}
      <TestimonialsSection />
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
      <FaqSection />
    </>
  );
};

export default Home;

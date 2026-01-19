// src/Home.tsx  (UPDATED: include ContactSection at the bottom)
import React from "react";
import Hero from "./components/Hero";
import PlatformShowcase from "./components/PlatformShowcase";
import Pillars from "./components/Pillars";
import ObservabilityGap from "./components/ObservabilityGap";
import HowItWorks from "./components/HowItWorks";
import ZavvisVsRest from "./components/ZavvisVsRest";
import Benefits from "./components/Benefits";
import ROI from "./components/Roi";
import WhyNow from "./components/Whynow";
import SocialProof from "./components/social";
import FinalCtaFooter from "./components/FinalCtaFooter";
import ContactSection from "./components/ContactSection";

const Home: React.FC = () => {
  return (
    <main className="bg-black text-white pt-[140px]">
      <Hero />
      <PlatformShowcase />
      <Pillars />
      <ObservabilityGap />
      <HowItWorks />
      <ZavvisVsRest />
      <Benefits />
      <ROI />
      <WhyNow />
      <SocialProof />

      {/* ✅ All CTAs jump here */}
      <ContactSection />

      <FinalCtaFooter />
    </main>
  );
};

export default Home;

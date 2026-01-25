// src/Home.tsx
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

      {/* ✅ Pillars anchor (NOT wrapping section) */}
      <div id="pillars" className="scroll-mt-[110px]" />
      <Pillars />

      <ObservabilityGap />
      <HowItWorks />

      {/* ✅ Why Zavvis anchor */}
      <div id="why-zavvis" className="scroll-mt-[110px]" />
      <ZavvisVsRest />

      <Benefits />
      <ROI />
      <WhyNow />
      <SocialProof />

      {/* ✅ Contact anchor */}
      <div id="contact" className="scroll-mt-[110px]" />
      <ContactSection />

      <FinalCtaFooter />
    </main>
  );
};

export default Home;

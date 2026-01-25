// src/pages/CompanyPage.tsx
import React from "react";
import AboutZavvis from "../components/AboutZavvis";
import Principles from "../components/Principles";
import StarsPage from "../components/StarsPage";
import VisionPage from "../components/VisionPage";
import ApproachPage from "../components/ApproachPage";
import LookingAheadPage from "../components/LookingAheadPage";
import FinalCtaFooter from "../components/FinalCtaFooter";
import ContactSection from "../components/ContactSection";

const CompanyPage: React.FC = () => {
  return (
    <main className="bg-black text-white min-h-screen pt-[140px]">
      <AboutZavvis />
      <Principles />
      <StarsPage />
      <VisionPage />
      <ApproachPage />
      <LookingAheadPage />

      <section id="contact">
        <ContactSection />
      </section>

      <FinalCtaFooter />
    </main>
  );
};

export default CompanyPage;

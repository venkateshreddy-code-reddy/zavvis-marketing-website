import React from "react";
import AboutZavvis from "../components/AboutZavvis";
import Principles from "../components/Principles";   // <-- add this
import StarsPage from "../components/StarsPage";
import VisionPage from "../components/VisionPage"
import ApproachPage from "../components/ApproachPage";
import LookingAheadPage from "../components/LookingAheadPage";
import FinalCtaFooter from "../components/FinalCtaFooter";
const CompanyPage: React.FC = () => {
  return (
    <main className="bg-black text-white min-h-screen">
      <AboutZavvis />
      <Principles /> 
       <StarsPage />  {/* <-- Here is your new full-page section */}
    <VisionPage />
    <ApproachPage />
    <LookingAheadPage />
    <FinalCtaFooter />
    </main>
  );
};

export default CompanyPage;


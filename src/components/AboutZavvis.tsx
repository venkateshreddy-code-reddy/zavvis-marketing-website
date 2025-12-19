// src/components/AboutZavvis.tsx
import { useEffect, useRef, useState } from "react";
import "../style/AboutZavvis.css";

import grid from "../assets/grid.png";
import stars from "../assets/stars.png";

const AboutZavvis: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`aboutZ ${inView ? "aboutZ--in" : ""}`}
      aria-label="About Zavvis section"
      style={
        {
          ["--grid-url" as any]: `url(${grid})`,
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="aboutZ__grid" aria-hidden="true" />
      <div className="aboutZ__content" role="presentation">
        <h2 className="aboutZ__title">About Zavvis</h2>

        <p className="aboutZ__para">
          Corporate finance has entered its observability era. Zavvis is the first engine
          that watches every transaction — from GL entry to CRM deal — and turns it into
          real-time, preventative intelligence.
        </p>

        <p className="aboutZ__para aboutZ__para--spaced">
          We build Financial Data Observability — powered by AI agents that continuously
          monitor transactional signals, detect material anomalies, trace root causes across
          systems, and close the loop with automated prevention.
        </p>
      </div>
      <div className="aboutZ__stars" aria-hidden="true" />
    </section>
  );
};

export default AboutZavvis;
